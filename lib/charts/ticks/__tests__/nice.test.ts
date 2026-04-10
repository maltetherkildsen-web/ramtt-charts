// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { niceTicks, niceNum } from '../nice'

describe('niceTicks', () => {
  it('returns single value when min === max', () => {
    expect(niceTicks(5, 5)).toEqual([5])
  })

  it('returns empty array when count < 1', () => {
    expect(niceTicks(0, 100, 0)).toEqual([])
  })

  it('generates approximately the requested number of ticks', () => {
    const ticks = niceTicks(0, 100, 5)
    expect(ticks.length).toBeGreaterThanOrEqual(3)
    expect(ticks.length).toBeLessThanOrEqual(8)
  })

  it('produces sorted ascending values', () => {
    const ticks = niceTicks(0, 1000, 5)
    for (let i = 1; i < ticks.length; i++) {
      expect(ticks[i]).toBeGreaterThan(ticks[i - 1])
    }
  })

  it('ticks are within or near the domain', () => {
    const ticks = niceTicks(10, 90, 5)
    expect(ticks[0]).toBeGreaterThanOrEqual(10)
    expect(ticks[ticks.length - 1]).toBeLessThanOrEqual(90 + 1e-6)
  })

  it('handles swapped min/max', () => {
    const ticks = niceTicks(100, 0, 5)
    expect(ticks.length).toBeGreaterThan(0)
    expect(ticks[0]).toBeLessThan(ticks[ticks.length - 1])
  })

  it('handles negative ranges', () => {
    const ticks = niceTicks(-100, -20, 4)
    expect(ticks.length).toBeGreaterThan(0)
    ticks.forEach((t) => expect(t).toBeLessThanOrEqual(0))
  })

  it('uses human-friendly step sizes', () => {
    const ticks = niceTicks(0, 100, 5)
    const step = ticks[1] - ticks[0]
    // Step should be one of: 1, 2, 2.5, 5, 10, 20, 25, 50, etc.
    const normalized = step / Math.pow(10, Math.floor(Math.log10(step)))
    expect([1, 2, 2.5, 5, 10]).toContainEqual(Math.round(normalized * 10) / 10)
  })
})

describe('niceNum', () => {
  it('returns 0 for 0', () => {
    expect(niceNum(0)).toBe(0)
  })

  it('rounds up to nice ceiling', () => {
    expect(niceNum(7)).toBe(10)
    expect(niceNum(3)).toBe(5)
    expect(niceNum(1.5)).toBe(2)
  })

  it('rounds to nearest when round=true', () => {
    // frac of 7 = 7/10^0 = 7 → >= 7 → rounds to 10
    expect(niceNum(7, true)).toBe(10)
    expect(niceNum(1.2, true)).toBe(1)
  })

  it('handles negative values', () => {
    expect(niceNum(-7)).toBe(-10)
    expect(niceNum(-3)).toBe(-5)
  })
})
