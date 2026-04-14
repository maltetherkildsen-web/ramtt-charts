import { describe, it, expect } from 'vitest'
import { sma } from './sma'

describe('sma', () => {
  it('returns nulls for window larger than data', () => {
    expect(sma([1, 2, 3], 5)).toEqual([null, null, null])
  })

  it('returns identity for window=1', () => {
    expect(sma([10, 20, 30], 1)).toEqual([10, 20, 30])
  })

  it('computes correct SMA for window=3', () => {
    const result = sma([1, 2, 3, 4, 5], 3)
    expect(result[0]).toBeNull()
    expect(result[1]).toBeNull()
    expect(result[2]).toBeCloseTo(2)      // (1+2+3)/3
    expect(result[3]).toBeCloseTo(3)      // (2+3+4)/3
    expect(result[4]).toBeCloseTo(4)      // (3+4+5)/3
  })

  it('handles empty array', () => {
    expect(sma([], 5)).toEqual([])
  })

  it('handles single element', () => {
    expect(sma([42], 1)).toEqual([42])
    expect(sma([42], 3)).toEqual([null])
  })
})
