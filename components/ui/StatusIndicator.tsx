// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT } from '@/lib/ui'
import { ColorDot } from './ColorDot'

// ─── Status → color mapping ───

const STATUS_COLORS: Record<string, string> = {
  good: 'var(--positive)',
  warning: 'var(--warning)',
  critical: 'var(--negative)',
  neutral: 'var(--n600)',
  unknown: 'var(--n400)',
}

// ─── Types ───

export interface StatusIndicatorProps {
  status: 'good' | 'warning' | 'critical' | 'neutral' | 'unknown'
  /** Primary label */
  label?: string
  /** Secondary text describing the status */
  value?: string
  /** sm = inline dot+label, md = default, lg = container with left-border accent */
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

// ─── Component ───

const StatusIndicator = forwardRef<HTMLDivElement, StatusIndicatorProps>(
  ({ status, label, value, size = 'md', className }, ref) => {
    const color = STATUS_COLORS[status] ?? 'var(--n400)'

    // ── Size sm: inline — just a small dot + label ──
    if (size === 'sm') {
      return (
        <span
          ref={ref as React.Ref<HTMLSpanElement>}
          className={cn('inline-flex items-center', className)}
        >
          <ColorDot color={color} size="sm" label={label} />
        </span>
      )
    }

    // ── Size md: default — dot + label on top, value below ──
    if (size === 'md') {
      return (
        <div ref={ref} className={cn('flex items-start gap-2', className)}>
          <ColorDot color={color} size="md" className="mt-[5px]" />
          <div className="min-w-0">
            {label && (
              <div className={cn(FONT.body, 'text-[13px]', WEIGHT.book, 'text-[var(--n1150)]')}>
                {label}
              </div>
            )}
            {value && (
              <div className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)]')}>
                {value}
              </div>
            )}
          </div>
        </div>
      )
    }

    // ── Size lg: prominent — container with left-border accent ──
    return (
      <div
        ref={ref}
        className={cn(
          'bg-[var(--n50)]',
          'border-[0.5px] border-[var(--n400)]',
          'rounded-[8px]',
          'px-3.5 py-2.5',
          className,
        )}
        style={{ borderLeftWidth: 3, borderLeftColor: color }}
      >
        <div className="flex items-start gap-2">
          <ColorDot color={color} size="md" className="mt-[5px]" />
          <div className="min-w-0">
            {label && (
              <div className={cn(FONT.body, 'text-[13px]', WEIGHT.book, 'text-[var(--n1150)]')}>
                {label}
              </div>
            )}
            {value && (
              <div className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)]')}>
                {value}
              </div>
            )}
          </div>
        </div>
      </div>
    )
  },
)

StatusIndicator.displayName = 'StatusIndicator'
export { StatusIndicator }
