// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT, BORDER, RADIUS } from '@/lib/ui'

// ─── Types ───

export interface ComparisonColumn {
  label: string
  highlight?: boolean
}

export interface ComparisonRow {
  label: string
  values: string[]
  delta?: string
  deltaColor?: 'positive' | 'negative' | 'default'
}

export interface ComparisonCardProps {
  title: string
  subtitle?: string
  columns: ComparisonColumn[]
  rows: ComparisonRow[]
  className?: string
}

// ─── Delta color map ───

const DELTA_COLOR: Record<string, string> = {
  positive: 'text-[var(--positive)]',
  negative: 'text-[var(--negative)]',
  default: 'text-[var(--n800)]',
}

// ─── Component ───

const ComparisonCard = forwardRef<HTMLDivElement, ComparisonCardProps>(
  ({ title, subtitle, columns, rows, className }, ref) => {
    const hasDelta = rows.some((r) => r.delta !== undefined)
    // columns: 1 label + N value columns + optional delta
    const totalCols = 1 + columns.length + (hasDelta ? 1 : 0)

    return (
      <div
        ref={ref}
        className={cn(
          'bg-[var(--n50)]',
          BORDER.default,
          RADIUS.lg,
          'overflow-hidden',
          className,
        )}
      >
        {/* Header */}
        <div className="px-4 pt-3 pb-2">
          <h3
            className={cn(
              FONT.body,
              'text-[13px]',
              WEIGHT.strong,
              'text-[var(--n1150)]',
            )}
          >
            {title}
          </h3>
          {subtitle && (
            <p
              className={cn(
                FONT.body,
                'text-[11px]',
                WEIGHT.normal,
                'text-[var(--n600)] mt-px',
              )}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Table */}
        <div
          className="w-full"
          style={{
            display: 'grid',
            gridTemplateColumns: `minmax(80px, auto) ${columns.map(() => '1fr').join(' ')}${hasDelta ? ' auto' : ''}`,
          }}
          role="table"
        >
          {/* Column headers */}
          <div
            role="row"
            className="contents"
          >
            {/* Empty cell for row-label column */}
            <div
              role="columnheader"
              className="border-b-[0.5px] border-[var(--n400)] px-4 py-2"
            />
            {columns.map((col, i) => (
              <div
                key={i}
                role="columnheader"
                className={cn(
                  FONT.body,
                  'text-[11px]',
                  WEIGHT.strong,
                  'text-right px-4 py-2 border-b-[0.5px] border-[var(--n400)]',
                  col.highlight
                    ? 'text-[var(--n1150)]'
                    : 'text-[var(--n600)]',
                )}
              >
                {col.label}
              </div>
            ))}
            {hasDelta && (
              <div
                role="columnheader"
                className="border-b-[0.5px] border-[var(--n400)] px-4 py-2"
              />
            )}
          </div>

          {/* Data rows */}
          {rows.map((row, ri) => {
            const isLast = ri === rows.length - 1
            const borderClass = isLast ? '' : 'border-b-[0.5px] border-[var(--n200)]'

            return (
              <div key={ri} role="row" className="contents">
                {/* Row label */}
                <div
                  role="rowheader"
                  className={cn(
                    FONT.body,
                    'text-[13px]',
                    WEIGHT.normal,
                    'text-[var(--n800)] px-4 py-2',
                    borderClass,
                  )}
                >
                  {row.label}
                </div>

                {/* Values */}
                {row.values.map((val, vi) => (
                  <div
                    key={vi}
                    role="cell"
                    className={cn(
                      FONT.body,
                      'text-[13px]',
                      WEIGHT.strong,
                      'tabular-nums text-right px-4 py-2',
                      borderClass,
                      columns[vi]?.highlight
                        ? 'text-[var(--n1150)]'
                        : 'text-[var(--n1050)]',
                    )}
                  >
                    {val}
                  </div>
                ))}

                {/* Delta */}
                {hasDelta && (
                  <div
                    role="cell"
                    className={cn(
                      FONT.body,
                      'text-[12px]',
                      WEIGHT.book,
                      'tabular-nums text-right px-4 py-2',
                      borderClass,
                      DELTA_COLOR[row.deltaColor ?? 'default'],
                    )}
                  >
                    {row.delta ?? ''}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  },
)

ComparisonCard.displayName = 'ComparisonCard'
export { ComparisonCard }
