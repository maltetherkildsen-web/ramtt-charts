'use client'

import { useState } from 'react'
import { cn, FONT, WEIGHT, RADIUS, BORDER, TRANSITION, FOCUS_RING, LABEL_STYLE } from '@/lib/ui'
import { type AccentDefinition, needsDarkTextOnFill } from './accents'
import {
  ToggleSwitch,
  StatusDot,
  AccentBadge,
  AccentButton,
  DietPill,
  IntegrationIcon,
  accentTransition,
} from './components'

// ─── Sidebar Navigation Items ───

const SIDEBAR_ITEMS = [
  'Integrations',
  'Zones & thresholds',
  'Gut training',
  'Dietary & allergens',
  'Coach permissions',
  'Appearance',
  'Notifications',
  'Email preferences',
  'Shortcuts',
  'General',
  'Beta features',
  'Support & feedback',
  'What\'s new',
  'Connected apps data',
  'Data & privacy',
  'Advanced',
  'Account',
] as const

// ─── Settings Sidebar ───

function SettingsSidebar({
  active,
  onSelect,
}: {
  active: string
  onSelect: (item: string) => void
}) {
  return (
    <div
      className="flex w-[190px] shrink-0 flex-col gap-0.5 py-5 pr-3 pl-4"
      style={{ borderRight: '0.5px solid var(--n400)' }}
    >
      <span className={cn(FONT.body, 'text-[18px]', WEIGHT.normal, 'text-[var(--n1150)] mb-3')}>
        Settings
      </span>
      {SIDEBAR_ITEMS.map((item) => {
        const isActive = item === active
        return (
          <button
            key={item}
            onClick={() => onSelect(item)}
            className={cn(
              FONT.body, 'text-[13px]',
              'flex items-center gap-2 px-2.5 py-1.5 text-left',
              'rounded-[5px]',
              TRANSITION.colors,
              isActive ? WEIGHT.strong : WEIGHT.normal,
              !isActive && 'text-[var(--n800)]',
              isActive && 'text-[var(--n800)]',
            )}
            style={
              isActive
                ? { backgroundColor: 'var(--accent-wash)', ...accentTransition }
                : accentTransition
            }
          >
            {/* Accent dot — 4px, only visible when active */}
            <span
              className="h-1 w-1 shrink-0 rounded-[1px]"
              style={{
                backgroundColor: isActive ? 'var(--accent)' : 'transparent',
                ...accentTransition,
              }}
            />
            {item}
          </button>
        )
      })}
    </div>
  )
}

// ─── Section Header (inside content) ───

function ContentSectionHeader({ title }: { title: string }) {
  return (
    <div className="flex items-center gap-2 mb-1">
      <span
        className="h-[7px] w-[7px] shrink-0 rounded-full"
        style={{ backgroundColor: 'var(--accent)', ...accentTransition }}
      />
      <span className={cn(FONT.body, 'text-[11px]', WEIGHT.strong, 'text-[var(--n800)]')}>
        {title}
      </span>
    </div>
  )
}

// ─── Content Card Wrapper ───

function ContentCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn('bg-[var(--n50)] p-4', RADIUS.lg, BORDER.default, className)}
    >
      {children}
    </div>
  )
}

// ─── Integration Cards ───

function IntegrationCards({ accent }: { accent: AccentDefinition }) {
  const isDark = needsDarkTextOnFill(accent.hex)
  const fillText = isDark ? 'var(--n1150)' : '#FDFCFA'

  return (
    <ContentCard>
      {/* Strava — connected */}
      <div className="flex items-center gap-3 pb-3 border-b-[0.5px] border-b-[var(--n200)]">
        <IntegrationIcon letters="ST" color="#FC4C02" />
        <div className="flex flex-1 flex-col">
          <div className="flex items-center gap-2">
            <span className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
              Strava
            </span>
            <span
              className={cn(
                FONT.label, 'text-[10px]', WEIGHT.medium,
                'inline-flex items-center gap-1 px-1.5 py-0.5',
                RADIUS.sm,
              )}
              style={{
                color: '#16A34A',
                backgroundColor: 'rgba(22, 163, 74, 0.08)',
              }}
            >
              <span className="h-1 w-1 rounded-full bg-[#16A34A]" />
              Connected
            </span>
          </div>
          <span className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)]')}>
            Last sync: 22 Mar, 14:38
          </span>
        </div>
      </div>

      {/* Garmin — not connected */}
      <div className="flex items-center gap-3 pt-3">
        <IntegrationIcon letters="GA" color="var(--n800)" bgOpacity={0.06} />
        <div className="flex flex-1 flex-col">
          <span className={cn(FONT.body, 'text-[13px]', WEIGHT.book, 'text-[var(--n1150)]')}>
            Garmin
          </span>
          <span className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)]')}>
            Not connected
          </span>
        </div>
        <button
          className={cn(
            FONT.body, WEIGHT.medium,
            'text-[12px] h-7 px-3',
            RADIUS.md,
            TRANSITION.colors,
            FOCUS_RING,
            'inline-flex items-center justify-center',
          )}
          style={{
            backgroundColor: 'var(--accent)',
            color: fillText,
            ...accentTransition,
          }}
        >
          Connect
        </button>
      </div>
    </ContentCard>
  )
}

// ─── Coming Soon Integrations ───

function ComingSoonIntegrations() {
  const items = [
    { letters: 'WH', name: 'WHOOP', status: 'Connected', connected: true, color: '#44B78B' },
    { letters: 'PO', name: 'Polar', status: 'Coming soon', connected: false, color: 'var(--n600)' },
    { letters: 'OU', name: 'Oura', status: 'Coming soon', connected: false, color: 'var(--n600)' },
    { letters: 'FB', name: 'Fitbit', status: 'Coming soon', connected: false, color: 'var(--n600)' },
  ]

  return (
    <ContentCard>
      <div className="flex flex-col">
        {items.map((item, i) => (
          <div
            key={item.name}
            className={cn(
              'flex items-center gap-3 py-2',
              i !== items.length - 1 && 'border-b-[0.5px] border-b-[var(--n200)]',
            )}
          >
            <IntegrationIcon letters={item.letters} color={item.color} bgOpacity={item.connected ? 0.08 : 0.04} />
            <span className={cn(
              FONT.body, 'text-[13px]',
              item.connected ? WEIGHT.book : WEIGHT.normal,
              item.connected ? 'text-[var(--n1150)]' : 'text-[var(--n600)]',
            )}>
              {item.name}
            </span>
            <span className={cn(
              FONT.body, 'text-[11px]', WEIGHT.normal, 'ml-auto',
              item.connected ? 'text-[#16A34A]' : 'text-[var(--n600)]',
            )}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </ContentCard>
  )
}

// ─── Sync Preferences ───

function SyncPreferences() {
  const [toggles, setToggles] = useState({
    autoSync: true,
    webhooks: true,
    sleep: false,
  })

  const toggle = (key: keyof typeof toggles) =>
    setToggles((prev) => ({ ...prev, [key]: !prev[key] }))

  return (
    <ContentCard>
      <span className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)] mb-3 block')}>
        Preferences
      </span>
      <div className="flex flex-col gap-0.5">
        <div className="py-2 border-b-[0.5px] border-b-[var(--n200)]">
          <ToggleSwitch
            checked={toggles.autoSync}
            onChange={() => toggle('autoSync')}
            label="Auto-sync on open"
            description="Sync new activities when RAMTT opens"
          />
        </div>
        <div className="py-2 border-b-[0.5px] border-b-[var(--n200)]">
          <ToggleSwitch
            checked={toggles.webhooks}
            onChange={() => toggle('webhooks')}
            label="Background webhooks"
            description="Receive activities via Strava push notifications"
          />
        </div>
        <div className="py-2">
          <ToggleSwitch
            checked={toggles.sleep}
            onChange={() => toggle('sleep')}
            label="Import sleep & recovery"
            description="Pull HRV, sleep stages from WHOOP and Oura"
          />
        </div>
      </div>
    </ContentCard>
  )
}

// ─── Diet Type ───

function DietTypeCard({ accent }: { accent: AccentDefinition }) {
  const [diet, setDiet] = useState('Omnivore')
  const options = ['Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian']

  return (
    <ContentCard>
      <span className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)] mb-3 block')}>
        Diet type
      </span>
      <div className="flex flex-wrap gap-1.5">
        {options.map((opt) => (
          <DietPill
            key={opt}
            label={opt}
            selected={opt === diet}
            onClick={() => setDiet(opt)}
            accentHex={accent.hex}
          />
        ))}
      </div>
    </ContentCard>
  )
}

// ─── Account Card ───

function AccountCard({ accent }: { accent: AccentDefinition }) {
  const linkClass = cn(
    FONT.body, 'text-[13px]', WEIGHT.medium,
    accent.isMonochrome ? 'underline' : 'hover:underline',
  )

  return (
    <ContentCard>
      <span className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)] mb-3 block')}>
        Account
      </span>
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n600)]')}>Email</span>
          <span className={cn(FONT.body, 'text-[13px]', WEIGHT.book, 'text-[var(--n1150)]')}>malte@ramtt.app</span>
        </div>
        <div className="flex items-center justify-between">
          <span className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n600)]')}>Plan</span>
          <span
            className={cn(FONT.body, 'text-[13px]', WEIGHT.strong)}
            style={{ color: 'var(--accent-text)', ...accentTransition }}
          >
            Free (all features)
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n600)]')}>Member since</span>
          <span className={cn(FONT.body, 'text-[13px] tabular-nums', WEIGHT.book, 'text-[var(--n1150)]')}>January 2026</span>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className={linkClass}
          style={{ color: 'var(--accent-text)', ...accentTransition }}
        >
          Change password
        </a>
        <span className="text-[var(--n400)]">·</span>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className={linkClass}
          style={{ color: 'var(--accent-text)', ...accentTransition }}
        >
          Export data
        </a>
      </div>
    </ContentCard>
  )
}

// ─── Components Showcase ───

function ComponentsShowcase({ accent }: { accent: AccentDefinition }) {
  return (
    <ContentCard className="flex flex-col gap-5">
      <span className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
        Components
      </span>

      {/* Badges */}
      <div className="flex flex-col gap-2">
        <span className={LABEL_STYLE}>Badges</span>
        <div className="flex flex-wrap items-center gap-2">
          <AccentBadge variant="soft" accentHex={accent.hex}>Badge</AccentBadge>
          <AccentBadge variant="filled" accentHex={accent.hex}>Filled</AccentBadge>
          <AccentBadge variant="outline" accentHex={accent.hex}>Outline</AccentBadge>
          {/* Icon dots */}
          <div className="flex items-center gap-1.5 ml-2">
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--accent-icon-lightest)', ...accentTransition }} />
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--accent-icon-light)', ...accentTransition }} />
            <div className="h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--accent-icon)', ...accentTransition }} />
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-2">
        <span className={LABEL_STYLE}>Buttons</span>
        <div className="flex flex-wrap items-center gap-2">
          <AccentButton variant="primary" accentHex={accent.hex} size="sm">Primary</AccentButton>
          <AccentButton variant="secondary" accentHex={accent.hex} size="sm">Secondary</AccentButton>
          <AccentButton variant="ghost" accentHex={accent.hex} size="sm">Ghost</AccentButton>
        </div>
      </div>

      {/* Callout */}
      <div className="flex flex-col gap-2">
        <span className={LABEL_STYLE}>Callout</span>
        <div
          className={cn('bg-[var(--accent-wash)] p-3', RADIUS.md)}
          style={{
            borderLeft: '3px solid var(--accent)',
            ...accentTransition,
          }}
        >
          <span className={cn(FONT.body, 'text-[12px]', WEIGHT.medium, 'text-[var(--n1150)] block')}>
            Accent callout
          </span>
          <span className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n800)] mt-0.5 block')}>
            Border-left + wash background for contextual information
          </span>
        </div>
      </div>

      {/* Input focus */}
      <div className="flex flex-col gap-2">
        <span className={LABEL_STYLE}>Input focus ring</span>
        <div className="max-w-[280px]">
          <label className={cn(FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n800)] mb-1 block')}>
            FTP threshold
          </label>
          <input
            type="number"
            placeholder="285"
            defaultValue="285"
            className={cn(
              FONT.body, 'text-[13px]', WEIGHT.normal,
              'h-8 w-full px-3',
              RADIUS.md,
              'bg-[var(--bg)] text-[var(--n1150)]',
              'placeholder:text-[var(--n600)]',
              'outline-none',
            )}
            style={{
              border: '0.5px solid var(--accent)',
              boxShadow: '0 0 0 2px var(--accent-wash)',
              ...accentTransition,
            }}
          />
        </div>
      </div>

      {/* Progress bar */}
      <div className="flex flex-col gap-2">
        <span className={LABEL_STYLE}>Progress</span>
        <div className="flex items-center gap-3">
          <div className={cn('h-1.5 flex-1', RADIUS.full, 'bg-[var(--n200)] overflow-hidden')}>
            <div
              className={cn('h-full', RADIUS.full)}
              style={{
                width: '67%',
                backgroundColor: 'var(--accent)',
                ...accentTransition,
              }}
            />
          </div>
          <span className={cn(FONT.body, 'text-[12px] tabular-nums', WEIGHT.book, 'text-[var(--n800)]')}>
            67%
          </span>
        </div>
      </div>

      {/* Status dots */}
      <div className="flex flex-col gap-2">
        <span className={LABEL_STYLE}>Status</span>
        <div className="flex flex-wrap items-center gap-4">
          <StatusDot color="#16A34A" label="Connected" status="" />
          <StatusDot color="var(--accent)" label="Syncing" status="" />
          <StatusDot color="#F24E1E" label="Error" status="" />
          <StatusDot color="var(--n600)" label="Disabled" status="" muted />
        </div>
      </div>
    </ContentCard>
  )
}

// ─── Text Selection Test ───

function TextSelectionTest() {
  return (
    <ContentCard>
      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n600)] mb-2 block')}>
        Marker teksten herunder
      </span>
      <p
        className={cn(
          FONT.body, 'text-[13px]', WEIGHT.normal,
          'text-[var(--n1150)] leading-[1.8] accent-selection',
        )}
        style={{ userSelect: 'text' }}
      >
        RAMTT bruger din traeningsdata til at beregne personlige ernaeringsanbefalinger.
        Hver session analyseres gennem en pipeline der tager hoejde for intensitet, varighed,
        sport, temperatur, og din individuelle tarmkapacitet. Resultatet er praecise
        gram-anbefalinger for kulhydrat, protein og vaeske — tilpasset din krop og din session.
      </p>
    </ContentCard>
  )
}

// ─── Placeholder Section ───

function PlaceholderSection({ name }: { name: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <span className={cn(FONT.body, 'text-[13px]', WEIGHT.book, 'text-[var(--n600)]')}>
        {name}
      </span>
      <span className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)] mt-1')}>
        Switch sidebar sections to test the accent wash + dot active state
      </span>
    </div>
  )
}

// ─── Integrations Section (the main event) ───

function IntegrationsSection({ accent }: { accent: AccentDefinition }) {
  return (
    <div className="flex flex-col gap-4">
      <ContentSectionHeader title="Integrations" />
      <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] leading-[1.6] mb-1')}>
        Connect your devices and platforms. RAMTT uses your training data to calculate
        personalized nutrition recommendations.
      </p>
      <IntegrationCards accent={accent} />
      <ComingSoonIntegrations />
      <SyncPreferences />
      <DietTypeCard accent={accent} />
      <AccountCard accent={accent} />
      <ComponentsShowcase accent={accent} />
      <TextSelectionTest />
    </div>
  )
}

// ─── Main Export ───

interface SettingsReplicaProps {
  accent: AccentDefinition
}

export function SettingsReplica({ accent }: SettingsReplicaProps) {
  const [activeSection, setActiveSection] = useState<string>('Integrations')

  return (
    <div
      className={cn('flex flex-1', BORDER.default, RADIUS.lg, 'overflow-hidden bg-[var(--bg)]')}
      style={{ minHeight: 600 }}
    >
      {/* Sidebar */}
      <SettingsSidebar active={activeSection} onSelect={setActiveSection} />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5" style={{ maxHeight: 'calc(100vh - 120px)' }}>
        {activeSection === 'Integrations' ? (
          <IntegrationsSection accent={accent} />
        ) : (
          <PlaceholderSection name={activeSection} />
        )}
      </div>
    </div>
  )
}
