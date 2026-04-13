// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT } from '@/lib/ui'

// ─── Shared ───

const SEMANTIC_FILL: Record<string, string> = {
  default: 'var(--n1150)',
  positive: 'var(--positive)',
  negative: 'var(--negative)',
  warning: 'var(--warning)',
}

export interface GaugeProps {
  value: number
  max: number
  label?: string
  unit?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'positive' | 'negative' | 'warning' | string
  thresholds?: { value: number; color: string }[]
  variant?: 'ring' | 'bar'
  className?: string
}

function resolveFillColor(
  value: number,
  color: string,
  thresholds?: { value: number; color: string }[],
): string {
  if (thresholds && thresholds.length > 0) {
    let fill = thresholds[0].color
    for (const t of thresholds) {
      if (value <= t.value) {
        fill = t.color
        break
      }
      fill = t.color
    }
    return fill
  }
  return SEMANTIC_FILL[color] ?? color
}

// ─── Ring (full circle, Linear-style) — DEFAULT ───

const RING_SIZES = { sm: 56, md: 80, lg: 112 } as const
const RING_STROKE = 3
const RING_VALUE_TEXT = { sm: 'text-[13px]', md: 'text-[16px]', lg: 'text-[20px]' } as const
const RING_LABEL_TEXT = { sm: 'text-[9px]', md: 'text-[10px]', lg: 'text-[11px]' } as const

function GaugeRing({ value, max, label, unit, size = 'md', color = 'default', thresholds, className }: Omit<GaugeProps, 'variant'> & { className?: string }) {
  const dim = RING_SIZES[size]
  const r = (dim - RING_STROKE) / 2
  const circumference = 2 * Math.PI * r
  const pct = Math.min(1, Math.max(0, value / max))
  const fillColor = resolveFillColor(value, color, thresholds)
  const dashOffset = circumference * (1 - pct)

  return (
    <div className={cn('inline-flex flex-col items-center', className)}>
      <div className="relative" style={{ width: dim, height: dim }}>
        <svg width={dim} height={dim} viewBox={`0 0 ${dim} ${dim}`} fill="none">
          <circle cx={dim / 2} cy={dim / 2} r={r} stroke="var(--n200)" strokeWidth={RING_STROKE} fill="none" />
          {pct > 0 && (
            <circle
              cx={dim / 2} cy={dim / 2} r={r}
              stroke={fillColor} strokeWidth={RING_STROKE} strokeLinecap="round" fill="none"
              strokeDasharray={circumference} strokeDashoffset={dashOffset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            />
          )}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline">
            <span className={cn(FONT.body, RING_VALUE_TEXT[size], WEIGHT.strong, 'tabular-nums text-[var(--n1150)]')}>{value}</span>
            {unit && <span className={cn(FONT.body, RING_LABEL_TEXT[size], WEIGHT.book, 'text-[var(--n800)]')}>{unit}</span>}
          </div>
          {label && <span className={cn(FONT.body, RING_LABEL_TEXT[size], WEIGHT.strong, 'text-[var(--n600)] text-center leading-tight')}>{label}</span>}
        </div>
      </div>
    </div>
  )
}

// ─── Bar (horizontal bar with prominent value) ───

const BAR_VALUE_TEXT = { sm: 'text-[14px]', md: 'text-[18px]', lg: 'text-[20px]' } as const
const BAR_LABEL_TEXT = { sm: 'text-[10px]', md: 'text-[11px]', lg: 'text-[12px]' } as const

function GaugeBar({ value, max, label, unit, size = 'md', color = 'default', thresholds, className }: Omit<GaugeProps, 'variant'> & { className?: string }) {
  const pct = Math.min(1, Math.max(0, value / max))
  const fillColor = resolveFillColor(value, color, thresholds)

  return (
    <div className={cn('flex flex-col', className)}>
      {label && <span className={cn(FONT.body, BAR_LABEL_TEXT[size], WEIGHT.strong, 'text-[var(--n600)]')}>{label}</span>}
      <div className="flex items-baseline">
        <span className={cn(FONT.body, BAR_VALUE_TEXT[size], WEIGHT.strong, 'tabular-nums text-[var(--n1150)]')}>{value}</span>
        {unit && <span className={cn(FONT.body, BAR_LABEL_TEXT[size], WEIGHT.book, 'text-[var(--n800)]')}>{unit}</span>}
      </div>
      <div className="w-full bg-[var(--n200)] mt-1" style={{ height: 4, borderRadius: 2 }}>
        <div style={{ width: `${pct * 100}%`, height: '100%', borderRadius: 2, backgroundColor: fillColor }} />
      </div>
    </div>
  )
}

// ─── Root Component ───

const Gauge = forwardRef<HTMLDivElement, GaugeProps>(
  ({ variant = 'ring', className, ...props }, ref) => (
    <div ref={ref} className={className}>
      {variant === 'ring' && <GaugeRing {...props} />}
      {variant === 'bar' && <GaugeBar {...props} />}
    </div>
  ),
)

Gauge.displayName = 'Gauge'
export { Gauge }
