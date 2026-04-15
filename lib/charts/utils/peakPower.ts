// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Peak power / MMP (Maximal Mean Power) calculations.
 *
 * Pure TypeScript, zero dependencies.
 * Sliding-window O(n) algorithm for finding peak average power over given durations.
 */

export interface PeakPowerResult {
  /** Human-readable label, e.g. "3s", "5m", "60m". */
  label: string
  /** Window size in seconds. */
  windowSeconds: number
  /** Average power (watts) in the best window. */
  avgPower: number
  /** Start index of the best window in the source array. */
  startIdx: number
  /** End index of the best window in the source array. */
  endIdx: number
}

/** Standard MMP durations (3s through 60m). */
export const PEAK_DURATIONS: readonly { label: string; seconds: number }[] = [
  { label: '3s', seconds: 3 },
  { label: '10s', seconds: 10 },
  { label: '30s', seconds: 30 },
  { label: '1m', seconds: 60 },
  { label: '3m', seconds: 180 },
  { label: '5m', seconds: 300 },
  { label: '7m', seconds: 420 },
  { label: '12m', seconds: 720 },
  { label: '20m', seconds: 1200 },
  { label: '30m', seconds: 1800 },
  { label: '60m', seconds: 3600 },
]

/**
 * Find the peak (highest) average power over a sliding window.
 *
 * @param powerData  Per-second power values.
 * @param windowSeconds  Window size in seconds.
 * @returns  The best window's average power, start, and end index.
 */
export function findPeakPower(
  powerData: number[],
  windowSeconds: number,
): { avgPower: number; startIdx: number; endIdx: number } {
  if (powerData.length < windowSeconds || windowSeconds <= 0) {
    return { avgPower: 0, startIdx: 0, endIdx: 0 }
  }

  let bestSum = 0
  let bestStart = 0

  // Initial window
  let sum = 0
  for (let i = 0; i < windowSeconds; i++) sum += powerData[i]
  bestSum = sum

  // Slide
  for (let i = windowSeconds; i < powerData.length; i++) {
    sum += powerData[i] - powerData[i - windowSeconds]
    if (sum > bestSum) {
      bestSum = sum
      bestStart = i - windowSeconds + 1
    }
  }

  return {
    avgPower: Math.round(bestSum / windowSeconds),
    startIdx: bestStart,
    endIdx: bestStart + windowSeconds - 1,
  }
}

/**
 * Compute peak power across all standard MMP durations.
 * Only includes durations that fit within the data length.
 */
export function computeAllPeaks(power: number[]): PeakPowerResult[] {
  return PEAK_DURATIONS
    .filter((d) => d.seconds <= power.length)
    .map((d) => {
      const result = findPeakPower(power, d.seconds)
      return { label: d.label, windowSeconds: d.seconds, ...result }
    })
}

/**
 * Build a full MMP curve — peak power at every integer duration from 1s to maxSeconds.
 * Returns an array of { seconds, watts } for plotting.
 */
export function buildMMPCurve(
  power: number[],
  maxSeconds?: number,
): { seconds: number; watts: number }[] {
  const cap = Math.min(maxSeconds ?? power.length, power.length)
  if (cap <= 0) return []

  const curve: { seconds: number; watts: number }[] = []

  for (let dur = 1; dur <= cap; dur++) {
    const { avgPower } = findPeakPower(power, dur)
    curve.push({ seconds: dur, watts: avgPower })
  }

  return curve
}
