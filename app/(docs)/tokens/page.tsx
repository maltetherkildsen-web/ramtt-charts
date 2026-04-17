// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { cn, FONT, WEIGHT, BORDER, RADIUS } from '@/lib/ui'
import { DocSection } from '@/components/docs/DocSection'
import { DocCode } from '@/components/docs/DocCode'
import { HexSwatch } from '@/components/ui/HexSwatch'

// ─── Token data ───

const NEUTRALS = [
  { token: '--bg', hex: '#FAF9F5', label: 'Canvas', usage: 'Page background' },
  { token: '--n50', hex: '#FDFCFA', label: 'Elevated', usage: 'Card backgrounds' },
  { token: '--n200', hex: '#F2F0EA', label: 'Hover', usage: 'Hover states, sand fill' },
  { token: '--n400', hex: '#E8E5DC', label: 'Border', usage: 'All borders, dividers' },
  { token: '--n600', hex: '#76726A', label: 'Muted', usage: 'Labels, section headers' },
  { token: '--n800', hex: '#6B6760', label: 'Secondary', usage: 'Descriptions, units, metadata' },
  { token: '--n1050', hex: '#383633', label: 'Strong', usage: 'Focus ring, text selection' },
  { token: '--n1100', hex: '#2A2826', label: 'Dark surface', usage: 'Code blocks, dark panels' },
  { token: '--n1150', hex: '#131211', label: 'Primary', usage: 'Primary text, active states' },
]

const SEMANTICS = [
  { name: 'positive', color: '#84cc16', soft: '#f7fee7', onSoft: '#4d7c0f', usage: 'Good / up' },
  { name: 'negative', color: '#f43f5e', soft: '#fff1f2', onSoft: '#be123c', usage: 'Bad / down' },
  { name: 'warning', color: '#f59e0b', soft: '#fffbeb', onSoft: '#b45309', usage: 'Caution' },
  { name: 'info', color: '#0ea5e9', soft: '#f0f9ff', onSoft: '#0369a1', usage: 'Informational' },
]

const WEIGHTS = [
  { value: '400', name: 'Normal', token: 'WEIGHT.normal', usage: 'Body text, nav items, input text, unselected toggles' },
  { value: '450', name: 'Book', token: 'WEIGHT.book', usage: 'Units, metadata, descriptions, subtitles' },
  { value: '500', name: 'Medium', token: 'WEIGHT.medium', usage: 'Badges, form labels, buttons' },
  { value: '550', name: 'Strong', token: 'WEIGHT.strong', usage: 'Section headers, card titles, values, active tabs' },
]

const SPACING = [
  { px: 4, token: '--space-1', tw: 'p-1' },
  { px: 8, token: '--space-2', tw: 'p-2' },
  { px: 12, token: '--space-3', tw: 'p-3' },
  { px: 16, token: '--space-4', tw: 'p-4' },
  { px: 20, token: '--space-5', tw: 'p-5' },
  { px: 24, token: '--space-6', tw: 'p-6' },
  { px: 32, token: '--space-8', tw: 'p-8' },
]

const RADII = [
  { px: 4, name: 'sm', token: 'RADIUS.sm', usage: 'Badges, small pills' },
  { px: 5, name: 'md', token: 'RADIUS.md', usage: 'Buttons, inputs, toggles (default)' },
  { px: 12, name: 'lg', token: 'RADIUS.lg', usage: 'Cards, panels' },
  { px: 16, name: 'xl', token: 'RADIUS.xl', usage: 'Modals, large containers' },
]

export default function TokensPage() {
  return (
    <div className="space-y-10">
      <div>
        <h1 className={cn(FONT.body, 'text-[22px] font-[550] text-[var(--n1150)]')}>
          Tokens
        </h1>
        <p className={cn(FONT.body, 'text-[14px] font-[400] text-[var(--n800)] mt-2')}>
          Design tokens are the single source of truth. Defined in tokens.css,
          consumed via CSS custom properties and lib/ui.ts constants.
        </p>
      </div>

      {/* ─── Neutral scale ─── */}
      <DocSection title="Neutral scale" description="Warm sand-tinted greys. All UI chrome uses this scale.">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
          {NEUTRALS.map((n) => (
            <HexSwatch key={n.token} token={n.token} hex={n.hex} label={n.label} usage={n.usage} />
          ))}
        </div>
      </DocSection>

      {/* ─── Semantic colors ─── */}
      <DocSection title="Semantic colors" description="For badges, alerts, and status indicators. Never for text.">
        <div className="space-y-3">
          {SEMANTICS.map((s) => (
            <div key={s.name} className="flex items-center gap-3">
              <div className="flex gap-1 shrink-0">
                <div className="w-8 h-8 rounded-[4px]" style={{ backgroundColor: s.color }} />
                <div className={cn('w-8 h-8 rounded-[4px]', BORDER.default)} style={{ backgroundColor: s.soft }} />
                <div className="w-8 h-8 rounded-[4px]" style={{ backgroundColor: s.onSoft }} />
              </div>
              <div>
                <code className={cn(FONT.body, 'text-[13px] font-[550] text-[var(--n1150)]')}>--{s.name}</code>
                <span className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n600)] ml-2')}>{s.usage}</span>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ─── Typography ─── */}
      <DocSection title="Typography" description="Satoshi for everything. Weight communicates hierarchy.">
        <div className={cn('bg-[var(--n50)]', BORDER.default, RADIUS.lg, 'p-5 space-y-4')}>
          {WEIGHTS.map((w) => (
            <div key={w.value} className="flex items-baseline gap-4">
              <span
                className={cn(FONT.body, 'text-[15px] text-[var(--n1150)] min-w-[160px]')}
                style={{ fontWeight: Number(w.value) }}
              >
                Satoshi {w.value}
              </span>
              <span className={cn(FONT.body, 'text-[12px] font-[400] text-[var(--n800)]')}>
                {w.name} — {w.usage}
              </span>
            </div>
          ))}
        </div>
        <div className="mt-3">
          <DocCode>{`// Import from lib/ui.ts
import { WEIGHT } from '@/lib/ui'

WEIGHT.normal  // font-normal (400)
WEIGHT.book    // font-[450]
WEIGHT.medium  // font-medium (500)
WEIGHT.strong  // font-[550]`}</DocCode>
        </div>
      </DocSection>

      {/* ─── Spacing ─── */}
      <DocSection title="Spacing" description="Fixed scale: 4, 8, 12, 16, 20, 24, 32px.">
        <div className="flex items-end gap-3">
          {SPACING.map((s) => (
            <div key={s.px} className="flex flex-col items-center gap-1">
              <div
                className="bg-[var(--n1150)] rounded-[2px]"
                style={{ width: s.px, height: s.px }}
              />
              <span className={cn(FONT.body, 'text-[11px] font-[450] text-[var(--n600)] tabular-nums')}>
                {s.px}
              </span>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ─── Radius ─── */}
      <DocSection title="Radius" description="Four radii. Nothing else.">
        <div className="flex items-center gap-4">
          {RADII.map((r) => (
            <div key={r.name} className="flex flex-col items-center gap-2">
              <div
                className={cn('w-16 h-16 bg-[var(--n200)]', BORDER.default)}
                style={{ borderRadius: r.px }}
              />
              <div className="text-center">
                <div className={cn(FONT.body, 'text-[12px] font-[550] text-[var(--n1150)]')}>{r.name}</div>
                <div className={cn(FONT.body, 'text-[11px] font-[400] text-[var(--n600)] tabular-nums')}>{r.px}px</div>
              </div>
            </div>
          ))}
        </div>
      </DocSection>

      {/* ─── Borders ─── */}
      <DocSection title="Borders" description="0.5px everywhere. Two variants: default (--n400) and subtle (--n200).">
        <div className="flex gap-4">
          <div className={cn('flex-1 h-16 rounded-[12px]', BORDER.default, 'flex items-center justify-center')}>
            <span className={cn(FONT.body, 'text-[12px] font-[450] text-[var(--n800)]')}>BORDER.default</span>
          </div>
          <div className={cn('flex-1 h-16 rounded-[12px]', BORDER.subtle, 'flex items-center justify-center')}>
            <span className={cn(FONT.body, 'text-[12px] font-[450] text-[var(--n800)]')}>BORDER.subtle</span>
          </div>
        </div>
        <DocCode>{`import { BORDER } from '@/lib/ui'

BORDER.default  // border-[0.5px] border-[var(--n400)]
BORDER.subtle   // border-[0.5px] border-[var(--n200)]`}</DocCode>
      </DocSection>
    </div>
  )
}
