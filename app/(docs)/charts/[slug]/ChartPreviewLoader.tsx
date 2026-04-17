// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { useMemo } from 'react'
import { ChartRoot } from '@/components/charts/primitives/ChartRoot'
import { ChartLine } from '@/components/charts/primitives/ChartLine'
import { ChartArea } from '@/components/charts/primitives/ChartArea'
import { ChartBar } from '@/components/charts/primitives/ChartBar'
import { ChartAxisY } from '@/components/charts/primitives/ChartAxisY'
import { ChartAxisX } from '@/components/charts/primitives/ChartAxisX'
import { ChartDonut } from '@/components/charts/primitives/ChartDonut'
import { ChartRadar } from '@/components/charts/primitives/ChartRadar'
import { ChartRadialBar } from '@/components/charts/primitives/ChartRadialBar'
import { ChartTreemap } from '@/components/charts/primitives/ChartTreemap'
import { ChartFunnel } from '@/components/charts/primitives/ChartFunnel'
import { ChartZoneLine } from '@/components/charts/primitives/ChartZoneLine'
import { ChartScatter } from '@/components/charts/primitives/ChartScatter'
import { ChartCandlestick } from '@/components/charts/primitives/ChartCandlestick'
import { ChartBoxPlot, type BoxPlotData } from '@/components/charts/primitives/ChartBoxPlot'
import { ChartHeatmap } from '@/components/charts/primitives/ChartHeatmap'
import { ChartCalendarHeatmap, type CalendarDay } from '@/components/charts/primitives/ChartCalendarHeatmap'
import { ChartFuelLollipop, type LollipopIntake } from '@/components/charts/primitives/ChartFuelLollipop'
import { ChartAnnotation } from '@/components/charts/primitives/ChartAnnotation'

function generateSine(n: number, amp: number, offset: number): number[] {
  return Array.from({ length: n }, (_, i) => offset + amp * Math.sin(i * 0.15) + Math.random() * amp * 0.2)
}

function generateBars(n: number, max: number): number[] {
  return Array.from({ length: n }, () => Math.floor(Math.random() * max) + max * 0.2)
}

function generateZoneData(n: number, ftp: number): number[] {
  return Array.from({ length: n }, (_, i) => {
    const base = ftp * (0.6 + 0.3 * Math.sin(i * 0.05))
    return base + (Math.random() - 0.5) * ftp * 0.3
  })
}

function generateScatterPoints(n: number): { x: number; y: number; group: number }[] {
  return Array.from({ length: n }, () => {
    const group = Math.floor(Math.random() * 3)
    const cx = [30, 60, 50][group]
    const cy = [70, 40, 60][group]
    return {
      x: cx + (Math.random() - 0.5) * 30,
      y: cy + (Math.random() - 0.5) * 30,
      group,
    }
  })
}

function generateOHLC(n: number): { open: number; high: number; low: number; close: number }[] {
  let price = 100
  return Array.from({ length: n }, () => {
    const open = price
    const change = (Math.random() - 0.48) * 5
    const close = open + change
    const high = Math.max(open, close) + Math.random() * 3
    const low = Math.min(open, close) - Math.random() * 3
    price = close
    return { open, high, low, close }
  })
}

function generateBoxData(): BoxPlotData[] {
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  return labels.map((label) => {
    const base = 40 + Math.random() * 60
    const q1 = base
    const median = q1 + 5 + Math.random() * 15
    const q3 = median + 5 + Math.random() * 15
    return {
      label,
      min: q1 - 10 - Math.random() * 10,
      q1,
      median,
      q3,
      max: q3 + 10 + Math.random() * 10,
      outliers: Math.random() > 0.5 ? [q3 + 30 + Math.random() * 20] : [],
    }
  })
}

function generateHeatmapData(): { data: (number | null)[][]; xLabels: string[]; yLabels: string[] } {
  const hours = ['6am', '9am', '12pm', '3pm', '6pm', '9pm']
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const data = days.map(() =>
    hours.map(() => Math.random() > 0.1 ? Math.floor(Math.random() * 100) : null)
  )
  return { data, xLabels: hours, yLabels: days }
}

function generateCalendarData(days: number): CalendarDay[] {
  const result: CalendarDay[] = []
  const now = new Date()
  for (let i = days; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    result.push({
      date: d.toISOString().slice(0, 10),
      value: Math.random() > 0.3 ? Math.floor(Math.random() * 8) : 0,
    })
  }
  return result
}

function generateFuelIntakes(): LollipopIntake[] {
  return [
    { timestamp: 900, choGrams: 30 },
    { timestamp: 1800, choGrams: 40 },
    { timestamp: 2700, choGrams: 35 },
    { timestamp: 3600, choGrams: 45 },
    { timestamp: 4500, choGrams: 30 },
  ]
}

function LinePreview() {
  const data = useMemo(() => generateSine(80, 50, 200), [])
  return (
    <ChartRoot data={data} height={200}>
      <ChartLine className="stroke-[var(--n1150)] stroke-[1.5]" />
      <ChartAxisY />
    </ChartRoot>
  )
}

function AreaPreview() {
  const data = useMemo(() => generateSine(80, 40, 150), [])
  return (
    <ChartRoot data={data} height={200}>
      <ChartArea gradientColor="#16a34a" />
      <ChartLine className="stroke-green-600 stroke-[1.5]" />
      <ChartAxisY />
    </ChartRoot>
  )
}

function BarPreview() {
  const data = useMemo(() => generateBars(12, 80), [])
  return (
    <ChartRoot data={data} height={200}>
      <ChartBar className="fill-[var(--n1150)]" radius={3} gap={2} />
      <ChartAxisY />
    </ChartRoot>
  )
}

function DonutPreview() {
  return (
    <ChartDonut
      data={[
        { label: 'Z2', value: 55 },
        { label: 'Z3', value: 25 },
        { label: 'Z4', value: 12 },
        { label: 'Z5', value: 8 },
      ]}
      valueAccessor={(d: { value: number }) => d.value}
      labelAccessor={(d: { label: string }) => d.label}
      colors={['#16A34A', '#F59E0B', '#F97316', '#EF4444']}
      centerLabel="Zone split"
      centerValue="100%"
      size={200}
    />
  )
}

function RadarPreview() {
  return (
    <ChartRadar
      dimensions={['Power', 'Endurance', 'Sprint', 'Recovery', 'Technique']}
      series={[
        { label: 'Current', values: [80, 65, 90, 70, 85], className: 'stroke-blue-500 fill-blue-500/10' },
        { label: 'Target', values: [85, 80, 85, 80, 90], className: 'stroke-[var(--n400)] fill-[var(--n400)]/5', dashed: true },
      ]}
      size={240}
    />
  )
}

function RadialBarPreview() {
  return (
    <ChartRadialBar
      items={[
        { label: 'TSS', value: 85, max: 100, color: '#3b82f6' },
        { label: 'kJ', value: 2400, max: 3000, color: '#f59e0b' },
        { label: 'CHO', value: 45, max: 60, color: '#22c55e' },
      ]}
      size={200}
    />
  )
}

function TreemapPreview() {
  return (
    <ChartTreemap
      data={[
        { label: 'Z2 Endurance', value: 55, color: '#16A34A' },
        { label: 'Z3 Tempo', value: 25, color: '#F59E0B' },
        { label: 'Z4 Threshold', value: 12, color: '#F97316' },
        { label: 'Z5 VO2max', value: 8, color: '#EF4444' },
      ]}
      width={700}
      height={200}
    />
  )
}

function FunnelPreview() {
  return (
    <ChartFunnel
      data={[
        { label: 'Sessions', value: 120, color: '#3b82f6' },
        { label: 'Completed', value: 95, color: '#22c55e' },
        { label: 'With nutrition', value: 60, color: '#f59e0b' },
        { label: 'Compliant', value: 35, color: '#ef4444' },
      ]}
      width={500}
      height={220}
    />
  )
}

function ZoneLinePreview() {
  const data = useMemo(() => generateZoneData(200, 240), [])
  const zones = useMemo(() => [
    { min: 0, max: 0.55, color: '#94a3b8', label: 'Z1' },
    { min: 0.55, max: 0.75, color: '#22c55e', label: 'Z2' },
    { min: 0.75, max: 0.90, color: '#eab308', label: 'Z3' },
    { min: 0.90, max: 1.05, color: '#f97316', label: 'Z4' },
    { min: 1.05, max: Infinity, color: '#ef4444', label: 'Z5' },
  ], [])
  return (
    <ChartRoot data={data} height={200}>
      <ChartZoneLine threshold={240} zones={zones} className="stroke-[1.5]" />
      <ChartAxisY />
    </ChartRoot>
  )
}

function ScatterPreview() {
  const points = useMemo(() => generateScatterPoints(60), [])
  const indices = useMemo(() => points.map((_, i) => i), [points])
  const colors = ['#3b82f6', '#22c55e', '#f59e0b']
  return (
    <ChartRoot data={indices} height={220} xDomain={[0, 100]} yDomain={[0, 100]} padding={{ left: 40, bottom: 20, top: 8, right: 8 }}>
      <ChartScatter
        data={points}
        xAccessor={(d) => d.x}
        yAccessor={(d) => d.y}
        colorFn={(d) => colors[d.group]}
      />
      <ChartAxisY tickCount={4} />
      <ChartAxisX labelCount={4} />
    </ChartRoot>
  )
}

function CandlestickPreview() {
  const ohlcData = useMemo(() => generateOHLC(30), [])
  const indices = useMemo(() => ohlcData.map((_, i) => i), [ohlcData])
  const yDomain: [number, number] = useMemo(() => {
    let lo = Infinity, hi = -Infinity
    for (const d of ohlcData) {
      if (d.low < lo) lo = d.low
      if (d.high > hi) hi = d.high
    }
    const pad = (hi - lo) * 0.1
    return [lo - pad, hi + pad]
  }, [ohlcData])
  return (
    <ChartRoot data={indices} height={220} xDomain={[-0.5, ohlcData.length - 0.5]} yDomain={yDomain} padding={{ left: 48, right: 8 }}>
      <ChartCandlestick data={ohlcData} />
      <ChartAxisY tickCount={4} format={(v) => `$${v.toFixed(0)}`} />
    </ChartRoot>
  )
}

function BoxPlotPreview() {
  const boxData = useMemo(() => generateBoxData(), [])
  const indices = useMemo(() => boxData.map((_, i) => i), [boxData])
  const yDomain: [number, number] = useMemo(() => {
    let lo = Infinity, hi = -Infinity
    for (const d of boxData) {
      if (d.min < lo) lo = d.min
      if (d.max > hi) hi = d.max
      for (const o of d.outliers ?? []) {
        if (o > hi) hi = o
      }
    }
    const pad = (hi - lo) * 0.12
    return [Math.max(0, lo - pad), hi + pad]
  }, [boxData])
  return (
    <ChartRoot data={indices} height={220} xDomain={[-0.5, boxData.length - 0.5]} yDomain={yDomain} padding={{ left: 48, right: 8 }}>
      <ChartBoxPlot data={boxData} />
      <ChartAxisY tickCount={4} />
    </ChartRoot>
  )
}

function HeatmapPreview() {
  const { data, xLabels, yLabels } = useMemo(() => generateHeatmapData(), [])
  return (
    <ChartHeatmap
      data={data}
      xLabels={xLabels}
      yLabels={yLabels}
      colorScale={[
        { value: 0, color: '#EBE9E3' },
        { value: 50, color: '#3b82f6' },
        { value: 100, color: '#1e3a5f' },
      ]}
      cellGap={2}
      cellRadius={2}
    />
  )
}

function CalendarHeatmapPreview() {
  const data = useMemo(() => generateCalendarData(180), [])
  const endDate = new Date().toISOString().slice(0, 10)
  const startDate = useMemo(() => {
    const d = new Date()
    d.setDate(d.getDate() - 180)
    return d.toISOString().slice(0, 10)
  }, [])
  return (
    <ChartCalendarHeatmap
      data={data}
      startDate={startDate}
      endDate={endDate}
    />
  )
}

function FuelLollipopPreview() {
  const intakes = useMemo(() => generateFuelIntakes(), [])
  const dummyData = useMemo(() => Array.from({ length: 300 }, (_, i) => i), [])
  return (
    <ChartRoot data={dummyData} height={160}>
      <ChartFuelLollipop intakes={intakes} target={200} />
    </ChartRoot>
  )
}

function AnnotationPreview() {
  const data = useMemo(() => generateSine(80, 50, 200), [])
  return (
    <ChartRoot data={data} height={200}>
      <ChartLine className="stroke-[var(--n1150)] stroke-[1.5]" />
      <ChartAnnotation annotations={[
        { type: 'point', x: 20, y: 230, label: 'Peak' },
        { type: 'range', x0: 40, x1: 55, label: 'Interval', color: '#3b82f6' },
        { type: 'line', x: 65, label: 'Marker', dashed: true },
      ]} />
      <ChartAxisY />
    </ChartRoot>
  )
}

const CHART_PREVIEWS: Record<string, React.ComponentType> = {
  'line': LinePreview,
  'area': AreaPreview,
  'bar': BarPreview,
  'donut': DonutPreview,
  'radar': RadarPreview,
  'radial-bar': RadialBarPreview,
  'treemap': TreemapPreview,
  'funnel': FunnelPreview,
  'zone-line': ZoneLinePreview,
  'scatter': ScatterPreview,
  'candlestick': CandlestickPreview,
  'box-plot': BoxPlotPreview,
  'heatmap': HeatmapPreview,
  'calendar-heatmap': CalendarHeatmapPreview,
  'fuel-lollipop': FuelLollipopPreview,
  'annotation': AnnotationPreview,
}

export function ChartPreviewLoader({ slug }: { slug: string }) {
  const Preview = CHART_PREVIEWS[slug]
  if (!Preview) return null
  return <Preview />
}
