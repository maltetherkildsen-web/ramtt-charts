// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER, TRANSITION } from '@/lib/ui'
import { ToggleGroup } from './ToggleGroup'

// ─── Types ───

export interface ChartCardLegendItem {
  color: string
  label: string
}

export interface ChartCardMetric {
  value: string
  label: string
  delta?: string
  deltaColor?: 'positive' | 'negative' | 'default'
}

export interface ChartCardProps {
  title: string
  subtitle?: string
  periods?: string[]
  period?: string
  onPeriodChange?: (period: string) => void
  legend?: ChartCardLegendItem[]
  metric?: ChartCardMetric
  actions?: ReactNode
  children: ReactNode
  padding?: 'none' | 'sm' | 'md'
  className?: string
}

// ─── Constants ───

const CHART_PADDING = {
  none: '',
  sm: 'px-3',
  md: 'px-5',
} as const

const DELTA_COLORS = {
  positive: 'text-[var(--positive-on-soft)]',
  negative: 'text-[var(--negative-on-soft)]',
  default: 'text-[var(--n800)]',
} as const

// ─── Component ───

const ChartCard = forwardRef<HTMLDivElement, ChartCardProps>(
  function ChartCard(
    { title, subtitle, periods, period, onPeriodChange, legend, metric, actions, children, padding = 'md', className },
    ref,
  ) {
    const periodOptions = periods?.map((p) => ({ value: p, label: p }))

    return (
      <div
        ref={ref}
        className={cn(
          'bg-[var(--n50)]',
          BORDER.default,
          RADIUS.lg,
          className,
        )}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4" style={{ padding: '20px 20px 12px 20px' }}>
          <div className="min-w-0">
            <h3 className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
              {title}
            </h3>
            {subtitle && (
              <p className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n800)] mt-0.5')}>
                {subtitle}
              </p>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            {metric && (
              <div className="text-right">
                <div className="flex items-baseline gap-1.5 justify-end">
                  <span className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)] tabular-nums')}>
                    {metric.value}
                  </span>
                  {metric.delta && (
                    <span className={cn(
                      FONT.body,
                      'text-[12px]',
                      WEIGHT.book,
                      DELTA_COLORS[metric.deltaColor ?? 'default'],
                    )}>
                      {metric.delta}
                    </span>
                  )}
                </div>
                <p className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)]')}>
                  {metric.label}
                </p>
              </div>
            )}

            {periodOptions && period && onPeriodChange && (
              <ToggleGroup
                options={periodOptions}
                value={period}
                onChange={(v) => onPeriodChange(v as string)}
                size="sm"
              />
            )}

            {actions}
          </div>
        </div>

        {/* Chart content */}
        <div className={CHART_PADDING[padding]}>
          {children}
        </div>

        {/* Legend */}
        {legend && legend.length > 0 && (
          <div className="flex flex-wrap gap-4" style={{ padding: '12px 20px 16px 20px' }}>
            {legend.map((item) => (
              <span key={item.label} className="inline-flex items-center gap-1.5">
                <span
                  className="shrink-0"
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 2,
                    backgroundColor: item.color,
                  }}
                  aria-hidden="true"
                />
                <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n800)]')}>
                  {item.label}
                </span>
              </span>
            ))}
          </div>
        )}
      </div>
    )
  },
)

ChartCard.displayName = 'ChartCard'
export { ChartCard }
