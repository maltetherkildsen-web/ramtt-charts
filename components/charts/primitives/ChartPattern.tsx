// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartPattern — subtle SVG background patterns for chart plot areas.
 *
 * Renders a pattern-filled rect behind all chart content. Place as the
 * FIRST child inside ChartRoot (before ChartGrid) for correct z-order.
 *
 * Usage:
 *   <ChartRoot data={data}>
 *     <ChartPattern />                // dot grid (default)
 *     <ChartPattern variant="lines" /> // vertical dashed lines
 *     <ChartGrid />
 *     <ChartLine ... />
 *   </ChartRoot>
 */

import { useId } from 'react'
import { useChart } from './chart-context'

export interface ChartPatternProps {
  /** Pattern style. Default: 'dots' */
  variant?: 'dots' | 'lines' | 'crosses' | 'none'
  /** Pattern opacity. Default: 0.3 */
  opacity?: number
  /** Spacing between pattern units in px. Default: 16 */
  spacing?: number
  className?: string
}

export function ChartPattern({
  variant = 'dots',
  opacity = 0.3,
  spacing = 16,
  className,
}: ChartPatternProps) {
  const { chartWidth, chartHeight } = useChart()
  const id = useId()
  const patternId = `chart-pattern-${id}`

  if (variant === 'none') return null

  return (
    <g className={className}>
      <defs>
        {variant === 'dots' && (
          <pattern id={patternId} width={spacing} height={spacing} patternUnits="userSpaceOnUse">
            <circle cx={spacing / 2} cy={spacing / 2} r={0.5} fill="var(--n400)" opacity={opacity} shapeRendering="geometricPrecision" />
          </pattern>
        )}
        {variant === 'lines' && (
          <pattern id={patternId} width={spacing} height={spacing} patternUnits="userSpaceOnUse">
            <line
              x1={spacing / 2} y1={0} x2={spacing / 2} y2={spacing}
              stroke="var(--n400)" strokeWidth={0.5} strokeDasharray="2 3" opacity={opacity}
              shapeRendering="crispEdges"
            />
          </pattern>
        )}
        {variant === 'crosses' && (
          <pattern id={patternId} width={spacing} height={spacing} patternUnits="userSpaceOnUse">
            <line
              x1={spacing / 2 - 2} y1={spacing / 2} x2={spacing / 2 + 2} y2={spacing / 2}
              stroke="var(--n400)" strokeWidth={0.5} opacity={opacity}
              shapeRendering="crispEdges"
            />
            <line
              x1={spacing / 2} y1={spacing / 2 - 2} x2={spacing / 2} y2={spacing / 2 + 2}
              stroke="var(--n400)" strokeWidth={0.5} opacity={opacity}
              shapeRendering="crispEdges"
            />
          </pattern>
        )}
      </defs>
      <rect
        x={0} y={0}
        width={chartWidth} height={chartHeight}
        fill={`url(#${patternId})`}
      />
    </g>
  )
}
