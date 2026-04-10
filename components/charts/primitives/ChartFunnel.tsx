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
  const barH = 36
  const barGap = 6
  const labelPadLeft = 100
  const valuePadRight = 80
  const chartW = width - labelPadLeft - valuePadRight
  const maxVal = data.length > 0 ? data[0].value : 1

  const bars = useMemo(() => {
    return data.map((item, i) => {
      const fraction = item.value / maxVal
      const w = Math.max(4, fraction * chartW)
      const x = labelPadLeft + (chartW - w) / 2
      const y = i * (barH + barGap) + 8
      return { item, x, y, w, fraction }
    })
  }, [data, chartW, maxVal, labelPadLeft])

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
      // Show conversion text between hovered stage and next, or hovered and previous
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

  const svgH = Math.max(height, data.length * (barH + barGap) + 16)

  return (
    <svg
      width={width}
      height={svgH}
      viewBox={`0 0 ${width} ${svgH}`}
      className={cn(className)}
    >
      {bars.map((b, i) => (
        <g
          key={b.item.label}
          ref={(el) => { stageRefs.current[i] = el }}
          style={{ transition: 'opacity 200ms' }}
          onPointerEnter={() => handleEnter(i)}
          onPointerLeave={handleLeave}
        >
          {/* Bar */}
          <rect
            x={b.x}
            y={b.y}
            width={b.w}
            height={barH}
            rx={3}
            ry={3}
            fill={b.item.color}
          />
          {/* Label (left of bar) */}
          <text
            x={labelPadLeft - 10}
            y={b.y + barH / 2}
            textAnchor="end"
            dominantBaseline="central"
            fill="var(--n1050)"
            fontSize={13}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 450 }}
          >
            {b.item.label}
          </text>
          {/* Value (right of bar) */}
          <text
            x={labelPadLeft + chartW + 10}
            y={b.y + barH / 2}
            textAnchor="start"
            dominantBaseline="central"
            fill="var(--n1150)"
            fontSize={13}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums' }}
          >
            {b.item.value.toLocaleString()}
          </text>
        </g>
      ))}
      {/* Conversion rate labels between stages */}
      {conversions.map((pct, i) => {
        const y1 = bars[i].y + barH
        const y2 = bars[i + 1].y
        const midY = (y1 + y2) / 2 + 1
        return (
          <text key={i} ref={(el) => { convRefs.current[i] = el }} x={labelPadLeft + chartW / 2} y={midY} textAnchor="middle" dominantBaseline="central" fill="var(--n600)" fontSize={10} fontFamily="var(--font-sans)" style={{ fontWeight: 400, fontVariantNumeric: 'tabular-nums', transition: 'opacity 200ms' }}>
            {pct}%
          </text>
        )
      })}
    </svg>
  )
}
