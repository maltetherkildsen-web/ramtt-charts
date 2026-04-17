// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartPyramid — stacked trapezoids, widest at bottom, narrowest at top.
 *
 * Self-contained: renders its own `<svg>`, does NOT use ChartRoot.
 *
 * Usage:
 *   <ChartPyramid
 *     data={[
 *       { label: 'Z1 Recovery', value: 420 },
 *       { label: 'Z2 Endurance', value: 280 },
 *       ...
 *     ]}
 *     colors={['#94a3b8', '#22c55e', '#eab308', '#f97316', '#ef4444']}
 *   />
 */

import { useMemo, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'

// ─── Types ───

export interface PyramidItem {
  label: string
  value: number
  color?: string
}

export interface ChartPyramidProps {
  data: PyramidItem[]
  width?: number
  height?: number
  colors?: string[]
  /** Gap between segments in px. Default 2. */
  gap?: number
  /** Minimum width fraction at the narrowest point. Default 0.15. */
  neckWidth?: number
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
  className?: string
}

// ─── Component ───

export function ChartPyramid({
  data,
  width = 400,
  height = 350,
  colors = [],
  gap = 1,
  neckWidth = 0.1,
  animate = true,
  className,
}: ChartPyramidProps) {
  const labelPadRight = 140
  const chartW = width - labelPadRight
  const maxW = Math.min(chartW, 300) // Keep pyramid narrow
  const offsetX = (chartW - maxW) / 2 // Center the pyramid
  const maxVal = useMemo(() => Math.max(...data.map((d) => d.value), 1), [data])
  const totalVal = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data])

  // Segments: reversed order (narrowest at top, widest at bottom)
  // Heights proportional to value — Z1 is much taller than Z6
  const segments = useMemo(() => {
    const n = data.length
    if (n === 0) return []

    const totalGaps = (n - 1) * gap
    const availH = height - totalGaps

    // Heights proportional to value
    const heights = data.map((item) => Math.max(8, (item.value / totalVal) * availH))

    // Reversed order: data[n-1] (narrowest) at top, data[0] (widest) at bottom
    const reversed = [...data].map((_, i) => n - 1 - i) // visual order indices

    let cumulativeY = 0
    const result = reversed.map((dataIdx) => {
      const item = data[dataIdx]
      const segH = heights[dataIdx]
      const y = cumulativeY
      cumulativeY += segH + gap

      const fraction = item.value / maxVal
      const w = (neckWidth + (1 - neckWidth) * fraction) * maxW
      const x = offsetX + (maxW - w) / 2

      const color = item.color ?? colors[dataIdx % Math.max(1, colors.length)] ?? 'var(--chart-1)'
      const pct = Math.round((item.value / totalVal) * 100)

      return { item, x, y, w, h: segH, color, index: dataIdx, visualIdx: n - 1 - dataIdx, pct }
    })

    return result
  }, [data, maxW, offsetX, height, gap, neckWidth, maxVal, totalVal, colors])

  // Hover refs
  const segRefs = useRef<(SVGGElement | null)[]>([])
  const currentIdx = useRef(-1)
  const rafId = useRef(0)

  const applyHighlight = useCallback((target: number) => {
    if (target === currentIdx.current) return
    currentIdx.current = target
    segRefs.current.forEach((g, i) => {
      if (!g) return
      g.style.opacity = target === -1 || i === target ? '1' : '0.35'
    })
  }, [])

  const handleEnter = useCallback((idx: number) => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyHighlight(idx))
  }, [applyHighlight])

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyHighlight(-1))
  }, [applyHighlight])

  // Animation
  const anim = resolveAnimate(animate, { duration: 500, delay: 0, easing: EASE_OUT_EXPO })

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn(className)}
    >
      {segments.map((seg) => {
        const centerX = offsetX + maxW / 2
        const centerY = seg.y + seg.h / 2
        const labelX = chartW + 12
        const labelY = seg.y + seg.h / 2

        return (
          <g
            key={seg.index}
            ref={(el) => { segRefs.current[seg.index] = el }}
            style={{
              transition: 'opacity 200ms',
              ...(anim.enabled
                ? {
                    transformOrigin: `${centerX}px ${centerY}px`,
                    animation: `ramtt-dot-pop ${anim.duration}ms ${anim.easing} ${anim.delay + seg.visualIdx * 60}ms both`,
                  }
                : undefined),
            }}
            onPointerEnter={() => handleEnter(seg.index)}
            onPointerLeave={handleLeave}
          >
            {/* Segment */}
            <rect
              x={seg.x}
              y={seg.y}
              width={seg.w}
              height={seg.h}
              rx={2}
              ry={2}
              fill={seg.color}
              opacity={0.7}
              shapeRendering="geometricPrecision"
            />

            {/* Connecting line to label */}
            <line
              x1={seg.x + seg.w}
              y1={labelY}
              x2={labelX - 4}
              y2={labelY}
              stroke="var(--n400)"
              strokeWidth={0.5}
              shapeRendering="crispEdges"
            />

            {/* Label */}
            <text
              x={labelX}
              y={labelY - 6}
              fill="var(--n800)"
              fontSize={12}
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 450 }}
            >
              {seg.item.label}
            </text>
            {/* Percentage */}
            <text
              x={labelX}
              y={labelY + 8}
              fill="var(--n1150)"
              fontSize={12}
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums' }}
            >
              {seg.pct}%
            </text>
          </g>
        )
      })}
    </svg>
  )
}
