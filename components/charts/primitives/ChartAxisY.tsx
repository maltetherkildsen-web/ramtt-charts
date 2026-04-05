'use client'

/**
 * ChartAxisY — left Y-axis with nice tick labels.
 *
 * Uses font-space (→ JetBrains Mono via next/font CSS variable override).
 */

import { useMemo } from 'react'
import { niceTicks } from '@/lib/charts/ticks/nice'
import { useChart } from './chart-context'

export interface ChartAxisYProps {
  tickCount?: number
  format?: (value: number) => string
  dx?: number
}

export function ChartAxisY({
  tickCount = 4,
  format = (v) => v.toLocaleString(),
  dx = -10,
}: ChartAxisYProps) {
  const { scaleY } = useChart()

  const ticks = useMemo(
    () => niceTicks(scaleY.domain[0], scaleY.domain[1], tickCount),
    [scaleY.domain, tickCount],
  )

  return (
    <g>
      {ticks.map((t) => {
        const py = scaleY(t)
        if (!isFinite(py)) return null
        return (
          <text
            key={t}
            x={dx}
            y={py}
            dy="0.32em"
            textAnchor="end"
            className="fill-[#8A877F] font-space text-[9px]"
          >
            {format(t)}
          </text>
        )
      })}
    </g>
  )
}
