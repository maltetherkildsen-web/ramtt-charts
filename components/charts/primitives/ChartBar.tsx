'use client'

/**
 * ChartBar — vertical bar chart primitive.
 *
 * Renders one `<rect>` per data point. Bars extend from the baseline
 * (bottom of the drawing area) up to the data value. Gap between
 * bars is controlled by `gap` (px) — default 1px for dense data,
 * increase for fewer bars.
 *
 * Supports:
 *   - Custom bar colour via className or per-bar via `colorFn`
 *   - Rounded top corners via `radius`
 *   - Negative values (bars extend downward from zero)
 *   - Optional highlight of a single bar (e.g. hovered index)
 *
 * Usage:
 *   <ChartRoot data={values}>
 *     <ChartBar />
 *     <ChartBar className="fill-amber-500" gap={2} radius={2} />
 *     <ChartBar colorFn={(v, i) => v > 240 ? '#ef4444' : '#22c55e'} />
 *   </ChartRoot>
 */

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useChart } from './chart-context'

// ─── Props ───

export interface ChartBarProps {
  /** Override data (defaults to context data). */
  data?: readonly number[]
  /** Gap between bars in px (default 1). */
  gap?: number
  /** Top corner radius in px (default 0). */
  radius?: number
  /**
   * Per-bar colour function. Receives the value and index,
   * returns a CSS colour string. When set, overrides className fill.
   */
  colorFn?: (value: number, index: number) => string
  /** Custom baseline for each bar (for stacking). Default: 0 / domain min. */
  y0Accessor?: (d: number, i: number) => number
  /** Index of a bar to highlight (e.g. from hover). */
  highlightIndex?: number | null
  /** Tailwind classes for highlighted bar. */
  highlightClassName?: string
  /** Tailwind classes applied to each `<rect>` (default fill). */
  className?: string
}

// ─── Component ───

export function ChartBar({
  data: dataProp,
  gap = 1,
  radius = 0,
  colorFn,
  y0Accessor,
  highlightIndex,
  highlightClassName,
  className,
}: ChartBarProps) {
  const { data: ctxData, scaleX, scaleY, chartHeight } = useChart()
  const data = dataProp ?? ctxData

  // Pre-compute bar geometry
  const bars = useMemo(() => {
    const len = data.length
    if (len === 0) return []

    // Bar width = available space per point minus gap
    const totalWidth = len > 1 ? scaleX(len - 1) - scaleX(0) : scaleX(1)
    const barWidth = Math.max(0.5, totalWidth / len - gap)
    const halfBar = barWidth / 2

    // Baseline: if y0Accessor provided, use it per-bar.
    // Otherwise: if domain includes 0, use 0; else use domain min.
    const [dMin, dMax] = scaleY.domain
    const hasZero = dMin <= 0 && dMax >= 0
    const defaultBaselineY = hasZero ? scaleY(0) : chartHeight

    const result: {
      x: number
      y: number
      width: number
      height: number
      value: number
      index: number
    }[] = new Array(len)

    for (let i = 0; i < len; i++) {
      const cx = scaleX(i)
      const vy = scaleY(data[i])
      const baselineY = y0Accessor ? scaleY(y0Accessor(data[i], i)) : defaultBaselineY

      // For positive values: bar from baseline up to value
      // For negative values: bar from value down to baseline
      const top = Math.min(vy, baselineY)
      const bottom = Math.max(vy, baselineY)
      const h = bottom - top

      result[i] = {
        x: cx - halfBar,
        y: top,
        width: barWidth,
        height: Math.max(0, h),
        value: data[i],
        index: i,
      }
    }

    return result
  }, [data, scaleX, scaleY, chartHeight, gap, y0Accessor])

  if (bars.length === 0) return null

  // When using colorFn we need individual rects with fill attributes.
  // When using className only, all rects share the same class.
  const defaultClass = cn('fill-emerald-500', className)
  const hlClass = cn(defaultClass, highlightClassName ?? 'fill-emerald-700')

  return (
    <g>
      {bars.map((bar) => {
        const isHighlighted = highlightIndex === bar.index
        const fill = colorFn ? colorFn(bar.value, bar.index) : undefined

        return (
          <rect
            key={bar.index}
            x={bar.x}
            y={bar.y}
            width={bar.width}
            height={bar.height}
            rx={radius}
            ry={radius}
            fill={fill}
            className={fill ? undefined : (isHighlighted ? hlClass : defaultClass)}
          />
        )
      })}
    </g>
  )
}
