// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Binary-search based nearest-point lookup for hover / crosshair.
 *
 * Given sorted x-values and a target pixel position, finds the index
 * of the nearest data point in O(log n).
 *
 * Pure function, zero dependencies.
 */

/**
 * Find the index of the element in `sortedValues` closest to `target`.
 *
 * @param sortedValues  Array of numbers sorted in ascending order.
 * @param target        The value to search for.
 * @returns             Index of the nearest element, or -1 if empty.
 */
export function bisectNearest(
  sortedValues: readonly number[],
  target: number,
): number {
  const len = sortedValues.length
  if (len === 0) return -1
  if (len === 1) return 0

  let lo = 0
  let hi = len - 1

  // Edge cases: target outside the range
  if (target <= sortedValues[0]) return 0
  if (target >= sortedValues[hi]) return hi

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1
    const v = sortedValues[mid]

    if (v === target) return mid
    if (v < target) lo = mid + 1
    else hi = mid - 1
  }

  // lo and hi have crossed — compare the two neighbours
  if (lo >= len) return hi
  if (hi < 0) return lo

  return Math.abs(sortedValues[lo] - target) <= Math.abs(sortedValues[hi] - target)
    ? lo
    : hi
}

/**
 * Higher-level helper: given data, an x-accessor, and a target x,
 * return the index of the nearest datum.
 *
 * Assumes data is sorted by the accessor in ascending order.
 */
export function bisectData<T>(
  data: readonly T[],
  accessor: (d: T, i: number) => number,
  target: number,
): number {
  const len = data.length
  if (len === 0) return -1
  if (len === 1) return 0

  let lo = 0
  let hi = len - 1

  if (target <= accessor(data[0], 0)) return 0
  if (target >= accessor(data[hi], hi)) return hi

  while (lo <= hi) {
    const mid = (lo + hi) >>> 1
    const v = accessor(data[mid], mid)
    if (v === target) return mid
    if (v < target) lo = mid + 1
    else hi = mid - 1
  }

  if (lo >= len) return hi
  if (hi < 0) return lo

  return Math.abs(accessor(data[lo], lo) - target) <=
    Math.abs(accessor(data[hi], hi) - target)
    ? lo
    : hi
}
