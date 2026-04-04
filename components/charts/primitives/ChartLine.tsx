'use client'

/**
 * ChartLine — renders a single `<path>` from the chart data.
 */

import { useMemo } from 'react'
import { linePath } from '@/lib/charts/paths/line'
import { cn } from '@/lib/utils'
import { useChart } from './chart-context'

export interface ChartLineProps {
  data?: readonly number[]
  className?: string
}

export function ChartLine({ data: dataProp, className }: ChartLineProps) {
  const { data: ctxData, scaleX, scaleY } = useChart()
  const data = dataProp ?? ctxData

  const d = useMemo(
    () =>
      linePath(
        data,
        (_v, i) => scaleX(i),
        (v) => scaleY(v),
      ),
    [data, scaleX, scaleY],
  )

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
