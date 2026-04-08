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

export interface ChartAreaProps {
  data?: readonly number[]
  gradientColor?: string
  opacityFrom?: number
  opacityTo?: number
  className?: string
}

export function ChartArea({
  data: dataProp,
  gradientColor = '#16a34a',
  opacityFrom = 0.06,
  opacityTo = 0.005,
  className,
}: ChartAreaProps) {
  const { data: ctxData, scaleX, scaleY, chartHeight, chartWidth, decimationFactor } = useChart()
  const sourceData = dataProp ?? ctxData
  const gradId = useId()

  const d = useMemo(() => {
    if (sourceData.length === 0) return ''
    const target = Math.max(4, Math.floor(chartWidth * decimationFactor))

    if (sourceData.length <= target || chartWidth <= 0) {
      return areaPath(
        sourceData,
        (_v, i) => scaleX(i),
        (v) => scaleY(v),
        chartHeight,
      )
    }

    // Hybrid downsampling: even spacing + peak preservation
    const pts = smoothDecimate(sourceData, target)
    return areaPath(
      pts,
      (p) => scaleX(p.x),
      (p) => scaleY(p.y),
      chartHeight,
    )
  }, [sourceData, scaleX, scaleY, chartHeight, chartWidth, decimationFactor])

  if (!d) return null

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
      />
    </>
  )
}
