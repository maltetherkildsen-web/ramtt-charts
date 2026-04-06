import { cn } from '@/lib/utils'

const FILL_COLORS: Record<string, string> = {
  default: 'var(--n1150)',
  positive: 'var(--positive)',
  negative: 'var(--negative)',
  warning: 'var(--warning)',
}

export interface ProgressBarProps {
  value: number
  max: number
  color?: 'default' | 'positive' | 'negative' | 'warning' | string
  label?: string
  height?: number
  className?: string
}

export function ProgressBar({ value, max, color = 'default', label, height = 4, className }: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const fillColor = FILL_COLORS[color] ?? color

  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="relative flex-1 overflow-hidden" style={{ height, borderRadius: 2, backgroundColor: 'var(--n200)' }}>
        <div className="absolute inset-y-0 left-0 transition-[width] duration-300 ease-out" style={{ width: `${pct}%`, borderRadius: 2, backgroundColor: fillColor }} />
      </div>
      {label && (
        <span className="shrink-0" style={{ fontFamily: 'var(--font-label)', fontVariantNumeric: 'tabular-nums', fontWeight: 400, fontSize: 11, color: 'var(--n800)' }}>
          {label}
        </span>
      )}
    </div>
  )
}
