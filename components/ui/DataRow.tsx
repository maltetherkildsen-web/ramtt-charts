import { forwardRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

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

export const DataRow = forwardRef<HTMLDivElement, DataRowProps>(
  function DataRow({ label, value, unit, delta, deltaColor = 'default', badge, className }, ref) {
    return (
      <div ref={ref} className={cn('flex items-baseline justify-between', className)} style={{ padding: '4px 0', borderBottom: '0.5px solid var(--n200)' }}>
        <dt style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 13, color: 'var(--n600)' }}>{label}</dt>
        <dd className="flex items-baseline gap-1" style={{ margin: 0 }}>
          <span style={{ fontFamily: 'var(--font-label)', fontWeight: 400, fontSize: 13, fontVariantNumeric: 'tabular-nums', color: 'var(--n1150)' }}>{value}</span>
          {unit && <span style={{ fontFamily: 'var(--font-label)', fontWeight: 400, fontSize: 11, fontVariantNumeric: 'tabular-nums', color: 'var(--n800)' }}>{unit}</span>}
          {delta !== undefined && <span className="ml-1" style={{ fontFamily: 'var(--font-label)', fontWeight: 400, fontSize: 11, fontVariantNumeric: 'tabular-nums', color: DELTA_COLORS[deltaColor] ?? 'var(--n800)' }}>{delta}</span>}
          {badge && <span className="ml-1">{badge}</span>}
        </dd>
      </div>
    )
  },
)
