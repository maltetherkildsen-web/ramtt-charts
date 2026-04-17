// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartMMP — Maximal Mean Power curve chart.
 *
 * Self-contained SVG (non-cartesian — like ChartDonut).
 * X-axis: duration in seconds on a log scale.
 * Y-axis: peak average power (watts) on a linear scale.
 *
 * Renders a smooth line + area fill + dots at standard peak durations.
 * Hover via ref-based DOM manipulation (zero re-renders per RULES.md).
 */

import { useMemo, useRef, useCallback, useEffect } from 'react'
import { scaleLog, niceLogTicks } from '@/lib/charts/scales/log'
import { scaleLinear } from '@/lib/charts/scales/linear'
import { linePath } from '@/lib/charts/paths/line'
import { areaPath } from '@/lib/charts/paths/area'
import { niceTicks } from '@/lib/charts/ticks/nice'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'
import { cn } from '@/lib/utils'

export interface MMPPoint {
  seconds: number
  watts: number
}

export interface ChartMMPProps {
  /** Full MMP curve data (1s, 2s, ..., Ns). */
  data: readonly MMPPoint[]
  /** Highlighted peak points (e.g. at 3s, 10s, 1m, 5m, 20m, 60m). */
  peaks?: readonly MMPPoint[]
  /** Width in px. Default: 600. */
  width?: number
  /** Height in px. Default: 300. */
  height?: number
  /** Line color. Default: var(--chart-1). */
  color?: string
  /** Area fill opacity. Default: 0.08. */
  fillOpacity?: number
  /** Show grid lines. Default: true. */
  grid?: boolean
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
  className?: string
}

const PADDING = { top: 16, right: 24, bottom: 40, left: 52 }

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.round(seconds / 60)}m`
  return `${(seconds / 3600).toFixed(1)}h`
}

export function ChartMMP({
  data,
  peaks,
  width = 600,
  height = 300,
  color,
  fillOpacity = 0.08,
  grid = true,
  animate = true,
  className,
}: ChartMMPProps) {
  const chartW = width - PADDING.left - PADDING.right
  const chartH = height - PADDING.top - PADDING.bottom

  const lineRef = useRef<SVGPathElement>(null)
  const tooltipRef = useRef<SVGGElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const rafRef = useRef(0)

  // Compute domains from data
  const { xScale, yScale, xTicks, yTicks } = useMemo(() => {
    if (data.length === 0) {
      return {
        xScale: scaleLog([1, 3600], [0, chartW]),
        yScale: scaleLinear([0, 400], [chartH, 0]),
        xTicks: [] as number[],
        yTicks: [] as number[],
      }
    }

    const minSec = data[0].seconds
    const maxSec = data[data.length - 1].seconds
    const maxWatts = Math.max(...data.map((d) => d.watts))
    const yMax = Math.ceil(maxWatts / 50) * 50 + 50

    return {
      xScale: scaleLog([Math.max(1, minSec), maxSec], [0, chartW]),
      yScale: scaleLinear([0, yMax], [chartH, 0]),
      xTicks: niceLogTicks(Math.max(1, minSec), maxSec),
      yTicks: niceTicks(0, yMax, 5),
    }
  }, [data, chartW, chartH])

  // Build SVG paths
  const { lineD, areaD } = useMemo(() => {
    if (data.length === 0) return { lineD: '', areaD: '' }

    const ld = linePath(
      data as MMPPoint[],
      (d) => xScale(d.seconds),
      (d) => yScale(d.watts),
    )

    const ad = areaPath(
      data as MMPPoint[],
      (d) => xScale(d.seconds),
      (d) => yScale(d.watts),
      chartH,
    )

    return { lineD: ld, areaD: ad }
  }, [data, xScale, yScale, chartH])

  // Animation
  const anim = resolveAnimate(animate, { duration: 1200, delay: 0, easing: EASE_OUT_EXPO, mode: 'draw' })

  useEffect(() => {
    if (!anim.enabled || anim.mode !== 'draw' || !lineRef.current) return
    const path = lineRef.current
    const length = path.getTotalLength()
    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`
    path.getBoundingClientRect()
    path.style.transition = `stroke-dashoffset ${anim.duration}ms ${anim.easing} ${anim.delay}ms`
    path.style.strokeDashoffset = '0'
    return () => {
      path.style.strokeDasharray = ''
      path.style.strokeDashoffset = ''
      path.style.transition = ''
    }
  }, [anim, lineD])

  // Hover: ref-based tooltip (zero re-renders)
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGRectElement>) => {
      if (data.length === 0) return
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect = e.currentTarget.getBoundingClientRect()
        const localX = e.clientX - rect.left
        const seconds = xScale.inverse(localX)

        // Find nearest data point
        let closest = data[0]
        let minDist = Infinity
        for (const pt of data) {
          const dist = Math.abs(Math.log(pt.seconds) - Math.log(seconds))
          if (dist < minDist) {
            minDist = dist
            closest = pt
          }
        }

        const cx = xScale(closest.seconds)
        const cy = yScale(closest.watts)

        if (dotRef.current) {
          dotRef.current.setAttribute('cx', `${cx}`)
          dotRef.current.setAttribute('cy', `${cy}`)
          dotRef.current.style.opacity = '1'
        }

        if (tooltipRef.current) {
          const label = `${formatDuration(closest.seconds)} — ${closest.watts}W`
          const text = tooltipRef.current.querySelector('text')
          const bg = tooltipRef.current.querySelector('rect')
          if (text) text.textContent = label
          const flip = cx > chartW * 0.7
          const tx = flip ? cx - 8 : cx + 8
          tooltipRef.current.setAttribute('transform', `translate(${tx},${cy - 12})`)
          if (text) text.setAttribute('text-anchor', flip ? 'end' : 'start')
          if (bg) {
            const bbox = text?.getBBox()
            if (bbox) {
              bg.setAttribute('x', `${flip ? bbox.x - 4 : bbox.x - 4}`)
              bg.setAttribute('y', `${bbox.y - 2}`)
              bg.setAttribute('width', `${bbox.width + 8}`)
              bg.setAttribute('height', `${bbox.height + 4}`)
            }
          }
          tooltipRef.current.style.opacity = '1'
        }
      })
    },
    [data, xScale, yScale, chartW],
  )

  const handlePointerLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    if (dotRef.current) dotRef.current.style.opacity = '0'
    if (tooltipRef.current) tooltipRef.current.style.opacity = '0'
  }, [])

  const strokeColor = color ?? 'var(--chart-1)'

  return (
    <svg
      width={width}
      height={height}
      className={cn('select-none', className)}
      viewBox={`0 0 ${width} ${height}`}
    >
      <g transform={`translate(${PADDING.left},${PADDING.top})`}>
        {/* Grid */}
        {grid && (
          <g className="text-(--n300)">
            {yTicks.map((t) => (
              <line
                key={`yg-${t}`}
                x1={0}
                x2={chartW}
                y1={yScale(t)}
                y2={yScale(t)}
                stroke="currentColor"
                strokeWidth={0.5}
                shapeRendering="crispEdges"
              />
            ))}
            {xTicks.map((t) => (
              <line
                key={`xg-${t}`}
                x1={xScale(t)}
                x2={xScale(t)}
                y1={0}
                y2={chartH}
                stroke="currentColor"
                strokeWidth={0.5}
                shapeRendering="crispEdges"
              />
            ))}
          </g>
        )}

        {/* Area fill */}
        {areaD && (
          <path d={areaD} fill={strokeColor} opacity={fillOpacity} shapeRendering="geometricPrecision" />
        )}

        {/* Line */}
        {lineD && (
          <path
            ref={lineRef}
            d={lineD}
            fill="none"
            stroke={strokeColor}
            strokeWidth={2}
            strokeLinejoin="round"
            strokeLinecap="round"
            shapeRendering="geometricPrecision"
          />
        )}

        {/* Peak dots */}
        {peaks?.map((pk) => (
          <circle
            key={pk.seconds}
            cx={xScale(pk.seconds)}
            cy={yScale(pk.watts)}
            r={3.5}
            fill={strokeColor}
            stroke="var(--n50)"
            strokeWidth={1.5}
            shapeRendering="geometricPrecision"
          />
        ))}

        {/* Hover dot */}
        <circle
          ref={dotRef}
          r={4}
          fill={strokeColor}
          stroke="var(--n50)"
          strokeWidth={2}
          style={{ opacity: 0, transition: 'opacity 80ms ease-out' }}
        />

        {/* Tooltip group */}
        <g ref={tooltipRef} style={{ opacity: 0, transition: 'opacity 80ms ease-out' }}>
          <rect rx={4} fill="var(--n100)" stroke="var(--n300)" strokeWidth={0.5} />
          <text
            className="text-[11px]"
            fill="var(--n1150)"
            fontFamily="Satoshi, sans-serif"
            fontWeight={500}
            dy="0.35em"
          />
        </g>

        {/* Hit area for hover */}
        <rect
          width={chartW}
          height={chartH}
          fill="transparent"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{ cursor: 'default' }}
        />

        {/* X axis labels */}
        {xTicks.map((t) => (
          <text
            key={`xl-${t}`}
            x={xScale(t)}
            y={chartH + 24}
            textAnchor="middle"
            className="text-[10px]"
            fill="var(--n600)"
            fontFamily="Satoshi, sans-serif"
            fontWeight={450}
          >
            {formatDuration(t)}
          </text>
        ))}

        {/* Y axis labels */}
        {yTicks.map((t) => (
          <text
            key={`yl-${t}`}
            x={-10}
            y={yScale(t)}
            textAnchor="end"
            dominantBaseline="middle"
            className="text-[10px]"
            fill="var(--n600)"
            fontFamily="Satoshi, sans-serif"
            fontWeight={450}
          >
            {t}W
          </text>
        ))}
      </g>
    </svg>
  )
}
