// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, RADIUS, FONT, SIZE_TEXT, WEIGHT } from '@/lib/ui'

const FILL_COLORS: Record<string, string> = {
  default: 'var(--n1150)',
  positive: 'var(--positive)',
  negative: 'var(--negative)',
  warning: 'var(--warning)',
  nutrition: 'var(--domain-nutrition)',
  training: 'var(--domain-training)',
  body: 'var(--domain-body)',
}

export interface ProgressBarProps {
  value: number
  max: number
  color?: 'default' | 'positive' | 'negative' | 'warning' | 'nutrition' | 'training' | 'body' | string
  label?: string
  height?: number
  className?: string
}

const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(
  ({ value, max, color = 'default', label, height = 6, className }, ref) => {
    const pct = Math.min(100, Math.max(0, (value / max) * 100))
    const fillColor = FILL_COLORS[color] ?? color

    return (
      <div ref={ref} className={cn('flex items-center gap-3', className)}>
        <div
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
          aria-label={label || 'Progress'}
          className={cn('relative flex-1 overflow-hidden bg-[var(--n200)]', RADIUS.sm)}
          style={{ height }}
        >
          <div
            className={cn('absolute inset-y-0 left-0 transition-[width] duration-300 ease-out', RADIUS.sm)}
            style={{ width: `${pct}%`, backgroundColor: fillColor }}
          />
        </div>
        {label && (
          <span aria-hidden="true" className={cn(FONT.body, WEIGHT.medium, SIZE_TEXT.sm, 'shrink-0 tabular-nums text-[var(--n800)]')}>
            {label}
          </span>
        )}
      </div>
    )
  }
)

ProgressBar.displayName = 'ProgressBar'
export { ProgressBar }
