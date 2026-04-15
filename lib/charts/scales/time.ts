// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

/**
 * Time scale — maps a continuous date/timestamp domain to a continuous pixel range.
 *
 * Pure function, zero dependencies.
 * Accepts domain as [Date, Date] or [number, number] (epoch ms).
 * Returns a callable scale with `.inverse()`, `.clamp()`, and `.ticks()`.
 */

export interface TimeScale {
  /** Map a Date or epoch-ms to the range. */
  (value: Date | number): number
  /** Map a range value back to a Date. */
  inverse(pixel: number): Date
  /** Map a value, clamping it to domain bounds first. */
  clamp(value: Date | number): number
  /** Generate nice tick values as Dates for this domain. */
  ticks(count?: number): Date[]
  /** The domain as epoch-ms tuple. */
  domain: readonly [number, number]
  /** The range tuple this scale was created with. */
  range: readonly [number, number]
}

/** Possible time tick intervals with their millisecond durations. */
const INTERVALS: readonly { ms: number; label: string }[] = [
  { ms: 1_000, label: '1s' },
  { ms: 5_000, label: '5s' },
  { ms: 15_000, label: '15s' },
  { ms: 30_000, label: '30s' },
  { ms: 60_000, label: '1m' },
  { ms: 300_000, label: '5m' },
  { ms: 900_000, label: '15m' },
  { ms: 1_800_000, label: '30m' },
  { ms: 3_600_000, label: '1h' },
  { ms: 10_800_000, label: '3h' },
  { ms: 21_600_000, label: '6h' },
  { ms: 43_200_000, label: '12h' },
  { ms: 86_400_000, label: '1d' },
  { ms: 604_800_000, label: '1w' },
  { ms: 2_592_000_000, label: '30d' },
  { ms: 7_776_000_000, label: '90d' },
  { ms: 31_536_000_000, label: '1y' },
]

function toMs(v: Date | number): number {
  return typeof v === 'number' ? v : v.getTime()
}

export function scaleTime(
  domain: readonly [Date | number, Date | number],
  range: readonly [number, number],
): TimeScale {
  const d0 = toMs(domain[0])
  const d1 = toMs(domain[1])
  const [r0, r1] = range
  const dSpan = d1 - d0
  const rSpan = r1 - r0

  const ratio = dSpan === 0 ? 0 : rSpan / dSpan
  const invRatio = rSpan === 0 ? 0 : dSpan / rSpan

  const scale = ((value: Date | number): number =>
    r0 + (toMs(value) - d0) * ratio) as TimeScale

  scale.inverse = (pixel: number): Date =>
    new Date(d0 + (pixel - r0) * invRatio)

  scale.clamp = (value: Date | number): number => {
    const ms = toMs(value)
    const lo = Math.min(d0, d1)
    const hi = Math.max(d0, d1)
    return scale(Math.max(lo, Math.min(hi, ms)))
  }

  scale.ticks = (count = 6): Date[] => {
    if (dSpan === 0) return [new Date(d0)]

    const targetStep = Math.abs(dSpan) / count
    // Find the best-fitting interval.
    let interval = INTERVALS[0].ms
    for (const iv of INTERVALS) {
      if (iv.ms >= targetStep) {
        interval = iv.ms
        break
      }
      interval = iv.ms
    }

    const ticks: Date[] = []
    const start = Math.ceil(d0 / interval) * interval
    const maxIter = count + 40
    let iter = 0
    let t = start

    while (t <= d1 + interval * 1e-9 && iter < maxIter) {
      ticks.push(new Date(t))
      t += interval
      iter++
    }

    return ticks
  }

  scale.domain = [d0, d1]
  scale.range = range

  return scale
}

/**
 * Format a Date for axis tick display, choosing granularity based on the span.
 */
export function formatTimeTick(date: Date, spanMs: number): string {
  if (spanMs < 60_000) {
    // Sub-minute: show HH:MM:SS
    return `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
  }
  if (spanMs < 86_400_000) {
    // Sub-day: show HH:MM
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`
  }
  if (spanMs < 2_592_000_000) {
    // Sub-month: show MMM d
    return `${MONTHS[date.getMonth()]} ${date.getDate()}`
  }
  if (spanMs < 31_536_000_000) {
    // Sub-year: show MMM d
    return `${MONTHS[date.getMonth()]} ${date.getDate()}`
  }
  // Multi-year: show MMM YYYY
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`
}

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
] as const
