// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Best-split finder for running sessions.
 *
 * Given a cumulative distance stream (km per sample) and equally-spaced
 * timestamps (seconds), returns the fastest elapsed time for each
 * canonical split distance that fits in the session.
 *
 * O(n) per split via two-pointer sweep. Tolerates null gaps in the
 * distance stream (GPS dropouts).
 */

export interface SplitDistance {
  readonly label: string
  readonly km: number
}

export const DEFAULT_SPLIT_DISTANCES: readonly SplitDistance[] = [
  { label: '400m', km: 0.4 },
  { label: '1 km', km: 1.0 },
  { label: '1 mi', km: 1.609 },
  { label: '5 km', km: 5.0 },
  { label: '10 km', km: 10.0 },
  { label: 'HM',    km: 21.0975 },
  { label: 'M',     km: 42.195 },
]

export interface SplitResult {
  label: string
  distanceKm: number
  timeSec: number
  pacePerKm: number  // sec/km
  startIdx: number
  endIdx: number
}

/**
 * Find the fastest window of each target distance.
 *
 * `distance[i]` is the cumulative kilometres recorded at sample `i`.
 * Null entries (device dropped the sample) are skipped — the algorithm
 * simply treats them as "no valid endpoint here" and continues.
 *
 * `timestamps[i]` is elapsed seconds at sample `i`. For standard 1 Hz
 * recordings this is just the sample index.
 */
export function computeBestSplits(
  distance: readonly (number | null)[],
  timestamps: readonly number[],
  targets: readonly SplitDistance[] = DEFAULT_SPLIT_DISTANCES,
): SplitResult[] {
  const results: SplitResult[] = []
  if (distance.length === 0) return results

  // Fast path: find the last non-null cumulative distance for bounds.
  let maxDist = 0
  for (let i = distance.length - 1; i >= 0; i--) {
    const d = distance[i]
    if (d != null && d > maxDist) { maxDist = d; break }
  }
  if (maxDist <= 0) return results

  for (const target of targets) {
    if (maxDist < target.km) continue

    let bestTime = Infinity
    let bestStart = 0
    let bestEnd = 0
    let left = 0

    for (let right = 0; right < distance.length; right++) {
      const dRight = distance[right]
      if (dRight == null) continue

      // Advance left until window strictly spans at least target.km.
      // Keep the tightest feasible window (smallest elapsed time) by
      // sliding `left` forward as long as the window still qualifies.
      while (left < right) {
        const dLeft = distance[left]
        if (dLeft == null) { left++; continue }
        if (dRight - dLeft < target.km) break

        const elapsed = timestamps[right] - timestamps[left]
        if (elapsed > 0 && elapsed < bestTime) {
          bestTime = elapsed
          bestStart = left
          bestEnd = right
        }
        left++
      }
    }

    if (bestTime < Infinity) {
      results.push({
        label: target.label,
        distanceKm: target.km,
        timeSec: bestTime,
        pacePerKm: bestTime / target.km,
        startIdx: bestStart,
        endIdx: bestEnd,
      })
    }
  }

  return results
}
