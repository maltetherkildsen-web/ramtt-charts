// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Color interpolation utilities for heatmaps and gradient charts.
 *
 * Works in RGB space — simple and sufficient for sequential color scales.
 * Zero dependencies.
 */

/**
 * Parse hex color (#RGB or #RRGGBB) to [r, g, b] (0-255).
 */
export function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '')
  if (h.length === 3) {
    return [
      parseInt(h[0] + h[0], 16),
      parseInt(h[1] + h[1], 16),
      parseInt(h[2] + h[2], 16),
    ]
  }
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ]
}

/**
 * RGB components (0-255) to hex string.
 */
export function rgbToHex(r: number, g: number, b: number): string {
  const clamp = (v: number) => Math.max(0, Math.min(255, Math.round(v)))
  return (
    '#' +
    clamp(r).toString(16).padStart(2, '0') +
    clamp(g).toString(16).padStart(2, '0') +
    clamp(b).toString(16).padStart(2, '0')
  )
}

/**
 * Interpolate between color stops based on a normalized value (0-1).
 *
 * @param value  Number between 0 and 1
 * @param stops  Array of { at: number (0-1), color: hex string }, sorted ascending by `at`
 * @returns      Hex color string
 */
export function interpolateColor(
  value: number,
  stops: { at: number; color: string }[],
): string {
  if (stops.length === 0) return '#000000'
  if (stops.length === 1) return stops[0].color

  const v = Math.max(0, Math.min(1, value))

  // Clamp to first/last stop
  if (v <= stops[0].at) return stops[0].color
  if (v >= stops[stops.length - 1].at) return stops[stops.length - 1].color

  // Find surrounding stops
  let lo = 0
  for (let i = 1; i < stops.length; i++) {
    if (stops[i].at >= v) {
      lo = i - 1
      break
    }
  }
  const hi = lo + 1
  const range = stops[hi].at - stops[lo].at
  const t = range === 0 ? 0 : (v - stops[lo].at) / range

  const [r1, g1, b1] = hexToRgb(stops[lo].color)
  const [r2, g2, b2] = hexToRgb(stops[hi].color)

  return rgbToHex(
    r1 + (r2 - r1) * t,
    g1 + (g2 - g1) * t,
    b1 + (b2 - b1) * t,
  )
}
