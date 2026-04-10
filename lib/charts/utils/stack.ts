/**
 * Stack utility — transforms multiple series into stacked y0/y1 arrays.
 *
 * Pure function, zero dependencies, zero React, zero DOM.
 */

/**
 * Transforms multiple series into stacked series.
 *
 * Each output series gets `y0` (baseline — sum of all series below)
 * and `y1` (topline — y0 + own value). The first series has y0 = 0.
 *
 * @param data       Array of data points.
 * @param accessors  Array of accessor functions, one per series.
 * @returns          Array of stacked series, each an array of { y0, y1 }.
 */
export function stackSeries<T>(
  data: readonly T[],
  accessors: ((d: T) => number)[],
): { y0: number; y1: number }[][] {
  const seriesCount = accessors.length
  const len = data.length

  // Initialize output
  const result: { y0: number; y1: number }[][] = new Array(seriesCount)
  for (let s = 0; s < seriesCount; s++) {
    result[s] = new Array(len)
  }

  // Stack from bottom to top
  for (let i = 0; i < len; i++) {
    let cumulative = 0
    for (let s = 0; s < seriesCount; s++) {
      const value = accessors[s](data[i])
      result[s][i] = { y0: cumulative, y1: cumulative + value }
      cumulative += value
    }
  }

  return result
}
