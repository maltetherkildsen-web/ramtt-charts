import { describe, it, expect } from 'vitest'
import { linePath } from '../line'

describe('linePath', () => {
  it('returns empty string for empty data', () => {
    expect(linePath([], (d) => d, (d) => d)).toBe('')
  })

  it('generates M for first point and L for subsequent', () => {
    const data = [0, 10, 20]
    const d = linePath(data, (_, i) => i * 100, (v) => v)
    expect(d).toMatch(/^M/)
    expect(d).toContain('L')
  })

  it('produces correct coordinates', () => {
    const data = [{ x: 0, y: 5 }, { x: 10, y: 15 }]
    const d = linePath(data, (p) => p.x, (p) => p.y, 0)
    expect(d).toBe('M0,5L10,15')
  })

  it('single point produces just M command', () => {
    const data = [42]
    const d = linePath(data, () => 10, () => 20, 0)
    expect(d).toBe('M10,20')
  })

  it('respects digits precision', () => {
    const data = [{ x: 1.123456, y: 2.789012 }]
    const d2 = linePath(data, (p) => p.x, (p) => p.y, 2)
    expect(d2).toBe('M1.12,2.79')
  })
})
