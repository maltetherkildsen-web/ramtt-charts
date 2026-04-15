// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Logarithmic scale — maps a continuous numeric domain to a continuous range
 * using a logarithmic transform.
 *
 * Pure function, zero dependencies.
 * Returns a callable scale with `.inverse()` and `.clamp()` helpers.
 *
 * Default base is 10. Domain values must be > 0.
 */

export interface LogScale {
  /** Map a domain value to the range (log-transformed). */
  (value: number): number
  /** Map a range value back to the domain. */
  inverse(pixel: number): number
  /** Map a domain value, clamping it to [d0, d1] first. */
  clamp(value: number): number
  /** The domain tuple this scale was created with. */
  domain: readonly [number, number]
  /** The range tuple this scale was created with. */
  range: readonly [number, number]
  /** The logarithm base. */
  base: number
}

export function scaleLog(
  domain: readonly [number, number],
  range: readonly [number, number],
  base = 10,
): LogScale {
  const [d0, d1] = domain
  const [r0, r1] = range

  const logBase = Math.log(base)
  const log = (v: number): number => Math.log(Math.max(v, 1e-10)) / logBase

  const ld0 = log(d0)
  const ld1 = log(d1)
  const logSpan = ld1 - ld0
  const rSpan = r1 - r0

  // Avoid division by zero — degenerate log-domain collapses to range start.
  const ratio = logSpan === 0 ? 0 : rSpan / logSpan
  const invRatio = rSpan === 0 ? 0 : logSpan / rSpan

  const scale = ((value: number): number =>
    r0 + (log(value) - ld0) * ratio) as LogScale

  scale.inverse = (pixel: number): number =>
    Math.pow(base, ld0 + (pixel - r0) * invRatio)

  scale.clamp = (value: number): number => {
    const lo = Math.min(d0, d1)
    const hi = Math.max(d0, d1)
    return scale(Math.max(lo, Math.min(hi, value)))
  }

  scale.domain = domain
  scale.range = range
  scale.base = base

  return scale
}

/**
 * Generate "nice" tick values for a logarithmic axis.
 *
 * Produces ticks at powers of the base multiplied by [1, 2, 5] steps.
 * E.g. for base 10: 1, 2, 5, 10, 20, 50, 100, 200, 500, 1000 ...
 */
export function niceLogTicks(min: number, max: number, base = 10): number[] {
  if (min <= 0) min = 1
  if (max <= min) return [min]

  const steps = [1, 2, 5]
  const ticks: number[] = []

  const startExp = Math.floor(Math.log(min) / Math.log(base))
  const endExp = Math.ceil(Math.log(max) / Math.log(base))

  for (let exp = startExp; exp <= endExp; exp++) {
    const pow = Math.pow(base, exp)
    for (const s of steps) {
      const tick = s * pow
      if (tick >= min * (1 - 1e-9) && tick <= max * (1 + 1e-9)) {
        ticks.push(Math.round(tick * 1e10) / 1e10)
      }
    }
  }

  return ticks
}
