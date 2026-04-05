'use client'

/**
 * Session Analysis Page — charts-first layout for endurance athletes.
 *
 * Route: /chart-test
 *
 * Layout (top→bottom, above fold ~729px):
 *   1. SessionHeader (40px) — title, metadata, score badges
 *   2. KeyStatsStrip (50px) — compact horizontal stat row
 *   3. ChartToggles (32px) — chart visibility + zones
 *   4. Chart stack (~335px) — 5 synced stacked charts
 *   5. X-axis + time pill (24px)
 *   6. HoverDataTable (~160px) — Perplexity-style live table
 *   7. Scrubber (24px) — minimap
 *
 * Below fold (scroll):
 *   8. PeakPowersStrip — 7-column peak powers
 *   9. AdvancedMetricsCards — 2×4 grid
 *  10. TabBar — underline tabs (shell only)
 */

import { useMemo, useState, useCallback, useEffect, useRef } from 'react'
import { ChartRoot } from '@/components/charts/primitives/ChartRoot'
import { ChartLine } from '@/components/charts/primitives/ChartLine'
import { ChartArea } from '@/components/charts/primitives/ChartArea'
import { ChartCrosshair } from '@/components/charts/primitives/ChartCrosshair'
import { ChartAxisY } from '@/components/charts/primitives/ChartAxisY'
import { ChartAxisX } from '@/components/charts/primitives/ChartAxisX'
import { ChartRefLine } from '@/components/charts/primitives/ChartRefLine'
import { ChartZoneLine, POWER_ZONES } from '@/components/charts/primitives/ChartZoneLine'
import { ChartSyncProvider, useChartSync } from '@/components/charts/primitives/ChartSyncProvider'
import { ChartZoomHandler } from '@/components/charts/primitives/ChartZoomHandler'
import { ChartScrubber } from '@/components/charts/primitives/ChartScrubber'
import { ChartIntervalMarkers, type Interval } from '@/components/charts/primitives/ChartIntervalMarkers'
import { CrosshairTimeLabel } from '@/components/charts/primitives/CrosshairTimeLabel'
import { ChartStepLine } from '@/components/charts/primitives/ChartStepLine'
import { niceTicks } from '@/lib/charts/ticks/nice'
import type { ZoneDefinition } from '@/components/charts/primitives/ChartZoneLine'

// ─── FIT data types ───

interface FitData {
  meta: {
    sport: string
    totalTime: number
    avgPower: number
    maxPower: number
    avgHR: number
    maxHR: number
    avgCadence: number
    avgSpeed: number
    ftp: number
    maxHeartRate: number
    recordCount: number
    name: string
    date: string
  }
  power: number[]
  heartRate: number[]
  cadence: number[]
  speed: number[]
  altitude: number[]
  intervals: (Interval & { avgPower?: number; maxPower?: number })[]
}

// ─── Constants ───

const HR_ZONES: ZoneDefinition[] = [
  { min: 0,    max: 0.60, color: '#94a3b8', label: 'Z1' },
  { min: 0.60, max: 0.70, color: '#22c55e', label: 'Z2' },
  { min: 0.70, max: 0.80, color: '#eab308', label: 'Z3' },
  { min: 0.80, max: 0.90, color: '#f97316', label: 'Z4' },
  { min: 0.90, max: 1.00, color: '#ef4444', label: 'Z5' },
  { min: 1.00, max: Infinity, color: '#dc2626', label: 'Z5+' },
]

type ZoneMode = 'off' | 'power' | 'hr'
const ZONE_MODES: ZoneMode[] = ['off', 'power', 'hr']

type ChartKey = 'power' | 'hr' | 'speed' | 'cadence' | 'elevation' | 'fuel'
const ALL_CHARTS: ChartKey[] = ['power', 'hr', 'speed', 'cadence', 'elevation', 'fuel']
const CHART_LABELS: Record<ChartKey, string> = {
  power: 'Power', hr: 'HR', speed: 'Speed', cadence: 'Cadence', elevation: 'Elevation', fuel: 'Fuel',
}
const DEFAULT_VISIBLE: ChartKey[] = ['power', 'hr', 'speed', 'cadence', 'elevation']

// ─── Time formatting ───

function formatTimeForZoom(index: number, _visibleRange: number): string {
  const m = Math.floor(index / 60)
  const s = index % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function formatTime(index: number): string {
  const m = Math.floor(index / 60)
  const s = index % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function formatDuration(totalSeconds: number): string {
  const h = Math.floor(totalSeconds / 3600)
  const m = Math.floor((totalSeconds % 3600) / 60)
  const s = Math.round(totalSeconds % 60)
  if (h > 0) return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  return `${m}:${s.toString().padStart(2, '0')}`
}

// ─── Rolling average (pre-smoothing for HR / elevation) ───

function rollingAverage(data: readonly number[], windowSize: number): number[] {
  if (windowSize <= 1) return data as number[]
  const len = data.length
  const out = new Array<number>(len)
  const half = (windowSize - 1) >> 1
  let sum = 0
  const firstEnd = Math.min(half, len - 1)
  for (let j = 0; j <= firstEnd; j++) sum += data[j]
  let wStart = 0
  let wEnd = firstEnd
  for (let i = 0; i < len; i++) {
    while (wEnd < Math.min(i + half, len - 1)) { wEnd++; sum += data[wEnd] }
    while (wStart < i - half) { sum -= data[wStart]; wStart++ }
    out[i] = sum / (wEnd - wStart + 1)
  }
  return out
}

// ─── Zone helpers ───

function getPowerZone(watts: number, ftp: number): { label: string; color: string } {
  const pct = watts / ftp
  if (pct < 0.55) return { label: 'Z1', color: '#7CA3BE' }
  if (pct < 0.75) return { label: 'Z2', color: '#14B8A2' }
  if (pct < 0.90) return { label: 'Z3', color: '#E8B020' }
  if (pct < 1.05) return { label: 'Z4', color: '#E36B30' }
  if (pct < 1.20) return { label: 'Z5', color: '#E83B52' }
  return { label: 'Z6', color: '#9B40E8' }
}

function getHRZone(hr: number, maxHR: number): { label: string; color: string } {
  const pct = hr / maxHR
  if (pct < 0.60) return { label: 'Z1', color: '#7CA3BE' }
  if (pct < 0.70) return { label: 'Z2', color: '#14B8A2' }
  if (pct < 0.80) return { label: 'Z3', color: '#E8B020' }
  if (pct < 0.90) return { label: 'Z4', color: '#E36B30' }
  if (pct < 0.95) return { label: 'Z5', color: '#E83B52' }
  return { label: 'Z5+', color: '#9B40E8' }
}

// ─── Mock fuel data (replace with real FIT data when available) ───

interface FuelIntake {
  timestamp: number
  product: string
  choGrams: number
  type: 'gel' | 'drink' | 'bar'
}

interface FuelData {
  targetCHO: number
  targetRate: number
  riderWeight: number
  intakes: FuelIntake[]
}

const MOCK_FUEL: FuelData = {
  targetCHO: 200,
  targetRate: 82,
  riderWeight: 78,
  intakes: [],
}

function getCHOZone(rate: number): { label: string; color: string } {
  if (rate >= 110) return { label: 'Z6', color: '#dc2626' }
  if (rate >= 90)  return { label: 'Z5', color: '#ef4444' }
  if (rate >= 70)  return { label: 'Z4', color: '#f97316' }
  if (rate >= 50)  return { label: 'Z3', color: '#eab308' }
  if (rate >= 30)  return { label: 'Z2', color: '#22c55e' }
  return { label: 'Z1', color: '#94a3b8' }
}

/** Build cumulative CHO array for stepped chart. Returns per-second values. */
function buildCumulativeCHO(intakes: FuelIntake[], totalSeconds: number): number[] {
  const sorted = [...intakes].sort((a, b) => a.timestamp - b.timestamp)
  const data = new Array<number>(totalSeconds).fill(0)
  let cumulative = 0
  let nextIntake = 0
  for (let i = 0; i < totalSeconds; i++) {
    while (nextIntake < sorted.length && sorted[nextIntake].timestamp <= i) {
      cumulative += sorted[nextIntake].choGrams
      nextIntake++
    }
    data[i] = cumulative
  }
  return data
}

// ─── Decoupling computation ───

function computeDecoupling(power: number[], heartRate: number[]): number | null {
  const len = Math.min(power.length, heartRate.length)
  if (len < 600) return null // Need at least 10 min
  const half = Math.floor(len / 2)

  // Compute NP for each half
  const npFirst = computeNP(power.slice(0, half))
  const npSecond = computeNP(power.slice(half))
  if (npFirst === 0 || npSecond === 0) return null

  // Avg HR for each half
  let hrSum1 = 0, hrSum2 = 0
  for (let i = 0; i < half; i++) hrSum1 += heartRate[i]
  for (let i = half; i < len; i++) hrSum2 += heartRate[i]
  const avgHR1 = hrSum1 / half
  const avgHR2 = hrSum2 / (len - half)
  if (avgHR1 === 0 || avgHR2 === 0) return null

  const ef1 = npFirst / avgHR1
  const ef2 = npSecond / avgHR2
  return +((ef1 - ef2) / ef1 * 100).toFixed(1)
}

// ─── Peak power computation ───

function computePeakPower(power: number[], durationSecs: number): number {
  if (power.length < durationSecs) return 0
  let sum = 0
  for (let i = 0; i < durationSecs; i++) sum += power[i]
  let max = sum
  for (let i = durationSecs; i < power.length; i++) {
    sum += power[i] - power[i - durationSecs]
    if (sum > max) max = sum
  }
  return Math.round(max / durationSecs)
}

// ─── Normalized Power ───

function computeNP(power: number[]): number {
  if (power.length < 30) return 0
  // 30s rolling average
  const rolled = new Array(power.length - 29)
  let sum = 0
  for (let i = 0; i < 30; i++) sum += power[i]
  rolled[0] = sum / 30
  for (let i = 30; i < power.length; i++) {
    sum += power[i] - power[i - 30]
    rolled[i - 29] = sum / 30
  }
  // 4th power average → 4th root
  let sum4 = 0
  for (let i = 0; i < rolled.length; i++) {
    const v = rolled[i]
    sum4 += v * v * v * v
  }
  return Math.round(Math.pow(sum4 / rolled.length, 0.25))
}

// ─── Page ───

export default function ChartTestPage() {
  const [fitData, setFitData] = useState<FitData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const url =
      process.env.NODE_ENV === 'development'
        ? `/fit-data/mit-with-spikes.json?t=${Date.now()}`
        : '/fit-data/mit-with-spikes.json'
    fetch(url, { cache: 'no-store' })
      .then((r) => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json() })
      .then((d: FitData) => setFitData(d))
      .catch((e) => setError(e.message))
  }, [])

  if (error) return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF9F5]">
      <p className="text-red-500">Failed to load FIT data: {error}</p>
    </div>
  )

  if (!fitData) return (
    <div className="flex min-h-screen items-center justify-center bg-[#FAF9F5]">
      <p className="font-label text-[11px] uppercase tracking-[.09em] text-[#8A877F]">Loading activity data…</p>
    </div>
  )

  return <SessionAnalysis data={fitData} />
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main content
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SessionAnalysis({ data }: { data: FitData }) {
  const { meta, power, heartRate, cadence, speed, altitude, intervals } = data
  const totalPoints = power.length

  const [zoneMode, setZoneMode] = useState<ZoneMode>('off')
  const [visibleCharts, setVisibleCharts] = useState<Set<ChartKey>>(new Set(DEFAULT_VISIBLE))

  const toggleChart = useCallback((key: ChartKey) => {
    setVisibleCharts((prev) => {
      const next = new Set(prev)
      if (next.has(key)) { if (next.size > 1) next.delete(key) } else { next.add(key) }
      return next
    })
  }, [])

  const durationStr = formatDuration(meta.totalTime)

  const workIntervals = useMemo(() => {
    return intervals
      .filter((iv) => (iv.avgPower ?? 0) >= 350)
      .map((iv, i) => ({ ...iv, name: `Sprint ${i + 1}`, type: 'work' as const }))
  }, [intervals])

  // Peak powers
  const peaks = useMemo(() => {
    const durations = [5, 30, 60, 300, 600, 1200, 3600]
    return durations.map((d) => ({
      duration: d,
      label: d < 60 ? `${d}S` : d < 3600 ? `${d / 60}M` : `${d / 3600}H`,
      watts: computePeakPower(power, d),
    }))
  }, [power])

  const np = useMemo(() => computeNP(power), [power])

  // Energy (kJ)
  const energyKJ = useMemo(() => {
    let sum = 0
    for (let i = 0; i < power.length; i++) sum += power[i]
    return Math.round(sum / 1000)
  }, [power])

  // Total elevation gain
  const elevGain = useMemo(() => {
    let gain = 0
    for (let i = 1; i < altitude.length; i++) {
      const diff = altitude[i] - altitude[i - 1]
      if (diff > 0) gain += diff
    }
    return Math.round(gain)
  }, [altitude])

  // Distance estimate (speed in km/h, 1 sample per second)
  const distanceKm = useMemo(() => {
    let sum = 0
    for (let i = 0; i < speed.length; i++) sum += speed[i]
    return +(sum / 3600).toFixed(1)
  }, [speed])

  // Fuel — stateful so we can add intakes interactively
  const [fuelIntakes, setFuelIntakes] = useState<FuelIntake[]>(MOCK_FUEL.intakes)
  const fuel: FuelData = { ...MOCK_FUEL, intakes: fuelIntakes }

  const addIntake = useCallback((intake: FuelIntake) => {
    setFuelIntakes((prev) => [...prev, intake].sort((a, b) => a.timestamp - b.timestamp))
    setVisibleCharts((prev) => {
      if (prev.has('fuel')) return prev
      const next = new Set(prev)
      next.add('fuel')
      return next
    })
  }, [])

  const removeIntake = useCallback((index: number) => {
    setFuelIntakes((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const totalCHO = fuelIntakes.reduce((s, i) => s + i.choGrams, 0)
  const sessionHours = meta.totalTime / 3600
  const choRate = sessionHours > 0 ? Math.round(totalCHO / sessionHours) : 0
  const fuelCompliance = fuel.targetRate > 0 ? Math.round((choRate / fuel.targetRate) * 100) : 0
  const fuelScore = Math.min(100, Math.round(fuelCompliance * 0.92))
  const choZone = getCHOZone(choRate)
  const decoupling = useMemo(() => computeDecoupling(power, heartRate), [power, heartRate])

  // Cumulative CHO for fuel chart — rebuilds when intakes change
  const cumulativeCHO = useMemo(() => buildCumulativeCHO(fuelIntakes, totalPoints), [fuelIntakes, totalPoints])

  return (
    <ChartSyncProvider dataLength={totalPoints}>
      <div className="min-h-screen bg-[#FAF9F5] py-5">
        <div className="mx-auto max-w-[1140px] px-6">

          {/* ── 1. Header ── */}
          <SessionHeader meta={meta} />

          {/* ── 2. Key Stats Strip ── */}
          <KeyStatsStrip meta={meta} durationStr={durationStr} np={np} distanceKm={distanceKm} elevGain={elevGain} />

          {/* ── 3. Chart Toggles ── */}
          <ChartToggles
            visibleCharts={visibleCharts}
            onToggle={toggleChart}
            zoneMode={zoneMode}
            setZoneMode={setZoneMode}
          />

          {/* ── 4–7. Chart Stack + Table + Scrubber ── */}
          <SyncedCharts
            power={power}
            heartRate={heartRate}
            cadence={cadence}
            speed={speed}
            altitude={altitude}
            cumulativeCHO={cumulativeCHO}
            fuelTarget={fuel.targetCHO}
            intervals={workIntervals}
            ftp={meta.ftp}
            maxHR={meta.maxHR}
            meta={meta}
            zoneMode={zoneMode}
            visibleCharts={visibleCharts}
          />

          {/* ━━━━━━━ BELOW FOLD ━━━━━━━ */}

          {/* ── 8. Peak Powers ── */}
          <PeakPowersStrip peaks={peaks} weight={fuel.riderWeight} />

          {/* ── 9. Advanced Metrics ── */}
          <AdvancedMetricsCards
            meta={meta} np={np} energyKJ={energyKJ} decoupling={decoupling}
            totalCHO={totalCHO} choRate={choRate} fuel={fuel} fuelScore={fuelScore} fuelCompliance={fuelCompliance} choZone={choZone}
          />

          {/* ── 10. Fuel Log ── */}
          <FuelLog intakes={fuelIntakes} totalSeconds={totalPoints} onAdd={addIntake} onRemove={removeIntake} />

          {/* ── 11. Tab Bar (shell) ── */}
          <TabBar />

        </div>
      </div>
    </ChartSyncProvider>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Session Header
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SessionHeader({ meta }: { meta: FitData['meta'] }) {
  return (
    <div className="flex items-start justify-between pb-2">
      <div>
        <h1 className="font-display text-[26px] font-medium tracking-tight text-[#131211]">
          {meta.name}
        </h1>
        <p className="mt-0.5 text-xs text-[#A8A49A]">
          {meta.date} &middot; {meta.sport} &middot; Garmin Edge 850
        </p>
      </div>
      <div className="flex items-center gap-2 pt-1">
        <ScoreBadge label="Effort" value={7} />
        <ScoreBadge label="Quality" value={8} />
        <ScoreBadge label="Legs" value={7} />
      </div>
    </div>
  )
}

function ScoreBadge({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-1.5 rounded-md border border-[#E8E5DC] px-2.5 py-1">
      <span className="text-[11px] text-[#A8A49A]">{label}</span>
      <span className="font-space text-[13px] font-medium tabular-nums text-[#383633]">{value}</span>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. Key Stats Strip
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function KeyStatsStrip({
  meta, durationStr, np, distanceKm, elevGain,
}: {
  meta: FitData['meta']; durationStr: string; np: number; distanceKm: number; elevGain: number
}) {
  return (
    <div className="flex items-baseline gap-6 border-y border-[#E8E5DC] py-2.5">
      <KS label="Duration" value={durationStr} />
      <KS label="Avg Power" value={`${meta.avgPower}`} unit="W" />
      <KS label="Avg HR" value={`${meta.avgHR}`} unit="bpm" />
      <KS label="Distance" value={`${distanceKm}`} unit="km" />
      <KS label="Elevation" value={`${elevGain}`} unit="m" />
      <KS label="Avg Speed" value={`${meta.avgSpeed}`} unit="km/h" />
      <div className="ml-auto flex items-baseline gap-6">
        <KS label="NP" value={`${np}`} unit="W" />
        <KS label="Peak" value={`${meta.maxPower}`} unit="W" />
      </div>
    </div>
  )
}

function KS({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return (
    <div>
      <div className="font-label text-[10px] uppercase tracking-[.04em] text-[#A8A49A]">{label}</div>
      <div className="font-space text-[17px] font-medium tabular-nums slashed-zero text-[#383633]">
        {value}
        {unit && <span className="ml-0.5 text-xs text-[#A8A49A]">{unit}</span>}
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. Chart Toggles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ChartToggles({
  visibleCharts, onToggle, zoneMode, setZoneMode,
}: {
  visibleCharts: Set<ChartKey>
  onToggle: (key: ChartKey) => void
  zoneMode: ZoneMode
  setZoneMode: (mode: ZoneMode) => void
}) {
  return (
    <div className="flex items-center gap-2 py-2">
      {/* Chart visibility toggles */}
      {ALL_CHARTS.map((key) => (
        <button
          key={key}
          onClick={() => onToggle(key)}
          className={`rounded border px-3.5 py-1 font-label text-xs tracking-[.02em] transition-colors ${
            visibleCharts.has(key)
              ? 'border-[#383633] bg-[#383633] text-white'
              : 'border-[#E8E5DC] text-[#A8A49A] hover:border-[#D5D3CE] hover:text-[#6B6760]'
          }`}
        >
          {CHART_LABELS[key]}
        </button>
      ))}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Zone toggle */}
      <span className="font-label text-[10px] uppercase tracking-[.04em] text-[#A8A49A]">Zones</span>
      <div className="flex -space-x-px">
        {ZONE_MODES.map((mode, i) => (
          <button
            key={mode}
            onClick={() => setZoneMode(mode)}
            className={`border border-[#E8E5DC] px-3 py-1 font-label text-xs tracking-[.02em] transition-colors ${
              i === 0 ? 'rounded-l' : ''
            } ${i === ZONE_MODES.length - 1 ? 'rounded-r' : ''} ${
              zoneMode === mode
                ? 'z-10 border-[#383633] bg-[#383633] text-white'
                : 'text-[#A8A49A] hover:text-[#6B6760]'
            }`}
          >
            {mode === 'off' ? 'Off' : mode === 'power' ? 'Power' : 'HR'}
          </button>
        ))}
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4–7. Synced Charts + HoverDataTable + Scrubber
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SyncedCharts({
  power, heartRate, cadence, speed, altitude, cumulativeCHO, fuelTarget, intervals, ftp, maxHR, meta, zoneMode, visibleCharts,
}: {
  power: number[]; heartRate: number[]; cadence: number[]; speed: number[]; altitude: number[]
  cumulativeCHO: number[]; fuelTarget: number
  intervals: Interval[]; ftp: number; maxHR: number; meta: FitData['meta']
  zoneMode: ZoneMode; visibleCharts: Set<ChartKey>
}) {
  const sync = useChartSync()!
  const { zoom } = sync
  const { start, end } = zoom
  const visibleRange = end - start + 1

  const visPower = useMemo(() => power.slice(start, end + 1), [power, start, end])
  const visCadence = useMemo(() => cadence.slice(start, end + 1), [cadence, start, end])
  const visSpeed = useMemo(() => speed.slice(start, end + 1), [speed, start, end])

  const smoothWindow = visibleRange < 500 ? 5 : visibleRange < 2000 ? 3 : 1
  const visHR = useMemo(() => {
    const raw = heartRate.slice(start, end + 1)
    return smoothWindow > 1 ? rollingAverage(raw, smoothWindow) : raw
  }, [heartRate, start, end, smoothWindow])
  const visAltitude = useMemo(() => {
    const raw = altitude.slice(start, end + 1)
    return smoothWindow > 1 ? rollingAverage(raw, smoothWindow) : raw
  }, [altitude, start, end, smoothWindow])

  const visCHO = useMemo(() => cumulativeCHO.slice(start, end + 1), [cumulativeCHO, start, end])

  const hasAnyCHO = useMemo(() => {
    for (let i = 0; i < cumulativeCHO.length; i++) {
      if (cumulativeCHO[i] > 0) return true
    }
    return false
  }, [cumulativeCHO])

  const choDomainMax = useMemo(() => {
    let maxCHO = fuelTarget
    for (let i = 0; i < visCHO.length; i++) {
      if (visCHO[i] > maxCHO) maxCHO = visCHO[i]
    }
    return Math.max(10, maxCHO)
  }, [fuelTarget, visCHO])

  const formatX = useCallback(
    (i: number) => formatTimeForZoom(start + i, visibleRange),
    [start, visibleRange],
  )
  const formatTimeLabel = useCallback((idx: number) => formatTime(idx), [])

  const timeTicks = useMemo(() => {
    const ticks = niceTicks(start, end, 6)
    return [...new Set(ticks.map((sec) => Math.round(sec) - start).filter((i) => i >= 0 && i < visibleRange))]
  }, [start, end, visibleRange])

  const chartPad = { right: 64 }

  const visibleIntervals = useMemo(() => {
    return intervals
      .map((iv) => ({ ...iv, startIndex: iv.startIndex - start, endIndex: iv.endIndex - start }))
      .filter((iv) => iv.endIndex > 0 && iv.startIndex < visibleRange)
  }, [intervals, start, visibleRange])

  const orderedVisible = ALL_CHARTS.filter((k) => visibleCharts.has(k))
  const lastChartKey = orderedVisible[orderedVisible.length - 1]

  return (
    <div className="relative select-none">
      {/* Power — 110px */}
      {visibleCharts.has('power') && (
        <ChartRoot
          data={visPower}
          height={110}
          padding={{ ...chartPad, bottom: 4 }}
          className="rounded-t-lg border border-[#E8E5DC] bg-[#FDFCFA]"
        >
          <ChartIntervalMarkers intervals={visibleIntervals} showLabels />
          <ChartAxisY tickCount={3} />
          <ChartRefLine y={ftp} label={`CP ${ftp}W`} />
          <ChartArea gradientColor="#059669" opacityFrom={0.10} opacityTo={0.005} />
          {zoneMode === 'power' ? (
            <ChartZoneLine threshold={ftp} zones={POWER_ZONES} />
          ) : (
            <ChartLine />
          )}
          <ChartCrosshair lineColor="#52525b" lineWidth={0.75} />
          <ChartZoomHandler />
          <text x={4} y={12} className="fill-[#A8A49A] font-label text-[9px]">Power</text>
        </ChartRoot>
      )}

      {/* HR — 75px */}
      {visibleCharts.has('hr') && (
        <ChartRoot
          data={visHR}
          height={75}
          padding={{ ...chartPad, bottom: 4 }}
          className="-mt-px border-x border-b border-[#E8E5DC] bg-[#FDFCFA]"
        >
          <ChartIntervalMarkers intervals={visibleIntervals} />
          <ChartAxisY tickCount={3} />
          <ChartRefLine y={160} label="LT2" />
          <ChartArea gradientColor="#ef4444" opacityFrom={0.08} opacityTo={0.005} />
          {zoneMode === 'hr' ? (
            <ChartZoneLine threshold={maxHR} zones={HR_ZONES} />
          ) : (
            <ChartLine className="fill-none stroke-red-500 stroke-[1.5]" />
          )}
          <ChartCrosshair lineColor="#52525b" lineWidth={0.75} dotColor="#ef4444" />
          <ChartZoomHandler />
          <text x={4} y={12} className="fill-[#A8A49A] font-label text-[9px]">HR</text>
        </ChartRoot>
      )}

      {/* Speed — 55px */}
      {visibleCharts.has('speed') && (
        <ChartRoot
          data={visSpeed}
          height={55}
          padding={{ ...chartPad, bottom: 4 }}
          className="-mt-px border-x border-b border-[#E8E5DC] bg-[#FDFCFA]"
        >
          <ChartAxisY tickCount={2} format={(v) => `${v.toFixed(0)}`} />
          <ChartArea gradientColor="#3b82f6" opacityFrom={0.08} opacityTo={0.005} />
          <ChartLine className="fill-none stroke-blue-500 stroke-[1.5]" />
          <ChartCrosshair lineColor="#52525b" lineWidth={0.75} dotColor="#3b82f6" />
          <ChartZoomHandler />
          <text x={4} y={12} className="fill-[#A8A49A] font-label text-[9px]">Speed</text>
        </ChartRoot>
      )}

      {/* Cadence — 55px */}
      {visibleCharts.has('cadence') && (
        <ChartRoot
          data={visCadence}
          height={55}
          padding={{ ...chartPad, bottom: 4 }}
          className="-mt-px border-x border-b border-[#E8E5DC] bg-[#FDFCFA]"
        >
          <ChartAxisY tickCount={2} format={(v) => `${v}`} />
          <ChartRefLine y={90} label="90" />
          <ChartArea gradientColor="#a855f7" opacityFrom={0.08} opacityTo={0.005} />
          <ChartLine className="fill-none stroke-purple-500 stroke-[1.5]" />
          <ChartCrosshair lineColor="#52525b" lineWidth={0.75} dotColor="#a855f7" />
          <ChartZoomHandler />
          <text x={4} y={12} className="fill-[#A8A49A] font-label text-[9px]">Cadence</text>
        </ChartRoot>
      )}

      {/* Elevation — 40px, X-axis only on last visible chart */}
      {visibleCharts.has('elevation') && (
        <ChartRoot
          data={visAltitude}
          height={40}
          padding={chartPad}
          className="-mt-px border-x border-b border-[#E8E5DC] bg-[#FDFCFA]"
        >
          <ChartAxisY tickCount={2} format={(v) => `${v.toFixed(0)}m`} />
          {lastChartKey === 'elevation' && <ChartAxisX format={formatX} tickValues={timeTicks} />}
          <ChartArea gradientColor="#78716c" opacityFrom={0.15} opacityTo={0.03} />
          <ChartLine className="fill-none stroke-stone-400 stroke-[1]" />
          <ChartCrosshair lineColor="#52525b" lineWidth={0.75} dotColor="#78716c" dotRadius={2} />
          <ChartZoomHandler />
          <text x={4} y={12} className="fill-[#A8A49A] font-label text-[9px]">Elevation</text>
        </ChartRoot>
      )}

      {/* Fuel / CHO — 60px, stepped cumulative line. */}
      {visibleCharts.has('fuel') && hasAnyCHO && (
        <ChartRoot
          data={visCHO}
          height={60}
          yDomain={[0, choDomainMax]}
          padding={{ ...chartPad, bottom: lastChartKey === 'fuel' ? undefined : 4 }}
          className="-mt-px border-x border-b border-[#E8E5DC] bg-[#FDFCFA]"
        >
          <ChartAxisY tickCount={3} format={(v) => `${v.toFixed(0)}g`} />
          {lastChartKey === 'fuel' && <ChartAxisX format={formatX} tickValues={timeTicks} />}
          <ChartRefLine y={fuelTarget} label={`TARGET ${fuelTarget}g`} />
          <ChartStepLine className="fill-none stroke-pink-400 stroke-[1.5]" />
          <ChartCrosshair lineColor="#52525b" lineWidth={0.75} dotColor="#f472b6" dotRadius={2} />
          <ChartZoomHandler />
          <text x={4} y={12} className="fill-[#A8A49A] font-label text-[9px]">CHO</text>
        </ChartRoot>
      )}

      {/* Crosshair time label */}
      <CrosshairTimeLabel format={formatTimeLabel} />

      {/* Hover data table */}
      <HoverDataTable
        power={power} heartRate={heartRate} cadence={cadence} speed={speed} altitude={altitude} meta={meta}
      />

      {/* Zoom indicator */}
      {(start > 0 || end < power.length - 1) && (
        <div className="mt-1 flex items-center justify-between">
          <span className="font-space text-[10px] text-[#A8A49A]">
            {formatTimeForZoom(start, visibleRange)} – {formatTimeForZoom(end, visibleRange)}
          </span>
          <button
            onClick={() => sync.setZoom({ start: 0, end: power.length - 1 })}
            className="rounded px-2 py-0.5 font-label text-[9px] uppercase tracking-[.06em] text-[#6B6760] transition-colors hover:bg-[#E8E5DC] hover:text-[#383633]"
          >
            Reset zoom
          </button>
        </div>
      )}
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. Hover Data Table (ref-based, zero re-renders)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function HoverDataTable({
  power, heartRate, cadence, speed, altitude, meta,
}: {
  power: number[]; heartRate: number[]; cadence: number[]; speed: number[]; altitude: number[]
  meta: FitData['meta']
}) {
  const sync = useChartSync()
  const { start, end } = sync?.zoom ?? { start: 0, end: power.length - 1 }
  const isZoomed = start > 0 || end < power.length - 1

  const rangeStats = useMemo(() => {
    const len = end - start + 1
    if (len <= 0) return { power: 0, hr: 0, cad: 0, speed: 0, elev: 0, maxPower: 0, maxHR: 0, maxCad: 0, maxSpeed: 0, maxElev: 0 }
    let pw = 0, hr = 0, cd = 0, spd = 0, elv = 0
    let mxPw = -Infinity, mxHr = -Infinity, mxCd = -Infinity, mxSpd = -Infinity, mxElv = -Infinity
    for (let i = start; i <= end; i++) {
      pw += power[i]; hr += heartRate[i]; cd += cadence[i]; spd += speed[i]; elv += altitude[i]
      if (power[i] > mxPw) mxPw = power[i]
      if (heartRate[i] > mxHr) mxHr = heartRate[i]
      if (cadence[i] > mxCd) mxCd = cadence[i]
      if (speed[i] > mxSpd) mxSpd = speed[i]
      if (altitude[i] > mxElv) mxElv = altitude[i]
    }
    return {
      power: Math.round(pw / len), hr: Math.round(hr / len), cad: Math.round(cd / len),
      speed: +(spd / len).toFixed(1), elev: Math.round(elv / len),
      maxPower: Math.round(mxPw), maxHR: Math.round(mxHr), maxCad: Math.round(mxCd),
      maxSpeed: +mxSpd.toFixed(1), maxElev: Math.round(mxElv),
    }
  }, [power, heartRate, cadence, speed, altitude, start, end])

  const rangeDuration = useMemo(() => {
    const secs = end - start
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${formatTime(start)} – ${formatTime(end)}  (${m}:${s.toString().padStart(2, '0')})`
  }, [start, end])

  // Refs
  const timeLabelRef = useRef<HTMLSpanElement>(null)
  const timeValRef = useRef<HTMLSpanElement>(null)
  const powerLabelRef = useRef<HTMLSpanElement>(null)
  const powerValRef = useRef<HTMLSpanElement>(null)
  const powerMaxRef = useRef<HTMLSpanElement>(null)
  const powerZoneRef = useRef<HTMLSpanElement>(null)
  const hrLabelRef = useRef<HTMLSpanElement>(null)
  const hrValRef = useRef<HTMLSpanElement>(null)
  const hrMaxRef = useRef<HTMLSpanElement>(null)
  const hrZoneRef = useRef<HTMLSpanElement>(null)
  const cadLabelRef = useRef<HTMLSpanElement>(null)
  const cadValRef = useRef<HTMLSpanElement>(null)
  const cadMaxRef = useRef<HTMLSpanElement>(null)
  const speedLabelRef = useRef<HTMLSpanElement>(null)
  const speedValRef = useRef<HTMLSpanElement>(null)
  const speedMaxRef = useRef<HTMLSpanElement>(null)
  const elevLabelRef = useRef<HTMLSpanElement>(null)
  const elevValRef = useRef<HTMLSpanElement>(null)
  const elevMaxRef = useRef<HTMLSpanElement>(null)

  const showAverages = useCallback(() => {
    const s = rangeStats
    if (timeLabelRef.current) timeLabelRef.current.textContent = isZoomed ? 'Selection' : 'Duration'
    if (timeValRef.current) timeValRef.current.textContent = isZoomed ? rangeDuration : formatTime(power.length)
    const prefix = isZoomed ? 'Sel' : 'Avg'
    if (powerLabelRef.current) powerLabelRef.current.textContent = `${prefix} Power`
    if (hrLabelRef.current) hrLabelRef.current.textContent = `${prefix} Heart Rate`
    if (cadLabelRef.current) cadLabelRef.current.textContent = `${prefix} Cadence`
    if (speedLabelRef.current) speedLabelRef.current.textContent = `${prefix} Speed`
    if (elevLabelRef.current) elevLabelRef.current.textContent = `${prefix} Elevation`
    if (powerValRef.current) { powerValRef.current.textContent = `${s.power}`; powerValRef.current.style.color = '#3D3C39' }
    if (hrValRef.current) { hrValRef.current.textContent = `${s.hr}`; hrValRef.current.style.color = '#3D3C39' }
    if (cadValRef.current) { cadValRef.current.textContent = `${s.cad}`; cadValRef.current.style.color = '#3D3C39' }
    if (speedValRef.current) { speedValRef.current.textContent = `${s.speed}`; speedValRef.current.style.color = '#3D3C39' }
    if (elevValRef.current) { elevValRef.current.textContent = `${s.elev}`; elevValRef.current.style.color = '#3D3C39' }
    if (powerMaxRef.current) powerMaxRef.current.textContent = `max ${s.maxPower}`
    if (hrMaxRef.current) hrMaxRef.current.textContent = `max ${s.maxHR}`
    if (cadMaxRef.current) cadMaxRef.current.textContent = `max ${s.maxCad}`
    if (speedMaxRef.current) speedMaxRef.current.textContent = `max ${s.maxSpeed}`
    if (elevMaxRef.current) elevMaxRef.current.textContent = `max ${s.maxElev}`
    if (powerZoneRef.current) { powerZoneRef.current.textContent = ''; powerZoneRef.current.style.backgroundColor = '' }
    if (hrZoneRef.current) { hrZoneRef.current.textContent = ''; hrZoneRef.current.style.backgroundColor = '' }
  }, [meta, rangeStats, isZoomed, rangeDuration, power.length])

  useEffect(() => { showAverages() }, [showAverages])

  useEffect(() => {
    if (!sync) return
    return sync.subscribeHover((visIdx) => {
      if (visIdx === null) { showAverages(); return }
      const fullIdx = sync.zoom.start + visIdx
      if (fullIdx < 0 || fullIdx >= power.length) return

      if (timeLabelRef.current) timeLabelRef.current.textContent = 'Time'
      if (timeValRef.current) timeValRef.current.textContent = formatTime(fullIdx)
      if (powerLabelRef.current) powerLabelRef.current.textContent = 'Power'
      if (hrLabelRef.current) hrLabelRef.current.textContent = 'Heart Rate'
      if (cadLabelRef.current) cadLabelRef.current.textContent = 'Cadence'
      if (speedLabelRef.current) speedLabelRef.current.textContent = 'Speed'
      if (elevLabelRef.current) elevLabelRef.current.textContent = 'Elevation'

      const pw = power[fullIdx], hr = heartRate[fullIdx], cad = cadence[fullIdx], spd = speed[fullIdx], elev = altitude[fullIdx]
      if (powerValRef.current) { powerValRef.current.textContent = `${pw}`; powerValRef.current.style.color = '#0F0F0E' }
      if (hrValRef.current) { hrValRef.current.textContent = `${hr}`; hrValRef.current.style.color = '#0F0F0E' }
      if (cadValRef.current) { cadValRef.current.textContent = `${cad}`; cadValRef.current.style.color = '#0F0F0E' }
      if (speedValRef.current) { speedValRef.current.textContent = spd.toFixed(1); speedValRef.current.style.color = '#0F0F0E' }
      if (elevValRef.current) { elevValRef.current.textContent = `${Math.round(elev)}`; elevValRef.current.style.color = '#0F0F0E' }
      if (powerMaxRef.current) powerMaxRef.current.textContent = ''
      if (hrMaxRef.current) hrMaxRef.current.textContent = ''
      if (cadMaxRef.current) cadMaxRef.current.textContent = ''
      if (speedMaxRef.current) speedMaxRef.current.textContent = ''
      if (elevMaxRef.current) elevMaxRef.current.textContent = ''
      if (powerZoneRef.current) {
        const z = getPowerZone(pw, meta.ftp)
        powerZoneRef.current.textContent = z.label; powerZoneRef.current.style.color = z.color; powerZoneRef.current.style.backgroundColor = `${z.color}1F`
      }
      if (hrZoneRef.current) {
        const z = getHRZone(hr, meta.maxHR)
        hrZoneRef.current.textContent = z.label; hrZoneRef.current.style.color = z.color; hrZoneRef.current.style.backgroundColor = `${z.color}1F`
      }
    })
  }, [sync, power, heartRate, cadence, speed, altitude, meta, showAverages])

  const rowCls = 'flex items-center gap-3 border-b border-[#E8E5DC]/50 py-2'
  const dotCls = 'h-2 w-2 shrink-0 rounded-full'
  const labelCls = 'w-24 text-[13px] text-[#6B6760]'
  const valCls = 'font-space text-[15px] font-medium tabular-nums slashed-zero text-[#3D3C39]'
  const unitCls = 'font-space text-xs text-[#A8A49A]'
  const maxCls = 'font-space text-[11px] tabular-nums text-[#A8A49A]'
  const zoneCls = 'ml-auto rounded px-2.5 py-0.5 font-space text-[11px] font-medium tabular-nums'

  return (
    <div className="mt-2 mb-1" style={{ paddingLeft: 48, paddingRight: 64 }}>
      <div className={rowCls}>
        <span className={`${dotCls} bg-[#383633]`} />
        <span ref={timeLabelRef} className={labelCls}>Duration</span>
        <span ref={timeValRef} className={valCls} />
      </div>
      <div className={rowCls}>
        <span className={`${dotCls} bg-[#22c55e]`} />
        <span ref={powerLabelRef} className={labelCls}>Avg Power</span>
        <span className="flex items-baseline gap-1">
          <span ref={powerValRef} className={valCls}>0</span>
          <span className={unitCls}>W</span>
        </span>
        <span ref={powerMaxRef} className={maxCls} />
        <span ref={powerZoneRef} className={zoneCls} />
      </div>
      <div className={rowCls}>
        <span className={`${dotCls} bg-[#ef4444]`} />
        <span ref={hrLabelRef} className={labelCls}>Avg Heart Rate</span>
        <span className="flex items-baseline gap-1">
          <span ref={hrValRef} className={valCls}>0</span>
          <span className={unitCls}>bpm</span>
        </span>
        <span ref={hrMaxRef} className={maxCls} />
        <span ref={hrZoneRef} className={zoneCls} />
      </div>
      <div className={rowCls}>
        <span className={`${dotCls} bg-[#8b5cf6]`} />
        <span ref={cadLabelRef} className={labelCls}>Avg Cadence</span>
        <span className="flex items-baseline gap-1">
          <span ref={cadValRef} className={valCls}>0</span>
          <span className={unitCls}>rpm</span>
        </span>
        <span ref={cadMaxRef} className={maxCls} />
      </div>
      <div className={rowCls}>
        <span className={`${dotCls} bg-[#3b82f6]`} />
        <span ref={speedLabelRef} className={labelCls}>Avg Speed</span>
        <span className="flex items-baseline gap-1">
          <span ref={speedValRef} className={valCls}>0</span>
          <span className={unitCls}>km/h</span>
        </span>
        <span ref={speedMaxRef} className={maxCls} />
      </div>
      <div className="flex items-center gap-3 py-2">
        <span className={`${dotCls} bg-[#a8a49a]`} />
        <span ref={elevLabelRef} className={labelCls}>Avg Elevation</span>
        <span className="flex items-baseline gap-1">
          <span ref={elevValRef} className={valCls}>0</span>
          <span className={unitCls}>m</span>
        </span>
        <span ref={elevMaxRef} className={maxCls} />
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 8. Peak Powers Strip
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PeakPowersStrip({
  peaks, weight,
}: {
  peaks: { duration: number; label: string; watts: number }[]
  weight: number
}) {
  return (
    <div className="mt-8">
      <h2 className="mb-2 font-label text-xs uppercase tracking-[.06em] text-[#A8A49A]">Peak Powers</h2>
      <div className="grid grid-cols-7 divide-x divide-[#E8E5DC] rounded-lg border border-[#E8E5DC]">
        {peaks.map((p) => (
          <div key={p.label} className="px-3 py-3 text-center">
            <div className="font-label text-[10px] uppercase tracking-[.04em] text-[#A8A49A]">{p.label}</div>
            <div className="font-space text-[18px] font-medium tabular-nums text-[#383633]">
              {p.watts}
              <span className="text-xs text-[#A8A49A]">W</span>
            </div>
            <div className="font-space text-[11px] tabular-nums text-[#A8A49A]">
              {weight > 0 ? (p.watts / weight).toFixed(1) : '—'}
              <span className="ml-0.5 text-[9px]">W/kg</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 9. Advanced Metrics Cards
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function AdvancedMetricsCards({
  meta, np, energyKJ, decoupling, totalCHO, choRate, fuel, fuelScore, fuelCompliance, choZone,
}: {
  meta: FitData['meta']; np: number; energyKJ: number; decoupling: number | null
  totalCHO: number; choRate: number; fuel: FuelData; fuelScore: number; fuelCompliance: number
  choZone: { label: string; color: string }
}) {
  const vi = np > 0 && meta.avgPower > 0 ? (np / meta.avgPower).toFixed(2) : '—'
  const kcal = Math.round(energyKJ * 0.239)
  const kjMin = meta.totalTime > 0 ? (energyKJ / (meta.totalTime / 60)).toFixed(1) : '—'
  const ef = np > 0 && meta.avgHR > 0 ? (np / meta.avgHR).toFixed(2) : '—'

  return (
    <div className="mt-6">
      <h2 className="mb-2 font-label text-xs uppercase tracking-[.06em] text-[#A8A49A]">Advanced Metrics</h2>
      <div className="grid grid-cols-4 divide-x divide-[#E8E5DC] rounded-lg border border-[#E8E5DC]">
        {/* Row 1 */}
        <MetricCell label="Balanced Power" value={`${np}`} unit="W" sub={`VI ${vi}`} />
        <MetricCell label="R-Score" value="—" unit="rS" sub="Coming soon" />
        <MetricCell label="Energy" value={`${energyKJ}`} unit="kJ" sub={`${kcal} kcal · ${kjMin} kJ/min`} />
        <MetricCell label="Decoupling" value={decoupling !== null ? `${decoupling}` : '—'} unit="%" sub={`Efficiency ${ef}`} />
        {/* Row 2 */}
        <MetricCell label="CHO Intake" value={`${totalCHO}`} unit="g" sub={`of ${fuel.targetCHO}g target`} badge={choZone} />
        <MetricCell label="CHO Rate" value={`${choRate}`} unit="g/h" sub={`Target ${fuel.targetRate} g/h`} />
        <MetricCell label="Fuel Score" value={`${fuelScore}`} unit="/100" sub={`${fuelCompliance}% compliance`} progress={fuelScore} />
        <MetricCell label="Avg Cadence" value={`${meta.avgCadence}`} unit="rpm" />
      </div>
    </div>
  )
}

function MetricCell({ label, value, unit, sub, badge, progress }: {
  label: string; value: string; unit?: string; sub?: string
  badge?: { label: string; color: string }; progress?: number
}) {
  return (
    <div className="px-4 py-3">
      <div className="font-label text-[10px] uppercase tracking-[.04em] text-[#A8A49A]">{label}</div>
      <div className="flex items-baseline gap-2">
        <div className="font-space text-[18px] font-medium tabular-nums text-[#383633]">
          {value}
          {unit && <span className="ml-0.5 text-xs text-[#A8A49A]">{unit}</span>}
        </div>
        {badge && (
          <span
            className="rounded px-2 py-0.5 font-space text-[10px] font-medium"
            style={{ color: badge.color, backgroundColor: `${badge.color}1F` }}
          >
            {badge.label}
          </span>
        )}
      </div>
      {sub && <div className="mt-0.5 font-space text-[11px] text-[#A8A49A]">{sub}</div>}
      {progress !== undefined && (
        <div className="mt-1 h-1 w-16 overflow-hidden rounded-full bg-[#E8E5DC]">
          <div className="h-full rounded-full bg-[#22c55e]" style={{ width: `${Math.min(100, progress)}%` }} />
        </div>
      )}
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 10. Fuel Log
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function FuelLog({ intakes, totalSeconds, onAdd, onRemove }: {
  intakes: FuelIntake[]; totalSeconds: number; onAdd: (intake: FuelIntake) => void; onRemove: (index: number) => void
}) {
  const [showForm, setShowForm] = useState(false)
  const [formMin, setFormMin] = useState(15)
  const [formProduct, setFormProduct] = useState('SUHN IO Gel — Citrus')
  const [formCHO, setFormCHO] = useState(48)

  const maxMin = Math.floor(totalSeconds / 60)

  const handleAdd = () => {
    const secs = formMin * 60
    if (secs <= 0 || secs >= totalSeconds || formCHO <= 0) return
    onAdd({ timestamp: secs, product: formProduct, choGrams: formCHO, type: 'gel' })
    setFormMin((prev) => Math.min(prev + 15, maxMin))
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="font-label text-xs uppercase tracking-[.06em] text-[#A8A49A]">Fuel Log</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded border border-[#E8E5DC] px-3 py-1 font-label text-xs text-[#A8A49A] transition-colors hover:border-[#D5D3CE] hover:text-[#6B6760]"
        >
          {showForm ? 'Cancel' : '+ Add intake'}
        </button>
      </div>

      {/* Add intake form */}
      {showForm && (
        <div className="mt-2 flex items-end gap-3 rounded-lg border border-[#E8E5DC] bg-white p-3">
          <div>
            <label className="font-label text-[10px] uppercase tracking-[.04em] text-[#A8A49A]">Minute</label>
            <input
              type="number"
              min={1}
              max={maxMin}
              value={formMin}
              onChange={(e) => setFormMin(Number(e.target.value) || 0)}
              className="mt-0.5 block w-20 rounded border border-[#E8E5DC] bg-[#FDFCFA] px-2 py-1 font-space text-sm tabular-nums text-[#383633] outline-none focus:border-[#A8A49A]"
            />
          </div>
          <div className="flex-1">
            <label className="font-label text-[10px] uppercase tracking-[.04em] text-[#A8A49A]">Product</label>
            <input
              value={formProduct}
              onChange={(e) => setFormProduct(e.target.value)}
              className="mt-0.5 block w-full rounded border border-[#E8E5DC] bg-[#FDFCFA] px-2 py-1 text-sm text-[#383633] outline-none focus:border-[#A8A49A]"
            />
          </div>
          <div>
            <label className="font-label text-[10px] uppercase tracking-[.04em] text-[#A8A49A]">CHO (g)</label>
            <input
              type="number"
              min={1}
              max={200}
              value={formCHO}
              onChange={(e) => setFormCHO(Number(e.target.value) || 0)}
              className="mt-0.5 block w-16 rounded border border-[#E8E5DC] bg-[#FDFCFA] px-2 py-1 font-space text-sm tabular-nums text-[#383633] outline-none focus:border-[#A8A49A]"
            />
          </div>
          <button
            onClick={handleAdd}
            className="rounded bg-[#383633] px-4 py-1.5 font-label text-xs text-white transition-colors hover:bg-[#131211]"
          >
            Add
          </button>
        </div>
      )}

      {/* Intake cards */}
      {intakes.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-3">
          {intakes.map((intake, i) => (
            <div key={i} className="group relative min-w-[160px] flex-1 rounded-lg border border-[#E8E5DC] px-3 py-2.5">
              <button
                onClick={() => onRemove(i)}
                className="absolute top-1.5 right-2 hidden rounded-full px-1 text-[11px] text-[#A8A49A] transition-colors hover:text-[#ef4444] group-hover:block"
              >
                ✕
              </button>
              <div className="font-space text-[13px] font-medium tabular-nums text-[#f97316]">
                {formatTime(intake.timestamp)}
              </div>
              <div className="mt-0.5 text-[13px] text-[#383633]">{intake.product}</div>
              <div className="mt-0.5 font-space text-xs text-[#A8A49A]">{intake.choGrams}g CHO</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 11. Tab Bar (shell)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const TABS = ['Summary', 'Intervals', 'Peaks', 'Zones', 'Load', 'Fuel', 'Analysis'] as const

function TabBar() {
  const [active, setActive] = useState(0)

  return (
    <div className="mt-8 border-b border-[#E8E5DC]">
      <div className="flex gap-6">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={`pb-2 font-label text-[13px] uppercase tracking-[.04em] transition-colors ${
              active === i
                ? 'border-b-2 border-[#383633] font-medium text-[#383633]'
                : 'text-[#A8A49A] hover:text-[#6B6760]'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}
