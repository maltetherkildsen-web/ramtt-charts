'use client'

import { useState } from 'react'
import {
  MetricCard,
  Badge,
  ToggleGroup,
  Card,
  DataRow,
  SectionHeader,
  Button,
  SettingsCard,
  DataTable,
  ProgressBar,
  Input,
  Select,
} from '@/components/ui'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Demo Page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DemoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="flex flex-col gap-2">
      <h2
        style={{
          fontFamily: 'var(--font-label)',
          fontWeight: 500,
          fontSize: 11,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: 'var(--n600)',
        }}
      >
        {title}
      </h2>
      {children}
    </section>
  )
}

// ─── 1. Metrics Strip ───

function MetricsStripDemo() {
  return (
    <DemoSection title="Metrics Strip">
      <Card padding="none">
        <div className="flex">
          {[
            { label: 'Duration', value: '1:28:40' },
            { label: 'Avg Power', value: '238', unit: 'W', subtitle: 'Max 904W' },
            { label: 'Avg HR', value: '155', unit: 'bpm', subtitle: 'Max 189bpm' },
            { label: 'TSS', value: '187', subtitle: 'IF 0.92' },
            { label: 'Energy', value: '1,842', unit: 'kJ' },
            { label: 'Form', value: '-8 → -14', subtitle: '-6 loaded', subtitleColor: 'positive' as const },
            { label: 'Energy Zone', value: '192', unit: 'g', badge: { label: 'Z6', color: 'var(--negative)' } },
          ].map((m, i, arr) => (
            <div
              key={m.label}
              className="flex-1"
              style={{ padding: '8px 14px', ...(i < arr.length - 1 ? { borderRight: '0.5px solid var(--n400)' } : {}) }}
            >
              <MetricCard {...m} />
            </div>
          ))}
        </div>
      </Card>

      {/* Compact variant */}
      <Card>
        <SectionHeader>Compact Metrics</SectionHeader>
        <div className="mt-3 flex flex-col gap-1">
          <MetricCard compact label="Volume" value="573.43K" />
          <MetricCard compact label="P/E Ratio" value="102.13" />
          <MetricCard compact label="Market Cap" value="$3.49T" />
          <MetricCard compact label="Dividend Yield" value="0.44%" />
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── 2. Toggle Groups ───

function ToggleGroupDemo() {
  const [channel, setChannel] = useState('power')
  const [period, setPeriod] = useState('1M')
  const [zone, setZone] = useState('off')
  const [filters, setFilters] = useState<string | string[]>(['ALL', 'WARNING'])

  return (
    <DemoSection title="Toggle Groups">
      <div className="flex flex-col gap-4">
        {/* Channel selector */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--n800)' }}>
            Channel selector (default variant)
          </span>
          <ToggleGroup
            value={channel}
            onChange={(v) => setChannel(v as string)}
            options={[
              { value: 'power', label: 'Power' },
              { value: 'hr', label: 'HR' },
              { value: 'speed', label: 'Speed' },
              { value: 'cadence', label: 'Cadence' },
              { value: 'elevation', label: 'Elevation' },
            ]}
          />
        </div>

        {/* Time period */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--n800)' }}>
            Time period (sm size)
          </span>
          <ToggleGroup
            value={period}
            onChange={(v) => setPeriod(v as string)}
            size="sm"
            options={['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'MAX']}
          />
        </div>

        {/* Zone selector */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--n800)' }}>
            Zone mode (sm, pill variant)
          </span>
          <ToggleGroup
            value={zone}
            onChange={(v) => setZone(v as string)}
            size="sm"
            variant="pill"
            options={['Off', 'Power', 'HR']}
          />
        </div>

        {/* Underline variant */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--n800)' }}>
            Tab navigation (underline variant)
          </span>
          <ToggleGroup
            value={channel}
            onChange={(v) => setChannel(v as string)}
            variant="underline"
            options={[
              { value: 'power', label: 'Power' },
              { value: 'hr', label: 'HR' },
              { value: 'speed', label: 'Speed' },
              { value: 'cadence', label: 'Cadence' },
            ]}
          />
        </div>

        {/* Multi-select filter */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--n800)' }}>
            Filter pills (multi-select, pill variant)
          </span>
          <ToggleGroup
            value={filters}
            onChange={setFilters}
            multi
            variant="pill"
            options={['ALL', 'INFO', 'WARNING', 'CRITICAL']}
          />
        </div>
      </div>
    </DemoSection>
  )
}

// ─── 3. Card with DataRows ───

function DataRowDemo() {
  return (
    <DemoSection title="Card with Data Rows">
      <div className="grid grid-cols-2 gap-4">
        <Card>
          <Card.Header>
            <Card.Title>Market Data</Card.Title>
          </Card.Header>
          <Card.Body>
            <DataRow label="Close" value="$110.25" />
            <DataRow label="Open" value="$110.28" />
            <DataRow label="High" value="$111.34" />
            <DataRow label="Low" value="$109.91" />
            <DataRow label="Volume" value="3,603,495" />
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Session Readout</Card.Title>
          </Card.Header>
          <Card.Body>
            <DataRow
              label="Power"
              value="167"
              unit="W"
              delta="-92"
              deltaColor="negative"
              badge={<Badge color="positive" size="sm">Z2</Badge>}
            />
            <DataRow label="Heart Rate" value="142" unit="bpm" delta="+8" deltaColor="positive" />
            <DataRow label="Cadence" value="88" unit="rpm" />
            <DataRow label="Speed" value="34.2" unit="km/h" />
            <DataRow label="Elevation" value="482" unit="m" />
          </Card.Body>
        </Card>
      </div>
    </DemoSection>
  )
}

// ─── 4. Settings Cards ───

function SettingsDemo() {
  return (
    <DemoSection title="Settings Cards">
      <div className="flex flex-col gap-px">
        <SettingsCard
          icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.5"/><path d="M10 6v4l2.5 2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
          title="Integrations"
          description="Connect and sync Strava and wearables."
          onClick={() => {}}
        />
        <SettingsCard
          icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M7 10h6M10 7v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}
          title="Thresholds & Zones"
          description="FTP, LTHR, and training zone configuration."
          onClick={() => {}}
        />
        <SettingsCard
          icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M10 3a7 7 0 100 14 7 7 0 000-14z" stroke="currentColor" strokeWidth="1.5"/><path d="M10 7v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="10" cy="13" r="0.75" fill="currentColor"/></svg>}
          title="Data Integrity"
          description="Review data quality and fix anomalies."
          onClick={() => {}}
        />
        <SettingsCard
          title="Athlete Profile"
          description="Personal details and preferences. No navigation."
        />
      </div>
    </DemoSection>
  )
}

// ─── 4b. White-Lift Cards (on sand background) ───

function WhiteLiftDemo() {
  return (
    <DemoSection title="White-Lift Cards (on sand background)">
      <div className="grid grid-cols-2 gap-4">
        {[
          { title: 'Design Workspace', desc: 'Updated 12 days ago' },
          { title: 'ramtt-charts', desc: 'Updated 1 day ago' },
          { title: 'RAMTT', desc: 'Evidensbaseret sportsernæring.' },
          { title: 'Coaching', desc: 'Planlægning af træning til mine atleter.' },
        ].map((p) => (
          <div
            key={p.title}
            className="rounded-[var(--radius-lg)] bg-transparent transition-colors duration-150 hover:bg-white"
            style={{ border: '0.5px solid var(--n400)', padding: '16px 18px' }}
          >
            <div style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 13, color: 'var(--n1150)' }}>
              {p.title}
            </div>
            <div className="mt-1" style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 11, color: 'var(--n800)' }}>
              {p.desc}
            </div>
          </div>
        ))}
      </div>
    </DemoSection>
  )
}

// ─── 5. Data Table ───

const TABLE_DATA = [
  { date: '2024-01-15', open: 182.16, close: 185.92, high: 186.74, low: 181.91, volume: '62.3M' },
  { date: '2024-01-14', open: 181.27, close: 182.68, high: 183.52, low: 180.17, volume: '47.1M' },
  { date: '2024-01-13', open: 183.89, close: 181.18, high: 184.26, low: 180.93, volume: '55.8M' },
  { date: '2024-01-12', open: 184.50, close: 183.63, high: 185.15, low: 182.73, volume: '41.2M' },
  { date: '2024-01-11', open: 186.09, close: 184.40, high: 186.74, low: 183.62, volume: '53.6M' },
]

function DataTableDemo() {
  return (
    <DemoSection title="Data Table">
      <Card>
        <Card.Header>
          <Card.Title>Historical Prices</Card.Title>
          <Card.Action>
            <Button variant="ghost" size="sm">Export</Button>
          </Card.Action>
        </Card.Header>
        <Card.Body>
          <DataTable
            columns={[
              { key: 'date', label: 'Date', width: '120px' },
              { key: 'open', label: 'Open', align: 'right', format: 'number' },
              { key: 'close', label: 'Close', align: 'right', format: 'number' },
              { key: 'high', label: 'High', align: 'right', format: 'number' },
              { key: 'low', label: 'Low', align: 'right', format: 'number' },
              { key: 'volume', label: 'Volume', align: 'right' },
            ]}
            data={TABLE_DATA}
            onRowClick={(row) => console.log('Clicked:', row)}
          />
        </Card.Body>
      </Card>
    </DemoSection>
  )
}

// ─── 6. Badges Gallery ───

function BadgesDemo() {
  return (
    <DemoSection title="Badges">
      <Card>
        <div className="flex flex-wrap items-center gap-3">
          {/* Semantic filled */}
          <Badge color="positive">Safe</Badge>
          <Badge color="negative">Critical</Badge>
          <Badge color="warning">Build</Badge>
          <Badge color="info">New</Badge>
          <Badge>Default</Badge>

          {/* Outline */}
          <Badge variant="outline" color="positive">+7.55%</Badge>
          <Badge variant="outline" color="negative">-0.07%</Badge>
          <Badge variant="outline">Effort 7</Badge>

          {/* Custom zone colors */}
          <Badge color="var(--negative)" size="md">Z6</Badge>
          <Badge color="#22c55e" size="md">Z2</Badge>
          <Badge color="#eab308" size="md">Z3</Badge>

          {/* Size md */}
          <Badge size="md" color="info">Medium</Badge>
          <Badge size="md" variant="outline" color="positive">Optimal</Badge>
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── 7. Buttons ───

function ButtonsDemo() {
  return (
    <DemoSection title="Buttons">
      <Card>
        <div className="flex flex-wrap items-center gap-3">
          <Button>Mark all read</Button>
          <Button variant="outline">Query transcripts</Button>
          <Button variant="ghost">Dismiss</Button>
          <Button variant="outline" size="sm">Small</Button>
          <Button variant="outline" size="lg">Large</Button>
          <Button disabled>Disabled</Button>
          <Button variant="outline" disabled>Disabled outline</Button>
          <Button variant="ghost" size="icon">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M2 8h12M8 2v12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </Button>
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── 8. Progress Bars ───

function ProgressDemo() {
  return (
    <DemoSection title="Progress Bars">
      <Card>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--n800)' }}>
              Default (43%)
            </span>
            <ProgressBar value={43} max={100} />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--n800)' }}>
              Fuel progress (positive, with label)
            </span>
            <ProgressBar value={192} max={200} color="positive" label="192g of 200g" />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--n800)' }}>
              Quality Index (warning)
            </span>
            <ProgressBar value={58} max={100} color="warning" label="58%" />
          </div>
          <div className="flex flex-col gap-1.5">
            <span className="text-[11px]" style={{ fontFamily: 'var(--font-sans)', color: 'var(--n800)' }}>
              Critical (negative)
            </span>
            <ProgressBar value={12} max={100} color="negative" label="12%" />
          </div>
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── 9. Form Elements ───

function FormsDemo() {
  const [ftp, setFtp] = useState('280')
  const [status, setStatus] = useState('active')

  return (
    <DemoSection title="Form Elements">
      <div className="grid grid-cols-3 gap-4">
        <Card>
          <Card.Header>
            <Card.Title>Inputs</Card.Title>
          </Card.Header>
          <Card.Body className="flex flex-col gap-3">
            <Input placeholder="Search..." />
            <Input label="FTP" value={ftp} onChange={(e) => setFtp(e.target.value)} type="number" unit="W" />
            <Input label="Name" placeholder="Enter athlete name" />
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Selects</Card.Title>
          </Card.Header>
          <Card.Body className="flex flex-col gap-3">
            <Select
              label="Status"
              value={status}
              onChange={setStatus}
              options={[
                { value: 'active', label: 'Active' },
                { value: 'dismissed', label: 'Dismissed' },
                { value: 'archived', label: 'Archived' },
              ]}
            />
            <Select
              label="Sport"
              placeholder="Select sport..."
              options={[
                { value: 'cycling', label: 'Cycling' },
                { value: 'running', label: 'Running' },
                { value: 'triathlon', label: 'Triathlon' },
              ]}
            />
          </Card.Body>
        </Card>

        <Card>
          <Card.Header>
            <Card.Title>Combined</Card.Title>
          </Card.Header>
          <Card.Body className="flex flex-col gap-3">
            <Input label="Max HR" value="189" type="number" unit="bpm" />
            <Select
              label="Zone Model"
              value="coggan"
              options={[
                { value: 'coggan', label: 'Coggan (7-zone)' },
                { value: 'polarized', label: 'Polarized (3-zone)' },
              ]}
            />
            <div className="flex gap-2 pt-1">
              <Button>Save</Button>
              <Button variant="outline">Cancel</Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </DemoSection>
  )
}

// ─── 10. Interaction States ───

function InteractionStatesDemo() {
  return (
    <DemoSection title="Interaction States">
      <div className="grid grid-cols-5 gap-6">
        {/* Sand fill */}
        <div>
          <div className="mb-2" style={{ fontFamily: 'var(--font-label)', fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--n600)' }}>Sand fill</div>
          <div style={{ background: 'var(--n400)', padding: '6px 14px', borderRadius: 'var(--radius-md)', display: 'inline-flex' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 11, color: 'var(--n1150)' }}>Selected</span>
          </div>
          <div className="mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--n800)' }}>Toggles, filters</div>
        </div>

        {/* Underline */}
        <div>
          <div className="mb-2" style={{ fontFamily: 'var(--font-label)', fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--n600)' }}>Underline</div>
          <div style={{ borderBottom: '2px solid var(--n1150)', padding: '6px 0', display: 'inline-flex' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 11, color: 'var(--n1150)' }}>Active</span>
          </div>
          <div className="mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--n800)' }}>Tabs, navigation</div>
        </div>

        {/* White lift */}
        <div>
          <div className="mb-2" style={{ fontFamily: 'var(--font-label)', fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--n600)' }}>White lift</div>
          <div style={{ background: '#FFFFFF', border: '0.5px solid var(--n400)', padding: '10px 14px', borderRadius: 'var(--radius-lg)' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, fontSize: 11, color: 'var(--n1150)' }}>Hovered</span>
          </div>
          <div className="mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--n800)' }}>Cards on sand bg</div>
        </div>

        {/* Black fill */}
        <div>
          <div className="mb-2" style={{ fontFamily: 'var(--font-label)', fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--n600)' }}>Black fill</div>
          <div style={{ background: 'var(--n1150)', padding: '6px 14px', borderRadius: 'var(--radius-md)', display: 'inline-flex' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: 11, color: 'var(--n50)' }}>Action</span>
          </div>
          <div className="mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--n800)' }}>Primary CTA only</div>
        </div>

        {/* Sand hover */}
        <div>
          <div className="mb-2" style={{ fontFamily: 'var(--font-label)', fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--n600)' }}>Sand hover</div>
          <div style={{ background: 'var(--n200)', padding: '6px 14px', display: 'inline-flex' }}>
            <span style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, fontSize: 11, color: 'var(--n1050)' }}>Hovered</span>
          </div>
          <div className="mt-1" style={{ fontFamily: 'var(--font-sans)', fontSize: 10, color: 'var(--n800)' }}>Rows, ghost buttons</div>
        </div>
      </div>
    </DemoSection>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function UIDemo() {
  return (
    <main
      className="min-h-screen"
      style={{ backgroundColor: 'var(--bg)', padding: '32px 24px' }}
    >
      <div className="mx-auto max-w-[800px]">
        {/* Header */}
        <header className="mb-8">
          <h1 style={{ fontFamily: 'var(--font-sans)', fontWeight: 600, fontSize: 20, letterSpacing: '-0.01em', color: 'var(--n1150)' }}>
            @ramtt/ui
          </h1>
          <p
            className="mt-1.5"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 400, fontSize: 13, lineHeight: 1.6, color: 'var(--n800)', maxWidth: 560 }}
          >
            Minimal, opinionated UI components with RAMTT design tokens baked in.
            Zero dependencies. Space Grotesk for labels and numbers, Instrument Sans
            for body text, every border at 0.5px.
          </p>
        </header>

        {/* Sections */}
        <div className="flex flex-col gap-5">
          <MetricsStripDemo />
          <ToggleGroupDemo />
          <DataRowDemo />
          <SettingsDemo />
          <WhiteLiftDemo />
          <DataTableDemo />
          <BadgesDemo />
          <ButtonsDemo />
          <ProgressDemo />
          <InteractionStatesDemo />
          <FormsDemo />
        </div>
      </div>
    </main>
  )
}
