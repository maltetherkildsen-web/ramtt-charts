// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Data generators for pie/donut chart demos.
 * Uses shadcn seed values for easy visual comparison.
 */

export interface BrowserPoint {
  browser: string
  visitors: number
  fill: string
}

/** 5-category browser data matching shadcn's pie chart examples */
export const BROWSER_DATA: BrowserPoint[] = [
  { browser: 'Chrome', visitors: 275, fill: 'var(--chart-1)' },
  { browser: 'Safari', visitors: 200, fill: 'var(--chart-2)' },
  { browser: 'Firefox', visitors: 287, fill: 'var(--chart-3)' },
  { browser: 'Edge', visitors: 173, fill: 'var(--chart-4)' },
  { browser: 'Other', visitors: 190, fill: 'var(--chart-5)' },
]

export const CHART_COLORS = [
  'var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)',
  'var(--chart-4)', 'var(--chart-5)',
]

/** Monochrome blue scale for the separator-none variant */
export const MONO_BLUES = [
  'oklch(0.55 0.15 250)', // darkest
  'oklch(0.62 0.13 250)',
  'oklch(0.70 0.11 250)',
  'oklch(0.78 0.08 250)',
  'oklch(0.86 0.05 250)', // lightest
]

/** Monthly visitor data for the interactive donut with text */
export interface MonthlyVisitors {
  month: string
  data: BrowserPoint[]
  total: number
}

export const MONTHLY_VISITORS: MonthlyVisitors[] = [
  {
    month: 'January',
    data: [
      { browser: 'Chrome', visitors: 186, fill: 'var(--chart-1)' },
      { browser: 'Safari', visitors: 140, fill: 'var(--chart-2)' },
      { browser: 'Firefox', visitors: 178, fill: 'var(--chart-3)' },
      { browser: 'Edge', visitors: 120, fill: 'var(--chart-4)' },
      { browser: 'Other', visitors: 105, fill: 'var(--chart-5)' },
    ],
    total: 729,
  },
  {
    month: 'February',
    data: [
      { browser: 'Chrome', visitors: 205, fill: 'var(--chart-1)' },
      { browser: 'Safari', visitors: 167, fill: 'var(--chart-2)' },
      { browser: 'Firefox', visitors: 230, fill: 'var(--chart-3)' },
      { browser: 'Edge', visitors: 149, fill: 'var(--chart-4)' },
      { browser: 'Other', visitors: 158, fill: 'var(--chart-5)' },
    ],
    total: 909,
  },
  {
    month: 'March',
    data: [
      { browser: 'Chrome', visitors: 237, fill: 'var(--chart-1)' },
      { browser: 'Safari', visitors: 180, fill: 'var(--chart-2)' },
      { browser: 'Firefox', visitors: 252, fill: 'var(--chart-3)' },
      { browser: 'Edge', visitors: 165, fill: 'var(--chart-4)' },
      { browser: 'Other', visitors: 173, fill: 'var(--chart-5)' },
    ],
    total: 1007,
  },
  {
    month: 'April',
    data: [
      { browser: 'Chrome', visitors: 275, fill: 'var(--chart-1)' },
      { browser: 'Safari', visitors: 200, fill: 'var(--chart-2)' },
      { browser: 'Firefox', visitors: 287, fill: 'var(--chart-3)' },
      { browser: 'Edge', visitors: 173, fill: 'var(--chart-4)' },
      { browser: 'Other', visitors: 190, fill: 'var(--chart-5)' },
    ],
    total: 1125,
  },
  {
    month: 'May',
    data: [
      { browser: 'Chrome', visitors: 301, fill: 'var(--chart-1)' },
      { browser: 'Safari', visitors: 213, fill: 'var(--chart-2)' },
      { browser: 'Firefox', visitors: 265, fill: 'var(--chart-3)' },
      { browser: 'Edge', visitors: 198, fill: 'var(--chart-4)' },
      { browser: 'Other', visitors: 210, fill: 'var(--chart-5)' },
    ],
    total: 1187,
  },
  {
    month: 'June',
    data: [
      { browser: 'Chrome', visitors: 290, fill: 'var(--chart-1)' },
      { browser: 'Safari', visitors: 225, fill: 'var(--chart-2)' },
      { browser: 'Firefox', visitors: 310, fill: 'var(--chart-3)' },
      { browser: 'Edge', visitors: 185, fill: 'var(--chart-4)' },
      { browser: 'Other', visitors: 220, fill: 'var(--chart-5)' },
    ],
    total: 1230,
  },
]

export const MONTH_OPTIONS = MONTHLY_VISITORS.map(m => ({
  value: m.month,
  label: m.month,
}))
