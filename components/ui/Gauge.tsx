// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT, GAUGE_SIZES } from '@/lib/ui'

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
  variant?: 'arc' | 'ring' | 'bar'
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

// ─── Variant A: Arc (refined semicircle, 210° sweep) ───

const ARC_STROKE = { sm: 4, md: 4, lg: 4 } as const
const ARC_VALUE_TEXT = { sm: 'text-[14px]', md: 'text-[18px]', lg: 'text-[22px]' } as const
const ARC_LABEL_TEXT = { sm: 'text-[10px]', md: 'text-[11px]', lg: 'text-[12px]' } as const

function getArcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const x1 = cx + r * Math.cos(startAngle)
  const y1 = cy + r * Math.sin(startAngle)
  const x2 = cx + r * Math.cos(endAngle)
  const y2 = cy + r * Math.sin(endAngle)
  const largeArc = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`
}

function GaugeArc({ value, max, label, unit, size = 'md', color = 'default', thresholds, className }: Omit<GaugeProps, 'variant'> & { className?: string }) {
  const width = GAUGE_SIZES[size]
  const strokeWidth = ARC_STROKE[size]
  const r = (width - strokeWidth) / 2
  const cx = width / 2
  // 210° arc: from 195° (left-below) to -15° (right-below)
  const startAngle = (195 * Math.PI) / 180
  const endAngle = (-15 * Math.PI) / 180
  const totalSweep = startAngle - endAngle // ~210° in radians
  const cy = cx // center vertically in the SVG
  const height = cx + r * Math.sin((15 * Math.PI) / 180) + strokeWidth

  const pct = Math.min(1, Math.max(0, value / max))
  const fillColor = resolveFillColor(value, color, thresholds)

  const trackPath = getArcPath(cx, cy, r, startAngle, endAngle)
  const fillEndAngle = startAngle - pct * totalSweep
  const fillPath = pct > 0 ? getArcPath(cx, cy, r, startAngle, fillEndAngle) : ''

  return (
    <div className={cn('inline-flex flex-col items-center', className)}>
      <div className="relative" style={{ width, height }}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          style={{ overflow: 'visible' }}
        >
          <path d={trackPath} stroke="var(--n200)" strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
          {pct > 0 && (
            <path d={fillPath} stroke={fillColor} strokeWidth={strokeWidth} strokeLinecap="round" fill="none" />
          )}
        </svg>
        {/* Value centered inside the arc */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ paddingTop: strokeWidth }}
        >
          <div className="flex items-baseline">
            <span className={cn(FONT.body, ARC_VALUE_TEXT[size], WEIGHT.strong, 'tabular-nums text-[var(--n1150)]')}>
              {value}
            </span>
            {unit && (
              <span className={cn(FONT.body, ARC_LABEL_TEXT[size], WEIGHT.book, 'text-[var(--n800)]')}>
                {unit}
              </span>
            )}
          </div>
          {label && (
            <span className={cn(FONT.body, ARC_LABEL_TEXT[size], WEIGHT.strong, 'text-[var(--n600)]')}>
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Variant B: Ring (full circle, Linear-style) ───

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
          {/* Track */}
          <circle
            cx={dim / 2}
            cy={dim / 2}
            r={r}
            stroke="var(--n200)"
            strokeWidth={RING_STROKE}
            fill="none"
          />
          {/* Fill — starts from 12 o'clock (rotate -90°) */}
          {pct > 0 && (
            <circle
              cx={dim / 2}
              cy={dim / 2}
              r={r}
              stroke={fillColor}
              strokeWidth={RING_STROKE}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
            />
          )}
        </svg>
        {/* Value + label centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="flex items-baseline">
            <span className={cn(FONT.body, RING_VALUE_TEXT[size], WEIGHT.strong, 'tabular-nums text-[var(--n1150)]')}>
              {value}
            </span>
            {unit && (
              <span className={cn(FONT.body, RING_LABEL_TEXT[size], WEIGHT.book, 'text-[var(--n800)]')}>
                {unit}
              </span>
            )}
          </div>
          {label && (
            <span className={cn(FONT.body, RING_LABEL_TEXT[size], WEIGHT.strong, 'text-[var(--n600)] text-center leading-tight')}>
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Variant C: Bar (horizontal bar with prominent value) ───

const BAR_VALUE_TEXT = { sm: 'text-[14px]', md: 'text-[18px]', lg: 'text-[20px]' } as const
const BAR_LABEL_TEXT = { sm: 'text-[10px]', md: 'text-[11px]', lg: 'text-[12px]' } as const

function GaugeBar({ value, max, label, unit, size = 'md', color = 'default', thresholds, className }: Omit<GaugeProps, 'variant'> & { className?: string }) {
  const pct = Math.min(1, Math.max(0, value / max))
  const fillColor = resolveFillColor(value, color, thresholds)

  return (
    <div className={cn('flex flex-col', className)}>
      {label && (
        <span className={cn(FONT.body, BAR_LABEL_TEXT[size], WEIGHT.strong, 'text-[var(--n600)]')}>
          {label}
        </span>
      )}
      <div className="flex items-baseline">
        <span className={cn(FONT.body, BAR_VALUE_TEXT[size], WEIGHT.strong, 'tabular-nums text-[var(--n1150)]')}>
          {value}
        </span>
        {unit && (
          <span className={cn(FONT.body, BAR_LABEL_TEXT[size], WEIGHT.book, 'text-[var(--n800)]')}>
            {unit}
          </span>
        )}
      </div>
      {/* Bar */}
      <div
        className="w-full bg-[var(--n200)] mt-1"
        style={{ height: 4, borderRadius: 2 }}
      >
        <div
          style={{
            width: `${pct * 100}%`,
            height: '100%',
            borderRadius: 2,
            backgroundColor: fillColor,
          }}
        />
      </div>
    </div>
  )
}

// ─── Root Component ───

const Gauge = forwardRef<HTMLDivElement, GaugeProps>(
  ({ variant = 'arc', className, ...props }, ref) => {
    return (
      <div ref={ref} className={className}>
        {variant === 'arc' && <GaugeArc {...props} />}
        {variant === 'ring' && <GaugeRing {...props} />}
        {variant === 'bar' && <GaugeBar {...props} />}
      </div>
    )
  },
)

Gauge.displayName = 'Gauge'
export { Gauge }
