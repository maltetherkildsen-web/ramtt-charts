// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartSunburst — concentric rings showing hierarchy.
 *
 * Self-contained: renders its own `<svg>`, does NOT use ChartRoot.
 * Builds on existing arcPath() from lib/charts/paths/arc.ts.
 *
 * Usage:
 *   <ChartSunburst
 *     data={{
 *       name: 'Training',
 *       children: [
 *         { name: 'Cycling', value: 12, children: [...] },
 *         { name: 'Running', value: 5 },
 *       ]
 *     }}
 *     size={300}
 *     colors={['#3b82f6', '#22c55e', '#f59e0b']}
 *   />
 */

import { useMemo, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { arcPath } from '@/lib/charts/paths/arc'
import { sunburstLayout, type SunburstNode } from '@/lib/charts/layouts/sunburst'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'

// ─── Props ───

export interface ChartSunburstProps {
  data: SunburstNode
  /** Width & height in px. Default 300. */
  size?: number
  /** Fraction of total radius for center hole. Default 0.25. */
  innerRadius?: number
  colors?: string[]
  /** Gap between segments in degrees. Default 0.5. */
  padAngle?: number
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
  className?: string
}

// ─── Component ───

export function ChartSunburst({
  data,
  size = 300,
  innerRadius = 0.25,
  colors = [],
  padAngle = 0.5,
  animate = true,
  className,
}: ChartSunburstProps) {
  const cx = size / 2
  const cy = size / 2
  const outerR = size / 2 - 4
  const innerR = outerR * innerRadius

  const padRad = (padAngle * Math.PI) / 180

  const arcs = useMemo(
    () => sunburstLayout(data, padRad),
    [data, padRad],
  )

  // Compute max depth for ring width calculation
  const maxDepth = useMemo(
    () => arcs.reduce((m, a) => Math.max(m, a.depth), 0) + 1,
    [arcs],
  )

  const ringWidth = (outerR - innerR) / Math.max(1, maxDepth)

  // Default color assignment by top-level parent index
  const topLevelNames = useMemo(() => {
    const names: string[] = []
    for (const a of arcs) {
      if (a.depth === 0 && !names.includes(a.name)) names.push(a.name)
    }
    return names
  }, [arcs])

  function getColor(arc: typeof arcs[number]): string {
    if (arc.color) return arc.color
    // Inherit from top-level parent
    const rootName = arc.depth === 0 ? arc.name : arc.parent ?? arc.name
    const idx = topLevelNames.indexOf(rootName)
    if (idx >= 0 && colors[idx]) return colors[idx]
    return colors[idx % Math.max(1, colors.length)] ?? 'var(--chart-1)'
  }

  // Compute total value for center display
  const totalValue = useMemo(() => {
    return arcs
      .filter((a) => a.depth === 0)
      .reduce((s, a) => s + a.value, 0)
  }, [arcs])

  // Hover refs
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const centerNameRef = useRef<SVGTextElement | null>(null)
  const centerValueRef = useRef<SVGTextElement | null>(null)
  const currentIdx = useRef(-1)
  const rafId = useRef(0)

  const applyHighlight = useCallback((target: number) => {
    if (target === currentIdx.current) return
    currentIdx.current = target
    pathRefs.current.forEach((p, i) => {
      if (!p) return
      p.style.opacity = target === -1 || i === target ? '1' : '0.3'
    })
    if (centerNameRef.current && centerValueRef.current) {
      if (target === -1) {
        centerNameRef.current.textContent = data.name
        centerValueRef.current.textContent = String(totalValue)
      } else {
        const arc = arcs[target]
        centerNameRef.current.textContent = arc.name
        centerValueRef.current.textContent = String(arc.value)
      }
    }
  }, [arcs, data.name, totalValue])

  const handleMove = useCallback((e: React.PointerEvent<SVGCircleElement>) => {
    const svg = e.currentTarget.ownerSVGElement
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const px = (e.clientX - rect.left) * (size / rect.width) - cx
    const py = (e.clientY - rect.top) * (size / rect.height) - cy
    const dist = Math.sqrt(px * px + py * py)

    if (dist < innerR || dist > outerR + 4) {
      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => applyHighlight(-1))
      return
    }

    let angle = Math.atan2(px, -py)
    if (angle < 0) angle += 2 * Math.PI

    // Find which arc contains this angle + distance
    let idx = -1
    for (let i = arcs.length - 1; i >= 0; i--) {
      const a = arcs[i]
      const aInner = innerR + a.depth * ringWidth
      const aOuter = aInner + ringWidth
      if (dist >= aInner && dist <= aOuter && angle >= a.startAngle && angle <= a.endAngle) {
        idx = i
        break
      }
    }

    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyHighlight(idx))
  }, [arcs, cx, cy, innerR, outerR, size, ringWidth, applyHighlight])

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyHighlight(-1))
  }, [applyHighlight])

  // Animation
  const anim = resolveAnimate(animate, { duration: 500, delay: 0, easing: EASE_OUT_EXPO })
  const depthStagger = 120

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={cn(className)}
      shapeRendering="geometricPrecision"
    >
      {/* Arc segments */}
      {arcs.map((arc, i) => {
        const arcInner = innerR + arc.depth * ringWidth
        const arcOuter = arcInner + ringWidth - 1 // -1 for tiny gap between rings
        const d = arcPath(cx, cy, arcInner, arcOuter, arc.startAngle, arc.endAngle)
        const color = getColor(arc)
        // Deeper rings = slightly less opaque for visual hierarchy
        const depthOpacity = 1 - arc.depth * 0.12

        return (
          <path
            key={i}
            ref={(el) => { pathRefs.current[i] = el }}
            d={d}
            fill={color}
            fillOpacity={depthOpacity}
            style={{
              transition: 'opacity 150ms',
              pointerEvents: 'none',
              ...(anim.enabled
                ? { animation: `ramtt-dot-pop ${anim.duration}ms ${anim.easing} ${anim.delay + arc.depth * depthStagger}ms both` }
                : undefined),
            }}
          />
        )
      })}

      {/* Invisible overlay for pointer events */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR + 4}
        fill="transparent"
        onPointerMove={handleMove}
        onPointerLeave={handleLeave}
      />

      {/* Center text */}
      <text
        ref={centerNameRef}
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        fill="var(--n600)"
        fontSize={10}
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, pointerEvents: 'none' }}
      >
        {data.name}
      </text>
      <text
        ref={centerValueRef}
        x={cx}
        y={cy + 10}
        textAnchor="middle"
        fill="var(--n1150)"
        fontSize={18}
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums', pointerEvents: 'none' }}
      >
        {totalValue}
      </text>
    </svg>
  )
}
