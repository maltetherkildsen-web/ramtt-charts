// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartWaterfall — cumulative running-total bar chart.
 *
 * Each bar shows the delta from the previous value. Positive deltas
 * go up, negative go down. "Total" bars span from 0 to the running total.
 * Thin connector lines link the bars.
 *
 * Self-contained: renders its own `<svg>`, does NOT use ChartRoot.
 *
 * Usage:
 *   <ChartWaterfall
 *     data={[
 *       { label: 'Start', value: 2400, type: 'total' },
 *       { label: '+Breakfast', value: 800, type: 'increase' },
 *       { label: '-Z2 Ride', value: -1200, type: 'decrease' },
 *       { label: 'End', value: 0, type: 'total' },
 *     ]}
 *   />
 */

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { waterfallLayout, type WaterfallItem } from '@/lib/charts/utils/waterfall'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'

// ─── Props ───

export interface ChartWaterfallProps {
  data: WaterfallItem[]
  width?: number
  height?: number
  /** Tailwind class for positive bars. */
  positiveClassName?: string
  /** Tailwind class for negative bars. */
  negativeClassName?: string
  /** Tailwind class for total bars. */
  totalClassName?: string
  /** Bar corner radius. Default 3. */
  radius?: number
  /** Gap between bars as fraction of bar width. Default 0.3. */
  gap?: number
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
  className?: string
}

// ─── Component ───

export function ChartWaterfall({
  data,
  width = 600,
  height = 300,
  positiveClassName,
  negativeClassName,
  totalClassName,
  radius = 2,
  gap = 0.35,
  animate = true,
  className,
}: ChartWaterfallProps) {
  const padTop = 24
  const padBottom = 40
  const padLeft = 48
  const padRight = 12
  const chartW = width - padLeft - padRight
  const chartH = height - padTop - padBottom

  const bars = useMemo(() => waterfallLayout(data), [data])

  // Y domain
  const { minVal, maxVal } = useMemo(() => {
    let mn = 0
    let mx = 0
    for (const b of bars) {
      mn = Math.min(mn, b.y0, b.y1)
      mx = Math.max(mx, b.y0, b.y1)
    }
    return { minVal: mn, maxVal: mx }
  }, [bars])

  const range = maxVal - minVal || 1
  const scaleY = (v: number) => padTop + chartH - ((v - minVal) / range) * chartH

  const n = bars.length
  const barSlotW = chartW / Math.max(1, n)
  const barW = barSlotW * (1 - gap)
  const barOffset = (barSlotW - barW) / 2

  // Color resolver — use CSS custom properties for fills
  const barFill = (type: string): string => {
    if (type === 'total') return 'var(--n1050)'
    if (type === 'increase') return 'var(--chart-positive)'
    return 'var(--chart-negative)'
  }

  // Animation
  const anim = resolveAnimate(animate, { duration: 600, delay: 0, easing: EASE_OUT_EXPO })
  const stagger = 50

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn(className)}
    >
      <g transform={`translate(${padLeft}, 0)`}>
        {/* Zero reference line */}
        {minVal <= 0 && maxVal >= 0 && (
          <line
            x1={0}
            y1={scaleY(0)}
            x2={chartW}
            y2={scaleY(0)}
            stroke="var(--n400)"
            strokeWidth={0.5}
            shapeRendering="crispEdges"
          />
        )}

        {/* Connector lines between bars */}
        {bars.map((bar, i) => {
          if (i === n - 1) return null
          const fromX = i * barSlotW + barOffset + barW
          const toX = (i + 1) * barSlotW + barOffset
          const y = scaleY(bar.type === 'increase' || bar.type === 'total'
            ? bar.y1
            : bar.y0)
          return (
            <line
              key={`c-${i}`}
              x1={fromX}
              y1={y}
              x2={toX}
              y2={y}
              stroke="var(--n400)"
              strokeWidth={0.5}
              strokeDasharray="2 2"
              shapeRendering="crispEdges"
            />
          )
        })}

        {/* Bars */}
        {bars.map((bar, i) => {
          const x = i * barSlotW + barOffset
          const y0px = scaleY(bar.y0)
          const y1px = scaleY(bar.y1)
          const top = Math.min(y0px, y1px)
          const barH = Math.max(1, Math.abs(y1px - y0px))

          const fill = barFill(bar.type)
          const barClass = bar.type === 'total'
            ? totalClassName
            : bar.type === 'increase'
              ? positiveClassName
              : negativeClassName

          const baselineY = top + barH

          // Value label above/below bar
          const delta = bar.type === 'total' ? bar.y1 : bar.y1 - bar.y0
          const labelY = bar.type === 'decrease' ? top + barH + 13 : top - 5
          const prefix = bar.type === 'increase' ? '+' : bar.type === 'decrease' ? '' : ''

          return (
            <g key={i}>
              <rect
                x={x}
                y={top}
                width={barW}
                height={barH}
                rx={radius}
                ry={radius}
                fill={barClass ? undefined : fill}
                opacity={bar.type === 'total' ? 1 : 0.75}
                className={barClass}
                shapeRendering={radius > 0 ? 'geometricPrecision' : 'crispEdges'}
                style={anim.enabled
                  ? {
                      transformOrigin: `${x + barW / 2}px ${baselineY}px`,
                      animation: `ramtt-bar-grow ${anim.duration}ms ${anim.easing} ${anim.delay + i * stagger}ms both`,
                    }
                  : undefined
                }
              />
              {/* Value label */}
              <text
                x={x + barW / 2}
                y={labelY}
                textAnchor="middle"
                fill="var(--n800)"
                fontSize={11}
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, fontVariantNumeric: 'tabular-nums' }}
              >
                {prefix}{Math.abs(delta).toLocaleString()}
              </text>
            </g>
          )
        })}
      </g>

      {/* X labels */}
      <g transform={`translate(${padLeft}, 0)`}>
        {bars.map((bar, i) => {
          const x = i * barSlotW + barSlotW / 2
          return (
            <text
              key={`l-${i}`}
              x={x}
              y={height - padBottom + 16}
              textAnchor="middle"
              fill="var(--n600)"
              fontSize={11}
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 450 }}
            >
              {bar.label}
            </text>
          )
        })}
      </g>

      {/* Y axis labels */}
      {(() => {
        const ticks = [minVal, (minVal + maxVal) / 2, maxVal].map(Math.round)
        return ticks.map((t) => (
          <text
            key={t}
            x={padLeft - 8}
            y={scaleY(t)}
            textAnchor="end"
            dominantBaseline="central"
            fill="var(--n600)"
            fontSize={10}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, fontVariantNumeric: 'tabular-nums' }}
          >
            {(t / 1000).toFixed(1)} kJ
          </text>
        ))
      })()}
    </svg>
  )
}
