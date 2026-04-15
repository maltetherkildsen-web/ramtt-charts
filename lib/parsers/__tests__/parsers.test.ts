// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { resampleToSeconds } from '../types'
import type { ActivityPoint } from '../types'

describe('resampleToSeconds', () => {
  it('returns empty arrays for empty input', () => {
    const result = resampleToSeconds([])
    expect(result.power).toHaveLength(0)
    expect(result.heartRate).toHaveLength(0)
  })

  it('resamples points to per-second arrays', () => {
    const base = Date.now()
    const points: ActivityPoint[] = [
      { time: base, power: 200, heartRate: 140, cadence: 80, speed: 30, altitude: 100 },
      { time: base + 2000, power: 250, heartRate: 150, cadence: 90, speed: 32, altitude: 102 },
      { time: base + 4000, power: 300, heartRate: 160, cadence: 85, speed: 28, altitude: 105 },
    ]
    const result = resampleToSeconds(points)

    // 4 seconds total (0s, 1s, 2s, 3s)
    expect(result.power).toHaveLength(4)
    expect(result.heartRate).toHaveLength(4)

    // First point values
    expect(result.power[0]).toBe(200)
    expect(result.heartRate[0]).toBe(140)

    // Second 1 should be interpolated between point 0 and point 1
    expect(result.power[1]).toBeCloseTo(225, 0) // Midpoint of 200-250

    // Second 2 = point 1 values
    expect(result.power[2]).toBe(250)
    expect(result.heartRate[2]).toBe(150)
  })

  it('handles single point', () => {
    const points: ActivityPoint[] = [
      { time: Date.now(), power: 200, heartRate: 140 },
    ]
    const result = resampleToSeconds(points)
    expect(result.power).toHaveLength(1)
    expect(result.power[0]).toBe(200)
  })

  it('handles missing optional fields', () => {
    const base = Date.now()
    const points: ActivityPoint[] = [
      { time: base },
      { time: base + 3000, heartRate: 120 },
    ]
    const result = resampleToSeconds(points)
    expect(result.power).toHaveLength(3)
    expect(result.power[0]).toBe(0) // No power data → 0
    expect(result.heartRate[2]).toBe(120)
  })
})
