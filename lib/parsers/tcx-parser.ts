// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * TCX file parser — converts .tcx XML into ParsedActivityData.
 *
 * Uses browser-native DOMParser (zero npm dependencies).
 *
 * TCX structure: TrainingCenterDatabase → Activities → Activity → Lap → Track → Trackpoint
 */

import type { ActivityPoint, ParsedActivityData, ActivityMeta } from './types'
import { resampleToSeconds } from './types'

/**
 * Parse a TCX XML string into ParsedActivityData.
 */
export function parseTCX(xml: string): ParsedActivityData {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xml, 'application/xml')

  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    throw new Error(`Invalid TCX XML: ${parseError.textContent?.slice(0, 100)}`)
  }

  const activity = doc.querySelector('Activity')
  if (!activity) {
    throw new Error('No Activity found in TCX file')
  }

  const sport = activity.getAttribute('Sport') || 'Other'
  const idEl = activity.querySelector('Id')
  const date = idEl?.textContent?.trim() || ''

  const laps = activity.querySelectorAll('Lap')
  const points: ActivityPoint[] = []

  let totalTime = 0
  let totalDistance = 0
  let totalCalories = 0
  let totalAscent = 0
  let totalDescent = 0
  let prevAlt: number | undefined
  let maxHR = 0
  let maxPower = 0
  let sumHR = 0
  let sumPower = 0
  let sumCadence = 0
  let sumSpeed = 0
  let hrCount = 0
  let powerCount = 0
  let cadenceCount = 0
  let speedCount = 0

  for (const lap of laps) {
    // Lap-level aggregates
    const lapTime = getNum(lap, 'TotalTimeSeconds')
    const lapDist = getNum(lap, 'DistanceMeters')
    const lapCal = getNum(lap, 'Calories')
    if (lapTime) totalTime += lapTime
    if (lapDist) totalDistance += lapDist
    if (lapCal) totalCalories += lapCal

    const trackpoints = lap.querySelectorAll('Trackpoint')

    for (const tp of trackpoints) {
      const timeText = getText(tp, 'Time')
      const posEl = tp.querySelector('Position')
      const lat = posEl ? parseFloat(getText(posEl, 'LatitudeDegrees') || '0') : undefined
      const lon = posEl ? parseFloat(getText(posEl, 'LongitudeDegrees') || '0') : undefined
      const altitude = getNum(tp, 'AltitudeMeters')
      const distance = getNum(tp, 'DistanceMeters')
      const hr = getNum(tp, 'HeartRateBpm > Value')
      const cadence = getNum(tp, 'Cadence')
      const speed = getExtNum(tp, 'Speed')
      const power = getExtNum(tp, 'Watts')

      // Elevation tracking
      if (altitude !== undefined && prevAlt !== undefined) {
        const diff = altitude - prevAlt
        if (diff > 0) totalAscent += diff
        else totalDescent += Math.abs(diff)
      }
      if (altitude !== undefined) prevAlt = altitude

      // Stats accumulation
      if (hr) { sumHR += hr; hrCount++; if (hr > maxHR) maxHR = hr }
      if (power) { sumPower += power; powerCount++; if (power > maxPower) maxPower = power }
      if (cadence) { sumCadence += cadence; cadenceCount++ }
      if (speed) { sumSpeed += speed; speedCount++ }

      points.push({
        time: timeText ? new Date(timeText).getTime() : 0,
        lat: lat || undefined,
        lon: lon || undefined,
        altitude,
        heartRate: hr || undefined,
        cadence: cadence || undefined,
        power: power || undefined,
        speed: speed ? speed * 3.6 : undefined, // m/s → km/h
        distance: distance ? distance / 1000 : undefined, // m → km
      })
    }
  }

  // Compute speed from consecutive points if not in extensions
  if (speedCount === 0 && points.length > 1) {
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1]
      const curr = points[i]
      if (prev.distance !== undefined && curr.distance !== undefined && curr.time && prev.time) {
        const dt = (curr.time - prev.time) / 1000
        if (dt > 0) {
          const distDelta = (curr.distance - prev.distance) * 1000 // km → m
          const spd = (distDelta / dt) * 3.6 // m/s → km/h
          curr.speed = spd
          sumSpeed += spd
          speedCount++
        }
      }
    }
  }

  const meta: ActivityMeta = {
    sport: sport.toLowerCase(),
    name: `${sport} Activity`,
    date,
    totalTime,
    totalDistance: totalDistance / 1000, // m → km
    totalAscent: Math.round(totalAscent),
    totalDescent: Math.round(totalDescent),
    totalCalories,
    avgPower: powerCount > 0 ? Math.round(sumPower / powerCount) : 0,
    maxPower,
    avgHR: hrCount > 0 ? Math.round(sumHR / hrCount) : 0,
    maxHR,
    avgCadence: cadenceCount > 0 ? Math.round(sumCadence / cadenceCount) : 0,
    avgSpeed: speedCount > 0 ? Math.round((sumSpeed / speedCount) * 10) / 10 : 0,
    recordCount: points.length,
  }

  const arrays = resampleToSeconds(points)

  return {
    meta,
    points,
    ...arrays,
  }
}

// ─── Helpers ───

function getText(parent: Element, selector: string): string {
  return parent.querySelector(selector)?.textContent?.trim() || ''
}

function getNum(parent: Element, selector: string): number | undefined {
  const text = getText(parent, selector)
  if (!text) return undefined
  const v = parseFloat(text)
  return isNaN(v) ? undefined : v
}

function getExtNum(tp: Element, name: string): number | undefined {
  const exts = tp.querySelector('Extensions')
  if (!exts) return undefined

  // Search all descendant elements for matching local name
  for (const child of exts.querySelectorAll('*')) {
    const localName = child.localName?.toLowerCase()
    if (localName === name.toLowerCase() && child.textContent) {
      const v = parseFloat(child.textContent)
      if (!isNaN(v)) return v
    }
  }

  return undefined
}
