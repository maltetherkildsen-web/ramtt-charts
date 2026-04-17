// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartBar — bar chart primitive (vertical and horizontal).
 *
 * Renders one `<rect>` per data point. Bars extend from the baseline
 * to the data value. Gap between bars is controlled by `gap` (px).
 *
 * Supports:
 *   - Vertical (default) and horizontal orientation
 *   - Custom bar colour via className or per-bar via `colorFn`
 *   - Rounded corners via `radius`
 *   - Negative values (bars extend downward/leftward from zero)
 *   - Optional highlight of a single bar (e.g. hovered index)
 *   - Active bar index (others dim to 30% opacity)
 *   - Value labels (inside or outside bars)
 *   - Grouped bars via groupIndex/groupCount
 *
 * Usage:
 *   <ChartRoot data={values}>
 *     <ChartBar />
 *     <ChartBar className="fill-amber-500" gap={2} radius={2} />
 *     <ChartBar orientation="horizontal" showLabels="outside" />
 *   </ChartRoot>
 */

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useChart } from './chart-context'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'

// ─── Props ───

export interface ChartBarProps {
  /** Override data (defaults to context data). */
  data?: readonly number[]
  /** Gap between bars in px (default 1). */
  gap?: number
  /** Corner radius in px (default 0). */
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
  /** Bar orientation. Default: 'vertical'. */
  orientation?: 'vertical' | 'horizontal'
  /** Show value labels on bars. Default: false. */
  showLabels?: boolean | 'inside' | 'outside'
  /** Format function for labels. Default: toLocaleString. */
  labelFormat?: (value: number, index: number) => string
  /** Active bar index — others dim to 30% opacity. */
  activeIndex?: number | null
  /** For grouped bars: which group this ChartBar belongs to (0-based). */
  groupIndex?: number
  /** For grouped bars: total number of groups. */
  groupCount?: number
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
}

// ─── Bar geometry result ───

interface BarGeometry {
  x: number
  y: number
  width: number
  height: number
  value: number
  index: number
  /** Label position (center of label placement). */
  labelX: number
  labelY: number
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
  orientation = 'vertical',
  showLabels = false,
  labelFormat,
  activeIndex,
  groupIndex,
  groupCount,
  animate = true,
}: ChartBarProps) {
  const { data: ctxData, scaleX, scaleY, chartWidth, chartHeight } = useChart()
  const data = dataProp ?? ctxData
  const isHorizontal = orientation === 'horizontal'

  // Pre-compute bar geometry
  const bars = useMemo(() => {
    const len = data.length
    if (len === 0) return []

    if (isHorizontal) {
      // ─── Horizontal bars ───
      // Self-contained geometry: Y = categories (evenly spaced), X = proportional to value.
      // Does NOT rely on scaleX/scaleY (which assume vertical layout).
      const slotHeight = chartHeight / len
      let barHeight = Math.max(0.5, slotHeight - gap)

      // Grouped bar support
      if (groupCount && groupCount > 1) {
        barHeight = barHeight / groupCount
      }
      const groupOffset = groupCount && groupIndex != null ? groupIndex * barHeight : 0

      // Value → pixel width scaling
      const maxVal = Math.max(...Array.from(data as number[]).map(Math.abs), 1)

      const result: BarGeometry[] = new Array(len)

      for (let i = 0; i < len; i++) {
        const cy = (i + 0.5) * slotHeight // center of slot
        const barW = (Math.abs(data[i]) / maxVal) * chartWidth
        const isNeg = data[i] < 0

        result[i] = {
          x: isNeg ? chartWidth * 0 - barW : 0,
          y: cy - barHeight / 2 + groupOffset,
          width: Math.max(0, barW),
          height: barHeight,
          value: data[i],
          index: i,
          labelX: barW + 6,
          labelY: cy + groupOffset,
        }
      }

      return result
    }

    // ─── Vertical bars ───
    const totalWidth = len > 1 ? scaleX(len - 1) - scaleX(0) : scaleX(1)
    let barWidth = Math.max(0.5, totalWidth / len - gap)

    // Grouped bar support
    if (groupCount && groupCount > 1) {
      barWidth = barWidth / groupCount
    }
    const groupOffset = groupCount && groupIndex != null ? groupIndex * barWidth - ((groupCount - 1) * barWidth) / 2 : 0

    // Baseline: if y0Accessor provided, use it per-bar.
    // Otherwise: if domain includes 0, use 0; else use domain min.
    const [dMin, dMax] = scaleY.domain
    const hasZero = dMin <= 0 && dMax >= 0
    const defaultBaselineY = hasZero ? scaleY(0) : chartHeight

    const result: BarGeometry[] = new Array(len)

    for (let i = 0; i < len; i++) {
      const cx = scaleX(i) + groupOffset
      const vy = scaleY(data[i])
      const baselineY = y0Accessor ? scaleY(y0Accessor(data[i], i)) : defaultBaselineY

      // For positive values: bar from baseline up to value
      // For negative values: bar from value down to baseline
      const top = Math.min(vy, baselineY)
      const bottom = Math.max(vy, baselineY)
      const h = bottom - top
      const halfBar = groupCount && groupCount > 1 ? barWidth / 2 : barWidth / 2

      result[i] = {
        x: cx - halfBar,
        y: top,
        width: barWidth,
        height: Math.max(0, h),
        value: data[i],
        index: i,
        labelX: cx,
        labelY: top - 6,
      }
    }

    return result
  }, [data, scaleX, scaleY, chartWidth, chartHeight, gap, y0Accessor, isHorizontal, groupIndex, groupCount])

  // Animation — cap total stagger at 800ms so large datasets (90+ bars) don't crawl
  const anim = resolveAnimate(animate, { duration: 600, delay: 0, easing: EASE_OUT_EXPO })
  const stagger = bars.length > 1 ? Math.min(40, 800 / bars.length) : 0

  if (bars.length === 0) return null

  // Resolve label mode
  const labelMode = showLabels === true ? 'outside' : showLabels || null
  const formatLabel = labelFormat ?? ((v: number) => v.toLocaleString())

  // When using colorFn we need individual rects with fill attributes.
  // When using className only, all rects share the same class.
  const defaultClass = cn('fill-emerald-500', className)
  const hlClass = cn(defaultClass, highlightClassName ?? 'fill-emerald-700')

  return (
    <g>
      {bars.map((bar) => {
        const isHighlighted = highlightIndex === bar.index
        const fill = colorFn ? colorFn(bar.value, bar.index) : undefined

        // Active index: dim non-active bars
        const isActive = activeIndex == null || activeIndex === bar.index
        const opacity = activeIndex != null && !isActive ? 0.3 : undefined

        // For animation: transform-origin at bar's baseline
        const baselineY = isHorizontal ? bar.y + bar.height / 2 : bar.y + bar.height
        const baselineX = isHorizontal ? bar.x : bar.x + bar.width / 2
        const barAnimStyle: React.CSSProperties = {
          ...(anim.enabled
            ? {
                transformOrigin: `${baselineX}px ${baselineY}px`,
                animation: `ramtt-bar-grow ${anim.duration}ms ${anim.easing} ${anim.delay + bar.index * stagger}ms both`,
              }
            : undefined),
          ...(opacity != null ? { opacity } : undefined),
        }

        return (
          <g key={bar.index}>
            <rect
              x={bar.x}
              y={bar.y}
              width={bar.width}
              height={bar.height}
              rx={radius}
              ry={radius}
              fill={fill}
              className={fill ? undefined : (isHighlighted ? hlClass : defaultClass)}
              shapeRendering={radius > 0 ? 'geometricPrecision' : 'crispEdges'}
              style={Object.keys(barAnimStyle).length > 0 ? barAnimStyle : undefined}
            />
            {/* Value labels */}
            {labelMode && (
              <text
                x={labelMode === 'inside'
                  ? (isHorizontal ? bar.x + bar.width / 2 : bar.x + bar.width / 2)
                  : bar.labelX}
                y={labelMode === 'inside'
                  ? (isHorizontal ? bar.y + bar.height / 2 : bar.y + bar.height / 2)
                  : bar.labelY}
                textAnchor={labelMode === 'inside' ? 'middle' : (isHorizontal ? 'start' : 'middle')}
                dominantBaseline={labelMode === 'inside' ? 'central' : (isHorizontal ? 'central' : 'auto')}
                fill={labelMode === 'inside' ? 'var(--n50)' : 'var(--n800)'}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: 11,
                  fontWeight: 550,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {formatLabel(bar.value, bar.index)}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}
