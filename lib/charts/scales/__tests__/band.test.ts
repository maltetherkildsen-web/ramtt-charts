// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { scaleBand } from '../band'

describe('scaleBand', () => {
  it('maps labels to pixel positions', () => {
    const s = scaleBand(['a', 'b', 'c'], [0, 300])
    expect(s('a')).toBe(0)
    expect(s('b')).toBe(100)
    expect(s('c')).toBe(200)
  })

  it('returns undefined for unknown labels', () => {
    const s = scaleBand(['a', 'b'], [0, 200])
    expect(s('z')).toBeUndefined()
  })

  it('computes bandwidth and step', () => {
    const s = scaleBand(['a', 'b', 'c'], [0, 300])
    expect(s.bandwidth()).toBe(100)
    expect(s.step()).toBe(100)
  })

  it('applies inner padding', () => {
    const s = scaleBand(['a', 'b', 'c'], [0, 300], { paddingInner: 0.5 })
    // step = 300 / (3 - 0.5 + 0) = 300 / 2.5 = 120
    // bandwidth = 120 * 0.5 = 60
    expect(s.step()).toBeCloseTo(120)
    expect(s.bandwidth()).toBeCloseTo(60)
  })

  it('applies outer padding', () => {
    const s = scaleBand(['a', 'b'], [0, 200], { paddingOuter: 0.5 })
    // step = 200 / (2 - 0 + 1) = 200 / 3 ≈ 66.67
    // offset = 0 + step * 0.5 ≈ 33.33
    const step = s.step()
    expect(step).toBeCloseTo(200 / 3)
    expect(s('a')).toBeCloseTo(step * 0.5)
  })

  it('handles empty domain', () => {
    const s = scaleBand([], [0, 500])
    expect(s.bandwidth()).toBe(0)
    expect(s.step()).toBe(0)
    expect(s('x')).toBeUndefined()
  })

  it('handles single label', () => {
    const s = scaleBand(['only'], [0, 100])
    // step = 100 / (1 - 0 + 0) = 100
    expect(s('only')).toBe(0)
    expect(s.bandwidth()).toBe(100)
  })

  it('exposes domain and range', () => {
    const s = scaleBand(['x', 'y'], [10, 210])
    expect(s.domain).toEqual(['x', 'y'])
    expect(s.range).toEqual([10, 210])
    expect(s.paddingInner).toBe(0)
    expect(s.paddingOuter).toBe(0)
  })
})
