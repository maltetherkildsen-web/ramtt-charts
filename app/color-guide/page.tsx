'use client'

import { useState, useEffect, useRef } from 'react'
import {
  Badge, Card, MetricCard, DataRow, ProgressBar, SectionHeader, ToggleGroup, DataTable, Button,
  cn, FONT, WEIGHT, LABEL_STYLE, VALUE_STYLE, MUTED_STYLE, BODY_STYLE, QUIET_STYLE, UNIT_STYLE,
  BORDER, RADIUS, TRANSITION, HOVER_SAND, ACTIVE_SAND, ACTIVE_BLACK, WHITE_LIFT, ACTIVE_UNDERLINE, FOCUS_RING,
  LAYOUT,
} from '@/components/ui'

/* ═══════════════════════════════════════════════════════════════════
   RAMTT Visual Color Guide — for Ruth
   ═══════════════════════════════════════════════════════════════════ */

// ── Color data ──

// Neutral scale — hex values are DATA shown to Ruth, not UI chrome.
// audit-ui: ignore-hardcoded-hex
const NEUTRALS = [
  { token: '--bg', cssVar: 'var(--bg)', label: 'Canvas' },
  { token: '--n50', cssVar: 'var(--n50)', label: 'Elevated' },
  { token: '--n200', cssVar: 'var(--n200)', label: 'Hover' },
  { token: '--n400', cssVar: 'var(--n400)', label: 'Border' },
  { token: '--n600', cssVar: 'var(--n600)', label: 'Muted' },
  { token: '--n800', cssVar: 'var(--n800)', label: 'Secondary' },
  { token: '--n1050', cssVar: 'var(--n1050)', label: 'Strong' },
  { token: '--n1150', cssVar: 'var(--n1150)', label: 'Primary' },
]

// Display hex values for Ruth's reference (not used as styling values)
const NEUTRAL_HEX: Record<string, string> = {
  '--bg': '#FAF9\u200BF5', '--n50': '#FDFC\u200BFA', '--n200': '#F2F0\u200BEA', '--n400': '#E8E5\u200BDC',
  '--n600': '#7672\u200B6A', '--n800': '#6B67\u200B60', '--n1050': '#3836\u200B33', '--n1150': '#1312\u200B11',
}

const POWER_ZONES_COGGAN = [
  { zone: 'Z1', label: 'Recovery', range: '0-55%', hex: '#94a3b8' },
  { zone: 'Z2', label: 'Endurance', range: '55-75%', hex: '#22c55e' },
  { zone: 'Z3', label: 'Tempo', range: '75-90%', hex: '#eab308' },
  { zone: 'Z4', label: 'Threshold', range: '90-105%', hex: '#f97316' },
  { zone: 'Z5', label: 'VO2max', range: '105-120%', hex: '#ef4444' },
  { zone: 'Z6', label: 'Anaerobic', range: '>120%', hex: '#dc2626' },
]

const POWER_ZONES_ALT = [
  { zone: 'Z1', label: 'Recovery', hex: '#7CA3BE' },
  { zone: 'Z2', label: 'Endurance', hex: '#14B8A2' },
  { zone: 'Z3', label: 'Tempo', hex: '#E8B020' },
  { zone: 'Z4', label: 'Threshold', hex: '#E36B30' },
  { zone: 'Z5', label: 'VO2max', hex: '#E83B52' },
  { zone: 'Z6', label: 'Anaerobic', hex: '#9B40E8' },
]

const CHO_ZONES = [
  { zone: 'Z1', label: 'Minimal', range: '<30 g/h', hex: '#94a3b8' },
  { zone: 'Z2', label: 'Low', range: '30-50 g/h', hex: '#67b7d1' },
  { zone: 'Z3', label: 'Moderate', range: '50-70 g/h', hex: '#3b9fc9' },
  { zone: 'Z4', label: 'High', range: '70-90 g/h', hex: '#1a85b8' },
  { zone: 'Z5', label: 'Very high', range: '90-110 g/h', hex: '#0e6fa0' },
  { zone: 'Z6', label: 'Extreme', range: '>110 g/h', hex: '#085a87' },
]

const SEMANTICS = [
  { key: 'positive', label: 'Positive', full: '#84cc16', soft: '#f7fee7', onSoft: '#4d7c0f', usage: 'Compliant, improving, on track, saved' },
  { key: 'negative', label: 'Negative', full: '#f43f5e', soft: '#fff1f2', onSoft: '#be123c', usage: 'Missed, declining, error, critical' },
  { key: 'warning', label: 'Warning', full: '#f59e0b', soft: '#fffbeb', onSoft: '#b45309', usage: 'GI risk, caution, partial compliance' },
  { key: 'info', label: 'Info', full: '#0ea5e9', soft: '#f0f9ff', onSoft: '#0369a1', usage: 'Stable trend, informational, neutral signal' },
]

const CHART_SERIES = [
  { label: 'Serie 1', hex: '#3b82f6' },
  { label: 'Serie 2', hex: '#10b981' },
  { label: 'Serie 3', hex: '#f59e0b' },
  { label: 'Serie 4', hex: '#8b5cf6' },
  { label: 'Serie 5', hex: '#f43f5e' },
  { label: 'Serie 6', hex: '#06b6d4' },
]

const REGULATORS = [
  { label: 'Metabolic', hex: '#E8913A' },
  { label: 'Neural', hex: '#7B68EE' },
  { label: 'Peripheral', hex: '#2AAA8A' },
]

const NUTRIENTS = [
  { label: 'CHO', hex: '#f97316' },
  { label: 'Fluid', hex: '#2AACCC' },
  { label: 'Sodium', hex: '#8B5CF6' },
  { label: 'Caffeine', hex: '#059669' },
]

const PHASES = [
  { label: 'Base', hex: '#94a3b8', width: 22 },
  { label: 'Build', hex: '#3b82f6', width: 20 },
  { label: 'Peak', hex: '#f59e0b', width: 15 },
  { label: 'Taper', hex: '#10b981', width: 12 },
  { label: 'Race', hex: '#ef4444', width: 8 },
  { label: 'Transition', hex: '#a78bfa', width: 23 },
]

const DAY_TYPES = [
  { label: 'Rest', hex: '#d1d5db' },
  { label: 'Easy', hex: '#86efac' },
  { label: 'Moderate', hex: '#fde68a' },
  { label: 'Hard', hex: '#fca5a5' },
  { label: 'Carb load', hex: '#fdba74' },
  { label: 'Race', hex: '#f87171' },
]

const INTENTS = [
  { label: 'Recovery', hex: '#94a3b8' },
  { label: 'Endurance', hex: '#22c55e' },
  { label: 'Tempo', hex: '#eab308' },
  { label: 'Threshold', hex: '#f97316' },
  { label: 'VO2max', hex: '#ef4444' },
  { label: 'Race', hex: '#dc2626' },
  { label: 'Test', hex: '#8b5cf6' },
]

const BRAND = [
  { label: 'Near black', hex: '#050A30' },
  { label: 'Electric blue', hex: '#0230E0' },
  { label: 'Aubergine', hex: '#470426' },
  { label: 'Deep magenta', hex: '#96004D' },
  { label: 'Soft orchid', hex: '#FFC9FE' },
  { label: 'Cream', hex: '#FFFEF7' },
  { label: 'Lemon cream', hex: '#FFFFD0' },
]

const CO_VIS_SCREENS = [
  'Session detail', 'Capacity chart', 'Today', 'Calendar', 'Fuel daily',
  'Race plan', 'Settings', 'Share card',
]
const CO_VIS_GROUPS = ['Power zones', 'CHO zones', 'Semantic', 'Chart series', 'Regulators', 'Nutrients', 'Phases', 'Day types', 'Brand']
const CO_VIS_MAP: Record<string, string[]> = {
  'Session detail': ['Power zones', 'CHO zones', 'Semantic', 'Chart series', 'Nutrients'],
  'Capacity chart': ['Semantic', 'Chart series'],
  'Today': ['Power zones', 'Semantic', 'Regulators', 'Nutrients'],
  'Calendar': ['Power zones', 'Semantic', 'Phases', 'Day types'],
  'Fuel daily': ['CHO zones', 'Semantic', 'Nutrients'],
  'Race plan': ['Power zones', 'CHO zones', 'Semantic', 'Nutrients', 'Phases'],
  'Settings': ['Semantic'],
  'Share card': ['Brand', 'Power zones'],
}

const SECTIONS = [
  { id: 'foundation', label: '0. Locked foundation' },
  { id: 'power-zones', label: '1. Power / HR zones' },
  { id: 'cho-zones', label: '2. CHO zones' },
  { id: 'semantics', label: '3. Semantic colors' },
  { id: 'chart-series', label: '4. Chart series' },
  { id: 'regulators', label: '5. Regulators' },
  { id: 'nutrients', label: '6. Nutrient accents' },
  { id: 'phases', label: '7. Training phases' },
  { id: 'day-types', label: '8. Day types + intent' },
  { id: 'cadence', label: '9. Cadence zones' },
  { id: 'energy', label: '10. kJ / energy' },
  { id: 'lower-priority', label: '11. Lower priority' },
  { id: 'brand', label: '12. Brand palette' },
  { id: 'flare', label: '13. Flare' },
  { id: 'co-visibility', label: '14. Co-visibility' },
  { id: 'summary', label: '15. Summary' },
]

// ── Helpers ──

function Swatch({ hex, size = 64, height = 48, round = false, className }: { hex: string; size?: number; height?: number; round?: boolean; className?: string }) {
  return (
    <div
      className={cn(round ? RADIUS.full : RADIUS.sm, BORDER.default, 'shrink-0', className)}
      style={{ width: size, height: round ? size : height, backgroundColor: hex }}
    />
  )
}

function SwatchLabel({ hex, label }: { hex: string; label?: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5 mt-1.5">
      <span className={cn(FONT.body, 'text-[11px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{hex}</span>
      {label && <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>{label}</span>}
    </div>
  )
}

function SwatchRow({ items, size = 64, height = 48, round = false }: { items: { hex: string; label?: string; sublabel?: string }[]; size?: number; height?: number; round?: boolean }) {
  return (
    <div className="flex flex-wrap gap-4">
      {items.map((item) => (
        <div key={item.hex + (item.label ?? '')} className="flex flex-col items-center">
          <Swatch hex={item.hex} size={size} height={height} round={round} />
          <SwatchLabel hex={item.hex} label={item.label} />
          {item.sublabel && <span className={cn(QUIET_STYLE, 'text-[10px]')}>{item.sublabel}</span>}
        </div>
      ))}
    </div>
  )
}

function InfoText({ children }: { children: React.ReactNode }) {
  return <p className={cn(MUTED_STYLE, 'text-[13px] mb-4 max-w-[65ch]')}>{children}</p>
}

function PlaceholderTag() {
  return <span className={cn(FONT.body, 'text-[10px]', WEIGHT.medium, 'text-[var(--n600)] bg-[var(--n200)] px-1 py-px', RADIUS.sm, 'ml-1.5')}>Placeholder</span>
}

function SectionAnchor({ id }: { id: string }) {
  return <div id={id} className="scroll-mt-8" />
}

function ColorDot({ hex, size = 8 }: { hex: string; size?: number }) {
  return <span className={RADIUS.full} style={{ display: 'inline-block', width: size, height: size, backgroundColor: hex, flexShrink: 0 }} />
}

// ── Main page ──

export default function ColorGuidePage() {
  const [activeSection, setActiveSection] = useState('foundation')
  const [toggleDemo, setToggleDemo] = useState('Power')
  const [underlineDemo, setUnderlineDemo] = useState('Day')

  // IntersectionObserver for sidebar highlight
  useEffect(() => {
    const observers: IntersectionObserver[] = []
    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id) },
        { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })
    return () => observers.forEach((o) => o.disconnect())
  }, [])

  return (
    <div className="flex min-h-screen bg-[var(--bg)]">
      {/* ── Sidebar ── */}
      <nav className="fixed left-0 top-0 h-screen w-[220px] border-r-[0.5px] border-r-[var(--n400)] bg-[var(--bg)] overflow-y-auto py-8 px-5 z-10">
        <div className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)] mb-6')}>Color guide</div>
        <ul className="flex flex-col gap-0.5 list-none m-0 p-0">
          {SECTIONS.map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                className={cn(
                  FONT.body, 'text-[12px] block py-1 px-2 no-underline',
                  RADIUS.sm, TRANSITION.background,
                  activeSection === id
                    ? cn(WEIGHT.strong, 'text-[var(--n1150)]', ACTIVE_SAND)
                    : cn(WEIGHT.normal, 'text-[var(--n800)]', HOVER_SAND),
                )}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── Main content ── */}
      <main className="ml-[220px] flex-1 py-10 px-10">
        <div className="max-w-[900px] mx-auto space-y-12">

          {/* ── Header ── */}
          <header className="mb-12">
            <h1 className={cn(FONT.body, 'text-[24px]', WEIGHT.strong, 'text-[var(--n1150)] mb-1')}>RAMTT Color Guide</h1>
            <p className={cn(FONT.body, 'text-[14px]', WEIGHT.book, 'text-[var(--n600)] mb-1')}>
              Alt der potentielt har farve. Placeholder-farver overalt. Ruth beslutter.
            </p>
            <span className={cn(FONT.body, 'text-[12px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>8. april 2026</span>
          </header>

          {/* ══════════════════════════════════════════════════════════
             SECTION 0: The Locked Foundation
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="foundation" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>0. The locked foundation</h2>
            <InfoText>Disse tokens er faste. De definerer RAMTTs visuelle identitet og kan ikke redigeres af Ruth. Alt UI bygges med denne neutrale skala.</InfoText>

            {/* 0.1 Neutral scale */}
            <div className="space-y-3">
              <SectionHeader>Neutral scale</SectionHeader>
              <div className="flex flex-wrap gap-3">
                {NEUTRALS.map((n) => (
                  <div key={n.token} className="flex flex-col items-center">
                    <div
                      className={cn(RADIUS.sm, BORDER.default, 'shrink-0')}
                      style={{ width: 64, height: 48, backgroundColor: n.cssVar }}
                    />
                    <div className="flex flex-col items-center gap-0.5 mt-1.5">
                      <span className={cn(FONT.body, 'text-[11px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{NEUTRAL_HEX[n.token]}</span>
                      <span className={cn(FONT.body, 'text-[10px]', WEIGHT.book, 'text-[var(--n800)]')}>{n.token}</span>
                      <span className={cn(FONT.body, 'text-[10px]', WEIGHT.normal, 'text-[var(--n600)]')}>{n.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 0.2 Interaction states */}
            <div className="space-y-3">
              <SectionHeader>Interaction states</SectionHeader>
              <div className="grid grid-cols-1 gap-3">
                <Card padding="sm">
                  <div className="flex items-center gap-4">
                    <span className={cn(LABEL_STYLE, 'w-[100px] shrink-0')}>Sand hover</span>
                    <div className={cn('flex-1 py-2 px-3', RADIUS.md, TRANSITION.background, HOVER_SAND, FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n1150)]')}>
                      Hover over denne r&aelig;kke
                    </div>
                  </div>
                </Card>
                <Card padding="sm">
                  <div className="flex items-center gap-4">
                    <span className={cn(LABEL_STYLE, 'w-[100px] shrink-0')}>Sand fill</span>
                    <ToggleGroup options={['Power', 'HR', 'Speed']} value={toggleDemo} onChange={(v) => setToggleDemo(v as string)} size="sm" />
                  </div>
                </Card>
                <Card padding="sm">
                  <div className="flex items-center gap-4">
                    <span className={cn(LABEL_STYLE, 'w-[100px] shrink-0')}>Black fill</span>
                    <Button variant="primary" size="sm">Primary action</Button>
                  </div>
                </Card>
                <Card padding="sm">
                  <div className="flex items-center gap-4">
                    <span className={cn(LABEL_STYLE, 'w-[100px] shrink-0')}>White lift</span>
                    <div className={cn('flex-1 py-2 px-3 bg-[var(--n50)]', RADIUS.md, BORDER.default, TRANSITION.background, WHITE_LIFT, FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n1150)]')}>
                      Hover over dette card
                    </div>
                  </div>
                </Card>
                <Card padding="sm">
                  <div className="flex items-center gap-4">
                    <span className={cn(LABEL_STYLE, 'w-[100px] shrink-0')}>Underline</span>
                    <ToggleGroup variant="underline" options={['Day', 'Week', 'Month']} value={underlineDemo} onChange={(v) => setUnderlineDemo(v as string)} size="sm" />
                  </div>
                </Card>
              </div>
            </div>

            {/* 0.3 Typography */}
            <div className="space-y-3">
              <SectionHeader>Typography weight hierarchy</SectionHeader>
              <Card>
                <div className="space-y-3">
                  <div className="flex items-baseline gap-3">
                    <span className={cn(FONT.body, 'text-[11px] tabular-nums w-[36px] shrink-0', WEIGHT.normal, 'text-[var(--n600)]')}>400</span>
                    <span className={cn(FONT.body, 'text-[14px]', WEIGHT.normal, 'text-[var(--n1150)]')}>Body text, navigation items, list content</span>
                  </div>
                  <div className={cn(BORDER.subtle, 'border-t-0 border-b border-l-0 border-r-0')} />
                  <div className="flex items-baseline gap-3">
                    <span className={cn(FONT.body, 'text-[11px] tabular-nums w-[36px] shrink-0', WEIGHT.normal, 'text-[var(--n600)]')}>450</span>
                    <span className={cn(FONT.body, 'text-[14px]', WEIGHT.book, 'text-[var(--n800)]')}>Units, metadata, secondary descriptions</span>
                  </div>
                  <div className={cn(BORDER.subtle, 'border-t-0 border-b border-l-0 border-r-0')} />
                  <div className="flex items-baseline gap-3">
                    <span className={cn(FONT.body, 'text-[11px] tabular-nums w-[36px] shrink-0', WEIGHT.normal, 'text-[var(--n600)]')}>500</span>
                    <span className={cn(FONT.body, 'text-[14px]', WEIGHT.medium, 'text-[var(--n1150)]')}>Badge text, form labels, buttons</span>
                  </div>
                  <div className={cn(BORDER.subtle, 'border-t-0 border-b border-l-0 border-r-0')} />
                  <div className="flex items-baseline gap-3">
                    <span className={cn(FONT.body, 'text-[11px] tabular-nums w-[36px] shrink-0', WEIGHT.normal, 'text-[var(--n600)]')}>550</span>
                    <span className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)]')}>Section headers, values, active states</span>
                  </div>
                </div>
              </Card>
            </div>

            {/* 0.4 Component color usage */}
            <div className="space-y-3">
              <SectionHeader>Component color usage</SectionHeader>
              <Card>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    <Badge color="positive">On track</Badge>
                    <Badge color="negative">Missed</Badge>
                    <Badge color="warning">GI risk</Badge>
                    <Badge color="info">Race in 14d</Badge>
                    <Badge variant="outline" color="positive">+7.5%</Badge>
                    <Badge variant="outline" color="negative">-3.2%</Badge>
                  </div>
                  <div className="space-y-2">
                    <ProgressBar value={86} max={100} color="positive" label="86%" />
                    <ProgressBar value={34} max={100} color="negative" label="34%" />
                    <ProgressBar value={62} max={100} color="warning" label="62%" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <MetricCard label="Form" value="-6" subtitle="Loaded" subtitleColor="positive" />
                    <MetricCard label="TSB" value="12" unit="pts" subtitle="Fresh" subtitleColor="positive" />
                  </div>
                  <dl className="m-0">
                    <DataRow label="CHO rate" value="78" unit="g/h" delta="+12" deltaColor="positive" />
                    <DataRow label="Hydration" value="520" unit="ml/h" delta="-80" deltaColor="negative" />
                  </dl>
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 1: Power / HR Zones
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="power-zones" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>1. Power / HR zones<PlaceholderTag /></h2>
            <InfoText>Power zones og HR zones bruger SAMME farver (toggle). Ses overalt i appen. Den vigtigste farve-beslutning.</InfoText>

            {/* 1.1 Zone palette */}
            <div className="space-y-3">
              <SectionHeader>Zone palette (Coggan placeholder)</SectionHeader>
              <div className="flex flex-wrap gap-4">
                {POWER_ZONES_COGGAN.map((z) => (
                  <div key={z.zone} className="flex flex-col items-center">
                    <Swatch hex={z.hex} size={80} height={60} />
                    <div className="flex flex-col items-center gap-0.5 mt-1.5">
                      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.strong, 'text-[var(--n1150)]')}>{z.zone} {z.label}</span>
                      <span className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)]')}>{z.range}</span>
                      <span className={cn(FONT.body, 'text-[11px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{z.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 1.2 Alternative palette */}
            <div className="space-y-3">
              <SectionHeader>Alternativ (gammelt design system)</SectionHeader>
              <div className="flex flex-wrap gap-4">
                {POWER_ZONES_ALT.map((z) => (
                  <div key={z.zone} className="flex flex-col items-center">
                    <Swatch hex={z.hex} size={80} height={60} />
                    <div className="flex flex-col items-center gap-0.5 mt-1.5">
                      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.strong, 'text-[var(--n1150)]')}>{z.zone} {z.label}</span>
                      <span className={cn(FONT.body, 'text-[11px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{z.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 1.3 Zone-colored line demo */}
            <div className="space-y-3">
              <SectionHeader>Zone-colored line simulation</SectionHeader>
              <Card padding="md">
                <svg width="100%" height="80" viewBox="0 0 700 80" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                  <defs>
                    <linearGradient id="zone-grad" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#94a3b8" />
                      <stop offset="18%" stopColor="#94a3b8" />
                      <stop offset="18%" stopColor="#22c55e" />
                      <stop offset="38%" stopColor="#22c55e" />
                      <stop offset="38%" stopColor="#eab308" />
                      <stop offset="55%" stopColor="#eab308" />
                      <stop offset="55%" stopColor="#f97316" />
                      <stop offset="72%" stopColor="#f97316" />
                      <stop offset="72%" stopColor="#ef4444" />
                      <stop offset="88%" stopColor="#ef4444" />
                      <stop offset="88%" stopColor="#dc2626" />
                      <stop offset="100%" stopColor="#dc2626" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,60 C50,55 80,45 120,40 C160,35 200,50 240,30 C280,10 320,25 360,35 C400,45 440,20 480,15 C520,10 560,30 600,20 C640,10 670,15 700,18"
                    fill="none" stroke="url(#zone-grad)" strokeWidth="2.5" strokeLinecap="round"
                  />
                </svg>
                <div className="flex justify-between mt-2 px-1">
                  {POWER_ZONES_COGGAN.map((z) => (
                    <span key={z.zone} className={cn(FONT.body, 'text-[10px]', WEIGHT.medium)} style={{ color: z.hex }}>{z.zone}</span>
                  ))}
                </div>
              </Card>
            </div>

            {/* 1.4 Zone distribution bar */}
            <div className="space-y-3">
              <SectionHeader>Zone distribution</SectionHeader>
              <Card padding="md">
                <div className="flex overflow-hidden" style={{ height: 24, borderRadius: 4 }}>
                  {[
                    { zone: 'Z1', pct: 8, hex: '#94a3b8' },
                    { zone: 'Z2', pct: 35, hex: '#22c55e' },
                    { zone: 'Z3', pct: 22, hex: '#eab308' },
                    { zone: 'Z4', pct: 18, hex: '#f97316' },
                    { zone: 'Z5', pct: 12, hex: '#ef4444' },
                    { zone: 'Z6', pct: 5, hex: '#dc2626' },
                  ].map((z) => (
                    <div key={z.zone} className="flex items-center justify-center" style={{ width: `${z.pct}%`, backgroundColor: z.hex }}>
                      <span className={cn(FONT.body, 'text-[10px]', WEIGHT.medium, 'text-white/90')}>{z.pct}%</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* 1.5 Zone badges */}
            <div className="space-y-3">
              <SectionHeader>Zone badges</SectionHeader>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  {POWER_ZONES_COGGAN.map((z) => (
                    <Badge key={z.zone} color={z.hex}>{z.zone}</Badge>
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {POWER_ZONES_COGGAN.map((z) => (
                    <Badge key={z.zone} variant="outline" color={z.hex}>{z.zone}</Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* 1.6 Opacity variants */}
            <div className="space-y-3">
              <SectionHeader>Opacity variants</SectionHeader>
              <div className="flex flex-wrap gap-6">
                {POWER_ZONES_COGGAN.map((z) => (
                  <div key={z.zone} className="flex flex-col items-center gap-1">
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)] mb-0.5')}>{z.zone}</span>
                    <div className="flex gap-1">
                      <div className={cn(RADIUS.sm)} style={{ width: 32, height: 32, backgroundColor: z.hex }} />
                      <div className={cn(RADIUS.sm)} style={{ width: 32, height: 32, backgroundColor: z.hex, opacity: 0.2 }} />
                      <div className={cn(RADIUS.sm)} style={{ width: 32, height: 32, backgroundColor: z.hex, opacity: 0.08 }} />
                    </div>
                    <div className="flex gap-1">
                      <span className={cn(QUIET_STYLE, 'text-[9px] w-[32px] text-center')}>100%</span>
                      <span className={cn(QUIET_STYLE, 'text-[9px] w-[32px] text-center')}>20%</span>
                      <span className={cn(QUIET_STYLE, 'text-[9px] w-[32px] text-center')}>8%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 1.7 Info box */}
            <Card>
              <p className={cn(MUTED_STYLE, 'text-[13px]')}>
                Power zones og HR zones bruger <strong className={WEIGHT.strong}>samme</strong> farver (toggle). De ses overalt i appen &mdash; charts, badges, distribution bars, zone-colored lines. Den vigtigste farve-beslutning.
              </p>
            </Card>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 2: CHO Zones
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="cho-zones" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>2. CHO zones<PlaceholderTag /></h2>
            <InfoText>Carbohydrate intake zones. SKAL v&aelig;re visuelt distinkte fra power zones da de vises side om side.</InfoText>

            <div className="space-y-3">
              <SectionHeader>CHO zone palette (blue spectrum placeholder)</SectionHeader>
              <div className="flex flex-wrap gap-4">
                {CHO_ZONES.map((z) => (
                  <div key={z.zone} className="flex flex-col items-center">
                    <Swatch hex={z.hex} size={80} height={60} />
                    <div className="flex flex-col items-center gap-0.5 mt-1.5">
                      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.strong, 'text-[var(--n1150)]')}>{z.zone} {z.label}</span>
                      <span className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)]')}>{z.range}</span>
                      <span className={cn(FONT.body, 'text-[11px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{z.hex}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CHO badges */}
            <div className="space-y-3">
              <SectionHeader>CHO badges</SectionHeader>
              <div className="flex flex-wrap gap-2">
                {CHO_ZONES.map((z) => <Badge key={z.zone} color={z.hex}>{z.zone} {z.label}</Badge>)}
              </div>
            </div>

            {/* CHO distribution bar */}
            <div className="space-y-3">
              <SectionHeader>CHO distribution</SectionHeader>
              <Card padding="md">
                <div className="flex overflow-hidden" style={{ height: 24, borderRadius: 4 }}>
                  {CHO_ZONES.map((z, i) => {
                    const pcts = [5, 15, 30, 25, 18, 7]
                    return (
                      <div key={z.zone} className="flex items-center justify-center" style={{ width: `${pcts[i]}%`, backgroundColor: z.hex }}>
                        <span className={cn(FONT.body, 'text-[10px]', WEIGHT.medium, 'text-white/90')}>{pcts[i]}%</span>
                      </div>
                    )
                  })}
                </div>
              </Card>
            </div>

            {/* 2.1 CHO x Power matrix */}
            <div className="space-y-3">
              <SectionHeader>CHO x Power co-visibility matrix</SectionHeader>
              <InfoText>Denne matrix viser hvorfor de to paletter SKAL v&aelig;re forskellige. Hver celle viser en kombination der kan forekomme p&aring; session detail.</InfoText>
              <Card padding="md">
                <div className="overflow-x-auto">
                  <table className="border-collapse">
                    <thead>
                      <tr>
                        <th className={cn(LABEL_STYLE, 'py-1.5 px-1.5')} />
                        {POWER_ZONES_COGGAN.map((z) => (
                          <th key={z.zone} className={cn(LABEL_STYLE, 'py-1.5 px-1.5 text-center')}>{z.zone}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {CHO_ZONES.map((cho) => (
                        <tr key={cho.zone}>
                          <td className={cn(LABEL_STYLE, 'py-1 px-1.5 whitespace-nowrap')}>{cho.zone}</td>
                          {POWER_ZONES_COGGAN.map((pz) => (
                            <td key={pz.zone} className="py-1 px-1.5">
                              <div className="flex items-center justify-center">
                                <div className={RADIUS.sm} style={{ width: 40, height: 40, backgroundColor: pz.hex, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                  <div className={RADIUS.full} style={{ width: 16, height: 16, backgroundColor: cho.hex, border: '1.5px solid white' }} />
                                </div>
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className={cn(QUIET_STYLE, 'text-[11px] mt-3')}>Power zone som baggrund. CHO zone som dot. Diagonalen = perfekt periodisering.</p>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 3: Semantic Colors
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="semantics" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>3. Semantic colors</h2>
            <InfoText>Fire semantiske farver med tre varianter hver: full, soft (baggrund), on-soft (tekst p&aring; soft). Bruges til badges, progress bars, deltas, subtitles.</InfoText>

            {/* 3.1 The four semantics */}
            <div className="grid grid-cols-2 gap-4">
              {SEMANTICS.map((s) => (
                <Card key={s.key}>
                  <div className="space-y-3">
                    <span className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)]')}>{s.label}</span>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center gap-1">
                        <Swatch hex={s.full} size={48} round />
                        <span className={cn(QUIET_STYLE, 'text-[10px]')}>Full</span>
                        <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{s.full}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <Swatch hex={s.soft} size={48} round />
                        <span className={cn(QUIET_STYLE, 'text-[10px]')}>Soft</span>
                        <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{s.soft}</span>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <div className={cn(RADIUS.full, 'flex items-center justify-center')} style={{ width: 48, height: 48, backgroundColor: s.soft }}>
                          <span className={cn(FONT.body, 'text-[11px]', WEIGHT.strong)} style={{ color: s.onSoft }}>Aa</span>
                        </div>
                        <span className={cn(QUIET_STYLE, 'text-[10px]')}>On-soft</span>
                        <span className={cn(FONT.body, 'text-[10px] tabular-nums', WEIGHT.normal, 'text-[var(--n600)]')}>{s.onSoft}</span>
                      </div>
                    </div>
                    <p className={cn(QUIET_STYLE, 'text-[11px]')}>{s.usage}</p>
                  </div>
                </Card>
              ))}
            </div>

            {/* 3.2 Semantic in components */}
            <div className="space-y-3">
              <SectionHeader>In components</SectionHeader>
              <Card>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['positive', 'negative', 'warning', 'info'] as const).map((c) => (
                      <Badge key={c} color={c}>{c}</Badge>
                    ))}
                    {(['positive', 'negative', 'warning', 'info'] as const).map((c) => (
                      <Badge key={`o-${c}`} variant="outline" color={c}>{c}</Badge>
                    ))}
                  </div>
                  <div className="space-y-2">
                    <ProgressBar value={88} max={100} color="positive" label="88%" />
                    <ProgressBar value={34} max={100} color="negative" label="34%" />
                    <ProgressBar value={62} max={100} color="warning" label="62%" />
                    <ProgressBar value={75} max={100} label="75%" />
                  </div>
                  <dl className="m-0">
                    <DataRow label="Weekly compliance" value="88%" delta="+5" deltaColor="positive" />
                    <DataRow label="TSS deficit" value="42" unit="pts" delta="-18" deltaColor="negative" />
                  </dl>
                  <div className="grid grid-cols-4 gap-3">
                    <MetricCard label="Form" value="-6" subtitle="Improving" subtitleColor="positive" />
                    <MetricCard label="Fatigue" value="82" subtitle="High" subtitleColor="negative" />
                    <MetricCard label="GI risk" value="34%" subtitle="Caution" subtitleColor="warning" />
                    <MetricCard label="CTL" value="68" subtitle="Stable" />
                  </div>
                </div>
              </Card>
            </div>

            {/* 3.3 Semantic derivatives table */}
            <div className="space-y-3">
              <SectionHeader>Semantic reuse across domains</SectionHeader>
              <DataTable
                columns={[
                  { key: 'group', label: 'Group' },
                  { key: 'positive', label: 'Positive' },
                  { key: 'warning', label: 'Warning' },
                  { key: 'negative', label: 'Negative' },
                  { key: 'info', label: 'Info' },
                ]}
                data={[
                  { group: 'Compliance', positive: 'Compliant', warning: 'Partial', negative: 'Missed', info: '\u2014' },
                  { group: 'Fuel readiness', positive: 'Ready', warning: 'Caution', negative: 'Not ready', info: '\u2014' },
                  { group: 'Injury risk', positive: 'Low', warning: 'Moderate', negative: 'High / critical', info: '\u2014' },
                  { group: 'Trend', positive: 'Improving', warning: '\u2014', negative: 'Declining', info: 'Stable' },
                  { group: 'Signal severity', positive: '\u2014', warning: 'Warning', negative: 'Critical', info: 'Info' },
                  { group: 'Data quality', positive: 'Excellent', warning: 'Fair', negative: 'Poor', info: '\u2014' },
                ]}
              />
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 4: Chart Series + Capacity
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="chart-series" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>4. Chart series + capacity chart<PlaceholderTag /></h2>
            <InfoText>Farver til multi-line charts. Capacity chart bruger 4 af disse.</InfoText>

            <div className="space-y-3">
              <SectionHeader>Palette swatches</SectionHeader>
              <SwatchRow items={CHART_SERIES.map((s) => ({ hex: s.hex, label: s.label }))} size={64} height={48} />
            </div>

            {/* 4.2 Capacity chart simulation */}
            <div className="space-y-3">
              <SectionHeader>Capacity chart simulation</SectionHeader>
              <Card padding="md">
                <svg width="100%" height="200" viewBox="0 0 700 200" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                  {/* Form area fill */}
                  <path d="M0,140 C70,130 140,110 210,100 C280,90 350,95 420,85 C490,75 560,80 630,70 L700,65 L700,200 L0,200 Z" fill="#f59e0b" opacity="0.15" />
                  {/* Capacity line */}
                  <path d="M0,120 C70,110 140,90 210,80 C280,70 350,75 420,65 C490,55 560,60 630,50 L700,45" fill="none" stroke="#3b82f6" strokeWidth="2" />
                  {/* Pressure line */}
                  <path d="M0,150 C70,145 140,130 210,125 C280,120 350,128 420,115 C490,108 560,115 630,105 L700,100" fill="none" stroke="#10b981" strokeWidth="2" />
                  {/* Form line */}
                  <path d="M0,140 C70,130 140,110 210,100 C280,90 350,95 420,85 C490,75 560,80 630,70 L700,65" fill="none" stroke="#f59e0b" strokeWidth="2" />
                  {/* Surge line (dashed) */}
                  <path d="M0,160 C70,155 140,145 210,150 C280,155 350,140 420,135 C490,145 560,138 630,130 L700,128" fill="none" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="6 4" />
                </svg>
                <div className="flex gap-5 mt-3">
                  {[
                    { label: 'Capacity', hex: '#3b82f6', dash: false },
                    { label: 'Pressure', hex: '#10b981', dash: false },
                    { label: 'Form', hex: '#f59e0b', dash: false },
                    { label: 'Surge', hex: '#8b5cf6', dash: true },
                  ].map((l) => (
                    <div key={l.label} className="flex items-center gap-1.5">
                      <svg width="16" height="2" viewBox="0 0 16 2">
                        <line x1="0" y1="1" x2="16" y2="1" stroke={l.hex} strokeWidth="2" strokeDasharray={l.dash ? '4 3' : undefined} />
                      </svg>
                      <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>{l.label}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* 4.3 Hover data table dots */}
            <div className="space-y-3">
              <SectionHeader>Hover data table (simulated)</SectionHeader>
              <Card>
                <dl className="m-0">
                  {[
                    { label: 'Power', value: '238', unit: 'W', hex: '#3b82f6', badge: { label: 'Z4', color: '#f97316' } },
                    { label: 'Heart rate', value: '142', unit: 'bpm', hex: '#f43f5e' },
                    { label: 'Speed', value: '34.2', unit: 'km/h', hex: '#10b981' },
                    { label: 'Cadence', value: '88', unit: 'rpm', hex: '#8b5cf6' },
                    { label: 'Elevation', value: '342', unit: 'm', hex: '#64748b' },
                  ].map((row) => (
                    <DataRow
                      key={row.label}
                      label={row.label}
                      value={row.value}
                      unit={row.unit}
                      badge={
                        <div className="flex items-center gap-1.5">
                          <ColorDot hex={row.hex} />
                          {row.badge && <Badge color={row.badge.color}>{row.badge.label}</Badge>}
                        </div>
                      }
                    />
                  ))}
                </dl>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 5: Regulators
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="regulators" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>5. Regulator-farver<PlaceholderTag /></h2>
            <InfoText>Tre regulatorer der styrer performance-modellen. Vises som ringe/gauges p&aring; Today og som area charts.</InfoText>

            <div className="space-y-3">
              <SectionHeader>Three regulators</SectionHeader>
              <SwatchRow items={REGULATORS.map((r) => ({ hex: r.hex, label: r.label }))} size={48} round />
            </div>

            {/* 5.2 Regulator rings */}
            <div className="space-y-3">
              <SectionHeader>Regulator rings (gauge arcs)</SectionHeader>
              <Card padding="md">
                <div className="flex justify-center">
                  <svg width="200" height="120" viewBox="0 0 200 120" shapeRendering="geometricPrecision">
                    {REGULATORS.map((r, i) => {
                      const radius = 80 - i * 20
                      const pct = [0.75, 0.6, 0.85][i]
                      const circumference = Math.PI * radius
                      return (
                        <g key={r.label} transform="translate(100,110)">
                          <path d={`M ${-radius} 0 A ${radius} ${radius} 0 0 1 ${radius} 0`} fill="none" stroke="var(--n200)" strokeWidth="8" strokeLinecap="round" />
                          <path d={`M ${-radius} 0 A ${radius} ${radius} 0 0 1 ${radius} 0`} fill="none" stroke={r.hex} strokeWidth="8" strokeLinecap="round" strokeDasharray={`${circumference * pct} ${circumference}`} />
                          <text x={radius + 8} y="4" className={cn(FONT.body)} style={{ fontSize: '10px', fill: 'var(--n600)', fontFamily: 'var(--font-sans)' }}>{r.label}</text>
                        </g>
                      )
                    })}
                  </svg>
                </div>
              </Card>
            </div>

            {/* 5.3 Area chart preview */}
            <div className="space-y-3">
              <SectionHeader>Area chart preview</SectionHeader>
              <Card padding="md">
                <svg width="100%" height="100" viewBox="0 0 400 100" preserveAspectRatio="none" shapeRendering="geometricPrecision">
                  <path d="M0,70 C50,55 100,40 150,45 C200,50 250,35 300,30 C350,25 380,30 400,28 L400,100 L0,100 Z" fill="#E8913A" opacity="0.25" />
                  <path d="M0,60 C50,50 100,55 150,50 C200,45 250,50 300,40 C350,35 380,38 400,36 L400,100 L0,100 Z" fill="#7B68EE" opacity="0.25" />
                  <path d="M0,80 C50,70 100,60 150,55 C200,50 250,45 300,50 C350,48 380,45 400,42 L400,100 L0,100 Z" fill="#2AAA8A" opacity="0.25" />
                </svg>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 6: Nutrient Accents
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="nutrients" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>6. Nutrient accents<PlaceholderTag /></h2>
            <InfoText>Fire n&aelig;ringsstoffer med egne farver. Vises p&aring; fuel tab, badges og progress bars.</InfoText>

            <SwatchRow items={NUTRIENTS.map((n) => ({ hex: n.hex, label: n.label }))} size={48} round />

            {/* 6.2 Fuel tab preview */}
            <div className="space-y-3">
              <SectionHeader>Fuel tab preview</SectionHeader>
              <Card>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    {NUTRIENTS.map((n) => <Badge key={n.label} color={n.hex}>{n.label}</Badge>)}
                  </div>
                  <ProgressBar value={78} max={90} color="#f97316" label="78 g/h" />
                  <ProgressBar value={520} max={750} color="#2AACCC" label="520 ml/h" />
                  <dl className="m-0">
                    <DataRow label="CHO rate" value="78" unit="g/h" delta="+12" deltaColor="positive" />
                    <DataRow label="Fluid rate" value="520" unit="ml/h" />
                    <DataRow label="Sodium" value="680" unit="mg/h" />
                  </dl>
                </div>
              </Card>
            </div>

            {/* 6.3 Conflict warning */}
            <Card>
              <div className="flex gap-3" style={{ backgroundColor: 'var(--warning-soft)', margin: '-14px', padding: '14px', borderRadius: 12 }}>
                <div className="shrink-0 mt-0.5">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 1L15 14H1L8 1Z" fill="var(--warning)" /><text x="8" y="12" textAnchor="middle" fill="white" style={{ fontSize: '9px', fontWeight: 700, fontFamily: 'var(--font-sans)' }}>!</text></svg>
                </div>
                <p className={cn(FONT.body, 'text-[12px]', WEIGHT.book)} style={{ color: 'var(--warning-on-soft)' }}>
                  CHO orange (<code className="font-space text-[11px]">#f97316</code>) og Power Z4 Threshold (<code className="font-space text-[11px]">#f97316</code>) er <strong className={WEIGHT.strong}>identisk</strong>. Ruth b&oslash;r overveje om fuel-dom&aelig;net skal have sin egen tone.
                </p>
              </div>
            </Card>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 7: Training Phases
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="phases" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>7. Training phases<PlaceholderTag /></h2>
            <InfoText>Seks tr&aelig;ningsfaser vises som baggrundsb&aring;nd i kalender-header. Alle ved lav opacity (~15%).</InfoText>

            <SwatchRow items={PHASES.map((p) => ({ hex: p.hex, label: p.label }))} size={48} round />

            {/* Calendar header simulation */}
            <div className="space-y-3">
              <SectionHeader>Calendar header simulation</SectionHeader>
              <Card padding="md">
                <div className="flex overflow-hidden" style={{ height: 32, borderRadius: 4 }}>
                  {PHASES.map((p) => (
                    <div key={p.label} className="flex items-center justify-center" style={{ width: `${p.width}%`, backgroundColor: p.hex, opacity: 0.15 }}>
                      <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1050)]')} style={{ opacity: 1 / 0.15 > 6 ? 1 : undefined }}>{p.label}</span>
                    </div>
                  ))}
                </div>
                {/* Labels on top since opacity affects text */}
                <div className="flex mt-1">
                  {PHASES.map((p) => (
                    <div key={p.label} className="flex items-center justify-center" style={{ width: `${p.width}%` }}>
                      <span className={cn(FONT.body, 'text-[10px]', WEIGHT.book, 'text-[var(--n800)]')}>{p.label}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 8: Day Types + Intent
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="day-types" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>8. Day types + intent<PlaceholderTag /></h2>
            <InfoText>Day type badges + intent badges kan begge forekomme p&aring; samme kalenderdag.</InfoText>

            <div className="space-y-3">
              <SectionHeader>Day type badges</SectionHeader>
              <div className="flex flex-wrap gap-2">
                {DAY_TYPES.map((d) => <Badge key={d.label} color={d.hex}>{d.label}</Badge>)}
              </div>
            </div>

            <div className="space-y-3">
              <SectionHeader>Intent badges (outline)</SectionHeader>
              <div className="flex flex-wrap gap-2">
                {INTENTS.map((d) => <Badge key={d.label} variant="outline" color={d.hex}>{d.label}</Badge>)}
              </div>
            </div>

            {/* Calendar day preview */}
            <div className="space-y-3">
              <SectionHeader>Calendar day — worst case badge density</SectionHeader>
              <Card padding="md" className="max-w-[200px]">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className={cn(FONT.body, 'text-[16px] tabular-nums', WEIGHT.strong, 'text-[var(--n1150)]')}>14</span>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>Tirsdag</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    <Badge color="#fca5a5">Hard</Badge>
                    <Badge variant="outline" color="#f97316">Threshold</Badge>
                    <Badge variant="outline" color="info">Priority A</Badge>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={RADIUS.full} style={{ width: 6, height: 6, backgroundColor: '#3b82f6' }} />
                    <span className={cn(QUIET_STYLE, 'text-[11px]')}>Cykling</span>
                  </div>
                  <div style={{ borderLeft: '2px solid var(--positive)', paddingLeft: 8 }}>
                    <span className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)]')}>Compliance: 92%</span>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 9: Cadence Zones
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="cadence" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>9. Cadence zones<PlaceholderTag /></h2>
            <InfoText>9 brackets fra lav til h&oslash;j kadence. Monokrom bl&aring; gradient som placeholder.</InfoText>

            <Card padding="md">
              <div className="flex overflow-hidden" style={{ height: 32, borderRadius: 4 }}>
                {[
                  { rpm: '<60', hex: '#dbeafe' },
                  { rpm: '60-70', hex: '#bfdbfe' },
                  { rpm: '70-80', hex: '#93c5fd' },
                  { rpm: '80-85', hex: '#60a5fa' },
                  { rpm: '85-90', hex: '#3b82f6' },
                  { rpm: '90-95', hex: '#2563eb' },
                  { rpm: '95-100', hex: '#1d4ed8' },
                  { rpm: '100-110', hex: '#1e40af' },
                  { rpm: '>110', hex: '#1e3a8a' },
                ].map((c) => (
                  <div key={c.rpm} className="flex-1 flex items-center justify-center" style={{ backgroundColor: c.hex }}>
                    <span className={cn(FONT.body, 'text-[9px]', WEIGHT.medium)} style={{ color: c.hex < '#60a5fa' ? 'var(--n1050)' : 'white' }}>{c.rpm}</span>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 10: kJ / Energy
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="energy" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>10. kJ / energy zones<PlaceholderTag /></h2>
            <InfoText>Antal zoner og gr&aelig;nser ikke defineret endnu. Placeholder: 5 trin i amber/warm gradient.</InfoText>

            <SwatchRow items={[
              { hex: '#fef3c7', label: 'Low' },
              { hex: '#fde68a', label: 'Moderate' },
              { hex: '#fbbf24', label: 'High' },
              { hex: '#f59e0b', label: 'Very high' },
              { hex: '#d97706', label: 'Extreme' },
            ]} size={56} height={40} />
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 11: Lower Priority
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="lower-priority" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>11. Lower priority groups</h2>
            <InfoText>Kompakt oversigt over grupper med f&aelig;rre farver eller lavere prioritet.</InfoText>

            <div className="grid grid-cols-2 gap-4">
              <Card>
                <Card.Title>Glycogen</Card.Title>
                <div className="flex gap-3 mt-2">
                  <div className="flex items-center gap-1.5">
                    <Swatch hex="#f97316" size={24} height={12} />
                    <span className={cn(QUIET_STYLE, 'text-[11px]')}>Muscle</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Swatch hex="#8b5cf6" size={24} height={12} />
                    <span className={cn(QUIET_STYLE, 'text-[11px]')}>Liver</span>
                  </div>
                </div>
              </Card>

              <Card>
                <Card.Title>Product tolerance</Card.Title>
                <div className="flex gap-1 mt-2">
                  {['#22c55e', '#86efac', '#fde68a', '#fca5a5', '#d1d5db'].map((hex, i) => (
                    <div key={hex} className="flex flex-col items-center gap-0.5">
                      <Swatch hex={hex} size={28} height={20} />
                      <span className={cn(QUIET_STYLE, 'text-[9px]')}>{['Excellent', 'Good', 'Fair', 'Poor', 'Untested'][i]}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <Card.Title>Gut tiers</Card.Title>
                <div className="flex gap-1 mt-2">
                  {['#d1d5db', '#93c5fd', '#60a5fa', '#3b82f6'].map((hex, i) => (
                    <div key={hex} className="flex flex-col items-center gap-0.5">
                      <Swatch hex={hex} size={32} height={24} />
                      <span className={cn(QUIET_STYLE, 'text-[9px]')}>{['Starter', 'Developing', 'Trained', 'Elite'][i]}</span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card>
                <Card.Title>Gamification</Card.Title>
                <div className="space-y-1 mt-2">
                  <div className="flex gap-1">
                    {['#cd7f32', '#c0c0c0', '#ffd700'].map((hex, i) => (
                      <div key={hex} className="flex flex-col items-center gap-0.5">
                        <Swatch hex={hex} size={24} round />
                        <span className={cn(QUIET_STYLE, 'text-[9px]')}>{['Bronze', 'Silver', 'Gold'][i]}</span>
                      </div>
                    ))}
                  </div>
                  <p className={cn(QUIET_STYLE, 'text-[10px]')}>+ 10 badge-kategorier</p>
                </div>
              </Card>

              <Card>
                <Card.Title>Forecast</Card.Title>
                <p className={cn(QUIET_STYLE, 'text-[11px] mt-1')}>Derivat af chart-linjer &mdash; stiplet version af serie-farverne.</p>
                <svg width="120" height="24" viewBox="0 0 120 24" className="mt-2" shapeRendering="geometricPrecision">
                  <line x1="0" y1="12" x2="120" y2="12" stroke="#3b82f6" strokeWidth="1.5" strokeDasharray="6 4" />
                </svg>
              </Card>

              <Card>
                <Card.Title>Season map</Card.Title>
                <p className={cn(QUIET_STYLE, 'text-[11px] mt-1')}>Monokrom gradient swatch.</p>
                <div className="flex overflow-hidden mt-2" style={{ height: 16, borderRadius: 4, width: 120 }}>
                  {['#e5e7eb', '#d1d5db', '#9ca3af', '#6b7280', '#4b5563'].map((hex) => (
                    <div key={hex} className="flex-1" style={{ backgroundColor: hex }} />
                  ))}
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 12: Brand Palette
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="brand" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>12. Brand palette (Ruths eksisterende)</h2>
            <InfoText>RAMTTs eksisterende brand-farver. Bruges til landing pages, share cards og immersive UI.</InfoText>

            <SwatchRow items={BRAND.map((b) => ({ hex: b.hex, label: b.label }))} size={64} height={48} />

            {/* Dark immersive preview */}
            <div className="space-y-3">
              <SectionHeader>Dark immersive preview</SectionHeader>
              <Card padding="none">
                <div className={cn(RADIUS.lg, 'overflow-hidden')} style={{ backgroundColor: '#050A30', padding: 28 }}>
                  <h3 className={cn(FONT.body, 'text-[20px]', WEIGHT.strong, 'mb-2')} style={{ color: '#0230E0' }}>Race-day fuel strategy</h3>
                  <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'mb-4 max-w-[45ch]')} style={{ color: '#FFFEF7' }}>
                    Your personalized nutrition plan for Ironman Copenhagen, optimized for 87 g/h CHO with dual-transport.
                  </p>
                  <div className="flex gap-2">
                    <div className={cn(RADIUS.md, 'px-4 py-2 inline-flex')} style={{ backgroundColor: '#96004D' }}>
                      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.medium)} style={{ color: '#FFFEF7' }}>View plan</span>
                    </div>
                    <div className={cn(RADIUS.md, 'px-4 py-2 inline-flex')} style={{ border: '0.5px solid #FFC9FE40' }}>
                      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal)} style={{ color: '#FFC9FE' }}>Share</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 13: Flare
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="flare" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>13. Flare</h2>
            <InfoText>En enkelt farve til akutte alerts.</InfoText>

            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center">
                <Swatch hex="#FF6A00" size={64} height={64} />
                <SwatchLabel hex="#FF6A00" label="Flare" />
              </div>
              <div className="flex flex-col gap-2">
                <Badge color="#FF6A00">Fuel now</Badge>
                <p className={cn(QUIET_STYLE, 'text-[11px] max-w-[40ch]')}>Skal differentieres fra fuel-orange (#f97316) og Power Z4.</p>
              </div>
            </div>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 14: Co-Visibility Map
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="co-visibility" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>14. Co-visibility map</h2>
            <InfoText>Hvilke farve-grupper kan ses sammen p&aring; hver sk&aelig;rm. Dots = synlig p&aring; den sk&aelig;rm.</InfoText>

            <Card padding="md">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-[0.5px] border-b-[var(--n400)]">
                      <th className={cn(LABEL_STYLE, 'py-2 px-2 text-left')} />
                      {CO_VIS_GROUPS.map((g) => (
                        <th key={g} className={cn(LABEL_STYLE, 'py-2 px-2 text-center whitespace-nowrap')} style={{ writingMode: 'vertical-lr', transform: 'rotate(180deg)', height: 90 }}>{g}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {CO_VIS_SCREENS.map((screen) => (
                      <tr key={screen} className="border-b-[0.5px] border-b-[var(--n200)]">
                        <td className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n1150)] py-2 px-2 whitespace-nowrap')}>{screen}</td>
                        {CO_VIS_GROUPS.map((group) => (
                          <td key={group} className="py-2 px-2 text-center">
                            {CO_VIS_MAP[screen]?.includes(group) ? (
                              <div className={cn(RADIUS.full, 'mx-auto')} style={{ width: 8, height: 8, backgroundColor: 'var(--n1150)' }} />
                            ) : null}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </section>

          {/* ══════════════════════════════════════════════════════════
             SECTION 15: Summary
             ══════════════════════════════════════════════════════════ */}
          <SectionAnchor id="summary" />
          <section className="space-y-8">
            <h2 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>15. Summary + questions</h2>

            {/* Priority table */}
            <div className="space-y-3">
              <SectionHeader>Priority overview</SectionHeader>
              <DataTable
                columns={[
                  { key: 'group', label: 'Group' },
                  { key: 'colors', label: 'Colors', align: 'right' as const },
                  { key: 'priority', label: 'Priority' },
                  { key: 'share', label: 'Can share with' },
                ]}
                data={[
                  { group: 'Power / HR zones', colors: '6', priority: 'Critical', share: '\u2014' },
                  { group: 'CHO zones', colors: '6', priority: 'Critical', share: '\u2014' },
                  { group: 'Semantic', colors: '4 \u00d7 3', priority: 'Locked', share: 'All domains' },
                  { group: 'Chart series', colors: '5-6', priority: 'High', share: 'Capacity chart' },
                  { group: 'Regulators', colors: '3', priority: 'High', share: '\u2014' },
                  { group: 'Nutrients', colors: '4', priority: 'Medium', share: 'CHO overlaps zones' },
                  { group: 'Training phases', colors: '6', priority: 'Medium', share: '\u2014' },
                  { group: 'Day types + intent', colors: '7-12', priority: 'Medium', share: 'Intent = zone colors?' },
                  { group: 'Cadence zones', colors: '9', priority: 'Low', share: '\u2014' },
                  { group: 'kJ / energy', colors: '4-6', priority: 'Low', share: '\u2014' },
                  { group: 'Brand', colors: '7', priority: 'Existing', share: 'Landing / share cards' },
                  { group: 'Flare', colors: '1', priority: 'Low', share: '\u2014' },
                ]}
              />
            </div>

            {/* The 11 questions */}
            <div className="space-y-3">
              <SectionHeader>De 11 sp&oslash;rgsm&aring;l til Ruth</SectionHeader>
              <div className="space-y-2">
                {[
                  'Coggan-placeholders vs alternativ palette for power/HR zones?',
                  'Skal CHO zones v\u00e6re bl\u00e5 spektrum, eller en anden tone?',
                  'Er de 4 semantiske farver (positive/negative/warning/info) de rigtige?',
                  'Capacity chart: hvilke 4-6 serie-farver fungerer p\u00e5 sand canvas?',
                  'Regulatorer: amber/purple/green, eller noget andet?',
                  'Fuel-orange og Power Z4 er identiske (#f97316) \u2014 er det OK?',
                  'Skal intent-badges genbruge zone-farverne, eller have egne?',
                  'Training phases: 6 farver ved 15% opacity \u2014 kan de adskilles?',
                  'Cadence: monokrom bl\u00e5, eller en anden gradient?',
                  'Brand-palette: bruges som den er, eller tilpasses til sand canvas?',
                  'Flare #FF6A00: for t\u00e6t p\u00e5 fuel-orange og Z4?',
                ].map((q, i) => (
                  <Card key={i} padding="sm">
                    <div className="flex gap-3 items-start">
                      <span className={cn(FONT.body, 'text-[12px] tabular-nums', WEIGHT.strong, 'text-[var(--n600)] shrink-0 w-[20px]')}>{i + 1}.</span>
                      <span className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n1150)]')}>{q}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 pb-16">
            <div className="border-t-[0.5px] border-t-[var(--n400)] pt-4">
              <p className={cn(QUIET_STYLE, 'text-[11px]')}>RAMTT Color Guide &middot; Generated 8. april 2026 &middot; All placeholder-farver markeret</p>
            </div>
          </footer>

        </div>
      </main>
    </div>
  )
}
