// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT, GAUGE_SIZES } from '@/lib/ui'

const SEMANTIC_FILL: Record<string, string> = {
  default: 'var(--n1150)',
  positive: 'var(--positive)',
  negative: 'var(--negative)',
  warning: 'var(--warning)',
}

const STROKE_WIDTHS = { sm: 6, md: 8, lg: 10 } as const
const VALUE_TEXT = { sm: 'text-[16px]', md: 'text-[20px]', lg: 'text-[24px]' } as const
const LABEL_TEXT = { sm: 'text-[10px]', md: 'text-[11px]', lg: 'text-[12px]' } as const

export interface GaugeProps {
  value: number
  max: number
  label?: string
  unit?: string
  size?: 'sm' | 'md' | 'lg'
  color?: 'default' | 'positive' | 'negative' | 'warning' | string
  thresholds?: { value: number; color: string }[]
  className?: string
}

function getArcPath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const x1 = cx + r * Math.cos(startAngle)
  const y1 = cy + r * Math.sin(startAngle)
  const x2 = cx + r * Math.cos(endAngle)
  const y2 = cy + r * Math.sin(endAngle)
  const largeArc = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`
}

const Gauge = forwardRef<HTMLDivElement, GaugeProps>(
  ({ value, max, label, unit, size = 'md', color = 'default', thresholds, className }, ref) => {
    const width = GAUGE_SIZES[size]
    const strokeWidth = STROKE_WIDTHS[size]
    const height = width / 2 + strokeWidth
    const cx = width / 2
    const cy = width / 2
    const r = (width - strokeWidth) / 2

    const pct = Math.min(1, Math.max(0, value / max))

    // Determine fill color
    let fillColor: string
    if (thresholds && thresholds.length > 0) {
      fillColor = thresholds[0].color
      for (const t of thresholds) {
        if (value <= t.value) {
          fillColor = t.color
          break
        }
        fillColor = t.color
      }
    } else {
      fillColor = SEMANTIC_FILL[color] ?? color
    }

    // Semi-circle: from PI (left) to 0 (right)
    const trackPath = getArcPath(cx, cy, r, Math.PI, 0)
    const fillEndAngle = Math.PI - pct * Math.PI
    const fillPath = pct > 0 ? getArcPath(cx, cy, r, Math.PI, fillEndAngle) : ''

    return (
      <div ref={ref} className={cn('inline-flex flex-col items-center', className)}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
          fill="none"
          style={{ overflow: 'visible' }}
        >
          {/* Track */}
          <path
            d={trackPath}
            stroke="var(--n200)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
          />
          {/* Fill */}
          {pct > 0 && (
            <path
              d={fillPath}
              stroke={fillColor}
              strokeWidth={strokeWidth}
              strokeLinecap="round"
              fill="none"
            />
          )}
        </svg>

        {/* Value + unit, positioned at center of the arc bottom */}
        <div className="flex items-baseline justify-center -mt-1">
          <span
            className={cn(
              FONT.body,
              VALUE_TEXT[size],
              WEIGHT.strong,
              'tabular-nums text-[var(--n1150)]',
            )}
          >
            {value}
          </span>
          {unit && (
            <span className={cn(FONT.body, LABEL_TEXT[size], WEIGHT.book, 'text-[var(--n800)] ml-0.5')}>
              {unit}
            </span>
          )}
        </div>

        {label && (
          <span className={cn(FONT.body, LABEL_TEXT[size], WEIGHT.strong, 'text-[var(--n600)]')}>
            {label}
          </span>
        )}
      </div>
    )
  },
)

Gauge.displayName = 'Gauge'
export { Gauge }
