// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartValueTracker — animated horizontal reference line that follows
 * the hovered bar/data point value.
 *
 * Animates smoothly to the Y position of the hovered value. Shows a
 * colored value pill on the left edge. Fades out on mouse leave.
 *
 * Usage:
 *   <ChartRoot data={values}>
 *     <ChartBar ... />
 *     <ChartValueTracker formatValue={(v) => `$${v}k`} />
 *   </ChartRoot>
 */

import { useRef, useEffect, useCallback, useId } from 'react'
import { createPortal } from 'react-dom'
import { bisectNearest } from '@/lib/charts/utils/bisect'
import { useChart } from './chart-context'

export interface ChartValueTrackerProps {
  /** Format the value label. Default: toLocaleString */
  formatValue?: (v: number) => string
  /** Line/label color. Default: var(--chart-1) */
  color?: string
}

export function ChartValueTracker({
  formatValue = (v) => v.toLocaleString(),
  color = 'var(--chart-1)',
}: ChartValueTrackerProps) {
  const { data, scaleX, scaleY, chartWidth, padding, svgRef } = useChart()

  const lineRef = useRef<SVGLineElement>(null)
  const pillRef = useRef<SVGGElement>(null)
  const pillBgRef = useRef<SVGRectElement>(null)
  const pillTextRef = useRef<SVGTextElement>(null)
  const rafRef = useRef<number>(0)
  const lastIdx = useRef<number>(-1)

  const pixelXs = useRef<number[]>([])
  useEffect(() => {
    const xs = new Array(data.length)
    for (let i = 0; i < data.length; i++) xs[i] = scaleX(i)
    pixelXs.current = xs
  }, [data.length, scaleX])

  const showAt = useCallback((idx: number) => {
    const line = lineRef.current
    const pill = pillRef.current
    const bg = pillBgRef.current
    const text = pillTextRef.current
    if (!line || !pill || !bg || !text) return

    const py = scaleY(data[idx])
    const formatted = formatValue(data[idx])

    // Animate line via CSS transform (GPU-accelerated)
    line.style.transform = `translateY(${py}px)`
    line.style.opacity = '1'

    // Position pill
    text.textContent = formatted
    pill.style.transform = `translateY(${py}px)`
    pill.style.opacity = '1'

    // Size bg to fit text
    requestAnimationFrame(() => {
      const bbox = text.getBBox()
      bg.setAttribute('x', String(-bbox.width - 14))
      bg.setAttribute('y', String(-bbox.height / 2 - 3))
      bg.setAttribute('width', String(bbox.width + 12))
      bg.setAttribute('height', String(bbox.height + 6))
    })
  }, [data, scaleY, formatValue])

  const hide = useCallback(() => {
    if (lineRef.current) lineRef.current.style.opacity = '0'
    if (pillRef.current) pillRef.current.style.opacity = '0'
    lastIdx.current = -1
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || data.length === 0) return

    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect = svg.getBoundingClientRect()
        const mx = e.clientX - rect.left - padding.left
        const idx = bisectNearest(pixelXs.current, mx)
        if (idx < 0 || idx >= data.length) { hide(); return }
        if (idx === lastIdx.current) return
        lastIdx.current = idx
        showAt(idx)
      })
    }

    const handleLeave = () => {
      cancelAnimationFrame(rafRef.current)
      hide()
    }

    svg.addEventListener('mousemove', handleMove)
    svg.addEventListener('mouseleave', handleLeave)
    return () => {
      cancelAnimationFrame(rafRef.current)
      svg.removeEventListener('mousemove', handleMove)
      svg.removeEventListener('mouseleave', handleLeave)
    }
  }, [data, padding.left, svgRef, showAt, hide])

  return (
    <g className="pointer-events-none">
      {/* Animated horizontal line */}
      <line
        ref={lineRef}
        x1={0}
        y1={0}
        x2={chartWidth}
        y2={0}
        stroke="var(--n600)"
        strokeWidth={0.5}
        strokeDasharray="4 3"
        shapeRendering="crispEdges"
        style={{
          opacity: 0,
          transition: 'transform 200ms cubic-bezier(0.16,1,0.3,1), opacity 150ms ease-out',
        }}
      />
      {/* Value pill on left edge */}
      <g
        ref={pillRef}
        style={{
          opacity: 0,
          transition: 'transform 200ms cubic-bezier(0.16,1,0.3,1), opacity 150ms ease-out',
        }}
      >
        <rect
          ref={pillBgRef}
          rx={4}
          fill={color}
        />
        <text
          ref={pillTextRef}
          x={-8}
          textAnchor="end"
          dy="0.35em"
          fill="var(--n50)"
          fontSize={11}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums' }}
        />
      </g>
    </g>
  )
}
