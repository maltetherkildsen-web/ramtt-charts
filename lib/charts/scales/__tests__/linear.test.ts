import { describe, it, expect } from 'vitest'
import { scaleLinear } from '../linear'

describe('scaleLinear', () => {
  it('maps domain values to range', () => {
    const s = scaleLinear([0, 100], [0, 500])
    expect(s(0)).toBe(0)
    expect(s(50)).toBe(250)
    expect(s(100)).toBe(500)
  })

  it('handles inverted range', () => {
    const s = scaleLinear([0, 100], [500, 0])
    expect(s(0)).toBe(500)
    expect(s(100)).toBe(0)
    expect(s(50)).toBe(250)
  })

  it('extrapolates outside domain', () => {
    const s = scaleLinear([0, 100], [0, 200])
    expect(s(150)).toBe(300)
    expect(s(-50)).toBe(-100)
  })

  it('inverse maps range back to domain', () => {
    const s = scaleLinear([10, 20], [100, 200])
    expect(s.inverse(100)).toBe(10)
    expect(s.inverse(200)).toBe(20)
    expect(s.inverse(150)).toBe(15)
  })

  it('clamp restricts to domain bounds', () => {
    const s = scaleLinear([0, 100], [0, 500])
    expect(s.clamp(-50)).toBe(0)
    expect(s.clamp(200)).toBe(500)
    expect(s.clamp(50)).toBe(250)
  })

  it('exposes domain and range tuples', () => {
    const s = scaleLinear([5, 10], [0, 100])
    expect(s.domain).toEqual([5, 10])
    expect(s.range).toEqual([0, 100])
  })

  it('handles degenerate domain (min === max)', () => {
    const s = scaleLinear([50, 50], [0, 100])
    // Should not throw, returns range start
    expect(s(50)).toBe(0)
  })
})
