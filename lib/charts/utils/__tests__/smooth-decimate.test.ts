// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { smoothDecimate } from '../smooth-decimate'

describe('smoothDecimate', () => {
  // ─── Edge cases ───

  it('returns empty array for empty input', () => {
    expect(smoothDecimate([], 10)).toEqual([])
  })

  it('returns all points when data.length <= targetPoints', () => {
    const data = [10, 20, 30, 40, 50]
    const result = smoothDecimate(data, 10)
    expect(result).toHaveLength(5)
    expect(result.map((p) => p.y)).toEqual(data)
    expect(result.map((p) => p.x)).toEqual([0, 1, 2, 3, 4])
  })

  it('returns all points when targetPoints equals data length', () => {
    const data = [1, 2, 3, 4, 5]
    const result = smoothDecimate(data, 5)
    expect(result).toHaveLength(5)
  })

  it('handles targetPoints < 2 gracefully', () => {
    const data = [10, 20, 30]
    const result = smoothDecimate(data, 1)
    // Should clamp to 2 and still work
    expect(result.length).toBeGreaterThanOrEqual(2)
  })

  // ─── Basic downsampling ───

  it('reduces point count for large datasets', () => {
    const data = new Array(1000).fill(0).map((_, i) => Math.sin(i * 0.01) * 100)
    const result = smoothDecimate(data, 100)
    // Should be roughly around target, possibly more with min/max guards
    expect(result.length).toBeGreaterThanOrEqual(100)
    expect(result.length).toBeLessThan(300) // at most ~3x target
  })

  it('output is sorted by x index', () => {
    const data = new Array(500).fill(0).map((_, i) => Math.sin(i * 0.05) * 50 + 100)
    const result = smoothDecimate(data, 50)
    for (let i = 1; i < result.length; i++) {
      expect(result[i].x).toBeGreaterThan(result[i - 1].x)
    }
  })

  it('always includes first and last indices', () => {
    const data = new Array(200).fill(0).map((_, i) => i * 2)
    const result = smoothDecimate(data, 20)
    expect(result[0].x).toBe(0)
    expect(result[result.length - 1].x).toBe(199)
  })

  // ─── Peak preservation ───

  it('preserves a large spike in otherwise flat data', () => {
    // 1000 points, all 100 except index 500 which spikes to 300
    const data = new Array(1000).fill(100)
    data[500] = 300
    const result = smoothDecimate(data, 50)
    // The spike at index 500 should be preserved
    const maxPoint = result.reduce((max, p) => (p.y > max.y ? p : max), result[0])
    expect(maxPoint.y).toBe(300)
    expect(maxPoint.x).toBe(500)
  })

  it('preserves a valley/dip in otherwise flat data', () => {
    const data = new Array(1000).fill(200)
    data[333] = 50
    const result = smoothDecimate(data, 50)
    const minPoint = result.reduce((min, p) => (p.y < min.y ? p : min), result[0])
    expect(minPoint.y).toBe(50)
    expect(minPoint.x).toBe(333)
  })

  it('preserves both peak and valley in same bucket', () => {
    const data = new Array(500).fill(100)
    // Spike and dip close together
    data[250] = 300
    data[252] = 20
    const result = smoothDecimate(data, 25)
    const values = result.map((p) => p.y)
    expect(values).toContain(300)
    expect(values).toContain(20)
  })

  // ─── Even spacing ───

  it('evenly-spaced sample points are present', () => {
    const data = new Array(300).fill(0).map((_, i) => i)
    const target = 30
    const result = smoothDecimate(data, target)
    // Check that evenly-spaced indices are in the result
    const stride = (data.length - 1) / (target - 1)
    for (let b = 0; b < target; b++) {
      const expectedIdx = Math.round(b * stride)
      expect(result.some((p) => p.x === expectedIdx)).toBe(true)
    }
  })

  // ─── Deviation threshold ───

  it('does not include min/max when deviation is below threshold', () => {
    // Smooth ramp — min/max within each bucket are close to the sample
    const data = new Array(300).fill(0).map((_, i) => i)
    const result = smoothDecimate(data, 30, 0.15)
    // For a linear ramp, min/max shouldn't deviate much from the sample
    // Result should be close to target (not many extra points)
    expect(result.length).toBeLessThanOrEqual(60) // at most 2× target
  })

  it('includes more points with lower deviation threshold', () => {
    const data = new Array(1000).fill(0).map((_, i) => Math.sin(i * 0.02) * 100)
    const strict = smoothDecimate(data, 50, 0.5)   // high threshold — fewer extras
    const loose = smoothDecimate(data, 50, 0.05)    // low threshold — more extras
    expect(loose.length).toBeGreaterThanOrEqual(strict.length)
  })

  // ─── Real-world scenario ───

  it('handles power-like data with intervals', () => {
    // Simulate: warmup → intervals → cooldown
    const data: number[] = []
    for (let i = 0; i < 3000; i++) {
      const t = i / 3000
      if (t < 0.2) data.push(150)
      else if (t < 0.7) {
        const interval = Math.floor((t - 0.2) * 8)
        data.push(interval % 2 === 0 ? 280 : 120)
      } else data.push(130)
    }
    const result = smoothDecimate(data, 200)
    // Should preserve the interval transitions (peaks at 280, valleys at 120)
    const values = result.map((p) => p.y)
    expect(Math.max(...values)).toBe(280)
    expect(Math.min(...values)).toBe(120)
    // Output should be reasonable size
    expect(result.length).toBeGreaterThanOrEqual(200)
    expect(result.length).toBeLessThan(600)
  })
})
