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
import { cn } from '@/lib/utils'
import { useChart } from './chart-context'

export interface ChartLineProps {
  data?: readonly number[]
  className?: string
}

export function ChartLine({ data: dataProp, className }: ChartLineProps) {
  const { data: ctxData, scaleX, scaleY, chartWidth } = useChart()
  const sourceData = dataProp ?? ctxData

  const d = useMemo(() => {
    if (sourceData.length === 0) return ''
    const target = Math.max(4, Math.floor(chartWidth * 0.3))

    if (sourceData.length <= target || chartWidth <= 0) {
      // Raw: render every point
      return linePath(
        sourceData,
        (_v, i) => scaleX(i),
        (v) => scaleY(v),
      )
    }

    // Hybrid downsampling: even spacing + peak preservation
    const pts = smoothDecimate(sourceData, target)
    return linePath(
      pts,
      (p) => scaleX(p.x),
      (p) => scaleY(p.y),
    )
  }, [sourceData, scaleX, scaleY, chartWidth])

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
