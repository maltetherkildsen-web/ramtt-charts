import { type ReactNode } from 'react'
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

export function DataRow({
  label,
  value,
  unit,
  delta,
  deltaColor = 'default',
  badge,
  className,
}: DataRowProps) {
  return (
    <div
      className={cn('flex items-baseline justify-between', className)}
      style={{
        padding: '10px 0',
        borderBottom: '0.5px solid var(--n200)',
      }}
    >
      {/* Label */}
      <span
        className="text-[14px]"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, color: 'var(--n600)' }}
      >
        {label}
      </span>

      {/* Value side */}
      <div className="flex items-baseline gap-1">
        <span
          className="text-[14px]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 400,
            fontVariantNumeric: 'tabular-nums',
            color: 'var(--n1150)',
          }}
        >
          {value}
        </span>
        {unit && (
          <span
            className="ml-0.5 text-[12px]"
            style={{ fontFamily: 'var(--font-mono)', color: 'var(--n800)' }}
          >
            {unit}
          </span>
        )}
        {delta !== undefined && (
          <span
            className="ml-1.5 text-[12px]"
            style={{
              fontFamily: 'var(--font-mono)',
              fontVariantNumeric: 'tabular-nums',
              color: DELTA_COLORS[deltaColor] ?? 'var(--n800)',
            }}
          >
            {delta}
          </span>
        )}
        {badge && <span className="ml-1.5">{badge}</span>}
      </div>
    </div>
  )
}
