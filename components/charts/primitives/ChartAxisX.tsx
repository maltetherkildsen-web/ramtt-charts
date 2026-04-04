'use client'

/**
 * ChartAxisX — bottom X-axis with evenly spaced labels.
 *
 * Uses font-space (→ JetBrains Mono via next/font CSS variable override).
 */

import { useMemo } from 'react'
import { useChart } from './chart-context'

export interface ChartAxisXProps {
  labelCount?: number
  format?: (index: number, total: number) => string
  dy?: number
}

export function ChartAxisX({
  labelCount = 6,
  format = (i) => String(i),
  dy = 16,
}: ChartAxisXProps) {
  const { data, scaleX, chartHeight } = useChart()

  const labels = useMemo(() => {
    const len = data.length
    if (len === 0) return []

    const step = Math.max(1, Math.floor((len - 1) / labelCount))
    const result: { index: number; label: string }[] = []

    for (let i = 0; i < len; i += step) {
      result.push({ index: i, label: format(i, len) })
    }

    // Only add the last point if it's far enough from the previous label
    // (at least 60% of a step away) to avoid overlap
    const lastIdx = len - 1
    const prevIdx = result[result.length - 1]?.index ?? -Infinity
    if (lastIdx - prevIdx >= step * 0.6) {
      result.push({ index: lastIdx, label: format(lastIdx, len) })
    }

    return result
  }, [data.length, labelCount, format])

  return (
    <g>
      {labels.map(({ index, label }) => (
        <text
          key={index}
          x={scaleX(index)}
          y={chartHeight + dy}
          textAnchor="middle"
          className="fill-zinc-400 font-space text-[10px] font-light"
        >
          {label}
        </text>
      ))}
    </g>
  )
}
