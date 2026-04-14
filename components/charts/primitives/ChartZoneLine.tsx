// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartZoneLine — line that changes colour based on training zones.
 *
 * Uses a horizontal SVG <linearGradient> with dynamically computed
 * colour stops. Each data point maps to a zone; the gradient stop
 * is placed at the point's normalised x-position (0–1) with the
 * zone's colour. Adjacent same-zone points share a single run,
 * so the gradient only emits stops at zone *transitions*.
 *
 * Usage:
 *   <ChartRoot data={values}>
 *     <ChartZoneLine threshold={240} />
 *     <ChartZoneLine threshold={240} zones={customZones} />
 *   </ChartRoot>
 */

import { useId, useMemo, useRef, useEffect } from 'react'
import { linePath } from '@/lib/charts/paths/line'
import { smoothDecimate } from '@/lib/charts/utils/smooth-decimate'
import { cn } from '@/lib/utils'
import { useChart } from './chart-context'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'

// ─── Zone types ───

export interface ZoneDefinition {
  /** Lower bound as fraction of threshold (inclusive). */
  min: number
  /** Upper bound as fraction of threshold (exclusive). */
  max: number
  /** CSS colour for this zone. */
  color: string
  /** Short label (Z1, Z2, …). */
  label: string
}

/** Coggan power zones as % of FTP. */
export const POWER_ZONES: ZoneDefinition[] = [
  { min: 0, max: 0.55, color: '#94a3b8', label: 'Z1' },
  { min: 0.55, max: 0.75, color: '#22c55e', label: 'Z2' },
  { min: 0.75, max: 0.90, color: '#eab308', label: 'Z3' },
  { min: 0.90, max: 1.05, color: '#f97316', label: 'Z4' },
  { min: 1.05, max: 1.20, color: '#ef4444', label: 'Z5' },
  { min: 1.20, max: Infinity, color: '#dc2626', label: 'Z6' },
]

// ─── Helpers ───

function getZoneColor(value: number, threshold: number, zones: ZoneDefinition[]): string {
  const ratio = threshold > 0 ? value / threshold : 0
  for (let i = zones.length - 1; i >= 0; i--) {
    if (ratio >= zones[i].min) return zones[i].color
  }
  return zones[0].color
}

// ─── Props ───

export interface ChartZoneLineProps {
  /** Override data (defaults to context data). */
  data?: readonly number[]
  /** Zone definitions (default: Coggan power zones). */
  zones?: ZoneDefinition[]
  /** Threshold value (e.g. FTP in watts). Used to compute zone boundaries. */
  threshold: number
  /**
   * Tailwind classes for the <path>.
   * Control stroke-width etc. here. Do NOT set stroke colour —
   * that comes from the gradient.
   */
  className?: string
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
}

// ─── Component ───

export function ChartZoneLine({
  data: dataProp,
  zones = POWER_ZONES,
  threshold,
  className,
  animate = true,
}: ChartZoneLineProps) {
  const { data: ctxData, scaleX, scaleY, chartWidth, decimationFactor } = useChart()
  const data = dataProp ?? ctxData
  const gradId = useId()

  // Build the SVG path with hybrid downsampling
  const d = useMemo(() => {
    const target = Math.max(4, Math.floor(chartWidth * decimationFactor))
    if (data.length <= target || chartWidth <= 0) {
      return linePath(
        data,
        (_v, i) => scaleX(i),
        (v) => scaleY(v),
      )
    }
    const pts = smoothDecimate(data, target)
    return linePath(
      pts,
      (p) => scaleX(p.x),
      (p) => scaleY(p.y),
    )
  }, [data, scaleX, scaleY, chartWidth, decimationFactor])

  // Build gradient stops — only emit at zone transitions
  // Uses full data for accurate zone coloring
  const stops = useMemo(() => {
    const len = data.length
    if (len === 0) return []

    const result: { offset: string; color: string }[] = []
    const lastIdx = len - 1

    let prevColor = getZoneColor(data[0], threshold, zones)

    // First stop at 0%
    result.push({ offset: '0%', color: prevColor })

    for (let i = 1; i < len; i++) {
      const color = getZoneColor(data[i], threshold, zones)
      if (color !== prevColor) {
        const pct = ((i - 0.5) / lastIdx) * 100
        const pctStr = pct.toFixed(2)
        result.push({ offset: `${pctStr}%`, color: prevColor })
        result.push({ offset: `${pctStr}%`, color })
        prevColor = color
      }
    }

    // Final stop at 100%
    result.push({ offset: '100%', color: prevColor })

    return result
  }, [data, threshold, zones])

  // Animation
  const pathRef = useRef<SVGPathElement>(null)
  const anim = resolveAnimate(animate, { duration: 1200, delay: 0, easing: EASE_OUT_EXPO })

  useEffect(() => {
    if (!anim.enabled || !pathRef.current) return
    const path = pathRef.current
    const length = path.getTotalLength()

    path.style.strokeDasharray = `${length}`
    path.style.strokeDashoffset = `${length}`
    path.getBoundingClientRect()

    path.style.transition = `stroke-dashoffset ${anim.duration}ms ${anim.easing} ${anim.delay}ms`
    path.style.strokeDashoffset = '0'

    return () => {
      path.style.strokeDasharray = ''
      path.style.strokeDashoffset = ''
      path.style.transition = ''
    }
  }, [d, anim.enabled, anim.duration, anim.delay, anim.easing])

  if (!d) return null

  return (
    <>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          {stops.map((s, i) => (
            <stop key={i} offset={s.offset} stopColor={s.color} />
          ))}
        </linearGradient>
      </defs>
      <path
        ref={pathRef}
        d={d}
        fill="none"
        stroke={`url(#${gradId})`}
        className={cn('stroke-[1.5]', className)}
        strokeLinejoin="round"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
      />
    </>
  )
}
