// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef } from 'react'
import { cn, FONT, LABEL_STYLE, VALUE_STYLE, SIZE_TEXT, TRANSITION, HOVER_SAND, FOCUS_RING, WEIGHT } from '@/lib/ui'

export interface DataTableColumn {
  key: string
  label: string
  width?: string
  align?: 'left' | 'right'
  format?: 'number' | 'date' | 'string'
}

export interface DataTableProps {
  columns: DataTableColumn[]
  data: Record<string, unknown>[]
  onRowClick?: (row: Record<string, unknown>) => void
  className?: string
}

const DataTable = forwardRef<HTMLDivElement, DataTableProps>(
  ({ columns, data, onRowClick, className }, ref) => (
    <div ref={ref} className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full border-collapse" role="table">
        <thead>
          <tr className="border-b-[0.5px] border-b-[var(--n400)]">
            {columns.map((col) => (
              <th
                key={col.key}
                scope="col"
                className={cn(
                  LABEL_STYLE,
                  'py-1.5 px-3',
                  col.align === 'right' ? 'text-right' : 'text-left',
                )}
                style={{ width: col.width }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              tabIndex={onRowClick ? 0 : undefined}
              onKeyDown={onRowClick ? (e) => { if (e.key === 'Enter') onRowClick(row) } : undefined}
              className={cn(
                'border-b-[0.5px] border-b-[var(--n200)]',
                TRANSITION.background,
                onRowClick && cn(HOVER_SAND, FOCUS_RING),
              )}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={cn(
                    col.format === 'number' ? VALUE_STYLE : cn(FONT.body, WEIGHT.normal),
                    SIZE_TEXT.md,
                    'text-[var(--n1150)] py-1.5 px-3',
                    col.align === 'right' ? 'text-right' : 'text-left',
                  )}
                >
                  {String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
)

DataTable.displayName = 'DataTable'
export { DataTable }
