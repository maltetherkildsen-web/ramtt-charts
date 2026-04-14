'use client'

import { useState } from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  RADIUS,
  BORDER,
  TRANSITION,
  LABEL_STYLE,
  VALUE_STYLE,
  BODY_STYLE,
  MUTED_STYLE,
  QUIET_STYLE,
  UNIT_STYLE,
  HOVER_SAND,
  FOCUS_RING,
  SWITCH_TRACK,
  SWITCH_THUMB,
} from '@/lib/ui'
import {
  Card,
  SectionHeader,
  Button,
  Badge,
  ToggleGroup,
  MetricCard,
  ProgressBar,
  DataRow,
  DataTable,
  Input,
  Select,
} from '@/components/ui'
import { type AccentDefinition, needsDarkTextOnFill } from './accents'

// ─── Props ───

interface DemoSectionsProps {
  accent: AccentDefinition
}

// ─── Shared accent transition style ───

const accentTransition: React.CSSProperties = {
  transition: 'background-color 150ms, color 150ms, border-color 150ms',
}

// ─── Section 1: Typography & Links ───

function TypographySection({ accent }: { accent: AccentDefinition }) {
  const linkClass = cn(
    FONT.body,
    'text-[14px]',
    WEIGHT.normal,
    accent.isMonochrome ? 'underline' : 'hover:underline',
  )

  return (
    <Card>
      <SectionHeader>Typography and accent usage</SectionHeader>
      <Card.Body>
        <div className="flex flex-col gap-4">
          <p className={cn(BODY_STYLE, 'text-[14px] leading-relaxed')}>
            RAMTT hjælper udholdshedsatleter med at forstå deres{' '}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className={linkClass}
              style={{ color: 'var(--accent-text)', ...accentTransition }}
            >
              træningsbelastning
            </a>{' '}
            og{' '}
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className={linkClass}
              style={{ color: 'var(--accent-text)', ...accentTransition }}
            >
              ernæringsbehov
            </a>{' '}
            over tid. Platformen kombinerer data fra Garmin, Wahoo og Strava med avancerede
            beregningsmodeller for at give konkrete anbefalinger.
          </p>

          <p className={cn(MUTED_STYLE, 'text-[13px] leading-relaxed')}>
            Denne side viser, hvordan accentfarven integreres i RAMTT&apos;s neutrale designsystem.
            Accent bruges til links, badges, toggles og interaktive elementer — aldrig til brødtekst.
          </p>

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className={cn(linkClass, 'inline-flex items-center gap-1 text-[13px]')}
            style={{ color: 'var(--accent-text)', ...accentTransition }}
          >
            Lær mere om RAMTT&apos;s beregningsmodeller →
          </a>
        </div>
      </Card.Body>
    </Card>
  )
}

// ─── Section 2: Buttons & Badges ───

function ButtonsBadgesSection({ accent }: { accent: AccentDefinition }) {
  const useDarkText = accent.needsDarkText || needsDarkTextOnFill(accent.hex)
  const fillTextColor = useDarkText ? 'var(--n1150)' : '#FDFCFA'

  return (
    <Card>
      <SectionHeader>Buttons and badges</SectionHeader>
      <Card.Body>
        <div className="flex flex-col gap-5">
          {/* Buttons row */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Primary CTA */}
            <Button
              className="hover:opacity-90 active:opacity-80"
              style={{
                backgroundColor: 'var(--accent)',
                color: fillTextColor,
                ...accentTransition,
              }}
            >
              Primary action
            </Button>

            {/* Secondary */}
            <button
              className={cn(
                FONT.body,
                WEIGHT.medium,
                'text-[13px]',
                'h-8 px-3.5',
                RADIUS.md,
                TRANSITION.colors,
                FOCUS_RING,
                'inline-flex items-center justify-center',
                'bg-transparent',
              )}
              style={{
                border: '0.5px solid var(--accent-border)',
                color: 'var(--accent-text)',
                ...accentTransition,
              }}
            >
              Secondary
            </button>

            {/* Ghost */}
            <button
              className={cn(
                FONT.body,
                WEIGHT.normal,
                'text-[13px]',
                'h-8 px-3.5',
                RADIUS.md,
                TRANSITION.colors,
                FOCUS_RING,
                'inline-flex items-center justify-center',
                'bg-transparent',
              )}
              style={{
                color: 'var(--accent-text)',
                ...accentTransition,
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--accent-wash)' }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
            >
              Ghost
            </button>
          </div>

          {/* Badges row */}
          <div className="flex flex-col gap-2">
            <span className={LABEL_STYLE}>Badges</span>
            <div className="flex flex-wrap items-center gap-2">
              {/* Filled accent */}
              <span
                className={cn(
                  FONT.label,
                  'h-[18px] px-1.5 text-[11px]',
                  WEIGHT.medium,
                  RADIUS.sm,
                  'inline-flex items-center justify-center leading-none whitespace-nowrap',
                )}
                style={{
                  backgroundColor: 'var(--accent)',
                  color: fillTextColor,
                  ...accentTransition,
                }}
              >
                Connected
              </span>

              {/* Soft accent */}
              <span
                className={cn(
                  FONT.label,
                  'h-[18px] px-1.5 text-[11px]',
                  WEIGHT.medium,
                  RADIUS.sm,
                  'inline-flex items-center justify-center leading-none whitespace-nowrap',
                )}
                style={{
                  backgroundColor: 'var(--accent-badge)',
                  border: '0.5px solid var(--accent-border)',
                  color: 'var(--accent-text)',
                  ...accentTransition,
                }}
              >
                Beta
              </span>

              {/* Outline accent */}
              <span
                className={cn(
                  FONT.label,
                  'h-[18px] px-1.5 text-[11px]',
                  WEIGHT.medium,
                  RADIUS.sm,
                  'inline-flex items-center justify-center leading-none whitespace-nowrap',
                )}
                style={{
                  border: '0.5px solid var(--accent-border)',
                  color: 'var(--accent-text)',
                  ...accentTransition,
                }}
              >
                v2.4.1
              </span>

              {/* Neutral for comparison */}
              <Badge>Default</Badge>
            </div>
          </div>

          {/* Icon dots */}
          <div className="flex flex-col gap-2">
            <span className={LABEL_STYLE}>Icon dot variants</span>
            <div className="flex items-center gap-3">
              {[
                { label: 'icon', cssVar: '--accent-icon' },
                { label: 'icon-light', cssVar: '--accent-icon-light' },
                { label: 'icon-lightest', cssVar: '--accent-icon-lightest' },
              ].map(({ label, cssVar }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: `var(${cssVar})`, ...accentTransition }}
                  />
                  <span className={cn(QUIET_STYLE, 'text-[11px]')}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

// ─── Section 3: Toggle & Selection ───

function ToggleSelectionSection({ accent }: { accent: AccentDefinition }) {
  const [tab, setTab] = useState('Overview')
  const [pillTab, setPillTab] = useState('Weekly')
  const [diet, setDiet] = useState('Balanced')
  const useDarkText = accent.needsDarkText || needsDarkTextOnFill(accent.hex)
  const fillTextColor = useDarkText ? 'var(--n1150)' : '#FDFCFA'

  const dietOptions = ['Balanced', 'Low carb', 'High protein', 'Keto']

  return (
    <Card>
      <SectionHeader>Toggle and selection states</SectionHeader>
      <Card.Body>
        <div className="flex flex-col gap-5">
          {/* Accent-filled ToggleGroup */}
          <div className="flex flex-col gap-2">
            <span className={LABEL_STYLE}>Accent as active state (replaces black fill)</span>
            <div
              className={cn('inline-flex overflow-hidden', BORDER.default, RADIUS.md)}
              role="radiogroup"
              aria-label="Navigation tabs"
            >
              {['Overview', 'Analytics', 'Sessions', 'Settings'].map((opt) => {
                const isSel = opt === tab
                return (
                  <button
                    key={opt}
                    role="radio"
                    aria-checked={isSel}
                    onClick={() => setTab(opt)}
                    className={cn(
                      FONT.label,
                      'h-8 px-3.5 text-[13px]',
                      TRANSITION.colors,
                      FOCUS_RING,
                      'inline-flex items-center justify-center',
                      'border-r-[0.5px] border-r-[var(--n400)] last:border-r-0',
                      isSel ? WEIGHT.strong : cn(WEIGHT.normal, 'text-[var(--n800)]', HOVER_SAND),
                    )}
                    style={
                      isSel
                        ? { backgroundColor: 'var(--accent)', color: fillTextColor, ...accentTransition }
                        : accentTransition
                    }
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Accent-wash pills */}
          <div className="flex flex-col gap-2">
            <span className={LABEL_STYLE}>Pill variant with accent wash</span>
            <div className="inline-flex gap-1" role="radiogroup" aria-label="Period selector">
              {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((opt) => {
                const isSel = opt === pillTab
                return (
                  <button
                    key={opt}
                    role="radio"
                    aria-checked={isSel}
                    onClick={() => setPillTab(opt)}
                    className={cn(
                      FONT.label,
                      'h-8 px-3.5 text-[13px]',
                      RADIUS.md,
                      BORDER.default,
                      TRANSITION.colors,
                      FOCUS_RING,
                      'inline-flex items-center justify-center',
                      !isSel && cn(WEIGHT.normal, 'text-[var(--n800)] bg-transparent', HOVER_SAND),
                    )}
                    style={
                      isSel
                        ? {
                            backgroundColor: 'var(--accent-wash)',
                            borderColor: 'var(--accent-border)',
                            color: 'var(--accent-text)',
                            fontWeight: 550,
                            ...accentTransition,
                          }
                        : accentTransition
                    }
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Diet type pills */}
          <div className="flex flex-col gap-2">
            <span className={LABEL_STYLE}>Diet type selection</span>
            <div className="inline-flex gap-1">
              {dietOptions.map((opt) => {
                const isSel = opt === diet
                return (
                  <button
                    key={opt}
                    onClick={() => setDiet(opt)}
                    className={cn(
                      FONT.label,
                      'h-7 px-2.5 text-[12px]',
                      RADIUS.md,
                      TRANSITION.colors,
                      FOCUS_RING,
                      'inline-flex items-center justify-center',
                      !isSel && cn(WEIGHT.normal, 'text-[var(--n800)]', HOVER_SAND),
                    )}
                    style={
                      isSel
                        ? {
                            backgroundColor: 'var(--accent)',
                            color: fillTextColor,
                            fontWeight: 550,
                            ...accentTransition,
                          }
                        : { border: '0.5px solid var(--n400)', ...accentTransition }
                    }
                  >
                    {opt}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

// ─── Section 4: Cards & Settings Items ───

function CardsSettingsSection() {
  const [activeItem, setActiveItem] = useState(0)

  const items = [
    { label: 'Training load', desc: 'Automatic load calculation from power data' },
    { label: 'Nutrition tracking', desc: 'Log meals and supplements daily' },
    { label: 'Recovery score', desc: 'HRV-based morning readiness check' },
  ]

  return (
    <Card>
      <SectionHeader>Cards and settings items</SectionHeader>
      <Card.Body>
        <div className="flex flex-col gap-5">
          {/* Settings-style list with accent dots */}
          <div className={cn('flex flex-col overflow-hidden', BORDER.default, RADIUS.lg)}>
            {items.map((item, i) => {
              const isActive = i === activeItem
              return (
                <button
                  key={item.label}
                  onClick={() => setActiveItem(i)}
                  className={cn(
                    'flex items-center gap-3 px-3.5 py-3 text-left',
                    TRANSITION.colors,
                    i !== items.length - 1 && 'border-b-[0.5px] border-b-[var(--n200)]',
                  )}
                  style={{
                    backgroundColor: isActive ? 'var(--accent-wash)' : 'var(--n50)',
                    ...accentTransition,
                  }}
                >
                  <div
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ backgroundColor: 'var(--accent-icon)', ...accentTransition }}
                  />
                  <div className="flex flex-col">
                    <span className={cn(FONT.body, 'text-[13px]', isActive ? WEIGHT.strong : WEIGHT.book, 'text-[var(--n1150)]')}>
                      {item.label}
                    </span>
                    <span className={cn(QUIET_STYLE, 'text-[12px]')}>{item.desc}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Accent left-border callout card */}
          <div
            className={cn('bg-[var(--n50)] p-3.5', RADIUS.lg)}
            style={{
              borderLeft: '3px solid var(--accent)',
              border: '0.5px solid var(--n400)',
              borderLeftWidth: '3px',
              borderLeftColor: 'var(--accent)',
              ...accentTransition,
            }}
          >
            <p className={cn(BODY_STYLE, 'text-[13px] leading-relaxed')}>
              Dit træningsprogram er optimeret til din nuværende FTP på 285W. Næste test
              anbefales om 3 uger for at justere intensitetszoner.
            </p>
          </div>

          {/* Card with accent-tinted header strip */}
          <div className={cn('overflow-hidden', BORDER.default, RADIUS.lg)}>
            <div
              className="h-1"
              style={{ backgroundColor: 'var(--accent-wash)', ...accentTransition }}
            />
            <div className="bg-[var(--n50)] p-3.5">
              <span className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
                Ugentlig opsummering
              </span>
              <p className={cn(MUTED_STYLE, 'text-[13px] mt-1')}>
                3 sessioner · 4:32 timer · 2.840 kJ · TSS 287
              </p>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

// ─── Section 5: Form Elements ───

function FormSection({ accent }: { accent: AccentDefinition }) {
  const [toggles, setToggles] = useState({ sync: true, weather: true, share: false })

  return (
    <Card>
      <SectionHeader>Form elements</SectionHeader>
      <Card.Body>
        <div className="flex flex-col gap-5">
          {/* Input with accent focus */}
          <div className="max-w-[320px]">
            <Input
              label="FTP"
              unit="W"
              type="number"
              placeholder="285"
              className="accent-input-override"
            />
            <span className={cn(QUIET_STYLE, 'text-[11px] mt-1 block')}>
              Focus the input to see the accent ring
            </span>
          </div>

          {/* Select */}
          <div className="max-w-[320px]">
            <Select
              label="Training zone model"
              options={[
                { value: 'coggan', label: 'Coggan (7 zones)' },
                { value: 'polarized', label: 'Polarized (3 zones)' },
                { value: 'seiler', label: 'Seiler (5 zones)' },
              ]}
              placeholder="Select model..."
            />
          </div>

          {/* Toggle switches with accent track color */}
          <div className="flex flex-col gap-3">
            <span className={LABEL_STYLE}>Preferences</span>
            {[
              { key: 'sync' as const, label: 'Auto-sync activities', desc: 'Automatically import from Garmin Connect' },
              { key: 'weather' as const, label: 'Import weather data', desc: 'Add temperature and wind to activity metadata' },
              { key: 'share' as const, label: 'Share with coach', desc: 'Allow your coach to view training data' },
            ].map(({ key, label, desc }) => {
              const checked = toggles[key]
              return (
                <div key={key} className="flex items-start justify-between gap-3">
                  <div className="flex flex-col">
                    <span className={cn(FONT.body, 'text-[13px]', WEIGHT.book, 'text-[var(--n1150)]')}>
                      {label}
                    </span>
                    <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)] mt-0.5')}>
                      {desc}
                    </span>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-checked={checked}
                    onClick={() => setToggles((prev) => ({ ...prev, [key]: !prev[key] }))}
                    className={cn(
                      'relative inline-flex shrink-0 items-center rounded-full',
                      TRANSITION.background,
                      FOCUS_RING,
                    )}
                    style={{
                      width: SWITCH_TRACK.width,
                      height: SWITCH_TRACK.height,
                      backgroundColor: checked ? 'var(--accent)' : 'var(--n400)',
                      ...accentTransition,
                    }}
                  >
                    <span
                      className={cn('block rounded-full bg-white', TRANSITION.transform)}
                      style={{
                        width: SWITCH_THUMB.size,
                        height: SWITCH_THUMB.size,
                        transform: checked
                          ? `translateX(${SWITCH_TRACK.width - SWITCH_THUMB.size - SWITCH_THUMB.inset}px)`
                          : `translateX(${SWITCH_THUMB.inset}px)`,
                      }}
                    />
                  </button>
                </div>
              )
            })}
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

// ─── Section 6: Data Display ───

function DataDisplaySection({ accent }: { accent: AccentDefinition }) {
  return (
    <Card>
      <SectionHeader>Data display</SectionHeader>
      <Card.Body>
        <div className="flex flex-col gap-5">
          {/* Mini DataTable */}
          <DataTable
            columns={[
              { key: 'date', label: 'Date', align: 'left' },
              { key: 'type', label: 'Type', align: 'left' },
              { key: 'duration', label: 'Duration', align: 'right', format: 'string' },
              { key: 'tss', label: 'TSS', align: 'right', format: 'number' },
            ]}
            data={[
              { date: '2026-04-12', type: 'Ride', duration: '2:15:00', tss: '142' },
              { date: '2026-04-11', type: 'Run', duration: '0:48:30', tss: '67' },
              { date: '2026-04-10', type: 'Swim', duration: '1:02:00', tss: '85' },
              { date: '2026-04-09', type: 'Ride', duration: '1:30:00', tss: '98' },
            ]}
          />

          {/* MetricCard row */}
          <div className="grid grid-cols-3 gap-3">
            <MetricCard label="Weekly TSS" value="392" unit="pts" subtitle="+12% vs last week" subtitleColor="positive" />
            <MetricCard
              label="CTL"
              value="78.4"
              badge={{ label: 'Peak', color: accent.hex }}
            />
            <MetricCard label="ATL" value="92.1" unit="pts" subtitle="High fatigue" subtitleColor="warning" />
          </div>

          {/* DataRows with accent delta */}
          <div>
            <DataRow
              label="Avg power"
              value="245"
              unit="W"
              delta="+18"
              deltaColor="positive"
            />
            <DataRow
              label="Normalized power"
              value="268"
              unit="W"
              delta="+7"
              deltaColor="positive"
            />
            <DataRow
              label="Heart rate"
              value="152"
              unit="bpm"
              delta="-3"
              deltaColor="negative"
            />
            <DataRow
              label="Cadence"
              value="88"
              unit="rpm"
              badge={
                <span
                  className={cn(
                    FONT.label,
                    'h-[18px] px-1.5 text-[11px]',
                    WEIGHT.medium,
                    RADIUS.sm,
                    'inline-flex items-center justify-center leading-none',
                  )}
                  style={{
                    backgroundColor: 'var(--accent-badge)',
                    border: '0.5px solid var(--accent-border)',
                    color: 'var(--accent-text)',
                    ...accentTransition,
                  }}
                >
                  Optimal
                </span>
              }
            />
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

// ─── Section 7: Progress & Status ───

function ProgressStatusSection({ accent }: { accent: AccentDefinition }) {
  return (
    <Card>
      <SectionHeader>Progress and status</SectionHeader>
      <Card.Body>
        <div className="flex flex-col gap-5">
          {/* ProgressBar with accent fill */}
          <div className="flex flex-col gap-2">
            <span className={LABEL_STYLE}>Weekly goal completion</span>
            <ProgressBar value={67} max={100} color={accent.hex} label="67%" />
          </div>

          {/* Status row */}
          <div className="flex flex-col gap-2">
            <span className={LABEL_STYLE}>Connection status</span>
            <div className="flex flex-wrap items-center gap-4">
              {[
                { label: 'Garmin', color: 'var(--positive)', status: 'Connected' },
                { label: 'Strava', cssVar: '--accent', status: 'Syncing' },
                { label: 'Wahoo', color: 'var(--negative)', status: 'Error' },
                { label: 'TrainerRoad', color: 'var(--n400)', status: 'Disabled' },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      backgroundColor: item.cssVar ? `var(${item.cssVar})` : item.color,
                      ...accentTransition,
                    }}
                  />
                  <span className={cn(FONT.body, 'text-[13px]', WEIGHT.book, 'text-[var(--n1150)]')}>
                    {item.label}
                  </span>
                  <span className={cn(QUIET_STYLE, 'text-[11px]')}>{item.status}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Notification counter badge */}
          <div className="flex flex-col gap-2">
            <span className={LABEL_STYLE}>Notification badge</span>
            <div className="flex items-center gap-4">
              <div className="relative inline-flex">
                <div className={cn('h-8 w-8 bg-[var(--n200)]', RADIUS.md)} />
                <span
                  className={cn(
                    'absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full',
                    FONT.label,
                    'text-[10px] tabular-nums',
                    WEIGHT.medium,
                  )}
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: accent.needsDarkText || needsDarkTextOnFill(accent.hex) ? 'var(--n1150)' : '#FDFCFA',
                    ...accentTransition,
                  }}
                >
                  3
                </span>
              </div>
              <div className="relative inline-flex">
                <div className={cn('h-8 w-8 bg-[var(--n200)]', RADIUS.md)} />
                <span
                  className={cn(
                    'absolute -top-1.5 -right-1.5 flex h-[18px] min-w-[18px] items-center justify-center rounded-full px-1',
                    FONT.label,
                    'text-[10px] tabular-nums',
                    WEIGHT.medium,
                  )}
                  style={{
                    backgroundColor: 'var(--accent)',
                    color: accent.needsDarkText || needsDarkTextOnFill(accent.hex) ? 'var(--n1150)' : '#FDFCFA',
                    ...accentTransition,
                  }}
                >
                  12
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card.Body>
    </Card>
  )
}

// ─── Section 8: Text Selection Test ───

function TextSelectionSection() {
  return (
    <Card>
      <SectionHeader>Text selection test</SectionHeader>
      <Card.Body>
        <div className="flex flex-col gap-3">
          <p className={cn(MUTED_STYLE, 'text-[12px]')}>
            Marker teksten herunder for at se selection-farven
          </p>
          <p className={cn(BODY_STYLE, 'text-[14px] leading-relaxed accent-selection')}>
            RAMTT er en platform designet til seriøse udholdshedsatleter, der ønsker at forstå
            sammenhængen mellem træning, ernæring og restitution. Ved at kombinere data fra
            wattmålere, pulsmålere og GPS med avancerede fysiologiske modeller kan RAMTT give
            præcise anbefalinger om alt fra kulhydratindtag under lange ture til optimal
            søvnlængde mellem intensive træningsblokke. Platformen understøtter både dansk og
            engelsk og er bygget med et varmt, minimalistisk designsprog inspireret af sand,
            papir og skandinavisk æstetik. Hver datapunkt præsenteres med omhu — aldrig mere end
            nødvendigt, altid med kontekst.
          </p>
        </div>
      </Card.Body>
    </Card>
  )
}

// ─── Main Export ───

export function DemoSections({ accent }: DemoSectionsProps) {
  return (
    <div className="flex flex-col gap-6 pb-16" style={{ maxWidth: 640 }}>
      <TypographySection accent={accent} />
      <ButtonsBadgesSection accent={accent} />
      <ToggleSelectionSection accent={accent} />
      <CardsSettingsSection />
      <FormSection accent={accent} />
      <DataDisplaySection accent={accent} />
      <ProgressStatusSection accent={accent} />
      <TextSelectionSection />
    </div>
  )
}
