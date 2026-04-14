// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Shared zoom math — viewport clamping, fraction conversion, snap-to-data.
 *
 * Pure functions, zero dependencies, zero React, zero DOM.
 */

/** Clamp a viewport (start/end fractions 0-1) to valid bounds. */
export function clampViewport(
  start: number,
  end: number,
  minWidth = 0.01,
): { start: number; end: number } {
  let s = Math.max(0, Math.min(1 - minWidth, start))
  let e = Math.max(s + minWidth, Math.min(1, end))
  // Re-clamp start if end was clamped
  if (e > 1) {
    e = 1
    s = Math.max(0, e - Math.max(minWidth, end - start))
  }
  return { start: s, end: e }
}

/** Convert a pixel position to a fraction of a container width. */
export function pixelToFraction(px: number, containerWidth: number): number {
  if (containerWidth <= 0) return 0
  return Math.max(0, Math.min(1, px / containerWidth))
}

/** Convert data indices to fractions of total data length. */
export function indicesToFractions(
  start: number,
  end: number,
  dataLength: number,
): { start: number; end: number } {
  if (dataLength <= 1) return { start: 0, end: 1 }
  return {
    start: start / (dataLength - 1),
    end: end / (dataLength - 1),
  }
}

/** Convert fractions (0-1) to data indices. */
export function fractionsToIndices(
  startFrac: number,
  endFrac: number,
  dataLength: number,
): { start: number; end: number } {
  return {
    start: Math.round(startFrac * (dataLength - 1)),
    end: Math.round(endFrac * (dataLength - 1)),
  }
}
