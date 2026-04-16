// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Color scale utilities for heatmaps and data visualizations.
 *
 * Value-based interpolation (not normalized 0-1 like colorInterpolate.ts).
 * Stops use raw data values, making them easier to configure per-chart.
 *
 * Zero dependencies.
 */

export interface ColorStop {
  value: number
  color: string // Hex color (#RGB or #RRGGBB)
}

/**
 * Parse a hex color string to RGB components.
 * Supports #RGB, #RRGGBB formats.
 * For CSS variable references (e.g., "var(--n200)"), returns a neutral fallback.
 */
export function parseHexColor(color: string): { r: number; g: number; b: number } {
  if (color.startsWith('var(')) {
    return { r: 242, g: 240, b: 234 } // --n200 fallback
  }

  const hex = color.replace('#', '')
  if (hex.length === 3) {
    return {
      r: parseInt(hex[0] + hex[0], 16),
      g: parseInt(hex[1] + hex[1], 16),
      b: parseInt(hex[2] + hex[2], 16),
    }
  }
  return {
    r: parseInt(hex.substring(0, 2), 16),
    g: parseInt(hex.substring(2, 4), 16),
    b: parseInt(hex.substring(4, 6), 16),
  }
}

/**
 * Interpolate a color based on value within a color scale.
 *
 * @param value - The data value to map to a color
 * @param stops - Array of { value, color } stops, sorted by value ascending
 * @returns CSS hex color string
 *
 * @example
 * interpolateColorScale(75, [
 *   { value: 0, color: '#f2f0ea' },
 *   { value: 50, color: '#fde68a' },
 *   { value: 100, color: '#f97316' },
 * ])
 */
export function interpolateColorScale(
  value: number,
  stops: ColorStop[],
): string {
  if (stops.length === 0) return '#f2f0ea'
  if (stops.length === 1) return stops[0].color

  // Clamp to scale range
  if (value <= stops[0].value) return stops[0].color
  if (value >= stops[stops.length - 1].value) return stops[stops.length - 1].color

  // Find the two stops that bracket the value
  let lower = stops[0]
  let upper = stops[1]
  for (let i = 1; i < stops.length; i++) {
    if (stops[i].value >= value) {
      lower = stops[i - 1]
      upper = stops[i]
      break
    }
  }

  // Linear interpolation factor
  const range = upper.value - lower.value
  const t = range === 0 ? 0 : (value - lower.value) / range

  const lRGB = parseHexColor(lower.color)
  const uRGB = parseHexColor(upper.color)

  const r = Math.round(lRGB.r + (uRGB.r - lRGB.r) * t)
  const g = Math.round(lRGB.g + (uRGB.g - lRGB.g) * t)
  const b = Math.round(lRGB.b + (uRGB.b - lRGB.b) * t)

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}

/**
 * Determine if a color is "light" (needs dark text) or "dark" (needs light text).
 * Uses relative luminance calculation.
 */
export function isLightColor(color: string): boolean {
  const { r, g, b } = parseHexColor(color)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.55
}

/**
 * Diverging color scale — maps a value in [-1, +1] to a three-stop
 * color gradient: negative → neutral → positive.
 *
 * Uses RGB interpolation. Suitable for treemaps, heatmaps, and any
 * visualization with a meaningful midpoint.
 *
 * @param value   Number in [-1, +1]. Clamped to range.
 * @param colors  Tuple of [negative, neutral, positive] hex colors.
 * @returns       CSS hex color string.
 *
 * @example
 * divergingScale(-0.5, ['#a23544', '#F2F0EA', '#016b1d'])
 * // Returns a color halfway between red and neutral
 */
export function divergingScale(
  value: number,
  colors: [string, string, string],
): string {
  const v = Math.max(-1, Math.min(1, value))
  const [negColor, midColor, posColor] = colors

  const negRgb = parseHexColor(negColor)
  const midRgb = parseHexColor(midColor)
  const posRgb = parseHexColor(posColor)

  let r: number, g: number, b: number

  if (v <= 0) {
    // Interpolate negative → neutral (t goes from 0 at -1 to 1 at 0)
    const t = v + 1 // maps [-1, 0] → [0, 1]
    r = Math.round(negRgb.r + (midRgb.r - negRgb.r) * t)
    g = Math.round(negRgb.g + (midRgb.g - negRgb.g) * t)
    b = Math.round(negRgb.b + (midRgb.b - negRgb.b) * t)
  } else {
    // Interpolate neutral → positive (t goes from 0 at 0 to 1 at +1)
    const t = v
    r = Math.round(midRgb.r + (posRgb.r - midRgb.r) * t)
    g = Math.round(midRgb.g + (posRgb.g - midRgb.g) * t)
    b = Math.round(midRgb.b + (posRgb.b - midRgb.b) * t)
  }

  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`
}
