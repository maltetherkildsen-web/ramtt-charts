// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartPMC — Performance Management Chart.
 *
 * Self-contained SVG rendering CTL (fitness), ATL (fatigue), TSB (form)
 * as lines with daily load as bars. Time-based X axis.
 *
 * Standard PMC colors:
 *   CTL (fitness) = blue
 *   ATL (fatigue) = red/pink
 *   TSB (form) = gold/yellow
 *   Daily load bars = neutral
 *
 * Hover via ref-based DOM manipulation (zero re-renders per RULES.md).
 */

import { useMemo, useRef, useCallback } from 'react'
import { scaleLinear } from '@/lib/charts/scales/linear'
import { scaleTime, formatTimeTick } from '@/lib/charts/scales/time'
import { linePath } from '@/lib/charts/paths/line'
import { niceTicks } from '@/lib/charts/ticks/nice'
import { cn } from '@/lib/utils'

export interface PMCDay {
  date: Date | number
  ctl: number
  atl: number
  tsb: number
  load: number
}

export interface ChartPMCProps {
  /** Daily PMC data. */
  data: readonly PMCDay[]
  /** Width in px. Default: 800. */
  width?: number
  /** Height in px. Default: 360. */
  height?: number
  /** CTL line color. Default: #4A90D9 (blue). */
  ctlColor?: string
  /** ATL line color. Default: #E05D6F (red/pink). */
  atlColor?: string
  /** TSB line color. Default: #D4A843 (gold). */
  tsbColor?: string
  /** Show daily load bars. Default: true. */
  showBars?: boolean
  /** Show grid lines. Default: true. */
  grid?: boolean
  className?: string
}

const PADDING = { top: 20, right: 24, bottom: 44, left: 52 }

export function ChartPMC({
  data,
  width = 800,
  height = 360,
  ctlColor = '#4A90D9',
  atlColor = '#E05D6F',
  tsbColor = '#D4A843',
  showBars = true,
  grid = true,
  className,
}: ChartPMCProps) {
  const chartW = width - PADDING.left - PADDING.right
  const chartH = height - PADDING.top - PADDING.bottom

  const tooltipRef = useRef<SVGGElement>(null)
  const crosshairRef = useRef<SVGLineElement>(null)
  const rafRef = useRef(0)

  const { xScale, yScale, loadScale, xTicks, yTicks } = useMemo(() => {
    if (data.length === 0) {
      return {
        xScale: scaleTime([Date.now(), Date.now() + 86400000], [0, chartW]),
        yScale: scaleLinear([-20, 100], [chartH, 0]),
        loadScale: scaleLinear([0, 200], [chartH, chartH * 0.5]),
        xTicks: [] as Date[],
        yTicks: [] as number[],
      }
    }

    const dates = data.map((d) => typeof d.date === 'number' ? d.date : d.date.getTime())
    const minDate = Math.min(...dates)
    const maxDate = Math.max(...dates)

    const allVals = [...data.map((d) => d.ctl), ...data.map((d) => d.atl), ...data.map((d) => d.tsb)]
    const yMin = Math.min(0, Math.floor(Math.min(...allVals) / 10) * 10 - 10)
    const yMax = Math.ceil(Math.max(...allVals) / 10) * 10 + 10
    const maxLoad = Math.max(...data.map((d) => d.load), 1)

    const xs = scaleTime([minDate, maxDate], [0, chartW])

    return {
      xScale: xs,
      yScale: scaleLinear([yMin, yMax], [chartH, 0]),
      loadScale: scaleLinear([0, maxLoad * 2], [chartH, 0]),
      xTicks: xs.ticks(8),
      yTicks: niceTicks(yMin, yMax, 6),
    }
  }, [data, chartW, chartH])

  // Build line paths
  const { ctlD, atlD, tsbD } = useMemo(() => {
    if (data.length === 0) return { ctlD: '', atlD: '', tsbD: '' }

    const toX = (d: PMCDay) => xScale(d.date)

    return {
      ctlD: linePath(data as PMCDay[], toX, (d) => yScale(d.ctl)),
      atlD: linePath(data as PMCDay[], toX, (d) => yScale(d.atl)),
      tsbD: linePath(data as PMCDay[], toX, (d) => yScale(d.tsb)),
    }
  }, [data, xScale, yScale])

  // Bar width
  const barW = data.length > 1
    ? Math.max(1, (chartW / data.length) * 0.6)
    : 4

  // Zero line Y position
  const zeroY = yScale(0)

  // Hover handler
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGRectElement>) => {
      if (data.length === 0) return
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect = e.currentTarget.getBoundingClientRect()
        const localX = e.clientX - rect.left
        const hoverDate = xScale.inverse(localX).getTime()

        // Find nearest day
        let closest = data[0]
        let minDist = Infinity
        for (const d of data) {
          const t = typeof d.date === 'number' ? d.date : d.date.getTime()
          const dist = Math.abs(t - hoverDate)
          if (dist < minDist) {
            minDist = dist
            closest = d
          }
        }

        const cx = xScale(closest.date)

        if (crosshairRef.current) {
          crosshairRef.current.setAttribute('x1', `${cx}`)
          crosshairRef.current.setAttribute('x2', `${cx}`)
          crosshairRef.current.style.opacity = '1'
        }

        if (tooltipRef.current) {
          const dateStr = new Date(typeof closest.date === 'number' ? closest.date : closest.date.getTime())
            .toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
          const text = tooltipRef.current.querySelector('text')
          if (text) {
            text.innerHTML = ''
            const lines = [
              dateStr,
              `CTL ${closest.ctl.toFixed(0)}`,
              `ATL ${closest.atl.toFixed(0)}`,
              `TSB ${closest.tsb.toFixed(0)}`,
              closest.load > 0 ? `Load ${closest.load.toFixed(0)}` : '',
            ].filter(Boolean)

            lines.forEach((line, i) => {
              const tspan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan')
              tspan.setAttribute('x', '0')
              tspan.setAttribute('dy', i === 0 ? '0' : '14')
              tspan.textContent = line
              text.appendChild(tspan)
            })
          }

          const flip = cx > chartW * 0.7
          tooltipRef.current.setAttribute(
            'transform',
            `translate(${flip ? cx - 12 : cx + 12},${PADDING.top + 8})`,
          )
          if (text) text.setAttribute('text-anchor', flip ? 'end' : 'start')
          tooltipRef.current.style.opacity = '1'
        }
      })
    },
    [data, xScale, chartW],
  )

  const handlePointerLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    if (crosshairRef.current) crosshairRef.current.style.opacity = '0'
    if (tooltipRef.current) tooltipRef.current.style.opacity = '0'
  }, [])

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
          </g>
        )}

        {/* Zero line */}
        <line
          x1={0}
          x2={chartW}
          y1={zeroY}
          y2={zeroY}
          stroke="var(--n500)"
          strokeWidth={0.5}
          strokeDasharray="3 3"
          shapeRendering="crispEdges"
        />

        {/* Daily load bars */}
        {showBars && data.map((d, i) => {
          const x = xScale(d.date)
          const barH = chartH - loadScale(d.load)
          if (barH <= 0) return null
          return (
            <rect
              key={i}
              x={x - barW / 2}
              y={chartH - barH}
              width={barW}
              height={barH}
              fill="var(--n400)"
              opacity={0.25}
              rx={0.5}
              shapeRendering="geometricPrecision"
            />
          )
        })}

        {/* CTL line (fitness — blue) */}
        {ctlD && (
          <path
            d={ctlD}
            fill="none"
            stroke={ctlColor}
            strokeWidth={2}
            strokeLinejoin="round"
            shapeRendering="geometricPrecision"
          />
        )}

        {/* ATL line (fatigue — red) */}
        {atlD && (
          <path
            d={atlD}
            fill="none"
            stroke={atlColor}
            strokeWidth={2}
            strokeLinejoin="round"
            shapeRendering="geometricPrecision"
          />
        )}

        {/* TSB line (form — gold) */}
        {tsbD && (
          <path
            d={tsbD}
            fill="none"
            stroke={tsbColor}
            strokeWidth={1.5}
            strokeLinejoin="round"
            strokeDasharray="4 3"
            shapeRendering="geometricPrecision"
          />
        )}

        {/* Crosshair */}
        <line
          ref={crosshairRef}
          y1={0}
          y2={chartH}
          stroke="var(--n600)"
          strokeWidth={0.5}
          style={{ opacity: 0, transition: 'opacity 80ms ease-out' }}
        />

        {/* Tooltip */}
        <g ref={tooltipRef} style={{ opacity: 0, transition: 'opacity 80ms ease-out' }}>
          <text
            className="text-[10px]"
            fill="var(--n1150)"
            fontFamily="Satoshi, sans-serif"
            fontWeight={450}
          />
        </g>

        {/* Hit area */}
        <rect
          width={chartW}
          height={chartH}
          fill="transparent"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
          style={{ cursor: 'default' }}
        />

        {/* X axis labels */}
        {xTicks.map((t, i) => (
          <text
            key={i}
            x={xScale(t)}
            y={chartH + 24}
            textAnchor="middle"
            className="text-[10px]"
            fill="var(--n600)"
            fontFamily="Satoshi, sans-serif"
            fontWeight={450}
          >
            {formatTimeTick(t, data.length > 1
              ? (typeof data[data.length - 1].date === 'number' ? data[data.length - 1].date as number : (data[data.length - 1].date as Date).getTime())
                - (typeof data[0].date === 'number' ? data[0].date as number : (data[0].date as Date).getTime())
              : 86400000,
            )}
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
            {t}
          </text>
        ))}

        {/* Legend */}
        <g transform={`translate(${chartW - 180},-8)`}>
          {[
            { color: ctlColor, label: 'CTL (fitness)' },
            { color: atlColor, label: 'ATL (fatigue)' },
            { color: tsbColor, label: 'TSB (form)', dashed: true },
          ].map((item, i) => (
            <g key={item.label} transform={`translate(${i * 64},0)`}>
              <line
                x1={0}
                x2={12}
                y1={0}
                y2={0}
                stroke={item.color}
                strokeWidth={2}
                strokeDasharray={item.dashed ? '3 2' : undefined}
              />
              <text
                x={15}
                y={0}
                dominantBaseline="middle"
                className="text-[9px]"
                fill="var(--n700)"
                fontFamily="Satoshi, sans-serif"
                fontWeight={450}
              >
                {item.label}
              </text>
            </g>
          ))}
        </g>
      </g>
    </svg>
  )
}
