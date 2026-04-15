// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { scaleLog, niceLogTicks } from '../log'

describe('scaleLog', () => {
  it('maps domain values to range using log transform', () => {
    const s = scaleLog([1, 1000], [0, 300])
    expect(s(1)).toBeCloseTo(0)
    expect(s(1000)).toBeCloseTo(300)
    // log10(10) = 1, which is 1/3 of log10(1000) = 3
    expect(s(10)).toBeCloseTo(100)
    expect(s(100)).toBeCloseTo(200)
  })

  it('handles inverted range', () => {
    const s = scaleLog([1, 1000], [300, 0])
    expect(s(1)).toBeCloseTo(300)
    expect(s(1000)).toBeCloseTo(0)
  })

  it('inverse maps range back to domain', () => {
    const s = scaleLog([1, 1000], [0, 300])
    expect(s.inverse(0)).toBeCloseTo(1)
    expect(s.inverse(100)).toBeCloseTo(10)
    expect(s.inverse(200)).toBeCloseTo(100)
    expect(s.inverse(300)).toBeCloseTo(1000)
  })

  it('clamp restricts to domain bounds', () => {
    const s = scaleLog([1, 1000], [0, 300])
    expect(s.clamp(0.001)).toBeCloseTo(0) // Clamped to 1
    expect(s.clamp(10000)).toBeCloseTo(300) // Clamped to 1000
    expect(s.clamp(10)).toBeCloseTo(100) // Within bounds
  })

  it('exposes domain, range, and base', () => {
    const s = scaleLog([1, 100], [0, 200])
    expect(s.domain).toEqual([1, 100])
    expect(s.range).toEqual([0, 200])
    expect(s.base).toBe(10)
  })

  it('supports custom base', () => {
    const s = scaleLog([1, 8], [0, 300], 2)
    // log2(1) = 0, log2(8) = 3 → even spacing
    expect(s(1)).toBeCloseTo(0)
    expect(s(2)).toBeCloseTo(100)
    expect(s(4)).toBeCloseTo(200)
    expect(s(8)).toBeCloseTo(300)
    expect(s.base).toBe(2)
  })

  it('handles degenerate domain', () => {
    const s = scaleLog([100, 100], [0, 500])
    expect(s(100)).toBe(0) // ratio is 0
  })

  it('handles MMP-typical domain (3s to 3600s)', () => {
    const s = scaleLog([3, 3600], [0, 800])
    expect(s(3)).toBeCloseTo(0)
    expect(s(3600)).toBeCloseTo(800)
    // 60s should be between 0 and 800
    const v60 = s(60)
    expect(v60).toBeGreaterThan(0)
    expect(v60).toBeLessThan(800)
  })
})

describe('niceLogTicks', () => {
  it('generates ticks for base-10 range', () => {
    const ticks = niceLogTicks(1, 1000)
    expect(ticks).toContain(1)
    expect(ticks).toContain(10)
    expect(ticks).toContain(100)
    expect(ticks).toContain(1000)
    // Should also contain 2, 5, 20, 50, etc.
    expect(ticks).toContain(2)
    expect(ticks).toContain(5)
    expect(ticks).toContain(50)
    expect(ticks).toContain(200)
    expect(ticks).toContain(500)
  })

  it('respects min/max bounds', () => {
    const ticks = niceLogTicks(3, 600)
    expect(ticks.every((t) => t >= 3 && t <= 600)).toBe(true)
    expect(ticks.length).toBeGreaterThan(0)
  })

  it('handles min <= 0 by clamping to 1', () => {
    const ticks = niceLogTicks(0, 100)
    expect(ticks[0]).toBeGreaterThanOrEqual(1)
  })

  it('returns [min] when max <= min', () => {
    expect(niceLogTicks(10, 5)).toEqual([10])
  })
})
