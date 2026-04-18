// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { computeBestSplits, DEFAULT_SPLIT_DISTANCES } from '../splits'

describe('computeBestSplits', () => {
  it('returns no results for an empty session', () => {
    expect(computeBestSplits([], [])).toEqual([])
  })

  it('skips splits longer than total distance', () => {
    // 800m run at constant pace, 1Hz
    const N = 240
    const distance = Array.from({ length: N }, (_, i) => (i / (N - 1)) * 0.8)
    const timestamps = Array.from({ length: N }, (_, i) => i)
    const results = computeBestSplits(distance, timestamps)
    // Only 400m fits in 800m
    expect(results.map(r => r.label)).toEqual(['400m'])
  })

  it('finds a 1 km split at the fastest location', () => {
    // Synthetic 3km run:
    //  - First 1km: 300s (5:00/km)
    //  - Middle 1km: 240s (4:00/km)  ← fastest
    //  - Final 1km: 360s (6:00/km)
    const samples: { t: number; d: number }[] = []
    for (let t = 0; t <= 300; t++) samples.push({ t, d: t / 300 })
    for (let i = 1; i <= 240; i++) samples.push({ t: 300 + i, d: 1 + i / 240 })
    for (let i = 1; i <= 360; i++) samples.push({ t: 540 + i, d: 2 + i / 360 })

    const distance = samples.map(s => s.d)
    const timestamps = samples.map(s => s.t)

    const results = computeBestSplits(distance, timestamps, [{ label: '1 km', km: 1.0 }])
    expect(results).toHaveLength(1)
    const [split] = results
    expect(split.label).toBe('1 km')
    expect(split.distanceKm).toBe(1.0)
    expect(split.timeSec).toBeCloseTo(240, 0)
    expect(split.pacePerKm).toBeCloseTo(240, 0)
  })

  it('tolerates null gaps in the distance stream', () => {
    // 2km monotonic run at 5:00/km, but drop every 10th sample to null.
    const N = 600 + 1
    const timestamps = Array.from({ length: N }, (_, i) => i)
    const distance: (number | null)[] = Array.from({ length: N }, (_, i) => i / 300)
    for (let i = 0; i < N; i++) if (i % 10 === 7) distance[i] = null

    const results = computeBestSplits(distance, timestamps, [{ label: '1 km', km: 1.0 }])
    expect(results).toHaveLength(1)
    // Should still find ~300s best 1 km split despite gaps.
    expect(results[0].timeSec).toBeGreaterThanOrEqual(299)
    expect(results[0].timeSec).toBeLessThanOrEqual(301)
  })

  it('produces results in the same order as the target list', () => {
    // 6 km synthetic run at 5:00/km (flat pace)
    const N = 1801
    const distance = Array.from({ length: N }, (_, i) => (i / (N - 1)) * 6)
    const timestamps = Array.from({ length: N }, (_, i) => i)
    const results = computeBestSplits(distance, timestamps)
    const expectedLabels = DEFAULT_SPLIT_DISTANCES
      .filter(t => t.km <= 6)
      .map(t => t.label)
    expect(results.map(r => r.label)).toEqual(expectedLabels)
  })
})
