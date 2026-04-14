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
  gap = 2,
  neckWidth = 0.15,
  animate = true,
  className,
}: ChartPyramidProps) {
  const labelPadRight = 120
  const chartW = width - labelPadRight
  const maxVal = useMemo(() => Math.max(...data.map((d) => d.value), 1), [data])

  // Segments are ordered top-to-bottom (index 0 = top / narrowest)
  // Data is provided widest-first (Z1 at index 0), but pyramid is widest at bottom
  // So we render in reverse: last item at bottom (widest)
  const segments = useMemo(() => {
    const n = data.length
    if (n === 0) return []

    const totalGaps = (n - 1) * gap
    const segH = (height - totalGaps) / n

    return data.map((item, i) => {
      // i=0 is widest (bottom), i=n-1 is narrowest (top)
      // Render bottom to top, so visual position: bottom item at bottom of SVG
      const visualIdx = n - 1 - i // flip: data[0] goes to bottom
      const y = visualIdx * (segH + gap)

      const fraction = item.value / maxVal
      const w = (neckWidth + (1 - neckWidth) * fraction) * chartW
      const x = (chartW - w) / 2

      const color = item.color ?? colors[i % Math.max(1, colors.length)] ?? 'var(--chart-1)'

      return { item, x, y, w, h: segH, color, index: i, visualIdx }
    })
  }, [data, chartW, height, gap, neckWidth, maxVal, colors])

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
        const centerX = chartW / 2
        const centerY = seg.y + seg.h / 2

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
            {/* Trapezoid segment */}
            <rect
              x={seg.x}
              y={seg.y}
              width={seg.w}
              height={seg.h}
              rx={3}
              ry={3}
              fill={seg.color}
            />

            {/* Label + value to the right */}
            <text
              x={chartW + 12}
              y={seg.y + seg.h / 2 - 6}
              fill="var(--n1050)"
              fontSize={12}
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 450 }}
            >
              {seg.item.label}
            </text>
            <text
              x={chartW + 12}
              y={seg.y + seg.h / 2 + 8}
              fill="var(--n1150)"
              fontSize={12}
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums' }}
            >
              {seg.item.value.toLocaleString()}
            </text>
          </g>
        )
      })}
    </svg>
  )
}
