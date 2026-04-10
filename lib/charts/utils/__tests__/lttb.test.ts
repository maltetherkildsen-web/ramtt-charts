// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { lttb, type Point } from '../lttb'

describe('lttb', () => {
  it('returns copy when threshold >= data length', () => {
    const data: Point[] = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }]
    const result = lttb(data, 10)
    expect(result).toHaveLength(3)
    expect(result).not.toBe(data) // should be a new array
  })

  it('returns copy when threshold < 2', () => {
    const data: Point[] = [{ x: 0, y: 0 }, { x: 1, y: 1 }]
    const result = lttb(data, 1)
    expect(result).toHaveLength(2)
  })

  it('downsamples to target count', () => {
    const data: Point[] = Array.from({ length: 100 }, (_, i) => ({
      x: i,
      y: Math.sin(i * 0.1) * 50,
    }))
    const result = lttb(data, 20)
    expect(result).toHaveLength(20)
  })

  it('always preserves first and last points', () => {
    const data: Point[] = Array.from({ length: 200 }, (_, i) => ({
      x: i,
      y: Math.random() * 100,
    }))
    const result = lttb(data, 10)
    expect(result[0]).toBe(data[0])
    expect(result[result.length - 1]).toBe(data[data.length - 1])
  })

  it('preserves visual shape — spike is kept', () => {
    const data: Point[] = Array.from({ length: 100 }, (_, i) => ({
      x: i,
      y: i === 50 ? 1000 : 10,
    }))
    const result = lttb(data, 10)
    const maxY = Math.max(...result.map((p) => p.y))
    expect(maxY).toBe(1000)
  })

  it('output is sorted by x', () => {
    const data: Point[] = Array.from({ length: 500 }, (_, i) => ({
      x: i * 2,
      y: Math.sin(i * 0.05),
    }))
    const result = lttb(data, 50)
    for (let i = 1; i < result.length; i++) {
      expect(result[i].x).toBeGreaterThan(result[i - 1].x)
    }
  })
})
