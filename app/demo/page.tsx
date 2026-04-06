'use client'

import { useMemo, useCallback } from 'react'

// ─── Chart primitives ───
import { ChartRoot } from '@/components/charts/primitives/ChartRoot'
import { ChartLine } from '@/components/charts/primitives/ChartLine'
import { ChartArea } from '@/components/charts/primitives/ChartArea'
import { ChartCrosshair } from '@/components/charts/primitives/ChartCrosshair'
import { ChartAxisX } from '@/components/charts/primitives/ChartAxisX'
import { ChartAxisY } from '@/components/charts/primitives/ChartAxisY'
import { ChartRefLine } from '@/components/charts/primitives/ChartRefLine'
import { ChartZoneLine, type ZoneDefinition } from '@/components/charts/primitives/ChartZoneLine'
import { ChartSyncProvider, useChartSync } from '@/components/charts/primitives/ChartSyncProvider'
import { ChartZoomHandler } from '@/components/charts/primitives/ChartZoomHandler'
import { ChartScrubber } from '@/components/charts/primitives/ChartScrubber'
import { CrosshairTimeLabel } from '@/components/charts/primitives/CrosshairTimeLabel'

// ─── Data generators ───
import {
  generateStockData,
  generateRevenueData,
  generateTemperatureData,
  generateSensorData,
} from './generate-data'

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
    <section className="rounded-2xl border border-border bg-elevated p-5">
      <h2 className="font-label text-[22px] font-medium tracking-tight text-text-primary">
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
        <ChartAxisX labelCount={6} format={formatMonth} fontFamily="'Space Grotesk', sans-serif" />
        <ChartAxisY tickCount={4} format={(v) => `$${v.toFixed(0)}`} />
        <ChartCrosshair dotColor="#3b82f6" />
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
          fontFamily="'Space Grotesk', sans-serif"
        />
        <ChartAxisY tickCount={4} format={(v) => `$${v.toFixed(0)}k`} />
        <ChartCrosshair dotColor="#10b981" />
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
// Page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function DemoPage() {
  return (
    <main className="min-h-screen bg-canvas pb-20 pt-12">
      <div className="mx-auto max-w-[920px] px-6">
        {/* ── Header ── */}
        <header className="mb-10">
          <h1 className="font-label text-[36px] font-medium tracking-tight text-text-primary">
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
        </div>
      </div>
    </main>
  )
}
