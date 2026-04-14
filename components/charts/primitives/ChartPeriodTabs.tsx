// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartPeriodTabs — range selector tabs for chart zoom presets.
 *
 * Companion to ChartNavigator. Provides period buttons like
 * 1D, 5D, 1M, 3M, 6M, YTD, 1Y, ALL.
 *
 * Usage:
 *   <ChartPeriodTabs
 *     periods={['1M', '3M', '6M', '1Y', 'ALL']}
 *     selected="1Y"
 *     onChange={setPeriod}
 *   />
 */

import { cn } from '@/lib/utils'

export interface ChartPeriodTabsProps {
  periods: string[]
  selected: string
  onChange: (period: string) => void
  className?: string
}

export function ChartPeriodTabs({
  periods,
  selected,
  onChange,
  className,
}: ChartPeriodTabsProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-[5px] border-[0.5px] border-[var(--n400)]',
        className,
      )}
      role="tablist"
    >
      {periods.map((period) => {
        const isSelected = period === selected
        return (
          <button
            key={period}
            role="tab"
            aria-selected={isSelected}
            onClick={() => onChange(period)}
            className={cn(
              'h-[28px] px-2.5 text-[12px] font-[450] transition-colors duration-100',
              'first:rounded-l-[4px] last:rounded-r-[4px]',
              isSelected
                ? 'bg-[var(--n1150)] text-[var(--n50)]'
                : 'text-[var(--n800)] hover:bg-[var(--n200)]',
            )}
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {period}
          </button>
        )
      })}
    </div>
  )
}
