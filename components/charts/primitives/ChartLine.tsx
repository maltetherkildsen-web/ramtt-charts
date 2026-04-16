// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartLine — renders a single `<path>` from the chart data.
 *
 * Zoom-adaptive hybrid downsampling (smoothDecimate):
 *   - If data.length <= threshold → render ALL points raw (full detail)
 *   - If data.length >  threshold → smoothDecimate to ~threshold points
 *
 * smoothDecimate combines even spacing (for smooth curves) with min/max
 * peak preservation (so spikes and valleys aren't lost during zoom-out).
 */

import { useMemo, useRef, useEffect } from 'react'
import { linePath, type CurveType } from '@/lib/charts/paths/line'
import { smoothDecimate } from '@/lib/charts/utils/smooth-decimate'
import { scaleLinear } from '@/lib/charts/scales/linear'
import { cn } from '@/lib/utils'
import { useChart } from './chart-context'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'

export interface DotRenderPayload {
  /** Pixel x position */
  cx: number
  /** Pixel y position */
  cy: number
  /** Data value at this point */
  value: number
  /** Index in data array */
  index: number
}

export interface ChartLineProps {
  data?: readonly number[]
  className?: string
  /** Override Y domain for secondary axis (creates its own scale). */
  yDomain?: readonly [number, number]
  /** Custom Y accessor for object data. When set, maps each datum through this before scaling. */
  yAccessor?: (datum: any, index: number) => number
  /** Curve interpolation mode. Default: 'linear'. */
  curve?: CurveType
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
  /** Show dots at data points. false=none, true/'all'=every point. Default: false. */
  showDots?: boolean | 'all'
  /** Dot radius in px. Default: 4. */
  dotRadius?: number
  /** CSS class for dots. Default: inherits line stroke color as fill. */
  dotClassName?: string
  /** Custom dot renderer. When set, replaces the default circle for each data point. */
  renderDot?: (payload: DotRenderPayload) => React.ReactNode
}

export function ChartLine({
  data: dataProp,
  className,
  yDomain,
  yAccessor,
  curve = 'linear',
  animate = true,
  showDots = false,
  dotRadius = 4,
  dotClassName,
  renderDot,
}: ChartLineProps) {
  const { data: ctxData, scaleX, scaleY, chartWidth, chartHeight, decimationFactor } = useChart()
  const sourceData = dataProp ?? ctxData

  // Build local Y scale if custom domain provided (for dual-axis charts)
  const effectiveScaleY = useMemo(() => {
    if (!yDomain) return scaleY
    return scaleLinear([yDomain[0], yDomain[1]], [chartHeight, 0])
  }, [yDomain, scaleY, chartHeight])

  const d = useMemo(() => {
    if (sourceData.length === 0) return ''
    const target = Math.max(4, Math.floor(chartWidth * decimationFactor))

    const getY = yAccessor
      ? (v: any, i: number) => effectiveScaleY(yAccessor(v, i))
      : (v: number) => effectiveScaleY(v)

    if (sourceData.length <= target || chartWidth <= 0) {
      return linePath(
        sourceData,
        (_v, i) => scaleX(i),
        getY as any,
        1,
        curve,
      )
    }

    // Hybrid downsampling only for plain number[] without custom accessor
    if (!yAccessor) {
      const pts = smoothDecimate(sourceData as number[], target)
      return linePath(
        pts,
        (p) => scaleX(p.x),
        (p) => effectiveScaleY(p.y),
        1,
        curve,
      )
    }

    // With custom accessor, render all points (no downsampling)
    return linePath(
      sourceData,
      (_v, i) => scaleX(i),
      getY as any,
      1,
      curve,
    )
  }, [sourceData, scaleX, effectiveScaleY, chartWidth, decimationFactor, yAccessor, curve])

  // Animation
  const pathRef = useRef<SVGPathElement>(null)
  const anim = resolveAnimate(animate, { duration: 1200, delay: 0, easing: EASE_OUT_EXPO, mode: 'draw' })

  // stroke-dasharray draw-in (mode: 'draw')
  useEffect(() => {
    if (!anim.enabled || anim.mode !== 'draw' || !pathRef.current) return
    const path = pathRef.current
    const length = path.getTotalLength()

    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`
    path.getBoundingClientRect() // force reflow

    path.style.transition = `stroke-dashoffset ${anim.duration}ms ${anim.easing} ${anim.delay}ms`
    path.style.strokeDashoffset = '0'

    return () => {
      path.style.strokeDasharray = ''
      path.style.strokeDashoffset = ''
      path.style.transition = ''
    }
  }, [d, anim.enabled, anim.mode, anim.duration, anim.delay, anim.easing])

  // Progressive clip-path reveal style (mode: 'progressive')
  const progressiveStyle = anim.enabled && anim.mode === 'progressive'
    ? { animation: `ramtt-progressive-reveal ${anim.duration}ms ${anim.easing} ${anim.delay}ms both` }
    : undefined

  // Compute dot positions when showDots is enabled
  const dots = useMemo(() => {
    if (!showDots || sourceData.length === 0) return null

    const getY = yAccessor
      ? (v: any, i: number) => effectiveScaleY(yAccessor(v, i))
      : (v: number) => effectiveScaleY(v)

    return sourceData.map((v, i) => ({
      cx: scaleX(i),
      cy: (getY as any)(v, i),
      value: typeof v === 'number' ? v : (yAccessor?.(v, i) ?? 0),
      index: i,
    }))
  }, [showDots, sourceData, scaleX, effectiveScaleY, yAccessor])

  if (!d) return null

  return (
    <g>
      <path
        ref={pathRef}
        d={d}
        className={cn(
          'fill-none stroke-emerald-600 stroke-[1.5]',
          className,
        )}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        style={progressiveStyle}
      />
      {dots && dots.map((dot) =>
        renderDot ? (
          <g key={dot.index}>{renderDot(dot)}</g>
        ) : (
          <circle
            key={dot.index}
            cx={dot.cx}
            cy={dot.cy}
            r={dotRadius}
            className={dotClassName}
            fill={dotClassName ? undefined : 'currentColor'}
            stroke="var(--n50)"
            strokeWidth={2}
          />
        )
      )}
    </g>
  )
}
