// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useRef, useCallback, useId } from 'react'
import { cn, FONT, WEIGHT, TOOLTIP_BG, TOOLTIP_TEXT, TOOLTIP_RADIUS, TOOLTIP_PADDING } from '@/lib/ui'
import { ColorDot } from './ColorDot'

// ─── Types ───

export interface Segment {
  /** Absolute value (auto-normalized to %) */
  value: number
  /** CSS color */
  color: string
  label?: string
}

export interface SegmentedBarProps {
  segments: Segment[]
  /** Bar height in px. Default: 8 */
  height?: number
  /** Show label + % above each segment (only for segments > 8% of total) */
  showLabels?: boolean
  /** Show legend below with ColorDot + label pairs */
  legend?: boolean
  className?: string
}

// ─── Tooltip on hover ───

function SegmentTooltip({
  label,
  pct,
  visible,
  x,
  y,
}: {
  label: string
  pct: string
  visible: boolean
  x: number
  y: number
}) {
  if (!visible) return null

  return (
    <div
      className={cn(
        'fixed z-50 pointer-events-none whitespace-nowrap',
        TOOLTIP_BG,
        TOOLTIP_TEXT,
        TOOLTIP_RADIUS,
        TOOLTIP_PADDING,
      )}
      style={{ left: x, top: y - 32, transform: 'translateX(-50%)' }}
    >
      {label} {pct}
    </div>
  )
}

// ─── Component ───

const SegmentedBar = forwardRef<HTMLDivElement, SegmentedBarProps>(
  ({ segments, height = 8, showLabels = false, legend = false, className }, ref) => {
    const [hover, setHover] = useState<{ idx: number; x: number; y: number } | null>(null)
    const barRef = useRef<HTMLDivElement>(null)

    // Auto-normalize
    const total = segments.reduce((sum, s) => sum + s.value, 0)
    const normalized = segments.map((s) => ({
      ...s,
      pct: total > 0 ? (s.value / total) * 100 : 0,
    }))

    const handleMouseMove = useCallback(
      (idx: number) => (e: React.MouseEvent) => {
        setHover({ idx, x: e.clientX, y: e.clientY })
      },
      [],
    )
    const handleMouseLeave = useCallback(() => setHover(null), [])

    const radius = height / 2

    return (
      <div ref={ref} className={cn('w-full', className)}>
        {/* Labels above bar */}
        {showLabels && (
          <div className="relative mb-1" style={{ height: 16 }}>
            {(() => {
              let cumulative = 0
              return normalized.map((seg, i) => {
                const left = cumulative + seg.pct / 2
                cumulative += seg.pct
                if (seg.pct < 8 || !seg.label) return null
                return (
                  <span
                    key={i}
                    className={cn(
                      FONT.body,
                      WEIGHT.book,
                      'text-[10px] text-[var(--n800)] absolute whitespace-nowrap',
                    )}
                    style={{
                      left: `${left}%`,
                      transform: 'translateX(-50%)',
                    }}
                  >
                    {seg.label} {seg.pct.toFixed(0)}%
                  </span>
                )
              })
            })()}
          </div>
        )}

        {/* Bar */}
        <div
          ref={barRef}
          className="flex w-full overflow-hidden"
          style={{ height, borderRadius: radius }}
          role="img"
          aria-label={
            normalized
              .filter((s) => s.label)
              .map((s) => `${s.label}: ${s.pct.toFixed(0)}%`)
              .join(', ') || 'Segmented bar'
          }
        >
          {normalized.map((seg, i) => (
            <div
              key={i}
              className="shrink-0"
              style={{
                flexBasis: `${seg.pct}%`,
                minWidth: seg.pct > 0 ? 2 : 0,
                backgroundColor: seg.color,
                borderRadius:
                  i === 0 && normalized.length === 1
                    ? radius
                    : i === 0
                      ? `${radius}px 0 0 ${radius}px`
                      : i === normalized.length - 1
                        ? `0 ${radius}px ${radius}px 0`
                        : undefined,
              }}
              onMouseMove={handleMouseMove(i)}
              onMouseLeave={handleMouseLeave}
            />
          ))}
        </div>

        {/* Legend */}
        {legend && (
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2">
            {normalized.map((seg, i) =>
              seg.label ? (
                <ColorDot
                  key={i}
                  color={seg.color}
                  size="sm"
                  label={`${seg.label} ${seg.pct.toFixed(0)}%`}
                />
              ) : null,
            )}
          </div>
        )}

        {/* Hover tooltip */}
        {hover !== null && normalized[hover.idx]?.label && (
          <SegmentTooltip
            label={normalized[hover.idx].label!}
            pct={`${normalized[hover.idx].pct.toFixed(0)}%`}
            visible
            x={hover.x}
            y={hover.y}
          />
        )}
      </div>
    )
  },
)

SegmentedBar.displayName = 'SegmentedBar'
export { SegmentedBar }
