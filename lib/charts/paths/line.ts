/**
 * SVG line path generator.
 *
 * Produces the `d` attribute string for an SVG `<path>` element.
 * Raw point-to-point (no smoothing) — same approach as Perplexity Finance.
 *
 * Pure function, zero dependencies.
 */

export interface Accessor<T> {
  (datum: T, index: number): number
}

/**
 * Build an SVG `d` string for a polyline through `data`.
 *
 * @param data   Array of data points (any shape).
 * @param x      Accessor that returns the **pixel** x for a datum.
 * @param y      Accessor that returns the **pixel** y for a datum.
 * @param digits Decimal precision for coordinates (default 1).
 */
export function linePath<T>(
  data: readonly T[],
  x: Accessor<T>,
  y: Accessor<T>,
  digits = 1,
): string {
  const len = data.length
  if (len === 0) return ''

  const parts: string[] = new Array(len)
  for (let i = 0; i < len; i++) {
    const px = x(data[i], i).toFixed(digits)
    const py = y(data[i], i).toFixed(digits)
    parts[i] = `${i === 0 ? 'M' : 'L'}${px},${py}`
  }
  return parts.join('')
}
