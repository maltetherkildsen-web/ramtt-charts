// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Shared types for activity file parsers (GPX, TCX, FIT).
 *
 * ParsedActivityData is a unified output shape compatible with FitData
 * so all parser outputs can feed directly into the session analysis page.
 */

export interface ActivityMeta {
  sport: string
  name: string
  date: string
  totalTime: number         // seconds
  totalDistance: number      // km
  totalAscent: number       // meters
  totalDescent: number      // meters
  totalCalories: number     // kcal
  avgPower: number
  maxPower: number
  avgHR: number
  maxHR: number
  avgCadence: number
  avgSpeed: number          // km/h
  recordCount: number
}

export interface ActivityPoint {
  time: number              // epoch ms
  lat?: number
  lon?: number
  altitude?: number         // meters
  heartRate?: number        // bpm
  cadence?: number          // rpm
  power?: number            // watts
  speed?: number            // km/h
  distance?: number         // km cumulative
  temperature?: number      // °C
}

export interface ParsedActivityData {
  meta: ActivityMeta
  points: ActivityPoint[]
  /** Per-second arrays (resampled from points). */
  power: number[]
  heartRate: number[]
  cadence: number[]
  speed: number[]
  altitude: number[]
}

/**
 * Resample irregular GPS points to per-second arrays.
 * Fills gaps with linear interpolation.
 */
export function resampleToSeconds(points: ActivityPoint[]): {
  power: number[]
  heartRate: number[]
  cadence: number[]
  speed: number[]
  altitude: number[]
} {
  if (points.length === 0) {
    return { power: [], heartRate: [], cadence: [], speed: [], altitude: [] }
  }

  const startTime = points[0].time
  const endTime = points[points.length - 1].time
  const totalSeconds = Math.max(1, Math.round((endTime - startTime) / 1000))

  const power = new Array<number>(totalSeconds).fill(0)
  const heartRate = new Array<number>(totalSeconds).fill(0)
  const cadence = new Array<number>(totalSeconds).fill(0)
  const speed = new Array<number>(totalSeconds).fill(0)
  const altitude = new Array<number>(totalSeconds).fill(0)

  // Map each point to its second index
  let prevIdx = 0
  for (let p = 0; p < points.length; p++) {
    const pt = points[p]
    const secIdx = Math.min(totalSeconds - 1, Math.round((pt.time - startTime) / 1000))

    // Fill from prevIdx to secIdx with interpolation
    if (p > 0 && secIdx > prevIdx) {
      const prev = points[p - 1]
      for (let s = prevIdx + 1; s < secIdx; s++) {
        const t = (s - prevIdx) / (secIdx - prevIdx)
        power[s] = lerp(prev.power ?? 0, pt.power ?? 0, t)
        heartRate[s] = lerp(prev.heartRate ?? 0, pt.heartRate ?? 0, t)
        cadence[s] = lerp(prev.cadence ?? 0, pt.cadence ?? 0, t)
        speed[s] = lerp(prev.speed ?? 0, pt.speed ?? 0, t)
        altitude[s] = lerp(prev.altitude ?? 0, pt.altitude ?? 0, t)
      }
    }

    power[secIdx] = pt.power ?? 0
    heartRate[secIdx] = pt.heartRate ?? 0
    cadence[secIdx] = pt.cadence ?? 0
    speed[secIdx] = pt.speed ?? 0
    altitude[secIdx] = pt.altitude ?? 0
    prevIdx = secIdx
  }

  return { power, heartRate, cadence, speed, altitude }
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}
