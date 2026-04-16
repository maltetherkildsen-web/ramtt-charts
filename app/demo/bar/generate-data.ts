// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Data generators for bar chart demos.
 * Uses shadcn seed values for easy visual comparison.
 */

export interface MonthlyPoint {
  month: string
  desktop: number
  mobile: number
}

export interface BrowserPoint {
  browser: string
  visitors: number
}

export interface DailyPoint {
  date: string
  desktop: number
  mobile: number
}

/** 6-month data matching shadcn's bar chart examples */
export const MONTHLY_DATA: MonthlyPoint[] = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

/** Short month labels */
export const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

/** Browser market share data */
export const BROWSER_DATA: BrowserPoint[] = [
  { browser: 'Chrome', visitors: 275 },
  { browser: 'Safari', visitors: 200 },
  { browser: 'Firefox', visitors: 187 },
  { browser: 'Edge', visitors: 173 },
  { browser: 'Other', visitors: 90 },
]

/** Negative-capable monthly data */
export const NEGATIVE_DATA = [
  { month: 'January', value: 186 },
  { month: 'February', value: 305 },
  { month: 'March', value: -237 },
  { month: 'April', value: 73 },
  { month: 'May', value: -209 },
  { month: 'June', value: 214 },
]

/**
 * Generate daily data for interactive chart.
 */
export function generateDailyData(days: number): DailyPoint[] {
  const data: DailyPoint[] = []
  const start = new Date(2024, 3, 1)

  let seed = 42
  function rand() {
    seed = (seed * 16807 + 0) % 2147483647
    return (seed - 1) / 2147483646
  }

  let desktopBase = 180
  let mobileBase = 90

  for (let i = 0; i < days; i++) {
    const date = new Date(start)
    date.setDate(date.getDate() + i)

    const dayOfWeek = date.getDay()
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1.0
    const trend = 1 + i * 0.002

    const desktop = Math.round(
      desktopBase * weekendFactor * trend * (0.85 + rand() * 0.3)
    )
    const mobile = Math.round(
      mobileBase * weekendFactor * trend * (0.8 + rand() * 0.4)
    )

    desktopBase += (rand() - 0.48) * 3
    mobileBase += (rand() - 0.48) * 2

    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')

    data.push({ date: `${yyyy}-${mm}-${dd}`, desktop, mobile })
  }

  return data
}
