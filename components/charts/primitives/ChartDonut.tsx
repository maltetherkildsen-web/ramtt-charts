// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartDonut — self-contained donut/pie chart.
 *
 * Does NOT use ChartRoot — renders its own <svg> with arc segments.
 * Supports hover highlight (slight outward translation along midpoint angle).
 */

import { useMemo, useRef, useCallback, useEffect } from 'react'
import { arcPath, pieLayout } from '@/lib/charts/paths/arc'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'

export interface ChartDonutProps {
  data: readonly any[]
  valueAccessor: (d: any) => number
  labelAccessor?: (d: any) => string
  colors: readonly string[]
  /** Inner radius as fraction of outer. 0 = full pie, 0.6 = donut. Default: 0.6 */
  innerRadius?: number
  /** Gap between segments in degrees. Default: 1.5 */
  padAngle?: number
  /** Width & height in px. Default: 220 */
  size?: number
  /** Center label (top line). */
  centerLabel?: string
  /** Center value (large text). */
  centerValue?: string
  /** Custom React content rendered in the donut hole. Overrides centerLabel/centerValue. */
  centerContent?: React.ReactNode
  /** Controlled active segment index (pulled out + others dimmed). -1 = none. */
  activeIndex?: number
  /** Callback when a segment is clicked. */
  onSegmentClick?: (index: number) => void
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
  centerContent,
  activeIndex: activeIndexProp,
  onSegmentClick,
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

  // Controlled mode: apply highlight from prop
  const isControlled = activeIndexProp !== undefined

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

  // Apply controlled activeIndex when it changes
  useEffect(() => {
    if (!isControlled) return
    applyHighlight(activeIndexProp)
  }, [isControlled, activeIndexProp, applyHighlight])

  const hitTestSegment = useCallback((e: React.PointerEvent<SVGCircleElement> | React.MouseEvent<SVGCircleElement>): number => {
    const svg = e.currentTarget.ownerSVGElement
    if (!svg) return -1
    const rect = svg.getBoundingClientRect()
    const px = (e.clientX - rect.left) * (size / rect.width)
    const py = (e.clientY - rect.top) * (size / rect.height)
    const dx = px - cx
    const dy = py - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < innerR || dist > outerR + 8) return -1
    let angle = Math.atan2(dx, -dy)
    if (angle < 0) angle += 2 * Math.PI
    for (let i = 0; i < slices.length; i++) {
      if (angle >= slices[i].startAngle && angle <= slices[i].endAngle) return i
    }
    return -1
  }, [slices, cx, cy, innerR, outerR, size])

  const handleSegmentPointer = useCallback((e: React.PointerEvent<SVGCircleElement>) => {
    if (isControlled) return // hover disabled in controlled mode
    const idx = hitTestSegment(e)
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => applyHighlight(idx))
  }, [isControlled, hitTestSegment, applyHighlight])

  const handleSegmentLeave = useCallback(() => {
    if (isControlled) return
    cancelAnimationFrame(rafRef.current)
    rafRef.current = requestAnimationFrame(() => applyHighlight(-1))
  }, [isControlled, applyHighlight])

  const handleSegmentClick = useCallback((e: React.MouseEvent<SVGCircleElement>) => {
    if (!onSegmentClick) return
    const idx = hitTestSegment(e as any)
    if (idx >= 0) onSegmentClick(idx)
  }, [onSegmentClick, hitTestSegment])

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
        onClick={handleSegmentClick}
        style={onSegmentClick ? { cursor: 'pointer' } : undefined}
      />

      {/* Center content — custom React node via foreignObject */}
      {centerContent && (
        <foreignObject
          x={cx - innerR * 0.7}
          y={cy - innerR * 0.7}
          width={innerR * 1.4}
          height={innerR * 1.4}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {centerContent}
          </div>
        </foreignObject>
      )}

      {/* Center text (legacy — used when centerContent is not set) */}
      {!centerContent && centerLabel && (
        <text
          x={cx}
          y={cy - 8}
          textAnchor="middle"
          fill="var(--n600)"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 9,
            fontWeight: 550,
          }}
        >
          {centerLabel}
        </text>
      )}
      {!centerContent && centerValue && (
        <text
          x={cx}
          y={cy + 10}
          textAnchor="middle"
          fill="var(--n1150)"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 18,
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
