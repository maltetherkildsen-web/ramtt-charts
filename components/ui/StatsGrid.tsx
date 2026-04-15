// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER, STATS_GRID_COLUMNS } from '@/lib/ui'

// ─── Types ───

export interface StatsGridItem {
  label: string
  value: string | number
  unit?: string
}

export interface StatsGridProps {
  items: StatsGridItem[]
  columns?: 2 | 3 | 4
  className?: string
}

// ─── Helpers ───

function resolveColumns(count: number): number {
  if (count >= 8) return STATS_GRID_COLUMNS.lg
  if (count >= 6) return STATS_GRID_COLUMNS.md
  return STATS_GRID_COLUMNS.sm
}

const GRID_COLS: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

// ─── Component ───

const StatsGrid = forwardRef<HTMLDivElement, StatsGridProps>(
  ({ items, columns, className }, ref) => {
    const cols = columns ?? resolveColumns(items.length)
    const totalRows = Math.ceil(items.length / cols)

    return (
      <div
        ref={ref}
        className={cn(
          FONT.body,
          BORDER.default,
          RADIUS.lg,
          'bg-[var(--n50)] overflow-hidden',
          'grid',
          GRID_COLS[cols],
          className,
        )}
      >
        {items.map((item, i) => {
          const col = i % cols
          const row = Math.floor(i / cols)
          const isLastCol = col === cols - 1
          const isLastRow = row === totalRows - 1

          return (
            <div
              key={i}
              className={cn(
                'py-3 px-4',
                !isLastCol && 'border-r-[0.5px] border-r-[var(--n200)]',
                !isLastRow && 'border-b-[0.5px] border-b-[var(--n200)]',
              )}
            >
              <div
                className={cn(
                  'text-[11px]',
                  WEIGHT.book,
                  'text-[var(--n600)]',
                )}
              >
                {item.label}
              </div>
              <div className="mt-0.5">
                <span
                  className={cn(
                    'text-[16px]',
                    WEIGHT.strong,
                    'text-[var(--n1150)] tabular-nums',
                  )}
                >
                  {item.value}
                </span>
                {item.unit && (
                  <span
                    className={cn(
                      'text-[12px]',
                      WEIGHT.book,
                      'text-[var(--n800)] ml-[2px]',
                    )}
                  >
                    {item.unit}
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  },
)

StatsGrid.displayName = 'StatsGrid'
export { StatsGrid }
