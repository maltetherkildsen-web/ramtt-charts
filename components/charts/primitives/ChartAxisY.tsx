// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartAxisY — left Y-axis with nice tick labels.
 *
 * Uses Satoshi via --font-sans CSS variable.
 */

import { useMemo } from 'react'
import { niceTicks } from '@/lib/charts/ticks/nice'
import { scaleLinear } from '@/lib/charts/scales/linear'
import { useChart } from './chart-context'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'

export interface ChartAxisYProps {
  tickCount?: number
  format?: (value: number) => string
  dx?: number
  /** Render on left (default) or right edge of chart. */
  position?: 'left' | 'right'
  /** Override domain for secondary axis (e.g. dual Y-axis). Uses chart scaleY domain by default. */
  domain?: readonly [number, number]
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
}

export function ChartAxisY({
  tickCount = 4,
  format = (v) => v.toLocaleString(),
  dx = -10,
  position = 'left',
  domain,
  animate = true,
}: ChartAxisYProps) {
  const { scaleY, chartWidth, chartHeight } = useChart()

  // Build local scale if custom domain provided (for secondary axis)
  const effectiveScale = useMemo(() => {
    if (!domain) return scaleY
    return scaleLinear([domain[0], domain[1]], [chartHeight, 0])
  }, [domain, scaleY, chartHeight])

  const ticks = useMemo(
    () => niceTicks(effectiveScale.domain[0], effectiveScale.domain[1], tickCount),
    [effectiveScale.domain, tickCount],
  )

  const isRight = position === 'right'
  const xPos = isRight ? chartWidth + Math.abs(dx) : dx
  const anchor = isRight ? 'start' : 'end'

  const anim = resolveAnimate(animate, { duration: 400, delay: 300, easing: EASE_OUT_EXPO })
  const animStyle = anim.enabled
    ? { animation: `ramtt-axis-fade-y ${anim.duration}ms ${anim.easing} ${anim.delay}ms both` }
    : undefined

  return (
    <g style={animStyle}>
      {ticks.map((t) => {
        const py = effectiveScale(t)
        if (!isFinite(py)) return null
        return (
          <text
            key={t}
            x={xPos}
            y={py}
            dy="0.32em"
            textAnchor={anchor}
            className="fill-(--n600) text-[9px]"
            style={{ fontFamily: "var(--font-sans)", fontVariantNumeric: 'tabular-nums slashed-zero' }}
          >
            {format(t)}
          </text>
        )
      })}
    </g>
  )
}
