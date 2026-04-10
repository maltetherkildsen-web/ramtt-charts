'use client'

/**
 * ChartCandlestick — OHLC candlestick chart primitive.
 *
 * Renders one candle per data point: a thin wick `<line>` from high to low,
 * and a body `<rect>` from open to close. Green for up, red for down.
 *
 * Usage:
 *   <ChartRoot data={indices} height={300} xDomain={[-0.5, N-0.5]} yDomain={[lo, hi]}>
 *     <ChartCandlestick
 *       data={ohlcData}
 *       openAccessor={(d) => d.open}
 *       highAccessor={(d) => d.high}
 *       lowAccessor={(d) => d.low}
 *       closeAccessor={(d) => d.close}
 *     />
 *   </ChartRoot>
 */

import { useMemo } from 'react'
import { cn } from '@/lib/utils'
import { useChart } from './chart-context'

// ─── Props ───

export interface ChartCandlestickProps {
  /** Data array with OHLC values. */
  data?: readonly any[]
  /** Accessor for open value. */
  openAccessor?: (d: any) => number
  /** Accessor for high value. */
  highAccessor?: (d: any) => number
  /** Accessor for low value. */
  lowAccessor?: (d: any) => number
  /** Accessor for close value. */
  closeAccessor?: (d: any) => number
  /** Color for up (close >= open) candles. Default '#22c55e'. */
  upColor?: string
  /** Color for down (close < open) candles. Default '#ef4444'. */
  downColor?: string
  /** Candle body width as fraction of step. Default 0.6. */
  bodyWidth?: number
  /** Tailwind classes applied to the group. */
  className?: string
}

// ─── Component ───

export function ChartCandlestick({
  data: dataProp,
  openAccessor = (d) => d.open,
  highAccessor = (d) => d.high,
  lowAccessor = (d) => d.low,
  closeAccessor = (d) => d.close,
  upColor = '#22c55e',
  downColor = '#ef4444',
  bodyWidth = 0.6,
  className,
}: ChartCandlestickProps) {
  const { data: ctxData, scaleX, scaleY, chartWidth } = useChart()
  const data = dataProp ?? ctxData

  const candles = useMemo(() => {
    const len = data.length
    if (len === 0) return []

    // Step width between candles
    const step = len > 1 ? (scaleX(1) - scaleX(0)) : chartWidth
    const candleW = step * bodyWidth

    const result: {
      // Wick
      wickX: number
      wickY1: number
      wickY2: number
      // Body
      bodyX: number
      bodyY: number
      bodyW: number
      bodyH: number
      // Meta
      isUp: boolean
      index: number
    }[] = new Array(len)

    for (let i = 0; i < len; i++) {
      const d = data[i]
      const open = openAccessor(d)
      const high = highAccessor(d)
      const low = lowAccessor(d)
      const close = closeAccessor(d)
      const isUp = close >= open

      const cx = scaleX(i)
      const yHigh = scaleY(high)
      const yLow = scaleY(low)
      const yOpen = scaleY(open)
      const yClose = scaleY(close)

      const bodyTop = Math.min(yOpen, yClose)
      const bodyBottom = Math.max(yOpen, yClose)

      result[i] = {
        wickX: cx,
        wickY1: yHigh,
        wickY2: yLow,
        bodyX: cx - candleW / 2,
        bodyY: bodyTop,
        bodyW: candleW,
        bodyH: Math.max(1, bodyBottom - bodyTop),
        isUp,
        index: i,
      }
    }

    return result
  }, [data, scaleX, scaleY, chartWidth, bodyWidth, openAccessor, highAccessor, lowAccessor, closeAccessor])

  if (candles.length === 0) return null

  return (
    <g className={cn(className)}>
      {candles.map((c) => {
        const color = c.isUp ? upColor : downColor
        return (
          <g key={c.index}>
            {/* Wick */}
            <line
              x1={c.wickX}
              y1={c.wickY1}
              x2={c.wickX}
              y2={c.wickY2}
              stroke={color}
              strokeWidth={1}
              shapeRendering="crispEdges"
            />
            {/* Body */}
            <rect
              x={c.bodyX}
              y={c.bodyY}
              width={c.bodyW}
              height={c.bodyH}
              fill={color}
            />
          </g>
        )
      })}
    </g>
  )
}
