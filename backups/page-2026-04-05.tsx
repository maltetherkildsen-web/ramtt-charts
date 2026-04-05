'use client'

/**
 * Chart test page — 5 stacked sport charts with synced crosshair + zoom.
 *
 * Route: /chart-test
 * Charts: Power · HR · Speed · Cadence · Elevation
 *
 * Loads real FIT data from /fit-data/mit-with-spikes.json
 *
 * The live metrics strip and crosshair time label are fully ref-based —
 * zero React re-renders on mousemove. Hover state flows through
 * ChartSyncProvider's pub/sub, never through React state.
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

/** HR zones (% of max HR). */
const HR_ZONES: ZoneDefinition[] = [
  { min: 0,    max: 0.60, color: '#94a3b8', label: 'Z1' },
  { min: 0.60, max: 0.70, color: '#22c55e', label: 'Z2' },
  { min: 0.70, max: 0.80, color: '#eab308', label: 'Z3' },
  { min: 0.80, max: 0.90, color: '#f97316', label: 'Z4' },
  { min: 0.90, max: 1.00, color: '#ef4444', label: 'Z5' },
  { min: 1.00, max: Infinity, color: '#dc2626', label: 'Z5+' },
]

// ─── Smart time formatting ───

function formatTimeForZoom(index: number, _visibleRange: number): string {
  const totalSeconds = index
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

/** Simple m:ss format for a full data index (1 index = 1 second). */
function formatTime(index: number): string {
  const m = Math.floor(index / 60)
  const s = index % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

// ─── Toggle types ───

type ZoneMode = 'off' | 'power' | 'hr'

const ZONE_MODE_LABELS: Record<ZoneMode, string> = {
  off: 'Off',
  power: 'Power',
  hr: 'HR',
}

const ZONE_MODES: ZoneMode[] = ['off', 'power', 'hr']

// ─── Rolling average (pre-smoothing for HR / elevation) ───

/**
 * Lightweight moving average that removes integer-step staircase artifacts
 * from HR and GPS-altitude data before downsampling.
 *
 * O(n) — single pass with a sliding window sum.
 */
function rollingAverage(data: readonly number[], windowSize: number): number[] {
  if (windowSize <= 1) return data as number[]
  const len = data.length
  const out = new Array<number>(len)
  const half = (windowSize - 1) >> 1

  // Seed the running sum for the first window
  let sum = 0
  const firstEnd = Math.min(half, len - 1)
  for (let j = 0; j <= firstEnd; j++) sum += data[j]
  let wStart = 0
  let wEnd = firstEnd

  for (let i = 0; i < len; i++) {
    // Expand window right
    while (wEnd < Math.min(i + half, len - 1)) {
      wEnd++
      sum += data[wEnd]
    }
    // Shrink window left
    while (wStart < i - half) {
      sum -= data[wStart]
      wStart++
    }
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
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`)
        return r.json()
      })
      .then((d: FitData) => setFitData(d))
      .catch((e) => setError(e.message))
  }, [])

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F5]">
        <p className="text-red-500">Failed to load FIT data: {error}</p>
      </div>
    )
  }

  if (!fitData) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FAF9F5]">
        <p className="font-label text-[11px] uppercase tracking-[.09em] text-[#8A877F]">
          Loading activity data…
        </p>
      </div>
    )
  }

  return <ChartTestContent data={fitData} />
}

// ─── Main content (after data loads) ───

function ChartTestContent({ data }: { data: FitData }) {
  const { meta, power, heartRate, cadence, speed, altitude, intervals } = data
  const totalPoints = power.length

  // Only UI state that triggers re-render: zone mode toggle (user click, rare)
  const [zoneMode, setZoneMode] = useState<ZoneMode>('off')

  // Duration formatted
  const durationMin = Math.floor(meta.totalTime / 60)
  const durationSec = Math.round(meta.totalTime % 60)
  const durationStr = `${durationMin}:${durationSec.toString().padStart(2, '0')}`

  // Mark high-power laps as "work" intervals for the markers
  const workIntervals = useMemo(() => {
    return intervals
      .filter((iv) => (iv.avgPower ?? 0) >= 350)
      .map((iv, i) => ({
        ...iv,
        name: `Sprint ${i + 1}`,
        type: 'work' as const,
      }))
  }, [intervals])

  return (
    <ChartSyncProvider dataLength={totalPoints}>
      <div className="min-h-screen bg-[#FAF9F5] p-8">
        <div className="mx-auto max-w-[860px] space-y-3">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-serif text-[28px] tracking-tight text-[#0F0F0E]">
                {meta.name}
              </h1>
              <p className="mt-1 font-label text-[11px] uppercase tracking-[.09em] text-[#8A877F]">
                {meta.sport} &nbsp;&middot;&nbsp; {totalPoints} points
                &nbsp;&middot;&nbsp; FTP {meta.ftp}W
                &nbsp;&middot;&nbsp; synced crosshair + zoom
              </p>
            </div>

            {/* Zone toggle */}
            <div className="flex items-center">
              <span className="mr-2 font-label text-[10px] uppercase tracking-[.09em] text-[#8A877F]">
                Zones
              </span>
              <div className="flex -space-x-px">
                {ZONE_MODES.map((mode, i) => (
                  <button
                    key={mode}
                    onClick={() => setZoneMode(mode)}
                    className={`border border-[#E5E3DE] px-3 py-1 font-label text-[10px] uppercase tracking-[.06em] transition-colors ${
                      i === 0 ? 'rounded-l-md' : ''
                    } ${i === ZONE_MODES.length - 1 ? 'rounded-r-md' : ''} ${
                      zoneMode === mode
                        ? 'z-10 border-[#0F0F0E] bg-[#0F0F0E] text-white'
                        : 'bg-white text-[#5C5A55] hover:bg-[#F3F1EC] hover:text-[#0F0F0E]'
                    }`}
                  >
                    {ZONE_MODE_LABELS[mode]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Live metrics strip — fully ref-based, zero re-renders on hover */}
          <LiveMetricsStrip
            meta={meta}
            durationStr={durationStr}
          />

          {/* ─── 5 Stacked Charts ─── */}
          <SyncedCharts
            power={power}
            heartRate={heartRate}
            cadence={cadence}
            speed={speed}
            altitude={altitude}
            intervals={workIntervals}
            ftp={meta.ftp}
            maxHR={meta.maxHR}
            meta={meta}
            zoneMode={zoneMode}
          />

          {/* Zone legend */}
          {zoneMode !== 'off' && (
            <div className="flex items-center gap-4">
              <span className="font-label text-[10px] uppercase tracking-[.09em] text-[#8A877F]">
                {zoneMode === 'power' ? 'Power zones' : 'HR zones'}
              </span>
              {(zoneMode === 'power' ? POWER_ZONES : HR_ZONES).map((z) => (
                <div key={z.label} className="flex items-center gap-1">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: z.color }}
                  />
                  <span className="font-space text-[10px] text-[#5C5A55]">
                    {z.label}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Info */}
          <p className="font-label text-[9px] uppercase tracking-[.09em] text-[#8A877F]">
            Real FIT data &middot; {totalPoints} records &middot; Synced crosshair &middot; Ref-based metrics &middot; Scroll to zoom &middot; Drag to brush-select &middot; Scrubber mini-map
          </p>
        </div>
      </div>
    </ChartSyncProvider>
  )
}

// ─── Live Metrics Strip (static session averages — never updates on hover) ───

function LiveMetricsStrip({
  meta,
  durationStr,
}: {
  meta: FitData['meta']
  durationStr: string
}) {
  return (
    <div className="grid grid-cols-4 gap-px border-b border-[#E5E3DE] pb-3 sm:grid-cols-8">
      <Stat label="Avg Power" value={`${meta.avgPower}`} unit="W" />
      <Stat label="Peak Power" value={`${meta.maxPower}`} unit="W" />
      <Stat label="Avg HR" value={`${meta.avgHR}`} unit="bpm" />
      <Stat label="Avg Cad" value={`${meta.avgCadence}`} unit="rpm" />
      <Stat label="Avg Speed" value={`${meta.avgSpeed}`} unit="km/h" />
      <Stat label="Duration" value={durationStr} />
      <Stat label="FTP" value={`${meta.ftp}`} unit="W" />
      <Stat label="Max HR" value={`${meta.maxHR}`} unit="bpm" />
    </div>
  )
}

// ─── Synced charts wrapper ───

function SyncedCharts({
  power,
  heartRate,
  cadence,
  speed,
  altitude,
  intervals,
  ftp,
  maxHR,
  meta,
  zoneMode,
}: {
  power: number[]
  heartRate: number[]
  cadence: number[]
  speed: number[]
  altitude: number[]
  intervals: Interval[]
  ftp: number
  maxHR: number
  meta: FitData['meta']
  zoneMode: ZoneMode
}) {
  const sync = useChartSync()!
  const { zoom } = sync
  const { start, end } = zoom

  const visibleRange = end - start + 1

  const visPower = useMemo(() => power.slice(start, end + 1), [power, start, end])
  const visCadence = useMemo(() => cadence.slice(start, end + 1), [cadence, start, end])
  const visSpeed = useMemo(() => speed.slice(start, end + 1), [speed, start, end])

  // HR + altitude get a zoom-adaptive rolling average to remove
  // integer-step staircase artefacts before downsampling.
  // Window: 1 (none) at full zoom-out, 3 at medium, 5 when deep-zoomed.
  const smoothWindow = visibleRange < 500 ? 5 : visibleRange < 2000 ? 3 : 1

  const visHR = useMemo(() => {
    const raw = heartRate.slice(start, end + 1)
    return smoothWindow > 1 ? rollingAverage(raw, smoothWindow) : raw
  }, [heartRate, start, end, smoothWindow])

  const visAltitude = useMemo(() => {
    const raw = altitude.slice(start, end + 1)
    return smoothWindow > 1 ? rollingAverage(raw, smoothWindow) : raw
  }, [altitude, start, end, smoothWindow])

  const formatX = useCallback(
    (i: number) => formatTimeForZoom(start + i, visibleRange),
    [start, visibleRange],
  )

  /** Stable format function for CrosshairTimeLabel (full index → m:ss). */
  const formatTimeLabel = useCallback((idx: number) => formatTime(idx), [])

  const timeTicks = useMemo(() => {
    const ticks = niceTicks(start, end, 6)
    const indices = ticks
      .map((sec) => Math.round(sec) - start)
      .filter((i) => i >= 0 && i < visibleRange)
    return [...new Set(indices)]
  }, [start, end, visibleRange])

  const chartPad = { right: 64 }

  const visibleIntervals = useMemo(() => {
    return intervals
      .map((iv) => ({
        ...iv,
        startIndex: iv.startIndex - start,
        endIndex: iv.endIndex - start,
      }))
      .filter((iv) => iv.endIndex > 0 && iv.startIndex < visibleRange)
  }, [intervals, start, visibleRange])

  return (
    <div className="relative select-none">
      {/* Power */}
      <ChartRoot
        data={visPower}
        height={120}
        padding={{ ...chartPad, bottom: 4 }}
        className="rounded-t-lg border border-[#E5E3DE] bg-white"
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
      </ChartRoot>

      {/* Heart Rate */}
      <ChartRoot
        data={visHR}
        height={100}
        padding={{ ...chartPad, bottom: 4 }}
        className="-mt-px border-x border-b border-[#E5E3DE] bg-white"
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
      </ChartRoot>

      {/* Speed */}
      <ChartRoot
        data={visSpeed}
        height={100}
        padding={{ ...chartPad, bottom: 4 }}
        className="-mt-px border-x border-b border-[#E5E3DE] bg-white"
      >
        <ChartAxisY tickCount={3} format={(v) => `${v.toFixed(0)}`} />
        <ChartArea gradientColor="#3b82f6" opacityFrom={0.08} opacityTo={0.005} />
        <ChartLine className="fill-none stroke-blue-500 stroke-[1.5]" />
        <ChartCrosshair lineColor="#52525b" lineWidth={0.75} dotColor="#3b82f6" />
        <ChartZoomHandler />
      </ChartRoot>

      {/* Cadence */}
      <ChartRoot
        data={visCadence}
        height={100}
        padding={{ ...chartPad, bottom: 4 }}
        className="-mt-px border-x border-b border-[#E5E3DE] bg-white"
      >
        <ChartAxisY tickCount={3} format={(v) => `${v}`} />
        <ChartRefLine y={90} label="90" />
        <ChartArea gradientColor="#a855f7" opacityFrom={0.08} opacityTo={0.005} />
        <ChartLine className="fill-none stroke-purple-500 stroke-[1.5]" />
        <ChartCrosshair lineColor="#52525b" lineWidth={0.75} dotColor="#a855f7" />
        <ChartZoomHandler />
      </ChartRoot>

      {/* Elevation — area fill, shorter, grey — ONLY chart with X-axis */}
      <ChartRoot
        data={visAltitude}
        height={50}
        padding={chartPad}
        className="-mt-px border-x border-b border-[#E5E3DE] bg-white"
      >
        <ChartAxisY tickCount={2} format={(v) => `${v.toFixed(0)}m`} />
        <ChartAxisX format={formatX} tickValues={timeTicks} />
        <ChartArea gradientColor="#78716c" opacityFrom={0.15} opacityTo={0.03} />
        <ChartLine className="fill-none stroke-stone-400 stroke-[1]" />
        <ChartCrosshair lineColor="#52525b" lineWidth={0.75} dotColor="#78716c" dotRadius={2} />
        <ChartZoomHandler />
      </ChartRoot>

      {/* Crosshair time label — pill floating on X-axis */}
      <CrosshairTimeLabel format={formatTimeLabel} />

      {/* Hover data table — ref-based, updates on crosshair hover */}
      <HoverDataTable
        power={power}
        heartRate={heartRate}
        cadence={cadence}
        speed={speed}
        altitude={altitude}
        meta={meta}
      />

      {/* Scrubber / mini-map */}
      <ChartScrubber
        data={power}
        color="#E36B30"
        className="-mt-px rounded-b-lg border-x border-b border-[#E5E3DE] bg-white"
      />

      {/* Zoom indicator */}
      {(start > 0 || end < power.length - 1) && (
        <div className="mt-1 flex items-center justify-between">
          <span className="font-space text-[10px] text-[#8A877F]">
            {formatTimeForZoom(start, visibleRange)} – {formatTimeForZoom(end, visibleRange)}
          </span>
          <button
            onClick={() => sync.setZoom({ start: 0, end: power.length - 1 })}
            className="rounded px-2 py-0.5 font-label text-[9px] uppercase tracking-[.06em] text-[#5C5A55] transition-colors hover:bg-[#E5E3DE] hover:text-[#0F0F0E]"
          >
            Reset zoom
          </button>
        </div>
      )}
    </div>
  )
}

// ─── Hover Data Table (ref-based, zero re-renders) ───

function HoverDataTable({
  power,
  heartRate,
  cadence,
  speed,
  altitude,
  meta,
}: {
  power: number[]
  heartRate: number[]
  cadence: number[]
  speed: number[]
  altitude: number[]
  meta: FitData['meta']
}) {
  const sync = useChartSync()
  const { start, end } = sync?.zoom ?? { start: 0, end: power.length - 1 }
  const isZoomed = start > 0 || end < power.length - 1

  // Compute averages + maxes for the VISIBLE range (updates on zoom via React state)
  const rangeStats = useMemo(() => {
    const s = start
    const e = end
    const len = e - s + 1
    if (len <= 0) return { power: 0, hr: 0, cad: 0, speed: 0, elev: 0, maxPower: 0, maxHR: 0, maxCad: 0, maxSpeed: 0, maxElev: 0 }
    let pw = 0, hr = 0, cad = 0, spd = 0, elv = 0
    let mxPw = -Infinity, mxHr = -Infinity, mxCad = -Infinity, mxSpd = -Infinity, mxElv = -Infinity
    for (let i = s; i <= e; i++) {
      pw += power[i]; hr += heartRate[i]; cad += cadence[i]; spd += speed[i]; elv += altitude[i]
      if (power[i] > mxPw) mxPw = power[i]
      if (heartRate[i] > mxHr) mxHr = heartRate[i]
      if (cadence[i] > mxCad) mxCad = cadence[i]
      if (speed[i] > mxSpd) mxSpd = speed[i]
      if (altitude[i] > mxElv) mxElv = altitude[i]
    }
    return {
      power: Math.round(pw / len), hr: Math.round(hr / len), cad: Math.round(cad / len),
      speed: +(spd / len).toFixed(1), elev: Math.round(elv / len),
      maxPower: Math.round(mxPw), maxHR: Math.round(mxHr), maxCad: Math.round(mxCad),
      maxSpeed: +mxSpd.toFixed(1), maxElev: Math.round(mxElv),
    }
  }, [power, heartRate, cadence, speed, altitude, start, end])

  // Range duration string (for zoomed label)
  const rangeDuration = useMemo(() => {
    const secs = end - start
    const m = Math.floor(secs / 60)
    const s = secs % 60
    return `${formatTime(start)} – ${formatTime(end)}  (${m}:${s.toString().padStart(2, '0')})`
  }, [start, end])

  // Refs per row: label, value, max, zone badge
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

  // Show averages for the current view (zoomed range or full session)
  const showAverages = useCallback(() => {
    const s = rangeStats

    // Duration / time row
    if (timeLabelRef.current) timeLabelRef.current.textContent = isZoomed ? 'Selection' : 'Duration'
    if (timeValRef.current) timeValRef.current.textContent = isZoomed ? rangeDuration : formatTime(power.length)

    // Labels
    const prefix = isZoomed ? 'Sel' : 'Avg'
    if (powerLabelRef.current) powerLabelRef.current.textContent = `${prefix} Power`
    if (hrLabelRef.current) hrLabelRef.current.textContent = `${prefix} Heart Rate`
    if (cadLabelRef.current) cadLabelRef.current.textContent = `${prefix} Cadence`
    if (speedLabelRef.current) speedLabelRef.current.textContent = `${prefix} Speed`
    if (elevLabelRef.current) elevLabelRef.current.textContent = `${prefix} Elevation`

    // Values — muted color
    if (powerValRef.current) { powerValRef.current.textContent = `${s.power}`; powerValRef.current.style.color = '#3D3C39' }
    if (hrValRef.current) { hrValRef.current.textContent = `${s.hr}`; hrValRef.current.style.color = '#3D3C39' }
    if (cadValRef.current) { cadValRef.current.textContent = `${s.cad}`; cadValRef.current.style.color = '#3D3C39' }
    if (speedValRef.current) { speedValRef.current.textContent = `${s.speed}`; speedValRef.current.style.color = '#3D3C39' }
    if (elevValRef.current) { elevValRef.current.textContent = `${s.elev}`; elevValRef.current.style.color = '#3D3C39' }

    // Max values
    if (powerMaxRef.current) powerMaxRef.current.textContent = `max ${s.maxPower}`
    if (hrMaxRef.current) hrMaxRef.current.textContent = `max ${s.maxHR}`
    if (cadMaxRef.current) cadMaxRef.current.textContent = `max ${s.maxCad}`
    if (speedMaxRef.current) speedMaxRef.current.textContent = `max ${s.maxSpeed}`
    if (elevMaxRef.current) elevMaxRef.current.textContent = `max ${s.maxElev}`

    // Hide zone badges in default state (only show during hover)
    if (powerZoneRef.current) { powerZoneRef.current.textContent = ''; powerZoneRef.current.style.backgroundColor = '' }
    if (hrZoneRef.current) { hrZoneRef.current.textContent = ''; hrZoneRef.current.style.backgroundColor = '' }
  }, [meta, rangeStats, isZoomed, rangeDuration, power.length])

  // Show averages on mount
  useEffect(() => { showAverages() }, [showAverages])

  useEffect(() => {
    if (!sync) return

    return sync.subscribeHover((visIdx) => {
      if (visIdx === null) {
        showAverages()
        return
      }

      const fullIdx = sync.zoom.start + visIdx
      if (fullIdx < 0 || fullIdx >= power.length) return

      // Time row → show current point time
      if (timeLabelRef.current) timeLabelRef.current.textContent = 'Time'
      if (timeValRef.current) timeValRef.current.textContent = formatTime(fullIdx)

      // Labels → live (drop prefix)
      if (powerLabelRef.current) powerLabelRef.current.textContent = 'Power'
      if (hrLabelRef.current) hrLabelRef.current.textContent = 'Heart Rate'
      if (cadLabelRef.current) cadLabelRef.current.textContent = 'Cadence'
      if (speedLabelRef.current) speedLabelRef.current.textContent = 'Speed'
      if (elevLabelRef.current) elevLabelRef.current.textContent = 'Elevation'

      const pw = power[fullIdx]
      const hr = heartRate[fullIdx]
      const cad = cadence[fullIdx]
      const spd = speed[fullIdx]
      const elev = altitude[fullIdx]

      // Values — full contrast
      if (powerValRef.current) { powerValRef.current.textContent = `${pw}`; powerValRef.current.style.color = '#0F0F0E' }
      if (hrValRef.current) { hrValRef.current.textContent = `${hr}`; hrValRef.current.style.color = '#0F0F0E' }
      if (cadValRef.current) { cadValRef.current.textContent = `${cad}`; cadValRef.current.style.color = '#0F0F0E' }
      if (speedValRef.current) { speedValRef.current.textContent = spd.toFixed(1); speedValRef.current.style.color = '#0F0F0E' }
      if (elevValRef.current) { elevValRef.current.textContent = `${Math.round(elev)}`; elevValRef.current.style.color = '#0F0F0E' }

      // Hide max during hover (live point value is shown instead)
      if (powerMaxRef.current) powerMaxRef.current.textContent = ''
      if (hrMaxRef.current) hrMaxRef.current.textContent = ''
      if (cadMaxRef.current) cadMaxRef.current.textContent = ''
      if (speedMaxRef.current) speedMaxRef.current.textContent = ''
      if (elevMaxRef.current) elevMaxRef.current.textContent = ''

      // Zone badges
      if (powerZoneRef.current) {
        const z = getPowerZone(pw, meta.ftp)
        powerZoneRef.current.textContent = z.label
        powerZoneRef.current.style.color = z.color
        powerZoneRef.current.style.backgroundColor = `${z.color}1F`
      }
      if (hrZoneRef.current) {
        const z = getHRZone(hr, meta.maxHR)
        hrZoneRef.current.textContent = z.label
        hrZoneRef.current.style.color = z.color
        hrZoneRef.current.style.backgroundColor = `${z.color}1F`
      }
    })
  }, [sync, power, heartRate, cadence, speed, altitude, meta, showAverages])

  return (
    <div className="mt-2 mb-1" style={{ paddingLeft: 48, paddingRight: 64 }}>
      {/* Duration / Selection / Time */}
      <div className="flex items-center gap-3 border-b border-[#E5E3DE]/60 py-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#0F0F0E]" />
        <span ref={timeLabelRef} className="w-24 text-[13px] text-[#5C5A55]">Duration</span>
        <span ref={timeValRef} className="font-space text-[15px] font-medium tabular-nums slashed-zero text-[#3D3C39]" />
      </div>

      {/* Power */}
      <div className="flex items-center gap-3 border-b border-[#E5E3DE]/60 py-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#22c55e]" />
        <span ref={powerLabelRef} className="w-24 text-[13px] text-[#5C5A55]">Avg Power</span>
        <span className="flex items-baseline gap-1">
          <span ref={powerValRef} className="font-space text-[15px] font-medium tabular-nums slashed-zero text-[#3D3C39]">0</span>
          <span className="font-space text-xs text-[#8A877F]">W</span>
        </span>
        <span ref={powerMaxRef} className="font-space text-[11px] tabular-nums text-[#A8A49A]" />
        <span ref={powerZoneRef} className="ml-auto rounded px-2.5 py-0.5 font-space text-[11px] font-medium tabular-nums" />
      </div>

      {/* Heart Rate */}
      <div className="flex items-center gap-3 border-b border-[#E5E3DE]/60 py-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#ef4444]" />
        <span ref={hrLabelRef} className="w-24 text-[13px] text-[#5C5A55]">Avg Heart Rate</span>
        <span className="flex items-baseline gap-1">
          <span ref={hrValRef} className="font-space text-[15px] font-medium tabular-nums slashed-zero text-[#3D3C39]">0</span>
          <span className="font-space text-xs text-[#8A877F]">bpm</span>
        </span>
        <span ref={hrMaxRef} className="font-space text-[11px] tabular-nums text-[#A8A49A]" />
        <span ref={hrZoneRef} className="ml-auto rounded px-2.5 py-0.5 font-space text-[11px] font-medium tabular-nums" />
      </div>

      {/* Cadence */}
      <div className="flex items-center gap-3 border-b border-[#E5E3DE]/60 py-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#8b5cf6]" />
        <span ref={cadLabelRef} className="w-24 text-[13px] text-[#5C5A55]">Avg Cadence</span>
        <span className="flex items-baseline gap-1">
          <span ref={cadValRef} className="font-space text-[15px] font-medium tabular-nums slashed-zero text-[#3D3C39]">0</span>
          <span className="font-space text-xs text-[#8A877F]">rpm</span>
        </span>
        <span ref={cadMaxRef} className="font-space text-[11px] tabular-nums text-[#A8A49A]" />
      </div>

      {/* Speed */}
      <div className="flex items-center gap-3 border-b border-[#E5E3DE]/60 py-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#3b82f6]" />
        <span ref={speedLabelRef} className="w-24 text-[13px] text-[#5C5A55]">Avg Speed</span>
        <span className="flex items-baseline gap-1">
          <span ref={speedValRef} className="font-space text-[15px] font-medium tabular-nums slashed-zero text-[#3D3C39]">0</span>
          <span className="font-space text-xs text-[#8A877F]">km/h</span>
        </span>
        <span ref={speedMaxRef} className="font-space text-[11px] tabular-nums text-[#A8A49A]" />
      </div>

      {/* Elevation */}
      <div className="flex items-center gap-3 py-2">
        <span className="h-2 w-2 shrink-0 rounded-full bg-[#a8a49a]" />
        <span ref={elevLabelRef} className="w-24 text-[13px] text-[#5C5A55]">Avg Elevation</span>
        <span className="flex items-baseline gap-1">
          <span ref={elevValRef} className="font-space text-[15px] font-medium tabular-nums slashed-zero text-[#3D3C39]">0</span>
          <span className="font-space text-xs text-[#8A877F]">m</span>
        </span>
        <span ref={elevMaxRef} className="font-space text-[11px] tabular-nums text-[#A8A49A]" />
      </div>
    </div>
  )
}

// ─── Stat chip ───

function Stat({
  label,
  value,
  unit,
}: {
  label: string
  value: string
  unit?: string
}) {
  return (
    <div>
      <div className="font-label text-[10px] uppercase tracking-[.09em] text-[#8A877F]">
        {label}
      </div>
      <div className="font-space text-sm tabular-nums slashed-zero text-[#0F0F0E]">
        {value}
        {unit && (
          <span className="ml-0.5 text-[10px] font-light text-[#8A877F]">
            {unit}
          </span>
        )}
      </div>
    </div>
  )
}
