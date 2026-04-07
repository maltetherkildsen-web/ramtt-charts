import { forwardRef, type ReactNode } from 'react'
import { cn, SIZE_TEXT, FONT, VALUE_STYLE, QUIET_STYLE, UNIT_STYLE, WEIGHT } from '@/lib/ui'

const DELTA_COLORS: Record<string, string> = {
  default: 'var(--n800)',
  positive: 'var(--positive)',
  negative: 'var(--negative)',
}

export interface DataRowProps {
  label: string
  value: string | number
  unit?: string
  delta?: string | number
  deltaColor?: 'positive' | 'negative' | 'default'
  badge?: ReactNode
  className?: string
}

const DataRow = forwardRef<HTMLDivElement, DataRowProps>(
  ({ label, value, unit, delta, deltaColor = 'default', badge, className }, ref) => (
    <div ref={ref} className={cn('flex items-baseline justify-between py-1 border-b-[0.5px] border-b-[var(--n200)]', className)}>
      <dt className={cn(QUIET_STYLE, SIZE_TEXT.md)}>{label}</dt>
      <dd className="flex items-baseline gap-1 m-0">
        <span className={cn(VALUE_STYLE, SIZE_TEXT.md, 'text-[var(--n1150)]')}>{value}</span>
        {unit && <span className={cn(UNIT_STYLE, 'text-[11px]')}>{unit}</span>}
        {delta !== undefined && (
          <span
            className={cn(FONT.body, WEIGHT.medium, 'text-[12px] tabular-nums ml-1')}
            style={{ color: DELTA_COLORS[deltaColor] ?? 'var(--n800)' }}
          >
            {delta}
          </span>
        )}
        {badge && <span className="ml-1">{badge}</span>}
      </dd>
    </div>
  )
)

DataRow.displayName = 'DataRow'
export { DataRow }
