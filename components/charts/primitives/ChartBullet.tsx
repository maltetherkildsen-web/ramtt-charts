// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartBullet — compact horizontal bar showing actual value against
 * a target marker, with background ranges indicating qualitative zones.
 *
 * Self-contained: renders its own `<svg>`, does NOT use ChartRoot.
 *
 * Usage:
 *   <ChartBullet
 *     value={238}
 *     target={250}
 *     ranges={[
 *       { to: 200, className: 'fill-red-100' },
 *       { to: 240, className: 'fill-amber-100' },
 *       { to: 280, className: 'fill-emerald-100' },
 *     ]}
 *     label="Avg Power"
 *     unit="W"
 *   />
 */

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'

// ─── Types ───

export interface BulletRange {
  /** Upper bound of this range. */
  to: number
  /** Tailwind fill class. */
  className?: string
  /** CSS color (alternative to className). */
  color?: string
}

export interface ChartBulletProps {
  /** Current value — the main bar. */
  value: number
  /** Target marker position. */
  target?: number
  /** Qualitative ranges — rendered as background bands. */
  ranges: BulletRange[]
  /** Total width in px. Default 300. */
  width?: number
  /** Total height in px. Default 32. */
  height?: number
  /** Left label. */
  label?: string
  /** Unit suffix for value display. */
  unit?: string
  /** Tailwind class for the value bar. */
  valueClassName?: string
  /** Tailwind class for the target marker. */
  targetClassName?: string
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
  className?: string
}

// ─── Keyframe for scaleX grow ───
// Uses ramtt-bar-grow with scaleX instead of scaleY

// ─── Component ───

export function ChartBullet({
  value,
  target,
  ranges,
  width = 300,
  height = 32,
  label,
  unit,
  valueClassName,
  targetClassName,
  animate = true,
  className,
}: ChartBulletProps) {
  const labelWidth = label ? 80 : 0
  const valueTextWidth = 60
  const chartW = width - labelWidth - valueTextWidth
  const barH = height * 0.5
  const barY = (height - barH) / 2

  // Determine max of ranges for scaling
  const maxRange = useMemo(
    () => ranges.reduce((m, r) => Math.max(m, r.to), 0),
    [ranges],
  )

  const scale = (v: number) => Math.max(0, Math.min(chartW, (v / maxRange) * chartW))

  // Animation
  const anim = resolveAnimate(animate, { duration: 600, delay: 0, easing: EASE_OUT_EXPO })

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn(className)}
    >
      {/* Label */}
      {label && (
        <text
          x={0}
          y={height / 2}
          dominantBaseline="central"
          fill="var(--n800)"
          fontSize={12}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 450 }}
        >
          {label}
        </text>
      )}

      {/* Range backgrounds — stacked from 0 to each range.to */}
      <g transform={`translate(${labelWidth}, 0)`}>
        {ranges.map((range, i) => {
          const w = scale(range.to)
          return (
            <rect
              key={i}
              x={0}
              y={0}
              width={w}
              height={height}
              rx={3}
              ry={3}
              fill={range.color}
              className={range.color ? undefined : range.className}
            />
          )
        })}

        {/* Value bar */}
        <rect
          x={0}
          y={barY}
          width={scale(value)}
          height={barH}
          rx={2}
          ry={2}
          className={cn('fill-[var(--n1150)]', valueClassName)}
          style={anim.enabled
            ? {
                transformOrigin: `0px ${barY + barH / 2}px`,
                animation: `ramtt-bar-grow ${anim.duration}ms ${anim.easing} ${anim.delay}ms both`,
                transform: 'scaleX(1)',
              }
            : undefined
          }
        />

        {/* Target marker */}
        {target != null && (
          <line
            x1={scale(target)}
            y1={2}
            x2={scale(target)}
            y2={height - 2}
            stroke="var(--n1150)"
            strokeWidth={2}
            className={targetClassName}
            style={anim.enabled
              ? { animation: `ramtt-grid-fade 300ms ${anim.easing} ${anim.delay + anim.duration * 0.7}ms both` }
              : undefined
            }
          />
        )}
      </g>

      {/* Value text */}
      <text
        x={width}
        y={height / 2}
        textAnchor="end"
        dominantBaseline="central"
        fill="var(--n1150)"
        fontSize={13}
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums' }}
      >
        {value}{unit ? ` ${unit}` : ''}
      </text>
    </svg>
  )
}
