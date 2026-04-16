// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Data generators for area chart demos.
 * Uses shadcn seed values for easy visual comparison.
 */

export interface MonthlyPoint {
  month: string
  desktop: number
  mobile: number
}

export interface DailyPoint {
  date: string
  desktop: number
  mobile: number
}

/** 6-month data matching shadcn's area chart examples */
export const MONTHLY_DATA: MonthlyPoint[] = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

/** Short month labels for X-axis */
export const MONTH_LABELS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']

/**
 * Generate daily page-view data for the interactive chart.
 * Creates realistic data with weekly patterns and gentle upward trend.
 */
export function generateDailyData(days: number): DailyPoint[] {
  const data: DailyPoint[] = []
  const start = new Date(2024, 3, 1) // April 1, 2024

  // Seeded pseudo-random (deterministic)
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

    // Weekly pattern: lower on weekends
    const dayOfWeek = date.getDay()
    const weekendFactor = dayOfWeek === 0 || dayOfWeek === 6 ? 0.7 : 1.0

    // Gentle upward trend
    const trend = 1 + i * 0.002

    const desktop = Math.round(
      desktopBase * weekendFactor * trend * (0.85 + rand() * 0.3)
    )
    const mobile = Math.round(
      mobileBase * weekendFactor * trend * (0.8 + rand() * 0.4)
    )

    // Drift base slightly
    desktopBase += (rand() - 0.48) * 3
    mobileBase += (rand() - 0.48) * 2

    const yyyy = date.getFullYear()
    const mm = String(date.getMonth() + 1).padStart(2, '0')
    const dd = String(date.getDate()).padStart(2, '0')

    data.push({
      date: `${yyyy}-${mm}-${dd}`,
      desktop,
      mobile,
    })
  }

  return data
}
