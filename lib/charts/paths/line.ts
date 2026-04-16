// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * SVG line path generator.
 *
 * Produces the `d` attribute string for an SVG `<path>` element.
 * Supports three curve modes:
 *   - 'linear'  — straight lines between points (M/L commands)
 *   - 'natural' — Catmull-Rom → cubic bezier (smooth curves through all points)
 *   - 'step'    — horizontal then vertical jumps (H/V commands)
 *
 * Pure function, zero dependencies.
 */

export interface Accessor<T> {
  (datum: T, index: number): number
}

export type CurveType = 'natural' | 'linear' | 'step'

/**
 * Build an SVG `d` string for a polyline through `data`.
 *
 * @param data   Array of data points (any shape).
 * @param x      Accessor that returns the **pixel** x for a datum.
 * @param y      Accessor that returns the **pixel** y for a datum.
 * @param digits Decimal precision for coordinates (default 1).
 * @param curve  Interpolation mode (default 'linear').
 */
export function linePath<T>(
  data: readonly T[],
  x: Accessor<T>,
  y: Accessor<T>,
  digits = 1,
  curve: CurveType = 'linear',
): string {
  const len = data.length
  if (len === 0) return ''

  if (curve === 'step') return stepLinePath(data, x, y, digits)
  if (curve === 'natural') return naturalLinePath(data, x, y, digits)

  // Linear (default): M + L commands
  const parts: string[] = new Array(len)
  for (let i = 0; i < len; i++) {
    const px = x(data[i], i).toFixed(digits)
    const py = y(data[i], i).toFixed(digits)
    parts[i] = `${i === 0 ? 'M' : 'L'}${px},${py}`
  }
  return parts.join('')
}

// ─── Step path: horizontal then vertical ───

function stepLinePath<T>(
  data: readonly T[],
  x: Accessor<T>,
  y: Accessor<T>,
  digits: number,
): string {
  const len = data.length
  if (len === 0) return ''

  let d = `M${x(data[0], 0).toFixed(digits)},${y(data[0], 0).toFixed(digits)}`
  for (let i = 1; i < len; i++) {
    const px = x(data[i], i).toFixed(digits)
    const py = y(data[i], i).toFixed(digits)
    // Horizontal to new X at old Y, then vertical to new Y
    d += `H${px}V${py}`
  }
  return d
}

// ─── Natural (Catmull-Rom → cubic bezier) ───

function naturalLinePath<T>(
  data: readonly T[],
  x: Accessor<T>,
  y: Accessor<T>,
  digits: number,
): string {
  const len = data.length
  if (len === 0) return ''
  if (len === 1) return `M${x(data[0], 0).toFixed(digits)},${y(data[0], 0).toFixed(digits)}`
  if (len === 2) {
    return `M${x(data[0], 0).toFixed(digits)},${y(data[0], 0).toFixed(digits)}L${x(data[1], 1).toFixed(digits)},${y(data[1], 1).toFixed(digits)}`
  }

  // Extract pixel coordinates
  const xs: number[] = new Array(len)
  const ys: number[] = new Array(len)
  for (let i = 0; i < len; i++) {
    xs[i] = x(data[i], i)
    ys[i] = y(data[i], i)
  }

  // Catmull-Rom to cubic bezier conversion
  const alpha = 0.5 // centripetal Catmull-Rom tension
  let d = `M${xs[0].toFixed(digits)},${ys[0].toFixed(digits)}`

  for (let i = 0; i < len - 1; i++) {
    const p0x = xs[Math.max(0, i - 1)]
    const p0y = ys[Math.max(0, i - 1)]
    const p1x = xs[i]
    const p1y = ys[i]
    const p2x = xs[i + 1]
    const p2y = ys[i + 1]
    const p3x = xs[Math.min(len - 1, i + 2)]
    const p3y = ys[Math.min(len - 1, i + 2)]

    // Control points from Catmull-Rom
    const cp1x = p1x + (p2x - p0x) * alpha / 3
    const cp1y = p1y + (p2y - p0y) * alpha / 3
    const cp2x = p2x - (p3x - p1x) * alpha / 3
    const cp2y = p2y - (p3y - p1y) * alpha / 3

    d += `C${cp1x.toFixed(digits)},${cp1y.toFixed(digits)},${cp2x.toFixed(digits)},${cp2y.toFixed(digits)},${p2x.toFixed(digits)},${p2y.toFixed(digits)}`
  }

  return d
}
