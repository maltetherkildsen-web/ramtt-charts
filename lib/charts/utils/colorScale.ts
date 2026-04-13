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
