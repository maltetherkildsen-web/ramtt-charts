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
  Tooltip,
  Accordion,
  Slider,
  Avatar,
  EmptyState,
  Breadcrumb,
  Sidebar,
  PageHeader,
  Textarea,
  Checkbox,
  Radio,
  FileUpload,
  Tag,
  Gauge,
  Calendar,
  DatePicker,
  Popover,
  Command,
  Pagination,
  Drawer,
  Spinner,
  Kbd,
  Alert,
  Combobox,
  Separator,
  Label,
  Collapsible,
  InputGroup,
  ScrollArea,
  HoverCard,
  Resizable,
  ContextMenu,
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

// ─── 18. Tooltip & Info ───

function TooltipDemo() {
  return (
    <DemoSection title="Tooltip & Info">
      <Card>
        <div className="flex flex-col gap-4">
          <div>
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-3')}>Hover over each icon to see tooltip positions</p>
            <div className="flex items-center gap-4">
              <Tooltip content="Export as CSV" side="top">
                <Button variant="ghost" size="icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2v8M4 7l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Button>
              </Tooltip>
              <Tooltip content="Duplicate session" side="bottom">
                <Button variant="ghost" size="icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/><path d="M9 6h5v5a2 2 0 01-2 2H9V6z" stroke="currentColor" strokeWidth="1.25"/></svg>
                </Button>
              </Tooltip>
              <Tooltip content="Edit settings" side="left">
                <Button variant="ghost" size="icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11.5 2.5l2 2-9 9H2.5v-2l9-9z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Button>
              </Tooltip>
              <Tooltip content="Delete session" side="right" delay={500}>
                <Button variant="ghost" size="icon">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 4h10M6.5 4V3h3v1M5 4v8.5a1 1 0 001 1h4a1 1 0 001-1V4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </Button>
              </Tooltip>
            </div>
          </div>
          <div>
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Info text with tooltip</p>
            <span className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
              Your FTP is used to calculate power zones{' '}
              <Tooltip content="Functional Threshold Power — the highest power you can sustain for 1 hour">
                <span className="text-[var(--n600)] inline-flex items-center">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1"/><path d="M7 6v3M7 4.5v.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/></svg>
                </span>
              </Tooltip>
            </span>
          </div>
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── 19. Accordion & Expandable ───

function AccordionDemo() {
  const [openItem, setOpenItem] = useState('zones')

  return (
    <DemoSection title="Accordion & Expandable">
      <Card>
        <Accordion type="single" value={openItem} onChange={(v) => setOpenItem(v as string)}>
          <Accordion.Item value="zones">
            <Accordion.Trigger>Thresholds & zones</Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-3">
                <Input label="FTP" value="280" type="number" unit="W" />
                <Input label="LTHR" value="172" type="number" unit="bpm" />
                <Select
                  label="Zone model"
                  value="coggan"
                  options={[
                    { value: 'coggan', label: 'Coggan (7-zone)' },
                    { value: 'polarized', label: 'Polarized (3-zone)' },
                  ]}
                />
              </div>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="integrations">
            <Accordion.Trigger>Integrations</Accordion.Trigger>
            <Accordion.Content>
              <div className="flex flex-col gap-3">
                <Switch checked={true} onChange={() => {}} label="Strava" description="Auto-sync activities from Strava" />
                <Switch checked={false} onChange={() => {}} label="Garmin Connect" description="Sync from Garmin devices" />
              </div>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="data">
            <Accordion.Trigger>Data integrity</Accordion.Trigger>
            <Accordion.Content>
              <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
                Run validation checks on your training data to detect gaps, spikes, and anomalies.
              </p>
            </Accordion.Content>
          </Accordion.Item>
          <Accordion.Item value="advanced" disabled>
            <Accordion.Trigger>Advanced (coming soon)</Accordion.Trigger>
            <Accordion.Content>
              <p>Hidden content</p>
            </Accordion.Content>
          </Accordion.Item>
        </Accordion>
      </Card>
    </DemoSection>
  )
}

// ─── 20. Range & Controls ───

function SliderDemo() {
  const [ftp, setFtp] = useState(280)
  const [smoothing, setSmoothing] = useState(5)
  const [plain, setPlain] = useState(50)

  return (
    <DemoSection title="Range & Controls">
      <Card>
        <div className="flex flex-col gap-6">
          <Slider
            value={ftp}
            onChange={setFtp}
            min={100}
            max={400}
            step={5}
            label="FTP"
            unit="W"
          />
          <Slider
            value={smoothing}
            onChange={setSmoothing}
            min={1}
            max={60}
            label="Smoothing"
            unit="s"
            marks={[
              { value: 1, label: '1s' },
              { value: 5, label: '5s' },
              { value: 15, label: '15s' },
              { value: 30, label: '30s' },
              { value: 60, label: '1m' },
            ]}
          />
          <div>
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Plain slider (no label)</p>
            <Slider value={plain} onChange={setPlain} min={0} max={100} />
          </div>
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── 21. Identity & Navigation ───

function IdentityNavDemo() {
  return (
    <DemoSection title="Identity & Navigation">
      <div className="space-y-6">
        {/* Avatars */}
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-3')}>Avatars — sizes, initials fallback, status dots</p>
          <div className="flex items-end gap-4">
            <Avatar name="Malte" size="sm" />
            <Avatar name="Malte Therkildsen" size="md" />
            <Avatar name="Ruth Nielsen" size="lg" />
            <Avatar name="Malte" size="md" status="online" />
            <Avatar name="Ruth N" size="md" status="away" />
            <Avatar name="Coach" size="md" status="offline" />
          </div>
        </div>

        {/* Breadcrumb */}
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Breadcrumb navigation</p>
          <Breadcrumb>
            <Breadcrumb.Item href="/settings">Settings</Breadcrumb.Item>
            <Breadcrumb.Item href="/settings/integrations">Integrations</Breadcrumb.Item>
            <Breadcrumb.Item>Strava</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        {/* EmptyState */}
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Empty state</p>
          <Card>
            <EmptyState
              icon={
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="8" y="8" width="32" height="32" rx="4" />
                  <path d="M16 28l6-8 4 5 4-3 6 6" />
                  <circle cx="18" cy="18" r="2" />
                </svg>
              }
              title="No sessions yet"
              description="Upload a FIT file to see your first session analysis."
              action={<Button>Upload FIT file</Button>}
            />
          </Card>
        </div>
      </div>
    </DemoSection>
  )
}

// ─── 22. App Shell ───

function AppShellDemo() {
  return (
    <DemoSection title="App Shell">
      <div className="space-y-6">
        {/* Sidebars */}
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-3')}>Sidebar — expanded and collapsed</p>
          <div className="flex gap-6">
            <div className="border-[0.5px] border-[var(--n400)] rounded-[12px] overflow-hidden" style={{ height: 320 }}>
              <Sidebar>
                <Sidebar.Logo>
                  <span className={cn(FONT.body, 'text-[15px]', WEIGHT.strong, 'text-[var(--n1150)]')}>RAMTT</span>
                </Sidebar.Logo>
                <Sidebar.Nav>
                  <Sidebar.Item active icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M10 3v2M10 15v2M3 10h2M15 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}>Today</Sidebar.Item>
                  <Sidebar.Item icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 8h14M7 3v2M13 3v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}>Calendar</Sidebar.Item>
                  <Sidebar.Item icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 16V7l4-4 4 5 4-3 2 3v8H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}>Analytics</Sidebar.Item>
                  <Sidebar.Item icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M4 15l4-6 4 3 4-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}>Fuel</Sidebar.Item>
                  <Sidebar.Separator />
                  <Sidebar.Item icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1.5"/><path d="M10 7v3l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}>Settings</Sidebar.Item>
                </Sidebar.Nav>
                <Sidebar.Footer>
                  <Sidebar.Item icon={<Avatar name="Malte" size="sm" />}>Malte</Sidebar.Item>
                </Sidebar.Footer>
              </Sidebar>
            </div>
            <div className="border-[0.5px] border-[var(--n400)] rounded-[12px] overflow-hidden" style={{ height: 320 }}>
              <Sidebar collapsed>
                <Sidebar.Logo>
                  <span className={cn(FONT.body, 'text-[15px]', WEIGHT.strong, 'text-[var(--n1150)]')}>R</span>
                </Sidebar.Logo>
                <Sidebar.Nav>
                  <Sidebar.Item active icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/><path d="M10 3v2M10 15v2M3 10h2M15 10h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}>Today</Sidebar.Item>
                  <Sidebar.Item icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="4" width="14" height="13" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M3 8h14M7 3v2M13 3v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>}>Calendar</Sidebar.Item>
                  <Sidebar.Item icon={<svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 16V7l4-4 4 5 4-3 2 3v8H3z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}>Analytics</Sidebar.Item>
                </Sidebar.Nav>
                <Sidebar.Footer>
                  <Sidebar.Item icon={<Avatar name="M" size="sm" />}>M</Sidebar.Item>
                </Sidebar.Footer>
              </Sidebar>
            </div>
          </div>
        </div>

        {/* PageHeader */}
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-3')}>Page header variants</p>
          <Card>
            <PageHeader title="Settings" />
            <PageHeader
              title="Session analysis"
              subtitle="MIT with spikes · 12. april 2026"
              actions={
                <>
                  <Button variant="ghost" size="sm">Export</Button>
                  <Button variant="outline" size="sm">Share</Button>
                </>
              }
            />
            <PageHeader
              breadcrumb={
                <Breadcrumb>
                  <Breadcrumb.Item href="/settings">Settings</Breadcrumb.Item>
                  <Breadcrumb.Item>Integrations</Breadcrumb.Item>
                </Breadcrumb>
              }
              title="Integrations"
              subtitle="Connect and sync your devices"
              className="mb-0 border-b-0 pb-0"
            />
          </Card>
        </div>
      </div>
    </DemoSection>
  )
}

// ─── 23. Form Elements Extended ───

function FormsExtendedDemo() {
  const [notes, setNotes] = useState('Great session today. Felt strong on the climbs.')
  const [power, setPower] = useState(true)
  const [hr, setHr] = useState(true)
  const [speed, setSpeed] = useState(false)
  const [cadence, setCadence] = useState(false)
  const [sport, setSport] = useState('cycling')

  return (
    <DemoSection title="Form Elements Extended">
      <div className="grid grid-cols-2 gap-4">
        {/* Textarea */}
        <Card>
          <Card.Header>
            <Card.Title>Textarea</Card.Title>
          </Card.Header>
          <Card.Body className="flex flex-col gap-3">
            <Textarea
              label="Session notes"
              value={notes}
              onChange={setNotes}
              rows={3}
              maxLength={500}
              showCount
            />
            <Textarea placeholder="Add a comment..." rows={2} />
          </Card.Body>
        </Card>

        {/* Checkbox + Radio */}
        <Card>
          <Card.Header>
            <Card.Title>Checkbox & radio</Card.Title>
          </Card.Header>
          <Card.Body className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <p className={cn(LABEL_STYLE)}>Visible channels</p>
              <Checkbox checked={power} onChange={setPower} label="Power" />
              <Checkbox checked={hr} onChange={setHr} label="Heart rate" />
              <Checkbox checked={speed} onChange={setSpeed} label="Speed" />
              <Checkbox checked={cadence} onChange={setCadence} label="Cadence" description="Requires crank sensor" />
            </div>
            <Radio.Group value={sport} onChange={setSport} label="Primary sport">
              <Radio value="cycling" label="Cycling" />
              <Radio value="running" label="Running" />
              <Radio value="triathlon" label="Triathlon" description="Includes swim, bike, run" />
            </Radio.Group>
          </Card.Body>
        </Card>

        {/* FileUpload */}
        <Card className="col-span-2">
          <Card.Header>
            <Card.Title>File upload</Card.Title>
          </Card.Header>
          <Card.Body>
            <FileUpload
              accept=".fit,.gpx,.tcx"
              onUpload={() => {}}
              label="Upload activity file"
              description="Drag a .fit, .gpx, or .tcx file here"
            />
          </Card.Body>
        </Card>
      </div>
    </DemoSection>
  )
}

// ─── 24. Tags & Categories ───

function TagsDemo() {
  const [tags, setTags] = useState(['Cycling', 'Intervals'])

  return (
    <DemoSection title="Tags & Categories">
      <Card>
        <div className="flex flex-col gap-4">
          <div>
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Display tags</p>
            <div className="flex gap-1.5 flex-wrap">
              <Tag>Cycling</Tag>
              <Tag>Intervals</Tag>
              <Tag color="var(--positive)">Build phase</Tag>
              <Tag color="var(--warning)">Recovery</Tag>
              <Tag onRemove={() => {}}>Removable</Tag>
            </div>
          </div>
          <div>
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Tag input with suggestions</p>
            <Tag.Input
              tags={tags}
              onAdd={(t) => setTags([...tags, t])}
              onRemove={(t) => setTags(tags.filter((x) => x !== t))}
              placeholder="Add sport..."
              suggestions={['Cycling', 'Running', 'Swimming', 'Triathlon', 'Strength']}
            />
          </div>
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── 25. Gauges & Scores ───

function GaugesDemo() {
  return (
    <DemoSection title="Gauges & Scores">
      <Card>
        <div className="flex items-end gap-8 justify-center py-4">
          <Gauge value={42} max={100} label="Injury risk" color="warning" size="sm" />
          <Gauge value={86} max={100} label="Glycogen" unit="%" color="positive" size="md" />
          <Gauge value={73} max={100} label="Readiness" size="md" />
          <Gauge
            value={62}
            max={100}
            label="Fuel coverage"
            unit="%"
            size="lg"
            thresholds={[
              { value: 30, color: 'var(--negative)' },
              { value: 60, color: 'var(--warning)' },
              { value: 100, color: 'var(--positive)' },
            ]}
          />
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── 26. Calendar & Dates ───

function CalendarDemo() {
  const [date, setDate] = useState<Date | null>(new Date())
  const [range, setRange] = useState<{ from: Date; to: Date } | null>({
    from: new Date(2026, 3, 6),
    to: new Date(2026, 3, 12),
  })
  const [pickerDate, setPickerDate] = useState<Date | null>(new Date())

  return (
    <DemoSection title="Calendar & Dates">
      <div className="space-y-6">
        <div className="flex gap-8 flex-wrap">
          <div>
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Single date selection</p>
            <Card>
              <Calendar
                selected={date}
                onSelect={(v) => setDate(v as Date)}
              />
            </Card>
          </div>
          <div>
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Range selection</p>
            <Card>
              <Calendar
                mode="range"
                selected={range}
                onSelect={(v) => setRange(v as { from: Date; to: Date })}
              />
            </Card>
          </div>
        </div>
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>DatePicker (calendar in popover)</p>
          <div className="flex gap-4">
            <DatePicker
              value={pickerDate}
              onChange={(v) => setPickerDate(v as Date)}
              label="Session date"
            />
            <DatePicker
              placeholder="Pick a date"
              onChange={() => {}}
            />
          </div>
        </div>
      </div>
    </DemoSection>
  )
}

// ─── 27. Command Palette ───

function CommandDemo() {
  const [commandOpen, setCommandOpen] = useState(false)

  return (
    <DemoSection title="Command Palette">
      <Card>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setCommandOpen(true)}>
            Open command palette
          </Button>
          <span className={cn(MUTED_STYLE, 'text-[12px]')}>
            Press <Kbd>⌘</Kbd> <Kbd>K</Kbd> pattern
          </span>
        </div>

        <Modal open={commandOpen} onClose={() => setCommandOpen(false)} size="sm">
          <Command>
            <Command.Input placeholder="Type a command or search..." />
            <Command.List>
              <Command.Group heading="Navigation">
                <Command.Item onSelect={() => setCommandOpen(false)} icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.25"/></svg>}>
                  Today
                  <Command.Shortcut><Kbd>⌘</Kbd><Kbd>T</Kbd></Command.Shortcut>
                </Command.Item>
                <Command.Item onSelect={() => setCommandOpen(false)} icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.25"/></svg>}>
                  Calendar
                  <Command.Shortcut><Kbd>⌘</Kbd><Kbd>C</Kbd></Command.Shortcut>
                </Command.Item>
                <Command.Item onSelect={() => setCommandOpen(false)}>Analytics</Command.Item>
                <Command.Item onSelect={() => setCommandOpen(false)}>Settings</Command.Item>
              </Command.Group>
              <Command.Separator />
              <Command.Group heading="Actions">
                <Command.Item onSelect={() => setCommandOpen(false)}>Upload FIT file</Command.Item>
                <Command.Item onSelect={() => setCommandOpen(false)}>New session</Command.Item>
                <Command.Item onSelect={() => setCommandOpen(false)}>Export data</Command.Item>
              </Command.Group>
              <Command.Empty>No results found.</Command.Empty>
            </Command.List>
          </Command>
        </Modal>
      </Card>
    </DemoSection>
  )
}

// ─── 28. Popover & Drawer ───

function PopoverDrawerDemo() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [bottomDrawer, setBottomDrawer] = useState(false)
  const [filterPower, setFilterPower] = useState(true)
  const [filterHr, setFilterHr] = useState(false)

  return (
    <DemoSection title="Popover & Drawer">
      <div className="flex flex-wrap items-start gap-4">
        <Popover>
          <Popover.Trigger>
            <Button variant="outline" size="sm">Filter (popover)</Button>
          </Popover.Trigger>
          <Popover.Content align="start">
            <div className="p-3 flex flex-col gap-2">
              <Checkbox label="Power" checked={filterPower} onChange={setFilterPower} />
              <Checkbox label="Heart rate" checked={filterHr} onChange={setFilterHr} />
              <Checkbox label="Speed" checked={false} onChange={() => {}} />
            </div>
          </Popover.Content>
        </Popover>

        <Button variant="outline" size="sm" onClick={() => setDrawerOpen(true)}>
          Open drawer (right)
        </Button>
        <Button variant="outline" size="sm" onClick={() => setBottomDrawer(true)}>
          Bottom sheet
        </Button>
      </div>

      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        <Drawer.Header>
          <Drawer.Title>Session filters</Drawer.Title>
          <Button variant="ghost" size="icon" onClick={() => setDrawerOpen(false)}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </Button>
        </Drawer.Header>
        <Drawer.Body>
          <div className="flex flex-col gap-3">
            <Checkbox label="Power zones" checked={true} onChange={() => {}} />
            <Checkbox label="Heart rate zones" checked={false} onChange={() => {}} />
            <Slider label="Min duration" value={30} onChange={() => {}} min={0} max={300} unit="min" />
          </div>
        </Drawer.Body>
        <Drawer.Footer>
          <Button variant="outline" onClick={() => setDrawerOpen(false)}>Cancel</Button>
          <Button onClick={() => setDrawerOpen(false)}>Apply</Button>
        </Drawer.Footer>
      </Drawer>

      <Drawer open={bottomDrawer} onClose={() => setBottomDrawer(false)} side="bottom">
        <Drawer.Body>
          <div className="flex flex-col items-center gap-3 py-4">
            <p className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)]')}>Quick actions</p>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setBottomDrawer(false)}>Upload</Button>
              <Button variant="outline" onClick={() => setBottomDrawer(false)}>Share</Button>
              <Button onClick={() => setBottomDrawer(false)}>Done</Button>
            </div>
          </div>
        </Drawer.Body>
      </Drawer>
    </DemoSection>
  )
}

// ─── 29. Pagination, Alert, Combobox ───

function MiscDemo() {
  const [currentPage, setCurrentPage] = useState(6)
  const [showAlert, setShowAlert] = useState(true)
  const [combo, setCombo] = useState('maurten')

  const comboOptions = [
    { group: 'Gels', items: [
      { value: 'sis-go', label: 'SiS GO Isotonic' },
      { value: 'maurten', label: 'Maurten Gel 100' },
      { value: 'precision-hydration', label: 'Precision Hydration' },
    ]},
    { group: 'Bars', items: [
      { value: 'clif', label: 'Clif Bar' },
      { value: 'trek', label: 'Trek Protein' },
    ]},
    { group: 'Drinks', items: [
      { value: 'maurten-320', label: 'Maurten 320' },
      { value: 'sis-beta', label: 'SiS Beta Fuel' },
      { value: 'tailwind', label: 'Tailwind Endurance' },
    ]},
  ]

  return (
    <DemoSection title="Pagination, Alert, Combobox">
      <div className="space-y-6">
        {/* Pagination */}
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Pagination</p>
          <Pagination page={currentPage} totalPages={24} onChange={setCurrentPage} />
        </div>

        {/* Alerts */}
        <div className="flex flex-col gap-2">
          <p className={cn(MUTED_STYLE, 'text-[12px]')}>Alerts</p>
          <Alert>Your FTP was updated to 285W based on today's session.</Alert>
          <Alert variant="info">3 new signals require attention.</Alert>
          <Alert variant="warning" action={{ label: 'Review', onClick: () => {} }}>
            Your injury risk score has increased to 72.
          </Alert>
          <Alert variant="error" title="Sync failed">
            Could not connect to Strava. Check your integration settings.
          </Alert>
          {showAlert && (
            <Alert variant="success" onDismiss={() => setShowAlert(false)}>
              Session uploaded successfully.
            </Alert>
          )}
        </div>

        {/* Spinner + Kbd */}
        <div className="flex items-center gap-6">
          <div>
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Spinners</p>
            <div className="flex items-center gap-3">
              <Spinner size="sm" />
              <Spinner size="md" />
              <Spinner size="lg" />
              <Button disabled><Spinner size="sm" /> Saving...</Button>
            </div>
          </div>
          <div>
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Keyboard shortcuts</p>
            <div className="flex items-center gap-2">
              <Kbd>⌘K</Kbd>
              <Kbd>⌘S</Kbd>
              <Kbd>Escape</Kbd>
              <span className="flex gap-0.5"><Kbd>⌘</Kbd><Kbd>⌫</Kbd></span>
            </div>
          </div>
        </div>

        {/* Combobox */}
        <div className="max-w-[320px]">
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Combobox (searchable select)</p>
          <Combobox
            options={comboOptions}
            value={combo}
            onChange={(v) => setCombo(v as string)}
            label="Nutrition product"
            placeholder="Search products..."
          />
        </div>
      </div>
    </DemoSection>
  )
}

// ─── 30. Separators & Labels ───

function SeparatorsLabelsDemo() {
  const [sport, setSport] = useState('cycling')

  return (
    <DemoSection title="Separators & Labels">
      <div className="space-y-6">
        {/* Separators */}
        <Card>
          <Card.Header>
            <Card.Title>Separator variants</Card.Title>
          </Card.Header>
          <Card.Body className="flex flex-col gap-4">
            <div>
              <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Horizontal (default)</p>
              <Separator />
            </div>
            <div>
              <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Horizontal (subtle)</p>
              <Separator variant="subtle" />
            </div>
            <div>
              <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>With label</p>
              <Separator label="or" />
            </div>
            <div>
              <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Vertical (between inline elements)</p>
              <div className="flex items-center gap-3 h-8">
                <span className={cn(FONT.body, 'text-[13px] text-[var(--n1150)]')}>Power</span>
                <Separator orientation="vertical" />
                <span className={cn(FONT.body, 'text-[13px] text-[var(--n1150)]')}>Heart rate</span>
                <Separator orientation="vertical" />
                <span className={cn(FONT.body, 'text-[13px] text-[var(--n1150)]')}>Cadence</span>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* Labels */}
        <Card>
          <Card.Header>
            <Card.Title>Label variants</Card.Title>
          </Card.Header>
          <Card.Body className="flex flex-col gap-4">
            <div>
              <Label htmlFor="ftp-label-demo" required description="Based on your last 20-minute test">
                Functional threshold power
              </Label>
              <Input id="ftp-label-demo" type="number" placeholder="280" unit="W" />
            </div>
            <fieldset>
              <Label as="legend">Primary sport</Label>
              <Radio.Group value={sport} onChange={setSport}>
                <Radio value="cycling" label="Cycling" />
                <Radio value="running" label="Running" />
                <Radio value="triathlon" label="Triathlon" />
              </Radio.Group>
            </fieldset>
          </Card.Body>
        </Card>
      </div>
    </DemoSection>
  )
}

// ─── 31. Collapsible & Scroll ───

function CollapsibleScrollDemo() {
  const [notes, setNotes] = useState('Good tempo ride. Legs felt fresh after rest day.')

  return (
    <DemoSection title="Collapsible & Scroll">
      <div className="grid grid-cols-2 gap-4">
        {/* Collapsibles */}
        <Card>
          <Card.Header>
            <Card.Title>Collapsible</Card.Title>
          </Card.Header>
          <Card.Body className="flex flex-col gap-1">
            <Collapsible>
              <Collapsible.Trigger>Advanced settings</Collapsible.Trigger>
              <Collapsible.Content>
                <div className="flex flex-col gap-3">
                  <Input label="Custom metric name" placeholder="e.g. NP ratio" />
                  <Switch label="Show in dashboard" checked={true} onChange={() => {}} />
                  <Switch label="Include in exports" checked={false} onChange={() => {}} />
                </div>
              </Collapsible.Content>
            </Collapsible>
            <Separator variant="subtle" />
            <Collapsible defaultOpen>
              <Collapsible.Trigger>Session notes</Collapsible.Trigger>
              <Collapsible.Content>
                <Textarea value={notes} onChange={setNotes} rows={3} />
              </Collapsible.Content>
            </Collapsible>
          </Card.Body>
        </Card>

        {/* ScrollArea */}
        <Card>
          <Card.Header>
            <Card.Title>Scroll area</Card.Title>
          </Card.Header>
          <Card.Body>
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Vertical (300px, custom scrollbar on hover)</p>
            <ScrollArea className="h-[200px]">
              <div className="flex flex-col gap-1">
                {Array.from({ length: 20 }, (_, i) => (
                  <DataRow
                    key={i}
                    label={`Interval ${i + 1}`}
                    value={`${260 + Math.floor(Math.random() * 80)}`}
                    unit="W"
                  />
                ))}
              </div>
            </ScrollArea>
          </Card.Body>
        </Card>

        {/* Horizontal ScrollArea */}
        <Card className="col-span-2">
          <Card.Header>
            <Card.Title>Horizontal scroll</Card.Title>
          </Card.Header>
          <Card.Body>
            <ScrollArea orientation="horizontal">
              <div className="flex gap-3" style={{ width: 'max-content' }}>
                {['MIT', 'Tempo', 'Recovery', 'VO2max', 'Endurance', 'Sweet Spot', 'Race Pace', 'Threshold'].map((name) => (
                  <Card key={name} className="min-w-[160px] shrink-0">
                    <div className="p-3">
                      <p className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)]')}>{name}</p>
                      <p className={cn(MUTED_STYLE, 'text-[12px]')}>Session type</p>
                    </div>
                  </Card>
                ))}
              </div>
            </ScrollArea>
          </Card.Body>
        </Card>
      </div>
    </DemoSection>
  )
}

// ─── 32. InputGroup, HoverCard, Resizable, ContextMenu ───

function Wave6ComplexDemo() {
  return (
    <DemoSection title="InputGroup, HoverCard, Resizable, ContextMenu">
      <div className="space-y-6">
        {/* InputGroup */}
        <Card>
          <Card.Header>
            <Card.Title>Input group</Card.Title>
          </Card.Header>
          <Card.Body>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>With prefix</p>
                <InputGroup>
                  <InputGroup.Prefix>https://</InputGroup.Prefix>
                  <Input placeholder="ramtt.dev" />
                </InputGroup>
              </div>
              <div>
                <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>With icon prefix</p>
                <InputGroup>
                  <InputGroup.Prefix>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.25" />
                      <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                    </svg>
                  </InputGroup.Prefix>
                  <Input placeholder="Search sessions..." />
                </InputGroup>
              </div>
              <div>
                <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>With suffix</p>
                <InputGroup>
                  <Input type="number" placeholder="72" />
                  <InputGroup.Suffix>kg</InputGroup.Suffix>
                </InputGroup>
              </div>
              <div>
                <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Combined prefix + suffix</p>
                <InputGroup>
                  <InputGroup.Prefix>$</InputGroup.Prefix>
                  <Input type="number" placeholder="0.00" />
                  <InputGroup.Suffix>USD</InputGroup.Suffix>
                </InputGroup>
              </div>
            </div>
          </Card.Body>
        </Card>

        {/* HoverCard */}
        <Card>
          <Card.Header>
            <Card.Title>Hover card</Card.Title>
          </Card.Header>
          <Card.Body>
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-3')}>Hover over the name to see a preview</p>
            <HoverCard>
              <HoverCard.Trigger>
                <span className="text-[var(--info)] text-[13px]">@malte</span>
              </HoverCard.Trigger>
              <HoverCard.Content>
                <div className="flex gap-3 p-3">
                  <Avatar name="Malte" size="lg" />
                  <div>
                    <p className={cn(FONT.body, 'text-[14px]', WEIGHT.strong, 'text-[var(--n1150)]')}>Malte</p>
                    <p className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)]')}>FTP 285W &middot; 72kg</p>
                    <p className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)]')}>Last session: 2h ago</p>
                  </div>
                </div>
              </HoverCard.Content>
            </HoverCard>
          </Card.Body>
        </Card>

        {/* Resizable */}
        <Card>
          <Card.Header>
            <Card.Title>Resizable panels</Card.Title>
          </Card.Header>
          <Card.Body>
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Drag the handle to resize (30/70 split)</p>
            <div className={cn(BORDER.default, 'rounded-[8px] overflow-hidden')} style={{ height: 160 }}>
              <Resizable direction="horizontal">
                <Resizable.Panel defaultSize={30} minSize={15} maxSize={50}>
                  <div className="h-full bg-[var(--n200)] p-3">
                    <p className={cn(FONT.body, 'text-[12px]', WEIGHT.strong, 'text-[var(--n1150)]')}>Sidebar</p>
                    <p className={cn(MUTED_STYLE, 'text-[11px] mt-1')}>Drag handle to resize</p>
                  </div>
                </Resizable.Panel>
                <Resizable.Handle />
                <Resizable.Panel defaultSize={70}>
                  <div className="h-full bg-[var(--n50)] p-3">
                    <p className={cn(FONT.body, 'text-[12px]', WEIGHT.strong, 'text-[var(--n1150)]')}>Main content</p>
                    <p className={cn(MUTED_STYLE, 'text-[11px] mt-1')}>Fills remaining space</p>
                  </div>
                </Resizable.Panel>
              </Resizable>
            </div>
          </Card.Body>
        </Card>

        {/* ContextMenu */}
        <Card>
          <Card.Header>
            <Card.Title>Context menu</Card.Title>
          </Card.Header>
          <Card.Body>
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Right-click the card below</p>
            <ContextMenu>
              <ContextMenu.Trigger>
                <Card className="p-4">
                  <p className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)]')}>MIT with spikes</p>
                  <p className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)]')}>12. april 2026 &middot; 1:28:40</p>
                </Card>
              </ContextMenu.Trigger>
              <ContextMenu.Content>
                <ContextMenu.Item
                  icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.25"/></svg>}
                  onClick={() => {}}
                >
                  Open session
                </ContextMenu.Item>
                <ContextMenu.Item
                  icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M11 2l3 3-8 8H3v-3l8-8z" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  onClick={() => {}}
                >
                  Edit
                </ContextMenu.Item>
                <ContextMenu.Item
                  icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25"/><path d="M9 7h5v5a1 1 0 01-1 1H9V7z" stroke="currentColor" strokeWidth="1.25"/></svg>}
                  onClick={() => {}}
                >
                  Duplicate
                  <ContextMenu.Shortcut><Kbd>⌘D</Kbd></ContextMenu.Shortcut>
                </ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item
                  icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M8 3l5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  onClick={() => {}}
                >
                  Export as FIT
                </ContextMenu.Item>
                <ContextMenu.Separator />
                <ContextMenu.Item
                  variant="danger"
                  icon={<svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 5h10M6 5V3h4v2M5 5v8h6V5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  onClick={() => {}}
                >
                  Delete session
                  <ContextMenu.Shortcut><Kbd>⌘⌫</Kbd></ContextMenu.Shortcut>
                </ContextMenu.Item>
              </ContextMenu.Content>
            </ContextMenu>
          </Card.Body>
        </Card>
      </div>
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
              50 components. Zero dependencies. Satoshi for everything — labels, numbers, body text.
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
            <TooltipDemo />
            <AccordionDemo />
            <SliderDemo />
            <IdentityNavDemo />
            <AppShellDemo />
            <FormsExtendedDemo />
            <TagsDemo />
            <GaugesDemo />
            <CalendarDemo />
            <CommandDemo />
            <PopoverDrawerDemo />
            <MiscDemo />
            <SeparatorsLabelsDemo />
            <CollapsibleScrollDemo />
            <Wave6ComplexDemo />
          </div>
        </div>
      </main>
    </ToastProvider>
  )
}
