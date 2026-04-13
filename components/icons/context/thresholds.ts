// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

export interface Threshold {
  min: number
  color: string
}

export const HEALTH_THRESHOLDS: Threshold[] = [
  { min: 60, color: 'var(--positive)' },
  { min: 30, color: 'var(--warning)' },
  { min: 0, color: 'var(--negative)' },
]

export const RISK_THRESHOLDS: Threshold[] = [
  { min: 70, color: 'var(--negative)' },
  { min: 40, color: 'var(--warning)' },
  { min: 0, color: 'var(--positive)' },
]

export function getThresholdColor(value: number, thresholds: Threshold[]): string {
  for (const t of thresholds) {
    if (value >= t.min) return t.color
  }
  return 'var(--n400)'
}
