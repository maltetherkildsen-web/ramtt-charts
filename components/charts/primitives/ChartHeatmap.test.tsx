// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { interpolateColorScale, parseHexColor, isLightColor } from '../../../lib/charts/utils/colorScale'

describe('ChartHeatmap', () => {
  it('module file exists at expected path', async () => {
    const fs = await import('fs')
    const path = await import('path')
    const filePath = path.resolve(__dirname, 'ChartHeatmap.tsx')
    expect(fs.existsSync(filePath)).toBe(true)
  })

  it('color scale interpolation produces valid hex for heatmap cells', () => {
    const stops = [
      { value: 0, color: '#EBE9E3' },
      { value: 50, color: '#fde68a' },
      { value: 100, color: '#f97316' },
      { value: 150, color: '#dc2626' },
    ]
    for (let v = 0; v <= 150; v += 10) {
      const color = interpolateColorScale(v, stops)
      expect(color).toMatch(/^#[0-9a-fA-F]{6}$/)
    }
  })

  it('heatmap color scale endpoints match', () => {
    const stops = [
      { value: 0, color: '#ebe9e3' },
      { value: 100, color: '#dc2626' },
    ]
    expect(interpolateColorScale(0, stops).toLowerCase()).toBe('#ebe9e3')
    expect(interpolateColorScale(100, stops).toLowerCase()).toBe('#dc2626')
  })

  it('isLightColor determines text contrast correctly', () => {
    expect(isLightColor('#fde68a')).toBe(true)  // Light yellow → needs dark text
    expect(isLightColor('#dc2626')).toBe(false)  // Red → needs light text
    expect(isLightColor('#EBE9E3')).toBe(true)  // Light sand → needs dark text
  })
})
