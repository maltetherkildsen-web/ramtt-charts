// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { findPeakPower, computeAllPeaks, buildMMPCurve, PEAK_DURATIONS } from '../peakPower'

describe('findPeakPower', () => {
  it('finds peak in a simple array', () => {
    // 10 seconds: [100, 200, 300, 400, 500, 200, 100, 50, 50, 50]
    const data = [100, 200, 300, 400, 500, 200, 100, 50, 50, 50]
    const result = findPeakPower(data, 3)
    // Best 3s window: [300, 400, 500] = avg 400
    expect(result.avgPower).toBe(400)
    expect(result.startIdx).toBe(2)
    expect(result.endIdx).toBe(4)
  })

  it('returns 0 when data is shorter than window', () => {
    const result = findPeakPower([100, 200], 5)
    expect(result.avgPower).toBe(0)
  })

  it('handles window = 1 (peak power)', () => {
    const data = [50, 100, 300, 200, 150]
    const result = findPeakPower(data, 1)
    expect(result.avgPower).toBe(300)
    expect(result.startIdx).toBe(2)
  })

  it('handles all-equal values', () => {
    const data = new Array(100).fill(250)
    const result = findPeakPower(data, 10)
    expect(result.avgPower).toBe(250)
  })

  it('handles window = data length', () => {
    const data = [100, 200, 300]
    const result = findPeakPower(data, 3)
    expect(result.avgPower).toBe(200)
    expect(result.startIdx).toBe(0)
    expect(result.endIdx).toBe(2)
  })
})

describe('computeAllPeaks', () => {
  it('returns peaks for durations that fit', () => {
    // 120 seconds of data → should include 3s, 10s, 30s, 1m but not 3m+
    const data = new Array(120).fill(0).map((_, i) => 200 + Math.sin(i / 10) * 50)
    const peaks = computeAllPeaks(data)
    const labels = peaks.map((p) => p.label)
    expect(labels).toContain('3s')
    expect(labels).toContain('10s')
    expect(labels).toContain('30s')
    expect(labels).toContain('1m')
    expect(labels).not.toContain('3m')
  })

  it('returns empty for very short data', () => {
    expect(computeAllPeaks([100, 200])).toEqual([])
  })
})

describe('buildMMPCurve', () => {
  it('builds a curve from 1s to maxSeconds', () => {
    const data = new Array(60).fill(0).map((_, i) => 300 - i)
    const curve = buildMMPCurve(data, 30)
    expect(curve).toHaveLength(30)
    expect(curve[0].seconds).toBe(1)
    expect(curve[29].seconds).toBe(30)
    // 1s peak should be highest
    expect(curve[0].watts).toBeGreaterThanOrEqual(curve[29].watts)
  })

  it('caps at data length', () => {
    const data = [100, 200, 300]
    const curve = buildMMPCurve(data, 100)
    expect(curve).toHaveLength(3)
  })

  it('returns empty for empty data', () => {
    expect(buildMMPCurve([])).toEqual([])
  })
})

describe('PEAK_DURATIONS', () => {
  it('has standard durations', () => {
    expect(PEAK_DURATIONS.length).toBeGreaterThanOrEqual(10)
    expect(PEAK_DURATIONS[0].seconds).toBe(3)
    expect(PEAK_DURATIONS[PEAK_DURATIONS.length - 1].seconds).toBe(3600)
  })
})
