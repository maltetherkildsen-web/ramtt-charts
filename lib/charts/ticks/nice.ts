// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * "Nice" tick generation for chart axes.
 *
 * Picks human-friendly step sizes (1, 2, 2.5, 5 multiples of powers of 10)
 * and generates ticks that cover the given [min, max] domain.
 *
 * Also exports `niceNum` for rounding a domain extent to pretty bounds.
 *
 * Pure function, zero dependencies.
 */

const NICE_STEPS = [1, 2, 2.5, 5, 10] as const

/**
 * Generate an array of "nice" tick values for a numeric axis.
 *
 * @param min       Domain lower bound.
 * @param max       Domain upper bound.
 * @param count     Desired number of ticks (approximate, default 5).
 * @returns         Sorted array of tick values.
 */
export function niceTicks(min: number, max: number, count = 5): number[] {
  if (min === max) return [min]
  if (count < 1) return []

  // Ensure min < max
  if (min > max) [min, max] = [max, min]

  const range = max - min
  const rawStep = range / count
  const mag = Math.pow(10, Math.floor(Math.log10(rawStep)))

  let step = mag
  for (const n of NICE_STEPS) {
    if (n * mag >= rawStep) {
      step = n * mag
      break
    }
  }

  const ticks: number[] = []
  let t = Math.ceil(min / step) * step

  // Guard against infinite loop from floating-point edge cases
  const maxIter = count + 20
  let iter = 0
  while (t <= max + step * 1e-9 && iter < maxIter) {
    // Round away floating-point noise
    ticks.push(Math.round(t * 1e12) / 1e12)
    t += step
    iter++
  }

  return ticks
}

/**
 * Round a number to a "nice" value (ceiling or floor).
 *
 * Useful for expanding a raw data extent to clean axis bounds.
 *
 * @param value The raw number.
 * @param round If `true`, round to nearest; if `false`, ceil.
 */
export function niceNum(value: number, round = false): number {
  if (value === 0) return 0
  const negative = value < 0
  const v = Math.abs(value)
  const exp = Math.floor(Math.log10(v))
  const frac = v / Math.pow(10, exp)

  let nice: number
  if (round) {
    nice = frac < 1.5 ? 1 : frac < 3 ? 2 : frac < 7 ? 5 : 10
  } else {
    nice = frac <= 1 ? 1 : frac <= 2 ? 2 : frac <= 5 ? 5 : 10
  }

  const result = nice * Math.pow(10, exp)
  return negative ? -result : result
}
