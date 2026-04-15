// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { computePMC, computeTSS } from '../pmc'

describe('computePMC', () => {
  it('returns arrays of same length as input', () => {
    const loads = [80, 60, 100, 0, 70, 90, 50]
    const { ctl, atl, tsb } = computePMC(loads)
    expect(ctl).toHaveLength(7)
    expect(atl).toHaveLength(7)
    expect(tsb).toHaveLength(7)
  })

  it('TSB = CTL - ATL for every day', () => {
    const loads = [100, 50, 75, 0, 120, 60, 80, 0, 90, 45]
    const { ctl, atl, tsb } = computePMC(loads)
    for (let i = 0; i < loads.length; i++) {
      expect(tsb[i]).toBeCloseTo(ctl[i] - atl[i], 0)
    }
  })

  it('ATL responds faster than CTL to a sudden load spike', () => {
    const loads = new Array(30).fill(0)
    loads[10] = 200 // Single big training day
    const { ctl, atl } = computePMC(loads)
    // Day after spike: ATL should be higher than CTL (shorter time constant)
    expect(atl[11]).toBeGreaterThan(ctl[11])
  })

  it('CTL converges towards steady-state load', () => {
    // 300 days of constant 80 TSS → CTL should approach 80
    const loads = new Array(300).fill(80)
    const { ctl } = computePMC(loads)
    // EWMA asymptotically approaches the constant, allow 1.0 tolerance
    expect(ctl[299]).toBeCloseTo(80, 0)
  })

  it('ATL converges faster than CTL', () => {
    const loads = new Array(50).fill(100)
    const { ctl, atl } = computePMC(loads)
    // After 14 days, ATL should be closer to 100 than CTL
    expect(Math.abs(atl[13] - 100)).toBeLessThan(Math.abs(ctl[13] - 100))
  })

  it('handles custom time constants', () => {
    const loads = new Array(200).fill(60)
    const { ctl, atl } = computePMC(loads, { ctlDays: 28, atlDays: 5 })
    // With shorter constants, convergence is faster
    expect(ctl[199]).toBeCloseTo(60, 0)
    expect(atl[199]).toBeCloseTo(60, 0)
  })

  it('handles initial values', () => {
    const loads = [0] // One rest day
    const { ctl, atl } = computePMC(loads, { initialCtl: 80, initialAtl: 50 })
    // Values should decay from initial
    expect(ctl[0]).toBeLessThan(80)
    expect(ctl[0]).toBeGreaterThan(70) // Shouldn't drop too much in one day
    expect(atl[0]).toBeLessThan(50)
  })

  it('handles empty input', () => {
    const { ctl, atl, tsb } = computePMC([])
    expect(ctl).toHaveLength(0)
    expect(atl).toHaveLength(0)
    expect(tsb).toHaveLength(0)
  })

  it('TSB is negative when fresh load outpaces fitness', () => {
    // Start fresh, then heavy block → TSB should go negative
    const loads = new Array(7).fill(150)
    const { tsb } = computePMC(loads)
    // ATL rises faster than CTL → TSB negative
    expect(tsb[6]).toBeLessThan(0)
  })
})

describe('computeTSS', () => {
  it('computes correct TSS for a 1-hour ride at FTP', () => {
    // 1 hour at NP = FTP → IF = 1.0 → TSS = 100
    const tss = computeTSS(3600, 250, 250)
    expect(tss).toBe(100)
  })

  it('scales with intensity', () => {
    // Half intensity for 1 hour: NP = 125, FTP = 250, IF = 0.5
    // TSS = (3600 * 125 * 0.5) / (250 * 3600) * 100 = 25
    const tss = computeTSS(3600, 125, 250)
    expect(tss).toBe(25)
  })

  it('returns 0 for invalid inputs', () => {
    expect(computeTSS(0, 200, 250)).toBe(0)
    expect(computeTSS(3600, 200, 0)).toBe(0)
  })
})
