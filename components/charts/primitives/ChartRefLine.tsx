'use client'

/**
 * ChartRefLine — horizontal dashed reference line with a label.
 *
 * Uses font-space (→ JetBrains Mono via next/font CSS variable override).
 */

import { cn } from '@/lib/utils'
import { useChart } from './chart-context'

export interface ChartRefLineProps {
  y: number
  label?: string
  className?: string
}

export function ChartRefLine({ y, label, className }: ChartRefLineProps) {
  const { scaleY, chartWidth } = useChart()

  const py = scaleY(y)

  if (py < -2 || py > scaleY(scaleY.domain[0]) + 2) return null

  return (
    <g>
      <line
        x1={0}
        y1={py}
        x2={chartWidth}
        y2={py}
        strokeDasharray="4 3"
        strokeWidth={0.75}
        className={cn('stroke-zinc-400', className)}
      />
      {label && (
        <text
          x={chartWidth + 4}
          y={py}
          dy="0.32em"
          className="fill-zinc-400 font-space text-[9px] font-normal"
        >
          {label}
        </text>
      )}
    </g>
  )
}
