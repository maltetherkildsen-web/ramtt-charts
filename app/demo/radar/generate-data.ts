// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Data generators for radar + radial chart demos.
 * Uses shadcn seed values for easy visual comparison.
 */

export interface MonthlyPoint {
  month: string
  desktop: number
  mobile: number
}

/** 6-month data matching shadcn's radar chart examples */
export const MONTHLY_DATA: MonthlyPoint[] = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

export const MONTH_LABELS = ['January', 'February', 'March', 'April', 'May', 'June']

/** Max value across all months (for radar scale normalization) */
export const DATA_MAX = 305

/** Browser data for radial stacked */
export const RADIAL_BROWSERS = [
  { label: 'Chrome', value: 1260, max: 2000, color: 'var(--chart-1)' },
  { label: 'Safari', value: 570, max: 2000, color: 'var(--chart-2)' },
  { label: 'Firefox', value: 790, max: 2000, color: 'var(--chart-3)' },
  { label: 'Edge', value: 430, max: 2000, color: 'var(--chart-4)' },
  { label: 'Other', value: 310, max: 2000, color: 'var(--chart-5)' },
]

/** Monochrome blue scale for stacked radial label variant */
export const MONO_BLUES = [
  'oklch(0.50 0.16 250)',
  'oklch(0.57 0.14 250)',
  'oklch(0.64 0.12 250)',
  'oklch(0.71 0.10 250)',
  'oklch(0.78 0.08 250)',
]
