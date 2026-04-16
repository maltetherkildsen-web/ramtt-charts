import { describe, it, expect } from 'vitest'
import { clampViewport, pixelToFraction, indicesToFractions, fractionsToIndices } from './zoom'

describe('clampViewport', () => {
  it('clamps start to 0', () => {
    const { start } = clampViewport(-0.5, 0.5)
    expect(start).toBe(0)
  })

  it('clamps end to 1', () => {
    const { end } = clampViewport(0.5, 1.5)
    expect(end).toBe(1)
  })

  it('enforces minimum width', () => {
    const { start, end } = clampViewport(0.5, 0.5, 0.1)
    expect(end - start).toBeCloseTo(0.1, 10)
  })

  it('passes through valid viewport', () => {
    const { start, end } = clampViewport(0.2, 0.8)
    expect(start).toBe(0.2)
    expect(end).toBe(0.8)
  })
})

describe('pixelToFraction', () => {
  it('returns 0 for 0 pixels', () => {
    expect(pixelToFraction(0, 100)).toBe(0)
  })

  it('returns 1 for full width', () => {
    expect(pixelToFraction(100, 100)).toBe(1)
  })

  it('clamps to 0-1 range', () => {
    expect(pixelToFraction(-10, 100)).toBe(0)
    expect(pixelToFraction(200, 100)).toBe(1)
  })

  it('returns 0 for zero container width', () => {
    expect(pixelToFraction(50, 0)).toBe(0)
  })
})

describe('indicesToFractions', () => {
  it('converts indices to fractions', () => {
    const { start, end } = indicesToFractions(0, 99, 100)
    expect(start).toBe(0)
    expect(end).toBe(1)
  })

  it('returns 0-1 for single data point', () => {
    const { start, end } = indicesToFractions(0, 0, 1)
    expect(start).toBe(0)
    expect(end).toBe(1)
  })
})

describe('fractionsToIndices', () => {
  it('converts fractions to indices', () => {
    const { start, end } = fractionsToIndices(0, 1, 100)
    expect(start).toBe(0)
    expect(end).toBe(99)
  })

  it('rounds to nearest index', () => {
    const { start } = fractionsToIndices(0.33, 1, 100)
    expect(start).toBe(Math.round(0.33 * 99))
  })
})
