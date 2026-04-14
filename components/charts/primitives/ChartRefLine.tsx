// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartRefLine — horizontal dashed reference line with a label.
 *
 * Uses Satoshi via --font-sans CSS variable.
 */

import { cn } from '@/lib/ui'
import { useChart } from './chart-context'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'

export interface ChartRefLineProps {
  y: number
  label?: string
  className?: string
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
}

export function ChartRefLine({ y, label, className, animate = true }: ChartRefLineProps) {
  const { scaleY, chartWidth } = useChart()

  const py = scaleY(y)

  const anim = resolveAnimate(animate, { duration: 400, delay: 400, easing: EASE_OUT_EXPO })
  const animStyle = anim.enabled
    ? { animation: `ramtt-axis-fade-x ${anim.duration}ms ${anim.easing} ${anim.delay}ms both` }
    : undefined

  if (!isFinite(py) || py < -2 || py > scaleY(scaleY.domain[0]) + 2) return null

  return (
    <g style={animStyle}>
      <line
        x1={0}
        y1={py}
        x2={chartWidth}
        y2={py}
        strokeDasharray="4 4"
        strokeWidth={0.5}
        shapeRendering="crispEdges"
        className={cn('stroke-(--n600)', className)}
      />
      {label && (
        <text
          x={chartWidth + 4}
          y={py}
          dy="0.32em"
          className="fill-(--n600) text-[8px]"
          style={{ fontFamily: "var(--font-sans)" }}
        >
          {label}
        </text>
      )}
    </g>
  )
}
