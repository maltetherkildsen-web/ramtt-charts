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
  TRANSITION,
  CATEGORY_COLORS,
  type CategoryType,
  DOMAIN,
  type DomainKey,
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
  ColorDot,
  StatusIndicator,
  SegmentedBar,
  NumberStepper,
  HexSwatch,
  RatingInput,
  TimePicker,
  StepFlow,
  WidgetCard,
  WidgetPicker,
  DashboardGrid,
  Stat,
  ComparisonCard,
  TimelineStrip,
  RangeSlider,
  FormField,
  NotificationBadge,
  ChartCard,
  Leaderboard,
  MemberList,
  InviteCard,
  NotificationPreferences,
  OnboardingLayout,
  TodoList,
  HelpSection,
  FieldMapping,
  DescriptionList,
  Feed,
  ActionPanel,
  GridList,
  MediaObject,
  FormLayout,
  ButtonGroup,
  AuthLayout,
  LinkGroup,
  LinkList,
  DarkSection,
  SocialIcons,
  Footer,
  CategoryIcon,
  CommandPalette,
  IconTabBar,
  PanelSidebar,
  FloatingToolbar,
  FloatingPanel,
  WorkspaceSwitcher,
  ActivityHeatmap,
  QuickSearch,
  ConversationList,
  StatsGrid,
  AppSidebar,
  ProjectsGrid,
  ChatInput,
  MessageActions,
  WelcomeHero,
  PromoCard,
  ActiveTask,
} from '@/components/ui'

import { IconLink } from '@/components/icons/light/IconLink'
import { IconZone } from '@/components/icons/light/IconZone'
import { IconGut } from '@/components/icons/light/IconGut'
import { IconApple } from '@/components/icons/light/IconApple'
import { IconUserCheck } from '@/components/icons/light/IconUserCheck'
import { IconSun } from '@/components/icons/light/IconSun'
import { IconNotification } from '@/components/icons/light/IconNotification'
import { IconMail } from '@/components/icons/light/IconMail'
import { IconGrid } from '@/components/icons/light/IconGrid'
import { IconSettings } from '@/components/icons/light/IconSettings'
import { IconFlag } from '@/components/icons/light/IconFlag'
import { IconMessageCircle } from '@/components/icons/light/IconMessageCircle'
import { IconStar } from '@/components/icons/light/IconStar'
import { IconCloud } from '@/components/icons/light/IconCloud'
import { IconLock } from '@/components/icons/light/IconLock'
import { IconCode } from '@/components/icons/light/IconCode'
import { IconUser } from '@/components/icons/light/IconUser'
import { IconRunning } from '@/components/icons/light/IconRunning'
import { IconTarget } from '@/components/icons/light/IconTarget'
import { IconLabFlask } from '@/components/icons/light/IconLabFlask'
import { IconLineChart } from '@/components/icons/light/IconLineChart'
import { IconBanana } from '@/components/icons/light/IconBanana'
import { IconMoon } from '@/components/icons/light/IconMoon'
import { IconPalette } from '@/components/icons/light/IconPalette'
import { IconZap } from '@/components/icons/light/IconZap'
import { IconTimer } from '@/components/icons/light/IconTimer'
import { IconDumbbell } from '@/components/icons/light/IconDumbbell'
import { IconHome } from '@/components/icons/light/IconHome'
import { IconCalendar } from '@/components/icons/light/IconCalendar'
import { IconAnalytics } from '@/components/icons/light/IconAnalytics'

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Layout
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function DemoSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <SectionHeader>{title}</SectionHeader>
      <div className="mt-3">{children}</div>
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
      <div className="flex flex-col gap-4">
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Channel selector (default variant)</p>
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
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Time period (sm size)</p>
          <ToggleGroup
            value={period}
            onChange={(v) => setPeriod(v as string)}
            size="sm"
            options={['1d', '5d', '1m', '6m', 'Ytd', '1y', '5y', 'Max']}
          />
        </div>

        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Zone mode (sm, pill variant)</p>
          <ToggleGroup
            value={zone}
            onChange={(v) => setZone(v as string)}
            size="sm"
            variant="pill"
            options={['Off', 'Power', 'HR']}
          />
        </div>

        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Tab navigation (underline variant)</p>
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
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Filter pills (multi-select, pill variant)</p>
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
              'bg-transparent hover:bg-white py-4 px-[18px]', TRANSITION.colors,
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
          <Badge variant="outline" color="warning">Build</Badge>
          <Badge variant="outline" color="info">New</Badge>
          <Badge variant="outline">Default</Badge>

          <Badge variant="outline" color="positive">+7.55%</Badge>
          <Badge variant="outline" color="negative">-0.07%</Badge>
          <Badge variant="outline">Effort 7</Badge>

          <Badge color="var(--negative)" size="md">Z6</Badge>
          <Badge color="#22c55e" size="md">Z2</Badge>
          <Badge color="#eab308" size="md">Z3</Badge>

          <Badge size="md" variant="outline" color="info">Medium</Badge>
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
          <Button variant="outline" size="sm">Small outline</Button>
          <Button variant="outline" size="lg">Large outline</Button>
          <Button variant="ghost" size="sm">Small ghost</Button>
          <Button variant="outline" disabled>Disabled</Button>
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
            <span className={cn(FONT.body, WEIGHT.book, 'text-[11px] text-[var(--n1150)]')}>Hovered</span>
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
            <span className={cn(FONT.body, WEIGHT.book, 'text-[11px] text-[var(--n1150)]')}>Hovered</span>
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
      <div className="flex flex-col gap-4">
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
      <div className="flex flex-col gap-6">
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Underline tabs (with panels)</p>
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
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Pill tabs (with panels)</p>
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
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>ToggleGroup underline (no panels — compare with Tabs above)</p>
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
      <div className="flex flex-col gap-6">
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>MetricCard skeleton</p>
          <Card>
            <div className="flex flex-col gap-2 py-1">
              <Skeleton width={80} height={12} />
              <Skeleton width={120} height={24} />
              <Skeleton width={60} height={12} />
            </div>
          </Card>
        </div>

        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>DataTable skeleton</p>
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
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Shape variations</p>
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
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Hover over each icon to see tooltip positions</p>
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
      <div className="flex flex-col gap-6">
        {/* Avatars */}
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Avatars — sizes, initials fallback, status dots</p>
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
      <div className="flex flex-col gap-6">
        {/* Sidebars */}
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Sidebar — expanded and collapsed</p>
          <div className="flex gap-6">
            <div className={cn(BORDER.default, RADIUS.lg, 'overflow-hidden h-[320px]')}>
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
            <div className={cn(BORDER.default, RADIUS.lg, 'overflow-hidden h-[320px]')}>
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
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Page header variants</p>
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

const GAUGE_THRESHOLDS = [
  { value: 30, color: 'var(--negative)' },
  { value: 60, color: 'var(--warning)' },
  { value: 100, color: 'var(--positive)' },
]

function GaugesDemo() {
  return (
    <DemoSection title="Gauges & Scores">
      <div className="flex flex-col gap-6">
        {/* Ring (full circle) — default */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>Ring (full circle)</p>
          <Card>
            <div className="flex items-center gap-8 justify-center py-4">
              <Gauge variant="ring" value={42} max={100} label="Injury risk" thresholds={GAUGE_THRESHOLDS} />
              <Gauge variant="ring" value={86} max={100} label="Glycogen" unit="%" thresholds={GAUGE_THRESHOLDS} />
              <Gauge variant="ring" value={73} max={100} label="Readiness" thresholds={GAUGE_THRESHOLDS} />
              <Gauge variant="ring" value={62} max={100} label="Fuel cov." unit="%" thresholds={GAUGE_THRESHOLDS} />
            </div>
          </Card>
        </div>

        {/* Bar (horizontal) */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>Bar (horizontal)</p>
          <Card>
            <div className="flex flex-col gap-4 py-2">
              <Gauge variant="bar" value={42} max={100} label="Injury risk" thresholds={GAUGE_THRESHOLDS} />
              <Gauge variant="bar" value={86} max={100} label="Glycogen" unit="%" thresholds={GAUGE_THRESHOLDS} />
              <Gauge variant="bar" value={73} max={100} label="Readiness" thresholds={GAUGE_THRESHOLDS} />
              <Gauge variant="bar" value={62} max={100} label="Fuel coverage" unit="%" thresholds={GAUGE_THRESHOLDS} />
            </div>
          </Card>
        </div>
      </div>
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
      <div className="flex flex-col gap-6">
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
      <div className="flex flex-col gap-6">
        {/* Pagination */}
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Pagination</p>
          <Pagination page={currentPage} totalPages={24} onChange={setCurrentPage} />
        </div>

        {/* Alerts — Dot (default) */}
        <div className="flex flex-col gap-2">
          <p className={cn(LABEL_STYLE, 'mb-1')}>Dot (default)</p>
          <Alert severity="success">Your FTP was updated to 285W based on today's session.</Alert>
          <Alert severity="info">3 new signals require attention.</Alert>
          <Alert severity="warning" action={{ label: 'Review', onClick: () => {} }}>
            Your injury risk score has increased to 72.
          </Alert>
          <Alert severity="error" title="Sync failed">
            Could not connect to Strava. Check your integration settings.
          </Alert>
          {showAlert && (
            <Alert severity="success" onDismiss={() => setShowAlert(false)}>
              Session uploaded successfully.
            </Alert>
          )}
        </div>

        {/* Alerts — Edge-left */}
        <div className="flex flex-col gap-2">
          <p className={cn(LABEL_STYLE, 'mb-1')}>Edge-left</p>
          <Alert appearance="edge-left" severity="success">Your FTP was updated to 285W based on today's session.</Alert>
          <Alert appearance="edge-left" severity="info">3 new signals require attention.</Alert>
          <Alert appearance="edge-left" severity="warning" action={{ label: 'Review', onClick: () => {} }}>
            Your injury risk score has increased to 72.
          </Alert>
          <Alert appearance="edge-left" severity="error" title="Sync failed">
            Could not connect to Strava. Check your integration settings.
          </Alert>
        </div>

        {/* Alerts — Edge-top */}
        <div className="flex flex-col gap-2">
          <p className={cn(LABEL_STYLE, 'mb-1')}>Edge-top</p>
          <Alert appearance="edge-top" severity="success">Your FTP was updated to 285W based on today's session.</Alert>
          <Alert appearance="edge-top" severity="info">3 new signals require attention.</Alert>
          <Alert appearance="edge-top" severity="warning" action={{ label: 'Review', onClick: () => {} }}>
            Your injury risk score has increased to 72.
          </Alert>
          <Alert appearance="edge-top" severity="error" title="Sync failed">
            Could not connect to Strava. Check your integration settings.
          </Alert>
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
      <div className="flex flex-col gap-6">
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
              <div className="flex gap-3 w-max">
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
      <div className="flex flex-col gap-6">
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
            <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Hover over the name to see a preview</p>
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
            <div className={cn(BORDER.default, RADIUS.lg, 'overflow-hidden h-[160px]')}>
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
// Wave 7A — Status & Indicators
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function StatusIndicatorsDemo() {
  return (
    <DemoSection title="Status & Indicators">
      <div className="flex flex-col gap-6">
        {/* ColorDot — all semantic colors + custom hex, all sizes */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>ColorDot — semantic colors, all sizes</p>
          <div className="flex items-center gap-4">
            <ColorDot color="positive" />
            <ColorDot color="negative" />
            <ColorDot color="warning" />
            <ColorDot color="info" />
            <ColorDot color="#8b5cf6" />
            <Separator orientation="vertical" className="h-4" />
            <ColorDot color="negative" size="sm" />
            <ColorDot color="negative" size="md" />
            <ColorDot color="negative" size="lg" />
          </div>
        </div>

        {/* ColorDot — with labels */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>ColorDot — with labels</p>
          <div className="flex items-center gap-5">
            <ColorDot color="positive" label="Compliant" />
            <ColorDot color="negative" label="Missed" />
            <ColorDot color="warning" label="Partial" />
          </div>
        </div>

        {/* ColorDot — hollow (outline ring) */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>ColorDot — hollow ring</p>
          <div className="flex items-center gap-5">
            <ColorDot color="positive" variant="hollow" label="Connected" />
            <ColorDot color="warning" variant="hollow" label="Syncing" />
            <ColorDot color="negative" variant="hollow" label="Disconnected" />
            <Separator orientation="vertical" className="h-4" />
            <ColorDot color="info" variant="hollow" size="sm" />
            <ColorDot color="info" variant="hollow" size="md" />
            <ColorDot color="info" variant="hollow" size="lg" />
          </div>
        </div>

        {/* ColorDot — vertical bar */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>ColorDot — vertical bar</p>
          <div className="flex items-center gap-5">
            <ColorDot color="positive" variant="bar" label="Connected" />
            <ColorDot color="warning" variant="bar" label="Syncing" />
            <ColorDot color="negative" variant="bar" label="Disconnected" />
            <Separator orientation="vertical" className="h-4" />
            <ColorDot color="#8b5cf6" variant="bar" size="sm" />
            <ColorDot color="#8b5cf6" variant="bar" size="md" />
            <ColorDot color="#8b5cf6" variant="bar" size="lg" />
          </div>
        </div>

        {/* ColorDot — pulse animation */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>ColorDot — pulse (live status)</p>
          <div className="flex items-center gap-5">
            <ColorDot color="positive" pulse label="Connected" />
            <ColorDot color="warning" pulse label="Syncing" />
            <ColorDot color="negative" pulse label="Disconnected" />
          </div>
        </div>

        {/* StatusIndicator — all 5 states */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>StatusIndicator — all states</p>
          <div className="flex items-center gap-5">
            <StatusIndicator status="good" label="Good" size="sm" />
            <StatusIndicator status="warning" label="Warning" size="sm" />
            <StatusIndicator status="critical" label="Critical" size="sm" />
            <StatusIndicator status="neutral" label="Neutral" size="sm" />
            <StatusIndicator status="unknown" label="Unknown" size="sm" />
          </div>
        </div>

        {/* StatusIndicator — size md with value */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>StatusIndicator — md with value</p>
          <div className="flex gap-6">
            <StatusIndicator status="good" label="Fuel readiness" value="Good to go" />
            <StatusIndicator status="warning" label="GI status" value="Mild discomfort" />
            <StatusIndicator status="critical" label="Hydration" value="Below target" />
          </div>
        </div>

        {/* StatusIndicator — size lg — dot (default) */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>StatusIndicator — lg — dot</p>
          <div className="flex gap-3">
            <StatusIndicator status="good" size="lg" label="Race readiness" value="All systems nominal" />
            <StatusIndicator status="warning" size="lg" label="Recovery" value="Moderate fatigue detected" />
            <StatusIndicator status="critical" size="lg" label="Overtraining risk" value="Rest recommended" />
          </div>
        </div>

        {/* StatusIndicator — size lg — edge-left */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>StatusIndicator — lg — edge-left</p>
          <div className="flex gap-3">
            <StatusIndicator status="good" size="lg" appearance="edge-left" label="Race readiness" value="All systems nominal" />
            <StatusIndicator status="warning" size="lg" appearance="edge-left" label="Recovery" value="Moderate fatigue detected" />
            <StatusIndicator status="critical" size="lg" appearance="edge-left" label="Overtraining risk" value="Rest recommended" />
          </div>
        </div>

        {/* StatusIndicator — size lg — edge-top */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>StatusIndicator — lg — edge-top</p>
          <div className="flex gap-3">
            <StatusIndicator status="good" size="lg" appearance="edge-top" label="Race readiness" value="All systems nominal" />
            <StatusIndicator status="warning" size="lg" appearance="edge-top" label="Recovery" value="Moderate fatigue detected" />
            <StatusIndicator status="critical" size="lg" appearance="edge-top" label="Overtraining risk" value="Rest recommended" />
          </div>
        </div>
      </div>
    </DemoSection>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Wave 7A — Segmented Bar
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function SegmentedBarDemo() {
  return (
    <DemoSection title="Segmented Bar">
      <div className="flex flex-col gap-6">
        {/* Zone distribution */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>Zone distribution (6 zones)</p>
          <SegmentedBar
            segments={[
              { value: 12, color: 'var(--color-pz-1)', label: 'Z1' },
              { value: 25, color: 'var(--color-pz-2)', label: 'Z2' },
              { value: 30, color: 'var(--color-pz-3)', label: 'Z3' },
              { value: 20, color: 'var(--color-pz-4)', label: 'Z4' },
              { value: 10, color: 'var(--color-pz-5)', label: 'Z5' },
              { value: 3, color: 'var(--color-pz-6)', label: 'Z6' },
            ]}
            height={8}
            showLabels
          />
        </div>

        {/* Macro breakdown with legend */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>Macro breakdown with legend</p>
          <SegmentedBar
            segments={[
              { value: 55, color: '#f97316', label: 'CHO' },
              { value: 25, color: '#3b82f6', label: 'Protein' },
              { value: 20, color: '#eab308', label: 'Fat' },
            ]}
            legend
          />
        </div>

        {/* With showLabels */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>With showLabels (percentages above)</p>
          <SegmentedBar
            segments={[
              { value: 40, color: 'var(--positive)', label: 'Completed' },
              { value: 35, color: 'var(--warning)', label: 'In progress' },
              { value: 25, color: 'var(--negative)', label: 'Overdue' },
            ]}
            showLabels
            height={10}
          />
        </div>

        {/* Compact inline */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>Compact (height=4) for inline use</p>
          <SegmentedBar
            segments={[
              { value: 70, color: 'var(--positive)', label: 'Pass' },
              { value: 20, color: 'var(--warning)', label: 'Warn' },
              { value: 10, color: 'var(--negative)', label: 'Fail' },
            ]}
            height={4}
            legend
          />
        </div>
      </div>
    </DemoSection>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Wave 7A — Number Stepper
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function NumberStepperDemo() {
  const [cho, setCho] = useState(45)
  const [ftp, setFtp] = useState(280)
  const [minVal, setMinVal] = useState(0)
  const [maxVal, setMaxVal] = useState(200)

  return (
    <DemoSection title="Number Stepper">
      <div className="flex flex-wrap gap-6">
        {/* With label + unit */}
        <NumberStepper
          value={cho}
          onChange={setCho}
          label="CHO intake"
          unit="g"
          min={0}
          max={200}
          step={5}
        />

        {/* At min value */}
        <NumberStepper
          value={minVal}
          onChange={setMinVal}
          label="At min (0)"
          unit="g"
          min={0}
          max={100}
          step={5}
        />

        {/* At max value */}
        <NumberStepper
          value={maxVal}
          onChange={setMaxVal}
          label="At max (200)"
          unit="g"
          min={0}
          max={200}
          step={5}
        />

        {/* FTP with step=1 */}
        <NumberStepper
          value={ftp}
          onChange={setFtp}
          label="FTP"
          unit="W"
          min={100}
          max={500}
          step={1}
        />
      </div>
    </DemoSection>
  )
}

function HexSwatchDemo() {
  return (
    <DemoSection title="Hex Swatch">
      <div className="grid grid-cols-3 gap-4 md:grid-cols-4">
        <HexSwatch token="--bg" hex="#FAF9F5" label="Canvas" usage="Page background" />
        <HexSwatch token="--n200" hex="#F2F0EA" label="Hover" usage="Hover states" />
        <HexSwatch hex="#6B6760" label="Secondary" />
        <HexSwatch hex="#131211" />
      </div>
    </DemoSection>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Wave 7B — Rating & Time Input
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function RatingTimeDemo() {
  const [legs, setLegs] = useState<number | null>(3)
  const [effort, setEffort] = useState<number | null>(7)
  const [nullRating, setNullRating] = useState<number | null>(null)
  const [compactRating, setCompactRating] = useState<number | null>(4)
  const [time24, setTime24] = useState<string | null>('14:30')
  const [time15, setTime15] = useState<string | null>('09:00')

  return (
    <DemoSection title="Rating & Time Input">
      <div className="flex flex-col gap-6">
        {/* RatingInput 1-5 with labels */}
        <div>
          <RatingInput
            value={legs}
            onChange={setLegs}
            label="Leg feel"
            max={5}
            labels={['Dead', 'Heavy', 'Normal', 'Good', 'Fresh']}
          />
        </div>

        {/* RatingInput 1-10 */}
        <div>
          <RatingInput
            value={effort}
            onChange={setEffort}
            label="Effort"
            max={10}
          />
        </div>

        {/* RatingInput null state */}
        <div>
          <RatingInput
            value={nullRating}
            onChange={setNullRating}
            label="Session quality"
            max={5}
          />
        </div>

        {/* RatingInput compact */}
        <div className="flex items-center gap-3">
          <span className={cn(LABEL_STYLE)}>Mood (compact)</span>
          <RatingInput value={compactRating} onChange={setCompactRating} max={5} compact />
        </div>

        {/* TimePicker 24h */}
        <div className="flex gap-6">
          <TimePicker
            value={time24}
            onChange={setTime24}
            label="Caffeine timing"
          />

          {/* TimePicker step=15 */}
          <TimePicker
            value={time15}
            onChange={setTime15}
            label="Session start"
            step={15}
          />
        </div>
      </div>
    </DemoSection>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Wave 7B — Step Flow
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function StepFlowDemo() {
  const [step, setStep] = useState(2) // Start at step 3 (index 2) as brief says
  const [sleepHours, setSleepHours] = useState<number | null>(4)
  const [sleepQuality, setSleepQuality] = useState<number | null>(3)
  const [soreness, setSoreness] = useState<number | null>(2)
  const [fatigue, setFatigue] = useState<number | null>(3)
  const [mood, setMood] = useState<number | null>(4)
  const [stress, setStress] = useState<number | null>(2)
  const [wakeTime, setWakeTime] = useState<string | null>('06:30')
  const [hydrated, setHydrated] = useState(false)

  const steps = [
    {
      label: 'Sleep',
      content: (
        <Card>
          <Card.Body>
            <div className="flex flex-col gap-4">
              <RatingInput value={sleepHours} onChange={setSleepHours} label="Sleep duration" max={5} labels={['< 5h', '5-6h', '6-7h', '7-8h', '8h+']} />
              <RatingInput value={sleepQuality} onChange={setSleepQuality} label="Sleep quality" max={5} labels={['Terrible', 'Poor', 'OK', 'Good', 'Great']} />
              <TimePicker value={wakeTime} onChange={setWakeTime} label="Wake time" />
            </div>
          </Card.Body>
        </Card>
      ),
    },
    {
      label: 'Body',
      content: (
        <Card>
          <Card.Body>
            <div className="flex flex-col gap-4">
              <RatingInput value={soreness} onChange={setSoreness} label="Soreness" max={5} labels={['None', 'Slight', 'Moderate', 'Sore', 'Very sore']} />
              <RatingInput value={fatigue} onChange={setFatigue} label="Fatigue" max={5} labels={['Fresh', 'Rested', 'Normal', 'Tired', 'Exhausted']} />
            </div>
          </Card.Body>
        </Card>
      ),
    },
    {
      label: 'Mind',
      content: (
        <Card>
          <Card.Body>
            <div className="flex flex-col gap-4">
              <RatingInput value={mood} onChange={setMood} label="Mood" max={5} labels={['Low', 'Below avg', 'Neutral', 'Good', 'Great']} />
              <RatingInput value={stress} onChange={setStress} label="Stress" max={5} labels={['None', 'Low', 'Moderate', 'High', 'Extreme']} />
            </div>
          </Card.Body>
        </Card>
      ),
    },
    {
      label: 'Fuel',
      content: (
        <Card>
          <Card.Body>
            <div className="flex flex-col gap-4">
              <Switch label="Well hydrated" checked={hydrated} onChange={setHydrated} />
              <Input label="Breakfast notes" placeholder="What did you eat?" />
            </div>
          </Card.Body>
        </Card>
      ),
    },
    {
      label: 'Review',
      content: (
        <Card>
          <Card.Body>
            <p className={cn(FONT.body, WEIGHT.normal, 'text-[13px] text-[var(--n800)]')}>
              All inputs captured. Review and submit your daily state.
            </p>
          </Card.Body>
        </Card>
      ),
    },
  ]

  return (
    <DemoSection title="Step Flow">
      <StepFlow
        steps={steps}
        currentStep={step}
        onStepChange={setStep}
        onComplete={() => setStep(0)}
      />
    </DemoSection>
  )
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Wave 7C — Widget System
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

function WidgetSystemDemo() {
  const [pickerOpen, setPickerOpen] = useState(false)
  const [timeRange, setTimeRange] = useState('30d')
  const [collapsedWidget, setCollapsedWidget] = useState(true)
  const [installedWidgets, setInstalledWidgets] = useState(['capacity-chart', 'peak-curves', 'zone-distribution'])
  const [gridLayout, setGridLayout] = useState([
    { id: 'capacity-chart', x: 0, y: 0, w: 12, h: 4 },
    { id: 'peak-curves', x: 0, y: 4, w: 6, h: 3 },
    { id: 'zone-distribution', x: 6, y: 4, w: 6, h: 3 },
  ])

  return (
    <DemoSection title="Widget System">
      <div className="flex flex-col gap-6">
        {/* WidgetCard with all action icons */}
        <WidgetCard
          title="Durability index"
          subtitle="CP decay per hour of riding"
          onSettings={() => {}}
          onFullscreen={() => {}}
          onRemove={() => {}}
          infoHref="#"
        >
          <div className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] py-6 text-center')}>
            Chart content goes here
          </div>
        </WidgetCard>

        {/* WidgetCard with time range selector */}
        <WidgetCard
          title="Capacity chart"
          subtitle="CP/W' progression"
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          timeRangeOptions={['7d', '30d', '90d']}
        >
          <div className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] py-6 text-center')}>
            Capacity chart for {timeRange}
          </div>
        </WidgetCard>

        {/* WidgetCard collapsed */}
        <WidgetCard
          title="Peak freshness"
          subtitle="Best form periods"
          collapsible
          collapsed={collapsedWidget}
          onCollapsedChange={setCollapsedWidget}
        >
          <div className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] py-6 text-center')}>
            Collapsed content — click title to toggle
          </div>
        </WidgetCard>

        {/* WidgetCard loading */}
        <WidgetCard title="Zone distribution" loading>
          <div />
        </WidgetCard>

        {/* WidgetCard with drag handle */}
        <WidgetCard
          title="ACWR trend"
          subtitle="Acute:chronic workload ratio"
          dragHandle
        >
          <div className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] py-6 text-center')}>
            Drag handle visible on the left
          </div>
        </WidgetCard>

        {/* Add widget button + picker */}
        <Button variant="outline" onClick={() => setPickerOpen(true)}>
          Add widget
        </Button>
        <WidgetPicker
          open={pickerOpen}
          onClose={() => setPickerOpen(false)}
          onAdd={(id) => {
            setInstalledWidgets((prev) => [...prev, id])
          }}
          installedWidgets={installedWidgets}
        />

        {/* DashboardGrid demo */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>DashboardGrid — drag handles to rearrange</p>
          <DashboardGrid
            layout={gridLayout}
            onLayoutChange={setGridLayout}
          >
            {gridLayout.map((item) => (
              <DashboardGrid.Item key={item.id} {...item}>
                <WidgetCard
                  title={item.id === 'capacity-chart' ? 'Capacity chart' : item.id === 'peak-curves' ? 'Peak curves' : 'Zone distribution'}
                  dragHandle
                  className="h-full"
                >
                  <div className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n600)] text-center py-4')}>
                    {item.w}×{item.h} at ({item.x},{item.y})
                  </div>
                </WidgetCard>
              </DashboardGrid.Item>
            ))}
          </DashboardGrid>
        </div>
      </div>
    </DemoSection>
  )
}

// ─── Wave 8A: Stat & Comparison ───

function StatComparisonDemo() {
  return (
    <DemoSection title="Stat & Comparison">
      <div className="flex flex-col gap-6">
        {/* Stat formats */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>Stat — format types</p>
          <div className="flex flex-wrap items-baseline gap-6">
            <Stat value={267} unit="W" />
            <Stat value={5320} format="time" />
            <Stat value={0.952} format="percent" />
            <Stat value={42350} format="compact" />
          </div>
        </div>

        {/* Stat with delta */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>Stat — with delta</p>
          <div className="flex flex-wrap items-baseline gap-6">
            <Stat value={285} unit="W" delta={12} deltaColor="positive" />
            <Stat value={267} unit="W" delta={-18} deltaColor="negative" />
            <Stat value={155} unit="BPM" delta={0} deltaColor="default" />
          </div>
        </div>

        {/* Stat with inline label */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>Stat — with label</p>
          <div className="flex flex-wrap items-baseline gap-6">
            <Stat value={267} unit="W" label="Avg power" />
            <Stat value={155} unit="BPM" label="Avg HR" />
          </div>
        </div>

        {/* Stat sizes */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>Stat — sizes</p>
          <div className="flex flex-wrap items-baseline gap-6">
            <Stat value={267} unit="W" size="sm" />
            <Stat value={267} unit="W" size="md" />
            <Stat value={267} unit="W" size="lg" />
          </div>
        </div>

        {/* Stat with precision */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>Stat — precision</p>
          <div className="flex flex-wrap items-baseline gap-6">
            <Stat value={267.842} precision={0} unit="W" />
            <Stat value={3.9584} precision={2} unit="W/kg" />
          </div>
        </div>

        {/* ComparisonCard — 2 columns */}
        <ComparisonCard
          title="FTP progression"
          columns={[
            { label: 'Current', highlight: true },
            { label: '3 months ago' },
          ]}
          rows={[
            { label: 'FTP', values: ['285 W', '267 W'], delta: '+18 W', deltaColor: 'positive' },
            { label: 'W/kg', values: ['3.96', '3.71'], delta: '+0.25', deltaColor: 'positive' },
            { label: 'CP', values: ['278 W', '261 W'], delta: '+17 W', deltaColor: 'positive' },
            { label: 'Reserve', values: ['22.4 kJ', '18.1 kJ'], delta: '+4.3 kJ', deltaColor: 'positive' },
          ]}
        />

        {/* ComparisonCard — 3 columns */}
        <ComparisonCard
          title="Course progression"
          subtitle="Alpe d'Huez"
          columns={[
            { label: '12. apr 2026', highlight: true },
            { label: '3. feb 2026' },
            { label: '15. nov 2025' },
          ]}
          rows={[
            { label: 'Time', values: ['48:12', '51:34', '53:08'] },
            { label: 'Avg power', values: ['312 W', '289 W', '275 W'] },
            { label: 'CHO/h', values: ['92 g', '68 g', '45 g'] },
            { label: 'Fuel score', values: ['87', '62', '41'] },
          ]}
        />
      </div>
    </DemoSection>
  )
}

// ─── Wave 8A: Timeline & Range ───

function TimelineRangeDemo() {
  const [powerRange, setPowerRange] = useState<[number, number]>([200, 350])
  const [zoneRange, setZoneRange] = useState<[number, number]>([30, 70])

  return (
    <DemoSection title="Timeline & Range">
      <div className="flex flex-col gap-6">
        {/* Race nutrition timeline */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>TimelineStrip — race nutrition (300 min)</p>
          <TimelineStrip
            startLabel="Start"
            endLabel="Finish"
            duration={300}
            unit="min"
            markers={[
              { position: 0, label: 'Gel 1', color: 'var(--zone-3, #e8b020)' },
              { position: 45, label: 'Gel 2', color: 'var(--zone-4, #e36b30)' },
              { position: 90, label: 'Gel 3', color: 'var(--zone-4, #e36b30)' },
              { position: 120, label: 'Caffeine', color: 'var(--info)' },
              { position: 135, label: 'Gel 4', color: 'var(--zone-5, #e83b52)' },
              { position: 180, label: 'Gel 5', color: 'var(--zone-5, #e83b52)' },
            ]}
          />
        </div>

        {/* Race week timeline */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>TimelineStrip — race week with zones</p>
          <TimelineStrip
            startLabel="D-7"
            endLabel="Race"
            duration={8}
            unit="days"
            markers={[
              { position: 0, label: 'Normal eating', color: 'var(--n600)', span: 4 },
              { position: 5, label: 'Carb load', color: 'var(--warning)', span: 2 },
              { position: 7, label: 'Race day', color: 'var(--negative)', span: 1 },
            ]}
            zones={[
              { start: 0, end: 4, color: 'var(--n200)', label: 'Normal' },
              { start: 5, end: 7, color: 'var(--warning-soft)', label: 'Loading' },
              { start: 7, end: 8, color: 'var(--negative-soft)', label: 'Race' },
            ]}
          />
        </div>

        {/* RangeSlider — power range */}
        <RangeSlider
          min={0}
          max={500}
          value={powerRange}
          onChange={setPowerRange}
          step={5}
          label="Power range"
          unit="W"
        />

        {/* RangeSlider — with marks */}
        <RangeSlider
          min={0}
          max={100}
          value={zoneRange}
          onChange={setZoneRange}
          marks={[
            { value: 0, label: '0%' },
            { value: 55, label: 'Z2' },
            { value: 75, label: 'Z3' },
            { value: 90, label: 'Z4' },
            { value: 100, label: 'Z5' },
          ]}
          label="Zone range"
          unit="%"
        />
      </div>
    </DemoSection>
  )
}

// ─── Wave 8A: Form & Notification ───

function FormNotificationDemo() {
  const [ftp, setFtp] = useState('285')
  const [sport, setSport] = useState('cycling')
  const [weight, setWeight] = useState('200')

  return (
    <DemoSection title="Form & Notification">
      <div className="flex flex-col gap-6">
        {/* FormField examples */}
        <div className="max-w-[360px]">
          <FormField label="FTP" required description="Your functional threshold power">
            <Input
              type="number"
              value={ftp}
              onChange={(e) => setFtp(e.target.value)}
              unit="W"
            />
          </FormField>

          <FormField label="Primary sport">
            <Select
              value={sport}
              onChange={(v) => setSport(v)}
              options={[
                { value: 'cycling', label: 'Cycling' },
                { value: 'running', label: 'Running' },
                { value: 'triathlon', label: 'Triathlon' },
              ]}
            />
          </FormField>

          <FormField label="Weight" error="Weight must be between 40-150 kg">
            <Input
              type="number"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              unit="kg"
            />
          </FormField>
        </div>

        {/* NotificationBadge */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>NotificationBadge</p>
          <div className="flex items-center gap-8">
            <NotificationBadge count={3}>
              <div className={cn('w-8 h-8 rounded-[5px] bg-[var(--n200)] flex items-center justify-center', FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n800)]')}>
                S
              </div>
            </NotificationBadge>

            <NotificationBadge count={142}>
              <div className={cn('w-8 h-8 rounded-[5px] bg-[var(--n200)] flex items-center justify-center', FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n800)]')}>
                M
              </div>
            </NotificationBadge>

            <NotificationBadge dot>
              <div className={cn('w-8 h-8 rounded-[5px] bg-[var(--n200)] flex items-center justify-center', FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n800)]')}>
                N
              </div>
            </NotificationBadge>

            <NotificationBadge count={0}>
              <div className={cn('w-8 h-8 rounded-[5px] bg-[var(--n200)] flex items-center justify-center', FONT.body, 'text-[12px]', WEIGHT.book, 'text-[var(--n800)]')}>
                I
              </div>
            </NotificationBadge>
          </div>
        </div>
      </div>
    </DemoSection>
  )
}

// ─── 41. Chart card ───

function ChartCardDemo() {
  const [period, setPeriod] = useState('90D')

  return (
    <DemoSection title="Chart card">
      <div className="flex flex-col gap-4">
        <ChartCard
          title="Training load"
          subtitle="CTL / ATL / TSB over time"
          periods={['30D', '90D', '1Y']}
          period={period}
          onPeriodChange={setPeriod}
          legend={[
            { color: '#22c55e', label: 'CTL (Fitness)' },
            { color: '#f59e0b', label: 'ATL (Fatigue)' },
            { color: '#3b82f6', label: 'TSB (Form)' },
          ]}
        >
          <div
            className="bg-[var(--n200)] rounded-[5px] flex items-center justify-center h-[200px]"
          >
            <span className={cn(FONT.body, 'text-[13px] text-[var(--n600)]')}>Chart placeholder</span>
          </div>
        </ChartCard>

        <ChartCard
          title="Power curve"
          subtitle="Best efforts across all sessions"
          metric={{ value: '412 W', label: 'Peak 5min', delta: '+8%', deltaColor: 'positive' }}
        >
          <div
            className="bg-[var(--n200)] rounded-[5px] flex items-center justify-center h-[160px]"
          >
            <span className={cn(FONT.body, 'text-[13px] text-[var(--n600)]')}>Chart placeholder</span>
          </div>
        </ChartCard>
      </div>
    </DemoSection>
  )
}

// ─── 42. Leaderboard ───

function LeaderboardDemo() {
  return (
    <DemoSection title="Leaderboard">
      <div className="grid grid-cols-2 gap-4">
        <Card padding="md">
          <Leaderboard
            title="Weekly compliance"
            items={[
              { rank: 1, label: 'Malte Therkildsen', avatar: '', value: '96%', progress: 96, trend: 'up' },
              { rank: 2, label: 'Jonas Eriksen', avatar: '', value: '88%', progress: 88, trend: 'down' },
              { rank: 3, label: 'Ruth Hansen', avatar: '', value: '84%', progress: 84, trend: 'stable' },
              { rank: 4, label: 'Lars Nielsen', avatar: '', value: '72%', progress: 72, trend: 'down' },
              { rank: 5, label: 'Niko Berg', avatar: '', value: '68%', progress: 68, trend: 'up' },
            ]}
          />
        </Card>

        <Card padding="md">
          <Leaderboard
            title="Zone distribution"
            showRank={false}
            items={[
              { rank: 1, label: 'Z2 Endurance', value: '45min', progress: 75, color: '#22c55e' },
              { rank: 2, label: 'Z3 Tempo', value: '32min', progress: 53, color: '#eab308' },
              { rank: 3, label: 'Z4 Threshold', value: '18min', progress: 30, color: '#f97316' },
              { rank: 4, label: 'Z5 VO2max', value: '8min', progress: 13, color: '#ef4444' },
              { rank: 5, label: 'Z1 Recovery', value: '5min', progress: 8, color: '#94a3b8' },
            ]}
          />
        </Card>
      </div>
    </DemoSection>
  )
}

// ─── 43. Member list ───

function MemberListDemo() {
  return (
    <DemoSection title="Member list">
      <Card padding="md">
        <MemberList
          title="Athletes"
          members={[
            { id: '1', name: 'Malte Therkildsen', email: 'malte@ramt.dev', role: 'Athlete', status: 'active' },
            { id: '2', name: 'Ruth Eriksen', email: 'ruth@example.com', role: 'Coach', status: 'active' },
            { id: '3', name: 'Jonas Hansen', email: 'jonas@example.com', role: 'Athlete', status: 'active' },
            { id: '4', email: 'lars@example.com', role: 'Athlete', status: 'invited' },
          ]}
          onRoleChange={(id, role) => {}}
          onRemove={(id) => {}}
          onInvite={() => {}}
        />
      </Card>
    </DemoSection>
  )
}

// ─── 44. Invite card ───

function InviteCardDemo() {
  return (
    <DemoSection title="Invite card">
      <div className="flex flex-col gap-4">
        <InviteCard
          onInvite={(email, role) => alert(`Invited ${email} as ${role}`)}
          roles={['Athlete', 'Coach', 'Viewer']}
          defaultRole="Athlete"
        />

        <InviteCard
          onInvite={(emails, role) => alert(`Invited ${Array.isArray(emails) ? emails.join(', ') : emails} as ${role}`)}
          multiple
          roles={['Athlete', 'Coach']}
          title="Invite multiple members"
          description="Enter comma-separated email addresses."
        />
      </div>
    </DemoSection>
  )
}

// ─── 45. Onboarding ───

function OnboardingDemo() {
  return (
    <DemoSection title="Onboarding">
      <Card padding="md">
        <OnboardingLayout
          steps={[
            {
              title: 'Welcome',
              description: "Let's set up your profile",
              content: (
                <div className="flex flex-col gap-3">
                  <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
                    Welcome to RAMTT. This wizard will guide you through initial setup so you can
                    start tracking your training right away.
                  </p>
                </div>
              ),
            },
            {
              title: 'Thresholds',
              description: 'Set your FTP and heart rate zones',
              content: (
                <div className="flex flex-col gap-3">
                  <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
                    Enter your current functional threshold power (FTP) and max heart rate to
                    calibrate your training zones.
                  </p>
                </div>
              ),
            },
            {
              title: 'Integrations',
              description: 'Connect Strava and your devices',
              content: (
                <div className="flex flex-col gap-3">
                  <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
                    Connect your accounts and devices to automatically sync training sessions.
                  </p>
                </div>
              ),
            },
            {
              title: 'Done',
              description: "You're all set",
              content: (
                <div className="flex flex-col gap-3">
                  <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
                    Your profile is ready. Start logging sessions or explore your dashboard.
                  </p>
                </div>
              ),
              nextLabel: 'Go to dashboard',
            },
          ]}
          onComplete={() => alert('Onboarding complete!')}
        />
      </Card>
    </DemoSection>
  )
}

// ─── 46. Notification preferences ───

function NotificationPreferencesDemo() {
  const [prefs, setPrefs] = useState({
    session_complete: true,
    weekly_summary: true,
    ftp_update: false,
    injury_risk: true,
    overtraining: true,
    coach_message: false,
  })

  return (
    <DemoSection title="Notification preferences">
      <Card padding="md">
        <NotificationPreferences
          groups={[
            {
              title: 'Training',
              items: [
                {
                  id: 'session_complete',
                  label: 'Session completed',
                  description: 'Get notified when a session is synced and analyzed',
                  enabled: prefs.session_complete,
                },
                {
                  id: 'weekly_summary',
                  label: 'Weekly summary',
                  description: 'Receive a weekly training load and progress report',
                  enabled: prefs.weekly_summary,
                },
                {
                  id: 'ftp_update',
                  label: 'FTP updates',
                  description: 'Get notified when your FTP is recalculated',
                  enabled: prefs.ftp_update,
                },
              ],
            },
            {
              title: 'Signals & Alerts',
              items: [
                {
                  id: 'injury_risk',
                  label: 'Injury risk warning',
                  description: 'Alert when injury risk score exceeds threshold',
                  enabled: prefs.injury_risk,
                },
                {
                  id: 'overtraining',
                  label: 'Overtraining detection',
                  description: 'Alert when training load indicators suggest overtraining',
                  enabled: prefs.overtraining,
                },
                {
                  id: 'coach_message',
                  label: 'Coach messages',
                  description: 'Receive push notifications for coach feedback',
                  enabled: prefs.coach_message,
                  disabled: true,
                  disabledReason: 'Requires Pro plan',
                },
              ],
            },
          ]}
          onChange={(id, enabled) => setPrefs((p) => ({ ...p, [id]: enabled }))}
        />
      </Card>
    </DemoSection>
  )
}

// ─── 47. Help / FAQ ───

function HelpSectionDemo() {
  return (
    <DemoSection title="Help / FAQ">
      <Card padding="md">
        <HelpSection
          title="Frequently asked questions"
          searchable
          items={[
            {
              question: 'How is FTP calculated?',
              answer: 'FTP is estimated from your best 20-minute power effort, multiplied by 0.95. You can also set it manually in Settings.',
              category: 'Training',
            },
            {
              question: 'What are training zones?',
              answer: 'Training zones divide your effort into intensity levels based on FTP or heart rate thresholds. RAMTT uses a 7-zone model for power and a 5-zone model for heart rate.',
              category: 'Training',
            },
            {
              question: 'What is the CHO zone system?',
              answer: 'The CHO zone system categorizes your carbohydrate intake targets based on exercise intensity and duration, helping you fuel optimally for each session type.',
              category: 'Nutrition',
            },
            {
              question: 'How do I log fuel intake?',
              answer: 'Open any session, tap the nutrition tab, and enter grams of carbohydrate consumed. You can also scan product barcodes for automatic entry.',
              category: 'Nutrition',
            },
            {
              question: 'How do I connect Strava?',
              answer: 'Go to Settings, then Integrations, then Strava, and click Connect. You will be redirected to authorize RAMTT to read your activities.',
              category: 'Integrations',
            },
          ]}
          contactAction={
            <span>
              Can&apos;t find an answer?{' '}
              <span className={cn(WEIGHT.medium, 'text-[var(--n1150)]')}>Contact support</span>
            </span>
          }
        />
      </Card>
    </DemoSection>
  )
}

// ─── 48. Field mapping ───

function FieldMappingDemo() {
  return (
    <DemoSection title="Field mapping">
      <FieldMapping
        title="Map your data"
        sourceLabel="Strava"
        targetLabel="RAMTT"
        mappings={[
          { source: 'average_watts', target: 'avg_power', status: 'mapped' },
          { source: 'average_heartrate', target: 'avg_hr', status: 'mapped' },
          { source: 'max_watts', target: 'peak_power', status: 'mapped' },
          { source: 'suffer_score', target: null, status: 'unmapped' },
          { source: null, target: 'normalized_power', status: 'unmapped' },
        ]}
        availableTargets={['tss', 'if_factor', 'vi', 'normalized_power']}
        onMapChange={(source, target) => {}}
      />
    </DemoSection>
  )
}

// ─── 49. Todo list ───

function TodoListDemo() {
  const [itemsA, setItemsA] = useState([
    { id: '1', text: 'Check tire pressure', done: true },
    { id: '2', text: 'Fill bottles (2x750ml)', done: true },
    { id: '3', text: 'Prepare gels (4x SiS)', done: false },
    { id: '4', text: 'Charge head unit', done: false },
    { id: '5', text: 'Set FTP on device', done: false },
  ])

  const [itemsB, setItemsB] = useState([
    { id: '1', text: 'Complete 3 interval sessions', done: true },
    { id: '2', text: 'Log nutrition for every ride', done: false },
    { id: '3', text: 'Hit 600 TSS weekly target', done: false },
  ])

  let nextId = 100

  return (
    <DemoSection title="Todo list">
      <div className="grid grid-cols-2 gap-4">
        <Card padding="md">
          <TodoList
            title="Pre-ride checklist"
            items={itemsA}
            onToggle={(id) => setItemsA((prev) => prev.map((i) => i.id === id ? { ...i, done: !i.done } : i))}
            onAdd={(text) => setItemsA((prev) => [...prev, { id: String(++nextId), text, done: false }])}
            onRemove={(id) => setItemsA((prev) => prev.filter((i) => i.id !== id))}
          />
        </Card>

        <Card padding="md">
          <TodoList
            title="Weekly goals"
            items={itemsB}
            showProgress
            onToggle={(id) => setItemsB((prev) => prev.map((i) => i.id === id ? { ...i, done: !i.done } : i))}
          />
        </Card>
      </div>
    </DemoSection>
  )
}

// ─── 50. Description list ───

function DescriptionListDemo() {
  return (
    <DemoSection title="Description list">
      <div className="flex flex-col gap-6">
        <DescriptionList
          title="Athlete profile"
          items={[
            { label: 'Full name', value: 'Malte Therkildsen' },
            { label: 'Email', value: 'malte@ramt.dev' },
            { label: 'FTP', value: '285 W' },
            { label: 'Weight', value: '73 kg' },
            { label: 'Primary sport', value: 'Cycling' },
            { label: 'Member since', value: 'March 2026' },
          ]}
        />

        <DescriptionList
          title="Thresholds"
          description="Current performance markers"
          columns={2}
          items={[
            { label: 'FTP', value: '285 W', action: <Button variant="ghost" size="sm">Update</Button> },
            { label: 'LTHR', value: '172 bpm', action: <Button variant="ghost" size="sm">Update</Button> },
            { label: 'Weight', value: '73 kg' },
            { label: 'Max HR', value: '195 bpm' },
          ]}
        />
      </div>
    </DemoSection>
  )
}

// ─── 51. Activity feed ───

function FeedDemo() {
  return (
    <DemoSection title="Activity feed">
      <Card padding="md">
        <Feed
          items={[
            {
              id: '1',
              type: 'event',
              icon: <ColorDot color="positive" size="sm" />,
              title: 'Session completed',
              description: 'Tempo ride — 1:28:40, 238W avg',
              timestamp: '2 hours ago',
            },
            {
              id: '2',
              type: 'event',
              icon: <ColorDot color="var(--warning)" size="sm" />,
              title: 'Signal triggered',
              description: 'Injury risk increased to 72',
              timestamp: '5 hours ago',
              action: <Button variant="ghost" size="sm">Review</Button>,
            },
            {
              id: '3',
              type: 'comment',
              author: 'Coach Nielsen',
              content: 'Great session! Consider adding more Z2 work next week to build aerobic base.',
              timestamp: 'Yesterday',
            },
            {
              id: '4',
              type: 'event',
              icon: <ColorDot color="info" size="sm" />,
              title: 'FTP updated',
              description: '280W → 285W based on 20-min test',
              timestamp: '2 days ago',
            },
            {
              id: '5',
              type: 'event',
              title: 'Account created',
              timestamp: '1 week ago',
            },
          ]}
        />
      </Card>
    </DemoSection>
  )
}

// ─── 52. Action panels ───

function ActionPanelDemo() {
  const [autoSync, setAutoSync] = useState(false)

  return (
    <DemoSection title="Action panels">
      <Card padding="md">
        <div className="flex flex-col gap-2">
          <ActionPanel
            description="Changes will take effect immediately."
            onSave={() => {}}
            onCancel={() => {}}
            saveLabel="Save changes"
          />

          <ActionPanel
            variant="well"
            danger
            onSave={() => {}}
            saveLabel="Delete account"
            onCancel={() => {}}
          >
            <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>
              This will permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </ActionPanel>

          <ActionPanel variant="toggle">
            <Switch checked={autoSync} onChange={setAutoSync} />
            <div>
              <p className={cn(FONT.body, 'text-[14px]', WEIGHT.book, 'text-[var(--n1150)]')}>Auto-sync sessions</p>
              <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]')}>Automatically import new sessions from Strava</p>
            </div>
          </ActionPanel>
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── 53. Grid list ───

function GridListDemo() {
  return (
    <DemoSection title="Grid list">
      <GridList
        columns={3}
        items={[
          { id: '1', title: 'Tempo ride — Mallorca', subtitle: '1:28:40 · 238W avg · 142bpm', meta: '2 days ago', badge: <Badge variant="outline">Z3</Badge> },
          { id: '2', title: 'Recovery spin', subtitle: '0:45:12 · 142W avg · 118bpm', meta: '3 days ago', badge: <Badge variant="outline">Z1</Badge> },
          { id: '3', title: 'Threshold intervals', subtitle: '1:12:00 · 272W avg · 165bpm', meta: '5 days ago', badge: <Badge variant="outline">Z4</Badge> },
          { id: '4', title: 'Long endurance', subtitle: '3:15:00 · 198W avg · 135bpm', meta: '1 week ago', badge: <Badge variant="outline">Z2</Badge> },
          { id: '5', title: 'VO2max repeats', subtitle: '0:58:30 · 310W avg · 178bpm', meta: '1 week ago', badge: <Badge variant="outline">Z5</Badge> },
          { id: '6', title: 'Sweet spot blocks', subtitle: '1:30:00 · 256W avg · 155bpm', meta: '2 weeks ago', badge: <Badge variant="outline">Z3</Badge> },
        ]}
      />
    </DemoSection>
  )
}

// ─── 54. Media objects ───

function MediaObjectDemo() {
  return (
    <DemoSection title="Media objects">
      <Card padding="md">
        <div className="flex flex-col gap-4">
          <MediaObject
            icon={
              <div className="flex items-center justify-center text-[var(--n600)] w-5 h-5">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12L8 4l4 8" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
            }
            title="Power zones updated"
            description="Based on your latest FTP test"
          />

          <MediaObject
            avatar=""
            title="Coach Nielsen"
            description="Left a comment on your session"
            timestamp="5 min ago"
          />

          <MediaObject
            avatar=""
            avatarSize="lg"
            title="Malte Therkildsen"
            description="malte@ramt.dev · Athlete"
            action={<Button variant="ghost" size="sm">Edit</Button>}
          />

          <MediaObject
            icon={<ColorDot color="positive" size="sm" />}
            title="Session synced successfully"
          />
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── 55. Form layout ───

function FormLayoutDemo() {
  const [name, setName] = useState('Malte Therkildsen')
  const [email, setEmail] = useState('malte@ramt.dev')
  const [weight, setWeight] = useState('73')
  const [sport, setSport] = useState('Cycling')

  return (
    <DemoSection title="Form layout">
      <Card padding="md">
        <FormLayout>
          <FormLayout.Section title="Profile" description="Basic information about you.">
            <FormLayout.Field label="Full name" required>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </FormLayout.Field>

            <FormLayout.Field label="Email" description="We'll never share your email.">
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormLayout.Field>

            <FormLayout.Field label="Weight" error="Must be between 40-150 kg">
              <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} unit="kg" />
            </FormLayout.Field>
          </FormLayout.Section>

          <FormLayout.Section title="Preferences">
            <FormLayout.Field label="Primary sport">
              <Select
                value={sport}
                onChange={setSport}
                options={[
                  { value: 'Cycling', label: 'Cycling' },
                  { value: 'Running', label: 'Running' },
                  { value: 'Triathlon', label: 'Triathlon' },
                  { value: 'Swimming', label: 'Swimming' },
                ]}
              />
            </FormLayout.Field>
          </FormLayout.Section>

          <ActionPanel
            onSave={() => {}}
            onCancel={() => {}}
            saveLabel="Save changes"
          />
        </FormLayout>
      </Card>
    </DemoSection>
  )
}

// ─── 56. Button groups ───

function ButtonGroupDemo() {
  return (
    <DemoSection title="Button groups">
      <div className="flex flex-col gap-4">
        <ButtonGroup>
          <ButtonGroup.Item>Save</ButtonGroup.Item>
          <ButtonGroup.Item>Save & close</ButtonGroup.Item>
        </ButtonGroup>

        <div>
          <ButtonGroup>
            <ButtonGroup.Item variant="primary">Save</ButtonGroup.Item>
            <ButtonGroup.Item>Cancel</ButtonGroup.Item>
          </ButtonGroup>
        </div>

        <div>
          <ButtonGroup size="sm">
            <ButtonGroup.Item>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7.5L5.5 3H11L8.5 7.5H11L5 12L6.5 7.5H3Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/></svg>
            </ButtonGroup.Item>
            <ButtonGroup.Item>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M11 7.5L8.5 3H3L5.5 7.5H3L9 12L7.5 7.5H11Z" stroke="currentColor" strokeWidth="1" strokeLinejoin="round"/></svg>
            </ButtonGroup.Item>
            <ButtonGroup.Item>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="4" stroke="currentColor" strokeWidth="1"/><path d="M7 5v4M5 7h4" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/></svg>
            </ButtonGroup.Item>
          </ButtonGroup>
        </div>
      </div>
    </DemoSection>
  )
}

// ─── 57. Auth layout ───

function AuthLayoutDemo() {
  return (
    <DemoSection title="Auth layout">
      <Card padding="none">
        <div className="h-[520px] overflow-hidden rounded-[12px]">
          <AuthLayout title="Sign in to RAMTT" subtitle="Welcome back">
            <FormLayout.Field label="Email">
              <Input type="email" placeholder="you@example.com" />
            </FormLayout.Field>
            <FormLayout.Field label="Password">
              <Input type="password" placeholder="Enter password" />
            </FormLayout.Field>
            <Button variant="primary" className="w-full">Sign in</Button>
            <AuthLayout.Divider />
            <Button variant="outline" className="w-full">Connect with Strava</Button>
            <AuthLayout.Footer>
              <span>Don&apos;t have an account? </span>
              <span className={cn(WEIGHT.strong, 'text-[var(--n1150)]')}>Sign up</span>
            </AuthLayout.Footer>
          </AuthLayout>
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── Link Group ───

function LinkGroupDemo() {
  return (
    <DemoSection title="Link groups">
      <div className="grid grid-cols-2 gap-8">
        <Card>
          <div className="flex gap-10">
            <LinkGroup
              title="Product"
              links={[
                { label: 'Claude', href: '#' },
                { label: 'Claude Code', href: '#' },
                { label: 'API', href: '#' },
                { label: 'Pricing', href: '#' },
              ]}
            />
            <LinkGroup
              title="Resources"
              links={[
                { label: 'Documentation', href: '#' },
                { label: 'Research', href: '#' },
                { label: 'Changelog', href: '#' },
              ]}
            />
            <LinkList
              links={[
                { label: 'Dashboard', href: '#', active: true },
                { label: 'Settings', href: '#' },
                { label: 'Team', href: '#' },
                { label: 'Billing', href: '#' },
              ]}
            />
          </div>
        </Card>
        <DarkSection className={cn(RADIUS.lg, 'p-3.5')}>
          <div className="flex gap-10">
            <LinkGroup
              dark
              title="Product"
              links={[
                { label: 'Claude', href: '#' },
                { label: 'Claude Code', href: '#' },
                { label: 'API', href: '#' },
                { label: 'Pricing', href: '#' },
              ]}
            />
            <LinkGroup
              dark
              title="Resources"
              links={[
                { label: 'Documentation', href: '#' },
                { label: 'Research', href: '#' },
                { label: 'Changelog', href: '#' },
              ]}
            />
            <LinkList
              dark
              links={[
                { label: 'Dashboard', href: '#', active: true },
                { label: 'Settings', href: '#' },
                { label: 'Team', href: '#' },
                { label: 'Billing', href: '#' },
              ]}
            />
          </div>
        </DarkSection>
      </div>
    </DemoSection>
  )
}

// ─── Dark Surface ───

function DarkSurfaceDemo() {
  return (
    <DemoSection title="Dark surface">
      <DarkSection className={cn(RADIUS.lg, 'p-6')}>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className={cn(WEIGHT.strong, 'text-[14px] text-[var(--dark-text)]')}>Dark surface tokens</span>
            <span className={cn(WEIGHT.normal, 'text-[13px] text-[var(--dark-muted)]')}>Uses --dark-bg &middot; --dark-text &middot; --dark-muted tokens</span>
          </div>
          <SocialIcons
            dark
            links={[
              { platform: 'github', href: '#' },
              { platform: 'x', href: '#' },
              { platform: 'linkedin', href: '#' },
              { platform: 'strava', href: '#' },
              { platform: 'youtube', href: '#' },
            ]}
          />
        </div>
      </DarkSection>
    </DemoSection>
  )
}

// ─── Footer ───

function FooterDemo() {
  return (
    <DemoSection title="Footer">
      <div className={cn(RADIUS.lg, 'overflow-hidden')}>
        <Footer
          columns={[
            {
              groups: [
                {
                  title: 'Product',
                  links: [
                    { label: 'Training', href: '#' },
                    { label: 'Nutrition', href: '#' },
                    { label: 'Race planning', href: '#' },
                    { label: 'Analytics', href: '#' },
                  ],
                },
                {
                  title: 'Plans',
                  links: [
                    { label: 'Free', href: '#' },
                    { label: 'Pro', href: '#' },
                    { label: 'Team', href: '#' },
                  ],
                },
              ],
            },
            {
              groups: [
                {
                  title: 'Resources',
                  links: [
                    { label: 'Documentation', href: '#' },
                    { label: 'Blog', href: '#' },
                    { label: 'Changelog', href: '#' },
                    { label: 'Support', href: '#' },
                  ],
                },
              ],
            },
            {
              groups: [
                {
                  title: 'Company',
                  links: [
                    { label: 'About', href: '#' },
                    { label: 'Careers', href: '#' },
                    { label: 'Contact', href: '#' },
                  ],
                },
              ],
            },
            {
              groups: [
                {
                  title: 'Legal',
                  links: [
                    { label: 'Privacy', href: '#' },
                    { label: 'Terms', href: '#' },
                    { label: 'Cookie policy', href: '#' },
                  ],
                },
              ],
            },
          ]}
          social={[
            { platform: 'linkedin', href: '#' },
            { platform: 'x', href: '#' },
            { platform: 'youtube', href: '#' },
            { platform: 'github', href: '#' },
            { platform: 'strava', href: '#' },
          ]}
        />
      </div>
    </DemoSection>
  )
}

// ─── Category Icons ───

function CategoryIconsDemo() {
  const categories: { key: CategoryType; label: string }[] = [
    { key: 'session', label: 'Session' },
    { key: 'plan', label: 'Plan' },
    { key: 'analysis', label: 'Analysis' },
    { key: 'nutrition', label: 'Nutrition' },
    { key: 'coaching', label: 'Coaching' },
  ]

  return (
    <DemoSection title="Category icons">
      <div className="flex flex-col gap-4">
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Small (16px) — for lists, search results</p>
          <div className="flex items-center gap-4">
            {categories.map((c) => (
              <div key={c.key} className="flex items-center gap-2">
                <CategoryIcon category={c.key} size="sm" />
                <span className={cn(FONT.body, WEIGHT.normal, 'text-[13px] text-[var(--n1150)]')}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Medium (20px) — for cards, headers</p>
          <div className="flex items-center gap-4">
            {categories.map((c) => (
              <div key={c.key} className="flex items-center gap-2">
                <CategoryIcon category={c.key} size="md" />
                <span className={cn(FONT.body, WEIGHT.normal, 'text-[13px] text-[var(--n1150)]')}>{c.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Color strip</p>
          <div className="flex gap-1.5">
            {categories.map((c) => (
              <div
                key={c.key}
                className="rounded-[4px] w-7 h-7"
                style={{ backgroundColor: CATEGORY_COLORS[c.key] }}
              />
            ))}
          </div>
        </div>
      </div>
    </DemoSection>
  )
}

// ─── Content Cards ───

function ContentCardsDemo() {
  const cards: { category: CategoryType; title: string; time: string }[] = [
    { category: 'session', title: 'MIT with spikes', time: 'Edited 2 hours ago' },
    { category: 'analysis', title: 'Week 14 summary', time: 'Edited 1 day ago' },
    { category: 'plan', title: 'Build phase — weeks 12-16', time: 'Edited 3 days ago' },
    { category: 'nutrition', title: 'Race day fueling', time: 'Edited 5 days ago' },
  ]

  return (
    <DemoSection title="Content cards">
      <div className="grid grid-cols-2 gap-4">
        {cards.map((card) => (
          <div
            key={card.title}
            className={cn(
              'bg-[var(--n50)] border-[0.5px] border-[var(--n400)]',
              RADIUS.lg,
              'overflow-hidden group',
              'transition-[border-color] duration-150',
              'hover:border-[var(--n600)]/50',
            )}
          >
            {/* Preview area */}
            <div className="bg-[var(--n200)] h-[120px]" />
            {/* Content */}
            <div className="px-3.5 py-3">
              <div className="flex items-center gap-1.5">
                <CategoryIcon category={card.category} size="sm" />
                <span className={cn(FONT.body, WEIGHT.strong, 'text-[13px] text-[var(--n1150)]')}>
                  {card.title}
                </span>
              </div>
              <p className={cn(FONT.body, WEIGHT.normal, 'text-[11px] text-[var(--n600)] mt-0.5')}>
                {card.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </DemoSection>
  )
}

// ─── Command Palette Demo ───

function CommandPaletteDemo() {
  const [open, setOpen] = useState(false)

  const groups = [
    {
      label: 'Recent',
      items: [
        { id: 'r1', label: 'Morning intervals', description: '2h ago', icon: <CategoryIcon category="session" size="sm" /> },
        { id: 'r2', label: 'Recovery ride', description: 'Yesterday', icon: <CategoryIcon category="session" size="sm" /> },
        { id: 'r3', label: 'Weekly summary', description: '3d ago', icon: <CategoryIcon category="analysis" size="sm" /> },
      ],
    },
    {
      label: 'Actions',
      items: [
        { id: 'a1', label: 'New session', shortcut: '\u2318N' },
        { id: 'a2', label: 'Import FIT file', shortcut: '\u2318I' },
        { id: 'a3', label: 'Settings', shortcut: '\u2318,' },
      ],
    },
  ]

  return (
    <DemoSection title="Command palette">
      <Button variant="outline" onClick={() => setOpen(true)}>
        Open command palette
      </Button>
      <CommandPalette
        open={open}
        onOpenChange={setOpen}
        groups={groups}
        onSelect={(item) => { setOpen(false); console.log('Selected:', item.label) }}
      />
    </DemoSection>
  )
}

// ─── Enhanced Dropdowns ───

function EnhancedDropdownsDemo() {
  const [zone, setZone] = useState('z3')
  const [integration, setIntegration] = useState('strava')
  const [selected, setSelected] = useState('metric1')

  return (
    <DemoSection title="Enhanced dropdowns">
      <div className="flex gap-6 flex-wrap">
        <div className="w-[200px]">
          <Select
            label="Selected indicator"
            value={selected}
            onChange={setSelected}
            options={[
              { value: 'metric1', label: 'Average power' },
              { value: 'metric2', label: 'Normalized power' },
              { value: 'metric3', label: 'Max power' },
              { value: 'metric4', label: 'Weighted avg' },
            ]}
          />
        </div>
        <div className="w-[200px]">
          <Select
            label="Zone selection"
            value={zone}
            onChange={setZone}
            options={[
              { value: 'z1', label: 'Zone 1 — Recovery', color: '#94a3b8' },
              { value: 'z2', label: 'Zone 2 — Endurance', color: '#22c55e' },
              { value: 'z3', label: 'Zone 3 — Tempo', color: '#eab308' },
              { value: 'z4', label: 'Zone 4 — Threshold', color: '#f97316' },
              { value: 'z5', label: 'Zone 5 — VO2max', color: '#ef4444' },
              { value: 'z6', label: 'Zone 6 — Anaerobic', color: '#dc2626' },
            ]}
          />
        </div>
        <div className="w-[220px]">
          <Select
            label="Integration"
            value={integration}
            onChange={setIntegration}
            options={[
              { value: 'strava', label: 'Strava', description: 'Connected' },
              { value: 'garmin', label: 'Garmin Connect', description: 'Not connected' },
              { value: 'whoop', label: 'WHOOP', description: 'Connected' },
            ]}
          />
        </div>
      </div>
    </DemoSection>
  )
}

// ─── Wave 12 — Claude-Inspired Components ───

function generateHeatmapData(): { date: string; value: number }[] {
  const data: { date: string; value: number }[] = []
  const now = new Date()
  for (let i = 0; i < 182; i++) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    const iso = d.toISOString().slice(0, 10)
    // Pseudo-random based on date string hash
    const hash = iso.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    const val = hash % 7 === 0 ? 0 : (hash % 5) + (hash % 3)
    data.push({ date: iso, value: val })
  }
  return data
}

const HEATMAP_DATA = generateHeatmapData()

function Wave12Demo() {
  const [searchOpen, setSearchOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [sidebarActive, setSidebarActive] = useState('Dashboard')

  return (
    <DemoSection title="Wave 12 — App Patterns">
      <div className="flex flex-col gap-8">

        {/* StatsGrid — RAMTT style with proper metrics strip */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>StatsGrid</p>
          <Card padding="none">
            <StatsGrid
              items={[
                { label: 'Weekly TSS', value: 680, unit: 'pts' },
                { label: 'CTL', value: 92 },
                { label: 'ATL', value: 114 },
                { label: 'Form', value: -22, unit: 'TSB' },
              ]}
            />
          </Card>
        </div>

        {/* ActivityHeatmap — accent color, clean */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>ActivityHeatmap</p>
          <Card>
            <ActivityHeatmap
              data={HEATMAP_DATA}
              weeks={26}
              showDayLabels
              showMonthLabels
              color="var(--accent)"
            />
          </Card>
        </div>

        {/* ProjectsGrid — this one is good */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>ProjectsGrid</p>
          <ProjectsGrid>
            <ProjectsGrid.Header title="Projects">
              <Button variant="outline" size="sm">New project</Button>
            </ProjectsGrid.Header>
            <ProjectsGrid.Body columns={3}>
              <ProjectsGrid.Item name="RAMTT" description="Sports nutrition + training platform for endurance athletes." timestamp="Updated 1 day ago" icon={<IconRunning size={18} />} />
              <ProjectsGrid.Item name="Coaching Dashboard" description="Real-time athlete monitoring and plan management." timestamp="Updated 3 days ago" icon={<IconTarget size={18} />} />
              <ProjectsGrid.Item name="Race Predictor" description="ML-based race time estimation from training data." timestamp="Updated 1 week ago" icon={<IconLineChart size={18} />} />
              <ProjectsGrid.Item name="Nutrition Engine" description="Macro timing and fuelling strategy calculator." timestamp="Updated 2 weeks ago" icon={<IconBanana size={18} />} />
              <ProjectsGrid.Item name="Recovery Tracker" description="HRV, sleep, and readiness scoring." timestamp="Updated 3 weeks ago" icon={<IconMoon size={18} />} />
              <ProjectsGrid.Item name="Design System" description="@ramtt/ui component library and tokens." timestamp="Updated today" icon={<IconPalette size={18} />} />
            </ProjectsGrid.Body>
          </ProjectsGrid>
        </div>

        {/* AppSidebar — rebuilt with proper RAMTT sidebar nav pattern */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>AppSidebar (collapsible)</p>
          <div className={cn(BORDER.default, RADIUS.lg, 'overflow-hidden h-[520px]')}>
            <div className="flex h-full">
              <AppSidebar collapsed={sidebarCollapsed}>
                <AppSidebar.Header>
                  <button
                    onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                    className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)]')}
                  >
                    RAMTT
                  </button>
                </AppSidebar.Header>
                <AppSidebar.Search onClick={() => setSearchOpen(true)} />
                <AppSidebar.Nav>
                  <AppSidebar.Section>
                    <AppSidebar.Item active={sidebarActive === 'Dashboard'} onClick={() => setSidebarActive('Dashboard')} icon={<IconHome size={18} />}>Dashboard</AppSidebar.Item>
                    <AppSidebar.Item active={sidebarActive === 'Calendar'} onClick={() => setSidebarActive('Calendar')} icon={<IconCalendar size={18} />}>Calendar</AppSidebar.Item>
                    <AppSidebar.Item active={sidebarActive === 'Analytics'} onClick={() => setSidebarActive('Analytics')} icon={<IconAnalytics size={18} />}>Analytics</AppSidebar.Item>
                    <AppSidebar.Item active={sidebarActive === 'Zones'} onClick={() => setSidebarActive('Zones')} icon={<IconZone size={18} />}>Zones & thresholds</AppSidebar.Item>
                    <AppSidebar.Item active={sidebarActive === 'Nutrition'} onClick={() => setSidebarActive('Nutrition')} icon={<IconApple size={18} />}>Nutrition</AppSidebar.Item>
                    <AppSidebar.Item active={sidebarActive === 'Settings'} onClick={() => setSidebarActive('Settings')} icon={<IconSettings size={18} />}>Settings</AppSidebar.Item>
                  </AppSidebar.Section>
                  <AppSidebar.Separator />
                  <AppSidebar.Section label="Recent">
                    <AppSidebar.Scroll>
                      <AppSidebar.Item onClick={() => setSidebarActive('ride')}>Morning ride — Z2 endurance</AppSidebar.Item>
                      <AppSidebar.Item onClick={() => setSidebarActive('ftp')}>FTP test protocol</AppSidebar.Item>
                      <AppSidebar.Item onClick={() => setSidebarActive('plan')}>Race nutrition plan</AppSidebar.Item>
                      <AppSidebar.Item onClick={() => setSidebarActive('recovery')}>Recovery week review</AppSidebar.Item>
                    </AppSidebar.Scroll>
                  </AppSidebar.Section>
                </AppSidebar.Nav>
                <AppSidebar.Footer name="Malte T." onSettingsClick={() => setSidebarActive('Settings')} />
              </AppSidebar>
              <div className="flex-1 flex items-center justify-center bg-[var(--bg)]">
                <span className={cn(MUTED_STYLE, 'text-[12px]')}>
                  {sidebarActive}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* QuickSearch (modal) */}
        <div>
          <p className={cn(LABEL_STYLE, 'mb-2')}>QuickSearch</p>
          <Button variant="outline" size="sm" onClick={() => setSearchOpen(true)}>Open search (⌘K)</Button>
          <QuickSearch
            open={searchOpen}
            onOpenChange={setSearchOpen}
            placeholder="Search projects, chats, tasks..."
            groups={[
              {
                label: 'Projects',
                items: [
                  { id: '1', type: 'project', title: 'RAMTT', metadata: 'Updated today' },
                  { id: '2', type: 'project', title: 'Coaching Dashboard', metadata: '3 days ago' },
                  { id: '3', type: 'project', title: 'Race Predictor', metadata: '1 week ago' },
                ],
              },
              {
                label: 'Conversations',
                items: [
                  { id: '4', type: 'chat', title: 'Training plan review' },
                  { id: '5', type: 'chat', title: 'FTP test analysis' },
                  { id: '6', type: 'chat', title: 'Zone 2 guidance' },
                ],
              },
              {
                label: 'Tasks',
                items: [
                  { id: '7', type: 'task', title: 'Build nutrition engine' },
                  { id: '8', type: 'task', title: 'Calibrate HR zones' },
                ],
              },
            ]}
            onSelect={(item) => { setSearchOpen(false); console.log('Selected:', item) }}
          />
        </div>

      </div>
    </DemoSection>
  )
}

// ─── Editor Shell ───

function EditorShellDemo() {
  const [activeTab, setActiveTab] = useState('layers')
  const [panelOpen, setPanelOpen] = useState(true)
  const [rightTab, setRightTab] = useState('design')
  const [activeTool, setActiveTool] = useState('frame')
  const [floatingOpen, setFloatingOpen] = useState(false)

  const tabs = [
    {
      id: 'layers',
      label: 'Layers',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M10 3L3 7l7 4 7-4-7-4z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M3 10l7 4 7-4" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
          <path d="M3 13l7 4 7-4" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      id: 'assets',
      label: 'Assets',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <rect x="3" y="3" width="14" height="14" rx="2" stroke="currentColor" strokeWidth="1.25" />
          <path d="M10 7v6M7 10h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'find',
      label: 'Find',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="9" cy="9" r="5" stroke="currentColor" strokeWidth="1.25" />
          <path d="M13 13l3.5 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      id: 'vars',
      label: 'Vars',
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M5 5h10M5 10h10M5 15h6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
        </svg>
      ),
    },
  ]

  const toolGroups = [
    {
      items: [
        {
          id: 'move',
          label: 'Move',
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L13 3M13 3H7M13 3v6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          ),
        },
        {
          id: 'frame',
          label: 'Frame',
          active: activeTool === 'frame',
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="3" y="3" width="10" height="10" rx="1" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          ),
        },
      ],
    },
    {
      items: [
        {
          id: 'rect',
          label: 'Rectangle',
          hasDropdown: true,
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          ),
        },
        {
          id: 'pen',
          label: 'Pen',
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 13L11 3l2 2-8 10-3 1 1-3z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
            </svg>
          ),
        },
        {
          id: 'text',
          label: 'Text',
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 4h8M8 4v9M6 13h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
          ),
        },
      ],
    },
    {
      items: [
        {
          id: 'hand',
          label: 'Hand',
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M8 2v8M5 5v5a3 3 0 006 0V5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
            </svg>
          ),
        },
        {
          id: 'comment',
          label: 'Comment',
          icon: (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M3 4a1 1 0 011-1h8a1 1 0 011 1v6a1 1 0 01-1 1H7l-3 2v-2H4a1 1 0 01-1-1V4z" stroke="currentColor" strokeWidth="1.25" />
            </svg>
          ),
        },
      ],
    },
  ]

  const pages = ['Home', 'Dashboard', 'Profile', 'Settings']

  return (
    <DemoSection title="Editor shell">
      <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>
        Mini editor layout: icon tab bar, expandable panel, opacity tabs, floating toolbar + panel
      </p>
      <Card padding="none">
        <div className="relative overflow-hidden h-[420px]">
          <div className="flex h-full">
            {/* Left icon tab bar */}
            <div className="shrink-0 bg-[var(--n50)] border-r-[0.5px] border-r-[var(--n400)] py-1 px-0.5">
              <IconTabBar tabs={tabs} activeTab={activeTab} onTabChange={(id) => { setActiveTab(id); setPanelOpen(true) }} />
            </div>

            {/* Left panel */}
            <PanelSidebar
              side="left"
              open={panelOpen}
              header={
                <SectionHeader action={
                  <button
                    onClick={() => setPanelOpen(false)}
                    className={cn('flex items-center justify-center w-5 h-5 rounded-[5px] text-[var(--n600)] hover:text-[var(--n1150)] hover:bg-[var(--n200)]')}
                  >
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none"><path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                  </button>
                }>
                  {activeTab === 'layers' ? 'Layers' : activeTab === 'assets' ? 'Assets' : activeTab === 'find' ? 'Find' : 'Variables'}
                </SectionHeader>
              }
            >
              <div className="p-2 flex flex-col gap-0.5">
                {activeTab === 'layers' && pages.map((page, i) => (
                  <button
                    key={page}
                    className={cn(
                      'w-full text-left px-2 py-1.5 rounded-[5px] text-[11px]',
                      TRANSITION.background,
                      i === 0 && 'bg-[var(--n200)]',
                      i === 0 ? WEIGHT.strong : '',
                      i === 0 ? 'text-[var(--n1150)]' : 'text-[var(--n800)] hover:bg-[var(--n200)]',
                    )}
                  >
                    {page}
                  </button>
                ))}
                {activeTab === 'find' && (
                  <div className="px-1">
                    <Input placeholder="Search layers..." />
                  </div>
                )}
                {activeTab !== 'layers' && activeTab !== 'find' && (
                  <div className="px-2 py-4">
                    <p className={cn(MUTED_STYLE, 'text-[11px]')}>Panel content for {activeTab}</p>
                  </div>
                )}
              </div>
            </PanelSidebar>

            {/* Canvas area */}
            <div className="flex-1 bg-[var(--bg)] flex items-center justify-center relative">
              <p className={cn(MUTED_STYLE, 'text-[11px]')}>Canvas area</p>
            </div>

            {/* Right panel */}
            <div className="shrink-0 w-[220px] bg-[var(--n50)] border-l-[0.5px] border-l-[var(--n400)] flex flex-col">
              <div className="px-3 py-2 border-b-[0.5px] border-b-[var(--n200)]">
                <ToggleGroup
                  variant="opacity"
                  value={rightTab}
                  onChange={(v) => setRightTab(v as string)}
                  options={['Design', 'Prototype']}
                  size="sm"
                />
              </div>
              <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-3">
                <SectionHeader divider>Alignment</SectionHeader>
                <div className="flex gap-2">
                  {['L', 'C', 'R', 'T', 'M', 'B'].map(a => (
                    <div key={a} className="w-7 h-7 rounded-[5px] border-[0.5px] border-[var(--n400)] flex items-center justify-center text-[10px] text-[var(--n600)]">
                      {a}
                    </div>
                  ))}
                </div>
                <SectionHeader divider>Fill</SectionHeader>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-[4px] border-[0.5px] border-[var(--n400)]" style={{ background: '#4C7FF7' }} />
                  <span className={cn(FONT.body, 'text-[11px] text-[var(--n1150)]')}>4C7FF7</span>
                  <span className={cn(FONT.body, 'text-[11px] text-[var(--n600)]')}>100%</span>
                </div>
                <SectionHeader divider>Stroke</SectionHeader>
                <p className={cn(MUTED_STYLE, 'text-[11px]')}>No stroke</p>
                <SectionHeader divider>Export</SectionHeader>
                <Button size="sm" variant="outline">Add export</Button>
              </div>
            </div>
          </div>

          {/* Floating toolbar */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10">
            <FloatingToolbar
              groups={toolGroups}
              onItemClick={(id) => setActiveTool(id)}
            />
          </div>

          {/* Floating panel trigger + panel */}
          {floatingOpen && (
            <div className="absolute top-12 left-[120px] z-20">
              <FloatingPanel
                open={floatingOpen}
                onClose={() => setFloatingOpen(false)}
                title="Variables"
                width={360}
                maxHeight={280}
              >
                <div className="p-4 flex flex-col gap-3">
                  <SectionHeader divider>Color tokens</SectionHeader>
                  {['--n50', '--n200', '--n400', '--n600', '--n800', '--n1150'].map(tok => (
                    <div key={tok} className="flex items-center justify-between px-1">
                      <span className={cn(FONT.body, 'text-[11px] text-[var(--n1150)]')}>{tok}</span>
                      <div className="w-4 h-4 rounded-[4px] border-[0.5px] border-[var(--n400)]" style={{ background: `var(${tok})` }} />
                    </div>
                  ))}
                </div>
              </FloatingPanel>
            </div>
          )}
        </div>

        {/* Controls below the mini editor */}
        <div className="px-4 py-3 border-t-[0.5px] border-t-[var(--n400)] flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setPanelOpen(!panelOpen)}>
            {panelOpen ? 'Close panel' : 'Open panel'}
          </Button>
          <Button size="sm" variant="outline" onClick={() => setFloatingOpen(!floatingOpen)}>
            {floatingOpen ? 'Close floating panel' : 'Open floating panel'}
          </Button>
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── Floating Panels ───

function FloatingPanelsDemo() {
  const [panel1, setPanel1] = useState(true)
  const [panel2, setPanel2] = useState(true)

  return (
    <DemoSection title="Floating panels">
      <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>
        Draggable panels with NO backdrop dimming. Content behind stays visible and interactive.
      </p>
      <Card padding="none">
        <div className="relative p-6 min-h-[360px]">
          {/* Background content proving no dimming */}
          <div className="flex flex-col gap-2 opacity-50">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-4 bg-[var(--n200)] rounded-[4px]" style={{ width: `${60 + (i * 7) % 30}%` }} />
            ))}
          </div>

          {/* Panel 1 — basic */}
          {panel1 && (
            <div className="absolute top-4 left-4">
              <FloatingPanel open={panel1} onClose={() => setPanel1(false)} title="Quick actions" width={300} maxHeight={240}>
                <div className="p-3 flex flex-col gap-1">
                  {['Create frame', 'Add component', 'Run plugin', 'Open library'].map(action => (
                    <button
                      key={action}
                      className={cn(
                        'w-full text-left px-2.5 py-1.5 rounded-[5px] text-[11px] text-[var(--n1150)]',
                        TRANSITION.background,
                        'hover:bg-[var(--n200)]',
                      )}
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </FloatingPanel>
            </div>
          )}

          {/* Panel 2 — with sidebar nav */}
          {panel2 && (
            <div className="absolute top-4 right-4">
              <FloatingPanel open={panel2} onClose={() => setPanel2(false)} title="Manage libraries" width={380} maxHeight={280}>
                <div className="flex h-full">
                  <div className="w-[100px] shrink-0 border-r-[0.5px] border-r-[var(--n200)] py-2 px-1.5 flex flex-col gap-0.5">
                    {['This file', 'Team', 'UI kits'].map((item, i) => (
                      <button
                        key={item}
                        className={cn(
                          'w-full text-left px-2 py-1 rounded-[5px] text-[10px]',
                          i === 0 && 'bg-[var(--n200)]',
                          i === 0 ? WEIGHT.strong : '',
                          i === 0 ? 'text-[var(--n1150)]' : 'text-[var(--n600)] hover:bg-[var(--n200)]',
                        )}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="flex-1 p-3">
                    <p className={cn(MUTED_STYLE, 'text-[11px]')}>Library content</p>
                  </div>
                </div>
              </FloatingPanel>
            </div>
          )}
        </div>
        <div className="px-4 py-3 border-t-[0.5px] border-t-[var(--n400)] flex gap-2">
          <Button size="sm" variant="outline" onClick={() => { setPanel1(true); setPanel2(true) }}>
            Reset panels
          </Button>
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── Property Inspector ───

function PropertyInspectorDemo() {
  const [clip, setClip] = useState(false)
  const [autoLayout, setAutoLayout] = useState(true)

  return (
    <DemoSection title="Property inspector">
      <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>
        Dense property rows: color swatches, hex inputs, percentage fields, small toggles
      </p>
      <Card>
        <div className="max-w-[280px] flex flex-col gap-3">
          <SectionHeader divider>Fill</SectionHeader>
          {/* Color swatch + hex row */}
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-[4px] border-[0.5px] border-[var(--n400)]" style={{ background: '#4C7FF7' }} />
            <Input defaultValue="4C7FF7" className="flex-1" />
            <Input defaultValue="100" unit="%" className="w-[60px]" />
          </div>

          <SectionHeader divider>Stroke</SectionHeader>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-[4px] border-[0.5px] border-[var(--n400)]" style={{ background: 'var(--n1150)' }} />
            <Input defaultValue="131211" className="flex-1" />
            <Input defaultValue="1" unit="px" className="w-[60px]" />
          </div>

          <SectionHeader divider>Layout</SectionHeader>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label>X</Label>
              <Input defaultValue="120" unit="px" />
            </div>
            <div>
              <Label>Y</Label>
              <Input defaultValue="84" unit="px" />
            </div>
            <div>
              <Label>W</Label>
              <Input defaultValue="240" unit="px" />
            </div>
            <div>
              <Label>H</Label>
              <Input defaultValue="160" unit="px" />
            </div>
          </div>

          <SectionHeader divider>Options</SectionHeader>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className={cn(FONT.body, 'text-[11px] text-[var(--n800)]')}>Clip content</span>
              <Switch checked={clip} onChange={setClip} />
            </div>
            <div className="flex items-center justify-between">
              <span className={cn(FONT.body, 'text-[11px] text-[var(--n800)]')}>Auto layout</span>
              <Switch checked={autoLayout} onChange={setAutoLayout} />
            </div>
          </div>

          <SectionHeader divider>Corner radius</SectionHeader>
          <Input defaultValue="12" unit="px" />
        </div>
      </Card>
    </DemoSection>
  )
}

// ─── Domain Colors ───

const DOMAIN_TOKEN_KEYS = [
  'pressed', 'hover', '', 'toggle', 'text', 'icon',
  'icon-light', 'icon-lightest', 'border', 'selection',
  'wash', 'badge', 'soft', 'light',
] as const

function DomainColorsDemo() {
  const domains: { key: DomainKey; sample: string; unit: string }[] = [
    { key: 'nutrition', sample: '62g', unit: 'CHO' },
    { key: 'training', sample: '285W', unit: 'FTP' },
    { key: 'body', sample: '52ms', unit: 'HRV' },
  ]

  return (
    <DemoSection title="Domain Colors">
      {/* Domain pills */}
      <div className="flex flex-col gap-6">
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Domain badges</p>
          <div className="flex items-center gap-2">
            {domains.map(d => (
              <Badge key={d.key} color={d.key}>{DOMAIN[d.key].label}</Badge>
            ))}
            {domains.map(d => (
              <Badge key={d.key + '-o'} variant="outline" color={d.key}>{DOMAIN[d.key].label}</Badge>
            ))}
          </div>
        </div>

        {/* Badges with values */}
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Domain badges with values</p>
          <div className="flex items-center gap-2">
            {domains.map(d => (
              <Badge key={d.key} color={d.key}>{d.sample} {d.unit}</Badge>
            ))}
          </div>
        </div>

        {/* Domain cards with left border */}
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Domain cards (left-border + wash)</p>
          <div className="grid grid-cols-3 gap-4">
            {domains.map(d => (
              <div
                key={d.key}
                className={cn('px-3.5 py-2.5 rounded-r-[4px] rounded-l-none')}
                style={{
                  borderLeft: `3px solid var(--domain-${d.key})`,
                  backgroundColor: `var(--domain-${d.key}-wash)`,
                }}
              >
                <div className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
                  {DOMAIN[d.key].label}
                </div>
                <div className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n800)] mt-0.5')}>
                  {d.sample} {d.unit}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Domain progress bars */}
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Domain progress bars</p>
          <Card>
            <div className="flex flex-col gap-3">
              <ProgressBar value={78} max={100} color="nutrition" label="78% CHO target" />
              <ProgressBar value={62} max={100} color="training" label="62% FTP progress" />
              <ProgressBar value={45} max={100} color="body" label="45% HRV recovery" />
            </div>
          </Card>
        </div>

        {/* Domain status indicators */}
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Domain status indicators</p>
          <div className="flex items-center gap-6">
            <StatusIndicator status="nutrition" label="Nutrition" size="sm" />
            <StatusIndicator status="training" label="Training" size="sm" />
            <StatusIndicator status="body" label="Body" size="sm" />
          </div>
          <div className="flex items-start gap-4 mt-3">
            <StatusIndicator status="nutrition" label="Fuelling" value="On target" size="md" />
            <StatusIndicator status="training" label="Load" value="Optimal" size="md" />
            <StatusIndicator status="body" label="Recovery" value="Good" size="md" />
          </div>
          <div className="flex items-start gap-4 mt-3">
            <StatusIndicator status="nutrition" label="CHO intake" value="192g of 200g" size="lg" appearance="edge-left" />
            <StatusIndicator status="training" label="Weekly TSS" value="680 / 750" size="lg" appearance="edge-left" />
            <StatusIndicator status="body" label="HRV trend" value="+4ms this week" size="lg" appearance="edge-left" />
          </div>
        </div>

        {/* Accent ramp strips */}
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>Domain token ramps (14 tokens each)</p>
          <div className="flex flex-col gap-3">
            {(Object.keys(DOMAIN) as DomainKey[]).map(key => (
              <div key={key}>
                <p className={cn(FONT.body, 'text-[11px]', WEIGHT.book, 'text-[var(--n800)] mb-1')}>
                  {DOMAIN[key].label} — {DOMAIN[key].color}
                </p>
                <div className="flex h-8 overflow-hidden rounded-[4px]">
                  {DOMAIN_TOKEN_KEYS.map(suffix => {
                    const varName = suffix ? `--domain-${key}-${suffix}` : `--domain-${key}`
                    return (
                      <div
                        key={varName}
                        className="flex-1"
                        style={{ backgroundColor: `var(${varName})` }}
                        title={varName}
                      />
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DemoSection>
  )
}

// ─── Sidebar Navigation (Accent Demo Pattern) ───

const SIDEBAR_NAV_ITEMS: { label: string; icon: React.ComponentType<{ size?: number; className?: string }> }[] = [
  { label: 'Integrations', icon: IconLink },
  { label: 'Zones & thresholds', icon: IconZone },
  { label: 'Gut training', icon: IconGut },
  { label: 'Dietary & allergens', icon: IconApple },
  { label: 'Coach permissions', icon: IconUserCheck },
  { label: 'Appearance', icon: IconSun },
  { label: 'Notifications', icon: IconNotification },
  { label: 'Email preferences', icon: IconMail },
  { label: 'Shortcuts', icon: IconGrid },
  { label: 'General', icon: IconSettings },
  { label: 'Beta features', icon: IconFlag },
  { label: 'Support & feedback', icon: IconMessageCircle },
  { label: 'What\'s new', icon: IconStar },
  { label: 'Connected apps data', icon: IconCloud },
  { label: 'Data & privacy', icon: IconLock },
  { label: 'Advanced', icon: IconCode },
  { label: 'Account', icon: IconUser },
]

function SidebarNavDemo() {
  const [active, setActive] = useState('Integrations')

  return (
    <DemoSection title="Sidebar Navigation">
      <div className="flex gap-6">
        {/* Sidebar — exact accent-demo pattern */}
        <div className={cn('flex w-[280px] shrink-0 flex-col gap-0.5 py-5 pr-3 pl-4', BORDER.default, RADIUS.lg, 'bg-[var(--n50)]')}>
          <span className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)] mb-3')}>
            Settings
          </span>
          {SIDEBAR_NAV_ITEMS.map(({ label, icon: Icon }) => {
            const isActive = label === active
            return (
              <button
                key={label}
                onClick={() => setActive(label)}
                className={cn(
                  FONT.body, 'text-[11px]',
                  'flex items-center gap-3.5 px-3 py-2 text-left',
                  'rounded-[6px]',
                  TRANSITION.colors,
                  WEIGHT.book,
                  'text-[var(--n1150)]',
                  isActive && 'bg-[var(--accent-soft)]',
                  !isActive && 'hover:bg-[var(--n200)]',
                )}
              >
                <span className="shrink-0">
                  <Icon size={18} />
                </span>
                {label}
              </button>
            )
          })}
        </div>

        {/* Specs panel */}
        <div className="flex-1 flex flex-col gap-4 py-5">
          <div>
            <p className={cn(LABEL_STYLE, 'mb-2')}>Pattern specs</p>
            <div className="flex flex-col gap-1">
              {[
                ['Icons', 'Light variant, 18px, stroke-width 1.25'],
                ['Icon-to-text gap', '14px (gap-3.5)'],
                ['Text', 'Satoshi 11px, weight 450, var(--n1150)'],
                ['Item padding', 'px-3 py-2, rounded 6px'],
                ['Active state', 'var(--accent-soft) background (~12% opacity)'],
                ['Hover state', 'var(--n200) background'],
                ['Sidebar width', '280px'],
              ].map(([label, value]) => (
                <div key={label} className="flex items-baseline gap-2">
                  <span className={cn(FONT.body, 'text-[11px]', WEIGHT.medium, 'text-[var(--n1150)] shrink-0 w-[120px]')}>{label}</span>
                  <span className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n800)]')}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className={cn(LABEL_STYLE, 'mb-2')}>Active item: {active}</p>
            <p className={cn(FONT.body, 'text-[12px]', WEIGHT.normal, 'text-[var(--n800)]')}>
              Click any item to see the accent-wash active state.
              The sidebar uses NAV_ITEM_STYLE constants from lib/ui.ts.
            </p>
          </div>
        </div>
      </div>
    </DemoSection>
  )
}

// ─── Filter Pills with Icons ───

function FilterPillsDemo() {
  const [filter, setFilter] = useState('all')

  return (
    <DemoSection title="Filter pills with icons">
      <div className="flex flex-col gap-4">
        <div>
          <p className={cn(MUTED_STYLE, 'text-[12px] mb-2')}>With icons and dropdown chevron</p>
          <ToggleGroup
            variant="pill"
            value={filter}
            onChange={(v) => setFilter(v as string)}
            options={[
              {
                value: 'all',
                label: 'All',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25" />
                    <rect x="9" y="2" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25" />
                    <rect x="2" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25" />
                    <rect x="9" y="9" width="5" height="5" rx="1" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                ),
              },
              {
                value: 'sessions',
                label: 'Sessions',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M9 2L5 8h3.5L7 14l5-7H8.5L9 2z" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
                  </svg>
                ),
              },
              {
                value: 'plans',
                label: 'Plans',
                icon: (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="2.5" y="2.5" width="11" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.25" />
                    <path d="M2.5 6H13.5" stroke="currentColor" strokeWidth="1.25" />
                    <path d="M6 6V13.5" stroke="currentColor" strokeWidth="1.25" />
                  </svg>
                ),
              },
              {
                value: 'type',
                label: 'Type',
                hasDropdown: true,
              },
            ]}
          />
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
    <ToastProvider>
      <main className="min-h-screen bg-[var(--bg)]" style={{
        '--accent': '#7888FF',
        '--accent-pressed': '#282293',
        '--accent-hover': '#4A53C4',
        '--accent-toggle': '#7888FF',
        '--accent-text': '#323882',
        '--accent-icon': '#7888FF',
        '--accent-icon-light': '#A1ABDB',
        '--accent-icon-lightest': '#C7CDE5',
        '--accent-border': '#D3D7E6',
        '--accent-selection': '#C8CDDF',
        '--accent-wash': '#F0F1F7',
        '--accent-badge': '#F4F5F7',
        '--accent-soft': '#7888FF20',
        '--accent-light': '#7888FF30',
      } as React.CSSProperties}>
        <div className={cn(LAYOUT.maxWidth, 'mx-auto', LAYOUT.pagePadding, 'py-12')}>
          {/* Header */}
          <header className="mb-10">
            <h1 className={cn(FONT.label, WEIGHT.medium, 'text-[20px] text-[var(--n1150)] tracking-normal normal-case')}>
              @ramtt/ui
            </h1>
            <p className={cn(MUTED_STYLE, 'text-[13px] leading-relaxed mt-1.5 max-w-[560px]')}>
              106 components. Zero dependencies. Satoshi for everything — labels, numbers, body text.
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
            <StatusIndicatorsDemo />
            <SegmentedBarDemo />
            <NumberStepperDemo />
            <HexSwatchDemo />
            <RatingTimeDemo />
            <StepFlowDemo />
            <WidgetSystemDemo />
            <StatComparisonDemo />
            <TimelineRangeDemo />
            <FormNotificationDemo />
            <ChartCardDemo />
            <LeaderboardDemo />
            <MemberListDemo />
            <InviteCardDemo />
            <OnboardingDemo />
            <NotificationPreferencesDemo />
            <HelpSectionDemo />
            <FieldMappingDemo />
            <TodoListDemo />
            <DescriptionListDemo />
            <FeedDemo />
            <ActionPanelDemo />
            <GridListDemo />
            <MediaObjectDemo />
            <FormLayoutDemo />
            <ButtonGroupDemo />
            <AuthLayoutDemo />
            <LinkGroupDemo />
            <DarkSurfaceDemo />
            <FooterDemo />
            <DomainColorsDemo />
            <SidebarNavDemo />
            <CategoryIconsDemo />
            <ContentCardsDemo />
            <CommandPaletteDemo />
            <EnhancedDropdownsDemo />
            <FilterPillsDemo />
            <Wave12Demo />
            <EditorShellDemo />
            <FloatingPanelsDemo />
            <PropertyInspectorDemo />
          </div>
        </div>
      </main>
    </ToastProvider>
  )
}
