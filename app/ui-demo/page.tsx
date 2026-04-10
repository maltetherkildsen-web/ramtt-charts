'use client'

import { useState } from 'react'
import {
  cn,
  FONT,
  LAYOUT,
  MUTED_STYLE,
  LABEL_STYLE,
  ACTIVE_SAND,
  ACTIVE_BLACK,
  ACTIVE_UNDERLINE,
  BORDER,
  RADIUS,
  WEIGHT,
} from '@/lib/ui'
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
  Modal,
  ToastProvider,
  useToast,
  Dropdown,
  Tabs,
  Skeleton,
  Switch,
} from '@/components/ui'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Layout
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DemoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <SectionHeader>{title}</SectionHeader>
      <div className="mt-1.5">{children}</div>
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
            { label: 'Avg HR', value: '155', unit: 'BPM', subtitle: 'Max 189 BPM' },
            { label: 'TSS', value: '187', subtitle: 'IF 0.92' },
            { label: 'Energy', value: '1,842', unit: 'kJ' },
            { label: 'Form', value: '-8 → -14', subtitle: '-6 loaded', subtitleColor: 'positive' as const },
            { label: 'Energy Zone', value: '192', unit: 'g', badge: { label: 'Z6', color: 'var(--negative)' } },
          ].map((m, i, arr) => (
            <div
              key={m.label}
              className={cn(
                'flex-1 py-2 px-3.5',
                i < arr.length - 1 && 'border-r-[0.5px] border-r-[var(--n400)]',
              )}
            >
              <MetricCard {...m} />
            </div>
          ))}
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── 2. Compact Metrics ───

function CompactMetricsDemo() {
  return (
    <DemoSection title="Compact Metrics">
      <Card>
        <div className="flex flex-col gap-1">
          <MetricCard compact label="Volume" value="573.43K" />
          <MetricCard compact label="P/E Ratio" value="102.13" />
          <MetricCard compact label="Market Cap" value="$3.49T" />
          <MetricCard compact label="Dividend Yield" value="0.44%" />
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── 3. Toggle Groups ───

function ToggleGroupDemo() {
  const [channel, setChannel] = useState('power')
  const [period, setPeriod] = useState('1m')
  const [zone, setZone] = useState('off')
  const [filters, setFilters] = useState<string | string[]>(['All', 'Warning'])

  return (
    <DemoSection title="Toggle Groups">
      <div className="space-y-4">
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-1.5')}>Channel selector (default variant)</p>
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

        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-1.5')}>Time period (sm size)</p>
          <ToggleGroup
            value={period}
            onChange={(v) => setPeriod(v as string)}
            size="sm"
            options={['1d', '5d', '1m', '6m', 'Ytd', '1y', '5y', 'Max']}
          />
        </div>

        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-1.5')}>Zone mode (sm, pill variant)</p>
          <ToggleGroup
            value={zone}
            onChange={(v) => setZone(v as string)}
            size="sm"
            variant="pill"
            options={['Off', 'Power', 'HR']}
          />
        </div>

        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-1.5')}>Tab navigation (underline variant)</p>
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

        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-1.5')}>Filter pills (multi-select, pill variant)</p>
          <ToggleGroup
            value={filters}
            onChange={setFilters}
            multi
            variant="pill"
            options={['All', 'Info', 'Warning', 'Critical']}
          />
        </div>
      </div>
    </DemoSection>
  )
}

// ─── 4. Card with DataRows ───

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

// ─── 5. Settings Cards ───

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

// ─── 6. White-Lift Cards ───

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
            className={cn(
              'bg-transparent transition-colors duration-150 hover:bg-white py-4 px-[18px]',
              BORDER.default,
              RADIUS.lg,
            )}
          >
            <div className={cn(FONT.body, WEIGHT.medium, 'text-[13px] text-[var(--n1150)]')}>
              {p.title}
            </div>
            <div className={cn(MUTED_STYLE, 'mt-1 text-[11px]')}>
              {p.desc}
            </div>
          </div>
        ))}
      </div>
    </DemoSection>
  )
}

// ─── 7. Data Table ───

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

// ─── 8. Badges ───

function BadgesDemo() {
  return (
    <DemoSection title="Badges">
      <Card>
        <div className="flex flex-wrap items-center gap-3">
          <Badge color="positive">Safe</Badge>
          <Badge color="negative">Critical</Badge>
          <Badge color="warning">Build</Badge>
          <Badge color="info">New</Badge>
          <Badge>Default</Badge>

          <Badge variant="outline" color="positive">+7.55%</Badge>
          <Badge variant="outline" color="negative">-0.07%</Badge>
          <Badge variant="outline">Effort 7</Badge>

          <Badge color="var(--negative)" size="md">Z6</Badge>
          <Badge color="#22c55e" size="md">Z2</Badge>
          <Badge color="#eab308" size="md">Z3</Badge>

          <Badge size="md" color="info">Medium</Badge>
          <Badge size="md" variant="outline" color="positive">Optimal</Badge>
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── 9. Buttons ───

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

// ─── 10. Progress Bars ───

function ProgressDemo() {
  return (
    <DemoSection title="Progress Bars">
      <Card>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <p className={cn(MUTED_STYLE, 'text-[12px]')}>Default (43%)</p>
            <ProgressBar value={43} max={100} />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className={cn(MUTED_STYLE, 'text-[12px]')}>Fuel progress (positive, with label)</p>
            <ProgressBar value={192} max={200} color="positive" label="192g of 200g" />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className={cn(MUTED_STYLE, 'text-[12px]')}>Quality Index (warning)</p>
            <ProgressBar value={58} max={100} color="warning" label="58%" />
          </div>
          <div className="flex flex-col gap-1.5">
            <p className={cn(MUTED_STYLE, 'text-[12px]')}>Critical (negative)</p>
            <ProgressBar value={12} max={100} color="negative" label="12%" />
          </div>
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── 11. Interaction States ───

function InteractionStatesDemo() {
  return (
    <DemoSection title="Interaction States">
      <div className="grid grid-cols-5 gap-6">
        {/* Sand fill */}
        <div>
          <div className={cn(LABEL_STYLE, WEIGHT.medium, 'mb-2')}>Sand fill</div>
          <div className={cn(ACTIVE_SAND, 'py-1.5 px-3.5 inline-flex', RADIUS.md)}>
            <span className={cn(FONT.body, WEIGHT.medium, 'text-[11px] text-[var(--n1150)]')}>Selected</span>
          </div>
          <div className={cn(MUTED_STYLE, 'mt-1 text-[10px]')}>Toggles, filters</div>
        </div>

        {/* Underline */}
        <div>
          <div className={cn(LABEL_STYLE, WEIGHT.medium, 'mb-2')}>Underline</div>
          <div className={cn(ACTIVE_UNDERLINE, 'py-1.5 inline-flex')}>
            <span className={cn(FONT.body, WEIGHT.medium, 'text-[11px] text-[var(--n1150)]')}>Active</span>
          </div>
          <div className={cn(MUTED_STYLE, 'mt-1 text-[10px]')}>Tabs, navigation</div>
        </div>

        {/* White lift */}
        <div>
          <div className={cn(LABEL_STYLE, WEIGHT.medium, 'mb-2')}>White lift</div>
          <div className={cn('bg-white py-2.5 px-3.5', BORDER.default, RADIUS.lg)}>
            <span className={cn(FONT.body, 'font-[450] text-[11px] text-[var(--n1150)]')}>Hovered</span>
          </div>
          <div className={cn(MUTED_STYLE, 'mt-1 text-[10px]')}>Cards on sand bg</div>
        </div>

        {/* Black fill */}
        <div>
          <div className={cn(LABEL_STYLE, WEIGHT.medium, 'mb-2')}>Black fill</div>
          <div className={cn(ACTIVE_BLACK, 'py-1.5 px-3.5 inline-flex', RADIUS.md)}>
            <span className={cn(FONT.body, WEIGHT.medium, 'text-[11px]')}>Action</span>
          </div>
          <div className={cn(MUTED_STYLE, 'mt-1 text-[10px]')}>Primary CTA only</div>
        </div>

        {/* Sand hover */}
        <div>
          <div className={cn(LABEL_STYLE, WEIGHT.medium, 'mb-2')}>Sand hover</div>
          <div className="bg-[var(--n200)] py-1.5 px-3.5 inline-flex">
            <span className={cn(FONT.body, 'font-[450] text-[11px] text-[var(--n1050)]')}>Hovered</span>
          </div>
          <div className={cn(MUTED_STYLE, 'mt-1 text-[10px]')}>Rows, ghost buttons</div>
        </div>
      </div>
    </DemoSection>
  )
}

// ─── 12. Form Elements ───

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

// ─── 13. Overlay & Feedback ───

function OverlayFeedbackDemo() {
  const [modalOpen, setModalOpen] = useState(false)
  const toast = useToast()

  return (
    <DemoSection title="Overlay & Feedback">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="outline" onClick={() => setModalOpen(true)}>Open modal</Button>
          <Button variant="ghost" onClick={() => toast({ message: 'Settings saved' })}>Default toast</Button>
          <Button variant="ghost" onClick={() => toast({ message: 'Session uploaded', variant: 'success' })}>Success</Button>
          <Button variant="ghost" onClick={() => toast({ message: 'Upload failed', variant: 'error' })}>Error</Button>
          <Button variant="ghost" onClick={() => toast({ message: 'FTP seems unusually high', variant: 'warning' })}>Warning</Button>
          <Button
            variant="ghost"
            onClick={() =>
              toast({
                message: 'Session deleted',
                variant: 'default',
                action: { label: 'Undo', onClick: () => toast({ message: 'Session restored', variant: 'success' }) },
              })
            }
          >
            Toast with action
          </Button>
        </div>

        <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
          <Modal.Header>
            <Modal.Title>Upload FIT file</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
              Drag a .fit file here or click to browse. The session will be parsed and added to your training log.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => { setModalOpen(false); toast({ message: 'File uploaded', variant: 'success' }) }}>Upload</Button>
          </Modal.Footer>
        </Modal>
      </div>
    </DemoSection>
  )
}

// ─── 14. Dropdown ───

function DropdownDemo() {
  return (
    <DemoSection title="Dropdown">
      <div className="flex items-center gap-6">
        <Dropdown>
          <Dropdown.Trigger>
            <Button variant="outline" size="sm">More actions</Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item onClick={() => {}}>Edit session</Dropdown.Item>
            <Dropdown.Item onClick={() => {}}>Duplicate</Dropdown.Item>
            <Dropdown.Item onClick={() => {}}>Export as CSV</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item onClick={() => {}} variant="danger">Delete</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>

        <Dropdown>
          <Dropdown.Trigger>
            <Button variant="outline" size="sm">Right-aligned</Button>
          </Dropdown.Trigger>
          <Dropdown.Content align="end">
            <Dropdown.Item onClick={() => {}}>Profile</Dropdown.Item>
            <Dropdown.Item onClick={() => {}}>Settings</Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item onClick={() => {}}>Sign out</Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>

        <Dropdown>
          <Dropdown.Trigger>
            <Button variant="ghost" size="icon">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor"><circle cx="4" cy="8" r="1.25"/><circle cx="8" cy="8" r="1.25"/><circle cx="12" cy="8" r="1.25"/></svg>
            </Button>
          </Dropdown.Trigger>
          <Dropdown.Content>
            <Dropdown.Item
              icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5l2 2-9 9H2.5v-2l9-9z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              onClick={() => {}}
            >
              Edit
            </Dropdown.Item>
            <Dropdown.Item
              icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/><path d="M9 6h5v5a2 2 0 01-2 2H9V6z" stroke="currentColor" strokeWidth="1.25"/></svg>}
              onClick={() => {}}
            >
              Copy link
            </Dropdown.Item>
            <Dropdown.Separator />
            <Dropdown.Item
              icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M6.5 4V3h3v1M5 4v8.5a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              onClick={() => {}}
              variant="danger"
            >
              Delete
            </Dropdown.Item>
          </Dropdown.Content>
        </Dropdown>
      </div>
    </DemoSection>
  )
}

// ─── 15. Tabs & Toggle ───

function TabsDemo() {
  const [underlineTab, setUnderlineTab] = useState('overview')
  const [pillTab, setPillTab] = useState('day')
  const [toggleVal, setToggleVal] = useState('overview')

  return (
    <DemoSection title="Tabs & Toggle">
      <div className="space-y-6">
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-1.5')}>Underline tabs (with panels)</p>
          <Tabs value={underlineTab} onChange={setUnderlineTab}>
            <Tabs.List>
              <Tabs.Tab value="overview">Overview</Tabs.Tab>
              <Tabs.Tab value="analytics">Analytics</Tabs.Tab>
              <Tabs.Tab value="settings">Settings</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="overview">
              <Card padding="sm">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
                  Overview panel content. Session summary, key metrics, and recent activity.
                </p>
              </Card>
            </Tabs.Panel>
            <Tabs.Panel value="analytics">
              <Card padding="sm">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
                  Analytics panel content. Charts, trends, and performance data.
                </p>
              </Card>
            </Tabs.Panel>
            <Tabs.Panel value="settings">
              <Card padding="sm">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
                  Settings panel content. Thresholds, zones, and preferences.
                </p>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </div>

        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-1.5')}>Pill tabs (with panels)</p>
          <Tabs value={pillTab} onChange={setPillTab} variant="pill">
            <Tabs.List>
              <Tabs.Tab value="day">Day</Tabs.Tab>
              <Tabs.Tab value="week">Week</Tabs.Tab>
              <Tabs.Tab value="month">Month</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="day">
              <Card padding="sm">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
                  Daily view — showing today's training data.
                </p>
              </Card>
            </Tabs.Panel>
            <Tabs.Panel value="week">
              <Card padding="sm">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
                  Weekly view — aggregated metrics for the current week.
                </p>
              </Card>
            </Tabs.Panel>
            <Tabs.Panel value="month">
              <Card padding="sm">
                <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
                  Monthly view — training volume and progression.
                </p>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </div>

        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-1.5')}>ToggleGroup underline (no panels — compare with Tabs above)</p>
          <ToggleGroup
            value={toggleVal}
            onChange={(v) => setToggleVal(v as string)}
            variant="underline"
            options={[
              { value: 'overview', label: 'Overview' },
              { value: 'analytics', label: 'Analytics' },
              { value: 'settings', label: 'Settings' },
            ]}
          />
        </div>
      </div>
    </DemoSection>
  )
}

// ─── 16. Loading States ───

function LoadingStatesDemo() {
  return (
    <DemoSection title="Loading States">
      <div className="space-y-6">
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-1.5')}>MetricCard skeleton</p>
          <Card>
            <div className="flex flex-col gap-2 py-1">
              <Skeleton width={80} height={12} />
              <Skeleton width={120} height={24} />
              <Skeleton width={60} height={12} />
            </div>
          </Card>
        </div>

        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-1.5')}>DataTable skeleton</p>
          <Card>
            <div className="flex items-center gap-4 py-2 border-b-[0.5px] border-b-[var(--n200)]">
              <Skeleton width={100} height={12} />
              <Skeleton width={60} height={12} />
              <Skeleton width={80} height={12} />
              <Skeleton width={60} height={12} />
            </div>
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-4 py-2.5">
                <Skeleton width={100} height={14} />
                <Skeleton width={60} height={14} />
                <Skeleton width={80} height={14} />
                <Skeleton width={60} height={14} />
              </div>
            ))}
          </Card>
        </div>

        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-1.5')}>Shape variations</p>
          <div className="flex items-center gap-4">
            <Skeleton width={140} height={14} />
            <Skeleton width={80} height={28} radius="md" />
            <Skeleton width={40} height={40} radius="full" />
            <Skeleton width={200} height={60} radius="lg" />
          </div>
        </div>
      </div>
    </DemoSection>
  )
}

// ─── 17. Switches ───

function SwitchesDemo() {
  const [autoSync, setAutoSync] = useState(true)
  const [notifications, setNotifications] = useState(false)
  const [analytics, setAnalytics] = useState(true)
  const [standalone, setStandalone] = useState(false)

  return (
    <DemoSection title="Switches">
      <Card>
        <div className="flex flex-col gap-4">
          <Switch
            checked={autoSync}
            onChange={setAutoSync}
            label="Auto-sync"
            description="Automatically sync sessions from connected devices"
          />
          <Switch
            checked={notifications}
            onChange={setNotifications}
            label="Push notifications"
            description="Enable push for training alerts and reminders"
          />
          <Switch
            checked={analytics}
            onChange={setAnalytics}
            label="Advanced analytics"
            description="Enable power duration curve and performance modeling"
          />
          <Switch
            checked={true}
            onChange={() => {}}
            label="Always on"
            disabled
          />
          <div>
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Standalone (no label)</p>
            <Switch checked={standalone} onChange={setStandalone} />
          </div>
        </div>
      </Card>
    </DemoSection>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Page
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export default function UIDemo() {
  return (
    <ToastProvider>
      <main className="min-h-screen bg-[var(--bg)]">
        <div className={cn(LAYOUT.maxWidth, 'mx-auto', LAYOUT.pagePadding, 'py-12')}>
          {/* Header */}
          <header className="mb-10">
            <h1 className={cn(FONT.label, WEIGHT.medium, 'text-[20px] text-[var(--n1150)] tracking-normal normal-case')}>
              @ramtt/ui
            </h1>
            <p className={cn(MUTED_STYLE, 'text-[13px] leading-relaxed mt-1.5 max-w-[560px]')}>
              18 components. Zero dependencies. Satoshi for everything — labels, numbers, body text.
              Every border at 0.5px. Sentence case labels. Tabular nums for data.
            </p>
          </header>

          {/* All sections in a single consistent column */}
          <div className={LAYOUT.sectionGap}>
            <MetricsStripDemo />
            <CompactMetricsDemo />
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
            <OverlayFeedbackDemo />
            <DropdownDemo />
            <TabsDemo />
            <LoadingStatesDemo />
            <SwitchesDemo />
          </div>
        </div>
      </main>
    </ToastProvider>
  )
}
