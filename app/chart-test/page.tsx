'use client'

/**
 * Chart test page — visual smoke test for the chart primitives.
 *
 * Route: /chart-test
 * Shows: Power, HR, Cadence, Speed, and a bar chart demo.
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
import type { ZoneDefinition } from '@/components/charts/primitives/ChartZoneLine'

// ─── Constants ───

const FTP = 240
const MAX_HR = 185

/** HR zones (% of max HR). */
const HR_ZONES: ZoneDefinition[] = [
  { min: 0,    max: 0.60, color: '#94a3b8', label: 'Z1' },
  { min: 0.60, max: 0.70, color: '#22c55e', label: 'Z2' },
  { min: 0.70, max: 0.80, color: '#eab308', label: 'Z3' },
  { min: 0.80, max: 0.90, color: '#f97316', label: 'Z4' },
  { min: 0.90, max: 1.00, color: '#ef4444', label: 'Z5' },
  { min: 1.00, max: Infinity, color: '#dc2626', label: 'Z5+' },
]

// ─── Mock data generators ───

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

function generatePowerData(points = 200): number[] {
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

/** Cadence (RPM) — correlates with power, higher during intervals. */
function generateCadenceData(powerData: number[]): number[] {
  const rand = makePRNG(55)
  const cad: number[] = new Array(powerData.length)
  let smooth = 80

  for (let i = 0; i < powerData.length; i++) {
    // Higher power → higher cadence (roughly 75–105 RPM range)
    const target = 72 + (powerData[i] / 300) * 33
    const alpha = 0.12
    smooth += alpha * (target - smooth)
    cad[i] = Math.round(Math.max(60, Math.min(115, smooth + (rand() - 0.5) * 6)))
  }
  return cad
}

/** Speed (km/h) — correlates with power, with more inertia/smoothing. */
function generateSpeedData(powerData: number[]): number[] {
  const rand = makePRNG(33)
  const spd: number[] = new Array(powerData.length)
  let smooth = 20

  for (let i = 0; i < powerData.length; i++) {
    // Cube root relationship: speed ∝ power^(1/3) roughly
    const target = 12 + Math.pow(powerData[i] / 50, 0.55) * 8
    // Speed has high inertia — slow to change
    const alpha = 0.06
    smooth += alpha * (target - smooth)
    spd[i] = Math.round((smooth + (rand() - 0.5) * 1.5) * 10) / 10
  }
  return spd
}

/** Format data index as mm:ss (15 s intervals). */
function formatTime(index: number): string {
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
  const data = useMemo(() => generatePowerData(200), [])
  const hrData = useMemo(() => generateHRData(data), [data])
  const cadData = useMemo(() => generateCadenceData(data), [data])
  const spdData = useMemo(() => generateSpeedData(data), [data])

  const intervalAvg = useMemo(() => [145, 182, 248, 125, 262, 118, 271, 110, 280, 95], [])
  const intervalLabels = ['WU', 'Z2', 'I-1', 'Rec', 'I-2', 'Rec', 'I-3', 'Rec', 'I-4', 'CD']

  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [hrHoverIdx, setHrHoverIdx] = useState<number | null>(null)
  const [zoneMode, setZoneMode] = useState<ZoneMode>('off')

  const onHover = useCallback((idx: number | null) => {
    setHoverIdx(idx)
  }, [])

  const avg = Math.round(data.reduce((s, v) => s + v, 0) / data.length)
  const peak = Math.max(...data)
  const avgHR = Math.round(hrData.reduce((s, v) => s + v, 0) / hrData.length)
  const maxHR = Math.max(...hrData)
  const avgCad = Math.round(cadData.reduce((s, v) => s + v, 0) / cadData.length)
  const avgSpd = (spdData.reduce((s, v) => s + v, 0) / spdData.length).toFixed(1)

  const formatX = useCallback((i: number) => formatTime(i), [])

  return (
    <div className="min-h-screen bg-[#FAF9F5] p-8">
      <div className="mx-auto max-w-[860px] space-y-6">

        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-serif text-[28px] tracking-tight text-[#0F0F0E]">
              Interval Session
            </h1>
            <p className="mt-1 font-label text-[11px] uppercase tracking-[.09em] text-[#8A877F]">
              4 &times; 4 min @ FTP &nbsp;&middot;&nbsp; 200 points &nbsp;&middot;&nbsp; custom SVG chart system
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
            <Stat label="Power" value={`${data[hoverIdx]}`} unit="W" highlight />
          )}
          {hrHoverIdx !== null && (
            <Stat label="HR" value={`${hrData[hrHoverIdx]}`} unit="bpm" highlight />
          )}
        </div>

        {/* ─── Power ─── */}
        <ChartRoot
          data={data}
          height={300}
          padding={{ right: 64 }}
          className="rounded-lg border border-[#E5E3DE] bg-white"
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
          <ChartCrosshair onHover={onHover} />
        </ChartRoot>

        {/* ─── Heart rate ─── */}
        <ChartRoot
          data={hrData}
          height={160}
          padding={{ right: 64 }}
          className="rounded-lg border border-[#E5E3DE] bg-white"
        >
          <ChartAxisY />
          <ChartAxisX format={formatX} />
          <ChartRefLine y={160} label="LT2 160" />
          <ChartArea gradientColor="#ef4444" />
          {zoneMode === 'hr' ? (
            <ChartZoneLine threshold={MAX_HR} zones={HR_ZONES} />
          ) : (
            <ChartLine className="fill-none stroke-red-500 stroke-[1.5]" />
          )}
          <ChartCrosshair dotColor="#ef4444" onHover={setHrHoverIdx} />
        </ChartRoot>

        {/* ─── Cadence ─── */}
        <ChartRoot
          data={cadData}
          height={140}
          padding={{ right: 64 }}
          className="rounded-lg border border-[#E5E3DE] bg-white"
        >
          <ChartAxisY format={(v) => `${v}`} />
          <ChartAxisX format={formatX} />
          <ChartRefLine y={90} label="90 rpm" />
          <ChartArea gradientColor="#f59e0b" />
          <ChartLine className="fill-none stroke-amber-500 stroke-[1.5]" />
          <ChartCrosshair dotColor="#f59e0b" />
        </ChartRoot>

        {/* ─── Speed ─── */}
        <ChartRoot
          data={spdData}
          height={140}
          padding={{ right: 64 }}
          className="rounded-lg border border-[#E5E3DE] bg-white"
        >
          <ChartAxisY format={(v) => `${v.toFixed(0)}`} />
          <ChartAxisX format={formatX} />
          <ChartArea gradientColor="#3b82f6" />
          <ChartLine className="fill-none stroke-blue-500 stroke-[1.5]" />
          <ChartCrosshair dotColor="#3b82f6" />
        </ChartRoot>

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

        {/* ─── Bar chart: interval avg power ─── */}
        <div>
          <p className="mb-2 font-label text-[11px] uppercase tracking-[.09em] text-[#8A877F]">
            Interval Avg Power &nbsp;&middot;&nbsp; ChartBar
          </p>
          <ChartRoot
            data={intervalAvg}
            height={180}
            padding={{ left: 48, right: 12, top: 12, bottom: 28 }}
            yDomain={[0, 320]}
            className="rounded-lg border border-[#E5E3DE] bg-white"
          >
            <ChartAxisY />
            <ChartAxisX
              format={(i) => i < intervalLabels.length ? intervalLabels[i] : ''}
            />
            <ChartRefLine y={FTP} label="FTP" />
            <ChartBar
              gap={4}
              radius={3}
              colorFn={(v) => v >= FTP ? '#f97316' : '#22c55e'}
            />
          </ChartRoot>
        </div>

        {/* Info */}
        <p className="font-label text-[9px] uppercase tracking-[.09em] text-[#8A877F]">
          Zero Recharts &middot; Zero D3 &middot; Pure SVG + React context + math layer &middot; Hover = rAF + setAttribute, zero re-renders
        </p>
      </div>
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
