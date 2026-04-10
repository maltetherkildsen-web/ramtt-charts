import { describe, it, expect } from 'vitest'
import { arcPath, pieLayout } from '../arc'

describe('arcPath', () => {
  it('produces valid SVG path starting with M', () => {
    const d = arcPath(100, 100, 40, 80, 0, Math.PI / 2)
    expect(d).toMatch(/^M/)
    expect(d).toContain('A')
    expect(d).toMatch(/Z$/)
  })

  it('pie slice (innerRadius=0) uses L to center', () => {
    const d = arcPath(50, 50, 0, 40, 0, Math.PI / 2)
    expect(d).toContain('L50.00,50.00')
    expect(d).toMatch(/Z$/)
  })

  it('donut segment has two A commands', () => {
    const d = arcPath(100, 100, 30, 60, 0, Math.PI / 3)
    const arcs = d.match(/A/g)
    expect(arcs).toHaveLength(2)
  })

  it('handles near-full circle without breaking', () => {
    const d = arcPath(100, 100, 40, 80, 0, Math.PI * 1.999)
    expect(d).toBeTruthy()
    expect(d).toContain('A')
  })
})

describe('pieLayout', () => {
  it('returns empty array for zero total', () => {
    const result = pieLayout([0, 0, 0], (d) => d)
    expect(result).toEqual([])
  })

  it('returns correct number of slices', () => {
    const data = [10, 20, 30]
    const result = pieLayout(data, (d) => d)
    expect(result).toHaveLength(3)
  })

  it('percentages sum to 100', () => {
    const data = [25, 50, 25]
    const result = pieLayout(data, (d) => d)
    const totalPct = result.reduce((s, r) => s + r.percentage, 0)
    expect(totalPct).toBeCloseTo(100)
  })

  it('angles span approximately 2pi minus padding', () => {
    const data = [1, 1, 1, 1]
    const padAngle = 0.02
    const result = pieLayout(data, (d) => d, padAngle)
    const lastSlice = result[result.length - 1]
    const totalAngle = lastSlice.endAngle + padAngle / 2
    expect(totalAngle).toBeCloseTo(2 * Math.PI, 1)
  })

  it('preserves datum references', () => {
    const data = [{ name: 'A', val: 10 }, { name: 'B', val: 20 }]
    const result = pieLayout(data, (d) => d.val)
    expect(result[0].datum.name).toBe('A')
    expect(result[1].datum.name).toBe('B')
  })
})
