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

export function ProgressBar({
  value,
  max,
  color = 'default',
  label,
  height = 6,
  className,
}: ProgressBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  const fillColor = FILL_COLORS[color] ?? color

  return (
    <div className={cn('flex items-center gap-[var(--space-3)]', className)}>
      {/* Track */}
      <div
        className="relative flex-1 overflow-hidden rounded-[3px]"
        style={{ height, backgroundColor: 'var(--n200)' }}
      >
        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-[3px] transition-[width] duration-300 ease-out"
          style={{ width: `${pct}%`, backgroundColor: fillColor }}
        />
      </div>

      {/* Label */}
      {label && (
        <span
          className="flex-shrink-0 text-[12px]"
          style={{
            fontFamily: 'var(--font-mono)',
            fontVariantNumeric: 'tabular-nums',
            fontWeight: 400,
            color: 'var(--n800)',
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}
