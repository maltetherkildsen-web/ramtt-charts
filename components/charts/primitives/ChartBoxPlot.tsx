// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartBoxPlot — box-and-whisker plot primitive.
 *
 * Uses ChartRoot context (cartesian). Renders whiskers, box (Q1–Q3),
 * median line, and optional outlier dots for each data point.
 *
 * Usage:
 *   <ChartRoot data={indices} height={300} xDomain={[-0.5, N-0.5]} yDomain={[lo, hi]}>
 *     <ChartBoxPlot data={boxData} />
 *   </ChartRoot>
 */

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useChart } from './chart-context'

// ─── Types ───

export interface BoxPlotData {
  label: string
  min: number
  q1: number
  median: number
  q3: number
  max: number
  outliers?: number[]
}

// ─── Props ───

export interface ChartBoxPlotProps {
  /** Box plot data array. */
  data?: BoxPlotData[]
  /** Box width as fraction of step. Default 0.5. */
  boxWidth?: number
  /** Box color. Default 'var(--n1150)'. */
  color?: string
  /** Median line color. Default '#3b82f6'. */
  medianColor?: string
  /** Tailwind classes. */
  className?: string
}

// ─── Component ───

export function ChartBoxPlot({
  data,
  boxWidth = 0.5,
  color = 'var(--chart-1)',
  medianColor = 'var(--n1150)',
  className,
}: ChartBoxPlotProps) {
  const { scaleX, scaleY, chartWidth } = useChart()

  const boxes = useMemo(() => {
    if (!data || data.length === 0) return []

    const step = data.length > 1 ? scaleX(1) - scaleX(0) : chartWidth
    const halfW = Math.min((step * boxWidth) / 2, 15) // Max 30px wide
    const capHalfW = 6 // Fixed 12px cap width

    return data.map((d, i) => {
      const cx = scaleX(i)
      const yMin = scaleY(d.min)
      const yQ1 = scaleY(d.q1)
      const yMedian = scaleY(d.median)
      const yQ3 = scaleY(d.q3)
      const yMax = scaleY(d.max)

      const outlierYs = (d.outliers ?? []).map((v) => scaleY(v))

      return {
        cx,
        halfW,
        capHalfW,
        yMin,
        yQ1,
        yMedian,
        yQ3,
        yMax,
        outlierYs,
        index: i,
      }
    })
  }, [data, scaleX, scaleY, chartWidth, boxWidth])

  if (boxes.length === 0) return null

  return (
    <g className={cn(className)}>
      {boxes.map((b) => (
        <g key={b.index}>
          {/* Lower whisker: min to Q1 */}
          <line
            x1={b.cx} y1={b.yQ1}
            x2={b.cx} y2={b.yMin}
            stroke="var(--n800)"
            strokeWidth={0.5}
            shapeRendering="crispEdges"
          />
          {/* Upper whisker: Q3 to max */}
          <line
            x1={b.cx} y1={b.yQ3}
            x2={b.cx} y2={b.yMax}
            stroke="var(--n800)"
            strokeWidth={0.5}
            shapeRendering="crispEdges"
          />
          {/* Min cap */}
          <line
            x1={b.cx - b.capHalfW} y1={b.yMin}
            x2={b.cx + b.capHalfW} y2={b.yMin}
            stroke="var(--n800)"
            strokeWidth={0.5}
            shapeRendering="crispEdges"
          />
          {/* Max cap */}
          <line
            x1={b.cx - b.capHalfW} y1={b.yMax}
            x2={b.cx + b.capHalfW} y2={b.yMax}
            stroke="var(--n800)"
            strokeWidth={0.5}
            shapeRendering="crispEdges"
          />
          {/* Box: Q1 to Q3 */}
          <rect
            x={b.cx - b.halfW}
            y={Math.min(b.yQ1, b.yQ3)}
            width={b.halfW * 2}
            height={Math.abs(b.yQ3 - b.yQ1)}
            fill={color}
            fillOpacity={0.6}
            stroke={color}
            strokeWidth={0.5}
          />
          {/* Median line — the most prominent element */}
          <line
            x1={b.cx - b.halfW} y1={b.yMedian}
            x2={b.cx + b.halfW} y2={b.yMedian}
            stroke={medianColor}
            strokeWidth={2}
            shapeRendering="crispEdges"
          />
          {/* Outliers */}
          {b.outlierYs.map((oy, oi) => (
            <circle
              key={oi}
              cx={b.cx}
              cy={oy}
              r={3}
              fill="var(--n600)"
            />
          ))}
        </g>
      ))}
    </g>
  )
}
