// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { scaleTime, formatTimeTick } from '../time'

describe('scaleTime', () => {
  const day1 = new Date('2024-01-01T00:00:00Z')
  const day2 = new Date('2024-01-02T00:00:00Z')

  it('maps dates to range', () => {
    const s = scaleTime([day1, day2], [0, 1000])
    expect(s(day1)).toBeCloseTo(0)
    expect(s(day2)).toBeCloseTo(1000)
    // Midday should be at 500
    const mid = new Date('2024-01-01T12:00:00Z')
    expect(s(mid)).toBeCloseTo(500)
  })

  it('accepts epoch-ms as domain', () => {
    const s = scaleTime([day1.getTime(), day2.getTime()], [0, 500])
    expect(s(day1.getTime())).toBeCloseTo(0)
    expect(s(day2.getTime())).toBeCloseTo(500)
  })

  it('inverse maps range back to Date', () => {
    const s = scaleTime([day1, day2], [0, 1000])
    const inv = s.inverse(500)
    expect(inv).toBeInstanceOf(Date)
    expect(inv.getTime()).toBeCloseTo(new Date('2024-01-01T12:00:00Z').getTime(), -2)
  })

  it('clamp restricts to domain bounds', () => {
    const s = scaleTime([day1, day2], [0, 1000])
    const before = new Date('2023-12-31T00:00:00Z')
    const after = new Date('2024-01-03T00:00:00Z')
    expect(s.clamp(before)).toBeCloseTo(0)
    expect(s.clamp(after)).toBeCloseTo(1000)
  })

  it('generates ticks', () => {
    const s = scaleTime([day1, day2], [0, 1000])
    const ticks = s.ticks(6)
    expect(ticks.length).toBeGreaterThan(0)
    expect(ticks[0]).toBeInstanceOf(Date)
    // All ticks should be within domain
    for (const t of ticks) {
      expect(t.getTime()).toBeGreaterThanOrEqual(day1.getTime() - 1)
      expect(t.getTime()).toBeLessThanOrEqual(day2.getTime() + 1)
    }
  })

  it('exposes domain and range', () => {
    const s = scaleTime([day1, day2], [0, 100])
    expect(s.domain).toEqual([day1.getTime(), day2.getTime()])
    expect(s.range).toEqual([0, 100])
  })

  it('handles degenerate domain', () => {
    const s = scaleTime([day1, day1], [0, 100])
    expect(s(day1)).toBe(0)
    const ticks = s.ticks()
    expect(ticks).toHaveLength(1)
  })

  it('handles multi-month span', () => {
    const jan = new Date('2024-01-01')
    const jun = new Date('2024-06-01')
    const s = scaleTime([jan, jun], [0, 600])
    expect(s(jan)).toBeCloseTo(0)
    expect(s(jun)).toBeCloseTo(600)
    const ticks = s.ticks(5)
    expect(ticks.length).toBeGreaterThan(0)
  })
})

describe('formatTimeTick', () => {
  it('formats sub-minute span as HH:MM:SS', () => {
    const d = new Date('2024-01-01T14:30:45Z')
    const result = formatTimeTick(d, 30_000)
    expect(result).toContain(':')
    // Should show seconds
    expect(result.split(':').length).toBe(3)
  })

  it('formats sub-day span as HH:MM', () => {
    const d = new Date('2024-01-01T14:30:00Z')
    const result = formatTimeTick(d, 3_600_000)
    expect(result).toContain(':')
  })

  it('formats sub-month span as MMM d', () => {
    const d = new Date('2024-03-15')
    const result = formatTimeTick(d, 604_800_000)
    expect(result).toContain('Mar')
  })

  it('formats multi-year span as MMM YYYY', () => {
    const d = new Date('2024-06-15')
    const result = formatTimeTick(d, 63_072_000_000)
    expect(result).toContain('2024')
  })
})
