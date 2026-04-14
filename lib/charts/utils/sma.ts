// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Simple Moving Average (SMA) — rolling mean over a sliding window.
 *
 * Returns null for indices where the full window isn't available.
 * Pure function, zero dependencies.
 */

/**
 * Compute SMA for a numeric array.
 *
 * @param data    Input values.
 * @param window  Number of periods in the moving average.
 * @returns       Array of same length. First (window-1) entries are null.
 */
export function sma(data: readonly number[], window: number): (number | null)[] {
  if (window < 1 || data.length === 0) return data.map(() => null)
  if (window === 1) return data.map((v) => v)

  const result: (number | null)[] = new Array(data.length)
  let sum = 0

  for (let i = 0; i < data.length; i++) {
    sum += data[i]
    if (i >= window) {
      sum -= data[i - window]
    }
    if (i < window - 1) {
      result[i] = null
    } else {
      result[i] = sum / window
    }
  }

  return result
}
