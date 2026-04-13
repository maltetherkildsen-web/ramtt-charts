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

const STATUS_TINT_BG: Record<string, string> = {
  good: 'var(--positive-soft)',
  warning: 'var(--warning-soft)',
  critical: 'var(--negative-soft)',
  neutral: 'var(--n200)',
  unknown: 'var(--n200)',
}

const STATUS_TINT_BORDER: Record<string, string> = {
  good: 'rgba(132, 204, 22, 0.2)',
  warning: 'rgba(245, 158, 11, 0.2)',
  critical: 'rgba(244, 63, 94, 0.2)',
  neutral: 'var(--n400)',
  unknown: 'var(--n400)',
}

// ─── Types ───

export interface StatusIndicatorProps {
  status: 'good' | 'warning' | 'critical' | 'neutral' | 'unknown'
  /** Primary label */
  label?: string
  /** Secondary text describing the status */
  value?: string
  /** sm = inline dot+label, md = default, lg = tinted container */
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

    // ── Size lg: prominent — tinted background container ──
    const tintBg = STATUS_TINT_BG[status] ?? 'var(--n200)'
    const tintBorder = STATUS_TINT_BORDER[status] ?? 'var(--n400)'

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-[8px]',
          'px-3.5 py-2.5',
          className,
        )}
        style={{
          backgroundColor: tintBg,
          border: `0.5px solid ${tintBorder}`,
        }}
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
