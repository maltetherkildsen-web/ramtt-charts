'use client'

import { useMemo, useCallback, useRef } from 'react'
import { WEIGHT, RADIUS } from '@/lib/ui'

// ─── Chart primitives ───
import { ChartRoot } from '@/components/charts/primitives/ChartRoot'
import { ChartLine } from '@/components/charts/primitives/ChartLine'
import { ChartArea } from '@/components/charts/primitives/ChartArea'
import { ChartBar } from '@/components/charts/primitives/ChartBar'
import { ChartCrosshair } from '@/components/charts/primitives/ChartCrosshair'
import { ChartAxisX } from '@/components/charts/primitives/ChartAxisX'
import { ChartAxisY } from '@/components/charts/primitives/ChartAxisY'
import { ChartRefLine } from '@/components/charts/primitives/ChartRefLine'
import { ChartZoneLine, type ZoneDefinition } from '@/components/charts/primitives/ChartZoneLine'
import { ChartSyncProvider, useChartSync } from '@/components/charts/primitives/ChartSyncProvider'
import { ChartZoomHandler } from '@/components/charts/primitives/ChartZoomHandler'
import { ChartScrubber } from '@/components/charts/primitives/ChartScrubber'
import { CrosshairTimeLabel } from '@/components/charts/primitives/CrosshairTimeLabel'
import { useChart } from '@/components/charts/primitives/chart-context'

// ─── Additional primitives ───
import { ChartScatter } from '@/components/charts/primitives/ChartScatter'
import { ChartCandlestick } from '@/components/charts/primitives/ChartCandlestick'
import { ChartRadar } from '@/components/charts/primitives/ChartRadar'
import { ChartRadialBar } from '@/components/charts/primitives/ChartRadialBar'
import { ChartTreemap } from '@/components/charts/primitives/ChartTreemap'
import { ChartFunnel } from '@/components/charts/primitives/ChartFunnel'
import { ChartBoxPlot } from '@/components/charts/primitives/ChartBoxPlot'

// ─── Math utilities ───
import { stackSeries } from '@/lib/charts/utils/stack'
import { scaleLinear } from '@/lib/charts/scales/linear'
import { nearest2d } from '@/lib/charts/utils/nearest2d'
import { waterfallLayout } from '@/lib/charts/utils/waterfall'
import { arcPath, pieLayout } from '@/lib/charts/paths/arc'

// ─── Data generators ───
import {
  generateStockData,
  generateRevenueData,
  generateTemperatureData,
  generateSensorData,
  generateSparklineData,
  generateMonthlySales,
  generateRevenueGrowthData,
  generateMarketShareData,
  generateProfitLossData,
  generateBudgetData,
  generateScatterData,
  generateQuarterlyRevenueData,
  generateOHLCData,
  generateCashFlowData,
  generateAthleteProfile,
  generateGoalProgress,
  generateBrowserShareData,
  generateDiskUsageData,
  generateSalesPipeline,
  generateResponseTimeData,
} from './generate-data'
import type { ScatterPoint, OHLCPoint, ResponseTimeBox } from './generate-data'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Shared UI
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <section className={`${RADIUS.lg} border-[0.5px] border-[var(--n400)] bg-[var(--n50)] p-5`}>
      <h2 className={`text-[22px] ${WEIGHT.strong} tracking-tight text-[var(--n1150)]`}>
        {title}
      </h2>
      <p className="mt-0.5 font-sans text-[11px] tracking-wide text-text-muted">
        {subtitle}
      </p>
      <div className="mt-4">{children}</div>
    </section>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Stock Price — Line + Area + Crosshair
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function StockPriceChart() {
  const data = useMemo(() => generateStockData(365), [])

  const formatMonth = useCallback(
    (i: number, total: number) => {
      const monthIdx = Math.min(11, Math.floor((i / Math.max(1, total - 1)) * 12))
      return MONTHS[monthIdx]
    },
    [],
  )

  return (
    <ChartCard title="Stock Price" subtitle="ChartRoot + ChartLine + ChartArea + ChartCrosshair + Axes">
      <ChartRoot data={data} height={260} padding={{ right: 16 }}>
        <ChartArea gradientColor="#3b82f6" opacityFrom={0.12} opacityTo={0.005} />
        <ChartLine className="fill-none stroke-blue-500 stroke-[1.5]" />
        <ChartAxisX labelCount={6} format={formatMonth} />
        <ChartAxisY tickCount={4} format={(v) => `$${v.toFixed(0)}`} />
        <ChartCrosshair dotColor="#3b82f6" />
        <ChartZoomHandler />
      </ChartRoot>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. Revenue vs. Costs — Multi-line + RefLine + Legend
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function RevenueChart() {
  const { revenue, costs } = useMemo(() => generateRevenueData(12), [])

  // Y domain must encompass both series
  const yMax = useMemo(() => Math.max(...revenue, ...costs), [revenue, costs])

  // Break-even: first month where revenue >= costs
  const breakEvenValue = useMemo(() => {
    for (let i = 0; i < revenue.length; i++) {
      if (revenue[i] >= costs[i]) return Math.round(revenue[i])
    }
    return null
  }, [revenue, costs])

  const formatMonth = useCallback(
    (i: number) => MONTHS[i] ?? '',
    [],
  )

  return (
    <ChartCard title="Revenue vs. Costs" subtitle="Two ChartLine + ChartRefLine + Legend">
      <ChartRoot data={revenue} height={260} yDomain={[0, yMax * 1.12]} padding={{ right: 72 }}>
        <ChartLine className="fill-none stroke-emerald-500 stroke-[1.5]" />
        <ChartLine data={costs} className="fill-none stroke-red-400 stroke-[1.5]" />
        {breakEvenValue !== null && (
          <ChartRefLine y={breakEvenValue} label="Break-even" />
        )}
        <ChartAxisX
          labelCount={12}
          format={formatMonth}
                 />
        <ChartAxisY tickCount={4} format={(v) => `$${v.toFixed(0)}k`} />
        <ChartCrosshair dotColor="#10b981" />
        <ChartZoomHandler />
      </ChartRoot>
      {/* Legend */}
      <div className="ml-12 mt-2 flex gap-5">
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-[2px] w-3 rounded-full bg-emerald-500" />
          <span className="font-sans text-[10px] tracking-wide text-text-muted">Revenue</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="inline-block h-[2px] w-3 rounded-full bg-red-400" />
          <span className="font-sans text-[10px] tracking-wide text-text-muted">Costs</span>
        </div>
      </div>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. Server Temperature — ChartZoneLine (ColorLine)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

/**
 * Custom temperature zones. Threshold is set to 100 so that
 * zone min/max fractions map directly to °C values.
 *
 * < 40 °C  → Cool  (blue)
 * 40–60 °C → Normal (green)
 * 60–75 °C → Warm  (amber)
 * > 75 °C  → Hot   (red)
 */
const TEMP_ZONES: ZoneDefinition[] = [
  { min: 0, max: 0.40, color: '#3b82f6', label: 'Cool' },
  { min: 0.40, max: 0.60, color: '#22c55e', label: 'Normal' },
  { min: 0.60, max: 0.75, color: '#f59e0b', label: 'Warm' },
  { min: 0.75, max: Infinity, color: '#ef4444', label: 'Hot' },
]

function TemperatureChart() {
  const data = useMemo(() => generateTemperatureData(24, 20), [])

  const formatHour = useCallback(
    (i: number, total: number) => {
      const hour = Math.floor((i / Math.max(1, total - 1)) * 24)
      return `${hour.toString().padStart(2, '0')}:00`
    },
    [],
  )

  return (
    <ChartCard title="Server Temperature" subtitle="ChartZoneLine with custom threshold zones">
      <ChartRoot data={data} height={260} padding={{ right: 56 }}>
        <ChartZoneLine threshold={100} zones={TEMP_ZONES} className="stroke-[1.5]" />
        <ChartRefLine y={75} label="Alert" className="stroke-red-400/60" />
        <ChartAxisX labelCount={6} format={formatHour} />
        <ChartAxisY tickCount={4} format={(v) => `${v.toFixed(0)}°C`} />
        <ChartCrosshair dotColor="#f59e0b" />
        <ChartZoomHandler />
      </ChartRoot>
      {/* Zone legend */}
      <div className="ml-12 mt-2 flex gap-4">
        {TEMP_ZONES.map((z) => (
          <div key={z.label} className="flex items-center gap-1.5">
            <span
              className="inline-block h-[2px] w-3 rounded-full"
              style={{ backgroundColor: z.color }}
            />
            <span className="font-sans text-[10px] tracking-wide text-text-muted">
              {z.label}
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. IoT Sensor Dashboard — Synced stacked charts
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

interface SensorData {
  temperature: number[]
  humidity: number[]
  pressure: number[]
}

function IoTDashboard() {
  const data = useMemo(() => generateSensorData(1000), [])

  return (
    <ChartCard title="IoT Sensor Dashboard" subtitle="ChartSyncProvider + zoom + brush + scrubber — synced across 3 charts">
      <ChartSyncProvider dataLength={data.temperature.length}>
        <IoTCharts data={data} />
      </ChartSyncProvider>
    </ChartCard>
  )
}

/** Inner component that accesses sync context for zoom slicing. */
function IoTCharts({ data }: { data: SensorData }) {
  const sync = useChartSync()!
  const { start, end } = sync.zoom

  // Slice visible range
  const visTemp = useMemo(
    () => data.temperature.slice(start, end + 1),
    [data.temperature, start, end],
  )
  const visHum = useMemo(
    () => data.humidity.slice(start, end + 1),
    [data.humidity, start, end],
  )
  const visPres = useMemo(
    () => data.pressure.slice(start, end + 1),
    [data.pressure, start, end],
  )

  // X-axis: map visible index → "HH:MM"
  const formatX = useCallback(
    (i: number) => {
      const fullIdx = start + i
      const seconds = (fullIdx / data.temperature.length) * 24 * 3600
      const h = Math.floor(seconds / 3600)
      const m = Math.floor((seconds % 3600) / 60)
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    },
    [start, data.temperature.length],
  )

  // CrosshairTimeLabel: receives full data index
  const formatTimeLabel = useCallback(
    (fullIdx: number) => {
      const seconds = (fullIdx / data.temperature.length) * 24 * 3600
      const h = Math.floor(seconds / 3600)
      const m = Math.floor((seconds % 3600) / 60)
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
    },
    [data.temperature.length],
  )

  const chartPad = { right: 64, bottom: 4 }
  const bottomPad = { right: 64 }

  return (
    <div className="-mx-1">
      {/* ── Label row ── */}
      <div className="mb-1 flex gap-5 px-1 pl-[52px]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-[2px] w-3 rounded-full bg-red-500" />
          <span className="font-sans text-[10px] tracking-wide text-text-muted">Temperature</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-[2px] w-3 rounded-full bg-blue-500" />
          <span className="font-sans text-[10px] tracking-wide text-text-muted">Humidity</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-[2px] w-3 rounded-full bg-amber-500" />
          <span className="font-sans text-[10px] tracking-wide text-text-muted">Pressure</span>
        </span>
      </div>

      {/* ── Temperature (top) ── */}
      <ChartRoot data={visTemp} height={150} padding={chartPad}>
        <ChartArea gradientColor="#ef4444" opacityFrom={0.08} opacityTo={0.005} />
        <ChartLine className="fill-none stroke-red-500 stroke-[1.5]" />
        <ChartAxisY tickCount={3} format={(v) => `${v.toFixed(0)}°C`} />
        <ChartCrosshair dotColor="#ef4444" />
        <ChartZoomHandler />
      </ChartRoot>

      {/* ── Humidity (middle) ── */}
      <ChartRoot data={visHum} height={120} padding={chartPad}>
        <ChartLine className="fill-none stroke-blue-500 stroke-[1.5]" />
        <ChartAxisY tickCount={3} format={(v) => `${v.toFixed(0)}%`} />
        <ChartCrosshair dotColor="#3b82f6" />
        <ChartZoomHandler />
      </ChartRoot>

      {/* ── Pressure (bottom — gets X-axis) ── */}
      <ChartRoot data={visPres} height={120} padding={bottomPad}>
        <ChartLine className="fill-none stroke-amber-500 stroke-[1.5]" />
        <ChartAxisX labelCount={6} format={formatX} />
        <ChartAxisY tickCount={3} format={(v) => `${v.toFixed(0)}`} />
        <ChartCrosshair dotColor="#f59e0b" />
        <ChartZoomHandler />
      </ChartRoot>

      {/* ── Time label (between charts and scrubber) ── */}
      <CrosshairTimeLabel format={formatTimeLabel} padLeft={48} padRight={64} />

      {/* ── Scrubber ── */}
      <ChartScrubber data={data.temperature} color="#ef4444" />

      {/* ── Interaction hints ── */}
      <p className="mt-2 px-1 pl-[52px] font-sans text-[10px] tracking-wide text-text-muted/60">
        Scroll to zoom &middot; Drag to brush-select &middot; Arrow keys to pan &middot; Double-click to reset
      </p>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. Sparkline Strip — "Key Metrics"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SPARKLINE_METRICS = [
  { label: 'Revenue', value: '$142K', delta: '+12.4%', positive: true, trend: 'up' as const, seed: 501 },
  { label: 'Users', value: '8,421', delta: '+24.1%', positive: true, trend: 'up' as const, seed: 502 },
  { label: 'Conversion', value: '3.2%', delta: '+0.3%', positive: true, trend: 'flat' as const, seed: 503 },
  { label: 'Churn', value: '1.8%', delta: '-0.4%', positive: false, trend: 'down' as const, seed: 504 },
  { label: 'MRR', value: '€89K', delta: '+8.7%', positive: true, trend: 'up' as const, seed: 505 },
]

function SparklineStrip() {
  return (
    <section>
      <h2 className={`mb-1 text-[22px] ${WEIGHT.strong} tracking-tight text-(--n1150)`}>
        Key Metrics
      </h2>
      <p className="mb-4 font-sans text-[11px] font-[450] text-(--n600)">
        ChartRoot + ChartLine + ChartArea at micro dimensions — sparkline pattern
      </p>
      <div className="flex gap-4 overflow-x-auto">
        {SPARKLINE_METRICS.map((m) => (
          <SparklineCard key={m.label} {...m} />
        ))}
      </div>
    </section>
  )
}

function SparklineCard({
  label,
  value,
  delta,
  positive,
  trend,
  seed,
}: {
  label: string
  value: string
  delta: string
  positive: boolean
  trend: 'up' | 'down' | 'flat' | 'volatile'
  seed: number
}) {
  const data = useMemo(() => generateSparklineData(trend, seed), [trend, seed])
  const color = positive ? '#22c55e' : '#ef4444'

  return (
    <div className={`min-w-[160px] flex-1 ${RADIUS.lg} border-[0.5px] border-(--n400) bg-(--n50) p-4`}>
      <span
        className="text-[11px] font-[550] text-(--n600)"
        style={{ fontFamily: 'var(--font-sans)' }}
      >
        {label}
      </span>
      <div className="mt-1 flex items-baseline gap-2">
        <span
          className="text-[20px] font-[550] text-(--n1150)"
          style={{ fontFamily: 'var(--font-sans)', fontVariantNumeric: 'tabular-nums' }}
        >
          {value}
        </span>
        <span
          className="text-[12px] font-[450]"
          style={{ fontFamily: 'var(--font-sans)', fontVariantNumeric: 'tabular-nums', color }}
        >
          {delta}
        </span>
      </div>
      <div className="mt-2" style={{ '--spark-color': color } as React.CSSProperties}>
        <ChartRoot data={data} height={40} padding={{ top: 4, right: 0, bottom: 4, left: 0 }}>
          <ChartArea gradientColor={color} opacityFrom={0.12} opacityTo={0.005} />
          <ChartLine className="fill-none stroke-[1.5] stroke-(--spark-color)" />
        </ChartRoot>
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. Monthly Sales — Bar Chart with spotlight hover
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function MonthlySalesChart() {
  const salesData = useMemo(() => generateMonthlySales(), [])
  const values = useMemo(() => salesData.map((d) => d.value), [salesData])

  return (
    <ChartCard title="Monthly Sales" subtitle="ChartBar + bar highlight — spotlight pattern with value labels">
      <ChartRoot
        data={values}
        height={280}
        yDomain={[0, Math.max(...values) * 1.12]}
        xDomain={[-0.5, values.length - 0.5]}
        padding={{ right: 16 }}
      >
        <BarHoverInner
          values={values}
          labels={salesData.map((d) => d.month)}
          formatValue={(v) => `$${(v / 1000).toFixed(0)}k`}
          barClassName="fill-blue-500"
          pillColor="var(--n1150)"
          pillTextColor="var(--n50)"
        />
      </ChartRoot>
    </ChartCard>
  )
}

/**
 * Shared inner component for bar charts with spotlight hover.
 * Zero re-renders on mouse move — all DOM manipulation via refs + rAF.
 */
function BarHoverInner({
  values,
  labels,
  formatValue,
  barClassName = 'fill-blue-500',
  barColorFn,
  pillColor = 'var(--n1150)',
  pillTextColor = 'var(--n50)',
  pillColorFn,
}: {
  values: number[]
  labels: string[]
  formatValue: (v: number) => string
  barClassName?: string
  barColorFn?: (v: number, i: number) => string
  pillColor?: string
  pillTextColor?: string
  pillColorFn?: (v: number) => { bg: string; text: string }
}) {
  const { scaleX, scaleY, chartWidth, chartHeight } = useChart()
  const barGroupRef = useRef<SVGGElement>(null)
  const labelRef = useRef<SVGGElement>(null)
  const activeIdx = useRef(-1)

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const localX = (e.clientX - rect.left) * (chartWidth / rect.width)
    const idx = Math.min(values.length - 1, Math.max(0, Math.round(scaleX.inverse(localX))))
    if (idx === activeIdx.current) return
    activeIdx.current = idx

    requestAnimationFrame(() => {
      // Spotlight: hovered bar full, others faded
      const rects = barGroupRef.current?.querySelectorAll('rect')
      rects?.forEach((bar, i) => {
        ;(bar as SVGRectElement).style.opacity = i === idx ? '1' : '0.4'
      })

      // Position value label
      const g = labelRef.current
      if (!g) return
      const text = g.querySelector('text') as SVGTextElement
      const bg = g.querySelector('rect') as SVGRectElement
      const arrow = g.querySelector('polygon') as SVGPolygonElement

      text.textContent = formatValue(values[idx])

      // Pill color per bar value
      const colors = pillColorFn ? pillColorFn(values[idx]) : { bg: pillColor, text: pillTextColor }
      bg.setAttribute('fill', colors.bg)
      text.setAttribute('fill', colors.text)
      arrow.setAttribute('fill', colors.bg)

      const cx = scaleX(idx)
      const vy = scaleY(values[idx])
      const isNeg = values[idx] < 0
      const zeroY = scaleY(0)

      // Position: above bar for positive, below bar for negative
      const labelY = isNeg ? Math.max(vy, zeroY) + 10 : vy - 10
      g.setAttribute('transform', `translate(${cx.toFixed(1)},${labelY.toFixed(1)})`)

      const bbox = text.getBBox()
      const px = 7, py = 3
      bg.setAttribute('x', (bbox.x - px).toFixed(1))
      bg.setAttribute('y', (bbox.y - py).toFixed(1))
      bg.setAttribute('width', (bbox.width + px * 2).toFixed(1))
      bg.setAttribute('height', (bbox.height + py * 2).toFixed(1))
      bg.setAttribute('rx', '4')

      // Arrow: points toward the bar
      if (isNeg) {
        const ay = bbox.y - py
        arrow.setAttribute('points', `-3.5,${ay.toFixed(1)} 3.5,${ay.toFixed(1)} 0,${(ay - 4).toFixed(1)}`)
      } else {
        const ay = bbox.y + bbox.height + py
        arrow.setAttribute('points', `-3.5,${ay.toFixed(1)} 3.5,${ay.toFixed(1)} 0,${(ay + 4).toFixed(1)}`)
      }

      g.style.opacity = '1'
    })
  }, [values, scaleX, scaleY, chartWidth, formatValue, pillColor, pillTextColor, pillColorFn])

  const handlePointerLeave = useCallback(() => {
    activeIdx.current = -1
    requestAnimationFrame(() => {
      barGroupRef.current?.querySelectorAll('rect').forEach((bar) => {
        ;(bar as SVGRectElement).style.opacity = '1'
      })
      if (labelRef.current) labelRef.current.style.opacity = '0'
    })
  }, [])

  return (
    <>
      <g ref={barGroupRef}>
        <ChartBar
          className={barClassName}
          colorFn={barColorFn}
          radius={3}
          gap={16}
        />
      </g>
      <ChartAxisY tickCount={4} format={(v) => formatValue(v)} />
      <ChartAxisX
        labelCount={labels.length}
        format={(i) => labels[i] ?? ''}
        tickValues={labels.map((_, i) => i)}
      />
      {/* Value label pill — hidden by default */}
      <g ref={labelRef} style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }}>
        <rect rx={4} fill={pillColor} />
        <text
          textAnchor="middle"
          fill={pillTextColor}
          fontSize={12}
          dy="0.35em"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums' }}
        />
        <polygon fill={pillColor} />
      </g>
      {/* Invisible overlay for pointer events */}
      <rect
        x={0}
        y={0}
        width={chartWidth}
        height={chartHeight}
        fill="transparent"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      />
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 7. Revenue & Growth Rate — Composed (Bar + Line, Dual Y-Axis)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ComposedChart() {
  const composedData = useMemo(() => generateRevenueGrowthData(), [])
  const revenues = useMemo(() => composedData.map((d) => d.revenue), [composedData])
  const growthValues = useMemo(() => composedData.map((d) => d.growth), [composedData])
  const growthDomain: [number, number] = useMemo(() => {
    const max = Math.max(...growthValues)
    return [0, Math.ceil(max / 5) * 5 + 5]
  }, [growthValues])

  return (
    <ChartCard title="Revenue & Growth Rate" subtitle="ChartBar + ChartLine dual Y-axis — bar highlight + line dot">
      <ChartRoot
        data={revenues}
        height={300}
        yDomain={[0, Math.max(...revenues) * 1.15]}
        xDomain={[-0.5, revenues.length - 0.5]}
        padding={{ right: 56 }}
      >
        <ComposedInner
          revenues={revenues}
          growthValues={growthValues}
          growthDomain={growthDomain}
          labels={composedData.map((d) => d.month)}
        />
      </ChartRoot>
      {/* Legend */}
      <div className="ml-12 mt-2 flex gap-5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-[2px] bg-blue-500/70" />
          <span className="font-sans text-[12px] text-(--n800)">Revenue (left axis)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-3 rounded-full bg-emerald-500" />
          <span className="font-sans text-[12px] text-(--n800)">Growth rate (right axis)</span>
        </div>
      </div>
    </ChartCard>
  )
}

function ComposedInner({
  revenues,
  growthValues,
  growthDomain,
  labels,
}: {
  revenues: number[]
  growthValues: number[]
  growthDomain: [number, number]
  labels: string[]
}) {
  const { scaleX, scaleY, chartWidth, chartHeight } = useChart()
  const barGroupRef = useRef<SVGGElement>(null)
  const lineDotRef = useRef<SVGCircleElement>(null)
  const labelRef = useRef<SVGGElement>(null)
  const activeIdx = useRef(-1)

  const growthScaleY = useMemo(
    () => scaleLinear([growthDomain[0], growthDomain[1]], [chartHeight, 0]),
    [growthDomain, chartHeight],
  )

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const localX = (e.clientX - rect.left) * (chartWidth / rect.width)
    const raw = scaleX.inverse(localX)
    const idx = Math.min(revenues.length - 1, Math.max(0, Math.round(raw)))
    if (!isFinite(idx) || idx < 0 || idx >= revenues.length) return
    if (idx === activeIdx.current) return
    activeIdx.current = idx

    const rev = revenues[idx]
    const growth = growthValues[idx]
    if (rev === undefined || growth === undefined) return

    requestAnimationFrame(() => {
      // Spotlight bars
      barGroupRef.current?.querySelectorAll('rect').forEach((bar, i) => {
        ;(bar as SVGRectElement).style.opacity = i === idx ? '1' : '0.4'
      })

      const cx = scaleX(idx)
      const barTopY = scaleY(rev)
      const dotY = growthScaleY(growth)

      // Line dot
      if (lineDotRef.current) {
        lineDotRef.current.setAttribute('cx', cx.toFixed(1))
        lineDotRef.current.setAttribute('cy', dotY.toFixed(1))
        lineDotRef.current.style.opacity = '1'
      }

      // Combined pill: revenue + growth in one dark pill above bar
      const g = labelRef.current
      if (g) {
        const texts = g.querySelectorAll('text')
        const bg = g.querySelector('rect') as SVGRectElement
        const revText = texts[0] as SVGTextElement
        const growthText = texts[1] as SVGTextElement

        revText.textContent = `$${(rev / 1000).toFixed(0)}k`
        growthText.textContent = `${growth.toFixed(1)}%`

        g.setAttribute('transform', `translate(${cx.toFixed(1)},${(barTopY - 12).toFixed(1)})`)

        const bbox1 = revText.getBBox()
        const bbox2 = growthText.getBBox()
        const w = Math.max(bbox1.width, bbox2.width) + 16
        const h = bbox1.height + bbox2.height + 10
        bg.setAttribute('x', (-w / 2).toFixed(1))
        bg.setAttribute('y', (-h).toFixed(1))
        bg.setAttribute('width', w.toFixed(1))
        bg.setAttribute('height', h.toFixed(1))
        bg.setAttribute('rx', '4')

        revText.setAttribute('y', (-h + bbox1.height + 3).toFixed(1))
        growthText.setAttribute('y', (-h + bbox1.height + bbox2.height + 7).toFixed(1))

        g.style.opacity = '1'
      }
    })
  }, [revenues, growthValues, scaleX, scaleY, growthScaleY, chartWidth])

  const handlePointerLeave = useCallback(() => {
    activeIdx.current = -1
    requestAnimationFrame(() => {
      barGroupRef.current?.querySelectorAll('rect').forEach((bar) => {
        ;(bar as SVGRectElement).style.opacity = '1'
      })
      if (labelRef.current) labelRef.current.style.opacity = '0'
      if (lineDotRef.current) lineDotRef.current.style.opacity = '0'
    })
  }, [])

  return (
    <>
      <g ref={barGroupRef}>
        <ChartBar className="fill-blue-500/70" radius={3} gap={16} />
      </g>
      <ChartLine
        data={growthValues}
        yDomain={growthDomain}
        className="fill-none stroke-emerald-500 stroke-2"
      />
      <ChartAxisY tickCount={4} format={(v) => `$${(v / 1000).toFixed(0)}k`} />
      <ChartAxisY
        position="right"
        domain={growthDomain}
        tickCount={4}
        format={(v) => `${v.toFixed(0)}%`}
      />
      <ChartAxisX
        labelCount={labels.length}
        format={(i) => labels[i] ?? ''}
        tickValues={labels.map((_, i) => i)}
      />
      {/* Combined value pill — always two-line: revenue (white) + growth (green) */}
      <g ref={labelRef} style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }}>
        <rect fill="var(--n1150)" />
        <text textAnchor="middle" fill="var(--n50)" fontSize={12}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums' }} />
        <text textAnchor="middle" fill="#22c55e" fontSize={11}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, fontVariantNumeric: 'tabular-nums' }} />
      </g>
      {/* Line dot */}
      <circle ref={lineDotRef} r={4} fill="white" stroke="#22c55e" strokeWidth={2}
        style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }} />
      {/* Invisible overlay */}
      <rect x={0} y={0} width={chartWidth} height={chartHeight}
        fill="transparent" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} />
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. Market Share — Stacked Area with crosshair + segment highlight
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const MARKET_COLORS = [
  { name: 'Acme Corp', color: '#3b82f6', className: 'bg-blue-500' },
  { name: 'Globex', color: '#22c55e', className: 'bg-emerald-500' },
  { name: 'Initech', color: '#f59e0b', className: 'bg-amber-500' },
  { name: 'Umbrella', color: '#8b5cf6', className: 'bg-purple-500' },
]

function MarketShareChart() {
  const rawData = useMemo(() => generateMarketShareData(), [])

  const accessors = [
    (d: any) => d.companyA,
    (d: any) => d.companyB,
    (d: any) => d.companyC,
    (d: any) => d.companyD,
  ]

  const stacked = useMemo(() => stackSeries(rawData, accessors), [rawData])
  const indices = useMemo(() => rawData.map(() => 100), [rawData])
  const legendRefs = useRef<(HTMLSpanElement | null)[]>([])

  return (
    <ChartCard title="Market Share" subtitle="ChartArea + stackSeries — crosshair with segment highlight">
      <ChartRoot data={indices} height={320} yDomain={[0, 100]} padding={{ right: 16 }}>
        <MarketShareInner stacked={stacked} indices={indices} legendRefs={legendRefs} />
      </ChartRoot>
      {/* Legend */}
      <div className="ml-12 mt-2 flex gap-5">
        {MARKET_COLORS.map((c, i) => (
          <div key={c.name} className="flex items-center gap-2">
            <span className={`inline-block h-2 w-2 rounded-[2px] ${c.className}`} />
            <span
              ref={(el) => { legendRefs.current[i] = el }}
              className="font-sans text-[12px] text-(--n800)"
              style={{ transition: 'opacity 150ms, font-weight 150ms' }}
            >
              {c.name}
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

function MarketShareInner({
  stacked,
  indices,
  legendRefs,
}: {
  stacked: { y0: number; y1: number }[][]
  indices: number[]
  legendRefs: React.RefObject<(HTMLSpanElement | null)[]>
}) {
  const { scaleX, scaleY, chartWidth, chartHeight } = useChart()
  const areaRefs = useRef<(SVGGElement | null)[]>([])
  const crosshairRef = useRef<SVGLineElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const segLabelRef = useRef<SVGGElement>(null)
  const activeSeg = useRef(-1)

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratioX = chartWidth / rect.width
    const ratioY = chartHeight / rect.height
    const localX = (e.clientX - rect.left) * ratioX
    const localY = (e.clientY - rect.top) * ratioY
    const dataIdx = Math.min(indices.length - 1, Math.max(0, Math.round(scaleX.inverse(localX))))
    const yValue = scaleY.inverse(localY)

    // Find which segment the cursor y falls into
    let segIdx = -1
    for (let s = 0; s < stacked.length; s++) {
      const seg = stacked[s][dataIdx]
      if (yValue >= seg.y0 && yValue <= seg.y1) {
        segIdx = s
        break
      }
    }
    if (segIdx === -1) {
      if (yValue <= 0) segIdx = 0
      else segIdx = stacked.length - 1
    }

    requestAnimationFrame(() => {
      // Crosshair line
      const px = scaleX(dataIdx)
      if (crosshairRef.current) {
        crosshairRef.current.setAttribute('x1', px.toFixed(1))
        crosshairRef.current.setAttribute('x2', px.toFixed(1))
        crosshairRef.current.style.opacity = '1'
      }

      // Dot on y1 edge of hovered segment
      if (dotRef.current && segIdx >= 0) {
        const dotY = scaleY(stacked[segIdx][dataIdx].y1)
        dotRef.current.setAttribute('cx', px.toFixed(1))
        dotRef.current.setAttribute('cy', dotY.toFixed(1))
        dotRef.current.setAttribute('fill', MARKET_COLORS[segIdx].color)
        dotRef.current.style.opacity = '1'
      }

      // Highlight: hovered segment full, others faded
      areaRefs.current.forEach((g, i) => {
        if (g) {
          g.style.opacity = i === segIdx ? '1' : '0.2'
          g.style.transition = 'opacity 150ms'
        }
      })

      // Legend sync
      legendRefs.current?.forEach((el, i) => {
        if (!el) return
        el.style.fontWeight = i === segIdx ? '550' : '400'
        el.style.opacity = i === segIdx ? '1' : '0.5'
      })

      // Segment label
      const gl = segLabelRef.current
      if (gl && segIdx >= 0) {
        const text = gl.querySelector('text') as SVGTextElement
        const bg = gl.querySelector('rect') as SVGRectElement
        const val = (stacked[segIdx][dataIdx].y1 - stacked[segIdx][dataIdx].y0).toFixed(1)
        text.textContent = `${MARKET_COLORS[segIdx].name}: ${val}%`
        const midY = scaleY((stacked[segIdx][dataIdx].y0 + stacked[segIdx][dataIdx].y1) / 2)
        gl.setAttribute('transform', `translate(${(px + 10).toFixed(1)},${midY.toFixed(1)})`)
        const bbox = text.getBBox()
        bg.setAttribute('x', (bbox.x - 6).toFixed(1))
        bg.setAttribute('y', (bbox.y - 3).toFixed(1))
        bg.setAttribute('width', (bbox.width + 12).toFixed(1))
        bg.setAttribute('height', (bbox.height + 6).toFixed(1))
        bg.setAttribute('rx', '4')
        bg.setAttribute('fill', MARKET_COLORS[segIdx].color)
        gl.style.opacity = '1'
      }

      activeSeg.current = segIdx
    })
  }, [stacked, indices, scaleX, scaleY, chartWidth, chartHeight, legendRefs])

  const handlePointerLeave = useCallback(() => {
    activeSeg.current = -1
    requestAnimationFrame(() => {
      areaRefs.current.forEach((g) => {
        if (g) { g.style.opacity = '1'; g.style.transition = 'opacity 150ms' }
      })
      legendRefs.current?.forEach((el) => {
        if (!el) return
        el.style.fontWeight = '400'
        el.style.opacity = '1'
      })
      if (crosshairRef.current) crosshairRef.current.style.opacity = '0'
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (segLabelRef.current) segLabelRef.current.style.opacity = '0'
    })
  }, [legendRefs])

  return (
    <>
      {/* Render bottom-to-top */}
      {[...stacked].reverse().map((series, reverseIdx) => {
        const originalIdx = stacked.length - 1 - reverseIdx
        return (
          <g key={originalIdx} ref={(el) => { areaRefs.current[originalIdx] = el }}
            style={{ transition: 'opacity 150ms' }}>
            <ChartArea
              data={indices}
              gradientColor={MARKET_COLORS[originalIdx].color}
              opacityFrom={0.7}
              opacityTo={0.7}
              y0Accessor={(_, i) => series[i].y0}
              yAccessor={(_, i) => series[i].y1}
            />
          </g>
        )
      })}
      <ChartAxisY tickCount={4} format={(v) => `${v.toFixed(0)}%`} />
      <ChartAxisX labelCount={5} format={(i) => `Y${Math.floor(i / 12) + 1}`} />
      {/* Crosshair line */}
      <line ref={crosshairRef} x1={0} y1={0} x2={0} y2={chartHeight}
        stroke="#71717a" strokeWidth={0.5} shapeRendering="crispEdges"
        style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }} />
      {/* Crosshair dot */}
      <circle ref={dotRef} r={5} fill="#3b82f6" stroke="white" strokeWidth={2}
        style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }} />
      {/* Segment label */}
      <g ref={segLabelRef} style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }}>
        <rect fill="#3b82f6" />
        <text textAnchor="start" fill="white" fontSize={11} dy="0.35em"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }} />
      </g>
      {/* Invisible overlay */}
      <rect x={0} y={0} width={chartWidth} height={chartHeight}
        fill="transparent" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} />
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. Profit & Loss — Negative Values with spotlight hover
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ProfitLossChart() {
  const plData = useMemo(() => generateProfitLossData(), [])
  const values = useMemo(() => plData.map((d) => d.value), [plData])

  return (
    <ChartCard title="Profit & Loss" subtitle="ChartBar + colorFn — positive/negative with colored value labels">
      <ChartRoot
        data={values}
        height={280}
        xDomain={[-0.5, values.length - 0.5]}
        padding={{ right: 16 }}
      >
        <ProfitLossInner values={values} labels={plData.map((d) => d.month)} />
      </ChartRoot>
      {/* Legend */}
      <div className="ml-12 mt-2 flex gap-5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-[2px] bg-emerald-500" />
          <span className="font-sans text-[12px] text-(--n800)">Profit</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-[2px] bg-red-500" />
          <span className="font-sans text-[12px] text-(--n800)">Loss</span>
        </div>
      </div>
    </ChartCard>
  )
}

function ProfitLossInner({ values, labels }: { values: number[]; labels: string[] }) {
  const { scaleX, scaleY, chartWidth, chartHeight } = useChart()
  const barGroupRef = useRef<SVGGElement>(null)
  const labelRef = useRef<SVGGElement>(null)
  const activeIdx = useRef(-1)

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const localX = (e.clientX - rect.left) * (chartWidth / rect.width)
    const idx = Math.min(values.length - 1, Math.max(0, Math.round(scaleX.inverse(localX))))
    if (idx === activeIdx.current) return
    activeIdx.current = idx

    requestAnimationFrame(() => {
      barGroupRef.current?.querySelectorAll('rect').forEach((bar, i) => {
        ;(bar as SVGRectElement).style.opacity = i === idx ? '1' : '0.4'
      })

      const g = labelRef.current
      if (!g) return
      const text = g.querySelector('text') as SVGTextElement
      const bg = g.querySelector('rect') as SVGRectElement
      const arrow = g.querySelector('polygon') as SVGPolygonElement

      const v = values[idx]
      const abs = Math.abs(v)
      text.textContent = v < 0 ? `-$${(abs / 1000).toFixed(0)}k` : `$${(abs / 1000).toFixed(0)}k`

      const isNeg = v < 0
      const pillBg = isNeg ? '#ef4444' : '#22c55e'
      bg.setAttribute('fill', pillBg)
      arrow.setAttribute('fill', pillBg)
      text.setAttribute('fill', 'white')

      const cx = scaleX(idx)
      const vy = scaleY(v)
      const zeroY = scaleY(0)
      const labelY = isNeg ? Math.max(vy, zeroY) + 10 : Math.min(vy, zeroY) - 10
      g.setAttribute('transform', `translate(${cx.toFixed(1)},${labelY.toFixed(1)})`)

      const bbox = text.getBBox()
      const px = 7, py = 3
      bg.setAttribute('x', (bbox.x - px).toFixed(1))
      bg.setAttribute('y', (bbox.y - py).toFixed(1))
      bg.setAttribute('width', (bbox.width + px * 2).toFixed(1))
      bg.setAttribute('height', (bbox.height + py * 2).toFixed(1))
      bg.setAttribute('rx', '4')

      if (isNeg) {
        const ay = bbox.y - py
        arrow.setAttribute('points', `-3.5,${ay.toFixed(1)} 3.5,${ay.toFixed(1)} 0,${(ay - 4).toFixed(1)}`)
      } else {
        const ay = bbox.y + bbox.height + py
        arrow.setAttribute('points', `-3.5,${ay.toFixed(1)} 3.5,${ay.toFixed(1)} 0,${(ay + 4).toFixed(1)}`)
      }
      g.style.opacity = '1'
    })
  }, [values, scaleX, scaleY, chartWidth])

  const handlePointerLeave = useCallback(() => {
    activeIdx.current = -1
    requestAnimationFrame(() => {
      barGroupRef.current?.querySelectorAll('rect').forEach((bar) => {
        ;(bar as SVGRectElement).style.opacity = '1'
      })
      if (labelRef.current) labelRef.current.style.opacity = '0'
    })
  }, [])

  return (
    <>
      <g ref={barGroupRef}>
        <ChartBar radius={3} gap={16} colorFn={(v) => (v >= 0 ? '#22c55e' : '#ef4444')} />
      </g>
      {/* Solid zero line */}
      <line
        x1={0} y1={scaleY(0)} x2={chartWidth} y2={scaleY(0)}
        stroke="var(--n600)" strokeWidth={1} shapeRendering="crispEdges"
      />
      <ChartAxisY
        tickCount={5}
        format={(v) => {
          const abs = Math.abs(v)
          const f = abs >= 1000 ? `${(abs / 1000).toFixed(0)}k` : `${abs}`
          return v < 0 ? `-$${f}` : `$${f}`
        }}
      />
      <ChartAxisX
        labelCount={labels.length}
        format={(i) => labels[i] ?? ''}
        tickValues={labels.map((_, i) => i)}
      />
      {/* Value label pill */}
      <g ref={labelRef} style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }}>
        <rect rx={4} fill="#22c55e" />
        <text textAnchor="middle" fill="white" fontSize={12} dy="0.35em"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums' }} />
        <polygon fill="#22c55e" />
      </g>
      {/* Invisible overlay */}
      <rect x={0} y={0} width={chartWidth} height={chartHeight}
        fill="transparent" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} />
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. Budget Allocation — Donut with ref-based hover + legend sync
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function BudgetDonutChart() {
  const budgetData = useMemo(() => generateBudgetData(), [])
  const total = useMemo(() => budgetData.reduce((s, d) => s + d.value, 0), [budgetData])
  const totalFormatted = `$${(total / 1_000_000).toFixed(2)}M`

  const padRad = (1.5 * Math.PI) / 180
  const slices = useMemo(() => pieLayout(budgetData, (d) => d.value, padRad), [budgetData, padRad])

  const size = 220
  const outerR = size / 2 - 6
  const innerR = outerR * 0.65
  const cx = size / 2
  const cy = size / 2

  // Refs for zero-rerender hover
  const pathRefs = useRef<(SVGPathElement | null)[]>([])
  const legendRefs = useRef<(HTMLDivElement | null)[]>([])
  const centerNameRef = useRef<SVGTextElement>(null)
  const centerValueRef = useRef<SVGTextElement>(null)

  // Single overlay approach: atan2 calculates which segment the pointer is in.
  // No per-path events = no gaps = no race conditions.
  const rafId = useRef<number>(0)
  const currentIdx = useRef<number>(-1)
  const overlayRef = useRef<SVGCircleElement>(null)

  /** Find segment index from angle. Returns -1 if in the donut hole. */
  const segmentFromPointer = useCallback((px: number, py: number): number => {
    const dx = px - cx
    const dy = py - cy
    const dist = Math.sqrt(dx * dx + dy * dy)
    if (dist < innerR || dist > outerR + 8) return -1 // in hole or outside

    // Convert to angle: 0 = top (12 o'clock), clockwise
    let angle = Math.atan2(dx, -dy)
    if (angle < 0) angle += 2 * Math.PI

    for (let i = 0; i < slices.length; i++) {
      if (angle >= slices[i].startAngle && angle <= slices[i].endAngle) return i
    }
    return -1
  }, [slices, cx, cy, innerR, outerR])

  const applyHighlight = useCallback((target: number) => {
    if (target === currentIdx.current) return
    currentIdx.current = target

    pathRefs.current.forEach((p, i) => {
      if (!p) return
      if (target === -1) {
        p.style.transform = 'translate(0, 0)'
        p.style.opacity = '1'
      } else if (i === target) {
        const mid = (slices[i].startAngle + slices[i].endAngle) / 2
        p.style.transform = `translate(${(Math.sin(mid) * 6).toFixed(1)}px, ${(-Math.cos(mid) * 6).toFixed(1)}px)`
        p.style.opacity = '1'
      } else {
        p.style.transform = 'translate(0, 0)'
        p.style.opacity = '0.5'
      }
    })

    legendRefs.current.forEach((el, i) => {
      if (el) el.style.opacity = target === -1 || i === target ? '1' : '0.5'
    })

    if (target === -1) {
      if (centerNameRef.current) centerNameRef.current.textContent = 'Total budget'
      if (centerValueRef.current) centerValueRef.current.textContent = totalFormatted
    } else {
      if (centerNameRef.current) centerNameRef.current.textContent = budgetData[target].category
      if (centerValueRef.current) {
        const pct = slices[target].percentage.toFixed(1)
        centerValueRef.current.textContent = `$${(budgetData[target].value / 1000).toFixed(0)}K · ${pct}%`
      }
    }
  }, [budgetData, slices, totalFormatted])

  const handleDonutPointerMove = useCallback((e: React.PointerEvent) => {
    const svg = overlayRef.current?.ownerSVGElement
    if (!svg) return
    const rect = svg.getBoundingClientRect()
    const px = (e.clientX - rect.left) * (size / rect.width)
    const py = (e.clientY - rect.top) * (size / rect.height)
    const idx = segmentFromPointer(px, py)

    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyHighlight(idx))
  }, [segmentFromPointer, applyHighlight, size])

  const handleDonutPointerLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyHighlight(-1))
  }, [applyHighlight])

  // Legend hover → highlight segment (bidirectional sync)
  const handleLegendEnter = useCallback((idx: number) => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyHighlight(idx))
  }, [applyHighlight])

  const handleLegendLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyHighlight(-1))
  }, [applyHighlight])

  return (
    <ChartCard title="Budget Allocation" subtitle="Donut chart — arcPath + pieLayout, segment hover with legend sync">
      <div className="flex items-center gap-10">
        {/* Donut SVG — fully ref-based, zero state on hover */}
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} shapeRendering="geometricPrecision">
          {/* Segments — no pointer events, overlay handles hover */}
          {slices.map((slice, i) => {
            const d = arcPath(cx, cy, innerR, outerR, slice.startAngle, slice.endAngle)
            return (
              <path
                key={i}
                ref={(el) => { pathRefs.current[i] = el }}
                d={d}
                fill={budgetData[i].color}
                style={{
                  transformOrigin: `${cx}px ${cy}px`,
                  transition: 'transform 200ms ease-out, opacity 200ms',
                  pointerEvents: 'none',
                }}
              />
            )
          })}
          {/* Center text */}
          <text
            ref={centerNameRef}
            x={cx}
            y={cy - 6}
            textAnchor="middle"
            className="fill-(--n600) text-[9px]"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, pointerEvents: 'none' }}
          >
            Total budget
          </text>
          <text
            ref={centerValueRef}
            x={cx}
            y={cy + 12}
            textAnchor="middle"
            className="fill-(--n1150) text-[18px]"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums', pointerEvents: 'none' }}
          >
            {totalFormatted}
          </text>
          {/* Invisible circle overlay — captures ALL pointer events, atan2 detects segment */}
          <circle
            ref={overlayRef}
            cx={cx}
            cy={cy}
            r={outerR + 4}
            fill="transparent"
            onPointerMove={handleDonutPointerMove}
            onPointerLeave={handleDonutPointerLeave}
          />
        </svg>

        {/* Legend — syncs with donut hover */}
        <div className="flex flex-col gap-2.5">
          {budgetData.map((item, i) => {
            const pct = ((item.value / total) * 100).toFixed(1)
            return (
              <div
                key={item.category}
                ref={(el) => { legendRefs.current[i] = el }}
                className="flex items-center gap-2.5"
                style={{ transition: 'opacity 200ms' }}
                onPointerEnter={() => handleLegendEnter(i)}
                onPointerLeave={() => handleLegendLeave()}
              >
                <span
                  className="inline-block h-2 w-2 rounded-[2px]"
                  style={{ backgroundColor: item.color }}
                />
                <span className="w-24 font-sans text-[13px] text-(--n1150)">
                  {item.category}
                </span>
                <span
                  className="text-[13px] text-(--n600)"
                  style={{ fontFamily: 'var(--font-sans)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {pct}%
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11. Scatter Chart — "Correlation Analysis"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const SCATTER_COLORS: Record<string, string> = {
  A: '#3b82f6',
  B: '#22c55e',
  C: '#f59e0b',
}

function ScatterChart() {
  const data = useMemo(() => generateScatterData(80, 601), [])

  // Dummy indices — ChartRoot needs a number[], but scatter uses its own data
  const dummyIndices = useMemo(() => Array.from({ length: data.length }, (_, i) => i), [data])

  return (
    <ChartCard title="Correlation Analysis" subtitle="ChartScatter + nearest2d — bubble size encoding">
      <ChartRoot
        data={dummyIndices}
        height={340}
        xDomain={[0, 100]}
        yDomain={[0, 100]}
        padding={{ right: 16, left: 48, bottom: 24, top: 8 }}
      >
        <ScatterInner data={data} />
      </ChartRoot>
      {/* Legend — circles, not squares */}
      <div className="ml-12 mt-2 flex gap-5">
        {[
          { label: 'Group A', color: '#3b82f6' },
          { label: 'Group B', color: '#22c55e' },
          { label: 'Group C', color: '#f59e0b' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="font-sans text-[12px] text-(--n800)">{item.label}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

function ScatterInner({ data }: { data: ScatterPoint[] }) {
  const { scaleX, scaleY, chartWidth, chartHeight } = useChart()
  const dotsRef = useRef<SVGGElement>(null)
  const labelRef = useRef<SVGGElement>(null)
  const activeIdx = useRef(-1)

  // Pre-compute pixel positions for nearest2d lookup
  const pixelPoints = useMemo(
    () => data.map((d) => ({ x: scaleX(d.x), y: scaleY(d.y) })),
    [data, scaleX, scaleY],
  )

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const localX = (e.clientX - rect.left) * (chartWidth / rect.width)
    const localY = (e.clientY - rect.top) * (chartHeight / rect.height)
    const { index } = nearest2d(pixelPoints, localX, localY)
    if (index === activeIdx.current) return
    activeIdx.current = index

    requestAnimationFrame(() => {
      const circles = dotsRef.current?.querySelectorAll('circle')
      circles?.forEach((circle, i) => {
        const el = circle as SVGCircleElement
        if (i === index) {
          el.style.opacity = '1'
          el.style.transform = 'scale(1.3)'
          el.setAttribute('stroke', 'white')
          el.setAttribute('stroke-width', '2')
        } else {
          el.style.opacity = '0.3'
          el.style.transform = 'scale(1)'
          el.removeAttribute('stroke')
          el.removeAttribute('stroke-width')
        }
      })

      // Value label near hovered dot
      const g = labelRef.current
      if (g && index >= 0) {
        const text = g.querySelector('text') as SVGTextElement
        const bg = g.querySelector('rect') as SVGRectElement
        const d = data[index]
        text.textContent = `x: ${d.x.toFixed(0)}  y: ${d.y.toFixed(0)}`
        text.setAttribute('fill', 'var(--n50)')

        const px = pixelPoints[index].x
        const py = pixelPoints[index].y
        // Position label above the dot
        g.setAttribute('transform', `translate(${px.toFixed(1)},${(py - 16).toFixed(1)})`)

        const bbox = text.getBBox()
        const padX = 7, padY = 3
        bg.setAttribute('x', (bbox.x - padX).toFixed(1))
        bg.setAttribute('y', (bbox.y - padY).toFixed(1))
        bg.setAttribute('width', (bbox.width + padX * 2).toFixed(1))
        bg.setAttribute('height', (bbox.height + padY * 2).toFixed(1))
        bg.setAttribute('rx', '4')
        bg.setAttribute('fill', SCATTER_COLORS[d.group])

        g.style.opacity = '1'
      }
    })
  }, [data, pixelPoints, chartWidth, chartHeight])

  const handlePointerLeave = useCallback(() => {
    activeIdx.current = -1
    requestAnimationFrame(() => {
      dotsRef.current?.querySelectorAll('circle').forEach((circle) => {
        const el = circle as SVGCircleElement
        el.style.opacity = '1'
        el.style.transform = 'scale(1)'
        el.removeAttribute('stroke')
        el.removeAttribute('stroke-width')
      })
      if (labelRef.current) labelRef.current.style.opacity = '0'
    })
  }, [])

  return (
    <>
      <g ref={dotsRef}>
        <ChartScatter
          data={data}
          xAccessor={(d) => d.x}
          yAccessor={(d) => d.y}
          sizeAccessor={(d) => d.size}
          sizeRange={[3, 16]}
          colorFn={(d) => SCATTER_COLORS[d.group]}
        />
      </g>
      <ChartAxisX labelCount={5} format={(v) => v.toFixed(0)} tickValues={[0, 25, 50, 75, 100]} />
      <ChartAxisY tickCount={5} format={(v) => v.toFixed(0)} />
      {/* Value label pill */}
      <g ref={labelRef} style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }}>
        <rect rx={4} fill="#3b82f6" />
        <text
          textAnchor="middle"
          fill="var(--n50)"
          fontSize={11}
          dy="0.35em"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums' }}
        />
      </g>
      {/* Invisible overlay */}
      <rect
        x={0}
        y={0}
        width={chartWidth}
        height={chartHeight}
        fill="transparent"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      />
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 12. Stacked Bar Chart — "Quarterly Revenue by Region"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const REGION_COLORS = [
  { name: 'West', color: '#f59e0b', className: 'fill-amber-500/80' },
  { name: 'East', color: '#8b5cf6', className: 'fill-purple-500/80' },
  { name: 'South', color: '#22c55e', className: 'fill-emerald-500/80' },
  { name: 'North', color: '#3b82f6', className: 'fill-blue-500/80' },
]

function StackedBarChart() {
  const rawData = useMemo(() => generateQuarterlyRevenueData(), [])

  // Stack series bottom-to-top: west, east, south, north
  const stacked = useMemo(() => {
    return stackSeries(rawData, [
      (d) => d.west,
      (d) => d.east,
      (d) => d.south,
      (d) => d.north,
    ])
  }, [rawData])

  // Max stacked value for Y domain
  const maxStacked = useMemo(() => {
    let max = 0
    for (const d of rawData) {
      const total = d.north + d.south + d.east + d.west
      if (total > max) max = total
    }
    return max
  }, [rawData])

  // Build per-region value arrays (y1 values = top of each segment)
  const regionData = useMemo(() => {
    return stacked.map((series) => series.map((s) => s.y1))
  }, [stacked])

  return (
    <ChartCard title="Quarterly Revenue by Region" subtitle="ChartBar + y0Accessor + stackSeries — stacked bar composition">
      <ChartRoot
        data={regionData[0]}
        height={300}
        yDomain={[0, maxStacked * 1.1]}
        xDomain={[-0.5, 3.5]}
        padding={{ right: 16 }}
      >
        <StackedBarInner
          rawData={rawData}
          stacked={stacked}
          regionData={regionData}
        />
      </ChartRoot>
      {/* Legend */}
      <div className="ml-12 mt-2 flex gap-5">
        {[...REGION_COLORS].reverse().map((r) => (
          <div key={r.name} className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-[2px]"
              style={{ backgroundColor: r.color }}
            />
            <span className="font-sans text-[12px] text-(--n800)">{r.name}</span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

function StackedBarInner({
  rawData,
  stacked,
  regionData,
}: {
  rawData: ReturnType<typeof generateQuarterlyRevenueData>
  stacked: { y0: number; y1: number }[][]
  regionData: number[][]
}) {
  const { scaleX, scaleY, chartWidth, chartHeight } = useChart()
  const barGroupRef = useRef<SVGGElement>(null)
  const labelRef = useRef<SVGGElement>(null)
  const activeIdx = useRef(-1)

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const localX = (e.clientX - rect.left) * (chartWidth / rect.width)
    const idx = Math.min(3, Math.max(0, Math.round(scaleX.inverse(localX))))
    if (idx === activeIdx.current) return
    activeIdx.current = idx

    requestAnimationFrame(() => {
      // Spotlight: all segments of hovered quarter = full, others faded
      const rects = barGroupRef.current?.querySelectorAll('rect')
      if (rects) {
        const numQuarters = 4
        rects.forEach((bar, i) => {
          const barQuarter = i % numQuarters
          ;(bar as SVGRectElement).style.opacity = barQuarter === idx ? '1' : '0.4'
        })
      }

      // Combined tooltip with all 4 region values + total
      const g = labelRef.current
      if (!g) return
      const d = rawData[idx]
      const total = d.north + d.south + d.east + d.west
      const texts = g.querySelectorAll('text')
      const bg = g.querySelector('rect') as SVGRectElement

      ;(texts[0] as SVGTextElement).textContent = d.quarter
      ;(texts[1] as SVGTextElement).textContent =
        `N: ${d.north}  S: ${d.south}  E: ${d.east}  W: ${d.west}`
      ;(texts[2] as SVGTextElement).textContent = `Total: ${total}`

      const cx = scaleX(idx)
      const topY = scaleY(stacked[stacked.length - 1][idx].y1)
      g.setAttribute('transform', `translate(${cx.toFixed(1)},${(topY - 12).toFixed(1)})`)

      // Size background to fit all text
      const bbox0 = (texts[0] as SVGTextElement).getBBox()
      const bbox1 = (texts[1] as SVGTextElement).getBBox()
      const bbox2 = (texts[2] as SVGTextElement).getBBox()
      const w = Math.max(bbox0.width, bbox1.width, bbox2.width) + 16
      const h = bbox0.height + bbox1.height + bbox2.height + 16
      bg.setAttribute('x', (-w / 2).toFixed(1))
      bg.setAttribute('y', (-h).toFixed(1))
      bg.setAttribute('width', w.toFixed(1))
      bg.setAttribute('height', h.toFixed(1))
      bg.setAttribute('rx', '4')

      ;(texts[0] as SVGTextElement).setAttribute('y', (-h + bbox0.height + 3).toFixed(1))
      ;(texts[1] as SVGTextElement).setAttribute('y', (-h + bbox0.height + bbox1.height + 7).toFixed(1))
      ;(texts[2] as SVGTextElement).setAttribute('y', (-h + bbox0.height + bbox1.height + bbox2.height + 11).toFixed(1))

      g.style.opacity = '1'
    })
  }, [rawData, stacked, scaleX, scaleY, chartWidth])

  const handlePointerLeave = useCallback(() => {
    activeIdx.current = -1
    requestAnimationFrame(() => {
      barGroupRef.current?.querySelectorAll('rect').forEach((bar) => {
        ;(bar as SVGRectElement).style.opacity = '1'
      })
      if (labelRef.current) labelRef.current.style.opacity = '0'
    })
  }, [])

  return (
    <>
      <g ref={barGroupRef}>
        {/* Bottom to top: west (0), east (1), south (2), north (3) */}
        {REGION_COLORS.map((region, seriesIdx) => (
          <ChartBar
            key={region.name}
            data={regionData[seriesIdx]}
            y0Accessor={(_, i) => stacked[seriesIdx][i].y0}
            className={region.className}
            radius={seriesIdx === REGION_COLORS.length - 1 ? 3 : 0}
            gap={32}
          />
        ))}
      </g>
      <ChartAxisY tickCount={4} format={(v) => `$${v.toFixed(0)}M`} />
      <ChartAxisX
        labelCount={4}
        format={(i) => rawData[i]?.quarter ?? ''}
        tickValues={[0, 1, 2, 3]}
      />
      {/* Combined tooltip pill */}
      <g ref={labelRef} style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }}>
        <rect fill="var(--n1150)" />
        <text textAnchor="middle" fill="var(--n50)" fontSize={12}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums' }} />
        <text textAnchor="middle" fill="var(--n50)" fontSize={10}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontVariantNumeric: 'tabular-nums' }} />
        <text textAnchor="middle" fill="var(--n50)" fontSize={11}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums' }} />
      </g>
      {/* Invisible overlay */}
      <rect
        x={0}
        y={0}
        width={chartWidth}
        height={chartHeight}
        fill="transparent"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      />
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 13. Candlestick Chart — "Stock OHLC"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function CandlestickChart() {
  const ohlcData = useMemo(() => generateOHLCData(60, 701), [])
  const indices = useMemo(() => ohlcData.map((_, i) => i), [ohlcData])

  // Y domain from all highs/lows
  const yDomain: [number, number] = useMemo(() => {
    let lo = Infinity, hi = -Infinity
    for (const d of ohlcData) {
      if (d.low < lo) lo = d.low
      if (d.high > hi) hi = d.high
    }
    const pad = (hi - lo) * 0.08
    return [lo - pad, hi + pad]
  }, [ohlcData])

  return (
    <ChartCard title="Stock OHLC" subtitle="ChartCandlestick — OHLC with spotlight hover">
      <ChartRoot
        data={indices}
        height={320}
        xDomain={[-0.5, ohlcData.length - 0.5]}
        yDomain={yDomain}
        padding={{ right: 16, left: 48 }}
      >
        <CandlestickInner ohlcData={ohlcData} />
      </ChartRoot>
      {/* Legend */}
      <div className="ml-12 mt-2 flex gap-5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-[2px] bg-emerald-500" />
          <span className="font-sans text-[12px] text-(--n800)">Up</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-[2px] bg-red-500" />
          <span className="font-sans text-[12px] text-(--n800)">Down</span>
        </div>
      </div>
    </ChartCard>
  )
}

function CandlestickInner({ ohlcData }: { ohlcData: OHLCPoint[] }) {
  const { scaleX, scaleY, chartWidth, chartHeight } = useChart()
  const candleGroupRef = useRef<SVGGElement>(null)
  const labelRef = useRef<SVGGElement>(null)
  const activeIdx = useRef(-1)

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const localX = (e.clientX - rect.left) * (chartWidth / rect.width)
    const idx = Math.min(ohlcData.length - 1, Math.max(0, Math.round(scaleX.inverse(localX))))
    if (idx === activeIdx.current) return
    activeIdx.current = idx

    requestAnimationFrame(() => {
      // Spotlight: hovered candle full, others faded
      const candles = candleGroupRef.current?.querySelectorAll(':scope > g > g')
      candles?.forEach((g, i) => {
        ;(g as SVGGElement).style.opacity = i === idx ? '1' : '0.4'
      })

      // OHLC value pill
      const g = labelRef.current
      if (!g) return
      const d = ohlcData[idx]
      const texts = g.querySelectorAll('text')
      const bg = g.querySelector('rect') as SVGRectElement

      ;(texts[0] as SVGTextElement).textContent = `O: ${d.open.toFixed(1)}`
      ;(texts[1] as SVGTextElement).textContent = `H: ${d.high.toFixed(1)}`
      ;(texts[2] as SVGTextElement).textContent = `L: ${d.low.toFixed(1)}`
      ;(texts[3] as SVGTextElement).textContent = `C: ${d.close.toFixed(1)}`

      const cx = scaleX(idx)
      const topY = scaleY(d.high)
      g.setAttribute('transform', `translate(${cx.toFixed(1)},${(topY - 12).toFixed(1)})`)

      // Size background
      const bboxes = Array.from(texts).map((t) => (t as SVGTextElement).getBBox())
      const maxW = Math.max(...bboxes.map((b) => b.width))
      const totalH = bboxes.reduce((s, b) => s + b.height, 0)
      const w = maxW + 18
      const h = totalH + 22
      bg.setAttribute('x', (-w / 2).toFixed(1))
      bg.setAttribute('y', (-h).toFixed(1))
      bg.setAttribute('width', w.toFixed(1))
      bg.setAttribute('height', h.toFixed(1))
      bg.setAttribute('rx', '4')

      let yOff = -h + 4
      for (let t = 0; t < texts.length; t++) {
        yOff += bboxes[t].height + 2
        ;(texts[t] as SVGTextElement).setAttribute('y', yOff.toFixed(1))
      }

      g.style.opacity = '1'
    })
  }, [ohlcData, scaleX, scaleY, chartWidth])

  const handlePointerLeave = useCallback(() => {
    activeIdx.current = -1
    requestAnimationFrame(() => {
      candleGroupRef.current?.querySelectorAll(':scope > g > g').forEach((g) => {
        ;(g as SVGGElement).style.opacity = '1'
      })
      if (labelRef.current) labelRef.current.style.opacity = '0'
    })
  }, [])

  const formatWeek = useCallback(
    (i: number) => `W${Math.floor(i / 5) + 1}`,
    [],
  )

  return (
    <>
      <g ref={candleGroupRef}>
        <ChartCandlestick data={ohlcData} />
      </g>
      <ChartAxisY tickCount={5} format={(v) => `$${v.toFixed(0)}`} />
      <ChartAxisX labelCount={6} format={formatWeek} />
      {/* OHLC value pill — 4 lines */}
      <g ref={labelRef} style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }}>
        <rect fill="var(--n1150)" />
        <text textAnchor="middle" fill="var(--n50)" fontSize={11}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, fontVariantNumeric: 'tabular-nums' }} />
        <text textAnchor="middle" fill="var(--n50)" fontSize={11}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, fontVariantNumeric: 'tabular-nums' }} />
        <text textAnchor="middle" fill="var(--n50)" fontSize={11}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, fontVariantNumeric: 'tabular-nums' }} />
        <text textAnchor="middle" fill="var(--n50)" fontSize={11}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, fontVariantNumeric: 'tabular-nums' }} />
      </g>
      {/* Invisible overlay */}
      <rect
        x={0}
        y={0}
        width={chartWidth}
        height={chartHeight}
        fill="transparent"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      />
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 14. Waterfall Chart — "Cash Flow"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function WaterfallChart() {
  const rawData = useMemo(() => generateCashFlowData(), [])
  const bars = useMemo(() => waterfallLayout(rawData), [rawData])

  // Y1 values for ChartBar (top of each bar)
  const y1Values = useMemo(() => bars.map((b) => b.y1), [bars])

  // Y domain: 0 to max y1 with padding
  const yMax = useMemo(() => Math.max(...bars.map((b) => b.y1)), [bars])

  return (
    <ChartCard title="Cash Flow" subtitle="waterfallLayout + ChartBar + y0Accessor — floating bars with connectors">
      <ChartRoot
        data={y1Values}
        height={320}
        yDomain={[0, yMax * 1.12]}
        xDomain={[-0.5, bars.length - 0.5]}
        padding={{ right: 16, left: 48 }}
      >
        <WaterfallInner bars={bars} />
      </ChartRoot>
      {/* Legend */}
      <div className="ml-12 mt-2 flex gap-5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-[2px] bg-emerald-500" />
          <span className="font-sans text-[12px] text-(--n800)">Increase</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-[2px] bg-red-500" />
          <span className="font-sans text-[12px] text-(--n800)">Decrease</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-[2px]" style={{ backgroundColor: 'var(--n1150)' }} />
          <span className="font-sans text-[12px] text-(--n800)">Net total</span>
        </div>
      </div>
    </ChartCard>
  )
}

function WaterfallInner({ bars }: { bars: ReturnType<typeof waterfallLayout> }) {
  const { scaleX, scaleY, chartWidth, chartHeight } = useChart()
  const barGroupRef = useRef<SVGGElement>(null)
  const labelRef = useRef<SVGGElement>(null)
  const activeIdx = useRef(-1)

  // Connector lines between bars
  const connectors = useMemo(() => {
    const lines: { x1: number; y1: number; x2: number; y2: number }[] = []
    for (let i = 0; i < bars.length - 1; i++) {
      const curr = bars[i]
      // Connect from top of current bar (y1) to start of next bar
      const connY = scaleY(curr.type === 'decrease' ? curr.y0 : curr.y1)
      const step = scaleX(1) - scaleX(0)
      const halfBar = (step - 32) / 2 // gap=32 in ChartBar
      lines.push({
        x1: scaleX(i) + halfBar,
        y1: connY,
        x2: scaleX(i + 1) - halfBar,
        y2: connY,
      })
    }
    return lines
  }, [bars, scaleX, scaleY])

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const localX = (e.clientX - rect.left) * (chartWidth / rect.width)
    const idx = Math.min(bars.length - 1, Math.max(0, Math.round(scaleX.inverse(localX))))
    if (idx === activeIdx.current) return
    activeIdx.current = idx

    requestAnimationFrame(() => {
      barGroupRef.current?.querySelectorAll('rect').forEach((bar, i) => {
        ;(bar as SVGRectElement).style.opacity = i === idx ? '1' : '0.4'
      })

      const g = labelRef.current
      if (!g) return
      const text = g.querySelector('text') as SVGTextElement
      const bg = g.querySelector('rect') as SVGRectElement
      const arrow = g.querySelector('polygon') as SVGPolygonElement
      const b = bars[idx]

      const absVal = Math.abs(b.value)
      text.textContent = b.type === 'total'
        ? `$${absVal}M`
        : `${b.value >= 0 ? '+' : '-'}$${absVal}M`

      const pillBg = b.type === 'increase'
        ? '#22c55e'
        : b.type === 'decrease'
          ? '#ef4444'
          : 'var(--n1150)'

      bg.setAttribute('fill', pillBg)
      arrow.setAttribute('fill', pillBg)
      text.setAttribute('fill', 'white')

      const cx = scaleX(idx)
      const topY = scaleY(b.y1)
      g.setAttribute('transform', `translate(${cx.toFixed(1)},${(topY - 10).toFixed(1)})`)

      const bbox = text.getBBox()
      const px = 7, py = 3
      bg.setAttribute('x', (bbox.x - px).toFixed(1))
      bg.setAttribute('y', (bbox.y - py).toFixed(1))
      bg.setAttribute('width', (bbox.width + px * 2).toFixed(1))
      bg.setAttribute('height', (bbox.height + py * 2).toFixed(1))
      bg.setAttribute('rx', '4')

      const ay = bbox.y + bbox.height + py
      arrow.setAttribute('points', `-3.5,${ay.toFixed(1)} 3.5,${ay.toFixed(1)} 0,${(ay + 4).toFixed(1)}`)

      g.style.opacity = '1'
    })
  }, [bars, scaleX, scaleY, chartWidth])

  const handlePointerLeave = useCallback(() => {
    activeIdx.current = -1
    requestAnimationFrame(() => {
      barGroupRef.current?.querySelectorAll('rect').forEach((bar) => {
        ;(bar as SVGRectElement).style.opacity = '1'
      })
      if (labelRef.current) labelRef.current.style.opacity = '0'
    })
  }, [])

  const colorFn = useCallback((_v: number, i: number) => {
    const type = bars[i]?.type
    if (type === 'increase') return '#22c55e'
    if (type === 'decrease') return '#ef4444'
    return 'var(--n1150)'
  }, [bars])

  return (
    <>
      {/* Connector lines */}
      {connectors.map((c, i) => (
        <line
          key={i}
          x1={c.x1}
          y1={c.y1}
          x2={c.x2}
          y2={c.y2}
          stroke="var(--n400)"
          strokeWidth={0.5}
          strokeDasharray="2 2"
          shapeRendering="crispEdges"
        />
      ))}
      <g ref={barGroupRef}>
        <ChartBar
          y0Accessor={(_, i) => bars[i].y0}
          colorFn={colorFn}
          radius={3}
          gap={32}
        />
      </g>
      <ChartAxisY tickCount={5} format={(v) => `$${v.toFixed(0)}M`} />
      <ChartAxisX
        labelCount={bars.length}
        format={(i) => bars[i]?.label ?? ''}
        tickValues={bars.map((_, i) => i)}
      />
      {/* Value label pill */}
      <g ref={labelRef} style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }}>
        <rect rx={4} fill="#22c55e" />
        <text
          textAnchor="middle"
          fill="white"
          fontSize={12}
          dy="0.35em"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums' }}
        />
        <polygon fill="#22c55e" />
      </g>
      {/* Invisible overlay */}
      <rect
        x={0}
        y={0}
        width={chartWidth}
        height={chartHeight}
        fill="transparent"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      />
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 15. Radar Chart — "Athlete Profile"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function RadarChart() {
  const profile = useMemo(() => generateAthleteProfile(), [])

  return (
    <ChartCard title="Athlete Profile" subtitle="ChartRadar — polygon on polar axes, multi-series comparison">
      <div className="flex items-center gap-8">
        <ChartRadar
          axes={profile.axes}
          series={profile.series}
          size={300}
          rings={4}
        />
        {/* Legend */}
        <div className="flex flex-col gap-2.5">
          {profile.series.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span
                className="inline-block h-[2px] w-3 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              <span className="font-sans text-[12px] text-(--n800)">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 16. Radial Bar Chart — "Goal Progress"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function RadialBarChart() {
  const goals = useMemo(() => generateGoalProgress(), [])

  return (
    <ChartCard title="Goal Progress" subtitle="ChartRadialBar — concentric arcs with arcPath, ring hover">
      <div className="flex items-center gap-10">
        <ChartRadialBar items={goals} size={240} />
        {/* Legend */}
        <div className="flex flex-col gap-2.5">
          {goals.map((g) => {
            const pct = Math.round((g.value / g.max) * 100)
            return (
              <div key={g.label} className="flex items-center gap-2.5">
                <span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: g.color }}
                />
                <span className="w-20 font-sans text-[13px] text-(--n1150)">
                  {g.label}
                </span>
                <span
                  className="text-[13px] text-(--n600)"
                  style={{ fontFamily: 'var(--font-sans)', fontVariantNumeric: 'tabular-nums' }}
                >
                  {g.value}/{g.max} ({pct}%)
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 17. Percent Area Chart — "Browser Market Share"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const BROWSER_COLORS = [
  { name: 'Chrome', color: '#3b82f6', className: 'bg-blue-500' },
  { name: 'Safari', color: '#22c55e', className: 'bg-emerald-500' },
  { name: 'Firefox', color: '#f59e0b', className: 'bg-amber-500' },
  { name: 'Edge', color: '#8b5cf6', className: 'bg-purple-500' },
  { name: 'Other', color: 'var(--n600)', className: 'bg-(--n600)' },
]

function BrowserShareChart() {
  const rawData = useMemo(() => generateBrowserShareData(36), [])

  const accessors = [
    (d: any) => d.chrome,
    (d: any) => d.safari,
    (d: any) => d.firefox,
    (d: any) => d.edge,
    (d: any) => d.other,
  ]

  const stacked = useMemo(() => stackSeries(rawData, accessors), [rawData])
  const indices = useMemo(() => rawData.map(() => 100), [rawData])
  const legendRefs = useRef<(HTMLSpanElement | null)[]>([])

  return (
    <ChartCard title="Browser Market Share" subtitle="ChartArea + stackSeries — normalized to 100%, crosshair with segment highlight">
      <ChartRoot data={indices} height={320} yDomain={[0, 100]} padding={{ right: 16 }}>
        <BrowserShareInner stacked={stacked} indices={indices} legendRefs={legendRefs} />
      </ChartRoot>
      {/* Legend */}
      <div className="ml-12 mt-2 flex gap-5">
        {BROWSER_COLORS.map((c, i) => (
          <div key={c.name} className="flex items-center gap-2">
            <span className={`inline-block h-2 w-2 rounded-[2px] ${c.className}`} />
            <span
              ref={(el) => { legendRefs.current[i] = el }}
              className="font-sans text-[12px] text-(--n800)"
              style={{ transition: 'opacity 150ms, font-weight 150ms' }}
            >
              {c.name}
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

function BrowserShareInner({
  stacked,
  indices,
  legendRefs,
}: {
  stacked: { y0: number; y1: number }[][]
  indices: number[]
  legendRefs: React.RefObject<(HTMLSpanElement | null)[]>
}) {
  const { scaleX, scaleY, chartWidth, chartHeight } = useChart()
  const areaRefs = useRef<(SVGGElement | null)[]>([])
  const crosshairRef = useRef<SVGLineElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const segLabelRef = useRef<SVGGElement>(null)

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratioX = chartWidth / rect.width
    const ratioY = chartHeight / rect.height
    const localX = (e.clientX - rect.left) * ratioX
    const localY = (e.clientY - rect.top) * ratioY
    const dataIdx = Math.min(indices.length - 1, Math.max(0, Math.round(scaleX.inverse(localX))))
    const yValue = scaleY.inverse(localY)

    // Find which segment the cursor y falls into
    let segIdx = -1
    for (let s = 0; s < stacked.length; s++) {
      const seg = stacked[s][dataIdx]
      if (yValue >= seg.y0 && yValue <= seg.y1) {
        segIdx = s
        break
      }
    }
    if (segIdx === -1) {
      if (yValue <= 0) segIdx = 0
      else segIdx = stacked.length - 1
    }

    requestAnimationFrame(() => {
      const px = scaleX(dataIdx)
      if (crosshairRef.current) {
        crosshairRef.current.setAttribute('x1', px.toFixed(1))
        crosshairRef.current.setAttribute('x2', px.toFixed(1))
        crosshairRef.current.style.opacity = '1'
      }

      if (dotRef.current && segIdx >= 0) {
        const dotY = scaleY(stacked[segIdx][dataIdx].y1)
        dotRef.current.setAttribute('cx', px.toFixed(1))
        dotRef.current.setAttribute('cy', dotY.toFixed(1))
        dotRef.current.setAttribute('fill', BROWSER_COLORS[segIdx].color)
        dotRef.current.style.opacity = '1'
      }

      areaRefs.current.forEach((g, i) => {
        if (g) {
          g.style.opacity = i === segIdx ? '1' : '0.2'
          g.style.transition = 'opacity 150ms'
        }
      })

      legendRefs.current?.forEach((el, i) => {
        if (!el) return
        el.style.fontWeight = i === segIdx ? '550' : '400'
        el.style.opacity = i === segIdx ? '1' : '0.5'
      })

      const gl = segLabelRef.current
      if (gl && segIdx >= 0) {
        const text = gl.querySelector('text') as SVGTextElement
        const bg = gl.querySelector('rect') as SVGRectElement
        const val = (stacked[segIdx][dataIdx].y1 - stacked[segIdx][dataIdx].y0).toFixed(1)
        text.textContent = `${BROWSER_COLORS[segIdx].name}: ${val}%`
        const midY = scaleY((stacked[segIdx][dataIdx].y0 + stacked[segIdx][dataIdx].y1) / 2)
        gl.setAttribute('transform', `translate(${(px + 10).toFixed(1)},${midY.toFixed(1)})`)
        const bbox = text.getBBox()
        bg.setAttribute('x', (bbox.x - 6).toFixed(1))
        bg.setAttribute('y', (bbox.y - 3).toFixed(1))
        bg.setAttribute('width', (bbox.width + 12).toFixed(1))
        bg.setAttribute('height', (bbox.height + 6).toFixed(1))
        bg.setAttribute('rx', '4')
        bg.setAttribute('fill', BROWSER_COLORS[segIdx].color)
        gl.style.opacity = '1'
      }
    })
  }, [stacked, indices, scaleX, scaleY, chartWidth, chartHeight, legendRefs])

  const handlePointerLeave = useCallback(() => {
    requestAnimationFrame(() => {
      areaRefs.current.forEach((g) => {
        if (g) { g.style.opacity = '1'; g.style.transition = 'opacity 150ms' }
      })
      legendRefs.current?.forEach((el) => {
        if (!el) return
        el.style.fontWeight = '400'
        el.style.opacity = '1'
      })
      if (crosshairRef.current) crosshairRef.current.style.opacity = '0'
      if (dotRef.current) dotRef.current.style.opacity = '0'
      if (segLabelRef.current) segLabelRef.current.style.opacity = '0'
    })
  }, [legendRefs])

  return (
    <>
      {/* Render bottom-to-top */}
      {[...stacked].reverse().map((series, reverseIdx) => {
        const originalIdx = stacked.length - 1 - reverseIdx
        return (
          <g key={originalIdx} ref={(el) => { areaRefs.current[originalIdx] = el }}
            style={{ transition: 'opacity 150ms' }}>
            <ChartArea
              data={indices}
              gradientColor={BROWSER_COLORS[originalIdx].color}
              opacityFrom={0.7}
              opacityTo={0.7}
              y0Accessor={(_, i) => series[i].y0}
              yAccessor={(_, i) => series[i].y1}
            />
          </g>
        )
      })}
      <ChartAxisY tickCount={4} format={(v) => `${v.toFixed(0)}%`} />
      <ChartAxisX labelCount={6} format={(i) => `M${i + 1}`} />
      {/* Crosshair line */}
      <line ref={crosshairRef} x1={0} y1={0} x2={0} y2={chartHeight}
        stroke="#71717a" strokeWidth={0.5} shapeRendering="crispEdges"
        style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }} />
      {/* Crosshair dot */}
      <circle ref={dotRef} r={5} fill="#3b82f6" stroke="white" strokeWidth={2}
        style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }} />
      {/* Segment label */}
      <g ref={segLabelRef} style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }}>
        <rect fill="#3b82f6" />
        <text textAnchor="start" fill="white" fontSize={11} dy="0.35em"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }} />
      </g>
      {/* Invisible overlay */}
      <rect x={0} y={0} width={chartWidth} height={chartHeight}
        fill="transparent" onPointerMove={handlePointerMove} onPointerLeave={handlePointerLeave} />
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 18. Treemap — "Disk Usage"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function TreemapChart() {
  const data = useMemo(() => generateDiskUsageData(), [])
  const total = useMemo(() => data.reduce((s, d) => s + d.value, 0), [data])

  return (
    <ChartCard title="Disk Usage" subtitle="ChartTreemap + treemapLayout — squarified rectangles with proportional hover">
      <ChartTreemap data={data} width={860} height={300} />
      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-4">
        {data.map((d) => (
          <div key={d.label} className="flex items-center gap-2">
            <span
              className="inline-block h-2 w-2 rounded-[2px]"
              style={{ backgroundColor: d.color }}
            />
            <span className="font-sans text-[12px] text-(--n800)">
              {d.label} ({Math.round((d.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 19. Funnel Chart — "Sales Pipeline"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function FunnelChart() {
  const data = useMemo(() => generateSalesPipeline(), [])

  return (
    <ChartCard title="Sales Pipeline" subtitle="ChartFunnel — centered bars with conversion rates">
      <ChartFunnel data={data} width={860} height={260} />
    </ChartCard>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 20. Box Plot — "Response Time Distribution"
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function BoxPlotChart() {
  const boxData = useMemo(() => generateResponseTimeData(), [])
  const indices = useMemo(() => boxData.map((_, i) => i), [boxData])

  // Y domain from min of mins to max of outliers/maxes
  const yDomain: [number, number] = useMemo(() => {
    let lo = Infinity, hi = -Infinity
    for (const d of boxData) {
      if (d.min < lo) lo = d.min
      if (d.max > hi) hi = d.max
      for (const o of d.outliers ?? []) {
        if (o > hi) hi = o
      }
    }
    const pad = (hi - lo) * 0.1
    return [Math.max(0, lo - pad), hi + pad]
  }, [boxData])

  return (
    <ChartCard title="Response Time Distribution" subtitle="ChartBoxPlot — whiskers, Q1-Q3 box, median line, outlier dots">
      <ChartRoot
        data={indices}
        height={320}
        xDomain={[-0.5, boxData.length - 0.5]}
        yDomain={yDomain}
        padding={{ right: 16, left: 48 }}
      >
        <BoxPlotInner boxData={boxData} />
      </ChartRoot>
      {/* Legend */}
      <div className="ml-12 mt-2 flex gap-5">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-0.5" style={{ backgroundColor: 'var(--n1150)' }} />
          <span className="font-sans text-[12px] text-(--n800)">Whiskers (min–max)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-3 rounded-[1px] border border-(--n1150)" style={{ opacity: 0.15, backgroundColor: 'var(--n1150)' }} />
          <span className="font-sans text-[12px] text-(--n800)">Q1–Q3</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-0.5 w-3 bg-blue-500" />
          <span className="font-sans text-[12px] text-(--n800)">Median</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-blue-500" />
          <span className="font-sans text-[12px] text-(--n800)">Outliers</span>
        </div>
      </div>
    </ChartCard>
  )
}

function BoxPlotInner({ boxData }: { boxData: ResponseTimeBox[] }) {
  const { scaleX, scaleY, chartWidth, chartHeight } = useChart()
  const boxGroupRef = useRef<SVGGElement>(null)
  const labelRef = useRef<SVGGElement>(null)
  const activeIdx = useRef(-1)

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const localX = (e.clientX - rect.left) * (chartWidth / rect.width)
    const idx = Math.min(boxData.length - 1, Math.max(0, Math.round(scaleX.inverse(localX))))
    if (idx === activeIdx.current) return
    activeIdx.current = idx

    requestAnimationFrame(() => {
      // Spotlight: hovered box full, others faded
      const groups = boxGroupRef.current?.querySelectorAll(':scope > g > g')
      groups?.forEach((g, i) => {
        ;(g as SVGGElement).style.opacity = i === idx ? '1' : '0.3'
      })

      // Value label with all 5 summary values
      const g = labelRef.current
      if (!g) return
      const d = boxData[idx]
      const texts = g.querySelectorAll('text')
      const bg = g.querySelector('rect') as SVGRectElement

      ;(texts[0] as SVGTextElement).textContent = d.label
      ;(texts[1] as SVGTextElement).textContent = `Min: ${d.min}ms  Q1: ${d.q1}ms`
      ;(texts[2] as SVGTextElement).textContent = `Med: ${d.median}ms  Q3: ${d.q3}ms`
      ;(texts[3] as SVGTextElement).textContent = `Max: ${d.max}ms`

      const cx = scaleX(idx)
      const topY = scaleY(d.max)
      g.setAttribute('transform', `translate(${cx.toFixed(1)},${(topY - 12).toFixed(1)})`)

      const bboxes = Array.from(texts).map((t) => (t as SVGTextElement).getBBox())
      const maxW = Math.max(...bboxes.map((b) => b.width))
      const totalH = bboxes.reduce((s, b) => s + b.height, 0)
      const w = maxW + 18
      const h = totalH + 20
      bg.setAttribute('x', (-w / 2).toFixed(1))
      bg.setAttribute('y', (-h).toFixed(1))
      bg.setAttribute('width', w.toFixed(1))
      bg.setAttribute('height', h.toFixed(1))
      bg.setAttribute('rx', '4')

      let yOff = -h + 3
      for (let t = 0; t < texts.length; t++) {
        yOff += bboxes[t].height + 2
        ;(texts[t] as SVGTextElement).setAttribute('y', yOff.toFixed(1))
      }

      g.style.opacity = '1'
    })
  }, [boxData, scaleX, scaleY, chartWidth])

  const handlePointerLeave = useCallback(() => {
    activeIdx.current = -1
    requestAnimationFrame(() => {
      boxGroupRef.current?.querySelectorAll(':scope > g > g').forEach((g) => {
        ;(g as SVGGElement).style.opacity = '1'
      })
      if (labelRef.current) labelRef.current.style.opacity = '0'
    })
  }, [])

  return (
    <>
      <g ref={boxGroupRef}>
        <ChartBoxPlot data={boxData} />
      </g>
      <ChartAxisY tickCount={5} format={(v) => `${v.toFixed(0)}ms`} />
      <ChartAxisX
        labelCount={boxData.length}
        format={(i) => boxData[i]?.label ?? ''}
        tickValues={boxData.map((_, i) => i)}
      />
      {/* Value label pill — 4 lines */}
      <g ref={labelRef} style={{ opacity: 0, pointerEvents: 'none', transition: 'opacity 100ms' }}>
        <rect fill="var(--n1150)" />
        <text textAnchor="middle" fill="var(--n50)" fontSize={12}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums' }} />
        <text textAnchor="middle" fill="var(--n50)" fontSize={10}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontVariantNumeric: 'tabular-nums' }} />
        <text textAnchor="middle" fill="var(--n50)" fontSize={10}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontVariantNumeric: 'tabular-nums' }} />
        <text textAnchor="middle" fill="var(--n50)" fontSize={10}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontVariantNumeric: 'tabular-nums' }} />
      </g>
      {/* Invisible overlay */}
      <rect
        x={0}
        y={0}
        width={chartWidth}
        height={chartHeight}
        fill="transparent"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      />
    </>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-canvas pb-20 pt-12">
      <div className="mx-auto max-w-[920px] px-6">
        {/* ── Header ── */}
        <header className="mb-10">
          <h1 className={`text-[36px] ${WEIGHT.strong} tracking-tight text-[var(--n1150)]`}>
            @ramtt/charts
          </h1>
          <p className="mt-1 max-w-lg font-sans text-[13px] leading-relaxed tracking-wide text-text-tertiary">
            Zero-dependency React SVG chart primitives. Composable, responsive,
            60fps hover sync, scroll-zoom, brush-select, and LTTB downsampling
            — all in under 4KB gzipped.
          </p>
        </header>

        {/* ── Charts ── */}
        <div className="flex flex-col gap-8">
          <StockPriceChart />
          <RevenueChart />
          <TemperatureChart />
          <IoTDashboard />
          <SparklineStrip />
          <MonthlySalesChart />
          <ComposedChart />
          <MarketShareChart />
          <ProfitLossChart />
          <BudgetDonutChart />
          <ScatterChart />
          <StackedBarChart />
          <CandlestickChart />
          <WaterfallChart />
          <RadarChart />
          <RadialBarChart />
          <BrowserShareChart />
          <TreemapChart />
          <FunnelChart />
          <BoxPlotChart />
        </div>
      </div>
    </main>
  )
}
