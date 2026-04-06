import { cn } from '@/lib/utils'
import { Badge } from './Badge'

export interface MetricCardProps {
  label: string
  value: string | number
  unit?: string
  subtitle?: string
  subtitleColor?: 'positive' | 'negative' | 'warning' | 'default'
  badge?: { label: string; color: string }
  compact?: boolean
  className?: string
}

const SUBTITLE_COLORS: Record<string, string> = {
  default: 'var(--n800)',
  positive: 'var(--positive-on-soft)',
  negative: 'var(--negative-on-soft)',
  warning: 'var(--warning-on-soft)',
}

export function MetricCard({ label, value, unit, subtitle, subtitleColor = 'default', badge, compact, className }: MetricCardProps) {
  if (compact) {
    return (
      <div className={cn('flex items-baseline justify-between gap-2 py-0.5', className)}>
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 11, color: 'var(--n600)' }}>{label}</span>
        <span style={{ fontFamily: 'var(--font-label)', fontWeight: 400, fontSize: 11, fontVariantNumeric: 'tabular-nums', color: 'var(--n1150)' }}>
          {value}{unit && <span className="ml-0.5" style={{ color: 'var(--n800)' }}>{unit}</span>}
        </span>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <span style={{ fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--n600)', marginBottom: 2 }}>
        {label}
      </span>
      <div className="flex items-baseline gap-0.5">
        <span style={{ fontFamily: 'var(--font-label)', fontWeight: 500, fontSize: 16, fontVariantNumeric: 'tabular-nums', lineHeight: '1.1', color: 'var(--n1150)' }}>
          {value}
        </span>
        {unit && <span style={{ fontFamily: 'var(--font-label)', fontWeight: 400, fontSize: 12, fontVariantNumeric: 'tabular-nums', color: 'var(--n800)' }}>{unit}</span>}
        {badge && <Badge color={badge.color} size="sm">{badge.label}</Badge>}
      </div>
      {subtitle && (
        <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 11, color: SUBTITLE_COLORS[subtitleColor] ?? 'var(--n800)', marginTop: 1 }}>
          {subtitle}
        </span>
      )}
    </div>
  )
}
