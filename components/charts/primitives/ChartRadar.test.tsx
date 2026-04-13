// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { radarPoints, radarPath, radarGridPoints } from '../../../lib/charts/paths/radar'

describe('ChartRadar', () => {
  it('module file exists at expected path', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const filePath = path.resolve(__dirname, 'ChartRadar.tsx')
    expect(fs.existsSync(filePath)).toBe(true)
  })

  it('radarPoints generates correct count for dimensions', () => {
    const pts = radarPoints([80, 60, 90, 70, 85], 100, 140, 140, 100)
    expect(pts).toHaveLength(5)
  })

  it('radarPath generates closed polygon', () => {
    const pts = radarPoints([80, 60, 90], 100, 100, 100, 80)
    const d = radarPath(pts)
    expect(d).toMatch(/^M /)
    expect(d).toMatch(/ Z$/)
  })

  it('radarGridPoints creates equidistant polygon', () => {
    const pts = radarGridPoints(8, 150, 150, 60)
    for (const [x, y] of pts) {
      const dist = Math.sqrt((x - 150) ** 2 + (y - 150) ** 2)
      expect(dist).toBeCloseTo(60, 3)
    }
  })
})
