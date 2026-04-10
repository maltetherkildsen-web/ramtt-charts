// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartRadialBar — concentric ring progress chart primitive.
 *
 * Self-contained: renders its own `<svg>`, does NOT use ChartRoot.
 * Each ring shows progress toward a goal (value/max).
 * Apple Watch rings style with track + fill arcs.
 *
 * Usage:
 *   <ChartRadialBar
 *     items={[
 *       { label: 'Move', value: 420, max: 500, color: '#ef4444' },
 *       { label: 'Exercise', value: 28, max: 30, color: '#22c55e' },
 *     ]}
 *   />
 */

import { useMemo, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { arcPath } from '@/lib/charts/paths/arc'

// ─── Props ───

export interface RadialBarItem {
  label: string
  value: number
  max: number
  color: string
}

export interface ChartRadialBarProps {
  /** Ring items — outermost first. */
  items: RadialBarItem[]
  /** Size in pixels. Default 240. */
  size?: number
  /** Width of each ring in px. Default 12. */
  trackWidth?: number
  /** Gap between rings in px. Default 6. */
  gap?: number
  /** Tailwind classes on the wrapper. */
  className?: string
}

// ─── Component ───

export function ChartRadialBar({
  items,
  size = 240,
  trackWidth = 12,
  gap = 6,
  className,
}: ChartRadialBarProps) {
  const cx = size / 2
  const cy = size / 2
  const outerPad = 8

  // Refs for zero-rerender hover
  const ringRefs = useRef<(SVGGElement | null)[]>([])
  const centerNameRef = useRef<SVGTextElement>(null)
  const centerValueRef = useRef<SVGTextElement>(null)
  const centerPctRef = useRef<SVGTextElement>(null)
  const currentIdx = useRef(-1)
  const rafId = useRef(0)

  // Compute ring geometries
  const rings = useMemo(() => {
    return items.map((item, i) => {
      const outerR = size / 2 - outerPad - i * (trackWidth + gap)
      const innerR = outerR - trackWidth
      const fraction = Math.min(1, item.value / item.max)
      const fillEnd = fraction * 2 * Math.PI

      // Track: full circle
      const trackD = arcPath(cx, cy, innerR, outerR, 0, 2 * Math.PI - 0.001)

      // Fill arc (0 to fraction)
      const fillD = fillEnd > 0.01
        ? arcPath(cx, cy, innerR, outerR, 0, fillEnd)
        : ''

      // Round end-caps — small circles at start and end of fill arc
      const midR = (innerR + outerR) / 2
      const capR = trackWidth / 2
      // Start cap: at angle 0 (top)
      const startCapX = cx + midR * Math.sin(0)
      const startCapY = cy - midR * Math.cos(0)
      // End cap: at fillEnd
      const endCapX = cx + midR * Math.sin(fillEnd)
      const endCapY = cy - midR * Math.cos(fillEnd)

      return {
        item,
        outerR,
        innerR,
        trackD,
        fillD,
        startCap: { x: startCapX, y: startCapY, r: capR },
        endCap: { x: endCapX, y: endCapY, r: capR },
        hasFill: fillEnd > 0.01,
      }
    })
  }, [items, cx, cy, size, trackWidth, gap, outerPad])

  // Total percentage for default center text
  const totalPct = useMemo(() => {
    const totalVal = items.reduce((s, it) => s + it.value, 0)
    const totalMax = items.reduce((s, it) => s + it.max, 0)
    return totalMax > 0 ? Math.round((totalVal / totalMax) * 100) : 0
  }, [items])

  const applyHighlight = useCallback((target: number) => {
    if (target === currentIdx.current) return
    currentIdx.current = target

    ringRefs.current.forEach((g, i) => {
      if (!g) return
      if (target === -1) {
        g.style.opacity = '1'
      } else {
        g.style.opacity = i === target ? '1' : '0.35'
      }
    })

    if (target === -1) {
      if (centerNameRef.current) centerNameRef.current.textContent = 'Progress'
      if (centerValueRef.current) centerValueRef.current.textContent = `${totalPct}%`
      if (centerPctRef.current) centerPctRef.current.textContent = ''
    } else {
      const it = items[target]
      const pct = Math.round((it.value / it.max) * 100)
      if (centerNameRef.current) centerNameRef.current.textContent = it.label
      if (centerValueRef.current) centerValueRef.current.textContent = `${it.value} / ${it.max}`
      if (centerPctRef.current) centerPctRef.current.textContent = `${pct}%`
    }
  }, [items, totalPct])

  const handleRingEnter = useCallback((idx: number) => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyHighlight(idx))
  }, [applyHighlight])

  const handleRingLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyHighlight(-1))
  }, [applyHighlight])

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn(className)}
      shapeRendering="geometricPrecision"
    >
      {rings.map((ring, i) => (
        <g
          key={ring.item.label}
          ref={(el) => { ringRefs.current[i] = el }}
          style={{ transition: 'opacity 200ms' }}
          onPointerEnter={() => handleRingEnter(i)}
          onPointerLeave={handleRingLeave}
        >
          {/* Track */}
          <path d={ring.trackD} fill="var(--n200)" />
          {/* Fill */}
          {ring.hasFill && (
            <>
              <path d={ring.fillD} fill={ring.item.color} />
              {/* Round end-caps */}
              <circle
                cx={ring.startCap.x}
                cy={ring.startCap.y}
                r={ring.startCap.r}
                fill={ring.item.color}
              />
              <circle
                cx={ring.endCap.x}
                cy={ring.endCap.y}
                r={ring.endCap.r}
                fill={ring.item.color}
              />
            </>
          )}
        </g>
      ))}

      {/* Center text */}
      <text
        ref={centerNameRef}
        x={cx}
        y={cy - 14}
        textAnchor="middle"
        fill="var(--n600)"
        fontSize={10}
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, pointerEvents: 'none' }}
      >
        Progress
      </text>
      <text
        ref={centerValueRef}
        x={cx}
        y={cy + 6}
        textAnchor="middle"
        fill="var(--n1150)"
        fontSize={22}
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums', pointerEvents: 'none' }}
      >
        {totalPct}%
      </text>
      <text
        ref={centerPctRef}
        x={cx}
        y={cy + 22}
        textAnchor="middle"
        fill="var(--n600)"
        fontSize={11}
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, fontVariantNumeric: 'tabular-nums', pointerEvents: 'none' }}
      />
    </svg>
  )
}
