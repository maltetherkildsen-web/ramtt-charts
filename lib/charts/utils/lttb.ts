// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * LTTB — Largest Triangle Three Buckets downsampling.
 *
 * Based on Sveinn Steinarsson's 2013 MSc thesis (University of Iceland).
 * Reduces large datasets while preserving visual shape.
 *
 * Pure function, zero dependencies.
 */

export interface Point {
  x: number
  y: number
}

/**
 * Downsample `data` to at most `threshold` points using LTTB.
 *
 * @param data       Source array (must be sorted by x).
 * @param threshold  Target number of output points (>= 2).
 * @returns          New array of length min(data.length, threshold).
 */
export function lttb(data: readonly Point[], threshold: number): Point[] {
  const len = data.length
  if (threshold >= len || threshold < 2) {
    return data.slice()
  }

  const sampled: Point[] = new Array(threshold)
  sampled[0] = data[0] // always keep first

  const bucketSize = (len - 2) / (threshold - 2)
  let a = 0 // index of previously selected point

  for (let i = 0; i < threshold - 2; i++) {
    // --- Average point in the *next* bucket (look-ahead) ---
    const avgStart = Math.floor((i + 1) * bucketSize) + 1
    const avgEnd = Math.min(Math.floor((i + 2) * bucketSize) + 1, len)
    let avgX = 0
    let avgY = 0
    const avgCount = avgEnd - avgStart
    for (let j = avgStart; j < avgEnd; j++) {
      avgX += data[j].x
      avgY += data[j].y
    }
    avgX /= avgCount
    avgY /= avgCount

    // --- Find the point in the *current* bucket with the largest triangle ---
    const rangeStart = Math.floor(i * bucketSize) + 1
    const rangeEnd = Math.floor((i + 1) * bucketSize) + 1

    let maxArea = -1
    let maxIdx = rangeStart

    const ax = data[a].x
    const ay = data[a].y

    for (let j = rangeStart; j < rangeEnd; j++) {
      const area = Math.abs(
        (ax - avgX) * (data[j].y - ay) - (ax - data[j].x) * (avgY - ay),
      )
      if (area > maxArea) {
        maxArea = area
        maxIdx = j
      }
    }

    sampled[i + 1] = data[maxIdx]
    a = maxIdx
  }

  sampled[threshold - 1] = data[len - 1] // always keep last
  return sampled
}
