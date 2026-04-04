/**
 * Linear scale — maps a continuous numeric domain to a continuous range.
 *
 * Pure function, zero dependencies.
 * Returns a callable scale with `.inverse()` and `.clamp()` helpers.
 */

export interface LinearScale {
  /** Map a domain value to the range. */
  (value: number): number
  /** Map a range value back to the domain. */
  inverse(pixel: number): number
  /** Map a domain value, clamping it to [d0, d1] first. */
  clamp(value: number): number
  /** The domain tuple this scale was created with. */
  domain: readonly [number, number]
  /** The range tuple this scale was created with. */
  range: readonly [number, number]
}

export function scaleLinear(
  domain: readonly [number, number],
  range: readonly [number, number],
): LinearScale {
  const [d0, d1] = domain
  const [r0, r1] = range
  const dSpan = d1 - d0
  const rSpan = r1 - r0

  // Avoid division by zero — degenerate domain collapses to range midpoint.
  const ratio = dSpan === 0 ? 0 : rSpan / dSpan
  const invRatio = rSpan === 0 ? 0 : dSpan / rSpan

  const scale = ((value: number): number => r0 + (value - d0) * ratio) as LinearScale

  scale.inverse = (pixel: number): number => d0 + (pixel - r0) * invRatio

  scale.clamp = (value: number): number => {
    const lo = Math.min(d0, d1)
    const hi = Math.max(d0, d1)
    return scale(Math.max(lo, Math.min(hi, value)))
  }

  scale.domain = domain
  scale.range = range

  return scale
}
