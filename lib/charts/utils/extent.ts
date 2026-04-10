// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Compute min/max extent of a numeric array, with optional padding.
 *
 * Pure function, zero dependencies.
 */

/**
 * Extract [min, max] from `data` via an accessor, with optional padding.
 *
 * @param data    Array of data points.
 * @param accessor  Function that extracts the numeric value from each datum.
 * @param padding   Fraction of the range to add on each side (default 0.05 = 5%).
 * @returns         Tuple `[min - pad, max + pad]`.
 */
export function extent<T>(
  data: readonly T[],
  accessor: (d: T, i: number) => number,
  padding = 0,
): [number, number] {
  const len = data.length
  if (len === 0) return [0, 0]

  let min = Infinity
  let max = -Infinity

  for (let i = 0; i < len; i++) {
    const v = accessor(data[i], i)
    if (v < min) min = v
    if (v > max) max = v
  }

  if (padding !== 0) {
    const range = max - min || 1 // avoid zero-range
    min -= range * padding
    max += range * padding
  }

  return [min, max]
}

/**
 * Shorthand for numeric arrays (no accessor needed).
 */
export function extentOf(
  values: readonly number[],
  padding = 0,
): [number, number] {
  return extent(values, (v) => v, padding)
}
