import { describe, it, expect } from 'vitest'
import { extent, extentOf } from '../extent'

describe('extent', () => {
  it('returns [0, 0] for empty data', () => {
    expect(extent([], (d) => d)).toEqual([0, 0])
  })

  it('finds min and max', () => {
    const data = [{ v: 10 }, { v: 5 }, { v: 20 }, { v: 3 }]
    expect(extent(data, (d) => d.v)).toEqual([3, 20])
  })

  it('applies padding', () => {
    const data = [{ v: 0 }, { v: 100 }]
    const [min, max] = extent(data, (d) => d.v, 0.1)
    expect(min).toBe(-10)
    expect(max).toBe(110)
  })

  it('handles single element with padding', () => {
    const data = [{ v: 50 }]
    const [min, max] = extent(data, (d) => d.v, 0.1)
    // Range is 0, so padding uses 1 as fallback
    expect(min).toBe(49.9)
    expect(max).toBe(50.1)
  })

  it('handles all same values', () => {
    const data = [5, 5, 5, 5]
    expect(extent(data, (d) => d)).toEqual([5, 5])
  })
})

describe('extentOf', () => {
  it('works as shorthand for number arrays', () => {
    expect(extentOf([10, 20, 30])).toEqual([10, 30])
  })

  it('applies padding', () => {
    const [min, max] = extentOf([0, 100], 0.05)
    expect(min).toBe(-5)
    expect(max).toBe(105)
  })

  it('handles empty array', () => {
    expect(extentOf([])).toEqual([0, 0])
  })

  it('handles negative values', () => {
    expect(extentOf([-20, -5, -10])).toEqual([-20, -5])
  })
})
