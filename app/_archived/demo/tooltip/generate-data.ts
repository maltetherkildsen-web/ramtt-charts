// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Data for tooltip demo — weekly exercise data.
 */

export interface ExercisePoint {
  day: string
  running: number
  swimming: number
}

export const WEEKLY_DATA: ExercisePoint[] = [
  { day: 'Mon', running: 300, swimming: 200 },
  { day: 'Tue', running: 450, swimming: 250 },
  { day: 'Wed', running: 600, swimming: 350 },
  { day: 'Thu', running: 400, swimming: 300 },
  { day: 'Fri', running: 550, swimming: 400 },
  { day: 'Sat', running: 500, swimming: 350 },
]

export const DAY_LABELS = WEEKLY_DATA.map(d => d.day)
