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

export function MetricCard({
  label,
  value,
  unit,
  subtitle,
  subtitleColor = 'default',
  badge,
  compact,
  className,
}: MetricCardProps) {
  if (compact) {
    return (
      <div className={cn('flex items-baseline justify-between gap-2 py-[6px]', className)}>
        <span
          className="text-[13px]"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, color: 'var(--n600)' }}
        >
          {label}
        </span>
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
          {unit && (
            <span className="ml-1 text-[12px]" style={{ color: 'var(--n800)' }}>
              {unit}
            </span>
          )}
        </span>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col', className)}>
      {/* Label */}
      <span
        className="mb-2 text-[11px] uppercase"
        style={{
          fontFamily: 'var(--font-label)',
          fontWeight: 600,
          letterSpacing: '0.10em',
          color: 'var(--n600)',
        }}
      >
        {label}
      </span>

      {/* Value row */}
      <div className="flex items-baseline gap-1.5">
        <span
          className="text-[22px]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            fontVariantNumeric: 'tabular-nums',
            lineHeight: '1.1',
            color: 'var(--n1150)',
          }}
        >
          {value}
        </span>
        {unit && (
          <span
            className="ml-0.5 text-[13px]"
            style={{ fontFamily: 'var(--font-mono)', fontWeight: 400, color: 'var(--n800)' }}
          >
            {unit}
          </span>
        )}
        {badge && <Badge color={badge.color} size="sm">{badge.label}</Badge>}
      </div>

      {/* Subtitle */}
      {subtitle && (
        <span
          className="mt-1.5 text-[12px]"
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 400,
            color: SUBTITLE_COLORS[subtitleColor] ?? 'var(--n800)',
          }}
        >
          {subtitle}
        </span>
      )}
    </div>
  )
}
