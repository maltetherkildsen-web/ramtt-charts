// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartFunnel — vertical funnel / pipeline chart primitive.
 *
 * Self-contained: renders its own `<svg>`, does NOT use ChartRoot.
 * Each stage is a centered horizontal bar with width proportional
 * to its value relative to the first (largest) stage.
 *
 * Usage:
 *   <ChartFunnel
 *     data={[{ label: 'Leads', value: 1000, color: '#3b82f6' }, ...]}
 *   />
 */

import { useMemo, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

// ─── Props ───

export interface FunnelItem {
  label: string
  value: number
  color: string
}

export interface ChartFunnelProps {
  /** Funnel stages — first is widest. */
  data: FunnelItem[]
  /** Total width in pixels. Default 600. */
  width?: number
  /** Height in pixels. Default 300. */
  height?: number
  /** Tailwind classes on the wrapper. */
  className?: string
}

// ─── Component ───

export function ChartFunnel({
  data,
  width = 600,
  height = 300,
  className,
}: ChartFunnelProps) {
  const n = data.length
  const funnelW = 250
  const labelAreaLeft = width - funnelW - 20 // Right side for labels
  const funnelX = 20 // Left margin
  const segGap = 2
  const maxVal = data.length > 0 ? data[0].value : 1

  // Each segment as a trapezoid: top-wide to bottom-narrow
  const segments = useMemo(() => {
    if (n === 0) return []
    const totalGaps = (n - 1) * segGap
    const segH = (height - totalGaps - 16) / n // 16 for top/bottom padding
    const cx = funnelX + funnelW / 2

    return data.map((item, i) => {
      const fraction = item.value / maxVal
      // Dramatic taper: top ~90%, bottom ~20%
      const topW = funnelW * (i === 0 ? 0.92 : data[i].value / maxVal)
      const bottomW = funnelW * (i === n - 1 ? Math.max(0.18, fraction * 0.6) : (data[Math.min(i + 1, n - 1)].value / maxVal))
      const y = 8 + i * (segH + segGap)

      // Bezier path for slightly curved sides
      const topLeft = cx - topW / 2
      const topRight = cx + topW / 2
      const botLeft = cx - bottomW / 2
      const botRight = cx + bottomW / 2

      // Quadratic bezier — control point at midheight, slightly wider than avg
      const midY = y + segH / 2
      const cpLeftX = Math.min(topLeft, botLeft) - 2
      const cpRightX = Math.max(topRight, botRight) + 2

      const d = [
        `M ${topLeft.toFixed(1)} ${y.toFixed(1)}`,
        `L ${topRight.toFixed(1)} ${y.toFixed(1)}`,
        `Q ${cpRightX.toFixed(1)} ${midY.toFixed(1)} ${botRight.toFixed(1)} ${(y + segH).toFixed(1)}`,
        `L ${botLeft.toFixed(1)} ${(y + segH).toFixed(1)}`,
        `Q ${cpLeftX.toFixed(1)} ${midY.toFixed(1)} ${topLeft.toFixed(1)} ${y.toFixed(1)}`,
        'Z',
      ].join(' ')

      return { item, d, y, segH, cx, topRight, fraction, index: i }
    })
  }, [data, n, funnelW, funnelX, height, maxVal])

  // Conversion rates between stages
  const conversions = useMemo(() => {
    return data.slice(1).map((item, i) => {
      const prev = data[i].value
      return prev > 0 ? Math.round((item.value / prev) * 100) : 0
    })
  }, [data])

  // Refs for zero-rerender hover
  const stageRefs = useRef<(SVGGElement | null)[]>([])
  const convRefs = useRef<(SVGTextElement | null)[]>([])
  const currentIdx = useRef(-1)
  const rafId = useRef(0)

  const applyHighlight = useCallback((target: number) => {
    if (target === currentIdx.current) return
    currentIdx.current = target

    stageRefs.current.forEach((g, i) => {
      if (!g) return
      g.style.opacity = target === -1 || i === target ? '1' : '0.35'
    })
    convRefs.current.forEach((t, i) => {
      if (!t) return
      t.style.opacity = target === -1 || i === target || i === target - 1 ? '1' : '0.35'
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

  // Chart colors from palette
  const chartColors = [
    'var(--chart-1)', 'var(--chart-2)', 'var(--chart-3)',
    'var(--chart-4)', 'var(--chart-5)', 'var(--chart-6)',
    'var(--chart-7)', 'var(--chart-8)',
  ]

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn(className)}
    >
      {segments.map((seg, i) => {
        const labelX = funnelX + funnelW + 20
        const labelY = seg.y + seg.segH / 2
        const pct = Math.round((seg.item.value / maxVal) * 100)

        return (
          <g
            key={seg.item.label}
            ref={(el) => { stageRefs.current[i] = el }}
            style={{ transition: 'opacity 200ms' }}
            onPointerEnter={() => handleEnter(i)}
            onPointerLeave={handleLeave}
          >
            {/* Funnel segment */}
            <path
              d={seg.d}
              fill={seg.item.color || chartColors[i % chartColors.length]}
              opacity={0.8}
              shapeRendering="geometricPrecision"
            />

            {/* Connecting line to label */}
            <line
              x1={seg.topRight + 4}
              y1={labelY}
              x2={labelX - 6}
              y2={labelY}
              stroke="var(--n400)"
              strokeWidth={0.5}
              shapeRendering="crispEdges"
            />

            {/* Label: "Stage — 1,234 (45%)" */}
            <text
              x={labelX}
              y={labelY - 1}
              dominantBaseline="central"
              fill="var(--n800)"
              fontSize={13}
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 450 }}
            >
              {seg.item.label}
              <tspan dx={8} fill="var(--n1150)" style={{ fontWeight: 550, fontVariantNumeric: 'tabular-nums' }}>
                {seg.item.value.toLocaleString()}
              </tspan>
              <tspan dx={4} fill="var(--n600)" fontSize={11} style={{ fontWeight: 400 }}>
                ({pct}%)
              </tspan>
            </text>
          </g>
        )
      })}

      {/* Conversion rates between stages */}
      {conversions.map((pct, i) => {
        if (!segments[i] || !segments[i + 1]) return null
        const y1 = segments[i].y + segments[i].segH
        const y2 = segments[i + 1].y
        const midY = (y1 + y2) / 2 + 1
        const labelX = funnelX + funnelW + 20

        return (
          <text
            key={i}
            fontFamily="'Satoshi', sans-serif"
            ref={(el) => { convRefs.current[i] = el }}
            x={labelX}
            y={midY}
            dominantBaseline="central"
            fill="var(--n600)"
            fontSize={11}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontVariantNumeric: 'tabular-nums', transition: 'opacity 200ms' }}
          >
            → {pct}%
          </text>
        )
      })}
    </svg>
  )
}
