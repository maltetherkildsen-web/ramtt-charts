import { forwardRef } from 'react'
import { cn, FONT, LABEL_STYLE, VALUE_STYLE, MUTED_STYLE, QUIET_STYLE, UNIT_STYLE, WEIGHT } from '@/lib/ui'
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

const MetricCard = forwardRef<HTMLDivElement, MetricCardProps>(
  ({ label, value, unit, subtitle, subtitleColor = 'default', badge, compact, className }, ref) => {
    if (compact) {
      return (
        <div ref={ref} className={cn('flex items-baseline justify-between gap-2 py-0.5', className)}>
          <dt className={cn(QUIET_STYLE, 'text-[11px]')}>{label}</dt>
          <dd className={cn(VALUE_STYLE, 'text-[11px] text-[var(--n1150)] m-0')}>
            {value}{unit && <span className={cn(UNIT_STYLE, 'ml-0.5 text-[11px]')}>{unit}</span>}
          </dd>
        </div>
      )
    }

    return (
      <div ref={ref} className={cn('flex flex-col', className)}>
        <span className={cn(LABEL_STYLE, 'mb-0.5')}>
          {label}
        </span>
        <div className="flex items-baseline gap-0.5">
          <span className={cn(VALUE_STYLE, 'text-[16px] leading-tight text-[var(--n1150)]')}>
            {value}
          </span>
          {unit && <span className={cn(UNIT_STYLE, 'text-[12px]')}>{unit}</span>}
          {badge && <Badge color={badge.color} size="sm">{badge.label}</Badge>}
        </div>
        {subtitle && (
          <span
            className={cn(MUTED_STYLE, 'text-[11px] mt-px')}
            style={subtitleColor !== 'default' ? { color: SUBTITLE_COLORS[subtitleColor] } : undefined}
          >
            {subtitle}
          </span>
        )}
      </div>
    )
  }
)

MetricCard.displayName = 'MetricCard'
export { MetricCard }
