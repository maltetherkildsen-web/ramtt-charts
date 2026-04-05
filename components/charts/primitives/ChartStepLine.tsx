'use client'

/**
 * ChartStepLine — stepped/staircase path for cumulative data (e.g. CHO intake).
 *
 * Renders a flat line at each value level, with vertical jumps at changes.
 * Works by finding the indices where the value actually changes, then building
 * a minimal set of H/V SVG path commands between those transition points.
 */

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useChart } from './chart-context'

export interface ChartStepLineProps {
  data?: readonly number[]
  className?: string
}

export function ChartStepLine({ data: dataProp, className }: ChartStepLineProps) {
  const { data: ctxData, scaleX, scaleY } = useChart()
  const raw = dataProp ?? ctxData

  const d = useMemo(() => {
    if (raw.length < 2) return ''

    // Find transition points: indices where value differs from previous
    interface Step { index: number; value: number }
    const steps: Step[] = [{ index: 0, value: raw[0] }]

    for (let i = 1; i < raw.length; i++) {
      if (raw[i] !== raw[i - 1]) {
        // Record the point just BEFORE the change (end of flat segment)
        // and the point AT the change (start of new level)
        steps.push({ index: i, value: raw[i] })
      }
    }
    // Always include the last point
    steps.push({ index: raw.length - 1, value: raw[raw.length - 1] })

    // Build SVG path: step-after interpolation
    // For each transition: horizontal to the transition x, then vertical to new y
    const x0 = scaleX(steps[0].index)
    const y0 = scaleY(steps[0].value)

    const parts: string[] = [`M${x0.toFixed(1)},${y0.toFixed(1)}`]

    for (let i = 1; i < steps.length; i++) {
      const x = scaleX(steps[i].index)
      const y = scaleY(steps[i].value)
      const prevY = scaleY(steps[i - 1].value)

      // Horizontal to this x at the PREVIOUS y level
      parts.push(`H${x.toFixed(1)}`)

      // If value changed, vertical jump to new y
      if (Math.abs(y - prevY) > 0.01) {
        parts.push(`V${y.toFixed(1)}`)
      }
    }

    return parts.join(' ')
  }, [raw, scaleX, scaleY])

  if (!d) return null

  return (
    <path
      d={d}
      className={cn('fill-none stroke-[2]', className)}
      strokeLinejoin="miter"
      strokeLinecap="square"
      vectorEffect="non-scaling-stroke"
    />
  )
}
