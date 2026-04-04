'use client'

/**
 * ChartArea — filled area with an SVG linear gradient in `<defs>`.
 */

import { useId, useMemo } from 'react'
import { areaPath } from '@/lib/charts/paths/area'
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
  const { data: ctxData, scaleX, scaleY, chartHeight } = useChart()
  const data = dataProp ?? ctxData
  const gradId = useId()

  const d = useMemo(
    () =>
      areaPath(
        data,
        (_v, i) => scaleX(i),
        (v) => scaleY(v),
        chartHeight,
      ),
    [data, scaleX, scaleY, chartHeight],
  )

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
