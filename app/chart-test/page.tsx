'use client'

/**
 * Chart test page — 5 stacked sport charts with synced crosshair + zoom.
 *
 * Route: /chart-test
 * Charts: Power · HR · Speed · Cadence · Elevation
 */

import { useMemo, useState, useCallback } from 'react'
import { ChartRoot } from '@/components/charts/primitives/ChartRoot'
import { ChartLine } from '@/components/charts/primitives/ChartLine'
import { ChartArea } from '@/components/charts/primitives/ChartArea'
import { ChartCrosshair } from '@/components/charts/primitives/ChartCrosshair'
import { ChartAxisY } from '@/components/charts/primitives/ChartAxisY'
import { ChartAxisX } from '@/components/charts/primitives/ChartAxisX'
import { ChartRefLine } from '@/components/charts/primitives/ChartRefLine'
import { ChartZoneLine, POWER_ZONES } from '@/components/charts/primitives/ChartZoneLine'
import { ChartBar } from '@/components/charts/primitives/ChartBar'
import { ChartSyncProvider, useChartSync } from '@/components/charts/primitives/ChartSyncProvider'
import { ChartZoomHandler } from '@/components/charts/primitives/ChartZoomHandler'
import { lttb } from '@/lib/charts/utils/lttb'
import type { ZoneDefinition } from '@/components/charts/primitives/ChartZoneLine'

// ─── Constants ───

const FTP = 240
const MAX_HR = 185
const TOTAL_POINTS = 200

/** HR zones (% of max HR). */
const HR_ZONES: ZoneDefinition[] = [
  { min: 0,    max: 0.60, color: '#94a3b8', label: 'Z1' },
  { min: 0.60, max: 0.70, color: '#22c55e', label: 'Z2' },
  { min: 0.70, max: 0.80, color: '#eab308', label: 'Z3' },
  { min: 0.80, max: 0.90, color: '#f97316', label: 'Z4' },
  { min: 0.90, max: 1.00, color: '#ef4444', label: 'Z5' },
  { min: 1.00, max: Infinity, color: '#dc2626', label: 'Z5+' },
]

// ─── PRNG ───

function makePRNG(seed: number) {
  let s = seed
  return () => {
    s |= 0
    s = (s + 0x6d2b79f5) | 0
    let t = Math.imul(s ^ (s >>> 15), 1 | s)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

// ─── Data generators ───

function generatePowerData(points = TOTAL_POINTS): number[] {
  const data: number[] = new Array(points)
  const rand = makePRNG(42)

  for (let i = 0; i < points; i++) {
    const t = i / points
    let base: number

    if (t < 0.1) {
      base = 80 + (t / 0.1) * 100
    } else if (t < 0.2) {
      base = 185 + Math.sin(t * 40) * 8
    } else if (t < 0.3) {
      const p = (t - 0.2) / 0.1
      base = 185 + p * 55
    } else if (t < 0.75) {
      const intervalTime = (t - 0.3) / 0.45
      const intervalNum = Math.floor(intervalTime * 4)
      const within = (intervalTime * 4) % 1
      const isWork = within < 0.57
      if (isWork) {
        base = 265 + Math.sin(within * Math.PI * 0.5) * 15 + intervalNum * 5
      } else {
        const rec = (within - 0.57) / 0.43
        base = 140 - rec * 20
      }
    } else {
      const cd = (t - 0.75) / 0.25
      base = 160 - cd * 100
    }

    data[i] = Math.max(0, Math.round(base + (rand() - 0.5) * 18))
  }
  return data
}

function generateHRData(powerData: number[]): number[] {
  const rand = makePRNG(99)
  const hr: number[] = new Array(powerData.length)
  let smooth = 110

  for (let i = 0; i < powerData.length; i++) {
    const target = 100 + (powerData[i] / 300) * 85
    const alpha = target > smooth ? 0.08 : 0.04
    smooth += alpha * (target - smooth)
    hr[i] = Math.round(Math.max(90, Math.min(195, smooth + (rand() - 0.5) * 4)))
  }
  return hr
}

function generateCadenceData(powerData: number[]): number[] {
  const rand = makePRNG(55)
  const cad: number[] = new Array(powerData.length)
  let smooth = 80

  for (let i = 0; i < powerData.length; i++) {
    const target = 72 + (powerData[i] / 300) * 33
    smooth += 0.12 * (target - smooth)
    cad[i] = Math.round(Math.max(60, Math.min(115, smooth + (rand() - 0.5) * 6)))
  }
  return cad
}

function generateSpeedData(powerData: number[]): number[] {
  const rand = makePRNG(33)
  const spd: number[] = new Array(powerData.length)
  let smooth = 20

  for (let i = 0; i < powerData.length; i++) {
    const target = 12 + Math.pow(powerData[i] / 50, 0.55) * 8
    smooth += 0.06 * (target - smooth)
    spd[i] = Math.round((smooth + (rand() - 0.5) * 1.5) * 10) / 10
  }
  return spd
}

/** Elevation (m) — gentle rolling terrain with a climb in the middle. */
function generateElevationData(points = TOTAL_POINTS): number[] {
  const elev: number[] = new Array(points)
  const rand = makePRNG(17)

  for (let i = 0; i < points; i++) {
    const t = i / points
    // Gentle undulation + a main climb from 30-60% of the ride
    const base =
      120 +
      Math.sin(t * Math.PI * 2) * 15 +
      Math.sin(t * Math.PI * 6) * 5 +
      (t > 0.3 && t < 0.6 ? Math.sin(((t - 0.3) / 0.3) * Math.PI) * 80 : 0)
    elev[i] = Math.round(base + (rand() - 0.5) * 3)
  }
  return elev
}

// ─── Smart time formatting ───

/**
 * Format time based on zoom level.
 * Full zoom: "8:15", zoomed in: "24:45", deep zoom: "24:32".
 */
function formatTimeForZoom(index: number, visibleRange: number): string {
  const totalSeconds = index * 15
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
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

// ─── Page ───

export default function ChartTestPage() {
  // Generate full datasets once
  const fullPower = useMemo(() => generatePowerData(TOTAL_POINTS), [])
  const fullHR = useMemo(() => generateHRData(fullPower), [fullPower])
  const fullCadence = useMemo(() => generateCadenceData(fullPower), [fullPower])
  const fullSpeed = useMemo(() => generateSpeedData(fullPower), [fullPower])
  const fullElevation = useMemo(() => generateElevationData(TOTAL_POINTS), [])

  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [zoneMode, setZoneMode] = useState<ZoneMode>('off')

  // Stats from full data
  const avg = Math.round(fullPower.reduce((s, v) => s + v, 0) / fullPower.length)
  const peak = Math.max(...fullPower)
  const avgHR = Math.round(fullHR.reduce((s, v) => s + v, 0) / fullHR.length)
  const avgCad = Math.round(fullCadence.reduce((s, v) => s + v, 0) / fullCadence.length)
  const avgSpd = (fullSpeed.reduce((s, v) => s + v, 0) / fullSpeed.length).toFixed(1)

  return (
    <ChartSyncProvider dataLength={TOTAL_POINTS}>
      <div className="min-h-screen bg-[#FAF9F5] p-8">
        <div className="mx-auto max-w-[860px] space-y-4">

          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-serif text-[28px] tracking-tight text-[#0F0F0E]">
                Interval Session
              </h1>
              <p className="mt-1 font-label text-[11px] uppercase tracking-[.09em] text-[#8A877F]">
                4 &times; 4 min @ FTP &nbsp;&middot;&nbsp; {TOTAL_POINTS} points &nbsp;&middot;&nbsp; synced crosshair + zoom
              </p>
            </div>

            {/* Zone toggle */}
            <div className="flex items-center gap-1 rounded-md border border-[#E5E3DE] bg-[#F3F1EC] p-0.5">
              <span className="px-2 font-label text-[10px] uppercase tracking-[.09em] text-[#8A877F]">
                Zones
              </span>
              {ZONE_MODES.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setZoneMode(mode)}
                  className={`rounded px-2.5 py-1 font-label text-[10px] uppercase tracking-[.06em] transition-colors ${
                    zoneMode === mode
                      ? 'bg-[#0F0F0E] text-white'
                      : 'text-[#5C5A55] hover:text-[#0F0F0E]'
                  }`}
                >
                  {ZONE_MODE_LABELS[mode]}
                </button>
              ))}
            </div>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap gap-x-8 gap-y-2 border-b border-[#E5E3DE] pb-3">
            <Stat label="Avg" value={`${avg}`} unit="W" />
            <Stat label="Peak" value={`${peak}`} unit="W" />
            <Stat label="Avg HR" value={`${avgHR}`} unit="bpm" />
            <Stat label="Avg Cad" value={`${avgCad}`} unit="rpm" />
            <Stat label="Avg Speed" value={avgSpd} unit="km/h" />
            <Stat label="Duration" value="50:00" />
            {hoverIdx !== null && (
              <>
                <Stat label="Power" value={`${fullPower[hoverIdx]}`} unit="W" highlight />
                <Stat label="HR" value={`${fullHR[hoverIdx]}`} unit="bpm" highlight />
              </>
            )}
          </div>

          {/* ─── 5 Stacked Charts ─── */}
          <SyncedCharts
            fullPower={fullPower}
            fullHR={fullHR}
            fullCadence={fullCadence}
            fullSpeed={fullSpeed}
            fullElevation={fullElevation}
            zoneMode={zoneMode}
            onHover={setHoverIdx}
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
            Synced crosshair &middot; Scroll to zoom &middot; Shift+scroll or drag to pan &middot; Zero re-renders on hover
          </p>
        </div>
      </div>
    </ChartSyncProvider>
  )
}

// ─── Synced charts wrapper (reads zoom from provider) ───

function SyncedCharts({
  fullPower,
  fullHR,
  fullCadence,
  fullSpeed,
  fullElevation,
  zoneMode,
  onHover,
}: {
  fullPower: number[]
  fullHR: number[]
  fullCadence: number[]
  fullSpeed: number[]
  fullElevation: number[]
  zoneMode: ZoneMode
  onHover: (idx: number | null) => void
}) {
  const sync = useChartSync()!
  const { zoom } = sync
  const { start, end } = zoom

  // Slice visible data from zoom range
  const visPower = useMemo(() => fullPower.slice(start, end + 1), [fullPower, start, end])
  const visHR = useMemo(() => fullHR.slice(start, end + 1), [fullHR, start, end])
  const visCadence = useMemo(() => fullCadence.slice(start, end + 1), [fullCadence, start, end])
  const visSpeed = useMemo(() => fullSpeed.slice(start, end + 1), [fullSpeed, start, end])
  const visElevation = useMemo(() => fullElevation.slice(start, end + 1), [fullElevation, start, end])

  const visibleRange = end - start + 1

  // Smart time format: adapts to zoom level
  const formatX = useCallback(
    (i: number) => formatTimeForZoom(start + i, visibleRange),
    [start, visibleRange],
  )

  // Hover callback: translate visible index → full data index
  const handleHover = useCallback(
    (visIdx: number | null) => {
      onHover(visIdx !== null ? start + visIdx : null)
    },
    [start, onHover],
  )

  // Shared padding for aligned Y-axes
  const chartPad = { right: 64 }

  return (
    <div className="space-y-1">
      {/* Power */}
      <ChartRoot
        data={visPower}
        height={240}
        padding={chartPad}
        className="rounded-t-lg border border-[#E5E3DE] bg-white"
      >
        <ChartAxisY />
        <ChartAxisX format={formatX} />
        <ChartRefLine y={FTP} label={`FTP ${FTP}W`} />
        <ChartArea />
        {zoneMode === 'power' ? (
          <ChartZoneLine threshold={FTP} zones={POWER_ZONES} />
        ) : (
          <ChartLine />
        )}
        <ChartCrosshair onHover={handleHover} />
        <ChartZoomHandler />
      </ChartRoot>

      {/* Heart Rate */}
      <ChartRoot
        data={visHR}
        height={140}
        padding={chartPad}
        className="border-x border-b border-[#E5E3DE] bg-white"
      >
        <ChartAxisY />
        <ChartAxisX format={formatX} />
        <ChartRefLine y={160} label="LT2" />
        <ChartArea gradientColor="#ef4444" />
        {zoneMode === 'hr' ? (
          <ChartZoneLine threshold={MAX_HR} zones={HR_ZONES} />
        ) : (
          <ChartLine className="fill-none stroke-red-500 stroke-[1.5]" />
        )}
        <ChartCrosshair dotColor="#ef4444" />
        <ChartZoomHandler />
      </ChartRoot>

      {/* Speed */}
      <ChartRoot
        data={visSpeed}
        height={120}
        padding={chartPad}
        className="border-x border-b border-[#E5E3DE] bg-white"
      >
        <ChartAxisY format={(v) => `${v.toFixed(0)}`} />
        <ChartAxisX format={formatX} />
        <ChartArea gradientColor="#3b82f6" />
        <ChartLine className="fill-none stroke-blue-500 stroke-[1.5]" />
        <ChartCrosshair dotColor="#3b82f6" />
        <ChartZoomHandler />
      </ChartRoot>

      {/* Cadence */}
      <ChartRoot
        data={visCadence}
        height={120}
        padding={chartPad}
        className="border-x border-b border-[#E5E3DE] bg-white"
      >
        <ChartAxisY format={(v) => `${v}`} />
        <ChartAxisX format={formatX} />
        <ChartRefLine y={90} label="90" />
        <ChartArea gradientColor="#a855f7" />
        <ChartLine className="fill-none stroke-purple-500 stroke-[1.5]" />
        <ChartCrosshair dotColor="#a855f7" />
        <ChartZoomHandler />
      </ChartRoot>

      {/* Elevation — area fill, shorter, grey */}
      <ChartRoot
        data={visElevation}
        height={80}
        padding={chartPad}
        className="rounded-b-lg border-x border-b border-[#E5E3DE] bg-white"
      >
        <ChartAxisY tickCount={2} format={(v) => `${v.toFixed(0)}m`} />
        <ChartAxisX format={formatX} />
        <ChartArea gradientColor="#78716c" opacityFrom={0.15} opacityTo={0.03} />
        <ChartLine className="fill-none stroke-stone-400 stroke-[1]" />
        <ChartCrosshair dotColor="#78716c" dotRadius={2} />
        <ChartZoomHandler />
      </ChartRoot>

      {/* Zoom indicator */}
      {(start > 0 || end < fullPower.length - 1) && (
        <div className="flex items-center justify-between">
          <span className="font-space text-[10px] text-[#8A877F]">
            {formatTimeForZoom(start, visibleRange)} – {formatTimeForZoom(end, visibleRange)}
          </span>
          <button
            onClick={() => sync.setZoom({ start: 0, end: fullPower.length - 1 })}
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
  highlight = false,
}: {
  label: string
  value: string
  unit?: string
  highlight?: boolean
}) {
  return (
    <div>
      <div className="font-label text-[10px] uppercase tracking-[.09em] text-[#8A877F]">
        {label}
      </div>
      <div
        className={`font-space text-sm tabular-nums slashed-zero ${
          highlight ? 'text-emerald-600' : 'text-[#0F0F0E]'
        }`}
      >
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
