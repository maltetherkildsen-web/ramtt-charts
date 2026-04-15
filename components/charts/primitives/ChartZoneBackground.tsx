// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartZoneBackground — filled color regions behind chart data based on training zones.
 *
 * Renders horizontal `<rect>` elements for each zone band (e.g. Z1–Z6).
 * Place BEFORE ChartLine/ChartZoneLine in the JSX tree so it renders behind.
 *
 * Uses ChartRoot context for scaleY and chartWidth.
 *
 * Usage:
 *   <ChartRoot data={values}>
 *     <ChartZoneBackground threshold={240} />
 *     <ChartZoneLine threshold={240} />
 *   </ChartRoot>
 */

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useChart } from './chart-context'

export interface ZoneDefinition {
  min: number
  max: number
  color: string
  label: string
}

/** Coggan power zones — same as ChartZoneLine. */
export const POWER_ZONES: ZoneDefinition[] = [
  { min: 0, max: 0.55, color: '#94a3b8', label: 'Z1' },
  { min: 0.55, max: 0.75, color: '#22c55e', label: 'Z2' },
  { min: 0.75, max: 0.90, color: '#eab308', label: 'Z3' },
  { min: 0.90, max: 1.05, color: '#f97316', label: 'Z4' },
  { min: 1.05, max: 1.20, color: '#ef4444', label: 'Z5' },
  { min: 1.20, max: Infinity, color: '#dc2626', label: 'Z6' },
]

export interface ChartZoneBackgroundProps {
  /** Threshold value (e.g. FTP in watts). Used to compute zone boundaries. */
  threshold: number
  /** Zone definitions. Default: Coggan power zones. */
  zones?: ZoneDefinition[]
  /** Fill opacity for zone bands. Default: 0.06. */
  opacity?: number
  /** Show zone labels on the right edge. Default: false. */
  showLabels?: boolean
  className?: string
}

export function ChartZoneBackground({
  threshold,
  zones = POWER_ZONES,
  opacity = 0.06,
  showLabels = false,
  className,
}: ChartZoneBackgroundProps) {
  const { scaleY, chartWidth, chartHeight } = useChart()

  const bands = useMemo(() => {
    if (threshold <= 0) return []

    return zones
      .filter((z) => z.max > 0)
      .map((zone) => {
        const yTop = zone.max === Infinity
          ? 0
          : Math.max(0, scaleY(zone.max * threshold))
        const yBottom = Math.min(chartHeight, scaleY(zone.min * threshold))
        const height = yBottom - yTop

        if (height <= 0) return null

        return {
          y: yTop,
          height,
          color: zone.color,
          label: zone.label,
        }
      })
      .filter(Boolean) as { y: number; height: number; color: string; label: string }[]
  }, [threshold, zones, scaleY, chartHeight])

  return (
    <g className={cn(className)}>
      {bands.map((band) => (
        <g key={band.label}>
          <rect
            x={0}
            y={band.y}
            width={chartWidth}
            height={band.height}
            fill={band.color}
            opacity={opacity}
          />
          {showLabels && (
            <text
              x={chartWidth - 4}
              y={band.y + band.height / 2}
              textAnchor="end"
              dominantBaseline="middle"
              fill={band.color}
              opacity={0.5}
              fontFamily="Satoshi, sans-serif"
              fontWeight={450}
              className="text-[9px]"
            >
              {band.label}
            </text>
          )}
        </g>
      ))}
    </g>
  )
}
