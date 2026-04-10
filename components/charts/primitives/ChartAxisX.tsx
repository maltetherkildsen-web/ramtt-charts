// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartAxisX — bottom X-axis with evenly spaced or explicit tick labels.
 *
 * Uses Satoshi via --font-sans CSS variable.
 *
 * Two modes:
 *   1. Default: evenly spaced by `labelCount`.
 *   2. Explicit: pass `tickValues` (data indices) for custom placement.
 */

import { useMemo } from 'react'
import { useChart } from './chart-context'

export interface ChartAxisXProps {
  labelCount?: number
  format?: (index: number, total: number) => string
  dy?: number
  /** Explicit tick positions (data indices). Overrides labelCount. */
  tickValues?: number[]
  /** Explicit font-family for SVG <text>. Default: Satoshi via --font-sans. */
  fontFamily?: string
}

export function ChartAxisX({
  labelCount = 6,
  format = (i) => String(i),
  dy = 16,
  tickValues,
  fontFamily = "var(--font-sans)",
}: ChartAxisXProps) {
  const { data, scaleX, chartHeight } = useChart()

  const labels = useMemo(() => {
    const len = data.length
    if (len === 0) return []

    // Explicit tick positions
    if (tickValues) {
      return tickValues
        .filter((i) => i >= 0 && i < len)
        .map((i) => ({ index: i, label: format(i, len) }))
    }

    // Default: evenly spaced
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
  }, [data.length, labelCount, format, tickValues])

  return (
    <g>
      {labels.map(({ index, label }) => {
        const px = scaleX(index)
        const py = chartHeight + dy
        if (!isFinite(px) || !isFinite(py)) return null
        return (
          <text
            key={index}
            x={px}
            y={py}
            textAnchor="middle"
            className="fill-(--n600) text-[10px]"
            style={{ fontFamily }}
          >
            {label}
          </text>
        )
      })}
    </g>
  )
}
