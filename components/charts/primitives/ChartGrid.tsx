// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartGrid — subtle background grid lines for cartesian charts.
 *
 * Renders horizontal lines (and optionally vertical) at nice-tick positions,
 * aligned with ChartAxisY labels. Place as the FIRST child inside ChartRoot
 * so it renders behind all data elements.
 *
 * Usage:
 *   <ChartRoot data={data}>
 *     <ChartGrid />                       // horizontal only (default)
 *     <ChartGrid horizontal vertical />   // both directions
 *     <ChartLine ... />
 *   </ChartRoot>
 */

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { niceTicks } from '@/lib/charts/ticks/nice'
import { useChart } from './chart-context'

// ─── Props ───

export interface ChartGridProps {
  /** Show horizontal grid lines (aligned with Y-axis ticks). Default: true */
  horizontal?: boolean
  /** Show vertical grid lines (aligned with X-axis ticks). Default: false */
  vertical?: boolean
  /** Number of horizontal ticks. Should match ChartAxisY tickCount. Default: 4 */
  tickCount?: number
  /** Number of vertical ticks. Default: 6 */
  verticalTickCount?: number
  /** Stroke dash pattern. Default: '3 3'. Use '' for solid lines. */
  strokeDasharray?: string
  /** Additional CSS class for the grid group. */
  className?: string
}

// ─── Component ───

export function ChartGrid({
  horizontal = true,
  vertical = false,
  tickCount = 4,
  verticalTickCount = 6,
  strokeDasharray = '3 3',
  className,
}: ChartGridProps) {
  const { scaleX, scaleY, chartWidth, chartHeight } = useChart()

  const yTicks = useMemo(
    () => horizontal ? niceTicks(scaleY.domain[0], scaleY.domain[1], tickCount) : [],
    [horizontal, scaleY.domain, tickCount],
  )

  const xTicks = useMemo(
    () => vertical ? niceTicks(scaleX.domain[0], scaleX.domain[1], verticalTickCount) : [],
    [vertical, scaleX.domain, verticalTickCount],
  )

  return (
    <g className={cn(className)}>
      {yTicks.map((t) => {
        const y = scaleY(t)
        if (!isFinite(y)) return null
        return (
          <line
            key={`h-${t}`}
            x1={0}
            y1={y}
            x2={chartWidth}
            y2={y}
            stroke="var(--n400)"
            strokeOpacity={0.4}
            strokeWidth={0.5}
            strokeDasharray={strokeDasharray || undefined}
            shapeRendering="crispEdges"
          />
        )
      })}
      {xTicks.map((t) => {
        const x = scaleX(t)
        if (!isFinite(x)) return null
        return (
          <line
            key={`v-${t}`}
            x1={x}
            y1={0}
            x2={x}
            y2={chartHeight}
            stroke="var(--n400)"
            strokeOpacity={0.4}
            strokeWidth={0.5}
            strokeDasharray={strokeDasharray || undefined}
            shapeRendering="crispEdges"
          />
        )
      })}
    </g>
  )
}
