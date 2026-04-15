// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Band scale — maps discrete labels to pixel bands with configurable padding.
 *
 * Pure function, zero dependencies.
 * Returns a callable scale that maps a label index to the start of its band.
 */

export interface BandScale {
  /** Map a label to the pixel start of its band. Returns undefined for unknown labels. */
  (label: string): number | undefined
  /** The computed width of each band in pixels. */
  bandwidth(): number
  /** The step distance between adjacent band starts (bandwidth + inner gap). */
  step(): number
  /** The domain labels this scale was created with. */
  domain: readonly string[]
  /** The range tuple this scale was created with. */
  range: readonly [number, number]
  /** Inner padding fraction (0–1). */
  paddingInner: number
  /** Outer padding fraction (0–1). */
  paddingOuter: number
}

export function scaleBand(
  domain: readonly string[],
  range: readonly [number, number],
  options: { paddingInner?: number; paddingOuter?: number } = {},
): BandScale {
  const { paddingInner = 0, paddingOuter = 0 } = options
  const [r0, r1] = range
  const n = domain.length
  const rSpan = r1 - r0

  // With n bands, there are (n-1) inner gaps and 2 outer gaps.
  // step = rSpan / (n + paddingOuter * 2 - paddingInner + paddingInner * n)
  // simplifies to: step = rSpan / (n - paddingInner + 2 * paddingOuter + paddingInner * n)
  // which is: step = rSpan / (n * (1 + paddingInner) - paddingInner + 2 * paddingOuter)
  // But the standard formula (matching d3):
  // step = rSpan / Math.max(1, n - paddingInner + 2 * paddingOuter)
  // bandwidth = step * (1 - paddingInner)

  let step: number
  let bw: number

  if (n === 0) {
    step = 0
    bw = 0
  } else {
    // d3-compatible formula:
    // totalSteps = n + (n - 1) * paddingInner is wrong
    // Let's use: step * n + step * paddingOuter * 2 - step * paddingInner = rSpan
    // Actually, the standard formulation:
    // Each band has width = step * (1 - paddingInner)
    // Between bands: step * paddingInner
    // Outer padding on each side: step * paddingOuter
    // Total = n * step + 2 * step * paddingOuter - step * paddingInner
    //       = step * (n + 2 * paddingOuter - paddingInner)
    // Wait no. n bands means n steps of bandwidth + (n-1) inner gaps + 2 outer gaps.
    // bandwidth = step * (1 - paddingInner)
    // inner gap = step * paddingInner
    // outer gap = step * paddingOuter
    // total = n * bandwidth + (n-1) * innerGap + 2 * outerGap
    //       = n * step * (1-pi) + (n-1) * step * pi + 2 * step * po
    //       = step * (n - n*pi + n*pi - pi + 2*po)
    //       = step * (n - pi + 2*po)
    const divisor = n - paddingInner + 2 * paddingOuter
    step = divisor <= 0 ? 0 : rSpan / divisor
    bw = step * (1 - paddingInner)
  }

  const offset = r0 + step * paddingOuter

  // Build lookup map for O(1) access.
  const indexMap = new Map<string, number>()
  for (let i = 0; i < n; i++) {
    indexMap.set(domain[i], i)
  }

  const scale = ((label: string): number | undefined => {
    const idx = indexMap.get(label)
    if (idx === undefined) return undefined
    return offset + idx * step
  }) as BandScale

  scale.bandwidth = (): number => bw
  scale.step = (): number => step
  scale.domain = domain
  scale.range = range
  scale.paddingInner = paddingInner
  scale.paddingOuter = paddingOuter

  return scale
}
