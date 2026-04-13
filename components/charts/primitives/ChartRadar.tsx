// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartRadar — polygon radar / spider chart primitive.
 *
 * Self-contained: renders its own `<svg>`, does NOT use ChartRoot.
 * Dimensions radiate from center. Data series are filled polygons.
 *
 * Usage:
 *   <ChartRadar
 *     dimensions={['Power', 'Endurance', 'Speed', 'Recovery']}
 *     series={[
 *       { label: 'Current', values: [85, 72, 68, 55], className: 'stroke-[var(--n1150)] fill-[var(--n1150)]/15' },
 *     ]}
 *   />
 */

import { useMemo } from 'react'
import { cn } from '@/lib/ui'
import { radarPoints, radarPath, radarGridPoints } from '@/lib/charts/paths/radar'

// ─── Types ───

export interface RadarSeries {
  label: string
  values: number[] // One per dimension. 0-100 scale.
  className?: string // Tailwind for stroke + fill
  dashed?: boolean // stroke-dasharray for comparison series
}

export interface ChartRadarProps {
  dimensions: string[] // Axis labels
  series: RadarSeries[] // 1-3 data series
  size?: number // Width & height in px. Default: 280
  rings?: number // Number of concentric grid rings. Default: 5
  showValues?: boolean // Show numeric values at each axis tip
  className?: string
}

// ─── Helpers ───

/** Determine text-anchor based on angle position */
function textAnchor(angle: number): 'start' | 'middle' | 'end' {
  const cos = Math.cos(angle)
  if (cos > 0.3) return 'start'
  if (cos < -0.3) return 'end'
  return 'middle'
}

/** Determine dominant-baseline based on angle position */
function dominantBaseline(angle: number): 'auto' | 'hanging' | 'central' {
  const sin = Math.sin(angle)
  if (sin < -0.5) return 'auto' // top labels
  if (sin > 0.5) return 'hanging' // bottom labels
  return 'central'
}

// ─── Extract color from className (for legend swatch) ───

function extractStrokeColor(className?: string): string {
  if (!className) return 'var(--n1150)'
  // Match stroke-[...] or stroke-blue-500 etc.
  const varMatch = className.match(/stroke-\[([^\]]+)\]/)
  if (varMatch) return varMatch[1]
  // Fallback: try to find Tailwind color class
  return 'var(--n1150)'
}

// ─── Component ───

export function ChartRadar({
  dimensions,
  series,
  size = 280,
  rings = 5,
  showValues = false,
  className,
}: ChartRadarProps) {
  const cx = size / 2
  const cy = size / 2
  const padding = 40
  const maxRadius = size / 2 - padding
  const n = dimensions.length

  // Grid ring polygons
  const gridPaths = useMemo(() => {
    const result: string[] = []
    for (let r = 1; r <= rings; r++) {
      const ringRadius = (r / rings) * maxRadius
      const pts = radarGridPoints(n, cx, cy, ringRadius)
      result.push(radarPath(pts))
    }
    return result
  }, [rings, maxRadius, n, cx, cy])

  // Axis endpoint coordinates
  const axisEnds = useMemo(() => {
    return radarGridPoints(n, cx, cy, maxRadius)
  }, [n, cx, cy, maxRadius])

  // Label positions (slightly beyond maxRadius)
  const labelPositions = useMemo(() => {
    const labelRadius = maxRadius + 14
    return radarPoints(new Array(n).fill(100), 100, cx, cy, labelRadius)
  }, [n, cx, cy, maxRadius])

  // Series paths + dot positions
  const seriesData = useMemo(() => {
    return series.map((s) => {
      const pts = radarPoints(s.values, 100, cx, cy, maxRadius)
      const d = radarPath(pts)
      return { d, dots: pts, series: s }
    })
  }, [series, cx, cy, maxRadius])

  // Legend height
  const legendHeight = series.length > 1 ? 28 : 0
  const totalHeight = size + legendHeight

  return (
    <svg
      width={size}
      height={totalHeight}
      viewBox={`0 0 ${size} ${totalHeight}`}
      className={cn(className)}
      shapeRendering="geometricPrecision"
    >
      {/* Grid rings */}
      {gridPaths.map((d, i) => (
        <path
          key={`ring-${i}`}
          d={d}
          fill="none"
          stroke="var(--n200)"
          strokeWidth={0.5}
        />
      ))}

      {/* Axis lines */}
      {axisEnds.map(([x, y], i) => (
        <line
          key={`axis-${i}`}
          x1={cx}
          y1={cy}
          x2={x}
          y2={y}
          stroke="var(--n200)"
          strokeWidth={0.5}
        />
      ))}

      {/* Dimension labels */}
      {labelPositions.map(([x, y], i) => {
        const angle = (Math.PI * 2 * i) / n - Math.PI / 2
        return (
          <text
            key={`label-${i}`}
            x={x}
            y={y}
            textAnchor={textAnchor(angle)}
            dominantBaseline={dominantBaseline(angle)}
            fill="var(--n600)"
            fontSize={11}
            style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 400 }}
          >
            {dimensions[i]}
          </text>
        )
      })}

      {/* Values at tips */}
      {showValues && seriesData.length > 0 && (
        <>
          {seriesData[0].series.values.map((val, i) => {
            const angle = (Math.PI * 2 * i) / n - Math.PI / 2
            const valRadius = maxRadius + 26
            const x = cx + valRadius * Math.cos(angle)
            const y = cy + valRadius * Math.sin(angle)
            return (
              <text
                key={`val-${i}`}
                x={x}
                y={y + 10}
                textAnchor={textAnchor(angle)}
                fill="var(--n800)"
                fontSize={10}
                style={{
                  fontFamily: "'Satoshi', sans-serif",
                  fontWeight: 550,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {val}
              </text>
            )
          })}
        </>
      )}

      {/* Series polygons */}
      {seriesData.map(({ d, series: s }, i) => (
        <path
          key={`series-${i}`}
          d={d}
          className={s.className}
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeDasharray={s.dashed ? '4 4' : undefined}
        />
      ))}

      {/* Series dots */}
      {seriesData.map(({ dots, series: s }, si) =>
        dots.map(([dx, dy], di) => (
          <circle
            key={`dot-${si}-${di}`}
            cx={dx}
            cy={dy}
            r={3}
            className={s.className?.replace(/fill-[^\s]+/g, '') ?? ''}
            fill={extractStrokeColor(s.className)}
            stroke="white"
            strokeWidth={1.5}
          />
        )),
      )}

      {/* Legend (when multiple series) */}
      {series.length > 1 && (
        <g transform={`translate(${cx}, ${size + 6})`}>
          {series.map((s, i) => {
            const totalWidth = series.length * 100
            const offsetX = -totalWidth / 2 + i * 100
            const color = extractStrokeColor(s.className)
            return (
              <g key={`legend-${i}`} transform={`translate(${offsetX}, 0)`}>
                <line
                  x1={0}
                  y1={6}
                  x2={12}
                  y2={6}
                  stroke={color}
                  strokeWidth={2}
                  strokeDasharray={s.dashed ? '4 3' : undefined}
                />
                <text
                  x={16}
                  y={10}
                  fill="var(--n800)"
                  fontSize={12}
                  style={{ fontFamily: "'Satoshi', sans-serif", fontWeight: 400 }}
                >
                  {s.label}
                </text>
              </g>
            )
          })}
        </g>
      )}
    </svg>
  )
}
