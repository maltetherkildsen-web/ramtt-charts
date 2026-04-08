'use client'

/**
 * ChartRoot — SVG container with responsive sizing, auto-scaled axes,
 * and context for child primitives.
 *
 * Renders ONCE per data/size change. Hover tracking is intentionally
 * excluded — it lives in ChartCrosshair, outside React's render cycle.
 *
 * Downsampling is handled by rendering primitives (ChartLine, ChartArea),
 * NOT here — the context exposes full data so crosshair/tooltip indices
 * remain correct without mapping.
 */

import {
  useRef,
  useState,
  useMemo,
  useEffect,
  type ReactNode,
} from 'react'

import { scaleLinear } from '@/lib/charts/scales/linear'
import { extentOf } from '@/lib/charts/utils/extent'
import { cn } from '@/lib/utils'

import {
  ChartContext,
  DEFAULT_PADDING,
  type ChartPadding,
  type ChartContextValue,
} from './chart-context'

// ─── Props ───

export interface ChartRootProps {
  data: readonly number[]
  height?: number
  padding?: Partial<ChartPadding>
  yPadding?: number
  yDomain?: readonly [number, number]
  /** Multiplier for downsampling target (target = chartWidth × factor). Lower = smoother. Default 0.3. */
  decimationFactor?: number
  className?: string
  svgClassName?: string
  children?: ReactNode
}

// ─── Component ───

export function ChartRoot({
  data,
  height = 280,
  padding: paddingOverride,
  yPadding = 0.05,
  yDomain: yDomainProp,
  decimationFactor = 0.3,
  className,
  svgClassName,
  children,
}: ChartRootProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const [width, setWidth] = useState(0)

  const padding: ChartPadding = useMemo(
    () => ({ ...DEFAULT_PADDING, ...paddingOverride }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      paddingOverride?.top,
      paddingOverride?.right,
      paddingOverride?.bottom,
      paddingOverride?.left,
    ],
  )

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const initial = el.getBoundingClientRect().width
    if (initial > 0) setWidth(initial)

    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width
      if (w && w > 0) setWidth(w)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const chartWidth = Math.max(0, width - padding.left - padding.right)
  const chartHeight = Math.max(0, height - padding.top - padding.bottom)

  const scaleX = useMemo(
    () => scaleLinear([0, Math.max(1, data.length - 1)], [0, chartWidth]),
    [data.length, chartWidth],
  )

  const yDomain = useMemo(() => {
    if (yDomainProp) return yDomainProp
    return extentOf(data as number[], yPadding)
  }, [data, yPadding, yDomainProp])

  const scaleY = useMemo(
    () => scaleLinear([yDomain[0], yDomain[1]], [chartHeight, 0]),
    [yDomain, chartHeight],
  )

  const ctx = useMemo<ChartContextValue>(
    () => ({
      width,
      height,
      chartWidth,
      chartHeight,
      padding,
      scaleX,
      scaleY,
      data,
      sourceDataLength: data.length,
      svgRef,
      decimationFactor,
    }),
    [width, height, chartWidth, chartHeight, padding, scaleX, scaleY, data, decimationFactor],
  )

  const ready = width > 0

  return (
    <div ref={containerRef} className={cn('relative w-full', className)}>
      {ready && (
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          width={width}
          height={height}
          className={cn('block overflow-visible', svgClassName)}
          shapeRendering="geometricPrecision"
        >
          <ChartContext.Provider value={ctx}>
            <g transform={`translate(${padding.left},${padding.top})`}>
              {children}
            </g>
          </ChartContext.Provider>
        </svg>
      )}
    </div>
  )
}
