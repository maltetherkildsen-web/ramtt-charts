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
import { cn, WEIGHT, BORDER, RADIUS, TRANSITION, LABEL_STYLE, VALUE_STYLE, UNIT_STYLE, MUTED_STYLE, QUIET_STYLE, HOVER_SAND, ACTIVE_SAND, ACTIVE_BLACK, FOCUS_RING } from '@/lib/ui'
import { motion, AnimatePresence, MotionConfig } from 'motion/react'
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
import type { Interval } from '@/components/charts/primitives/ChartIntervalMarkers'
import { CrosshairTimeLabel } from '@/components/charts/primitives/CrosshairTimeLabel'
import { BrushOverlay } from '@/components/charts/primitives/BrushOverlay'
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

type ChartKey = 'power' | 'hr' | 'speed' | 'cadence' | 'elevation' | 'kjmin'
const ALL_CHARTS: ChartKey[] = ['power', 'hr', 'kjmin', 'cadence', 'speed', 'elevation']
const CHART_LABELS: Record<ChartKey, string> = {
  power: 'Power', hr: 'HR', kjmin: 'kJ/min', cadence: 'Cadence', speed: 'Speed', elevation: 'Elevation',
}
const DEFAULT_VISIBLE: ChartKey[] = ['power', 'hr', 'kjmin', 'cadence']

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

// ─── kJ/min (energy expenditure rate) ───

function calculateKjPerMin(powerData: number[]): number[] {
  const result = new Array<number>(powerData.length)
  let windowSum = 0

  for (let i = 0; i < powerData.length; i++) {
    windowSum += powerData[i]
    if (i >= 60) windowSum -= powerData[i - 60]

    const windowSize = Math.min(i + 1, 60)
    const avgWatts = windowSum / windowSize
    result[i] = (avgWatts * 60) / 1000
  }

  return result
}

// ─── Peak power computation ───

interface PeakPowerResult {
  label: string
  windowSeconds: number
  avgPower: number
  startIdx: number
  endIdx: number
}

const PEAK_DURATIONS: { label: string; seconds: number }[] = [
  { label: '3s',  seconds: 3 },
  { label: '10s', seconds: 10 },
  { label: '30s', seconds: 30 },
  { label: '1m',  seconds: 60 },
  { label: '3m',  seconds: 180 },
  { label: '7m',  seconds: 420 },
  { label: '12m', seconds: 720 },
  { label: '20m', seconds: 1200 },
  { label: '30m', seconds: 1800 },
  { label: '60m', seconds: 3600 },
]

function findPeakPower(
  powerData: number[],
  windowSeconds: number,
): { avgPower: number; startIdx: number; endIdx: number } {
  if (powerData.length < windowSeconds) return { avgPower: 0, startIdx: 0, endIdx: 0 }

  let bestSum = 0
  let bestStart = 0

  // Initial window
  let sum = 0
  for (let i = 0; i < windowSeconds; i++) sum += powerData[i]
  bestSum = sum

  // Slide the window
  for (let i = windowSeconds; i < powerData.length; i++) {
    sum += powerData[i] - powerData[i - windowSeconds]
    if (sum > bestSum) {
      bestSum = sum
      bestStart = i - windowSeconds + 1
    }
  }

  return {
    avgPower: Math.round(bestSum / windowSeconds),
    startIdx: bestStart,
    endIdx: bestStart + windowSeconds - 1,
  }
}

function computeAllPeaks(power: number[]): PeakPowerResult[] {
  return PEAK_DURATIONS
    .filter((d) => d.seconds <= power.length)
    .map((d) => {
      const result = findPeakPower(power, d.seconds)
      return { label: d.label, windowSeconds: d.seconds, ...result }
    })
}

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
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
      <p className="text-red-500">Failed to load FIT data: {error}</p>
    </div>
  )

  if (!fitData) return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--bg)]">
      <p className={cn("text-[11px]", WEIGHT.strong, "text-[var(--n600)]")}>Loading activity data…</p>
    </div>
  )

  return (
    <MotionConfig reducedMotion="user">
      <SessionAnalysis data={fitData} />
    </MotionConfig>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Main content
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SessionAnalysis({ data }: { data: FitData }) {
  const { meta, power, heartRate, cadence, speed, altitude } = data
  const totalPoints = power.length

  const [zoneMode, setZoneMode] = useState<ZoneMode>('off')
  const [visibleCharts, setVisibleCharts] = useState<Set<ChartKey>>(new Set(DEFAULT_VISIBLE))
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [showPeaks, setShowPeaks] = useState(false)
  const [activePeak, setActivePeak] = useState<PeakPowerResult | null>(null)

  const peaks = useMemo(() => computeAllPeaks(power), [power])

  // Fullscreen keyboard shortcut: F to toggle, Escape to exit
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return
      if (e.key === 'f' && !e.metaKey && !e.ctrlKey) setIsFullscreen((p) => !p)
      if (e.key === 'Escape' && isFullscreen) setIsFullscreen(false)
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [isFullscreen])

  const toggleChart = useCallback((key: ChartKey) => {
    setVisibleCharts((prev) => {
      const next = new Set(prev)
      if (next.has(key)) { if (next.size > 1) next.delete(key) } else { next.add(key) }
      return next
    })
  }, [])

  const durationStr = formatDuration(meta.totalTime)

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

  const decoupling = useMemo(() => computeDecoupling(power, heartRate), [power, heartRate])

  // kJ/min energy rate — derived from power
  const kjPerMin = useMemo(() => calculateKjPerMin(power), [power])

  return (
    <ChartSyncProvider dataLength={totalPoints}>
      <div className="min-h-screen bg-[var(--bg)] py-5">
        <div className="mx-auto max-w-[1140px] px-6">

          {/* ── 1. Header ── */}
          <SessionHeader meta={meta} />

          {/* ── 2. Three-tier metrics ── */}
          <MetricsTiers
            meta={meta} durationStr={durationStr} np={np} distanceKm={distanceKm} elevGain={elevGain}
            energyKJ={energyKJ} decoupling={decoupling}
          />

          {/* ── 3. Chart Toggles ── */}
          <ChartToggles
            visibleCharts={visibleCharts}
            onToggle={toggleChart}
            zoneMode={zoneMode}
            setZoneMode={setZoneMode}
            showPeaks={showPeaks}
            setShowPeaks={setShowPeaks}
            onFullscreen={() => setIsFullscreen(true)}
          />

          {/* ── 3b. Peak Powers Strip ── */}
          {showPeaks && (
            <PeakPowersStrip
              peaks={peaks}
              activePeak={activePeak}
              onActivePeakChange={setActivePeak}
              totalPoints={totalPoints}
            />
          )}

          {/* ── 4–7. Chart Stack + Table + Scrubber ── */}
          <SyncedCharts
            power={power}
            heartRate={heartRate}
            cadence={cadence}
            speed={speed}
            altitude={altitude}
            kjPerMin={kjPerMin}
            ftp={meta.ftp}
            maxHR={meta.maxHR}
            meta={meta}
            zoneMode={zoneMode}
            visibleCharts={visibleCharts}
            activePeak={activePeak}
            onClearPeak={() => setActivePeak(null)}
          />

          {/* ━━━━━━━ BELOW FOLD ━━━━━━━ */}
          <div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 300px' }}>
            {/* Tab Bar (shell) */}
            <TabBar />
          </div>

        </div>
      </div>
      {/* ━━━ Fullscreen overlay ━━━ */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            key="fullscreen"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] bg-(--bg)"
          >
            <FullscreenOverlay
              meta={meta}
              power={power} heartRate={heartRate} cadence={cadence} speed={speed} altitude={altitude}
              kjPerMin={kjPerMin}
              ftp={meta.ftp} maxHR={meta.maxHR}
              zoneMode={zoneMode} setZoneMode={setZoneMode}
              visibleCharts={visibleCharts} onToggle={toggleChart}
              showPeaks={showPeaks} setShowPeaks={setShowPeaks}
              activePeak={activePeak} onActivePeakChange={setActivePeak}
              onClose={() => setIsFullscreen(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </ChartSyncProvider>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Fullscreen Overlay
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CHART_WEIGHTS: Record<ChartKey, number> = {
  power: 3.5, hr: 2, speed: 1.5, cadence: 1.5, elevation: 1, kjmin: 1,
}

function FullscreenOverlay({
  meta, power, heartRate, cadence, speed, altitude, kjPerMin,
  ftp, maxHR, zoneMode, setZoneMode, visibleCharts, onToggle, showPeaks, setShowPeaks, activePeak, onActivePeakChange, onClose,
}: {
  meta: FitData['meta']
  power: number[]; heartRate: number[]; cadence: number[]; speed: number[]; altitude: number[]
  kjPerMin: number[]
  ftp: number; maxHR: number
  zoneMode: ZoneMode; setZoneMode: (m: ZoneMode) => void
  visibleCharts: Set<ChartKey>; onToggle: (k: ChartKey) => void
  showPeaks: boolean; setShowPeaks: (v: boolean) => void
  activePeak?: PeakPowerResult | null; onActivePeakChange: (p: PeakPowerResult | null) => void
  onClose: () => void
}) {
  const [winH, setWinH] = useState(typeof window !== 'undefined' ? window.innerHeight : 900)

  useEffect(() => {
    const onResize = () => setWinH(window.innerHeight)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Calculate chart heights proportionally
  const topBar = 40
  const dataBar = 32
  const scrubberH = 24
  const available = winH - topBar - dataBar - scrubberH
  const ordered = ALL_CHARTS.filter((k) => visibleCharts.has(k))
  const totalWeight = ordered.reduce((s, k) => s + CHART_WEIGHTS[k], 0)

  const heights = useMemo(() => {
    const h: Partial<Record<ChartKey, number>> = {}
    for (const k of ordered) h[k] = Math.round((CHART_WEIGHTS[k] / totalWeight) * available)
    return h
  }, [ordered, totalWeight, available])

  return (
    <div className="flex h-full flex-col bg-[var(--bg)]">
      {/* Top bar */}
      <div className="flex h-10 shrink-0 items-center gap-2 border-b-[0.5px] border-b-[var(--n400)] px-4">
        <span className={cn("text-sm text-[var(--n1050)]")}>{meta.name}</span>

        {/* Chart visibility toggles */}
        <div className="ml-3 flex items-center gap-1">
          {ALL_CHARTS.map((key) => (
            <button
              key={key}
              onClick={() => onToggle(key)}
              className={cn(
                "rounded-[4px] border border-[var(--n400)] px-2 py-0.5 text-[10px]", WEIGHT.medium, TRANSITION.colors,
                visibleCharts.has(key)
                  ? cn(ACTIVE_SAND, "text-[var(--n1150)]")
                  : cn("text-[var(--n600)]", HOVER_SAND)
              )}
            >
              {CHART_LABELS[key]}
            </button>
          ))}
        </div>

        <div className="flex-1" />

        {/* Peaks toggle */}
        <span className={cn("text-[10px] text-[var(--n600)]", WEIGHT.strong)}>Peaks</span>
        <div className="flex -space-x-px">
          {(['off', 'on'] as const).map((mode, i) => (
            <button
              key={mode}
              onClick={() => setShowPeaks(mode === 'on')}
              className={cn(
                "border border-[var(--n400)] px-2.5 py-0.5 text-[10px]", WEIGHT.medium, TRANSITION.colors,
                i === 0 && 'rounded-l-[5px]', i === 1 && 'rounded-r-[5px]',
                (mode === 'on') === showPeaks
                  ? cn(ACTIVE_SAND, "text-[var(--n1150)]")
                  : cn("text-[var(--n600)]", HOVER_SAND)
              )}
            >
              {mode === 'off' ? 'Off' : 'On'}
            </button>
          ))}
        </div>

        {/* Zone toggle */}
        <span className={cn("ml-1 text-[10px] text-[var(--n600)]", WEIGHT.strong)}>Zones</span>
        <div className="flex -space-x-px">
          {ZONE_MODES.map((mode, i) => (
            <button
              key={mode}
              onClick={() => setZoneMode(mode)}
              className={cn(
                "border border-[var(--n400)] px-2.5 py-0.5 text-[10px]", WEIGHT.medium, TRANSITION.colors,
                i === 0 && 'rounded-l-[5px]', i === ZONE_MODES.length - 1 && 'rounded-r-[5px]',
                zoneMode === mode ? cn(ACTIVE_SAND, "text-[var(--n1150)]") : cn("text-[var(--n600)]", HOVER_SAND)
              )}
            >
              {mode === 'off' ? 'Off' : mode === 'power' ? 'Power' : 'HR'}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className={cn("ml-2 rounded p-1 text-[var(--n600)]", TRANSITION.colors, HOVER_SAND, "hover:text-[var(--n1050)]")}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <path d="M4 4l8 8M12 4l-8 8" />
          </svg>
        </button>
      </div>

      {/* Peak powers strip */}
      {showPeaks && (
        <div className="shrink-0 px-4 pt-1">
          <PeakPowersStrip
            peaks={computeAllPeaks(power)}
            activePeak={activePeak ?? null}
            onActivePeakChange={onActivePeakChange}
            totalPoints={power.length}
          />
        </div>
      )}

      {/* Charts + data sidebar */}
      <div className="flex flex-1 overflow-hidden">
        {/* Charts fill main area */}
        <div className="flex-1 overflow-hidden px-2">
          <SyncedCharts
            power={power} heartRate={heartRate} cadence={cadence} speed={speed} altitude={altitude}
            kjPerMin={kjPerMin}
            ftp={ftp} maxHR={maxHR} meta={meta}
            zoneMode={zoneMode} visibleCharts={visibleCharts}
            heightOverrides={heights}
            decimationFactor={0.2}
            hideExtras
            activePeak={activePeak}
            onClearPeak={() => onActivePeakChange(null)}
          />
        </div>

        {/* Data sidebar — live hover values */}
        <FullscreenDataSidebar power={power} heartRate={heartRate} cadence={cadence} speed={speed} altitude={altitude} kjPerMin={kjPerMin} meta={meta} visibleCharts={visibleCharts} />
      </div>
    </div>
  )
}

function FullscreenDataSidebar({
  power, heartRate, cadence, speed, altitude, kjPerMin, meta, visibleCharts,
}: {
  power: number[]; heartRate: number[]; cadence: number[]; speed: number[]; altitude: number[]
  kjPerMin: number[]; meta: FitData['meta']; visibleCharts: Set<ChartKey>
}) {
  const sync = useChartSync()
  const { start, end } = sync?.zoom ?? { start: 0, end: power.length - 1 }
  const isZoomed = start > 0 || end < power.length - 1

  const rangeAvg = useMemo(() => {
    const len = end - start + 1
    if (len <= 0) return { pw: 0, hr: 0, cad: 0, spd: 0, elv: 0, kj: 0 }
    let pw = 0, hr = 0, cd = 0, sp = 0, el = 0, kj = 0
    for (let i = start; i <= end; i++) { pw += power[i]; hr += heartRate[i]; cd += cadence[i]; sp += speed[i]; el += altitude[i]; kj += kjPerMin[i] }
    return { pw: Math.round(pw / len), hr: Math.round(hr / len), cad: Math.round(cd / len), spd: +(sp / len).toFixed(1), elv: Math.round(el / len), kj: +(kj / len).toFixed(1) }
  }, [power, heartRate, cadence, speed, altitude, kjPerMin, start, end])

  const timeRef = useRef<HTMLSpanElement>(null)
  const pwRef = useRef<HTMLSpanElement>(null)
  const hrRef = useRef<HTMLSpanElement>(null)
  const kjRef = useRef<HTMLSpanElement>(null)
  const cadRef = useRef<HTMLSpanElement>(null)
  const spdRef = useRef<HTMLSpanElement>(null)
  const elvRef = useRef<HTMLSpanElement>(null)
  const modeRef = useRef<HTMLSpanElement>(null)

  const showAvg = useCallback(() => {
    const a = rangeAvg
    if (timeRef.current) timeRef.current.textContent = isZoomed
      ? formatTime(end - start)
      : formatDuration(meta.totalTime)
    if (pwRef.current) pwRef.current.textContent = `${a.pw}`
    if (hrRef.current) hrRef.current.textContent = `${a.hr}`
    if (kjRef.current) kjRef.current.textContent = `${a.kj}`
    if (cadRef.current) cadRef.current.textContent = `${a.cad}`
    if (spdRef.current) spdRef.current.textContent = `${a.spd}`
    if (elvRef.current) elvRef.current.textContent = `${a.elv}`
    if (modeRef.current) modeRef.current.textContent = isZoomed ? 'selection' : 'session avg'
  }, [rangeAvg, isZoomed, start, end, meta.totalTime])

  useEffect(() => { showAvg() }, [showAvg])

  useEffect(() => {
    if (!sync) return
    return sync.subscribeHover((visIdx) => {
      if (visIdx === null) { showAvg(); return }
      const idx = sync.zoom.start + visIdx
      if (idx < 0 || idx >= power.length) return
      const pw = power[idx]
      if (timeRef.current) timeRef.current.textContent = formatTime(idx)
      if (pwRef.current) pwRef.current.textContent = `${pw}`
      if (hrRef.current) hrRef.current.textContent = `${heartRate[idx]}`
      if (kjRef.current) kjRef.current.textContent = kjPerMin[idx].toFixed(1)
      if (cadRef.current) cadRef.current.textContent = `${cadence[idx]}`
      if (spdRef.current) spdRef.current.textContent = speed[idx].toFixed(1)
      if (elvRef.current) elvRef.current.textContent = `${Math.round(altitude[idx])}`
      if (modeRef.current) modeRef.current.textContent = ''
    })
  }, [sync, power, heartRate, cadence, speed, altitude, kjPerMin, meta, showAvg])

  const row = 'flex items-baseline justify-between border-b-[0.5px] border-b-[var(--n400)]/40 py-1.5'

  return (
    <div className="flex w-44 shrink-0 flex-col border-l-[0.5px] border-l-[var(--n400)] bg-[var(--n50)] px-3 py-2 tabular-nums">
      {/* Time / mode */}
      <div className="mb-2 border-b-[0.5px] border-b-[var(--n400)] pb-2">
        <span ref={timeRef} className={cn("block text-[20px]", WEIGHT.medium, "text-[var(--n1050)]")}>0:00</span>
        <span ref={modeRef} className={cn("text-[10px]", WEIGHT.book, "text-[var(--n600)]")}>Session avg</span>
      </div>

      {/* Metrics — only show those with active charts */}
      {visibleCharts.has('power') && (
        <div className={row}>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#22c55e]" />
            <span className="text-[11px] text-[var(--n600)]">Power</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span ref={pwRef} className={cn("text-[16px]", WEIGHT.medium, "text-[var(--n1050)]")}>0</span>
            <span className="text-[10px] text-[var(--n600)]">W</span>
          </div>
        </div>
      )}
      {visibleCharts.has('hr') && (
        <div className={row}>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#ef4444]" />
            <span className="text-[11px] text-[var(--n600)]">HR</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span ref={hrRef} className={cn("text-[16px]", WEIGHT.medium, "text-[var(--n1050)]")}>0</span>
            <span className="text-[10px] text-[var(--n600)]">bpm</span>
          </div>
        </div>
      )}
      {visibleCharts.has('kjmin') && (
        <div className={row}>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#f59e0b]" />
            <span className="text-[11px] text-[var(--n600)]">kJ/min</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span ref={kjRef} className={cn("text-[16px]", WEIGHT.medium, "text-[var(--n1050)]")}>0</span>
            <span className="text-[10px] text-[var(--n600)]">kJ/min</span>
          </div>
        </div>
      )}
      {visibleCharts.has('cadence') && (
        <div className={row}>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#8b5cf6]" />
            <span className="text-[11px] text-[var(--n600)]">Cad</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span ref={cadRef} className={cn("text-[16px]", WEIGHT.medium, "text-[var(--n1050)]")}>0</span>
            <span className="text-[10px] text-[var(--n600)]">rpm</span>
          </div>
        </div>
      )}
      {visibleCharts.has('speed') && (
        <div className={row}>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[#3b82f6]" />
            <span className="text-[11px] text-[var(--n600)]">Speed</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span ref={spdRef} className={cn("text-[16px]", WEIGHT.medium, "text-[var(--n1050)]")}>0</span>
            <span className="text-[10px] text-[var(--n600)]">km/h</span>
          </div>
        </div>
      )}
      {visibleCharts.has('elevation') && (
        <div className={row}>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-[var(--n600)]" />
            <span className="text-[11px] text-[var(--n600)]">Elev</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span ref={elvRef} className={cn("text-[16px]", WEIGHT.medium, "text-[var(--n1050)]")}>0</span>
            <span className="text-[10px] text-[var(--n600)]">m</span>
          </div>
        </div>
      )}

      <div className="mt-auto pt-2 text-center text-[9px] text-[var(--n600)]">F / Esc to exit</div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. Session Header
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SessionHeader({ meta }: { meta: FitData['meta'] }) {
  return (
    <div className="flex items-start justify-between pb-2">
      <div>
        <h1 className={cn("text-[26px] tracking-tight text-[var(--n1150)]", WEIGHT.strong)}>
          {meta.name}
        </h1>
        <p className={cn("mt-0.5 text-xs", QUIET_STYLE)}>
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
    <div className={cn("flex items-center gap-1.5", RADIUS.md, BORDER.default, "px-2.5 py-1")}>
      <span className="text-[11px] text-[var(--n600)]">{label}</span>
      <span className={cn("text-[13px] tabular-nums text-[var(--n1050)]", WEIGHT.medium)}>{value}</span>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. Three-Tier Metrics
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function MetricsTiers({
  meta, durationStr, np, distanceKm, elevGain, energyKJ, decoupling,
}: {
  meta: FitData['meta']; durationStr: string; np: number; distanceKm: number; elevGain: number
  energyKJ: number; decoupling: number | null
}) {
  const [contextOpen, setContextOpen] = useState(false)
  const vi = np > 0 && meta.avgPower > 0 ? (np / meta.avgPower).toFixed(2) : '—'
  const ef = np > 0 && meta.avgHR > 0 ? (np / meta.avgHR).toFixed(2) : '—'

  return (
    <div>
      {/* Tier 1 — Key Stats */}
      <div className="flex gap-6 border-y-[0.5px] border-y-[var(--n400)] py-2">
        <KS label="Duration" value={durationStr} />
        <KS label="Avg Power" value={`${meta.avgPower}`} unit="W" sub={`Max ${meta.maxPower}W`} />
        <KS label="Balanced Power" value={`${np}`} unit="W" sub={`VI ${vi}`} />
        <KS label="Avg HR" value={`${meta.avgHR}`} unit="bpm" sub={`Max ${meta.maxHR}`} />
        <KS label="Distance" value={`${distanceKm}`} unit="km" />
        <KS label="Elevation" value={`${elevGain}`} unit="m" />
        <KS label="Energy" value={`${energyKJ}`} unit="kJ" />
        <KS label="R-Score" value="—" unit="rS" sub="PL —" />
      </div>

      {/* Tier 2 — RAMTT Metrics */}
      <div className="flex gap-6 border-b-[0.5px] border-b-[var(--n400)] bg-[var(--n50)] py-2">
        <KS label="Decoupling" value={decoupling !== null ? `${decoupling}` : '—'} unit="%" sub={`Eff ${ef}`} />
        <KS label="Durability" value="—" unit="% decay" sub="—" />
      </div>

      {/* Tier 3 — Session Context (collapsible) */}
      <div className="border-b-[0.5px] border-b-[var(--n400)]">
        <button
          onClick={() => setContextOpen(!contextOpen)}
          className={cn("flex w-full items-center gap-1.5 py-1.5 text-[11px] text-[var(--n600)]", WEIGHT.strong, TRANSITION.colors, "hover:text-[var(--n800)]")}
        >
          <span className={cn("text-[9px] transition-transform duration-150", contextOpen && 'rotate-90')}>
            ▶
          </span>
          Session context
        </button>
        {contextOpen && (
          <div className="flex gap-6 bg-[var(--n50)] pb-2">
            <KS label="Capacity" value="—" sub="—" />
            <KS label="Form" value="—" sub="—" />
            <KS label="Surge" value="—" sub="—" />
            <KS label="ACWR" value="—" sub="—" />
            <KS label="Phase" value="—" sub="—" />
            <KS label="Regulators" value="—" sub="—" />
            <KS label="Glycogen" value="—" sub="—" />
            <KS label="Injury Risk" value="—" sub="—" />
          </div>
        )}
      </div>
    </div>
  )
}

/** Compact stat cell with optional sub-value, badge, and progress bar. */
function KS({ label, value, unit, sub, badge, progress }: {
  label: string; value?: string; unit?: string; sub?: string
  badge?: { label: string; color: string }; progress?: number
}) {
  return (
    <div>
      <div className={cn("text-[10px] text-[var(--n600)]", WEIGHT.strong)}>{label}</div>
      {badge && !value ? (
        <span
          className={cn("mt-0.5 inline-block rounded px-2 py-0.5 text-[11px]", WEIGHT.medium)}
          style={{ color: badge.color, backgroundColor: `${badge.color}1F` }}
        >
          {badge.label}
        </span>
      ) : (
        <div className={cn("text-[17px] tabular-nums slashed-zero text-[var(--n1050)]", WEIGHT.medium)}>
          {value ?? '—'}
          {unit && <span className="ml-0.5 text-xs text-[var(--n600)]">{unit}</span>}
        </div>
      )}
      {sub && <div className="text-[11px] text-[var(--n600)]">{sub}</div>}
      {progress !== undefined && (
        <div className="mt-0.5 h-1 w-12 overflow-hidden rounded-full bg-[var(--n400)]">
          <div className="h-full rounded-full bg-[#22c55e]" style={{ width: `${Math.min(100, progress)}%` }} />
        </div>
      )}
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. Chart Toggles
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function ChartToggles({
  visibleCharts, onToggle, zoneMode, setZoneMode, showPeaks, setShowPeaks, onFullscreen,
}: {
  visibleCharts: Set<ChartKey>
  onToggle: (key: ChartKey) => void
  zoneMode: ZoneMode
  setZoneMode: (mode: ZoneMode) => void
  showPeaks: boolean
  setShowPeaks: (v: boolean) => void
  onFullscreen?: () => void
}) {
  return (
    <div className="flex items-center gap-2 py-2">
      {/* Chart visibility toggles */}
      {ALL_CHARTS.map((key) => (
        <button
          key={key}
          onClick={() => onToggle(key)}
          className={cn(
            RADIUS.md, "border border-[var(--n400)] px-3.5 py-1 text-xs", WEIGHT.medium, TRANSITION.colors,
            visibleCharts.has(key)
              ? cn(ACTIVE_SAND, "text-[var(--n1150)]")
              : cn("text-[var(--n600)]", HOVER_SAND)
          )}
        >
          {CHART_LABELS[key]}
        </button>
      ))}

      {/* Fullscreen toggle */}
      {onFullscreen && (
        <button
          onClick={onFullscreen}
          className={cn(RADIUS.md, "border border-[var(--n400)] p-1.5 text-[var(--n600)]", TRANSITION.colors, HOVER_SAND)}
          title="Fullscreen (F)"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M1 5V1h4M9 1h4v4M13 9v4H9M5 13H1V9" />
          </svg>
        </button>
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Peaks toggle */}
      <span className={cn("text-[10px] text-[var(--n600)]", WEIGHT.strong)}>Peaks</span>
      <div className="flex -space-x-px">
        {(['off', 'on'] as const).map((mode, i) => (
          <button
            key={mode}
            onClick={() => setShowPeaks(mode === 'on')}
            className={cn(
              "border border-[var(--n400)] px-3 py-1 text-xs", WEIGHT.medium, TRANSITION.colors,
              i === 0 && 'rounded-l-[5px]',
              i === 1 && 'rounded-r-[5px]',
              (mode === 'on') === showPeaks
                ? cn(ACTIVE_SAND, "text-[var(--n1150)]")
                : cn("text-[var(--n600)]", HOVER_SAND)
            )}
          >
            {mode === 'off' ? 'Off' : 'On'}
          </button>
        ))}
      </div>

      {/* Zone toggle */}
      <span className={cn("ml-2 text-[10px] text-[var(--n600)]", WEIGHT.strong)}>Zones</span>
      <div className="flex -space-x-px">
        {ZONE_MODES.map((mode, i) => (
          <button
            key={mode}
            onClick={() => setZoneMode(mode)}
            className={cn(
              "border border-[var(--n400)] px-3 py-1 text-xs", WEIGHT.medium, TRANSITION.colors,
              i === 0 && 'rounded-l-[5px]',
              i === ZONE_MODES.length - 1 && 'rounded-r-[5px]',
              zoneMode === mode
                ? cn(ACTIVE_SAND, "text-[var(--n1150)]")
                : cn("text-[var(--n600)]", HOVER_SAND)
            )}
          >
            {mode === 'off' ? 'Off' : mode === 'power' ? 'Power' : 'HR'}
          </button>
        ))}
      </div>
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3b. Peak Powers Strip
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function PeakPowersStrip({
  peaks, activePeak, onActivePeakChange, totalPoints,
}: {
  peaks: PeakPowerResult[]
  activePeak: PeakPowerResult | null
  onActivePeakChange: (peak: PeakPowerResult | null) => void
  totalPoints: number
}) {
  const sync = useChartSync()

  const handleClick = useCallback((peak: PeakPowerResult) => {
    if (!sync) return

    // Toggle off if clicking the same peak
    if (activePeak && activePeak.label === peak.label) {
      onActivePeakChange(null)
      sync.setZoom({ start: 0, end: totalPoints - 1 })
      return
    }

    // Zoom to peak range — sqrt curve: generous for short, tight for long
    const pad = Math.max(5, Math.round(Math.sqrt(peak.windowSeconds) * 2))
    const zoomStart = Math.max(0, peak.startIdx - pad)
    const zoomEnd = Math.min(totalPoints - 1, peak.endIdx + pad)
    sync.setZoom({ start: zoomStart, end: zoomEnd })
    onActivePeakChange(peak)
  }, [sync, activePeak, onActivePeakChange, totalPoints])

  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-1">
      <span className={cn("text-[11px] text-(--n600)", WEIGHT.strong)}>Peak powers</span>
      {peaks.map((peak, i) => (
        <button
          key={peak.label}
          onClick={() => handleClick(peak)}
          className={cn(
            "flex items-baseline gap-1 rounded-[3px] px-1 py-0.5",
            TRANSITION.colors,
            activePeak?.label === peak.label
              ? cn(ACTIVE_SAND, "text-(--n1150)")
              : "hover:bg-(--n200)"
          )}
        >
          <span className={cn("text-[11px] text-(--n600)", WEIGHT.book)}>{peak.label}</span>
          <span className={cn("text-[11px] tabular-nums text-(--n1150)", WEIGHT.strong)}>{peak.avgPower}W</span>
          {i < peaks.length - 1 && (
            <span className="ml-1 text-[11px] text-(--n600)">·</span>
          )}
        </button>
      ))}
    </div>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4–7. Synced Charts + HoverDataTable + Scrubber
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SyncedCharts({
  power, heartRate, cadence, speed, altitude, kjPerMin, ftp, maxHR, meta, zoneMode, visibleCharts, heightOverrides, hideExtras, decimationFactor, activePeak, onClearPeak,
}: {
  power: number[]; heartRate: number[]; cadence: number[]; speed: number[]; altitude: number[]
  kjPerMin: number[]
  ftp: number; maxHR: number; meta: FitData['meta']
  zoneMode: ZoneMode; visibleCharts: Set<ChartKey>
  heightOverrides?: Partial<Record<ChartKey, number>>
  hideExtras?: boolean
  decimationFactor?: number
  activePeak?: PeakPowerResult | null
  onClearPeak?: () => void
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
    return rollingAverage(raw, Math.max(smoothWindow, 5))
  }, [altitude, start, end, smoothWindow])

  // Tight y-domain for elevation — NO zero baseline, just data extent with small padding
  const elevationYDomain = useMemo(() => {
    if (visAltitude.length === 0) return [0, 100] as const
    let min = Infinity, max = -Infinity
    for (let i = 0; i < visAltitude.length; i++) {
      if (visAltitude[i] < min) min = visAltitude[i]
      if (visAltitude[i] > max) max = visAltitude[i]
    }
    const range = max - min
    const pad = Math.max(range * 0.1, 2) // at least 2m padding
    return [min - pad, max + pad] as const
  }, [visAltitude])

  const visKjMin = useMemo(() => kjPerMin.slice(start, end + 1), [kjPerMin, start, end])


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

  const h = (key: ChartKey, fallback: number) => heightOverrides?.[key] ?? fallback
  const orderedVisible = ALL_CHARTS.filter((k) => visibleCharts.has(k))
  const lastChartKey = orderedVisible[orderedVisible.length - 1]

  return (
    <div
      className={cn("relative select-none outline-none focus:outline-none focus:ring-0 bg-[var(--n50)] overflow-hidden", BORDER.default, RADIUS.lg)}
      tabIndex={0}
      style={{ contain: 'paint' }}
      onDoubleClick={onClearPeak}
    >

      {/* Brush overlay wrapper — scoped to chart area only */}
      <div className="relative">
      <BrushOverlay />

      {/* Power — 110px */}
      <AnimatePresence initial={false}>
      {visibleCharts.has('power') && (
        <motion.div key="power" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden">
        <ChartRoot
          data={visPower}
          height={h('power', 110)}
          decimationFactor={decimationFactor}
          padding={{ ...chartPad, bottom: 4 }}
          yPadding={0.10}
          className="bg-(--n50)"
        >
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
          <text x={4} y={12} className="fill-[var(--n600)] text-[9px] font-[550]" style={{ fontFamily: "var(--font-sans)" }}>Power</text>
        </ChartRoot>
        </motion.div>
      )}
      </AnimatePresence>

      {/* HR — 75px */}
      <AnimatePresence initial={false}>
      {visibleCharts.has('hr') && (
        <motion.div key="hr" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden border-t-[0.5px] border-t-(--n400)">
        <ChartRoot
          data={visHR}
          height={h('hr', 75)}
          decimationFactor={decimationFactor}
          padding={{ ...chartPad, bottom: 4 }}
          className="bg-(--n50)"
        >
          <ChartAxisY tickCount={3} />
          <ChartArea gradientColor="#ef4444" opacityFrom={0.08} opacityTo={0.005} />
          {zoneMode === 'hr' ? (
            <ChartZoneLine threshold={maxHR} zones={HR_ZONES} />
          ) : (
            <ChartLine className="fill-none stroke-red-500 stroke-[1.5]" />
          )}
          <ChartCrosshair lineColor="#52525b" lineWidth={0.75} dotColor="#ef4444" />
          <ChartZoomHandler />
          <text x={4} y={12} className="fill-[var(--n600)] text-[9px] font-[550]" style={{ fontFamily: "var(--font-sans)" }}>HR</text>
        </ChartRoot>
        </motion.div>
      )}
      </AnimatePresence>

      {/* kJ/min — 55px */}
      <AnimatePresence initial={false}>
      {visibleCharts.has('kjmin') && (
        <motion.div key="kjmin" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden border-t-[0.5px] border-t-(--n400)">
        <ChartRoot
          data={visKjMin}
          height={h('kjmin', 55)}
          decimationFactor={decimationFactor}
          padding={lastChartKey === 'kjmin' ? chartPad : { ...chartPad, bottom: 4 }}
          className="bg-(--n50)"
        >
          <ChartAxisY tickCount={2} format={(v) => `${v.toFixed(0)}`} />
          {lastChartKey === 'kjmin' && <ChartAxisX format={formatX} tickValues={timeTicks} />}
          <ChartArea gradientColor="#f59e0b" opacityFrom={0.10} opacityTo={0.005} />
          <ChartLine className="fill-none stroke-amber-500 stroke-[1.5]" />
          <ChartCrosshair lineColor="#52525b" lineWidth={0.75} dotColor="#f59e0b" />
          <ChartZoomHandler />
          <text x={4} y={12} className="fill-[var(--n600)] text-[9px] font-[550]" style={{ fontFamily: "var(--font-sans)" }}>kJ/min</text>
        </ChartRoot>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Cadence — 55px */}
      <AnimatePresence initial={false}>
      {visibleCharts.has('cadence') && (
        <motion.div key="cadence" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden border-t-[0.5px] border-t-(--n400)">
        <ChartRoot
          data={visCadence}
          height={h('cadence', 55)}
          decimationFactor={decimationFactor}
          padding={{ ...chartPad, bottom: 4 }}
          className="bg-(--n50)"
        >
          <ChartAxisY tickCount={2} format={(v) => `${v}`} />
          <ChartArea gradientColor="#a855f7" opacityFrom={0.08} opacityTo={0.005} />
          <ChartLine className="fill-none stroke-purple-500 stroke-[1.5]" />
          <ChartCrosshair lineColor="#52525b" lineWidth={0.75} dotColor="#a855f7" />
          <ChartZoomHandler />
          <text x={4} y={12} className="fill-[var(--n600)] text-[9px] font-[550]" style={{ fontFamily: "var(--font-sans)" }}>Cadence</text>
        </ChartRoot>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Speed — 55px */}
      <AnimatePresence initial={false}>
      {visibleCharts.has('speed') && (
        <motion.div key="speed" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden border-t-[0.5px] border-t-(--n400)">
        <ChartRoot
          data={visSpeed}
          height={h('speed', 55)}
          decimationFactor={decimationFactor}
          padding={{ ...chartPad, bottom: 4 }}
          className="bg-(--n50)"
        >
          <ChartAxisY tickCount={2} format={(v) => `${v.toFixed(0)}`} />
          <ChartArea gradientColor="#3b82f6" opacityFrom={0.08} opacityTo={0.005} />
          <ChartLine className="fill-none stroke-blue-500 stroke-[1.5]" />
          <ChartCrosshair lineColor="#52525b" lineWidth={0.75} dotColor="#3b82f6" />
          <ChartZoomHandler />
          <text x={4} y={12} className="fill-[var(--n600)] text-[9px] font-[550]" style={{ fontFamily: "var(--font-sans)" }}>Speed</text>
        </ChartRoot>
        </motion.div>
      )}
      </AnimatePresence>

      {/* Elevation — 55px */}
      <AnimatePresence initial={false}>
      {visibleCharts.has('elevation') && (
        <motion.div key="elevation" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }} className="overflow-hidden border-t-[0.5px] border-t-(--n400)">
        <ChartRoot
          data={visAltitude}
          height={h('elevation', 55)}
          decimationFactor={decimationFactor}
          padding={lastChartKey === 'elevation' ? chartPad : { ...chartPad, bottom: 4 }}
          yDomain={elevationYDomain}
          className="bg-(--n50)"
        >
          <ChartAxisY tickCount={3} format={(v) => `${v.toFixed(0)}m`} />
          {lastChartKey === 'elevation' && <ChartAxisX format={formatX} tickValues={timeTicks} />}
          <ChartArea gradientColor="#78716c" opacityFrom={0.15} opacityTo={0.03} />
          <ChartLine className="fill-none stroke-stone-400 stroke-[1]" />
          <ChartCrosshair lineColor="#52525b" lineWidth={0.75} dotColor="#78716c" dotRadius={2} />
          <ChartZoomHandler />
          <text x={4} y={12} className="fill-[var(--n600)] text-[9px] font-[550]" style={{ fontFamily: "var(--font-sans)" }}>Elevation</text>
        </ChartRoot>
        </motion.div>
      )}
      </AnimatePresence>
      </div>

      {/* Crosshair time label */}
      <CrosshairTimeLabel format={formatTimeLabel} />

      {/* Hover data table — hidden in fullscreen (sidebar shows data instead) */}
      {!hideExtras && (
        <HoverDataTable
          power={power} heartRate={heartRate} cadence={cadence} speed={speed} altitude={altitude} kjPerMin={kjPerMin} meta={meta}
          visibleCharts={visibleCharts}
        />
      )}

      {/* Zoom indicator — hidden in fullscreen */}
      {!hideExtras && (start > 0 || end < power.length - 1) && (
        <div className="mt-1 flex items-center justify-between">
          <span className="text-[10px] text-[var(--n600)]">
            {formatTimeForZoom(start, visibleRange)} – {formatTimeForZoom(end, visibleRange)}
          </span>
          <button
            onClick={() => sync.setZoom({ start: 0, end: power.length - 1 })}
            className={cn("rounded px-2 py-0.5 text-[9px] text-[var(--n800)]", WEIGHT.strong, TRANSITION.colors, HOVER_SAND, "hover:text-[var(--n1050)]")}
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
  power, heartRate, cadence, speed, altitude, kjPerMin, meta, visibleCharts,
}: {
  power: number[]; heartRate: number[]; cadence: number[]; speed: number[]; altitude: number[]
  kjPerMin: number[]; meta: FitData['meta']; visibleCharts: Set<ChartKey>
}) {
  const sync = useChartSync()
  const { start, end } = sync?.zoom ?? { start: 0, end: power.length - 1 }
  const isZoomed = start > 0 || end < power.length - 1

  const rangeStats = useMemo(() => {
    const len = end - start + 1
    if (len <= 0) return { power: 0, hr: 0, cad: 0, speed: 0, elev: 0, kjmin: 0, maxPower: 0, maxHR: 0, maxCad: 0, maxSpeed: 0, maxElev: 0 }
    let pw = 0, hr = 0, cd = 0, spd = 0, elv = 0, kj = 0
    let mxPw = -Infinity, mxHr = -Infinity, mxCd = -Infinity, mxSpd = -Infinity, mxElv = -Infinity
    for (let i = start; i <= end; i++) {
      pw += power[i]; hr += heartRate[i]; cd += cadence[i]; spd += speed[i]; elv += altitude[i]; kj += kjPerMin[i]
      if (power[i] > mxPw) mxPw = power[i]
      if (heartRate[i] > mxHr) mxHr = heartRate[i]
      if (cadence[i] > mxCd) mxCd = cadence[i]
      if (speed[i] > mxSpd) mxSpd = speed[i]
      if (altitude[i] > mxElv) mxElv = altitude[i]
    }
    return {
      power: Math.round(pw / len), hr: Math.round(hr / len), cad: Math.round(cd / len),
      speed: +(spd / len).toFixed(1), elev: Math.round(elv / len), kjmin: +(kj / len).toFixed(1),
      maxPower: Math.round(mxPw), maxHR: Math.round(mxHr), maxCad: Math.round(mxCd),
      maxSpeed: +mxSpd.toFixed(1), maxElev: Math.round(mxElv),
    }
  }, [power, heartRate, cadence, speed, altitude, kjPerMin, start, end])

  const rangeDur = useMemo(() => {
    const secs = end - start
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return { dur: `${m}:${s.toString().padStart(2, '0')}`, span: `${formatTime(start)} – ${formatTime(end)}` }
  }, [start, end])

  // Refs
  const timeLabelRef = useRef<HTMLSpanElement>(null)
  const timeValRef = useRef<HTMLSpanElement>(null)
  const timeSpanRef = useRef<HTMLSpanElement>(null)
  const powerLabelRef = useRef<HTMLSpanElement>(null)
  const powerValRef = useRef<HTMLSpanElement>(null)
  const powerDeltaRef = useRef<HTMLSpanElement>(null)
  const powerZoneRef = useRef<HTMLSpanElement>(null)
  const hrLabelRef = useRef<HTMLSpanElement>(null)
  const hrValRef = useRef<HTMLSpanElement>(null)
  const hrDeltaRef = useRef<HTMLSpanElement>(null)
  const hrZoneRef = useRef<HTMLSpanElement>(null)
  const cadLabelRef = useRef<HTMLSpanElement>(null)
  const cadValRef = useRef<HTMLSpanElement>(null)
  const cadDeltaRef = useRef<HTMLSpanElement>(null)
  const speedLabelRef = useRef<HTMLSpanElement>(null)
  const speedValRef = useRef<HTMLSpanElement>(null)
  const speedDeltaRef = useRef<HTMLSpanElement>(null)
  const elevLabelRef = useRef<HTMLSpanElement>(null)
  const elevValRef = useRef<HTMLSpanElement>(null)
  const elevDeltaRef = useRef<HTMLSpanElement>(null)
  const kjminLabelRef = useRef<HTMLSpanElement>(null)
  const kjminValRef = useRef<HTMLSpanElement>(null)

  const showAverages = useCallback(() => {
    const s = rangeStats
    if (timeLabelRef.current) timeLabelRef.current.textContent = isZoomed ? 'Selection' : 'Duration'
    if (timeValRef.current) timeValRef.current.textContent = isZoomed ? rangeDur.dur : formatTime(power.length)
    if (timeSpanRef.current) timeSpanRef.current.textContent = isZoomed ? rangeDur.span : ''
    const prefix = isZoomed ? 'Sel' : 'Avg'
    if (powerLabelRef.current) powerLabelRef.current.textContent = `${prefix} Power`
    if (hrLabelRef.current) hrLabelRef.current.textContent = `${prefix} Heart Rate`
    if (cadLabelRef.current) cadLabelRef.current.textContent = `${prefix} Cadence`
    if (speedLabelRef.current) speedLabelRef.current.textContent = `${prefix} Speed`
    if (elevLabelRef.current) elevLabelRef.current.textContent = `${prefix} Elevation`
    if (kjminLabelRef.current) kjminLabelRef.current.textContent = `${prefix} kJ/min`
    if (powerValRef.current) { powerValRef.current.textContent = `${s.power}`; powerValRef.current.style.color = 'var(--n1050)' }
    if (hrValRef.current) { hrValRef.current.textContent = `${s.hr}`; hrValRef.current.style.color = 'var(--n1050)' }
    if (cadValRef.current) { cadValRef.current.textContent = `${s.cad}`; cadValRef.current.style.color = 'var(--n1050)' }
    if (speedValRef.current) { speedValRef.current.textContent = `${s.speed}`; speedValRef.current.style.color = 'var(--n1050)' }
    if (elevValRef.current) { elevValRef.current.textContent = `${s.elev}`; elevValRef.current.style.color = 'var(--n1050)' }
    if (kjminValRef.current) { kjminValRef.current.textContent = `${s.kjmin}`; kjminValRef.current.style.color = 'var(--n1050)' }
    if (powerDeltaRef.current) powerDeltaRef.current.textContent = ''
    if (hrDeltaRef.current) hrDeltaRef.current.textContent = ''
    if (cadDeltaRef.current) cadDeltaRef.current.textContent = ''
    if (speedDeltaRef.current) speedDeltaRef.current.textContent = ''
    if (elevDeltaRef.current) elevDeltaRef.current.textContent = ''
    if (powerZoneRef.current) { powerZoneRef.current.textContent = ''; powerZoneRef.current.style.backgroundColor = '' }
    if (hrZoneRef.current) { hrZoneRef.current.textContent = ''; hrZoneRef.current.style.backgroundColor = '' }
  }, [meta, rangeStats, isZoomed, rangeDur, power.length])

  useEffect(() => { showAverages() }, [showAverages])

  useEffect(() => {
    if (!sync) return
    return sync.subscribeHover((visIdx) => {
      if (visIdx === null) { showAverages(); return }
      const fullIdx = sync.zoom.start + visIdx
      if (fullIdx < 0 || fullIdx >= power.length) return

      if (timeLabelRef.current) timeLabelRef.current.textContent = 'Time'
      if (timeValRef.current) timeValRef.current.textContent = formatTime(fullIdx)
      if (timeSpanRef.current) timeSpanRef.current.textContent = ''
      if (powerLabelRef.current) powerLabelRef.current.textContent = 'Power'
      if (hrLabelRef.current) hrLabelRef.current.textContent = 'Heart Rate'
      if (cadLabelRef.current) cadLabelRef.current.textContent = 'Cadence'
      if (speedLabelRef.current) speedLabelRef.current.textContent = 'Speed'
      if (elevLabelRef.current) elevLabelRef.current.textContent = 'Elevation'
      if (kjminLabelRef.current) kjminLabelRef.current.textContent = 'kJ/min'

      const pw = power[fullIdx], hr = heartRate[fullIdx], cad = cadence[fullIdx], spd = speed[fullIdx], elev = altitude[fullIdx]
      if (powerValRef.current) { powerValRef.current.textContent = `${pw}`; powerValRef.current.style.color = 'var(--n1150)' }
      if (hrValRef.current) { hrValRef.current.textContent = `${hr}`; hrValRef.current.style.color = 'var(--n1150)' }
      if (cadValRef.current) { cadValRef.current.textContent = `${cad}`; cadValRef.current.style.color = 'var(--n1150)' }
      if (speedValRef.current) { speedValRef.current.textContent = spd.toFixed(1); speedValRef.current.style.color = 'var(--n1150)' }
      if (elevValRef.current) { elevValRef.current.textContent = `${Math.round(elev)}`; elevValRef.current.style.color = 'var(--n1150)' }
      if (kjminValRef.current) { kjminValRef.current.textContent = kjPerMin[fullIdx].toFixed(1); kjminValRef.current.style.color = 'var(--n1150)' }
      if (powerDeltaRef.current) powerDeltaRef.current.textContent = ''
      if (hrDeltaRef.current) hrDeltaRef.current.textContent = ''
      if (cadDeltaRef.current) cadDeltaRef.current.textContent = ''
      if (speedDeltaRef.current) speedDeltaRef.current.textContent = ''
      if (elevDeltaRef.current) elevDeltaRef.current.textContent = ''
      if (powerZoneRef.current) {
        const z = getPowerZone(pw, meta.ftp)
        powerZoneRef.current.textContent = z.label; powerZoneRef.current.style.color = z.color; powerZoneRef.current.style.backgroundColor = `${z.color}1F`
      }
      if (hrZoneRef.current) {
        const z = getHRZone(hr, meta.maxHR)
        hrZoneRef.current.textContent = z.label; hrZoneRef.current.style.color = z.color; hrZoneRef.current.style.backgroundColor = `${z.color}1F`
      }
    })
  }, [sync, power, heartRate, cadence, speed, altitude, kjPerMin, meta, showAverages])

  const rowCls = 'flex items-center gap-3 border-b-[0.5px] border-b-[var(--n400)]/50 py-2'
  const dotCls = 'h-2 w-2 shrink-0 rounded-full'
  const labelCls = 'w-24 text-[13px] text-[var(--n800)]'
  const valCls = cn('text-[15px] tabular-nums slashed-zero text-[var(--n1050)]', WEIGHT.medium)
  const unitCls = 'text-xs text-[var(--n600)]'
  const deltaCls = 'text-[11px] tabular-nums text-[var(--n600)]'
  const zoneCls = cn('ml-auto rounded px-2.5 py-0.5 text-[11px] tabular-nums', WEIGHT.medium)

  const vc = visibleCharts

  return (
    <div className="mt-2 mb-1" style={{ paddingLeft: 48, paddingRight: 64 }}>
      {/* Duration — always visible */}
      <div className={rowCls}>
        <span className={`${dotCls} bg-[var(--n1050)]`} />
        <span ref={timeLabelRef} className={labelCls}>Duration</span>
        <span ref={timeValRef} className={valCls} />
        <span ref={timeSpanRef} className="text-[11px] tabular-nums text-[var(--n600)]" />
      </div>
      {vc.has('power') && (
        <div className={rowCls}>
          <span className={`${dotCls} bg-[#22c55e]`} />
          <span ref={powerLabelRef} className={labelCls}>Avg Power</span>
          <span className="flex items-baseline gap-1">
            <span ref={powerValRef} className={valCls}>0</span>
            <span className={unitCls}>W</span>
          </span>
          <span ref={powerDeltaRef} className={deltaCls} />
          <span ref={powerZoneRef} className={zoneCls} />
        </div>
      )}
      {vc.has('hr') && (
        <div className={rowCls}>
          <span className={`${dotCls} bg-[#ef4444]`} />
          <span ref={hrLabelRef} className={labelCls}>Avg Heart Rate</span>
          <span className="flex items-baseline gap-1">
            <span ref={hrValRef} className={valCls}>0</span>
            <span className={unitCls}>bpm</span>
          </span>
          <span ref={hrDeltaRef} className={deltaCls} />
          <span ref={hrZoneRef} className={zoneCls} />
        </div>
      )}
      {vc.has('cadence') && (
        <div className={rowCls}>
          <span className={`${dotCls} bg-[#8b5cf6]`} />
          <span ref={cadLabelRef} className={labelCls}>Avg Cadence</span>
          <span className="flex items-baseline gap-1">
            <span ref={cadValRef} className={valCls}>0</span>
            <span className={unitCls}>rpm</span>
          </span>
          <span ref={cadDeltaRef} className={deltaCls} />
        </div>
      )}
      {vc.has('speed') && (
        <div className={rowCls}>
          <span className={`${dotCls} bg-[#3b82f6]`} />
          <span ref={speedLabelRef} className={labelCls}>Avg Speed</span>
          <span className="flex items-baseline gap-1">
            <span ref={speedValRef} className={valCls}>0</span>
            <span className={unitCls}>km/h</span>
          </span>
          <span ref={speedDeltaRef} className={deltaCls} />
        </div>
      )}
      {vc.has('elevation') && (
        <div className={vc.has('kjmin') ? rowCls : 'flex items-center gap-3 py-2'}>
          <span className={`${dotCls} bg-[var(--n600)]`} />
          <span ref={elevLabelRef} className={labelCls}>Avg Elevation</span>
          <span className="flex items-baseline gap-1">
            <span ref={elevValRef} className={valCls}>0</span>
            <span className={unitCls}>m</span>
          </span>
          <span ref={elevDeltaRef} className={deltaCls} />
        </div>
      )}
      {vc.has('kjmin') && (
        <div className="flex items-center gap-3 py-2">
          <span className={`${dotCls} bg-[#f59e0b]`} />
          <span ref={kjminLabelRef} className={labelCls}>kJ/min</span>
          <span className="flex items-baseline gap-1">
            <span ref={kjminValRef} className={valCls}>0</span>
            <span className={unitCls}>kJ/min</span>
          </span>
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
    <div className="mt-8 border-b border-[var(--n400)]">
      <div className="flex gap-6">
        {TABS.map((tab, i) => (
          <button
            key={tab}
            onClick={() => setActive(i)}
            className={cn(
              "pb-2 text-[13px]", WEIGHT.strong, TRANSITION.colors,
              active === i
                ? cn("border-b-2 border-[var(--n1050)] text-[var(--n1050)]", WEIGHT.medium)
                : "text-[var(--n600)] hover:text-[var(--n800)]"
            )}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  )
}
