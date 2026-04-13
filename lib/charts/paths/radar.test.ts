// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { radarPoints, radarPath, radarGridPoints } from './radar'

describe('radarPoints', () => {
  it('produces correct number of points', () => {
    const pts = radarPoints([80, 60, 90, 70], 100, 100, 100, 80)
    expect(pts).toHaveLength(4)
  })

  it('first point is at top (12 o\'clock): x ≈ cx, y < cy', () => {
    const pts = radarPoints([50], 100, 100, 100, 80)
    const [x, y] = pts[0]
    expect(x).toBeCloseTo(100, 5) // x should be at center
    expect(y).toBeLessThan(100)    // y should be above center
  })

  it('maps values proportionally to radius', () => {
    const full = radarPoints([100], 100, 100, 100, 80)
    const half = radarPoints([50], 100, 100, 100, 80)
    // At top (12 o'clock), distance from center is the radius proportion
    expect(100 - full[0][1]).toBeCloseTo(80, 5) // full radius
    expect(100 - half[0][1]).toBeCloseTo(40, 5) // half radius
  })

  it('all zeros produce all points at center', () => {
    const pts = radarPoints([0, 0, 0, 0], 100, 150, 150, 80)
    for (const [x, y] of pts) {
      expect(x).toBeCloseTo(150, 5)
      expect(y).toBeCloseTo(150, 5)
    }
  })

  it('single value produces single point', () => {
    const pts = radarPoints([75], 100, 50, 50, 40)
    expect(pts).toHaveLength(1)
  })
})

describe('radarPath', () => {
  it('produces valid SVG d-attribute starting with M, ending with Z', () => {
    const pts: [number, number][] = [[10, 20], [30, 40], [50, 60]]
    const d = radarPath(pts)
    expect(d).toMatch(/^M /)
    expect(d).toMatch(/ Z$/)
  })

  it('empty points produce empty string', () => {
    expect(radarPath([])).toBe('')
  })

  it('includes all points as L commands', () => {
    const pts: [number, number][] = [[10, 20], [30, 40], [50, 60]]
    const d = radarPath(pts)
    expect(d).toContain('L')
    // Should have M + 2 L commands + Z
    const parts = d.split(' ')
    expect(parts[0]).toBe('M')
    expect(parts[parts.length - 1]).toBe('Z')
  })
})

describe('radarGridPoints', () => {
  it('produces regular polygon (all points equidistant from center)', () => {
    const pts = radarGridPoints(6, 100, 100, 50)
    expect(pts).toHaveLength(6)
    for (const [x, y] of pts) {
      const dist = Math.sqrt((x - 100) ** 2 + (y - 100) ** 2)
      expect(dist).toBeCloseTo(50, 4)
    }
  })

  it('4 points form a square-like shape', () => {
    const pts = radarGridPoints(4, 0, 0, 10)
    expect(pts).toHaveLength(4)
    // All at distance 10 from origin
    for (const [x, y] of pts) {
      const dist = Math.sqrt(x ** 2 + y ** 2)
      expect(dist).toBeCloseTo(10, 4)
    }
  })
})
