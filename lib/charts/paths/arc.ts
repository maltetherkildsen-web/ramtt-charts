/**
 * Arc path utilities for donut/pie charts.
 *
 * Pure functions, zero dependencies, zero React, zero DOM.
 *
 * Angle convention:
 *   0 = 12 o'clock (top), clockwise.
 *   Full circle = 2π.
 */

/**
 * Generates an SVG arc path `d` attribute for a donut/pie segment.
 *
 * @param cx           Center x.
 * @param cy           Center y.
 * @param innerRadius  Inner edge (0 for pie).
 * @param outerRadius  Outer edge.
 * @param startAngle   Start angle in radians (0 = top, clockwise).
 * @param endAngle     End angle in radians.
 */
export function arcPath(
  cx: number,
  cy: number,
  innerRadius: number,
  outerRadius: number,
  startAngle: number,
  endAngle: number,
): string {
  const sweep = endAngle - startAngle

  // Near-full circle: use two half-arcs to avoid SVG arc rendering glitch
  if (Math.abs(sweep) >= 2 * Math.PI - 1e-6) {
    const mid = startAngle + Math.PI
    return (
      arcPath(cx, cy, innerRadius, outerRadius, startAngle, mid) +
      ' ' +
      arcPath(cx, cy, innerRadius, outerRadius, mid, endAngle)
    )
  }

  const largeArc = Math.abs(sweep) > Math.PI ? 1 : 0

  // Outer arc endpoints (start → end, clockwise)
  const ox1 = cx + outerRadius * Math.sin(startAngle)
  const oy1 = cy - outerRadius * Math.cos(startAngle)
  const ox2 = cx + outerRadius * Math.sin(endAngle)
  const oy2 = cy - outerRadius * Math.cos(endAngle)

  // Inner arc endpoints (end → start, counter-clockwise)
  const ix1 = cx + innerRadius * Math.sin(endAngle)
  const iy1 = cy - innerRadius * Math.cos(endAngle)
  const ix2 = cx + innerRadius * Math.sin(startAngle)
  const iy2 = cy - innerRadius * Math.cos(startAngle)

  const r = (n: number) => n.toFixed(2)

  if (innerRadius <= 0) {
    // Pie slice: outer arc → line to center → close
    return [
      `M${r(ox1)},${r(oy1)}`,
      `A${r(outerRadius)},${r(outerRadius)},0,${largeArc},1,${r(ox2)},${r(oy2)}`,
      `L${r(cx)},${r(cy)}`,
      'Z',
    ].join('')
  }

  // Donut segment: outer arc → line to inner → inner arc (reversed) → close
  return [
    `M${r(ox1)},${r(oy1)}`,
    `A${r(outerRadius)},${r(outerRadius)},0,${largeArc},1,${r(ox2)},${r(oy2)}`,
    `L${r(ix1)},${r(iy1)}`,
    `A${r(innerRadius)},${r(innerRadius)},0,${largeArc},0,${r(ix2)},${r(iy2)}`,
    'Z',
  ].join('')
}

/**
 * Layout data into pie/donut angles.
 *
 * @param data           Array of data points.
 * @param valueAccessor  Extracts the numeric value from each datum.
 * @param padAngle       Gap between segments in radians (default 0.02 ≈ 1.1°).
 */
export function pieLayout<T>(
  data: readonly T[],
  valueAccessor: (d: T) => number,
  padAngle = 0.02,
): {
  datum: T
  startAngle: number
  endAngle: number
  value: number
  percentage: number
}[] {
  const values = data.map(valueAccessor)
  const total = values.reduce((sum, v) => sum + v, 0)
  if (total === 0) return []

  const totalPad = padAngle * data.length
  const available = 2 * Math.PI - totalPad

  let angle = 0
  return data.map((datum, i) => {
    const value = values[i]
    const percentage = (value / total) * 100
    const sweep = (value / total) * available
    const startAngle = angle + padAngle / 2
    const endAngle = startAngle + sweep
    angle = endAngle + padAngle / 2
    return { datum, startAngle, endAngle, value, percentage }
  })
}
