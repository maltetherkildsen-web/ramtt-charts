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
  /** Per-point baseline accessor for stacked areas. When set, fills between y0 and main y. */
  y0Accessor?: (datum: any, index: number) => number
  /** Custom y accessor (overrides default). Used with y0Accessor for stacked areas. */
  yAccessor?: (datum: any, index: number) => number
}

export function ChartArea({
  data: dataProp,
  gradientColor = '#16a34a',
  opacityFrom = 0.06,
  opacityTo = 0.005,
  className,
  y0Accessor,
  yAccessor,
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
