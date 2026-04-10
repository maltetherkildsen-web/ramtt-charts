// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { describe, it, expect } from 'vitest'
import { waterfallLayout, type WaterfallItem } from '../waterfall'

describe('waterfallLayout', () => {
  it('returns empty array for empty input', () => {
    expect(waterfallLayout([])).toEqual([])
  })

  it('handles a single increase', () => {
    const items: WaterfallItem[] = [
      { label: 'Revenue', value: 100, type: 'increase' },
    ]
    const result = waterfallLayout(items)
    expect(result).toEqual([
      { label: 'Revenue', y0: 0, y1: 100, value: 100, type: 'increase' },
    ])
  })

  it('handles increase then decrease', () => {
    const items: WaterfallItem[] = [
      { label: 'Revenue', value: 100, type: 'increase' },
      { label: 'Costs', value: -40, type: 'decrease' },
    ]
    const result = waterfallLayout(items)
    expect(result).toEqual([
      { label: 'Revenue', y0: 0, y1: 100, value: 100, type: 'increase' },
      { label: 'Costs', y0: 60, y1: 100, value: -40, type: 'decrease' },
    ])
  })

  it('total bar spans from 0 to running total', () => {
    const items: WaterfallItem[] = [
      { label: 'Revenue', value: 420, type: 'increase' },
      { label: 'COGS', value: -280, type: 'decrease' },
      { label: 'Net', value: 0, type: 'total' },
    ]
    const result = waterfallLayout(items)
    expect(result[2]).toEqual({
      label: 'Net',
      y0: 0,
      y1: 140,
      value: 140,
      type: 'total',
    })
  })

  it('computes full cash flow correctly', () => {
    const items: WaterfallItem[] = [
      { label: 'Revenue', value: 420, type: 'increase' },
      { label: 'Services', value: 180, type: 'increase' },
      { label: 'COGS', value: -280, type: 'decrease' },
      { label: 'Salaries', value: -150, type: 'decrease' },
      { label: 'Marketing', value: -60, type: 'decrease' },
      { label: 'Rent', value: -35, type: 'decrease' },
      { label: 'Net', value: 0, type: 'total' },
    ]
    const result = waterfallLayout(items)

    // Revenue: 0 → 420
    expect(result[0]).toEqual({ label: 'Revenue', y0: 0, y1: 420, value: 420, type: 'increase' })
    // Services: 420 → 600
    expect(result[1]).toEqual({ label: 'Services', y0: 420, y1: 600, value: 180, type: 'increase' })
    // COGS: 320 → 600 (drops from 600 by 280)
    expect(result[2]).toEqual({ label: 'COGS', y0: 320, y1: 600, value: -280, type: 'decrease' })
    // Salaries: 170 → 320
    expect(result[3]).toEqual({ label: 'Salaries', y0: 170, y1: 320, value: -150, type: 'decrease' })
    // Marketing: 110 → 170
    expect(result[4]).toEqual({ label: 'Marketing', y0: 110, y1: 170, value: -60, type: 'decrease' })
    // Rent: 75 → 110
    expect(result[5]).toEqual({ label: 'Rent', y0: 75, y1: 110, value: -35, type: 'decrease' })
    // Net total: 0 → 75
    expect(result[6]).toEqual({ label: 'Net', y0: 0, y1: 75, value: 75, type: 'total' })
  })

  it('handles decrease with positive value (takes absolute)', () => {
    const items: WaterfallItem[] = [
      { label: 'Start', value: 200, type: 'increase' },
      { label: 'Cost', value: 50, type: 'decrease' },
    ]
    const result = waterfallLayout(items)
    // decrease with positive value should still decrease running total
    expect(result[1]).toEqual({
      label: 'Cost', y0: 150, y1: 200, value: -50, type: 'decrease',
    })
  })
})
