'use client'

import { useState } from 'react'
import {
  POWER_ZONES,
  POWER_ZONES_VIVID,
  POWER_ZONE_NAMES,
  HR_ZONES,
  HR_ZONE_NAMES,
  CHO_ZONES,
  CHO_ZONE_NAMES,
  KJ_ZONES,
  KJ_ZONE_NAMES,
  SIGNAL_COLORS,
  NUTRIENT_COLORS,
  COMPARISON_COLORS,
  DOT_COLORS,
  ZONE_FILL_OPACITY,
  ACCENT,
  DANGER,
  WARNING,
  SUCCESS,
  INFO,
} from '@/lib/constants/colors'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// RAMTT Color System v2 — Visual Specification
// All colors designed for #FAF9F5 sand canvas
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

const CANVAS = 'var(--bg)'
const CARD = '#FFFFFF'
const BORDER = '#E5E3DE'

const TEXT = {
  primary: 'var(--n1150)',
  secondary: '#2A2826',
  tertiary: '#5C5A55',
  muted: '#8A8780',
  subtle: '#B5B2AB',
  ghost: '#D4D1CA',
}

const ATM = {
  navy: '#0230E0',
  deepNavy: '#050A30',
  aubergine: '#470426',
  magenta: '#96004D',
  creamYellow: '#FFFFD0',
  blush: '#FFC9FE',
  offWhite: '#FFFEF7',
}

const HR_RANGES = ['50-60%', '60-70%', '70-80%', '80-90%', '90-95%', '95-100%']
const CHO_RATES = ['0-30', '30-50', '50-70', '70-90', '90-120', '120+']
const KJ_LEVELS = ['Very low', 'Low', 'Moderate', 'High', 'Very high', 'Extreme']

const SETTINGS_DOTS: Record<string, { color: string; label: string }> = {
  integrations: { color: DOT_COLORS.green, label: 'Integrations' },
  zones: { color: DOT_COLORS.blue, label: 'Zones' },
  gut: { color: DOT_COLORS.lime, label: 'Gut Training' },
  dietary: { color: DOT_COLORS.lime, label: 'Dietary' },
  coach: { color: DOT_COLORS.lilac, label: 'Coach' },
  appearance: { color: DOT_COLORS.orange, label: 'Appearance' },
  notifications: { color: DOT_COLORS.orange, label: 'Notifications' },
  email: { color: DOT_COLORS.orange, label: 'Email' },
  beta: { color: DOT_COLORS.violet, label: 'Beta' },
  support: { color: DOT_COLORS.accent, label: 'Support' },
  general: { color: DOT_COLORS.accent, label: 'General' },
  shortcuts: { color: DOT_COLORS.accent, label: 'Shortcuts' },
  changelog: { color: DOT_COLORS.blue, label: 'Changelog' },
  sharing: { color: DOT_COLORS.cyan, label: 'Sharing' },
  data: { color: DOT_COLORS.lilac, label: 'Data & Privacy' },
  advanced: { color: DOT_COLORS.slate, label: 'Advanced' },
  account: { color: DOT_COLORS.accent, label: 'Account' },
}

const NUTRIENT_LABELS: Record<string, string> = {
  cho: 'CHO',
  protein: 'Protein',
  fat: 'Fat',
  fiber: 'Fiber',
  fluid: 'Fluid',
  sodium: 'Sodium',
  caffeine: 'Caffeine',
  alcohol: 'Alcohol',
}

const SIGNAL_LABELS: Record<string, string> = {
  power: 'Power',
  hr: 'Heart Rate',
  cadence: 'Cadence',
  speed: 'Speed',
  altitude: 'Altitude',
  temperature: 'Temperature',
  cho: 'CHO intake',
  fluid: 'Fluid',
}

/* ─── Helpers ─── */
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

/* ─── Reusable mini-components ─── */

function SectionHeader({ children, sub }: { children: React.ReactNode; sub?: string }) {
  return (
    <div className="mb-4 mt-10 first:mt-0">
      <h2 className="font-label text-[10px] font-[550] uppercase text-text-tertiary">
        {children}
      </h2>
      {sub && <p className="mt-1 text-[11px] leading-relaxed text-text-muted">{sub}</p>}
    </div>
  )
}

function ColorSwatch({
  color,
  label,
  hex,
  sub,
  size = 'md',
}: {
  color: string
  label: string
  hex?: string
  sub?: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const dims = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-16 h-16' }
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className={`${dims[size]} rounded-lg`}
        style={{ backgroundColor: color, border: `1px solid ${hexToRgba(color, 0.3)}` }}
      />
      <span className="font-label text-[8px] font-[500] uppercase text-text-tertiary">
        {label}
      </span>
      {hex !== undefined && (
        <span className="font-space text-[8px] text-text-muted">{hex || color}</span>
      )}
      {sub && <span className="text-[8px] text-text-subtle">{sub}</span>}
    </div>
  )
}

function ZoneStrip({ colors, height = 6 }: { colors: readonly string[]; height?: number }) {
  return (
    <div className="flex gap-px overflow-hidden rounded-sm" style={{ height }}>
      {colors.map((c, i) => (
        <div key={i} className="flex-1" style={{ backgroundColor: c }} />
      ))}
    </div>
  )
}

function ZoneBandPreview({ colors, labels }: { colors: readonly string[]; labels: readonly string[] }) {
  return (
    <div className="relative overflow-hidden rounded-lg" style={{ backgroundColor: CANVAS, height: 120 }}>
      {/* Zone bands at 8% opacity */}
      <div className="absolute inset-0 flex">
        {colors.map((c, i) => (
          <div key={i} className="flex-1" style={{ backgroundColor: hexToRgba(c, ZONE_FILL_OPACITY.band) }} />
        ))}
      </div>
      {/* Zone labels */}
      <div className="absolute inset-0 flex">
        {colors.map((c, i) => (
          <div key={i} className="flex flex-1 flex-col items-center justify-end pb-2">
            <span className="font-space text-[7px] font-[500]" style={{ color: c }}>
              Z{i + 1}
            </span>
            <span className="font-label text-[6px] uppercase text-text-muted">
              {labels[i]}
            </span>
          </div>
        ))}
      </div>
      {/* Simulated power line */}
      <svg className="absolute inset-0" viewBox="0 0 600 120" preserveAspectRatio="none">
        <path
          d="M0,80 C50,75 80,60 120,55 C160,50 180,40 220,65 C260,90 280,35 320,30 C360,25 380,50 420,45 C460,40 490,70 540,55 C570,45 590,50 600,48"
          fill="none"
          stroke={SIGNAL_COLORS.power}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  )
}

function MonochromeRamp({
  colors,
  names,
  ranges,
  title,
}: {
  colors: readonly string[]
  names: readonly string[]
  ranges: string[]
  title: string
}) {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2">
        <ZoneStrip colors={colors} height={4} />
        <span className="font-label shrink-0 text-[8px] font-[500] uppercase text-text-muted">
          {title}
        </span>
      </div>
      <div className="grid grid-cols-6 gap-1">
        {colors.map((c, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div
              className="h-10 w-full rounded-md"
              style={{ backgroundColor: c }}
            />
            <span className="font-space text-[7px] font-[550]" style={{ color: c }}>
              {i + 1}
            </span>
            <span className="font-label text-[6.5px] uppercase text-text-muted">
              {names[i]}
            </span>
            <span className="font-space text-[7px] text-text-subtle">{ranges[i]}</span>
            <span className="font-space text-[6.5px] text-text-ghost">{c}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function DualAxisChart() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border" style={{ backgroundColor: CARD, height: 140 }}>
      <svg className="absolute inset-0" viewBox="0 0 600 140" preserveAspectRatio="none">
        {/* Power line */}
        <path
          d="M0,90 C40,85 80,60 140,55 C200,50 220,35 280,65 C340,95 360,30 420,28 C480,26 520,55 560,48 L600,45"
          fill="none"
          stroke={SIGNAL_COLORS.power}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {/* HR line */}
        <path
          d="M0,100 C40,95 100,80 160,78 C220,76 240,70 300,72 C360,74 380,62 440,58 C500,54 540,60 600,56"
          fill="none"
          stroke={SIGNAL_COLORS.hr}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          opacity={0.8}
        />
        {/* Cadence line */}
        <path
          d="M0,70 C60,68 100,72 160,66 C220,60 280,68 340,64 C400,60 460,66 520,62 L600,64"
          fill="none"
          stroke={SIGNAL_COLORS.cadence}
          strokeWidth="1.5"
          vectorEffect="non-scaling-stroke"
          opacity={0.7}
          strokeDasharray="4 2"
        />
      </svg>
      {/* Legend */}
      <div className="absolute right-3 top-2 flex gap-3">
        {(['power', 'hr', 'cadence'] as const).map((k) => (
          <div key={k} className="flex items-center gap-1">
            <div className="h-0.5 w-3 rounded-full" style={{ backgroundColor: SIGNAL_COLORS[k] }} />
            <span className="font-label text-[7px] uppercase text-text-muted">
              {k === 'hr' ? 'HR' : k.charAt(0).toUpperCase() + k.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function ComparisonChart() {
  const paths = [
    'M0,80 C80,70 160,55 240,60 C320,65 400,45 480,50 L600,48',
    'M0,90 C80,85 160,70 240,72 C320,74 400,58 480,62 L600,58',
    'M0,75 C80,68 160,80 240,55 C320,48 400,65 480,58 L600,55',
    'M0,95 C80,88 160,75 240,80 C320,78 400,68 480,72 L600,65',
  ]
  return (
    <div className="relative overflow-hidden rounded-lg border border-border" style={{ backgroundColor: CARD, height: 120 }}>
      <svg className="absolute inset-0" viewBox="0 0 600 120" preserveAspectRatio="none">
        {paths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={COMPARISON_COLORS[i]}
            strokeWidth={i === 0 ? '2' : '1.5'}
            vectorEffect="non-scaling-stroke"
            opacity={i === 0 ? 1 : 0.75}
          />
        ))}
      </svg>
      <div className="absolute bottom-2 left-3 flex gap-2">
        {['Current', 'Last week', 'Avg 30d', '90d ago'].map((l, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="h-0.5 w-3 rounded-full" style={{ backgroundColor: COMPARISON_COLORS[i] }} />
            <span className="font-space text-[7px] text-text-muted">{l}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function NutrientPie() {
  const data = [
    { key: 'cho', pct: 55 },
    { key: 'fat', pct: 20 },
    { key: 'protein', pct: 15 },
    { key: 'fiber', pct: 5 },
    { key: 'fluid', pct: 3 },
    { key: 'caffeine', pct: 2 },
  ]
  const colors = data.map((d) => NUTRIENT_COLORS[d.key as keyof typeof NUTRIENT_COLORS])
  let cumAngle = -90
  const radius = 50
  const cx = 60
  const cy = 60

  return (
    <div className="flex items-center gap-6">
      <svg width="120" height="120" viewBox="0 0 120 120">
        {data.map((d, i) => {
          const startAngle = cumAngle
          const sweep = (d.pct / 100) * 360
          cumAngle += sweep
          const startRad = (startAngle * Math.PI) / 180
          const endRad = ((startAngle + sweep) * Math.PI) / 180
          const x1 = cx + radius * Math.cos(startRad)
          const y1 = cy + radius * Math.sin(startRad)
          const x2 = cx + radius * Math.cos(endRad)
          const y2 = cy + radius * Math.sin(endRad)
          const large = sweep > 180 ? 1 : 0
          return (
            <path
              key={i}
              d={`M${cx},${cy} L${x1},${y1} A${radius},${radius} 0 ${large} 1 ${x2},${y2} Z`}
              fill={colors[i]}
              stroke={CARD}
              strokeWidth="1.5"
            />
          )
        })}
        <circle cx={cx} cy={cy} r={22} fill={CARD} />
      </svg>
      <div className="flex flex-col gap-1">
        {data.map((d, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: colors[i] }} />
            <span className="font-label text-[8px] uppercase text-text-tertiary">
              {NUTRIENT_LABELS[d.key]}
            </span>
            <span className="font-space text-[8px] text-text-muted">{d.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SettingsDotsPanel() {
  const [active, setActive] = useState('integrations')
  return (
    <div
      className="flex overflow-hidden rounded-lg border border-border"
      style={{ backgroundColor: CANVAS, minHeight: 340 }}
    >
      {/* Sidebar */}
      <div className="w-[170px] shrink-0 border-r border-border p-3">
        <div className="mb-3 font-serif text-[15px] text-text-primary">Settings</div>
        <div className="flex flex-col gap-0.5">
          {Object.entries(SETTINGS_DOTS).map(([id, { color, label }]) => {
            const isActive = active === id
            return (
              <button
                key={id}
                onClick={() => setActive(id)}
                className="flex items-center gap-2 rounded-md px-2 py-1.5 text-left text-[10.5px] font-[500]"
                style={{
                  backgroundColor: isActive ? hexToRgba(ACCENT, 0.12) : 'transparent',
                  color: isActive ? ACCENT : TEXT.tertiary,
                }}
              >
                <div
                  className="h-[6px] w-[6px] shrink-0 rounded-sm"
                  style={{ backgroundColor: color }}
                />
                {label}
              </button>
            )
          })}
        </div>
      </div>
      {/* Content area */}
      <div className="flex-1 p-4">
        <div className="flex items-center gap-2 mb-3">
          <div
            className="h-2 w-2 rounded-sm"
            style={{ backgroundColor: SETTINGS_DOTS[active].color }}
          />
          <span className="font-label text-[9px] font-[550] uppercase text-text-secondary">
            {active}
          </span>
        </div>
        {/* Toggle examples */}
        <div className="rounded-lg border border-border bg-elevated p-3">
          {['Auto-sync on open', 'Background webhooks', 'Push notifications'].map((l, i) => (
            <div key={i} className="flex items-center justify-between py-2" style={{ borderTop: i > 0 ? `1px solid ${hexToRgba('#000', 0.04)}` : 'none' }}>
              <span className="text-[11px] font-[500] text-text-primary">{l}</span>
              <div
                className="relative h-[20px] w-[36px] rounded-full"
                style={{ backgroundColor: i < 2 ? ACCENT : '#F3F1EC', border: `1px solid ${i < 2 ? ACCENT : BORDER}` }}
              >
                <div
                  className="absolute top-[2px] h-[14px] w-[14px] rounded-full bg-white"
                  style={{ left: i < 2 ? 18 : 2, boxShadow: '0 1px 3px rgba(0,0,0,0.12)' }}
                />
              </div>
            </div>
          ))}
        </div>
        {/* Accent button + badges */}
        <div className="mt-3 flex items-center gap-2">
          <button
            className="rounded-md px-3 py-1.5 text-[10px] font-[550] text-white"
            style={{ backgroundColor: ACCENT }}
          >
            Save Changes
          </button>
          <span
            className="rounded-md px-2 py-0.5 font-space text-[8px] font-[550]"
            style={{ backgroundColor: hexToRgba(SUCCESS, 0.12), color: SUCCESS }}
          >
            Connected
          </span>
          <span
            className="rounded-md px-2 py-0.5 font-space text-[8px] font-[550]"
            style={{ backgroundColor: hexToRgba(DANGER, 0.12), color: DANGER }}
          >
            Allergen
          </span>
          <span
            className="rounded-md px-2 py-0.5 font-space text-[8px] font-[550]"
            style={{ backgroundColor: hexToRgba(WARNING, 0.12), color: WARNING }}
          >
            Beta
          </span>
        </div>
      </div>
    </div>
  )
}

/* ─── Atmosphere Card ─── */
function AtmosphereCard() {
  return (
    <div className="grid grid-cols-2 gap-3">
      {/* Dark card */}
      <div className="overflow-hidden rounded-lg" style={{ background: `linear-gradient(135deg, ${ATM.deepNavy}, ${ATM.navy})`, padding: 20 }}>
        <div className="font-serif text-[18px] leading-tight" style={{ color: ATM.creamYellow }}>
          Letters
        </div>
        <p className="mt-2 text-[10px] leading-relaxed" style={{ color: hexToRgba(ATM.offWhite, 0.6) }}>
          Ruth&rsquo;s atmosphere layer. Reserved for immersive, editorial contexts.
        </p>
        <div className="mt-3 flex gap-2">
          <div className="h-6 w-6 rounded-md" style={{ backgroundColor: ATM.aubergine }} />
          <div className="h-6 w-6 rounded-md" style={{ backgroundColor: ATM.magenta }} />
          <div className="h-6 w-6 rounded-md" style={{ backgroundColor: ATM.blush }} />
          <div className="h-6 w-6 rounded-md" style={{ backgroundColor: ATM.creamYellow }} />
        </div>
      </div>
      {/* Light card */}
      <div className="overflow-hidden rounded-lg" style={{ background: `linear-gradient(135deg, ${ATM.offWhite}, ${ATM.blush}40)`, padding: 20, border: `1px solid ${BORDER}` }}>
        <div className="font-serif text-[18px] leading-tight" style={{ color: ATM.aubergine }}>
          Editorial
        </div>
        <p className="mt-2 text-[10px] leading-relaxed" style={{ color: TEXT.tertiary }}>
          Landing pages, hero cards. Never used as data colors in the app.
        </p>
        <div className="mt-3 flex gap-2">
          <div className="h-6 w-6 rounded-md" style={{ backgroundColor: ATM.navy }} />
          <div className="h-6 w-6 rounded-md" style={{ backgroundColor: ATM.deepNavy }} />
          <div className="h-6 w-6 rounded-md" style={{ backgroundColor: ATM.magenta }} />
          <div className="h-6 w-6 rounded-md" style={{ backgroundColor: ATM.offWhite, border: `1px solid ${BORDER}` }} />
        </div>
      </div>
    </div>
  )
}

/* ─── Text hierarchy visual ─── */
function TextHierarchy() {
  const levels: [string, string, string][] = [
    ['primary', TEXT.primary, 'var(--n1150)'],
    ['secondary', TEXT.secondary, '#2A2826'],
    ['tertiary', TEXT.tertiary, '#5C5A55'],
    ['muted', TEXT.muted, '#8A8780'],
    ['subtle', TEXT.subtle, '#B5B2AB'],
    ['ghost', TEXT.ghost, '#D4D1CA'],
  ]
  return (
    <div className="flex flex-col gap-1">
      {levels.map(([name, color, hex]) => (
        <div key={name} className="flex items-center gap-3">
          <div className="w-[52px] font-label text-[8px] uppercase text-text-muted">
            {name}
          </div>
          <span className="text-[12px] font-[500]" style={{ color }}>
            The quick brown fox — {hex}
          </span>
        </div>
      ))}
    </div>
  )
}

/* ═══ PAGE ═══ */

export default function ColorSystemPage() {
  return (
    <div className="min-h-screen bg-canvas">
      {/* ── Header ── */}
      <header className="border-b border-border px-6 py-5">
        <div className="mx-auto max-w-[1100px]">
          <div className="flex items-baseline gap-3">
            <h1 className="font-serif text-[22px] text-text-primary">RAMTT Color System</h1>
            <span className="font-space text-[10px] font-[500] text-text-muted">v2</span>
            <span className="font-space text-[9px] text-text-subtle">6 April 2026</span>
          </div>
          <p className="mt-1.5 text-[11px] leading-relaxed text-text-tertiary">
            Color is reserved for data. The UI is monochrome sand/black. When color appears, it means something.
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-[1100px] px-6 pb-20 pt-6">
        {/* ━━━━ ACCENT & STATUS ━━━━ */}
        <SectionHeader sub="Primary accent: Fuchsia 950. Status colors for semantic meaning.">
          01 — Accent & Status
        </SectionHeader>

        <div className="grid grid-cols-2 gap-6">
          {/* Accent */}
          <div className="rounded-lg border border-border bg-elevated p-4">
            <div className="mb-3 font-label text-[8px] font-[550] uppercase text-text-muted">
              Accent
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <div className="h-14 w-14 rounded-lg" style={{ backgroundColor: ACCENT }} />
                <span className="font-space text-[8px] text-text-muted">#4A044E</span>
                <span className="font-label text-[7px] uppercase text-text-subtle">
                  Fuchsia 950
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="flex items-center gap-2">
                  <div className="h-8 flex-1 rounded-md" style={{ backgroundColor: ACCENT + '12' }} />
                  <span className="w-8 font-space text-[7px] text-text-subtle">7%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 flex-1 rounded-md" style={{ backgroundColor: ACCENT + '20' }} />
                  <span className="w-8 font-space text-[7px] text-text-subtle">12%</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-8 flex-1 rounded-md" style={{ backgroundColor: ACCENT }} />
                  <span className="w-8 font-space text-[7px] text-text-subtle">100%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div className="rounded-lg border border-border bg-elevated p-4">
            <div className="mb-3 font-label text-[8px] font-[550] uppercase text-text-muted">
              Status
            </div>
            <div className="grid grid-cols-4 gap-3">
              {([
                ['Danger', DANGER, '#CA054D', 'Rosewood'],
                ['Warning', WARNING, '#D97706', 'Amber'],
                ['Success', SUCCESS, '#16A34A', 'Green-600'],
                ['Info', INFO, '#0891B2', 'Bondi'],
              ] as const).map(([label, color, hex, name]) => (
                <div key={label} className="flex flex-col items-center gap-1.5">
                  <div className="h-10 w-full rounded-md" style={{ backgroundColor: color }} />
                  <span className="font-label text-[8px] font-[500] uppercase text-text-tertiary">
                    {label}
                  </span>
                  <span className="font-space text-[7px] text-text-muted">{hex}</span>
                  <span className="text-[7px] text-text-subtle">{name}</span>
                  {/* Badge preview */}
                  <span
                    className="mt-1 rounded-md px-2 py-0.5 font-space text-[7px] font-[550]"
                    style={{ backgroundColor: hexToRgba(color, 0.12), color }}
                  >
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ━━━━ POWER ZONES ━━━━ */}
        <SectionHeader sub="Polychromatic. Maximum hue separation. Each zone instantly distinguishable.">
          02 — Power Zones
        </SectionHeader>

        <div className="rounded-lg border border-border bg-elevated p-5">
          {/* Zone strip */}
          <div className="mb-4">
            <ZoneStrip colors={POWER_ZONES} height={6} />
          </div>

          {/* Swatches */}
          <div className="mb-5 grid grid-cols-6 gap-2">
            {POWER_ZONES.map((c, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5">
                <div className="h-12 w-full rounded-md" style={{ backgroundColor: c }} />
                <div className="flex items-center gap-1">
                  <span className="font-space text-[9px] font-[550] text-text-secondary">Z{i + 1}</span>
                  <span className="font-label text-[8px] uppercase text-text-muted">
                    {POWER_ZONE_NAMES[i]}
                  </span>
                </div>
                <span className="font-space text-[7px] text-text-subtle">{c}</span>
                {/* Vivid dot */}
                <div className="flex items-center gap-1">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: POWER_ZONES_VIVID[i] }} />
                  <span className="font-space text-[6.5px] text-text-ghost">{POWER_ZONES_VIVID[i]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Band preview */}
          <div className="mb-3 font-label text-[8px] font-[550] uppercase text-text-muted">
            Chart bands at 8% opacity on sand canvas
          </div>
          <ZoneBandPreview colors={POWER_ZONES} labels={POWER_ZONE_NAMES} />

          {/* Badge row */}
          <div className="mt-4 flex gap-2">
            {POWER_ZONES.map((c, i) => (
              <span
                key={i}
                className="rounded-md px-2 py-0.5 font-space text-[8px] font-[550]"
                style={{ backgroundColor: hexToRgba(c, ZONE_FILL_OPACITY.badge), color: POWER_ZONES_VIVID[i] }}
              >
                Z{i + 1} {POWER_ZONE_NAMES[i]}
              </span>
            ))}
          </div>
        </div>

        {/* ━━━━ MONOCHROME ZONE RAMPS ━━━━ */}
        <SectionHeader sub="Single-hue ramps. HR = red, CHO = orange/amber, kJ = green. Lightness is the only variable.">
          03 — Monochrome Zone Systems
        </SectionHeader>

        <div className="grid gap-5">
          {/* HR Zones */}
          <div className="rounded-lg border border-border bg-elevated p-5">
            <MonochromeRamp
              colors={HR_ZONES}
              names={HR_ZONE_NAMES}
              ranges={HR_RANGES}
              title="Heart Rate — Red"
            />
          </div>

          {/* CHO Zones */}
          <div className="rounded-lg border border-border bg-elevated p-5">
            <MonochromeRamp
              colors={CHO_ZONES}
              names={CHO_ZONE_NAMES}
              ranges={CHO_RATES.map((r) => `${r} g/h`)}
              title="CHO Intake — Orange/Amber"
            />
          </div>

          {/* kJ Zones */}
          <div className="rounded-lg border border-border bg-elevated p-5">
            <MonochromeRamp
              colors={KJ_ZONES}
              names={KJ_ZONE_NAMES}
              ranges={KJ_LEVELS}
              title="kJ / Energy — Green"
            />
          </div>
        </div>

        {/* ━━━━ ALL ZONE STRIPS ━━━━ */}
        <SectionHeader sub="Signature 6-color bars. Never share colors across zone types.">
          04 — Zone Strips Comparison
        </SectionHeader>

        <div className="rounded-lg border border-border bg-elevated p-5">
          <div className="grid gap-3">
            {([
              ['Power', POWER_ZONES],
              ['Heart Rate', HR_ZONES],
              ['CHO', CHO_ZONES],
              ['kJ / Energy', KJ_ZONES],
            ] as const).map(([label, colors]) => (
              <div key={label} className="flex items-center gap-3">
                <span className="w-[70px] shrink-0 font-label text-[8px] uppercase text-text-muted">
                  {label}
                </span>
                <div className="flex-1">
                  <ZoneStrip colors={colors} height={8} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ━━━━ SIGNAL LINES ━━━━ */}
        <SectionHeader sub="Distinct colors at 1.5px stroke. Priority-ordered for multi-series charts.">
          05 — Signal Lines
        </SectionHeader>

        <div className="grid grid-cols-2 gap-5">
          {/* Color legend */}
          <div className="rounded-lg border border-border bg-elevated p-4">
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(SIGNAL_COLORS).map(([key, color]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className="h-[3px] w-6 rounded-full" style={{ backgroundColor: color }} />
                  <span className="font-label text-[8px] uppercase text-text-tertiary">
                    {SIGNAL_LABELS[key]}
                  </span>
                  <span className="font-space text-[7px] text-text-subtle">{color}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Dual axis chart */}
          <DualAxisChart />
        </div>

        {/* ━━━━ COMPARISON / OVERLAY ━━━━ */}
        <SectionHeader sub="Primary session = black. Comparisons use max-distinguishable colors.">
          06 — Comparison Overlay
        </SectionHeader>

        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-lg border border-border bg-elevated p-4">
            <div className="flex flex-wrap gap-2">
              {['A · Current', 'B · Steel Blue', 'C · Warm Orange', 'D · Violet', 'E · Teal', 'F · Rosewood'].map((l, i) => (
                <div key={i} className="flex items-center gap-1.5">
                  <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: COMPARISON_COLORS[i] }} />
                  <span className="font-label text-[8px] uppercase text-text-tertiary">
                    {l}
                  </span>
                  <span className="font-space text-[7px] text-text-ghost">{COMPARISON_COLORS[i]}</span>
                </div>
              ))}
            </div>
          </div>
          <ComparisonChart />
        </div>

        {/* ━━━━ NUTRIENTS ━━━━ */}
        <SectionHeader sub="Nutrition breakdowns, pie charts, stacked bars. CHO = Power Z4 (intentional link).">
          07 — Nutrient Colors
        </SectionHeader>

        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-lg border border-border bg-elevated p-4">
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(NUTRIENT_COLORS).map(([key, color]) => (
                <div key={key} className="flex flex-col items-center gap-1">
                  <div className="h-8 w-8 rounded-md" style={{ backgroundColor: color }} />
                  <span className="font-label text-[7px] uppercase text-text-tertiary">
                    {NUTRIENT_LABELS[key]}
                  </span>
                  <span className="font-space text-[6.5px] text-text-ghost">{color}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-elevated p-4">
            <NutrientPie />
          </div>
        </div>

        {/* ━━━━ SETTINGS DOTS ━━━━ */}
        <SectionHeader sub="9 dot families for navigation categories. Never used as zone colors.">
          08 — Settings Dot Palette
        </SectionHeader>

        <div className="mb-5 rounded-lg border border-border bg-elevated p-4">
          <div className="mb-3 flex flex-wrap gap-3">
            {Object.entries(DOT_COLORS).map(([name, color]) => (
              <div key={name} className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: color }} />
                <span className="font-label text-[8px] uppercase text-text-tertiary">
                  {name}
                </span>
                <span className="font-space text-[7px] text-text-ghost">{color}</span>
              </div>
            ))}
          </div>
          {/* Dot size test: 8×8, 6×6, 4×4 */}
          <div className="flex items-center gap-4">
            {[8, 6, 4].map((s) => (
              <div key={s} className="flex items-center gap-1">
                <span className="font-space text-[7px] text-text-subtle">{s}px</span>
                {Object.values(DOT_COLORS).map((c, i) => (
                  <div key={i} className="rounded-sm" style={{ width: s, height: s, backgroundColor: c }} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <SettingsDotsPanel />

        {/* ━━━━ TEXT HIERARCHY ━━━━ */}
        <SectionHeader sub="Six levels from primary to ghost. All on sand canvas.">
          09 — Text Hierarchy
        </SectionHeader>

        <div className="rounded-lg border border-border bg-elevated p-5">
          <TextHierarchy />
        </div>

        {/* ━━━━ SURFACES ━━━━ */}
        <SectionHeader sub="Sand canvas → elevated white. Warm, never clinical.">
          10 — Surfaces & Borders
        </SectionHeader>

        <div className="rounded-lg border border-border bg-elevated p-5">
          <div className="flex gap-3">
            {([
              ['Canvas', CANVAS, 'var(--bg)'],
              ['Elevated', CARD, '#FFFFFF'],
              ['Surface 1', '#F3F1EC', '#F3F1EC'],
              ['Surface 2', '#ECEAE4', '#ECEAE4'],
              ['Surface 3', '#E5E3DE', '#E5E3DE'],
            ] as const).map(([name, color, hex]) => (
              <div key={name} className="flex flex-1 flex-col items-center gap-1.5">
                <div
                  className="h-14 w-full rounded-lg"
                  style={{ backgroundColor: color, border: `1px solid ${BORDER}` }}
                />
                <span className="font-label text-[8px] uppercase text-text-tertiary">
                  {name}
                </span>
                <span className="font-space text-[7px] text-text-muted">{hex}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ━━━━ COMPONENT TINTING ━━━━ */}
        <SectionHeader sub="Whisper (4%), Tint (10%), Wash (20%) — applied to any chromatic color.">
          11 — Component Tinting
        </SectionHeader>

        <div className="rounded-lg border border-border bg-elevated p-5">
          <div className="grid grid-cols-4 gap-3">
            {[POWER_ZONES[0], POWER_ZONES[4], ACCENT, SUCCESS].map((color, ci) => (
              <div key={ci} className="flex flex-col gap-2">
                <div className="mb-1 flex items-center gap-1">
                  <div className="h-2 w-2 rounded-sm" style={{ backgroundColor: color }} />
                  <span className="font-space text-[7px] text-text-muted">{color}</span>
                </div>
                {([
                  ['Whisper', 0.04, 0.08],
                  ['Tint', 0.10, 0.18],
                  ['Wash', 0.20, 0.30],
                ] as const).map(([name, bgA, borderA]) => (
                  <div
                    key={name}
                    className="rounded-md px-3 py-2"
                    style={{
                      backgroundColor: hexToRgba(color, bgA),
                      border: `1px solid ${hexToRgba(color, borderA)}`,
                    }}
                  >
                    <span className="font-label text-[7px] uppercase" style={{ color }}>
                      {name} · {Math.round(bgA * 100)}% bg / {Math.round(borderA * 100)}% border
                    </span>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* ━━━━ ATMOSPHERE ━━━━ */}
        <SectionHeader sub="Ruth's palette. Landing pages, hero cards, Letters. NEVER in app UI.">
          12 — Atmosphere Layer
        </SectionHeader>

        <AtmosphereCard />

        {/* ━━━━ MIGRATION DIFF ━━━━ */}
        <SectionHeader sub="Changes from v1 to v2.">
          13 — Migration from v1
        </SectionHeader>

        <div className="rounded-lg border border-border bg-elevated p-5">
          <div className="grid gap-2">
            {([
              ['Accent', '#9D174D', '#4A044E', 'Rose 800 → Fuchsia 950'],
              ['Danger', '#DC2626', '#CA054D', 'Red 600 → Rosewood'],
              ['Power Z1', '#7CA3BE', '#5C97CB', 'Slightly more saturated'],
              ['Power Z5', '#E83B52', '#D4365C', 'Deeper rose, less neon'],
            ] as const).map(([name, old, now, note]) => (
              <div key={name} className="flex items-center gap-3">
                <span className="w-[65px] shrink-0 font-label text-[8px] uppercase text-text-muted">
                  {name}
                </span>
                <div className="h-6 w-6 rounded-md" style={{ backgroundColor: old }} />
                <span className="font-space text-[8px] text-text-ghost">{old}</span>
                <span className="text-[9px] text-text-subtle">→</span>
                <div className="h-6 w-6 rounded-md" style={{ backgroundColor: now }} />
                <span className="font-space text-[8px] text-text-muted">{now}</span>
                <span className="text-[9px] text-text-subtle">{note}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 font-label text-[8px] font-[550] uppercase text-text-muted">
            Added in v2
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {[
              'HR Zones (6, red)',
              'CHO Zones (6, orange)',
              'kJ Zones (6, green)',
              'Cadence signal',
              'Speed signal',
              'Comparison slots',
              'Atmosphere layer',
              'Text ghost + subtle',
              'Surface 3',
            ].map((item) => (
              <span
                key={item}
                className="rounded-md bg-surface-1 px-2 py-0.5 font-space text-[8px] text-text-tertiary"
              >
                + {item}
              </span>
            ))}
          </div>
        </div>

        {/* ━━━━ FOOTER ━━━━ */}
        <div className="mt-12 border-t border-border pt-4">
          <p className="text-[10px] leading-relaxed text-text-subtle">
            RAMTT Color System v2. Designed 6 April 2026. Canvas var(--bg). All colors oklch-derived, hex-implemented.
          </p>
        </div>
      </main>
    </div>
  )
}
