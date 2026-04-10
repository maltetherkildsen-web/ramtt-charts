// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { stackSeries } from '../stack'

describe('stackSeries', () => {
  it('returns empty arrays for empty data', () => {
    const result = stackSeries([], [(d: any) => d.a])
    expect(result).toHaveLength(1)
    expect(result[0]).toHaveLength(0)
  })

  it('first series has y0 = 0', () => {
    const data = [{ a: 10, b: 20 }]
    const result = stackSeries(data, [(d) => d.a, (d) => d.b])
    expect(result[0][0].y0).toBe(0)
    expect(result[0][0].y1).toBe(10)
  })

  it('second series stacks on first', () => {
    const data = [{ a: 10, b: 20 }]
    const result = stackSeries(data, [(d) => d.a, (d) => d.b])
    expect(result[1][0].y0).toBe(10)
    expect(result[1][0].y1).toBe(30)
  })

  it('stacks correctly across multiple data points', () => {
    const data = [
      { x: 30, y: 20 },
      { x: 10, y: 40 },
    ]
    const result = stackSeries(data, [(d) => d.x, (d) => d.y])

    // Point 0
    expect(result[0][0]).toEqual({ y0: 0, y1: 30 })
    expect(result[1][0]).toEqual({ y0: 30, y1: 50 })

    // Point 1
    expect(result[0][1]).toEqual({ y0: 0, y1: 10 })
    expect(result[1][1]).toEqual({ y0: 10, y1: 50 })
  })

  it('handles three series', () => {
    const data = [{ a: 10, b: 20, c: 30 }]
    const result = stackSeries(data, [(d) => d.a, (d) => d.b, (d) => d.c])
    expect(result).toHaveLength(3)
    expect(result[0][0]).toEqual({ y0: 0, y1: 10 })
    expect(result[1][0]).toEqual({ y0: 10, y1: 30 })
    expect(result[2][0]).toEqual({ y0: 30, y1: 60 })
  })

  it('top of last series equals total', () => {
    const data = [{ a: 15, b: 25, c: 35 }]
    const result = stackSeries(data, [(d) => d.a, (d) => d.b, (d) => d.c])
    const top = result[result.length - 1][0].y1
    expect(top).toBe(75)
  })

  it('y1 - y0 equals the original value', () => {
    const data = [{ a: 12, b: 34 }]
    const result = stackSeries(data, [(d) => d.a, (d) => d.b])
    expect(result[0][0].y1 - result[0][0].y0).toBe(12)
    expect(result[1][0].y1 - result[1][0].y0).toBe(34)
  })
})
