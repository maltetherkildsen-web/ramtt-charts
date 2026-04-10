// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { bisectNearest, bisectData } from '../bisect'

describe('bisectNearest', () => {
  it('returns -1 for empty array', () => {
    expect(bisectNearest([], 5)).toBe(-1)
  })

  it('returns 0 for single-element array', () => {
    expect(bisectNearest([10], 5)).toBe(0)
    expect(bisectNearest([10], 15)).toBe(0)
  })

  it('finds exact match', () => {
    expect(bisectNearest([10, 20, 30, 40, 50], 30)).toBe(2)
  })

  it('finds nearest when between values', () => {
    expect(bisectNearest([0, 10, 20, 30], 12)).toBe(1) // closer to 10
    expect(bisectNearest([0, 10, 20, 30], 18)).toBe(2) // closer to 20
  })

  it('returns 0 when target is below range', () => {
    expect(bisectNearest([10, 20, 30], -5)).toBe(0)
  })

  it('returns last index when target is above range', () => {
    expect(bisectNearest([10, 20, 30], 100)).toBe(2)
  })

  it('handles two elements', () => {
    expect(bisectNearest([0, 100], 30)).toBe(0) // closer to 0
    expect(bisectNearest([0, 100], 70)).toBe(1) // closer to 100
    expect(bisectNearest([0, 100], 50)).toBe(1) // equidistant, picks lo (hi=0, lo=1, equal distance → lo wins)
  })
})

describe('bisectData', () => {
  it('returns -1 for empty data', () => {
    expect(bisectData([], (d) => d, 5)).toBe(-1)
  })

  it('finds nearest with accessor', () => {
    const data = [{ x: 0 }, { x: 10 }, { x: 20 }]
    expect(bisectData(data, (d) => d.x, 12)).toBe(1)
    expect(bisectData(data, (d) => d.x, 18)).toBe(2)
  })

  it('handles single element', () => {
    expect(bisectData([{ v: 42 }], (d) => d.v, 0)).toBe(0)
  })
})
