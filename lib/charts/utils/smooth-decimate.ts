// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * smoothDecimate — hybrid downsampling that combines even spacing with peak preservation.
 *
 * For each evenly-spaced bucket:
 *   1. Pick the evenly-spaced sample point (for smooth curves)
 *   2. Find min and max within the bucket
 *   3. If min/max deviate significantly from the sample, include them too
 *
 * Returns an array of { x, y } points sorted by x, where x is the original
 * data index. The result has even spacing like decimation but preserves
 * peaks and valleys like LTTB.
 *
 * Pure function, zero dependencies.
 */

export interface DecimatedPoint {
  /** Original index in the source array. */
  x: number
  /** Value at that index. */
  y: number
}

/**
 * Downsample `data` to approximately `targetPoints` using smooth decimation.
 *
 * The actual output length may be up to ~2× targetPoints when many buckets
 * contain significant peaks/valleys. In practice it's usually 1.1–1.4× target.
 *
 * @param data          Source array of values.
 * @param targetPoints  Desired number of evenly-spaced sample points (>= 2).
 * @param deviationPct  Min/max must deviate by this fraction of the bucket's
 *                      value range to be included. Default 0.15 (15%).
 * @returns             Sorted array of { x, y } points.
 */
export function smoothDecimate(
  data: readonly number[],
  targetPoints: number,
  deviationPct = 0.15,
): DecimatedPoint[] {
  const len = data.length
  if (len === 0) return []
  if (targetPoints < 2) targetPoints = 2
  if (len <= targetPoints) {
    // No downsampling needed — return all points
    const out: DecimatedPoint[] = new Array(len)
    for (let i = 0; i < len; i++) out[i] = { x: i, y: data[i] }
    return out
  }

  const result: DecimatedPoint[] = []
  // Track which indices we've added to avoid duplicates
  const added = new Set<number>()

  const bucketSize = (len - 1) / (targetPoints - 1)

  for (let b = 0; b < targetPoints; b++) {
    // ─── 1. Evenly-spaced sample point ───
    const sampleIdx = Math.round(b * bucketSize)
    const sampleVal = data[sampleIdx]

    if (!added.has(sampleIdx)) {
      result.push({ x: sampleIdx, y: sampleVal })
      added.add(sampleIdx)
    }

    // ─── 2. Find min/max within this bucket ───
    const bucketStart = Math.round(b * bucketSize - bucketSize * 0.5)
    const bucketEnd = Math.round(b * bucketSize + bucketSize * 0.5)
    const lo = Math.max(0, bucketStart)
    const hi = Math.min(len - 1, bucketEnd)

    if (hi - lo < 2) continue // bucket too small, skip min/max search

    let minVal = sampleVal
    let maxVal = sampleVal
    let minIdx = sampleIdx
    let maxIdx = sampleIdx

    for (let i = lo; i <= hi; i++) {
      if (data[i] < minVal) { minVal = data[i]; minIdx = i }
      if (data[i] > maxVal) { maxVal = data[i]; maxIdx = i }
    }

    // ─── 3. Include min/max if they deviate significantly ───
    const range = maxVal - minVal
    if (range === 0) continue

    const minDeviation = Math.abs(sampleVal - minVal) / range
    const maxDeviation = Math.abs(sampleVal - maxVal) / range

    if (minDeviation >= deviationPct && !added.has(minIdx)) {
      result.push({ x: minIdx, y: minVal })
      added.add(minIdx)
    }
    if (maxDeviation >= deviationPct && !added.has(maxIdx)) {
      result.push({ x: maxIdx, y: maxVal })
      added.add(maxIdx)
    }
  }

  // Sort by x index for correct rendering order
  result.sort((a, b) => a.x - b.x)

  return result
}
