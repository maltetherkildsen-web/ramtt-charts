// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartArea — filled area with an SVG linear gradient in `<defs>`.
 *
 * Zoom-adaptive hybrid downsampling (smoothDecimate): even spacing
 * for smooth curves + min/max peak preservation.
 */

import { useId, useMemo } from 'react'
import { areaPath } from '@/lib/charts/paths/area'
import { smoothDecimate } from '@/lib/charts/utils/smooth-decimate'
import { cn } from '@/lib/utils'
import { useChart } from './chart-context'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'

export interface ChartAreaProps {
  data?: readonly number[]
  gradientColor?: string
  opacityFrom?: number
  opacityTo?: number
  className?: string
  /** Per-point baseline accessor for stacked areas. When set, fills between y0 and main y. */
  y0Accessor?: (datum: any, index: number) => number
  /** Custom y accessor (overrides default). Used with y0Accessor for stacked areas. */
  yAccessor?: (datum: any, index: number) => number
  /** If set, area above this Y value fills with gradientColor; area below fills with negativeColor. */
  thresholdY?: number
  /** Color for area below threshold. Default: '#ef4444'. */
  negativeColor?: string
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
}

export function ChartArea({
  data: dataProp,
  gradientColor = '#16a34a',
  opacityFrom = 0.06,
  opacityTo = 0.005,
  className,
  y0Accessor,
  yAccessor,
  thresholdY,
  negativeColor = '#ef4444',
  animate = true,
}: ChartAreaProps) {
  const { data: ctxData, scaleX, scaleY, chartHeight, chartWidth, decimationFactor } = useChart()
  const sourceData = dataProp ?? ctxData
  const gradId = useId()

  const d = useMemo(() => {
    if (sourceData.length === 0) return ''

    // Stacked area mode: custom y0/y1 accessors (no downsampling — stacked data is pre-processed)
    if (y0Accessor && yAccessor) {
      const len = sourceData.length
      const topParts: string[] = new Array(len)
      const bottomParts: string[] = new Array(len)

      for (let i = 0; i < len; i++) {
        const px = scaleX(i).toFixed(1)
        const py1 = scaleY(yAccessor(sourceData[i], i)).toFixed(1)
        const py0 = scaleY(y0Accessor(sourceData[i], i)).toFixed(1)
        topParts[i] = `${i === 0 ? 'M' : 'L'}${px},${py1}`
        bottomParts[i] = `L${px},${py0}`
      }

      // Top line left→right, then bottom line right→left, close
      bottomParts.reverse()
      return topParts.join('') + bottomParts.join('') + 'Z'
    }

    // Standard area mode
    const target = Math.max(4, Math.floor(chartWidth * decimationFactor))

    if (sourceData.length <= target || chartWidth <= 0) {
      return areaPath(
        sourceData,
        (_v, i) => scaleX(i),
        (v) => scaleY(v as number),
        chartHeight,
      )
    }

    // Hybrid downsampling: even spacing + peak preservation
    const pts = smoothDecimate(sourceData as number[], target)
    return areaPath(
      pts,
      (p) => scaleX(p.x),
      (p) => scaleY(p.y),
      chartHeight,
    )
  }, [sourceData, scaleX, scaleY, chartHeight, chartWidth, decimationFactor, y0Accessor, yAccessor])

  // Animation
  const anim = resolveAnimate(animate, { duration: 800, delay: 200, easing: EASE_OUT_EXPO, mode: 'fade' })
  const animStyle = anim.enabled
    ? anim.mode === 'progressive'
      ? { animation: `ramtt-progressive-reveal ${anim.duration}ms ${anim.easing} ${anim.delay}ms both` }
      : { animation: `ramtt-area-reveal ${anim.duration}ms ${anim.easing} ${anim.delay}ms both` }
    : undefined

  // Threshold clip IDs (SSR-safe)
  const aboveClipId = useId()
  const belowClipId = useId()
  const negGradId = useId()

  if (!d) return null

  // ─── Threshold mode: split fill above/below ───
  if (thresholdY != null) {
    const thresholdPx = scaleY(thresholdY)

    return (
      <>
        <defs>
          <clipPath id={aboveClipId}>
            <rect x={0} y={0} width={chartWidth} height={thresholdPx} />
          </clipPath>
          <clipPath id={belowClipId}>
            <rect x={0} y={thresholdPx} width={chartWidth} height={chartHeight - thresholdPx} />
          </clipPath>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradientColor} stopOpacity={opacityFrom} />
            <stop offset="100%" stopColor={gradientColor} stopOpacity={opacityTo} />
          </linearGradient>
          <linearGradient id={negGradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={negativeColor} stopOpacity={opacityTo} />
            <stop offset="100%" stopColor={negativeColor} stopOpacity={opacityFrom} />
          </linearGradient>
        </defs>

        {/* Positive area (above threshold) */}
        <path
          d={d}
          fill={`url(#${gradId})`}
          clipPath={`url(#${aboveClipId})`}
          className={cn('stroke-none', className)}
          style={animStyle}
        />

        {/* Negative area (below threshold) */}
        <path
          d={d}
          fill={`url(#${negGradId})`}
          clipPath={`url(#${belowClipId})`}
          className={cn('stroke-none', className)}
          style={animStyle}
        />

        {/* Threshold reference line */}
        <line
          x1={0}
          y1={thresholdPx}
          x2={chartWidth}
          y2={thresholdPx}
          stroke="var(--n600)"
          strokeWidth={1}
          strokeDasharray="4 3"
        />
      </>
    )
  }

  // ─── Standard mode ───
  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop
            offset="0%"
            stopColor={gradientColor}
            stopOpacity={opacityFrom}
          />
          <stop
            offset="100%"
            stopColor={gradientColor}
            stopOpacity={opacityTo}
          />
        </linearGradient>
      </defs>
      <path
        d={d}
        fill={`url(#${gradId})`}
        className={cn('stroke-none', className)}
        style={animStyle}
      />
    </>
  )
}
