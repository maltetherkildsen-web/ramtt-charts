// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { interpolateColor, hexToRgb, rgbToHex } from '../../../lib/charts/utils/colorInterpolate'

describe('ChartHeatmap', () => {
  it('module file exists at expected path', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const filePath = path.resolve(__dirname, 'ChartHeatmap.tsx')
    expect(fs.existsSync(filePath)).toBe(true)
  })

  it('color interpolation produces valid hex for heatmap cells', () => {
    const stops = [
      { at: 0, color: '#EBE9E3' },
      { at: 0.25, color: '#bfdbfe' },
      { at: 0.5, color: '#3b82f6' },
      { at: 0.75, color: '#1d4ed8' },
      { at: 1, color: '#1e3a5f' },
    ]
    // Each result should be a valid 7-char hex
    for (let v = 0; v <= 1; v += 0.1) {
      const color = interpolateColor(v, stops)
      expect(color).toMatch(/^#[0-9a-fA-F]{6}$/)
    }
  })

  it('heatmap color scale endpoints match', () => {
    const stops = [
      { at: 0, color: '#EBE9E3' },
      { at: 1, color: '#1e3a5f' },
    ]
    expect(interpolateColor(0, stops).toLowerCase()).toBe('#ebe9e3')
    expect(interpolateColor(1, stops).toLowerCase()).toBe('#1e3a5f')
  })
})
