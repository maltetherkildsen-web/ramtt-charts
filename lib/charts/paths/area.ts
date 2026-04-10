// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * SVG closed area path generator.
 *
 * Builds on the same accessor pattern as `linePath`, then closes the shape
 * down to a baseline (typically the bottom of the chart).
 *
 * Pure function, zero dependencies.
 */

import type { Accessor } from './line'

/**
 * Build an SVG `d` string for a filled area.
 *
 * The path traces the data from left to right, then drops to `baseline`,
 * walks back to the first x, and closes with `Z`.
 *
 * @param data     Array of data points.
 * @param x        Accessor → pixel x.
 * @param y        Accessor → pixel y.
 * @param baseline The y-pixel of the area bottom (e.g. chart height).
 * @param digits   Decimal precision (default 1).
 */
export function areaPath<T>(
  data: readonly T[],
  x: Accessor<T>,
  y: Accessor<T>,
  baseline: number,
  digits = 1,
): string {
  const len = data.length
  if (len === 0) return ''

  const parts: string[] = new Array(len + 3)
  for (let i = 0; i < len; i++) {
    const px = x(data[i], i).toFixed(digits)
    const py = y(data[i], i).toFixed(digits)
    parts[i] = `${i === 0 ? 'M' : 'L'}${px},${py}`
  }

  const bl = baseline.toFixed(digits)
  parts[len] = `L${x(data[len - 1], len - 1).toFixed(digits)},${bl}`
  parts[len + 1] = `L${x(data[0], 0).toFixed(digits)},${bl}`
  parts[len + 2] = 'Z'

  return parts.join('')
}
