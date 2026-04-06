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
        <thead>
          <tr style={{ borderBottom: '1px solid var(--n400)' }}>
            {columns.map((col) => (
              <th key={col.key} style={{
                fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: 11,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: 'var(--n600)', textAlign: col.align ?? 'left',
                width: col.width, padding: '6px 12px',
              }}>
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={cn('transition-colors duration-150', onRowClick && 'hover:bg-[var(--n200)]')}
              style={{ borderBottom: '0.5px solid var(--n200)' }}>
              {columns.map((col) => (
                <td key={col.key} style={{
                  fontFamily: col.format === 'number' ? 'var(--font-label)' : 'var(--font-sans)',
                  fontWeight: 400, fontSize: 13,
                  fontVariantNumeric: col.format === 'number' ? 'tabular-nums' : undefined,
                  color: 'var(--n1150)', textAlign: col.align ?? 'left',
                  padding: '6px 12px',
                }}>
                  {String(row[col.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
