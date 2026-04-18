// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * FIT binary file parser — converts .fit files into the FitData shape
 * used by the session analysis page.
 *
 * Uses the `fit-file-parser` npm package (cascade mode — records nested in laps).
 */

import FitParser from 'fit-file-parser'

// ─── Output type (matches page.tsx FitData) ───

export interface FitData {
  meta: {
    sport: string
    subSport: string | null
    totalTime: number
    avgPower: number
    maxPower: number
    avgHR: number
    maxHR: number
    avgCadence: number
    avgSpeed: number
    ftp: number
    maxHeartRate: number
    recordCount: number
    name: string
    date: string
    totalDistance: number      // km
    totalCalories: number     // kcal
    totalAscent: number       // meters
    totalDescent: number      // meters
    avgTemperature: number    // °C
    maxTemperature: number    // °C
    minTemperature: number    // °C
  }
  /** True when the FIT session.sport indicates running (road/trail/treadmill). */
  isRunning: boolean
  athleteParams: FitAthleteParams
  power: number[]
  heartRate: number[]
  cadence: number[]
  speed: number[]
  altitude: number[]
  /** Cumulative distance in km per record. May contain nulls when the device dropped samples. */
  distance: (number | null)[]
  intervals: { startIndex: number; endIndex: number; avgPower?: number; maxPower?: number }[]
}

export interface FitAthleteParams {
  ftp: number | undefined                    // watts
  cp: number | undefined                     // watts (rarely in FIT)
  weightKg: number | undefined               // kilograms
  thresholdPaceSecPerKm: number | undefined  // seconds per km — running threshold
}

// Treat 0 / non-positive / non-finite as missing — Garmin writes 0 for "no value".
function validPositive(v: unknown): number | undefined {
  if (typeof v !== 'number' || !Number.isFinite(v) || v <= 0) return undefined
  return v
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyRecord = Record<string, any>

// ─── Parse a binary .fit ArrayBuffer into FitData ───

export async function parseFitFile(buffer: ArrayBuffer): Promise<FitData> {
  const parser = new FitParser({
    force: true,
    speedUnit: 'km/h',
    lengthUnit: 'km',
    elapsedRecordField: true,
    mode: 'cascade',
  })

  const parsed = await parser.parseAsync(buffer) as AnyRecord

  // In cascade mode: activity → sessions[] → laps[] → records[]
  const activity = parsed.activity as AnyRecord | undefined
  const sessions = (activity?.sessions ?? []) as AnyRecord[]
  const session = sessions[0] as AnyRecord | undefined

  if (!session) {
    throw new Error('No session data found in FIT file')
  }

  // Collect all records from all laps
  const laps = (session.laps ?? []) as AnyRecord[]
  const allRecords: AnyRecord[] = []
  const lapBoundaries: { start: number; end: number }[] = []

  for (const lap of laps) {
    const lapRecords = (lap.records ?? []) as AnyRecord[]
    const startIdx = allRecords.length
    allRecords.push(...lapRecords)
    lapBoundaries.push({ start: startIdx, end: allRecords.length - 1 })
  }

  // Also check for top-level records (list mode fallback)
  if (allRecords.length === 0 && Array.isArray(parsed.records)) {
    allRecords.push(...parsed.records)
  }

  if (allRecords.length === 0) {
    throw new Error('No data records found in FIT file')
  }

  // Extract per-second arrays
  const power: number[] = []
  const heartRate: number[] = []
  const cadence: number[] = []
  const speed: number[] = []
  const altitude: number[] = []
  const distance: (number | null)[] = []

  for (const r of allRecords) {
    power.push(r.power ?? 0)
    heartRate.push(r.heart_rate ?? 0)
    cadence.push(r.cadence ?? 0)
    speed.push(r.enhanced_speed ?? r.speed ?? 0)
    // lengthUnit:'km' converts altitude to km — multiply by 1000 to get meters
    const rawAlt = r.enhanced_altitude ?? r.altitude ?? 0
    altitude.push(rawAlt * 1000)
    // Cumulative distance in km (lengthUnit:'km'). Preserve null when device dropped the sample.
    const rawDist = r.distance
    distance.push(typeof rawDist === 'number' && Number.isFinite(rawDist) ? rawDist : null)
  }

  // Extract per-record temperature for min calculation
  let minTemp = Infinity, maxTempRecord = -Infinity, sumTemp = 0, tempCount = 0
  for (const r of allRecords) {
    const t = r.temperature as number | undefined
    if (t != null) {
      if (t < minTemp) minTemp = t
      if (t > maxTempRecord) maxTempRecord = t
      sumTemp += t
      tempCount++
    }
  }

  const n = allRecords.length

  // Compute averages and maxes
  let sumPw = 0, sumHr = 0, sumCad = 0, sumSpd = 0
  let maxPw = 0, maxHr = 0
  let hrCount = 0

  for (let i = 0; i < n; i++) {
    sumPw += power[i]
    sumHr += heartRate[i]
    sumCad += cadence[i]
    sumSpd += speed[i]
    if (power[i] > maxPw) maxPw = power[i]
    if (heartRate[i] > maxHr) maxHr = heartRate[i]
    if (heartRate[i] > 0) hrCount++
  }

  // Sport name — capitalize + humanize
  const rawSport = (session.sport ?? 'unknown') as string
  const humanize = (s: string) => s.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
  const sportName = humanize(rawSport)

  // Sub-sport (e.g. gravel_cycling → "Gravel Cycling")
  const rawSubSport = (session.sub_sport ?? null) as string | null
  const subSport = rawSubSport && rawSubSport !== 'generic' ? humanize(rawSubSport) : null

  // isRunning — check both raw sport and sub_sport. Matches running, trail_running, treadmill_running.
  const sportHaystack = `${rawSport} ${rawSubSport ?? ''}`.toLowerCase()
  const isRunning = /\brun(ning)?\b/.test(sportHaystack)

  // Duration
  const totalTime = (session.total_timer_time ?? session.total_elapsed_time ?? n) as number

  // Athlete parameters — FTP preferred from zones_target, fallback user_profile, fallback session.
  // Weight from user_profile (fit-file-parser already applies scale:10 → kg).
  // CP has no dedicated FIT field — left undefined unless a future source populates it.
  // Threshold pace from session.threshold_speed (km/h per speedUnit:'km/h'). 3600/speed → sec/km.
  const zonesTarget = parsed.zones_target as AnyRecord | undefined
  const userProfile = parsed.user_profile as AnyRecord | undefined
  const thresholdSpeedKmh = validPositive(session.threshold_speed)
  const athleteParams: FitAthleteParams = {
    ftp:
      validPositive(zonesTarget?.functional_threshold_power) ??
      validPositive(userProfile?.functional_threshold_power) ??
      validPositive(session.threshold_power),
    cp: undefined,
    weightKg: validPositive(userProfile?.weight),
    thresholdPaceSecPerKm: thresholdSpeedKmh !== undefined ? 3600 / thresholdSpeedKmh : undefined,
  }

  // Legacy meta.ftp — keep for backward compat, 0 when missing.
  const ftp = athleteParams.ftp ?? 0

  // Date
  const date = (session.start_time ?? allRecords[0]?.timestamp ?? new Date().toISOString()) as string

  // Session name — prefer sub-sport for display
  const displaySport = subSport ?? sportName
  const dateObj = new Date(date)
  const dateStr = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  const name = `${displaySport} — ${dateStr}`

  // Session-level fields
  // Note: lengthUnit:'km' converts all length fields from m→km automatically
  const totalDistanceKm = (session.total_distance ?? 0) as number  // already km (library converts)
  const totalCalories = (session.total_calories ?? 0) as number    // kcal
  const totalAscentKm = (session.total_ascent ?? 0) as number      // km (library converts)
  const totalDescentKm = (session.total_descent ?? 0) as number    // km (library converts)
  const totalAscent = Math.round(totalAscentKm * 1000)             // → meters
  const totalDescent = Math.round(totalDescentKm * 1000)           // → meters
  const avgTemperature = (session.avg_temperature ?? (tempCount > 0 ? Math.round(sumTemp / tempCount) : 0)) as number
  const maxTemperature = (session.max_temperature ?? (maxTempRecord !== -Infinity ? maxTempRecord : 0)) as number
  const minTemperature = minTemp !== Infinity ? minTemp : 0

  // Distance fallback: if session total_distance is 0, use last record's cumulative distance (also in km)
  const fallbackDistanceKm = totalDistanceKm > 0 ? totalDistanceKm : ((allRecords[allRecords.length - 1]?.distance ?? 0) as number)

  const meta = {
    sport: displaySport,
    subSport,
    totalTime: Math.round(totalTime),
    avgPower: Math.round(sumPw / n),
    maxPower: maxPw,
    avgHR: hrCount > 0 ? Math.round(sumHr / hrCount) : 0,
    maxHR: maxHr,
    avgCadence: Math.round(sumCad / n),
    avgSpeed: +(sumSpd / n).toFixed(1),
    ftp,
    maxHeartRate: maxHr,
    recordCount: n,
    name,
    date,
    totalDistance: fallbackDistanceKm,
    totalCalories,
    totalAscent,
    totalDescent,
    avgTemperature,
    maxTemperature,
    minTemperature,
  }

  // Lap intervals with computed power stats
  const intervals: FitData['intervals'] = lapBoundaries.map(({ start, end }) => {
    let lapSumPw = 0, lapMaxPw = 0
    for (let i = start; i <= end && i < n; i++) {
      lapSumPw += power[i]
      if (power[i] > lapMaxPw) lapMaxPw = power[i]
    }
    const len = end - start + 1
    return {
      startIndex: start,
      endIndex: end,
      avgPower: len > 0 ? Math.round(lapSumPw / len) : 0,
      maxPower: lapMaxPw,
    }
  })

  return { meta, isRunning, athleteParams, power, heartRate, cadence, speed, altitude, distance, intervals }
}
