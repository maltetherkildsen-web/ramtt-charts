// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartRadar — polygon radar / spider chart primitive.
 *
 * Self-contained: renders its own `<svg>`, does NOT use ChartRoot.
 * Each axis radiates from the center. Data series are plotted as
 * filled polygons connecting points at the appropriate distance.
 *
 * Usage:
 *   <ChartRadar
 *     axes={[{ label: 'Power', max: 100 }, ...]}
 *     series={[{ values: [85, 72, ...], color: '#3b82f6', label: 'Current' }]}
 *   />
 */

import { useMemo } from 'react'
import { cn } from '@/lib/utils'

// ─── Props ───

export interface RadarAxis {
  label: string
  max: number
}

export interface RadarSeries {
  values: number[]
  color: string
  label: string
}

export interface ChartRadarProps {
  /** Array of axis definitions. */
  axes: RadarAxis[]
  /** One or more data series. */
  series: RadarSeries[]
  /** Size in pixels. Default 300. */
  size?: number
  /** Number of concentric grid rings. Default 4. */
  rings?: number
  /** Tailwind classes on the wrapper. */
  className?: string
}

// ─── Helpers ───

/** Compute (x, y) on the radar for a given axis index, fraction, and radius. */
function polarPoint(
  cx: number,
  cy: number,
  axisIndex: number,
  totalAxes: number,
  fraction: number,
  radius: number,
): { x: number; y: number } {
  const angle = (2 * Math.PI * axisIndex) / totalAxes - Math.PI / 2
  const r = fraction * radius
  return {
    x: cx + r * Math.cos(angle),
    y: cy + r * Math.sin(angle),
  }
}

/** Build a polygon `points` string for a ring/series at a given set of fractions. */
function polygonPoints(
  cx: number,
  cy: number,
  fractions: number[],
  totalAxes: number,
  radius: number,
): string {
  return fractions
    .map((f, i) => {
      const p = polarPoint(cx, cy, i, totalAxes, f, radius)
      return `${p.x.toFixed(2)},${p.y.toFixed(2)}`
    })
    .join(' ')
}

// ─── Component ───

export function ChartRadar({
  axes,
  series,
  size = 300,
  rings = 4,
  className,
}: ChartRadarProps) {
  const cx = size / 2
  const cy = size / 2
  const labelPad = 28
  const radius = size / 2 - labelPad
  const n = axes.length

  // Grid rings
  const gridRings = useMemo(() => {
    const result: string[] = []
    for (let r = 1; r <= rings; r++) {
      const frac = r / rings
      const uniformFractions = axes.map(() => frac)
      result.push(polygonPoints(cx, cy, uniformFractions, n, radius))
    }
    return result
  }, [axes, rings, cx, cy, radius, n])

  // Axis lines
  const axisLines = useMemo(() => {
    return axes.map((_, i) => {
      const p = polarPoint(cx, cy, i, n, 1, radius)
      return { x2: p.x, y2: p.y }
    })
  }, [axes, cx, cy, n, radius])

  // Axis labels
  const axisLabels = useMemo(() => {
    return axes.map((axis, i) => {
      const p = polarPoint(cx, cy, i, n, 1, radius + 14)
      // Anchor based on position
      const angle = (2 * Math.PI * i) / n - Math.PI / 2
      const cos = Math.cos(angle)
      let anchor: 'start' | 'middle' | 'end' = 'middle'
      if (cos > 0.3) anchor = 'start'
      else if (cos < -0.3) anchor = 'end'
      return { ...p, label: axis.label, anchor }
    })
  }, [axes, cx, cy, n, radius])

  // Series polygons + dots
  const seriesData = useMemo(() => {
    return series.map((s) => {
      const fractions = s.values.map((v, i) => Math.min(1, v / axes[i].max))
      const points = polygonPoints(cx, cy, fractions, n, radius)
      const dots = fractions.map((f, i) => polarPoint(cx, cy, i, n, f, radius))
      return { points, dots, color: s.color }
    })
  }, [series, axes, cx, cy, n, radius])

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn(className)}
      shapeRendering="geometricPrecision"
    >
      {/* Grid rings */}
      {gridRings.map((pts, i) => (
        <polygon
          key={i}
          points={pts}
          fill="none"
          stroke="var(--n200)"
          strokeWidth={0.5}
        />
      ))}

      {/* Axis lines */}
      {axisLines.map((line, i) => (
        <line
          key={i}
          x1={cx}
          y1={cy}
          x2={line.x2}
          y2={line.y2}
          stroke="var(--n200)"
          strokeWidth={0.5}
        />
      ))}

      {/* Axis labels */}
      {axisLabels.map((lbl) => (
        <text
          key={lbl.label}
          x={lbl.x}
          y={lbl.y}
          textAnchor={lbl.anchor}
          dominantBaseline="central"
          fill="var(--n600)"
          fontSize={11}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
        >
          {lbl.label}
        </text>
      ))}

      {/* Series polygons */}
      {seriesData.map((s, i) => (
        <polygon
          key={i}
          points={s.points}
          fill={s.color}
          fillOpacity={0.15}
          stroke={s.color}
          strokeWidth={1.5}
          strokeLinejoin="round"
        />
      ))}

      {/* Series dots */}
      {seriesData.map((s, si) =>
        s.dots.map((d, di) => (
          <circle
            key={`${si}-${di}`}
            cx={d.x}
            cy={d.y}
            r={3}
            fill={s.color}
            stroke="white"
            strokeWidth={1.5}
          />
        )),
      )}
    </svg>
  )
}
