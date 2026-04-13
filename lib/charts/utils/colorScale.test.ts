// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { interpolateColorScale, parseHexColor, isLightColor } from './colorScale'

describe('parseHexColor', () => {
  it('handles #RRGGBB', () => {
    expect(parseHexColor('#ff0000')).toEqual({ r: 255, g: 0, b: 0 })
    expect(parseHexColor('#003366')).toEqual({ r: 0, g: 51, b: 102 })
  })

  it('handles #RGB shorthand', () => {
    expect(parseHexColor('#f00')).toEqual({ r: 255, g: 0, b: 0 })
    expect(parseHexColor('#abc')).toEqual({ r: 170, g: 187, b: 204 })
  })

  it('returns fallback for CSS variable references', () => {
    const result = parseHexColor('var(--n200)')
    expect(result).toEqual({ r: 242, g: 240, b: 234 })
  })
})

describe('interpolateColorScale', () => {
  const twoStops = [
    { value: 0, color: '#000000' },
    { value: 100, color: '#ffffff' },
  ]

  it('returns first stop color at lower bound', () => {
    expect(interpolateColorScale(0, twoStops)).toBe('#000000')
  })

  it('returns last stop color at upper bound', () => {
    expect(interpolateColorScale(100, twoStops)).toBe('#ffffff')
  })

  it('returns midpoint color at midpoint value', () => {
    expect(interpolateColorScale(50, twoStops)).toBe('#808080')
  })

  it('clamps below minimum', () => {
    expect(interpolateColorScale(-10, twoStops)).toBe('#000000')
  })

  it('clamps above maximum', () => {
    expect(interpolateColorScale(200, twoStops)).toBe('#ffffff')
  })

  it('interpolates between correct stops in multi-stop scale', () => {
    const stops = [
      { value: 0, color: '#ff0000' },
      { value: 50, color: '#00ff00' },
      { value: 100, color: '#0000ff' },
    ]
    // At 25: midpoint between red and green
    expect(interpolateColorScale(25, stops)).toBe('#808000')
    // At 75: midpoint between green and blue
    expect(interpolateColorScale(75, stops)).toBe('#008080')
  })

  it('handles single stop', () => {
    expect(interpolateColorScale(50, [{ value: 0, color: '#abcdef' }])).toBe('#abcdef')
  })

  it('handles empty stops', () => {
    expect(interpolateColorScale(50, [])).toBe('#f2f0ea')
  })

  it('produces valid hex for all intermediate values', () => {
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
})

describe('isLightColor', () => {
  it('#ffffff is light', () => {
    expect(isLightColor('#ffffff')).toBe(true)
  })

  it('#000000 is dark', () => {
    expect(isLightColor('#000000')).toBe(false)
  })

  it('#fde68a (warm yellow) is light', () => {
    expect(isLightColor('#fde68a')).toBe(true)
  })

  it('#dc2626 (red) is dark', () => {
    expect(isLightColor('#dc2626')).toBe(false)
  })

  it('#EBE9E3 (light sand) is light', () => {
    expect(isLightColor('#EBE9E3')).toBe(true)
  })
})
