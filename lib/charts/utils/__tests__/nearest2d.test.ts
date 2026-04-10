import { describe, it, expect } from 'vitest'
import { nearest2d } from '../nearest2d'

describe('nearest2d', () => {
  it('returns index -1 and Infinity distance for empty array', () => {
    const result = nearest2d([], 5, 5)
    expect(result.index).toBe(-1)
    expect(result.distance).toBe(Infinity)
  })

  it('returns 0 for single-element array', () => {
    const result = nearest2d([{ x: 10, y: 20 }], 0, 0)
    expect(result.index).toBe(0)
    expect(result.distance).toBeCloseTo(Math.sqrt(100 + 400))
  })

  it('finds exact match with distance 0', () => {
    const data = [{ x: 0, y: 0 }, { x: 10, y: 10 }, { x: 20, y: 20 }]
    const result = nearest2d(data, 10, 10)
    expect(result.index).toBe(1)
    expect(result.distance).toBe(0)
  })

  it('finds nearest by euclidean distance', () => {
    const data = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
      { x: 5, y: 5 },
    ]
    // Target (4, 4) — closest to (5, 5) at distance sqrt(2)
    const result = nearest2d(data, 4, 4)
    expect(result.index).toBe(2)
    expect(result.distance).toBeCloseTo(Math.SQRT2)
  })

  it('picks first match when equidistant', () => {
    const data = [
      { x: 0, y: 0 },
      { x: 10, y: 0 },
    ]
    // Target (5, 0) — equidistant from both, picks first (index 0)
    const result = nearest2d(data, 5, 0)
    expect(result.index).toBe(0)
    expect(result.distance).toBe(5)
  })

  it('handles large dataset', () => {
    const data = Array.from({ length: 1000 }, (_, i) => ({
      x: i,
      y: i * 2,
    }))
    const result = nearest2d(data, 500, 1000)
    expect(result.index).toBe(500)
    expect(result.distance).toBe(0)
  })

  it('handles negative coordinates', () => {
    const data = [
      { x: -10, y: -10 },
      { x: 10, y: 10 },
    ]
    const result = nearest2d(data, -8, -8)
    expect(result.index).toBe(0)
    expect(result.distance).toBeCloseTo(Math.sqrt(8))
  })
})
