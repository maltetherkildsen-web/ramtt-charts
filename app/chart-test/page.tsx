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
    fetch('/fit-data/mit-with-spikes.json')
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
            power={power}
            heartRate={heartRate}
            cadence={cadence}
            speed={speed}
            altitude={altitude}
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

// ─── Live Metrics Strip (ref-based, zero re-renders) ───

function LiveMetricsStrip({
  power,
  heartRate,
  cadence,
  speed,
  altitude,
  meta,
  durationStr,
}: {
  power: number[]
  heartRate: number[]
  cadence: number[]
  speed: number[]
  altitude: number[]
  meta: FitData['meta']
  durationStr: string
}) {
  const sync = useChartSync()

  const defaultRef = useRef<HTMLDivElement>(null)
  const hoverRef = useRef<HTMLDivElement>(null)
  const indicatorRef = useRef<HTMLDivElement>(null)

  // Refs for each hover value
  const timeVal = useRef<HTMLSpanElement>(null)
  const powerVal = useRef<HTMLSpanElement>(null)
  const powerZoneBadge = useRef<HTMLSpanElement>(null)
  const hrVal = useRef<HTMLSpanElement>(null)
  const hrZoneBadge = useRef<HTMLSpanElement>(null)
  const cadVal = useRef<HTMLSpanElement>(null)
  const speedVal = useRef<HTMLSpanElement>(null)
  const altVal = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (!sync) return

    return sync.subscribeHover((visIdx) => {
      const def = defaultRef.current
      const hov = hoverRef.current
      const ind = indicatorRef.current
      if (!def || !hov || !ind) return

      if (visIdx === null) {
        def.style.display = ''
        hov.style.display = 'none'
        ind.style.opacity = '0'
        return
      }

      const fullIdx = sync.zoom.start + visIdx
      if (fullIdx < 0 || fullIdx >= power.length) return

      // Switch rows
      def.style.display = 'none'
      hov.style.display = ''
      ind.style.opacity = '1'

      // Update values via direct DOM mutation — no setState
      if (timeVal.current) timeVal.current.textContent = formatTime(fullIdx)

      const pw = power[fullIdx]
      if (powerVal.current) powerVal.current.textContent = `${pw}`
      if (powerZoneBadge.current) {
        const zone = getPowerZone(pw, meta.ftp)
        powerZoneBadge.current.textContent = zone.label
        powerZoneBadge.current.style.color = zone.color
        powerZoneBadge.current.style.backgroundColor = `${zone.color}15`
      }

      const hr = heartRate[fullIdx]
      if (hrVal.current) hrVal.current.textContent = `${hr}`
      if (hrZoneBadge.current) {
        const zone = getHRZone(hr, meta.maxHR)
        hrZoneBadge.current.textContent = zone.label
        hrZoneBadge.current.style.color = zone.color
        hrZoneBadge.current.style.backgroundColor = `${zone.color}15`
      }

      if (cadVal.current) cadVal.current.textContent = `${cadence[fullIdx]}`
      if (speedVal.current) speedVal.current.textContent = `${speed[fullIdx].toFixed(1)}`
      if (altVal.current) altVal.current.textContent = `${altitude[fullIdx].toFixed(0)}`
    })
  }, [sync, power, heartRate, cadence, speed, altitude, meta.ftp, meta.maxHR])

  return (
    <div className="relative">
      {/* Left border hover indicator */}
      <div
        ref={indicatorRef}
        className="absolute left-0 top-0 bottom-0 w-[2px] rounded-full bg-[#0F0F0E]"
        style={{ opacity: 0, transition: 'opacity 150ms' }}
      />

      {/* Default: session averages */}
      <div ref={defaultRef} className="grid grid-cols-4 gap-px border-b border-[#E5E3DE] pb-3 pl-2 sm:grid-cols-8">
        <Stat label="Avg Power" value={`${meta.avgPower}`} unit="W" />
        <Stat label="Peak Power" value={`${meta.maxPower}`} unit="W" />
        <Stat label="Avg HR" value={`${meta.avgHR}`} unit="bpm" />
        <Stat label="Avg Cad" value={`${meta.avgCadence}`} unit="rpm" />
        <Stat label="Avg Speed" value={`${meta.avgSpeed}`} unit="km/h" />
        <Stat label="Duration" value={durationStr} />
        <Stat label="Power" value="—" />
        <Stat label="HR" value="—" />
      </div>

      {/* Hover: live values — toggled via display, values via refs */}
      <div ref={hoverRef} className="grid grid-cols-4 gap-px border-b border-[#E5E3DE] pb-3 pl-2 sm:grid-cols-8" style={{ display: 'none' }}>
        {/* Time */}
        <div>
          <div className="font-label text-[10px] uppercase tracking-[.09em] text-[#8A877F]">Time</div>
          <div className="font-space text-sm tabular-nums slashed-zero text-[#0F0F0E]">
            <span ref={timeVal}>0:00</span>
          </div>
        </div>

        {/* Power + zone */}
        <div>
          <div className="font-label text-[10px] uppercase tracking-[.09em] text-[#8A877F]">Power</div>
          <div className="flex items-baseline gap-1">
            <div className="font-space text-sm tabular-nums slashed-zero text-[#0F0F0E]">
              <span ref={powerVal}>0</span>
              <span className="ml-0.5 text-[10px] font-light text-[#8A877F]">W</span>
            </div>
            <span
              ref={powerZoneBadge}
              className="rounded px-1 py-px font-label text-[8px] font-bold uppercase tracking-[.04em]"
            />
          </div>
        </div>

        {/* HR + zone */}
        <div>
          <div className="font-label text-[10px] uppercase tracking-[.09em] text-[#8A877F]">HR</div>
          <div className="flex items-baseline gap-1">
            <div className="font-space text-sm tabular-nums slashed-zero text-[#0F0F0E]">
              <span ref={hrVal}>0</span>
              <span className="ml-0.5 text-[10px] font-light text-[#8A877F]">bpm</span>
            </div>
            <span
              ref={hrZoneBadge}
              className="rounded px-1 py-px font-label text-[8px] font-bold uppercase tracking-[.04em]"
            />
          </div>
        </div>

        {/* Cadence */}
        <div>
          <div className="font-label text-[10px] uppercase tracking-[.09em] text-[#8A877F]">Cadence</div>
          <div className="font-space text-sm tabular-nums slashed-zero text-[#0F0F0E]">
            <span ref={cadVal}>0</span>
            <span className="ml-0.5 text-[10px] font-light text-[#8A877F]">rpm</span>
          </div>
        </div>

        {/* Speed */}
        <div>
          <div className="font-label text-[10px] uppercase tracking-[.09em] text-[#8A877F]">Speed</div>
          <div className="font-space text-sm tabular-nums slashed-zero text-[#0F0F0E]">
            <span ref={speedVal}>0</span>
            <span className="ml-0.5 text-[10px] font-light text-[#8A877F]">km/h</span>
          </div>
        </div>

        {/* Altitude */}
        <div>
          <div className="font-label text-[10px] uppercase tracking-[.09em] text-[#8A877F]">Altitude</div>
          <div className="font-space text-sm tabular-nums slashed-zero text-[#0F0F0E]">
            <span ref={altVal}>0</span>
            <span className="ml-0.5 text-[10px] font-light text-[#8A877F]">m</span>
          </div>
        </div>

        {/* Static context columns (always visible in hover mode too) */}
        <Stat label="Avg Power" value={`${meta.avgPower}`} unit="W" />
        <Stat label="Duration" value={durationStr} />
      </div>
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
  zoneMode: ZoneMode
}) {
  const sync = useChartSync()!
  const { zoom } = sync
  const { start, end } = zoom

  const visibleRange = end - start + 1

  const visPower = useMemo(() => power.slice(start, end + 1), [power, start, end])
  const visHR = useMemo(() => heartRate.slice(start, end + 1), [heartRate, start, end])
  const visCadence = useMemo(() => cadence.slice(start, end + 1), [cadence, start, end])
  const visSpeed = useMemo(() => speed.slice(start, end + 1), [speed, start, end])
  const visAltitude = useMemo(() => altitude.slice(start, end + 1), [altitude, start, end])

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
        <ChartRefLine y={ftp} label={`FTP ${ftp}W`} />
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
