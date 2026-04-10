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

import { useMemo } from 'react'
import { linePath } from '@/lib/charts/paths/line'
import { smoothDecimate } from '@/lib/charts/utils/smooth-decimate'
import { scaleLinear } from '@/lib/charts/scales/linear'
import { cn } from '@/lib/utils'
import { useChart } from './chart-context'

export interface ChartLineProps {
  data?: readonly number[]
  className?: string
  /** Override Y domain for secondary axis (creates its own scale). */
  yDomain?: readonly [number, number]
  /** Custom Y accessor for object data. When set, maps each datum through this before scaling. */
  yAccessor?: (datum: any, index: number) => number
}

export function ChartLine({ data: dataProp, className, yDomain, yAccessor }: ChartLineProps) {
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
      )
    }

    // Hybrid downsampling only for plain number[] without custom accessor
    if (!yAccessor) {
      const pts = smoothDecimate(sourceData as number[], target)
      return linePath(
        pts,
        (p) => scaleX(p.x),
        (p) => effectiveScaleY(p.y),
      )
    }

    // With custom accessor, render all points (no downsampling)
    return linePath(
      sourceData,
      (_v, i) => scaleX(i),
      getY as any,
    )
  }, [sourceData, scaleX, effectiveScaleY, chartWidth, decimationFactor, yAccessor])

  if (!d) return null

  return (
    <path
      d={d}
      className={cn(
        'fill-none stroke-emerald-600 stroke-[1.5]',
        className,
      )}
      strokeLinejoin="round"
      strokeLinecap="round"
      vectorEffect="non-scaling-stroke"
    />
  )
}
