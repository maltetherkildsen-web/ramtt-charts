// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

// lib/calendar-utils.ts — Date math helpers for Calendar/DatePicker

export function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate()
}

export function getFirstDayOfMonth(year: number, month: number): number {
  return new Date(year, month, 1).getDay()
}

export function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

export function isInRange(date: Date, from: Date, to: Date): boolean {
  const d = date.getTime()
  return d >= from.getTime() && d <= to.getTime()
}

export function addMonths(date: Date, n: number): Date {
  const d = new Date(date)
  d.setMonth(d.getMonth() + n)
  return d
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

export function getWeekNumber(date: Date): number {
  const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
  return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
}

export function formatDate(date: Date, mode: 'short' | 'long' = 'short'): string {
  return new Intl.DateTimeFormat('da-DK', {
    day: 'numeric',
    month: mode === 'short' ? 'short' : 'long',
    year: 'numeric',
  }).format(date)
}

/** Build grid of day cells for a month. Returns 6 rows of 7 days. */
export function getMonthGrid(year: number, month: number, weekStartsOn: 0 | 1 = 1): Date[][] {
  const firstDay = getFirstDayOfMonth(year, month)
  // Shift so Monday=0 if weekStartsOn=1
  const offset = (firstDay - weekStartsOn + 7) % 7
  const daysInMonth = getDaysInMonth(year, month)
  const daysInPrevMonth = getDaysInMonth(year, month - 1)

  const cells: Date[] = []

  // Previous month padding
  for (let i = offset - 1; i >= 0; i--) {
    cells.push(new Date(year, month - 1, daysInPrevMonth - i))
  }

  // Current month
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push(new Date(year, month, d))
  }

  // Next month padding (fill to 42 cells = 6 rows)
  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    cells.push(new Date(year, month + 1, d))
  }

  // Split into rows of 7
  const rows: Date[][] = []
  for (let i = 0; i < 42; i += 7) {
    rows.push(cells.slice(i, i + 7))
  }

  return rows
}
