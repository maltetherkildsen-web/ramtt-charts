// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { useParams } from 'next/navigation'
import { cn, FONT } from '@/lib/ui'
import { getComponentDoc } from '@/lib/docs/registry'
import { DocPreview } from '@/components/docs/DocPreview'
import { DocCode } from '@/components/docs/DocCode'
import { DocSection } from '@/components/docs/DocSection'
import { DocPropTable } from '@/components/docs/DocPropTable'
import Link from 'next/link'

// ─── Live Component Imports ───
import {
  Button, Badge, ToggleGroup, Card, DataRow, DataTable,
  Input, Select, MetricCard, SettingsCard, ProgressBar, SectionHeader,
  Modal, Dropdown, Tabs, Skeleton, Switch,
  Tooltip, Accordion, Slider, Avatar, EmptyState, Breadcrumb,
  PageHeader, Textarea, Checkbox, Radio, FileUpload, Tag, Gauge,
  Calendar, Pagination, Spinner, Kbd, Alert,
  Separator, Label, Collapsible, ScrollArea,
  ColorDot, StatusIndicator, SegmentedBar, NumberStepper,
  RatingInput, StepFlow,
  WidgetCard,
  Stat, ComparisonCard, FormField, NotificationBadge,
  ChartCard, Leaderboard,
  TodoList, HelpSection,
  DescriptionList, Feed, ActionPanel, GridList, MediaObject, ButtonGroup,
} from '@/components/ui'
import { useState } from 'react'

// ─── Preview components for each slug ───

function ButtonPreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button size="sm">Small</Button>
      <Button size="lg">Large</Button>
      <Button disabled>Disabled</Button>
    </div>
  )
}

function BadgePreview() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>Default</Badge>
      <Badge color="positive">Positive</Badge>
      <Badge color="negative">Negative</Badge>
      <Badge color="warning">Warning</Badge>
      <Badge color="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="outline" color="positive">Outline positive</Badge>
    </div>
  )
}

function ToggleGroupPreview() {
  const [val, setVal] = useState('7d')
  const [pillVal, setPillVal] = useState('a')
  return (
    <div className="flex flex-col gap-4">
      <ToggleGroup options={['7d', '30d', '90d']} value={val} onChange={(v) => setVal(v as string)} size="sm" />
      <ToggleGroup variant="pill" options={[{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }, { value: 'c', label: 'Gamma' }]} value={pillVal} onChange={(v) => setPillVal(v as string)} />
      <ToggleGroup variant="underline" options={['Overview', 'Details', 'Settings']} value="Overview" onChange={() => {}} />
    </div>
  )
}

function CardPreview() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[320px]">
      <Card>
        <Card.Header><Card.Title>Card title</Card.Title></Card.Header>
        <Card.Body>
          <p className={cn(FONT.body, 'text-[13px] text-[var(--n800)]')}>Card body content goes here.</p>
        </Card.Body>
      </Card>
    </div>
  )
}

function DataRowPreview() {
  return (
    <div className="flex flex-col gap-1 w-full max-w-[320px]">
      <DataRow label="Power" value={285} unit="W" />
      <DataRow label="Heart rate" value={162} unit="BPM" />
      <DataRow label="Change" value="+12%" delta="+12%" deltaColor="positive" />
    </div>
  )
}

function DataTablePreview() {
  return (
    <DataTable
      columns={[
        { key: 'metric', label: 'Metric' },
        { key: 'value', label: 'Value', align: 'right' as const },
      ]}
      data={[
        { metric: 'FTP', value: '285 W' },
        { metric: 'Max HR', value: '192 BPM' },
        { metric: 'Weight', value: '72 kg' },
      ]}
    />
  )
}

function InputPreview() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[280px]">
      <Input placeholder="Enter value" />
      <Input label="FTP" unit="W" type="number" />
    </div>
  )
}

function SelectPreview() {
  const [val, setVal] = useState('ramtt')
  return (
    <div className="w-full max-w-[240px]">
      <Select
        label="Zone model"
        options={[{ value: 'coggan', label: 'Coggan' }, { value: 'ramtt', label: 'RAMTT' }]}
        value={val}
        onChange={setVal}
      />
    </div>
  )
}

function MetricCardPreview() {
  return (
    <div className="flex flex-wrap gap-3">
      <MetricCard label="Avg power" value={245} unit="W" />
      <MetricCard label="TSS" value={312} subtitle="+8%" subtitleColor="positive" />
    </div>
  )
}

function SettingsCardPreview() {
  return (
    <div className="w-full max-w-[320px]">
      <SettingsCard title="Notifications" description="Configure email and push alerts" />
    </div>
  )
}

function ProgressBarPreview() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-[320px]">
      <ProgressBar value={73} max={100} />
      <ProgressBar value={45} max={100} color="positive" label="Compliance" />
      <ProgressBar value={90} max={100} color="negative" label="Load" />
    </div>
  )
}

function SectionHeaderPreview() {
  return (
    <div className="w-full max-w-[400px]">
      <SectionHeader>Performance metrics</SectionHeader>
    </div>
  )
}

function SkeletonPreview() {
  return (
    <div className="flex flex-col gap-2 w-full max-w-[300px]">
      <Skeleton width={200} height={20} />
      <Skeleton width="100%" height={16} />
      <Skeleton width="80%" height={16} />
      <div className="flex gap-2 mt-2">
        <Skeleton width={40} height={40} radius="full" />
        <div className="flex flex-col gap-2 flex-1">
          <Skeleton width="60%" height={14} />
          <Skeleton width="40%" height={14} />
        </div>
      </div>
    </div>
  )
}

function SwitchPreview() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  return (
    <div className="flex flex-col gap-3">
      <Switch checked={a} onChange={setA} label="Notifications" />
      <Switch checked={b} onChange={setB} label="Dark mode" description="Use dark theme" />
    </div>
  )
}

function TooltipPreview() {
  return (
    <div className="flex gap-3">
      <Tooltip content="Save changes"><Button>Hover me</Button></Tooltip>
    </div>
  )
}

function SliderPreview() {
  const [val, setVal] = useState(70)
  return (
    <div className="w-full max-w-[320px]">
      <Slider value={val} onChange={setVal} min={0} max={100} label="Intensity" unit="%" />
    </div>
  )
}

function AvatarPreview() {
  return (
    <div className="flex gap-3 items-center">
      <Avatar name="Malte T" size="sm" />
      <Avatar name="Malte T" size="md" />
      <Avatar name="Malte T" size="lg" />
      <Avatar name="Ruth K" size="md" status="online" />
    </div>
  )
}

function EmptyStatePreview() {
  return (
    <EmptyState
      title="No sessions"
      description="Upload a FIT file to get started."
      action={<Button size="sm">Upload</Button>}
    />
  )
}

function BreadcrumbPreview() {
  return (
    <Breadcrumb>
      <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
      <Breadcrumb.Item href="/settings">Settings</Breadcrumb.Item>
      <Breadcrumb.Item>Profile</Breadcrumb.Item>
    </Breadcrumb>
  )
}

function PageHeaderPreview() {
  return (
    <PageHeader title="Dashboard" subtitle="Performance overview" />
  )
}

function TextareaPreview() {
  return (
    <div className="w-full max-w-[320px]">
      <Textarea label="Notes" placeholder="Session notes..." rows={3} />
    </div>
  )
}

function CheckboxPreview() {
  const [a, setA] = useState(true)
  const [b, setB] = useState(false)
  return (
    <div className="flex flex-col gap-3">
      <Checkbox checked={a} onChange={setA} label="Agree to terms" />
      <Checkbox checked={b} onChange={setB} label="Subscribe to updates" description="Weekly digest" />
    </div>
  )
}

function GaugePreview() {
  return (
    <div className="flex gap-6 items-center">
      <Gauge value={75} max={100} label="Compliance" unit="%" />
    </div>
  )
}

function CalendarPreview() {
  const [date, setDate] = useState<Date | null>(new Date())
  return <Calendar mode="single" selected={date} onSelect={(v: unknown) => setDate(v as Date | null)} />
}

function PaginationPreview() {
  const [page, setPage] = useState(3)
  return <Pagination page={page} totalPages={10} onChange={setPage} />
}

function SpinnerPreview() {
  return (
    <div className="flex gap-4 items-center">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
    </div>
  )
}

function KbdPreview() {
  return (
    <div className="flex gap-2 items-center">
      <Kbd>⌘</Kbd><Kbd>K</Kbd>
      <span className={cn(FONT.body, 'text-[13px] text-[var(--n600)] mx-2')}>or</span>
      <Kbd>Esc</Kbd>
    </div>
  )
}

function AlertPreview() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <Alert severity="warning" title="Low compliance">CHO intake is 20% below target.</Alert>
      <Alert severity="info">New session data available.</Alert>
    </div>
  )
}

function SeparatorPreview() {
  return (
    <div className="flex flex-col gap-4 w-full max-w-[300px]">
      <Separator />
      <Separator label="Or" />
      <Separator variant="subtle" />
    </div>
  )
}

function LabelPreview() {
  return (
    <div className="flex flex-col gap-3">
      <Label>Default label</Label>
      <Label required>Required field</Label>
      <Label description="Your functional threshold power">FTP</Label>
    </div>
  )
}

function ColorDotPreview() {
  return (
    <div className="flex gap-3 items-center">
      <ColorDot color="positive" label="Z2" />
      <ColorDot color="warning" label="Z3" />
      <ColorDot color="negative" label="Z5" />
      <ColorDot color="#A855F7" label="Z6" pulse />
    </div>
  )
}

function StatusIndicatorPreview() {
  return (
    <div className="flex gap-4 items-center">
      <StatusIndicator status="good" label="API" value="99.9%" />
      <StatusIndicator status="warning" label="Sync" />
      <StatusIndicator status="critical" label="DB" />
    </div>
  )
}

function SegmentedBarPreview() {
  return (
    <div className="w-full max-w-[400px]">
      <SegmentedBar
        segments={[
          { value: 60, color: '#16A34A', label: 'Z2' },
          { value: 25, color: '#F59E0B', label: 'Z3' },
          { value: 15, color: '#EF4444', label: 'Z5' },
        ]}
        legend
      />
    </div>
  )
}

function NumberStepperPreview() {
  const [val, setVal] = useState(5)
  return (
    <div className="w-full max-w-[200px]">
      <NumberStepper value={val} onChange={setVal} min={1} max={10} label="Sets" />
    </div>
  )
}

function RatingInputPreview() {
  const [val, setVal] = useState<number | null>(7)
  return <RatingInput value={val} onChange={setVal} max={10} label="RPE" />
}

function StatPreview() {
  return (
    <div className="flex gap-6">
      <Stat value={285} unit="W" label="FTP" />
      <Stat value={162} unit="BPM" label="Avg HR" delta="+3" deltaColor="negative" />
    </div>
  )
}

function FormFieldPreview() {
  return (
    <div className="w-full max-w-[320px]">
      <FormField label="Email" required error="Invalid email">
        <Input type="email" placeholder="you@example.com" />
      </FormField>
    </div>
  )
}

function NotificationBadgePreview() {
  return (
    <div className="flex gap-6 items-center">
      <NotificationBadge count={5}>
        <div className="w-8 h-8 rounded-[6px] bg-[var(--n200)] flex items-center justify-center text-[12px]">🔔</div>
      </NotificationBadge>
      <NotificationBadge dot>
        <div className="w-8 h-8 rounded-[6px] bg-[var(--n200)] flex items-center justify-center text-[12px]">✉️</div>
      </NotificationBadge>
    </div>
  )
}

function DescriptionListPreview() {
  return (
    <div className="w-full max-w-[400px]">
      <DescriptionList items={[
        { label: 'FTP', value: '285 W' },
        { label: 'Weight', value: '72 kg' },
        { label: 'Max HR', value: '192 BPM' },
      ]} />
    </div>
  )
}

function ActionPanelPreview() {
  return <ActionPanel onSave={() => {}} onCancel={() => {}} />
}

function GridListPreview() {
  return (
    <GridList columns={2}>
      <GridList.Card>Item 1</GridList.Card>
      <GridList.Card>Item 2</GridList.Card>
      <GridList.Card>Item 3</GridList.Card>
      <GridList.Card>Item 4</GridList.Card>
    </GridList>
  )
}

function MediaObjectPreview() {
  return (
    <MediaObject title="Session uploaded" description="2 hours ago" />
  )
}

function ButtonGroupPreview() {
  return (
    <ButtonGroup>
      <Button>Save</Button>
      <Button variant="outline">Cancel</Button>
    </ButtonGroup>
  )
}

// ─── Preview map ───

const PREVIEWS: Record<string, React.ComponentType> = {
  'button': ButtonPreview,
  'badge': BadgePreview,
  'toggle-group': ToggleGroupPreview,
  'card': CardPreview,
  'data-row': DataRowPreview,
  'data-table': DataTablePreview,
  'input': InputPreview,
  'select': SelectPreview,
  'metric-card': MetricCardPreview,
  'settings-card': SettingsCardPreview,
  'progress-bar': ProgressBarPreview,
  'section-header': SectionHeaderPreview,
  'skeleton': SkeletonPreview,
  'switch': SwitchPreview,
  'tooltip': TooltipPreview,
  'slider': SliderPreview,
  'avatar': AvatarPreview,
  'empty-state': EmptyStatePreview,
  'breadcrumb': BreadcrumbPreview,
  'page-header': PageHeaderPreview,
  'textarea': TextareaPreview,
  'checkbox': CheckboxPreview,
  'gauge': GaugePreview,
  'calendar': CalendarPreview,
  'pagination': PaginationPreview,
  'spinner': SpinnerPreview,
  'kbd': KbdPreview,
  'alert': AlertPreview,
  'separator': SeparatorPreview,
  'label': LabelPreview,
  'color-dot': ColorDotPreview,
  'status-indicator': StatusIndicatorPreview,
  'segmented-bar': SegmentedBarPreview,
  'number-stepper': NumberStepperPreview,
  'rating-input': RatingInputPreview,
  'stat': StatPreview,
  'form-field': FormFieldPreview,
  'notification-badge': NotificationBadgePreview,
  'description-list': DescriptionListPreview,
  'action-panel': ActionPanelPreview,
  'grid-list': GridListPreview,
  'media-object': MediaObjectPreview,
  'button-group': ButtonGroupPreview,
}

// ─── Page component ───

export default function ComponentPage() {
  const params = useParams()
  const slug = params.slug as string
  const doc = getComponentDoc(slug)

  if (!doc) {
    return (
      <div className="space-y-4">
        <h1 className={cn(FONT.body, 'text-[22px] font-[550] text-[var(--n1150)]')}>
          Component not found
        </h1>
        <p className={cn(FONT.body, 'text-[14px] font-[400] text-[var(--n800)]')}>
          No documentation for "{slug}".
        </p>
        <Link href="/components" className={cn(FONT.body, 'text-[13px] font-[450] text-[var(--n800)] hover:text-[var(--n1150)]')}>
          ← Back to components
        </Link>
      </div>
    )
  }

  const Preview = PREVIEWS[slug]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={cn(FONT.body, 'text-[22px] font-[550] text-[var(--n1150)]')}>
          {doc.name}
        </h1>
        <p className={cn(FONT.body, 'text-[14px] font-[400] text-[var(--n800)] mt-1')}>
          {doc.description}
        </p>
      </div>

      {/* Live preview */}
      {Preview && (
        <DocSection title="Preview">
          <DocPreview>
            <Preview />
          </DocPreview>
        </DocSection>
      )}

      {/* Usage */}
      <DocSection title="Usage">
        <DocCode>{doc.usage}</DocCode>
      </DocSection>

      {/* Props */}
      {doc.props.length > 0 && (
        <DocSection title="Props">
          <DocPropTable props={doc.props} />
        </DocSection>
      )}
    </div>
  )
}
