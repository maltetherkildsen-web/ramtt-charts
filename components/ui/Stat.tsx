// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  STAT_SIZES,
  formatTime,
  formatPercent,
  formatCompact,
} from '@/lib/ui'

// ─── Types ───

export interface StatProps {
  value: number | string
  unit?: string
  label?: string
  format?: 'number' | 'time' | 'percent' | 'compact'
  precision?: number
  delta?: number | string
  deltaColor?: 'positive' | 'negative' | 'default'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// ─── Format value ───

function formatValue(
  value: number | string,
  format: StatProps['format'] = 'number',
  precision?: number,
): string {
  if (typeof value === 'string') return value

  switch (format) {
    case 'time':
      return formatTime(value)
    case 'percent':
      return formatPercent(value, precision ?? 1)
    case 'compact':
      return formatCompact(value)
    case 'number':
    default:
      return precision !== undefined ? value.toFixed(precision) : String(value)
  }
}

// ─── Format delta ───

function formatDelta(delta: number | string): string {
  if (typeof delta === 'string') return delta
  if (delta > 0) return `+${delta}`
  if (delta < 0) return `\u2212${Math.abs(delta)}`
  return String(delta)
}

// ─── Delta color class ───

const DELTA_COLORS: Record<string, string> = {
  positive: 'text-[var(--positive)]',
  negative: 'text-[var(--negative)]',
  default: 'text-[var(--n800)]',
}

// ─── Component ───

const Stat = forwardRef<HTMLSpanElement, StatProps>(
  (
    {
      value,
      unit,
      label,
      format = 'number',
      precision,
      delta,
      deltaColor = 'default',
      size = 'md',
      className,
    },
    ref,
  ) => {
    const sizeTokens = STAT_SIZES[size]
    const formatted = formatValue(value, format, precision)

    return (
      <span ref={ref} className={cn(FONT.body, 'inline-flex items-baseline', className)}>
        {label && (
          <span
            className={cn(
              WEIGHT.normal,
              'text-[var(--n600)]',
              sizeTokens.value,
            )}
          >
            {label}:&nbsp;
          </span>
        )}
        <span
          className={cn(
            WEIGHT.strong,
            'tabular-nums text-[var(--n1150)]',
            sizeTokens.value,
          )}
        >
          {formatted}
        </span>
        {unit && (
          <span
            className={cn(
              WEIGHT.book,
              'text-[var(--n800)] ml-[2px]',
              sizeTokens.unit,
            )}
          >
            {unit}
          </span>
        )}
        {delta !== undefined && (
          <span
            className={cn(
              WEIGHT.book,
              'tabular-nums ml-1',
              sizeTokens.unit,
              DELTA_COLORS[deltaColor],
            )}
          >
            {formatDelta(delta)}
          </span>
        )}
      </span>
    )
  },
)

Stat.displayName = 'Stat'
export { Stat }
