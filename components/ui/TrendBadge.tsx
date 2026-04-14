// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * TrendBadge — compact period + trend arrow + percentage badge.
 *
 * Shows a time window label and colored trend indicator.
 * Positive values render in --chart-positive, negative in --chart-negative.
 *
 * Usage:
 *   <TrendBadge period="4w" value={11.6} />
 *   <TrendBadge period="12m" value={-3.4} />
 */

import { cn } from '@/lib/ui'

export interface TrendBadgeProps {
  /** Time period label, e.g. "4w", "13w", "12m", "YTD" */
  period: string
  /** Percentage change */
  value: number
  className?: string
}

export function TrendBadge({ period, value, className }: TrendBadgeProps) {
  const isPositive = value >= 0
  const arrow = isPositive ? '↗' : '↘'
  const colorClass = isPositive ? 'text-[var(--chart-positive)]' : 'text-[var(--chart-negative)]'
  const formatted = `${isPositive ? '+' : ''}${value.toFixed(1)}%`

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-[5px] border-[0.5px] border-[var(--n400)] px-2 py-[3px]',
        className,
      )}
    >
      <span className="text-[11px] font-[450] text-[var(--n800)]" style={{ fontFamily: 'var(--font-sans)' }}>
        {period}
      </span>
      <span className={`text-[11px] ${colorClass}`}>{arrow}</span>
      <span
        className={`text-[11px] font-[550] ${colorClass}`}
        style={{ fontFamily: 'var(--font-sans)', fontVariantNumeric: 'tabular-nums' }}
      >
        {formatted}
      </span>
    </span>
  )
}
