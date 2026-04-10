/**
 * Waterfall layout — transforms sequential changes into floating bar positions.
 *
 * Pure function, zero dependencies, zero React, zero DOM.
 */

export interface WaterfallItem {
  label: string
  value: number
  type: 'increase' | 'decrease' | 'total'
}

export interface WaterfallBar {
  label: string
  y0: number
  y1: number
  value: number
  type: 'increase' | 'decrease' | 'total'
}

/**
 * Transform sequential changes into floating bar positions.
 *
 * - `increase`: bar rises from running total upward by value
 * - `decrease`: bar drops from running total downward by |value|
 * - `total`: bar spans from 0 to the current running total
 *
 * @param items  Array of waterfall items with label, value, and type.
 * @returns      Array of bars with y0 (bottom) and y1 (top) positions.
 */
export function waterfallLayout(items: readonly WaterfallItem[]): WaterfallBar[] {
  const len = items.length
  const result: WaterfallBar[] = new Array(len)
  let running = 0

  for (let i = 0; i < len; i++) {
    const item = items[i]

    if (item.type === 'total') {
      result[i] = {
        label: item.label,
        y0: 0,
        y1: running,
        value: running,
        type: 'total',
      }
    } else if (item.type === 'increase') {
      const absVal = Math.abs(item.value)
      result[i] = {
        label: item.label,
        y0: running,
        y1: running + absVal,
        value: absVal,
        type: 'increase',
      }
      running += absVal
    } else {
      // decrease
      const absVal = Math.abs(item.value)
      result[i] = {
        label: item.label,
        y0: running - absVal,
        y1: running,
        value: -absVal,
        type: 'decrease',
      }
      running -= absVal
    }
  }

  return result
}
