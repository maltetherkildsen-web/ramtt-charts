// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartDonut — self-contained donut/pie chart.
 *
 * Does NOT use ChartRoot — renders its own <svg> with arc segments.
 * Supports hover highlight (slight outward translation along midpoint angle).
 */

import { useMemo, useRef, useCallback } from 'react'
import { arcPath, pieLayout } from '@/lib/charts/paths/arc'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'

export interface ChartDonutProps {
  data: readonly any[]
  valueAccessor: (d: any) => number
  labelAccessor?: (d: any) => string
  colors: readonly string[]
  /** Inner radius as fraction of outer. Default: 0.6 */
  innerRadius?: number
  /** Gap between segments in degrees. Default: 1.5 */
  padAngle?: number
  /** Width & height in px. Default: 220 */
  size?: number
  /** Center label (top line). */
  centerLabel?: string
  /** Center value (large text). */
  centerValue?: string
  className?: string
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
}

export function ChartDonut({
  data,
  valueAccessor,
  colors,
  innerRadius = 0.6,
  padAngle = 1.5,
  size = 220,
  centerLabel,
  centerValue,
  className,
  animate = true,
}: ChartDonutProps) {
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const rafRef = useRef<number>(0)
  const currentIdx = useRef<number>(-1)

  const outerR = size / 2 - 4 // leave room for hover expansion
  const innerR = outerR * innerRadius
  const cx = size / 2
  const cy = size / 2

  const padRad = (padAngle * Math.PI) / 180

  const slices = useMemo(
    () => pieLayout(data, valueAccessor, padRad),
    [data, valueAccessor, padRad],
  )

  const applyHighlight = useCallback((target: number) => {
    if (target === currentIdx.current) return
    currentIdx.current = target
    pathRefs.current.forEach((p, i) => {
      if (!p) return
      if (target === -1) {
        p.style.transform = 'translate(0,0)'
        p.style.opacity = '1'
      } else if (i === target) {
        const mid = (slices[i].startAngle + slices[i].endAngle) / 2
        p.style.transform = `translate(${(Math.sin(mid) * 5).toFixed(1)}px,${(-Math.cos(mid) * 5).toFixed(1)}px)`
        p.style.opacity = '1'
      } else {
        p.style.transform = 'translate(0,0)'
        p.style.opacity = '0.6'
      }
    })
  }, [slices])

  const handleSegmentPointer = useCallback((e: React.PointerEvent<SVGCircleElement>) => {
    const svg = e.currentTarget.ownerSVGElement
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const px = (e.clientX - rect.left) * (size / rect.width)
    const py = (e.clientY - rect.top) * (size / rect.height)
    const dx = px - cx
    const dy = py - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < innerR || dist > outerR + 8) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => applyHighlight(-1))
      return
    }
    let angle = Math.atan2(dx, -dy)
    if (angle < 0) angle += 2 * Math.PI
    let idx = -1
    for (let i = 0; i < slices.length; i++) {
      if (angle >= slices[i].startAngle && angle <= slices[i].endAngle) { idx = i; break }
    }
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => applyHighlight(idx))
  }, [slices, cx, cy, innerR, outerR, size, applyHighlight])

  const handleSegmentLeave = useCallback(() => {
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => applyHighlight(-1))
  }, [applyHighlight])

  const anim = resolveAnimate(animate, { duration: 500, delay: 0, easing: EASE_OUT_EXPO })
  const segmentStagger = 80

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      shapeRendering="geometricPrecision"
    >
      {slices.map((slice, i) => {
        const d = arcPath(cx, cy, innerR, outerR, slice.startAngle, slice.endAngle)
        return (
          <path
            key={i}
            ref={(el) => { pathRefs.current[i] = el }}
            d={d}
            fill={colors[i % colors.length]}
            style={{
              transformOrigin: `${cx}px ${cy}px`,
              transition: 'transform 200ms cubic-bezier(0.16,1,0.3,1), opacity 150ms ease-out',
              pointerEvents: 'none',
              ...(anim.enabled
                ? { animation: `ramtt-dot-pop ${anim.duration}ms ${anim.easing} ${anim.delay + i * segmentStagger}ms both` }
                : undefined),
            }}
          />
        )
      })}
      {/* Invisible overlay for pointer capture */}
      <circle
        cx={cx}
        cy={cy}
        r={outerR + 4}
        fill="transparent"
        onPointerMove={handleSegmentPointer}
        onPointerLeave={handleSegmentLeave}
      />

      {/* Center text */}
      {centerLabel && (
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          className="fill-(--n600) text-[9px]"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 550,
          }}
        >
          {centerLabel}
        </text>
      )}
      {centerValue && (
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          className="fill-(--n1150) text-[18px]"
          style={{
            fontFamily: "var(--font-sans)",
            fontWeight: 550,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {centerValue}
        </text>
      )}
    </svg>
  )
}
