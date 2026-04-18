// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartAxisValue — live neutral value readout on the Y-axis.
 *
 * Three states driven by hover + visible data range:
 *   • Resting (no hover): mean of visible data, fill var(--n600)
 *   • Hover:              value at crosshair,   fill var(--n800)
 *   • Brush selection:    mean of selection    — collapses to resting
 *     because the visible data slice already reflects the brush.
 *
 * Position is fixed (vertical center of chart area). Only the number
 * text and its fill color change. Zero re-renders on hover — ref-based
 * DOM writes only.
 */

import { useRef, useEffect, useCallback, useMemo } from 'react'
import { cn } from '@/lib/ui'
import { niceTicks } from '@/lib/charts/ticks/nice'
import { useChart } from './chart-context'
import { useChartSync } from './ChartSyncProvider'

export interface ChartAxisValueProps {
  /** Optional value formatter. Default: Math.round. */
  format?: (value: number) => string
  /** Tick count of the paired ChartAxisY. Used to dodge tick labels. Default 3. */
  tickCount?: number
  /** Optional className forwarded to the wrapping <g>. */
  className?: string
}

export function ChartAxisValue({ format, tickCount = 3, className }: ChartAxisValueProps) {
  const { data, scaleY, chartHeight } = useChart()
  const sync = useChartSync()

  const groupRef = useRef<SVGGElement>(null)
  const textRef = useRef<SVGTextElement>(null)

  // Range average — recomputed only when the visible slice changes
  const rangeAvg = useMemo(() => {
    if (data.length === 0) return 0
    let sum = 0
    for (let i = 0; i < data.length; i++) sum += data[i]
    return sum / data.length
  }, [data])

  const formatValue = useCallback(
    (v: number) => (format ? format(v) : `${Math.round(v)}`),
    [format],
  )

  // Dynamic anchor — compute actual tick positions and place pill at the
  // center of the largest tick-free gap so it never masks a tick value.
  const anchorY = useMemo(() => {
    const [dMin, dMax] = scaleY.domain
    const ticks = niceTicks(dMin, dMax, tickCount)
    const tickYs = ticks.map(scaleY).filter(Number.isFinite).sort((a, b) => a - b)
    const buffer = 6 // vertical clearance around tick labels
    const boundsLo = [0, ...tickYs.map((y) => y + buffer)]
    const boundsHi = [...tickYs.map((y) => y - buffer), chartHeight]

    let bestCenter = chartHeight / 2
    let bestSpan = -Infinity
    for (let i = 0; i < boundsLo.length; i++) {
      const lo = boundsLo[i]
      const hi = boundsHi[i]
      const span = hi - lo
      if (span > bestSpan) {
        bestSpan = span
        bestCenter = (lo + hi) / 2
      }
    }
    return Math.max(8, Math.min(Math.max(8, chartHeight - 8), bestCenter))
  }, [scaleY, chartHeight, tickCount])

  const setPos = useCallback(
    (value: number, color: string) => {
      const g = groupRef.current
      const t = textRef.current
      if (!g || !t) return
      g.style.transform = `translateY(${anchorY}px)`
      g.style.opacity = '1'
      t.textContent = formatValue(value)
      t.style.fill = color
    },
    [anchorY, formatValue],
  )

  // Resting state whenever the visible range changes (State A / C)
  useEffect(() => {
    if (data.length === 0) {
      if (groupRef.current) groupRef.current.style.opacity = '0'
      return
    }
    setPos(rangeAvg, 'var(--n600)')
  }, [rangeAvg, setPos, data.length])

  // Hover subscription — State B when index, back to resting on null
  useEffect(() => {
    if (!sync) return
    return sync.subscribeHover((index) => {
      if (index === null) {
        if (data.length > 0) setPos(rangeAvg, 'var(--n600)')
      } else if (index >= 0 && index < data.length) {
        setPos(data[index], 'var(--n800)')
      }
    })
  }, [sync, data, rangeAvg, setPos])

  return (
    <g
      ref={groupRef}
      className={cn('pointer-events-none', className)}
      style={{ opacity: 0 }}
    >
      <rect x={-36} y={-7} width={32} height={14} fill="var(--bg)" />
      <text
        ref={textRef}
        x={-8}
        y={3.5}
        textAnchor="end"
        style={{
          fontFamily: 'var(--font-sans)',
          fontVariantNumeric: 'tabular-nums',
          fontSize: 11,
          fontWeight: 550,
        }}
      />
    </g>
  )
}
