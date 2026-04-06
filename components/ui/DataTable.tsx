'use client'

import { cn } from '@/lib/utils'

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

export function DataTable({ columns, data, onRowClick, className }: DataTableProps) {
  return (
    <div className={cn('w-full overflow-x-auto', className)}>
      <table className="w-full border-collapse">
        {/* Header */}
        <thead>
          <tr style={{ borderBottom: '1px solid var(--n400)' }}>
            {columns.map((col) => (
              <th
                key={col.key}
                className="pb-3 pt-0 text-[10px] uppercase"
                style={{
                  fontFamily: 'var(--font-label)',
                  fontWeight: 600,
                  letterSpacing: '0.10em',
                  color: 'var(--n600)',
                  textAlign: col.align ?? 'left',
                  width: col.width,
                  padding: '12px 16px',
                  paddingTop: 0,
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Body */}
        <tbody>
          {data.map((row, i) => (
            <tr
              key={i}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn(
                'transition-colors duration-150',
                onRowClick && 'cursor-pointer hover:bg-[var(--n200)]',
              )}
              style={{ borderBottom: '0.5px solid var(--n200)' }}
            >
              {columns.map((col) => {
                const isNumber = col.format === 'number' || col.format === 'date'
                return (
                  <td
                    key={col.key}
                    className="text-[13px]"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontWeight: 400,
                      fontVariantNumeric: isNumber ? 'tabular-nums' : undefined,
                      color: 'var(--n1150)',
                      textAlign: col.align ?? 'left',
                      padding: '14px 16px',
                    }}
                  >
                    {String(row[col.key] ?? '')}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
