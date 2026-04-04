'use client'

/**
 * Chart test page — visual smoke test for the chart primitives.
 *
 * Route: /chart-test
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

// ─── Zone definitions ───

const FTP = 240

/** HR zones (% of max HR, using 185 as example max). */
const HR_ZONES: ZoneDefinition[] = [
  { min: 0,    max: 0.60, color: '#94a3b8', label: 'Z1' },
  { min: 0.60, max: 0.70, color: '#22c55e', label: 'Z2' },
  { min: 0.70, max: 0.80, color: '#eab308', label: 'Z3' },
  { min: 0.80, max: 0.90, color: '#f97316', label: 'Z4' },
  { min: 0.90, max: 1.00, color: '#ef4444', label: 'Z5' },
  { min: 1.00, max: Infinity, color: '#dc2626', label: 'Z5+' },
]

const MAX_HR = 185

/**
 * CHO Zones — carbohydrate oxidation rate zones.
 *
 * RAMTT's own concept — no established standard exists.
 * Blue/cyan spectrum to stay visually distinct from the
 * classic grey→green→yellow→orange→red power zones.
 *
 * Semantics: low oxidation = cool/calm, high = hot/alarm.
 * Threshold = estimated max CHO oxidation rate (g/hr).
 * Placeholder values — fintune with Daniel later.
 */
const CHO_ZONES: ZoneDefinition[] = [
  { min: 0,    max: 0.30, color: '#94a3b8', label: 'C1' },  // Minimal — slate grey
  { min: 0.30, max: 0.50, color: '#38bdf8', label: 'C2' },  // Low — sky blue
  { min: 0.50, max: 0.70, color: '#2dd4bf', label: 'C3' },  // Moderate — teal
  { min: 0.70, max: 0.85, color: '#a78bfa', label: 'C4' },  // High — violet
  { min: 0.85, max: 1.00, color: '#e879f9', label: 'C5' },  // Very high — fuchsia
  { min: 1.00, max: Infinity, color: '#f43f5e', label: 'C6' }, // Critical — rose
]

/** Simulated max CHO oxidation rate (g/hr) for demo. */
const MAX_CHO = 90

// ─── Mock data ───

function generatePowerData(points = 200): number[] {
  const data: number[] = new Array(points)

  let seed = 42
  const rand = () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

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

    const noise = (rand() - 0.5) * 18
    data[i] = Math.max(0, Math.round(base + noise))
  }

  return data
}

function generateHRData(powerData: number[], points = 200): number[] {
  const hr: number[] = new Array(points)

  let seed = 99
  const rand = () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  let smoothHR = 110
  for (let i = 0; i < points; i++) {
    const targetHR = 100 + (powerData[i] / 300) * 85
    const alpha = targetHR > smoothHR ? 0.08 : 0.04
    smoothHR = smoothHR + alpha * (targetHR - smoothHR)
    const noise = (rand() - 0.5) * 4
    hr[i] = Math.round(Math.max(90, Math.min(195, smoothHR + noise)))
  }

  return hr
}

/**
 * Generate CHO oxidation rate data (g/hr) correlated with power.
 * Higher power → higher CHO oxidation. Non-linear relationship
 * (exponential-ish — fat oxidation dominates at low intensity,
 * CHO takes over sharply above threshold).
 */
function generateCHOData(powerData: number[], points = 200): number[] {
  const cho: number[] = new Array(points)

  let seed = 77
  const rand = () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }

  for (let i = 0; i < points; i++) {
    const pctFTP = powerData[i] / FTP
    // Non-linear: CHO oxidation ramps up sharply above ~0.7 FTP
    const base = pctFTP < 0.5
      ? pctFTP * 30              // Low intensity: mostly fat
      : 15 + Math.pow(pctFTP - 0.5, 1.6) * 180  // Above 50%: CHO ramps hard
    const noise = (rand() - 0.5) * 6
    cho[i] = Math.round(Math.max(5, Math.min(120, base + noise)))
  }

  return cho
}

/** Format data index as mm:ss (15 s intervals). */
function formatTime(index: number): string {
  const totalSeconds = index * 15
  const m = Math.floor(totalSeconds / 60)
  const s = totalSeconds % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

// ─── Toggle types ───

type ZoneMode = 'off' | 'power' | 'hr' | 'cho'

const ZONE_MODE_LABELS: Record<ZoneMode, string> = {
  off: 'Off',
  power: 'Power',
  hr: 'HR',
  cho: 'CHO',
}

const ZONE_MODES: ZoneMode[] = ['off', 'power', 'hr', 'cho']

// ─── Page ───

export default function ChartTestPage() {
  const data = useMemo(() => generatePowerData(200), [])
  const hrData = useMemo(() => generateHRData(data, 200), [data])
  const choData = useMemo(() => generateCHOData(data, 200), [data])

  // Interval avg power for bar chart
  const intervalAvg = useMemo(() => [145, 182, 248, 125, 262, 118, 271, 110, 280, 95], [])
  const intervalLabels = ['WU', 'Z2', 'I-1', 'Rec', 'I-2', 'Rec', 'I-3', 'Rec', 'I-4', 'CD']
  const [hoverIdx, setHoverIdx] = useState<number | null>(null)
  const [hrHoverIdx, setHrHoverIdx] = useState<number | null>(null)
  const [zoneMode, setZoneMode] = useState<ZoneMode>('off')

  const onHover = useCallback((idx: number | null) => {
    setHoverIdx(idx)
  }, [])

  const avg = Math.round(data.reduce((s, v) => s + v, 0) / data.length)
  const max = Math.max(...data)
  const avgHR = Math.round(hrData.reduce((s, v) => s + v, 0) / hrData.length)
  const maxHR = Math.max(...hrData)

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
        <div className="flex gap-8 border-b border-[#E5E3DE] pb-3">
          <Stat label="Avg" value={`${avg}`} unit="W" />
          <Stat label="Peak" value={`${max}`} unit="W" />
          <Stat label="Avg HR" value={`${avgHR}`} unit="bpm" />
          <Stat label="Max HR" value={`${maxHR}`} unit="bpm" />
          <Stat label="Duration" value="50:00" />
          {hoverIdx !== null && (
            <Stat
              label="Power"
              value={`${data[hoverIdx]}`}
              unit="W"
              highlight
            />
          )}
          {hrHoverIdx !== null && (
            <Stat
              label="HR"
              value={`${hrData[hrHoverIdx]}`}
              unit="bpm"
              highlight
            />
          )}
        </div>

        {/* ─── Main chart (power) ─── */}
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

        {/* ─── Heart rate chart ─── */}
        <ChartRoot
          data={hrData}
          height={180}
          padding={{ right: 64 }}
          className="rounded-lg border border-[#E5E3DE] bg-white"
        >
          <ChartAxisY format={(v) => `${v}`} />
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

        {/* ─── CHO oxidation chart ─── */}
        <ChartRoot
          data={choData}
          height={180}
          padding={{ right: 64 }}
          className="rounded-lg border border-[#E5E3DE] bg-white"
        >
          <ChartAxisY format={(v) => `${v}`} />
          <ChartAxisX format={formatX} />
          <ChartRefLine y={MAX_CHO} label={`Max ${MAX_CHO} g/hr`} />
          <ChartArea gradientColor="#a78bfa" />
          {zoneMode === 'cho' ? (
            <ChartZoneLine threshold={MAX_CHO} zones={CHO_ZONES} />
          ) : (
            <ChartLine className="fill-none stroke-violet-500 stroke-[1.5]" />
          )}
          <ChartCrosshair dotColor="#a78bfa" />
        </ChartRoot>

        {/* Zone legend — only show when a zone mode is active */}
        {zoneMode !== 'off' && (
          <div className="flex items-center gap-4">
            <span className="font-label text-[10px] uppercase tracking-[.09em] text-[#8A877F]">
              {zoneMode === 'power' ? 'Power zones' : zoneMode === 'hr' ? 'HR zones' : 'CHO zones'}
            </span>
            {(zoneMode === 'power' ? POWER_ZONES : zoneMode === 'hr' ? HR_ZONES : CHO_ZONES).map((z) => (
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
            <ChartRefLine y={FTP} label={`FTP`} />
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
