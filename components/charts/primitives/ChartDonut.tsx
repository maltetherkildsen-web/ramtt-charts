// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartDonut — self-contained donut/pie chart.
 *
 * Does NOT use ChartRoot — renders its own <svg> with arc segments.
 * Supports hover highlight (slight outward translation along midpoint angle).
 */

import { useState, useMemo } from 'react'
import { arcPath, pieLayout } from '@/lib/charts/paths/arc'

export interface ChartDonutProps {
  data: readonly any[]
  valueAccessor: (d: any) => number
  labelAccessor?: (d: any) => string
  colors: readonly string[]
  /** Inner radius as fraction of outer. Default: 0.6 */
  innerRadius?: number
  /** Gap between segments in degrees. Default: 1.5 */
  padAngle?: number
  /** Width & height in px. Default: 220 */
  size?: number
  /** Center label (top line). */
  centerLabel?: string
  /** Center value (large text). */
  centerValue?: string
  className?: string
}

export function ChartDonut({
  data,
  valueAccessor,
  colors,
  innerRadius = 0.6,
  padAngle = 1.5,
  size = 220,
  centerLabel,
  centerValue,
  className,
}: ChartDonutProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const outerR = size / 2 - 4 // leave room for hover expansion
  const innerR = outerR * innerRadius
  const cx = size / 2
  const cy = size / 2

  const padRad = (padAngle * Math.PI) / 180

  const slices = useMemo(
    () => pieLayout(data, valueAccessor, padRad),
    [data, valueAccessor, padRad],
  )

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      shapeRendering="geometricPrecision"
    >
      {slices.map((slice, i) => {
        const d = arcPath(cx, cy, innerR, outerR, slice.startAngle, slice.endAngle)
        const isHovered = hoveredIndex === i

        // Hover: translate 3px outward along the segment's midpoint angle
        const midAngle = (slice.startAngle + slice.endAngle) / 2
        const tx = isHovered ? 3 * Math.sin(midAngle) : 0
        const ty = isHovered ? -3 * Math.cos(midAngle) : 0

        return (
          <path
            key={i}
            d={d}
            fill={colors[i % colors.length]}
            opacity={hoveredIndex === null || isHovered ? 1 : 0.7}
            transform={`translate(${tx.toFixed(1)},${ty.toFixed(1)})`}
            style={{ transition: 'transform 150ms, opacity 150ms' }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          />
        )
      })}

      {/* Center text */}
      {centerLabel && (
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          className="fill-(--n600) text-[9px]"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 550,
          }}
        >
          {centerLabel}
        </text>
      )}
      {centerValue && (
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          className="fill-(--n1150) text-[18px]"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 550,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {centerValue}
        </text>
      )}
    </svg>
  )
}
