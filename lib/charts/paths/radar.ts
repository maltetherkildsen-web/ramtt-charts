// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Radar / spider chart geometry.
 *
 * Pure functions, zero dependencies, zero React, zero DOM.
 * Points start at 12 o'clock and go clockwise.
 */

/**
 * Calculate polygon points for radar chart data.
 * Values are normalized 0–max. Points start at 12 o'clock and go clockwise.
 *
 * @param values - Array of values (0–max) for each axis
 * @param max    - Maximum value (for scaling). Default: 100
 * @param cx     - Center x coordinate
 * @param cy     - Center y coordinate
 * @param radius - Maximum radius in pixels
 * @returns Array of [x, y] coordinate pairs
 */
export function radarPoints(
  values: number[],
  max: number,
  cx: number,
  cy: number,
  radius: number,
): [number, number][] {
  const n = values.length
  return values.map((value, i) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2 // Start at top (12 o'clock)
    const r = (value / max) * radius
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)]
  })
}

/**
 * Generate SVG path d-attribute from radar points.
 * Produces a closed polygon.
 */
export function radarPath(points: [number, number][]): string {
  if (points.length === 0) return ''
  const [first, ...rest] = points
  return `M ${first[0].toFixed(2)} ${first[1].toFixed(2)} ${rest.map(([x, y]) => `L ${x.toFixed(2)} ${y.toFixed(2)}`).join(' ')} Z`
}

/**
 * Generate grid polygon points (for concentric rings).
 * All values are equal — creates a regular polygon.
 */
export function radarGridPoints(
  n: number,
  cx: number,
  cy: number,
  radius: number,
): [number, number][] {
  return radarPoints(new Array(n).fill(100), 100, cx, cy, radius)
}
