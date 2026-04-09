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
  }
  power: number[]
  heartRate: number[]
  cadence: number[]
  speed: number[]
  altitude: number[]
  intervals: { startIndex: number; endIndex: number; avgPower?: number; maxPower?: number }[]
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

  for (const r of allRecords) {
    power.push(r.power ?? 0)
    heartRate.push(r.heart_rate ?? 0)
    cadence.push(r.cadence ?? 0)
    speed.push(r.enhanced_speed ?? r.speed ?? 0)
    // lengthUnit:'km' converts altitude to km — multiply by 1000 to get meters
    const rawAlt = r.enhanced_altitude ?? r.altitude ?? 0
    altitude.push(rawAlt * 1000)
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
  const sportName = rawSport.charAt(0).toUpperCase() + rawSport.slice(1).replace(/_/g, ' ')

  // Duration
  const totalTime = (session.total_timer_time ?? session.total_elapsed_time ?? n) as number

  // FTP
  const ftp = (session.threshold_power ?? 0) as number

  // Date
  const date = (session.start_time ?? allRecords[0]?.timestamp ?? new Date().toISOString()) as string

  // Session name
  const dateObj = new Date(date)
  const dateStr = dateObj.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  const name = `${sportName} — ${dateStr}`

  const meta = {
    sport: sportName,
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

  return { meta, power, heartRate, cadence, speed, altitude, intervals }
}
