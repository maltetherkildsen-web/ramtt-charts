// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartScatter — scatter / bubble chart primitive.
 *
 * Renders one `<circle>` per data point at (scaleX(x), scaleY(y)).
 * When sizeAccessor is provided, dot radius maps proportionally
 * to the sizeRange.
 *
 * Usage:
 *   <ChartRoot data={dummyIndices} height={300} xDomain={[0, 100]} yDomain={[0, 100]}>
 *     <ChartScatter
 *       data={points}
 *       xAccessor={(d) => d.x}
 *       yAccessor={(d) => d.y}
 *       sizeAccessor={(d) => d.size}
 *       className="fill-blue-500"
 *     />
 *   </ChartRoot>
 */

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useChart } from './chart-context'
import { scaleLinear } from '@/lib/charts/scales/linear'
import { resolveAnimate, EASE_SPRING, type AnimateConfig } from '@/lib/charts/utils/animate'

// ─── Props ───

export interface ChartScatterProps {
  /** Data array — each item needs x, y, and optionally size. */
  data?: readonly any[]
  /** Accessor for x value. */
  xAccessor?: (d: any, i: number) => number
  /** Accessor for y value. */
  yAccessor?: (d: any, i: number) => number
  /** Accessor for bubble radius (optional — fixed radius if omitted). */
  sizeAccessor?: (d: any, i: number) => number
  /** Min/max radius range for size mapping. Default [3, 16]. */
  sizeRange?: [number, number]
  /** CSS class for dots. */
  className?: string
  /** Per-dot color function. */
  colorFn?: (d: any, i: number) => string
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
}

// ─── Component ───

export function ChartScatter({
  data: dataProp,
  xAccessor = (d) => d.x ?? d,
  yAccessor = (d) => d.y ?? d,
  sizeAccessor,
  sizeRange = [3, 16],
  className,
  colorFn,
  animate = true,
}: ChartScatterProps) {
  const { data: ctxData, scaleX, scaleY } = useChart()
  const data = dataProp ?? ctxData

  // Pre-compute dot positions + radii
  const dots = useMemo(() => {
    const len = data.length
    if (len === 0) return []

    // Build size scale if sizeAccessor provided
    let sizeScale: ((v: number) => number) | null = null
    if (sizeAccessor) {
      let sMin = Infinity
      let sMax = -Infinity
      for (let i = 0; i < len; i++) {
        const s = sizeAccessor(data[i], i)
        if (s < sMin) sMin = s
        if (s > sMax) sMax = s
      }
      // Avoid division by zero if all sizes are equal
      if (sMin === sMax) {
        const mid = (sizeRange[0] + sizeRange[1]) / 2
        sizeScale = () => mid
      } else {
        sizeScale = scaleLinear([sMin, sMax], [sizeRange[0], sizeRange[1]])
      }
    }

    const defaultR = sizeAccessor ? undefined : 4
    const result: {
      cx: number
      cy: number
      r: number
      index: number
    }[] = new Array(len)

    for (let i = 0; i < len; i++) {
      const x = xAccessor(data[i], i)
      const y = yAccessor(data[i], i)
      const r = sizeScale ? sizeScale(sizeAccessor!(data[i], i)) : defaultR!

      result[i] = {
        cx: scaleX(x),
        cy: scaleY(y),
        r,
        index: i,
      }
    }

    return result
  }, [data, scaleX, scaleY, xAccessor, yAccessor, sizeAccessor, sizeRange])

  const anim = resolveAnimate(animate, { duration: 300, delay: 0, easing: EASE_SPRING })
  const dotStagger = 15

  if (dots.length === 0) return null

  const defaultClass = cn('fill-blue-500', className)

  return (
    <g>
      {dots.map((dot) => {
        const fill = colorFn ? colorFn(data[dot.index], dot.index) : undefined
        return (
          <circle
            key={dot.index}
            cx={dot.cx}
            cy={dot.cy}
            r={dot.r}
            fill={fill}
            className={fill ? undefined : defaultClass}
            style={{
              transition: 'opacity 150ms, transform 150ms',
              ...(anim.enabled
                ? {
                    transformOrigin: `${dot.cx}px ${dot.cy}px`,
                    animation: `ramtt-dot-pop ${anim.duration}ms ${anim.easing} ${anim.delay + dot.index * dotStagger}ms both`,
                  }
                : undefined),
            }}
          />
        )
      })}
    </g>
  )
}
