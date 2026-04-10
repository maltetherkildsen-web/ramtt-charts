import { describe, it, expect } from 'vitest'
import { hexToRgb, rgbToHex, interpolateColor } from './colorInterpolate'

describe('hexToRgb', () => {
  it('parses 6-digit hex', () => {
    expect(hexToRgb('#ff0000')).toEqual([255, 0, 0])
    expect(hexToRgb('#003366')).toEqual([0, 51, 102])
  })

  it('parses 3-digit hex', () => {
    expect(hexToRgb('#f00')).toEqual([255, 0, 0])
    expect(hexToRgb('#abc')).toEqual([170, 187, 204])
  })

  it('works without # prefix', () => {
    expect(hexToRgb('00ff00')).toEqual([0, 255, 0])
  })
})

describe('rgbToHex', () => {
  it('converts to hex string', () => {
    expect(rgbToHex(255, 0, 0)).toBe('#ff0000')
    expect(rgbToHex(0, 128, 255)).toBe('#0080ff')
  })

  it('clamps out-of-range values', () => {
    expect(rgbToHex(300, -10, 128)).toBe('#ff0080')
  })

  it('rounds fractional values', () => {
    expect(rgbToHex(127.6, 0.4, 255)).toBe('#8000ff')
  })
})

describe('interpolateColor', () => {
  const twoStops = [
    { at: 0, color: '#000000' },
    { at: 1, color: '#ffffff' },
  ]

  it('returns start color at 0', () => {
    expect(interpolateColor(0, twoStops)).toBe('#000000')
  })

  it('returns end color at 1', () => {
    expect(interpolateColor(1, twoStops)).toBe('#ffffff')
  })

  it('returns midpoint at 0.5', () => {
    expect(interpolateColor(0.5, twoStops)).toBe('#808080')
  })

  it('clamps below 0', () => {
    expect(interpolateColor(-0.5, twoStops)).toBe('#000000')
  })

  it('clamps above 1', () => {
    expect(interpolateColor(1.5, twoStops)).toBe('#ffffff')
  })

  it('interpolates multi-stop gradients', () => {
    const stops = [
      { at: 0, color: '#ff0000' },
      { at: 0.5, color: '#00ff00' },
      { at: 1, color: '#0000ff' },
    ]
    // At 0.25: midpoint between red and green
    const result = interpolateColor(0.25, stops)
    expect(result).toBe('#808000')
    // At 0.75: midpoint between green and blue
    const result2 = interpolateColor(0.75, stops)
    expect(result2).toBe('#008080')
  })

  it('handles single stop', () => {
    expect(interpolateColor(0.5, [{ at: 0, color: '#abcdef' }])).toBe('#abcdef')
  })

  it('handles empty stops', () => {
    expect(interpolateColor(0.5, [])).toBe('#000000')
  })
})
