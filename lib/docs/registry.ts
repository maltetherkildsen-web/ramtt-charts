// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

// lib/docs/registry.ts — Component documentation registry
// Generated from actual component files in components/ui/

import type { PropDef } from '@/components/docs/DocPropTable'

export interface ComponentDoc {
  slug: string
  name: string
  description: string
  category: 'components' | 'charts'
  usage: string
  props: PropDef[]
}

// ─── UI Component Registry (83 components) ───

export const COMPONENT_DOCS: Record<string, ComponentDoc> = {
  // ═══ Wave 1 — Display & Input ═══

  'button': {
    slug: 'button',
    name: 'Button',
    description: 'A minimal button with clear hierarchy. Three variants: primary (black fill), outline (border), ghost (transparent).',
    category: 'components',
    usage: `import { Button } from '@ramtt/ui'

<Button>Primary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>`,
    props: [
      { name: 'variant', type: "'primary' | 'outline' | 'ghost'", default: "'primary'", description: 'Visual style of the button' },
      { name: 'size', type: "'sm' | 'md' | 'lg' | 'icon'", default: "'md'", description: 'Size preset' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disables the button' },
      { name: 'children', type: 'ReactNode', description: 'Button content', required: true },
      { name: 'className', type: 'string', description: 'Additional Tailwind classes' },
    ],
  },

  'badge': {
    slug: 'badge',
    name: 'Badge',
    description: 'Inline status indicator. Supports semantic colors and custom hex values.',
    category: 'components',
    usage: `import { Badge } from '@ramtt/ui'

<Badge>Default</Badge>
<Badge color="positive">Active</Badge>
<Badge color="negative">Error</Badge>
<Badge variant="outline" color="warning">Warning</Badge>`,
    props: [
      { name: 'variant', type: "'filled' | 'outline'", default: "'filled'", description: 'Badge style' },
      { name: 'color', type: "'default' | 'positive' | 'negative' | 'warning' | 'info' | string", default: "'default'", description: 'Color preset or hex value' },
      { name: 'size', type: "'sm' | 'md'", default: "'sm'", description: 'Badge size' },
      { name: 'children', type: 'ReactNode', description: 'Badge content', required: true },
      { name: 'className', type: 'string', description: 'Additional Tailwind classes' },
    ],
  },

  'toggle-group': {
    slug: 'toggle-group',
    name: 'ToggleGroup',
    description: 'Connected or segmented button group for single or multi selection. Three variants: default (connected), pill (separated), underline (tab-like).',
    category: 'components',
    usage: `import { ToggleGroup } from '@ramtt/ui'

<ToggleGroup
  options={['7d', '30d', '90d']}
  value="7d"
  onChange={setValue}
/>
<ToggleGroup
  variant="pill"
  options={[{ value: 'a', label: 'Alpha' }, { value: 'b', label: 'Beta' }]}
  value="a"
  onChange={setValue}
/>`,
    props: [
      { name: 'options', type: "(string | { value: string; label: string })[]", description: 'Toggle options', required: true },
      { name: 'value', type: 'string | string[]', description: 'Selected value(s)', required: true },
      { name: 'onChange', type: '(value: string | string[]) => void', description: 'Change handler', required: true },
      { name: 'variant', type: "'default' | 'pill' | 'underline'", default: "'default'", description: 'Visual variant' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size preset' },
      { name: 'multi', type: 'boolean', default: 'false', description: 'Allow multiple selection' },
      { name: 'ariaLabel', type: 'string', description: 'Accessible label for the group' },
    ],
  },

  'card': {
    slug: 'card',
    name: 'Card',
    description: 'Container with border and optional padding. Compound component with Header, Title, Body, Action sub-components.',
    category: 'components',
    usage: `import { Card } from '@ramtt/ui'

<Card>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Body>Content here</Card.Body>
</Card>
<Card padding="lg">Large padding</Card>
<Card padding="none">No padding</Card>`,
    props: [
      { name: 'padding', type: "'none' | 'sm' | 'md' | 'lg'", default: "'md'", description: 'Internal padding' },
      { name: 'onClick', type: '() => void', description: 'Makes the card interactive with hover lift' },
      { name: 'children', type: 'ReactNode', description: 'Card content', required: true },
      { name: 'className', type: 'string', description: 'Additional Tailwind classes' },
    ],
  },

  'data-row': {
    slug: 'data-row',
    name: 'DataRow',
    description: 'Label–value pair for displaying metrics. Supports units, deltas, and inline badges.',
    category: 'components',
    usage: `import { DataRow } from '@ramtt/ui'

<DataRow label="Power" value={285} unit="W" />
<DataRow label="Change" value="+12%" delta="+12%" deltaColor="positive" />`,
    props: [
      { name: 'label', type: 'string', description: 'Row label text', required: true },
      { name: 'value', type: 'string | number', description: 'Primary value', required: true },
      { name: 'unit', type: 'string', description: 'Unit suffix (W, BPM, etc.)' },
      { name: 'delta', type: 'string | number', description: 'Change indicator' },
      { name: 'deltaColor', type: "'positive' | 'negative' | 'default'", default: "'default'", description: 'Delta color' },
      { name: 'badge', type: 'ReactNode', description: 'Inline badge element' },
    ],
  },

  'data-table': {
    slug: 'data-table',
    name: 'DataTable',
    description: 'Sortable data table with configurable columns. Supports row click handlers and custom cell rendering.',
    category: 'components',
    usage: `import { DataTable } from '@ramtt/ui'

<DataTable
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'value', label: 'Value', align: 'right' },
  ]}
  data={[
    { name: 'FTP', value: '285 W' },
    { name: 'Max HR', value: '192 BPM' },
  ]}
/>`,
    props: [
      { name: 'columns', type: 'DataTableColumn[]', description: 'Column definitions', required: true },
      { name: 'data', type: 'Record<string, unknown>[]', description: 'Row data array', required: true },
      { name: 'onRowClick', type: '(row: Record<string, unknown>) => void', description: 'Row click handler' },
      { name: 'className', type: 'string', description: 'Additional Tailwind classes' },
    ],
  },

  'input': {
    slug: 'input',
    name: 'Input',
    description: 'Text input with optional label and unit suffix. Extends native input attributes.',
    category: 'components',
    usage: `import { Input } from '@ramtt/ui'

<Input placeholder="Enter value" />
<Input label="FTP" unit="W" type="number" />`,
    props: [
      { name: 'label', type: 'string', description: 'Field label above the input' },
      { name: 'unit', type: 'string', description: 'Unit suffix displayed inside the input' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'type', type: 'string', default: "'text'", description: 'Input type' },
      { name: 'className', type: 'string', description: 'Additional Tailwind classes' },
    ],
  },

  'select': {
    slug: 'select',
    name: 'Select',
    description: 'Dropdown select with label. Custom styled to match the design system.',
    category: 'components',
    usage: `import { Select } from '@ramtt/ui'

<Select
  label="Zone model"
  options={[
    { value: 'coggan', label: 'Coggan' },
    { value: 'ramtt', label: 'RAMTT' },
  ]}
  value="ramtt"
  onChange={setValue}
/>`,
    props: [
      { name: 'options', type: 'SelectOption[]', description: 'Dropdown options', required: true },
      { name: 'value', type: 'string', description: 'Selected value' },
      { name: 'onChange', type: '(value: string) => void', description: 'Change handler' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'label', type: 'string', description: 'Field label' },
    ],
  },

  'metric-card': {
    slug: 'metric-card',
    name: 'MetricCard',
    description: 'Card displaying a metric with label, value, optional unit, subtitle, and badge.',
    category: 'components',
    usage: `import { MetricCard } from '@ramtt/ui'

<MetricCard label="Avg power" value={245} unit="W" />
<MetricCard
  label="TSS"
  value={312}
  subtitle="+8% vs last week"
  subtitleColor="positive"
/>`,
    props: [
      { name: 'label', type: 'string', description: 'Metric label', required: true },
      { name: 'value', type: 'string | number', description: 'Primary value', required: true },
      { name: 'unit', type: 'string', description: 'Unit suffix' },
      { name: 'subtitle', type: 'string', description: 'Subtitle text below value' },
      { name: 'subtitleColor', type: "'positive' | 'negative' | 'warning' | 'default'", default: "'default'", description: 'Subtitle color' },
      { name: 'badge', type: '{ label: string; color: string }', description: 'Top-right badge' },
      { name: 'compact', type: 'boolean', description: 'Compact layout' },
    ],
  },

  'settings-card': {
    slug: 'settings-card',
    name: 'SettingsCard',
    description: 'Clickable card for settings navigation. Shows icon, title, and description.',
    category: 'components',
    usage: `import { SettingsCard } from '@ramtt/ui'

<SettingsCard
  title="Notifications"
  description="Configure email and push alerts"
  onClick={() => navigate('/settings/notifications')}
/>`,
    props: [
      { name: 'title', type: 'string', description: 'Card title', required: true },
      { name: 'description', type: 'string', description: 'Description text' },
      { name: 'icon', type: 'ReactNode', description: 'Leading icon' },
      { name: 'onClick', type: '() => void', description: 'Click handler' },
    ],
  },

  'progress-bar': {
    slug: 'progress-bar',
    name: 'ProgressBar',
    description: 'Horizontal progress indicator with optional label. Supports semantic and custom colors.',
    category: 'components',
    usage: `import { ProgressBar } from '@ramtt/ui'

<ProgressBar value={73} max={100} />
<ProgressBar value={45} max={100} color="positive" label="Compliance" />`,
    props: [
      { name: 'value', type: 'number', description: 'Current progress value', required: true },
      { name: 'max', type: 'number', description: 'Maximum value', required: true },
      { name: 'color', type: "'default' | 'positive' | 'negative' | 'warning' | string", default: "'default'", description: 'Bar color' },
      { name: 'label', type: 'string', description: 'Label text above bar' },
      { name: 'height', type: 'number', default: '6', description: 'Bar height in pixels' },
    ],
  },

  'section-header': {
    slug: 'section-header',
    name: 'SectionHeader',
    description: 'Section divider label. Renders as a styled heading with optional action slot.',
    category: 'components',
    usage: `import { SectionHeader } from '@ramtt/ui'

<SectionHeader>Performance metrics</SectionHeader>
<SectionHeader action={<Button variant="ghost" size="sm">View all</Button>}>
  Recent sessions
</SectionHeader>`,
    props: [
      { name: 'children', type: 'string', description: 'Header text', required: true },
      { name: 'action', type: 'ReactNode', description: 'Right-aligned action element' },
    ],
  },

  // ═══ Wave 2 — Interaction Layer ═══

  'modal': {
    slug: 'modal',
    name: 'Modal',
    description: 'Dialog overlay with backdrop blur. Uses native <dialog> element. Three sizes.',
    category: 'components',
    usage: `import { Modal } from '@ramtt/ui'

<Modal open={isOpen} onClose={() => setOpen(false)}>
  <h2>Confirm action</h2>
  <p>Are you sure?</p>
</Modal>`,
    props: [
      { name: 'open', type: 'boolean', description: 'Controls visibility', required: true },
      { name: 'onClose', type: '() => void', description: 'Close handler', required: true },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Modal width' },
      { name: 'children', type: 'ReactNode', description: 'Modal content', required: true },
    ],
  },

  'toast': {
    slug: 'toast',
    name: 'Toast',
    description: 'Notification toast system. Wrap app in ToastProvider and use the useToast() hook to show messages.',
    category: 'components',
    usage: `import { ToastProvider, useToast } from '@ramtt/ui'

// In root layout:
<ToastProvider>{children}</ToastProvider>

// In any component:
const toast = useToast()
toast({ message: 'Saved!', variant: 'success' })`,
    props: [
      { name: 'message', type: 'string', description: 'Toast text', required: true },
      { name: 'variant', type: "'default' | 'success' | 'error' | 'warning'", description: 'Toast style' },
      { name: 'duration', type: 'number', default: '4000', description: 'Auto-dismiss time in ms' },
      { name: 'action', type: '{ label: string; onClick: () => void }', description: 'Action button' },
    ],
  },

  'dropdown': {
    slug: 'dropdown',
    name: 'Dropdown',
    description: 'Context menu with trigger. Compound component: Dropdown, Trigger, Content, Item, Separator.',
    category: 'components',
    usage: `import { Dropdown } from '@ramtt/ui'

<Dropdown>
  <Dropdown.Trigger>
    <Button variant="ghost">Options</Button>
  </Dropdown.Trigger>
  <Dropdown.Content>
    <Dropdown.Item onClick={edit}>Edit</Dropdown.Item>
    <Dropdown.Separator />
    <Dropdown.Item variant="danger" onClick={del}>Delete</Dropdown.Item>
  </Dropdown.Content>
</Dropdown>`,
    props: [
      { name: 'children', type: 'ReactNode', description: 'Trigger + Content', required: true },
      { name: 'align', type: "'start' | 'end'", default: "'start'", description: 'Content alignment (on Content)' },
      { name: 'side', type: "'bottom' | 'top'", default: "'bottom'", description: 'Content side (on Content)' },
    ],
  },

  'tabs': {
    slug: 'tabs',
    name: 'Tabs',
    description: 'Tab navigation with panels. Compound component: Tabs, List, Tab, Panel. Three variants.',
    category: 'components',
    usage: `import { Tabs } from '@ramtt/ui'

<Tabs value={tab} onChange={setTab}>
  <Tabs.List>
    <Tabs.Tab value="overview">Overview</Tabs.Tab>
    <Tabs.Tab value="details">Details</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="overview">Overview content</Tabs.Panel>
  <Tabs.Panel value="details">Details content</Tabs.Panel>
</Tabs>`,
    props: [
      { name: 'value', type: 'string', description: 'Active tab value', required: true },
      { name: 'onChange', type: '(value: string) => void', description: 'Tab change handler', required: true },
      { name: 'variant', type: "'underline' | 'pill' | 'default'", default: "'underline'", description: 'Visual variant' },
      { name: 'children', type: 'ReactNode', description: 'Tabs.List + Tabs.Panel elements', required: true },
    ],
  },

  'skeleton': {
    slug: 'skeleton',
    name: 'Skeleton',
    description: 'Loading placeholder with pulse animation. Configurable dimensions and border radius.',
    category: 'components',
    usage: `import { Skeleton } from '@ramtt/ui'

<Skeleton width={200} height={20} />
<Skeleton width={40} height={40} radius="full" />`,
    props: [
      { name: 'width', type: 'number | string', default: "'100%'", description: 'Width' },
      { name: 'height', type: 'number | string', default: '16', description: 'Height' },
      { name: 'radius', type: "'sm' | 'md' | 'lg' | 'full' | number", default: "'sm'", description: 'Border radius' },
    ],
  },

  'switch': {
    slug: 'switch',
    name: 'Switch',
    description: 'Toggle switch for boolean states. Supports label and description text.',
    category: 'components',
    usage: `import { Switch } from '@ramtt/ui'

<Switch checked={enabled} onChange={setEnabled} label="Notifications" />
<Switch
  checked={darkMode}
  onChange={setDarkMode}
  label="Dark mode"
  description="Use dark theme across the app"
/>`,
    props: [
      { name: 'checked', type: 'boolean', description: 'Switch state', required: true },
      { name: 'onChange', type: '(checked: boolean) => void', description: 'Change handler', required: true },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'description', type: 'string', description: 'Description below label' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the switch' },
    ],
  },

  // ═══ Wave 3 — Polish & Navigation ═══

  'tooltip': {
    slug: 'tooltip',
    name: 'Tooltip',
    description: 'Hover tooltip with configurable side and delay. Dark background, light text.',
    category: 'components',
    usage: `import { Tooltip } from '@ramtt/ui'

<Tooltip content="Save changes">
  <Button>Save</Button>
</Tooltip>`,
    props: [
      { name: 'content', type: 'string', description: 'Tooltip text', required: true },
      { name: 'side', type: "'top' | 'bottom' | 'left' | 'right'", default: "'top'", description: 'Placement side' },
      { name: 'delay', type: 'number', default: '300', description: 'Show delay in ms' },
      { name: 'children', type: 'ReactElement', description: 'Trigger element', required: true },
    ],
  },

  'accordion': {
    slug: 'accordion',
    name: 'Accordion',
    description: 'Expandable content sections. Single or multiple mode. Compound component with Item, Trigger, Content.',
    category: 'components',
    usage: `import { Accordion } from '@ramtt/ui'

<Accordion>
  <Accordion.Item value="faq-1">
    <Accordion.Trigger>What is RAMTT?</Accordion.Trigger>
    <Accordion.Content>A training analytics platform.</Accordion.Content>
  </Accordion.Item>
</Accordion>`,
    props: [
      { name: 'type', type: "'single' | 'multiple'", default: "'single'", description: 'Expansion mode' },
      { name: 'value', type: 'string | string[]', description: 'Controlled open items' },
      { name: 'onChange', type: '(value: string | string[]) => void', description: 'Change handler' },
      { name: 'children', type: 'ReactNode', description: 'Accordion.Item elements', required: true },
    ],
  },

  'slider': {
    slug: 'slider',
    name: 'Slider',
    description: 'Range slider with label, unit, and optional marks. Uses native range input with custom styling.',
    category: 'components',
    usage: `import { Slider } from '@ramtt/ui'

<Slider value={70} onChange={setValue} min={0} max={100} label="Intensity" unit="%" />`,
    props: [
      { name: 'value', type: 'number', description: 'Current value', required: true },
      { name: 'onChange', type: '(value: number) => void', description: 'Change handler', required: true },
      { name: 'min', type: 'number', description: 'Minimum value', required: true },
      { name: 'max', type: 'number', description: 'Maximum value', required: true },
      { name: 'step', type: 'number', default: '1', description: 'Step increment' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'unit', type: 'string', description: 'Unit suffix' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the slider' },
    ],
  },

  'avatar': {
    slug: 'avatar',
    name: 'Avatar',
    description: 'User avatar with image, fallback initials, and optional status dot.',
    category: 'components',
    usage: `import { Avatar } from '@ramtt/ui'

<Avatar name="Malte T" size="md" />
<Avatar name="Malte T" src="/avatar.jpg" status="online" />`,
    props: [
      { name: 'name', type: 'string', description: 'User name (used for initials fallback)', required: true },
      { name: 'src', type: 'string', description: 'Image URL' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Avatar size' },
      { name: 'status', type: "'online' | 'offline' | 'away'", description: 'Status indicator dot' },
    ],
  },

  'empty-state': {
    slug: 'empty-state',
    name: 'EmptyState',
    description: 'Placeholder for empty content areas. Shows icon, title, description, and optional action.',
    category: 'components',
    usage: `import { EmptyState } from '@ramtt/ui'

<EmptyState
  title="No sessions"
  description="Upload a FIT file to get started."
  action={<Button>Upload</Button>}
/>`,
    props: [
      { name: 'title', type: 'string', description: 'Primary text', required: true },
      { name: 'description', type: 'string', description: 'Secondary text' },
      { name: 'icon', type: 'ReactNode', description: 'Leading icon' },
      { name: 'action', type: 'ReactNode', description: 'Action button' },
    ],
  },

  'breadcrumb': {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    description: 'Navigation breadcrumb trail. Compound component with Item sub-component.',
    category: 'components',
    usage: `import { Breadcrumb } from '@ramtt/ui'

<Breadcrumb>
  <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
  <Breadcrumb.Item href="/settings">Settings</Breadcrumb.Item>
  <Breadcrumb.Item>Profile</Breadcrumb.Item>
</Breadcrumb>`,
    props: [
      { name: 'separator', type: 'ReactNode', default: "'/'", description: 'Separator between items' },
      { name: 'children', type: 'ReactNode', description: 'Breadcrumb.Item elements', required: true },
    ],
  },

  // ═══ Wave 4 — App-Specific ═══

  'sidebar': {
    slug: 'sidebar',
    name: 'Sidebar',
    description: 'App navigation sidebar. Compound component with Logo, Nav, Item, Separator, Footer. Supports collapsed state.',
    category: 'components',
    usage: `import { Sidebar } from '@ramtt/ui'

<Sidebar>
  <Sidebar.Logo>RAMTT</Sidebar.Logo>
  <Sidebar.Nav>
    <Sidebar.Item href="/dashboard" active>Dashboard</Sidebar.Item>
    <Sidebar.Item href="/sessions">Sessions</Sidebar.Item>
  </Sidebar.Nav>
</Sidebar>`,
    props: [
      { name: 'collapsed', type: 'boolean', default: 'false', description: 'Collapsed state (icon-only)' },
      { name: 'children', type: 'ReactNode', description: 'Sidebar sections', required: true },
    ],
  },

  'page-header': {
    slug: 'page-header',
    name: 'PageHeader',
    description: 'Page title with optional subtitle, breadcrumb, and action buttons.',
    category: 'components',
    usage: `import { PageHeader } from '@ramtt/ui'

<PageHeader
  title="Dashboard"
  subtitle="Performance overview"
  actions={<Button size="sm">Export</Button>}
/>`,
    props: [
      { name: 'title', type: 'string', description: 'Page title', required: true },
      { name: 'subtitle', type: 'string', description: 'Subtitle text' },
      { name: 'breadcrumb', type: 'ReactNode', description: 'Breadcrumb above title' },
      { name: 'actions', type: 'ReactNode', description: 'Action buttons' },
    ],
  },

  'textarea': {
    slug: 'textarea',
    name: 'Textarea',
    description: 'Multi-line text input with optional label, character count, and max length.',
    category: 'components',
    usage: `import { Textarea } from '@ramtt/ui'

<Textarea label="Notes" placeholder="Session notes..." rows={4} />
<Textarea label="Bio" maxLength={500} showCount />`,
    props: [
      { name: 'label', type: 'string', description: 'Field label' },
      { name: 'rows', type: 'number', default: '3', description: 'Visible rows' },
      { name: 'maxLength', type: 'number', description: 'Max character count' },
      { name: 'showCount', type: 'boolean', default: 'false', description: 'Show character counter' },
      { name: 'placeholder', type: 'string', description: 'Placeholder text' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the textarea' },
    ],
  },

  'checkbox': {
    slug: 'checkbox',
    name: 'Checkbox',
    description: 'Checkbox with label and optional description. Supports indeterminate state.',
    category: 'components',
    usage: `import { Checkbox } from '@ramtt/ui'

<Checkbox checked={agreed} onChange={setAgreed} label="I agree to the terms" />`,
    props: [
      { name: 'checked', type: 'boolean', description: 'Checked state', required: true },
      { name: 'onChange', type: '(checked: boolean) => void', description: 'Change handler', required: true },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'description', type: 'string', description: 'Description below label' },
      { name: 'indeterminate', type: 'boolean', default: 'false', description: 'Indeterminate state' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the checkbox' },
    ],
  },

  'radio': {
    slug: 'radio',
    name: 'Radio',
    description: 'Radio button group. Compound: Radio (group) + Radio.Item.',
    category: 'components',
    usage: `import { Radio } from '@ramtt/ui'

<Radio value={zone} onChange={setZone} label="Zone model">
  <Radio.Item value="coggan" label="Coggan" />
  <Radio.Item value="ramtt" label="RAMTT" description="6-zone model" />
</Radio>`,
    props: [
      { name: 'value', type: 'string', description: 'Selected value', required: true },
      { name: 'onChange', type: '(value: string) => void', description: 'Change handler', required: true },
      { name: 'label', type: 'string', description: 'Group label' },
      { name: 'children', type: 'ReactNode', description: 'Radio.Item elements', required: true },
    ],
  },

  'file-upload': {
    slug: 'file-upload',
    name: 'FileUpload',
    description: 'Drag-and-drop file upload with preview. Supports file type filtering and size limits.',
    category: 'components',
    usage: `import { FileUpload } from '@ramtt/ui'

<FileUpload
  accept=".fit,.gpx"
  onUpload={(file) => handleFile(file)}
  label="Activity file"
  description="Drop a FIT or GPX file"
/>`,
    props: [
      { name: 'onUpload', type: '(file: File) => void', description: 'Upload handler', required: true },
      { name: 'accept', type: 'string', description: 'Accepted file types' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'description', type: 'string', description: 'Help text' },
      { name: 'maxSize', type: 'number', default: '10485760', description: 'Max file size in bytes (10MB)' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable upload' },
    ],
  },

  'tag': {
    slug: 'tag',
    name: 'Tag',
    description: 'Removable tag pill. Also exports TagInput for tag entry with suggestions.',
    category: 'components',
    usage: `import { Tag } from '@ramtt/ui'

<Tag>Recovery</Tag>
<Tag color="#16A34A" onRemove={() => remove('endurance')}>Endurance</Tag>`,
    props: [
      { name: 'children', type: 'ReactNode', description: 'Tag text', required: true },
      { name: 'color', type: 'string', description: 'Custom color' },
      { name: 'onRemove', type: '() => void', description: 'Remove handler (shows × button)' },
    ],
  },

  'gauge': {
    slug: 'gauge',
    name: 'Gauge',
    description: 'Circular or bar gauge for progress/performance metrics. Supports thresholds for color zones.',
    category: 'components',
    usage: `import { Gauge } from '@ramtt/ui'

<Gauge value={75} max={100} label="Compliance" unit="%" />
<Gauge value={285} max={400} variant="bar" label="FTP" unit="W" />`,
    props: [
      { name: 'value', type: 'number', description: 'Current value', required: true },
      { name: 'max', type: 'number', description: 'Maximum value', required: true },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'unit', type: 'string', description: 'Unit suffix' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Gauge size' },
      { name: 'variant', type: "'ring' | 'bar'", default: "'ring'", description: 'Visual style' },
      { name: 'color', type: "'default' | 'positive' | 'negative' | 'warning' | string", default: "'default'", description: 'Fill color' },
    ],
  },

  // ═══ Wave 5 — Full Parity + Beyond ═══

  'calendar': {
    slug: 'calendar',
    name: 'Calendar',
    description: 'Month calendar with single or range selection. Supports disabled dates, week numbers, and custom day rendering.',
    category: 'components',
    usage: `import { Calendar } from '@ramtt/ui'

<Calendar mode="single" selected={date} onSelect={setDate} />`,
    props: [
      { name: 'mode', type: "'single' | 'range'", default: "'single'", description: 'Selection mode' },
      { name: 'selected', type: 'Date | DateRange | null', description: 'Selected date(s)' },
      { name: 'onSelect', type: '(value) => void', description: 'Selection handler' },
      { name: 'minDate', type: 'Date', description: 'Earliest selectable date' },
      { name: 'maxDate', type: 'Date', description: 'Latest selectable date' },
    ],
  },

  'date-picker': {
    slug: 'date-picker',
    name: 'DatePicker',
    description: 'Input field that opens a Calendar popover for date selection.',
    category: 'components',
    usage: `import { DatePicker } from '@ramtt/ui'

<DatePicker label="Start date" value={date} onChange={setDate} />`,
    props: [
      { name: 'value', type: 'Date | DateRange | null', description: 'Selected date' },
      { name: 'onChange', type: '(value) => void', description: 'Change handler' },
      { name: 'label', type: 'string', description: 'Field label' },
      { name: 'mode', type: "'single' | 'range'", default: "'single'", description: 'Selection mode' },
      { name: 'disabled', type: 'boolean', default: 'false', description: 'Disable the picker' },
    ],
  },

  'popover': {
    slug: 'popover',
    name: 'Popover',
    description: 'Floating content panel triggered by click. Compound: Popover, Trigger, Content.',
    category: 'components',
    usage: `import { Popover } from '@ramtt/ui'

<Popover>
  <Popover.Trigger><Button>Open</Button></Popover.Trigger>
  <Popover.Content>Panel content here</Popover.Content>
</Popover>`,
    props: [
      { name: 'open', type: 'boolean', description: 'Controlled open state' },
      { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Open state handler' },
      { name: 'children', type: 'ReactNode', description: 'Trigger + Content', required: true },
    ],
  },

  'command': {
    slug: 'command',
    name: 'Command',
    description: 'Command palette with search, groups, and keyboard shortcuts. Compound component.',
    category: 'components',
    usage: `import { Command } from '@ramtt/ui'

<Command>
  <Command.Input placeholder="Search..." />
  <Command.List>
    <Command.Group heading="Actions">
      <Command.Item onSelect={action}>New session</Command.Item>
    </Command.Group>
  </Command.List>
</Command>`,
    props: [
      { name: 'children', type: 'ReactNode', description: 'Input, List, Group, Item elements', required: true },
    ],
  },

  'pagination': {
    slug: 'pagination',
    name: 'Pagination',
    description: 'Page navigation with prev/next and numbered buttons.',
    category: 'components',
    usage: `import { Pagination } from '@ramtt/ui'

<Pagination page={3} totalPages={10} onChange={setPage} />`,
    props: [
      { name: 'page', type: 'number', description: 'Current page', required: true },
      { name: 'totalPages', type: 'number', description: 'Total pages', required: true },
      { name: 'onChange', type: '(page: number) => void', description: 'Page change handler', required: true },
      { name: 'siblingCount', type: 'number', default: '1', description: 'Pages shown beside current' },
    ],
  },

  'drawer': {
    slug: 'drawer',
    name: 'Drawer',
    description: 'Slide-in panel from edge of screen. Supports right, left, bottom. Compound component with Header, Body, Footer.',
    category: 'components',
    usage: `import { Drawer } from '@ramtt/ui'

<Drawer open={open} onClose={() => setOpen(false)} side="right">
  <Drawer.Header><Drawer.Title>Details</Drawer.Title></Drawer.Header>
  <Drawer.Body>Content</Drawer.Body>
</Drawer>`,
    props: [
      { name: 'open', type: 'boolean', description: 'Drawer visibility', required: true },
      { name: 'onClose', type: '() => void', description: 'Close handler', required: true },
      { name: 'side', type: "'right' | 'left' | 'bottom'", default: "'right'", description: 'Slide direction' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Drawer width' },
    ],
  },

  'spinner': {
    slug: 'spinner',
    name: 'Spinner',
    description: 'Loading spinner with three sizes.',
    category: 'components',
    usage: `import { Spinner } from '@ramtt/ui'

<Spinner />
<Spinner size="lg" />`,
    props: [
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Spinner size' },
      { name: 'color', type: 'string', default: "'currentColor'", description: 'Spinner color' },
    ],
  },

  'kbd': {
    slug: 'kbd',
    name: 'Kbd',
    description: 'Keyboard shortcut indicator.',
    category: 'components',
    usage: `import { Kbd } from '@ramtt/ui'

<Kbd>⌘K</Kbd>
<Kbd>Esc</Kbd>`,
    props: [
      { name: 'children', type: 'ReactNode', description: 'Key text', required: true },
    ],
  },

  'alert': {
    slug: 'alert',
    name: 'Alert',
    description: 'Inline alert banner. Supports dot, edge-left, edge-top appearance. Optional dismiss and action button.',
    category: 'components',
    usage: `import { Alert } from '@ramtt/ui'

<Alert severity="warning" title="Low compliance">
  CHO intake is 20% below target.
</Alert>`,
    props: [
      { name: 'severity', type: "'default' | 'info' | 'warning' | 'error' | 'success'", default: "'default'", description: 'Alert type' },
      { name: 'appearance', type: "'dot' | 'edge-left' | 'edge-top'", default: "'dot'", description: 'Visual indicator style' },
      { name: 'title', type: 'string', description: 'Alert title' },
      { name: 'children', type: 'ReactNode', description: 'Alert body text', required: true },
      { name: 'onDismiss', type: '() => void', description: 'Dismiss handler (shows × button)' },
    ],
  },

  'combobox': {
    slug: 'combobox',
    name: 'Combobox',
    description: 'Searchable select with autocomplete. Supports single/multi selection and grouped options.',
    category: 'components',
    usage: `import { Combobox } from '@ramtt/ui'

<Combobox
  options={[{ value: 'ftp', label: 'FTP' }, { value: 'lthr', label: 'LTHR' }]}
  value={metric}
  onChange={setMetric}
  placeholder="Select metric"
/>`,
    props: [
      { name: 'options', type: 'ComboboxOption[] | ComboboxGroup[]', description: 'Options list', required: true },
      { name: 'value', type: 'string | string[]', description: 'Selected value(s)', required: true },
      { name: 'onChange', type: '(value: string | string[]) => void', description: 'Change handler', required: true },
      { name: 'multi', type: 'boolean', default: 'false', description: 'Multi-selection mode' },
      { name: 'label', type: 'string', description: 'Field label' },
      { name: 'placeholder', type: 'string', default: "'Select...'", description: 'Placeholder text' },
    ],
  },

  // ═══ Wave 6 — Final Parity ═══

  'separator': {
    slug: 'separator',
    name: 'Separator',
    description: 'Visual divider line. Horizontal or vertical, default or subtle variant.',
    category: 'components',
    usage: `import { Separator } from '@ramtt/ui'

<Separator />
<Separator orientation="vertical" />
<Separator label="Or" />`,
    props: [
      { name: 'orientation', type: "'horizontal' | 'vertical'", default: "'horizontal'", description: 'Direction' },
      { name: 'variant', type: "'default' | 'subtle'", default: "'default'", description: 'Visual weight' },
      { name: 'label', type: 'string', description: 'Center label text' },
    ],
  },

  'label': {
    slug: 'label',
    name: 'Label',
    description: 'Form field label. Supports required indicator and description.',
    category: 'components',
    usage: `import { Label } from '@ramtt/ui'

<Label htmlFor="ftp" required>FTP</Label>
<Label description="Your functional threshold power">FTP</Label>`,
    props: [
      { name: 'htmlFor', type: 'string', description: 'Associated input ID' },
      { name: 'required', type: 'boolean', description: 'Show required indicator' },
      { name: 'description', type: 'string', description: 'Help text below label' },
      { name: 'children', type: 'ReactNode', description: 'Label text', required: true },
    ],
  },

  'collapsible': {
    slug: 'collapsible',
    name: 'Collapsible',
    description: 'Collapsible content section with trigger. Supports controlled and uncontrolled modes.',
    category: 'components',
    usage: `import { Collapsible } from '@ramtt/ui'

<Collapsible>
  <Collapsible.Trigger>Advanced settings</Collapsible.Trigger>
  <Collapsible.Content>Hidden content here</Collapsible.Content>
</Collapsible>`,
    props: [
      { name: 'open', type: 'boolean', description: 'Controlled open state' },
      { name: 'defaultOpen', type: 'boolean', default: 'false', description: 'Initial open state' },
      { name: 'onOpenChange', type: '(open: boolean) => void', description: 'Open state handler' },
    ],
  },

  'input-group': {
    slug: 'input-group',
    name: 'InputGroup',
    description: 'Input with prefix/suffix slots for icons or labels.',
    category: 'components',
    usage: `import { InputGroup } from '@ramtt/ui'

<InputGroup>
  <InputGroup.Prefix>$</InputGroup.Prefix>
  <input type="text" />
  <InputGroup.Suffix>USD</InputGroup.Suffix>
</InputGroup>`,
    props: [
      { name: 'children', type: 'ReactNode', description: 'Prefix, input, and Suffix elements', required: true },
    ],
  },

  'scroll-area': {
    slug: 'scroll-area',
    name: 'ScrollArea',
    description: 'Custom scrollable area with thin styled scrollbar thumb.',
    category: 'components',
    usage: `import { ScrollArea } from '@ramtt/ui'

<ScrollArea className="h-[300px]">
  {longContent}
</ScrollArea>`,
    props: [
      { name: 'orientation', type: "'vertical' | 'horizontal' | 'both'", default: "'vertical'", description: 'Scroll direction' },
      { name: 'children', type: 'ReactNode', description: 'Scrollable content', required: true },
    ],
  },

  'hover-card': {
    slug: 'hover-card',
    name: 'HoverCard',
    description: 'Content card that appears on hover. Compound: HoverCard, Trigger, Content.',
    category: 'components',
    usage: `import { HoverCard } from '@ramtt/ui'

<HoverCard>
  <HoverCard.Trigger>Hover me</HoverCard.Trigger>
  <HoverCard.Content>Details here</HoverCard.Content>
</HoverCard>`,
    props: [
      { name: 'openDelay', type: 'number', default: '300', description: 'Open delay in ms' },
      { name: 'closeDelay', type: 'number', default: '200', description: 'Close delay in ms' },
    ],
  },

  'resizable': {
    slug: 'resizable',
    name: 'Resizable',
    description: 'Resizable panel layout. Compound: Resizable, Panel, Handle.',
    category: 'components',
    usage: `import { Resizable } from '@ramtt/ui'

<Resizable direction="horizontal">
  <Resizable.Panel defaultSize={50}>Left</Resizable.Panel>
  <Resizable.Handle />
  <Resizable.Panel defaultSize={50}>Right</Resizable.Panel>
</Resizable>`,
    props: [
      { name: 'direction', type: "'horizontal' | 'vertical'", description: 'Resize direction', required: true },
      { name: 'children', type: 'ReactNode', description: 'Panel + Handle elements', required: true },
    ],
  },

  'context-menu': {
    slug: 'context-menu',
    name: 'ContextMenu',
    description: 'Right-click context menu. Compound: ContextMenu, Trigger, Content, Item, Separator, Shortcut.',
    category: 'components',
    usage: `import { ContextMenu } from '@ramtt/ui'

<ContextMenu>
  <ContextMenu.Trigger>Right-click here</ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item onClick={copy}>Copy</ContextMenu.Item>
    <ContextMenu.Separator />
    <ContextMenu.Item variant="danger" onClick={del}>Delete</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu>`,
    props: [
      { name: 'children', type: 'ReactNode', description: 'Trigger + Content', required: true },
    ],
  },

  // ═══ Wave 7A — Atomic Display + Input ═══

  'color-dot': {
    slug: 'color-dot',
    name: 'ColorDot',
    description: 'Small colored dot for legends and status. Supports pulse animation.',
    category: 'components',
    usage: `import { ColorDot } from '@ramtt/ui'

<ColorDot color="positive" />
<ColorDot color="#16A34A" label="Z2" size="lg" pulse />`,
    props: [
      { name: 'color', type: "'positive' | 'negative' | 'warning' | 'info' | string", description: 'Dot color', required: true },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Dot size' },
      { name: 'label', type: 'string', description: 'Label text beside dot' },
      { name: 'pulse', type: 'boolean', default: 'false', description: 'Pulse animation' },
    ],
  },

  'status-indicator': {
    slug: 'status-indicator',
    name: 'StatusIndicator',
    description: 'Health status display with dot, label, and value. Supports dot, edge-left, edge-top appearances.',
    category: 'components',
    usage: `import { StatusIndicator } from '@ramtt/ui'

<StatusIndicator status="good" label="API" value="99.9%" />
<StatusIndicator status="critical" label="DB" />`,
    props: [
      { name: 'status', type: "'good' | 'warning' | 'critical' | 'neutral' | 'unknown'", description: 'Status type', required: true },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'value', type: 'string', description: 'Value text' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Indicator size' },
      { name: 'appearance', type: "'dot' | 'edge-left' | 'edge-top'", default: "'dot'", description: 'Visual style' },
    ],
  },

  'segmented-bar': {
    slug: 'segmented-bar',
    name: 'SegmentedBar',
    description: 'Horizontal stacked bar showing proportions. Supports labels and legend.',
    category: 'components',
    usage: `import { SegmentedBar } from '@ramtt/ui'

<SegmentedBar
  segments={[
    { value: 60, color: '#16A34A', label: 'Z2' },
    { value: 25, color: '#F59E0B', label: 'Z3' },
    { value: 15, color: '#EF4444', label: 'Z5' },
  ]}
  legend
/>`,
    props: [
      { name: 'segments', type: 'Segment[]', description: 'Bar segments', required: true },
      { name: 'height', type: 'number', default: '8', description: 'Bar height in pixels' },
      { name: 'showLabels', type: 'boolean', default: 'false', description: 'Show labels on segments' },
      { name: 'legend', type: 'boolean', default: 'false', description: 'Show legend below bar' },
    ],
  },

  'number-stepper': {
    slug: 'number-stepper',
    name: 'NumberStepper',
    description: 'Numeric input with increment/decrement buttons. Supports min, max, step, and keyboard repeat.',
    category: 'components',
    usage: `import { NumberStepper } from '@ramtt/ui'

<NumberStepper value={5} onChange={setValue} min={1} max={10} label="Sets" />`,
    props: [
      { name: 'value', type: 'number', description: 'Current value', required: true },
      { name: 'onChange', type: '(value: number) => void', description: 'Change handler', required: true },
      { name: 'min', type: 'number', description: 'Minimum value' },
      { name: 'max', type: 'number', description: 'Maximum value' },
      { name: 'step', type: 'number', default: '1', description: 'Increment step' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'unit', type: 'string', description: 'Unit suffix' },
    ],
  },

  'hex-swatch': {
    slug: 'hex-swatch',
    name: 'HexSwatch',
    description: 'Color swatch that displays a hex value as docs data. Used in design-system reference pages where the hex IS the content, not a styling literal.',
    category: 'components',
    usage: `import { HexSwatch } from '@ramtt/ui'

<HexSwatch token="--bg" hex="#FAF9F5" label="Canvas" usage="Page background" />`,
    props: [
      { name: 'hex', type: 'string', description: 'The hex value to display (passed as data, not styling)', required: true },
      { name: 'token', type: 'string', description: 'Optional token name shown above the swatch (e.g. "--n50")' },
      { name: 'label', type: 'string', description: 'Optional label shown below the hex' },
      { name: 'usage', type: 'string', description: 'Optional usage description' },
      { name: 'size', type: 'number', default: '56', description: 'Swatch size in px' },
    ],
  },

  // ═══ Wave 7B — Input Patterns ═══

  'rating-input': {
    slug: 'rating-input',
    name: 'RatingInput',
    description: 'Segmented rating selector (1–N). Supports custom labels and compact mode.',
    category: 'components',
    usage: `import { RatingInput } from '@ramtt/ui'

<RatingInput value={rpe} onChange={setRpe} max={10} label="RPE" />`,
    props: [
      { name: 'value', type: 'number | null', description: 'Selected value', required: true },
      { name: 'onChange', type: '(value: number) => void', description: 'Change handler', required: true },
      { name: 'max', type: 'number', default: '5', description: 'Number of segments' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'labels', type: 'string[]', description: 'Custom labels per segment' },
      { name: 'compact', type: 'boolean', default: 'false', description: 'Smaller segment size' },
    ],
  },

  'time-picker': {
    slug: 'time-picker',
    name: 'TimePicker',
    description: 'Time input with 24h/12h format. Separate hour/minute fields with optional step.',
    category: 'components',
    usage: `import { TimePicker } from '@ramtt/ui'

<TimePicker value="14:30" onChange={setTime} label="Start time" />`,
    props: [
      { name: 'value', type: 'string | null', description: 'Time value (HH:mm)', required: true },
      { name: 'onChange', type: '(value: string) => void', description: 'Change handler', required: true },
      { name: 'format', type: "'24h' | '12h'", default: "'24h'", description: 'Time format' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'step', type: 'number', default: '1', description: 'Minute step' },
    ],
  },

  'step-flow': {
    slug: 'step-flow',
    name: 'StepFlow',
    description: 'Multi-step flow with progress indicator. Compound: StepFlow, Progress, Content, Navigation.',
    category: 'components',
    usage: `import { StepFlow } from '@ramtt/ui'

<StepFlow currentStep={step} onStepChange={setStep} totalSteps={3}>
  <StepFlow.Progress />
  <StepFlow.Content>Step content here</StepFlow.Content>
  <StepFlow.Navigation onNext={next} onBack={back} />
</StepFlow>`,
    props: [
      { name: 'currentStep', type: 'number', description: 'Current step index', required: true },
      { name: 'totalSteps', type: 'number', description: 'Total step count' },
      { name: 'steps', type: 'StepFlowStep[]', description: 'Step definitions' },
      { name: 'onStepChange', type: '(step: number) => void', description: 'Step change handler' },
      { name: 'onComplete', type: '() => void', description: 'Completion handler' },
    ],
  },

  // ═══ Wave 7C — Widget System ═══

  'widget-card': {
    slug: 'widget-card',
    name: 'WidgetCard',
    description: 'Dashboard widget container. Supports collapse, settings, remove, fullscreen, and time range selector.',
    category: 'components',
    usage: `import { WidgetCard } from '@ramtt/ui'

<WidgetCard title="Power trend" subtitle="Last 30 days">
  Chart content here
</WidgetCard>`,
    props: [
      { name: 'title', type: 'string', description: 'Widget title', required: true },
      { name: 'subtitle', type: 'string', description: 'Subtitle text' },
      { name: 'collapsible', type: 'boolean', default: 'false', description: 'Allow collapse' },
      { name: 'loading', type: 'boolean', default: 'false', description: 'Show loading state' },
      { name: 'children', type: 'ReactNode', description: 'Widget content', required: true },
    ],
  },

  'widget-picker': {
    slug: 'widget-picker',
    name: 'WidgetPicker',
    description: 'Modal for adding widgets to a dashboard. Shows available widgets with descriptions.',
    category: 'components',
    usage: `import { WidgetPicker } from '@ramtt/ui'

<WidgetPicker
  open={open}
  onClose={() => setOpen(false)}
  onAdd={(id) => addWidget(id)}
  widgets={availableWidgets}
/>`,
    props: [
      { name: 'open', type: 'boolean', description: 'Visibility', required: true },
      { name: 'onClose', type: '() => void', description: 'Close handler', required: true },
      { name: 'onAdd', type: '(widgetId: string) => void', description: 'Add handler', required: true },
      { name: 'widgets', type: 'WidgetDefinition[]', description: 'Available widgets' },
    ],
  },

  'dashboard-grid': {
    slug: 'dashboard-grid',
    name: 'DashboardGrid',
    description: 'Drag-and-resize grid layout for dashboard widgets.',
    category: 'components',
    usage: `import { DashboardGrid } from '@ramtt/ui'

<DashboardGrid layout={layout} onLayoutChange={setLayout}>
  <DashboardGrid.Item id="1" x={0} y={0} w={6} h={3}>Widget 1</DashboardGrid.Item>
  <DashboardGrid.Item id="2" x={6} y={0} w={6} h={3}>Widget 2</DashboardGrid.Item>
</DashboardGrid>`,
    props: [
      { name: 'layout', type: 'GridLayout[]', description: 'Grid layout data', required: true },
      { name: 'onLayoutChange', type: '(layout: GridLayout[]) => void', description: 'Layout change handler', required: true },
      { name: 'columns', type: 'number', default: '12', description: 'Grid columns' },
      { name: 'rowHeight', type: 'number', default: '80', description: 'Row height in pixels' },
      { name: 'gap', type: 'number', default: '16', description: 'Gap between items' },
    ],
  },

  // ═══ Wave 8A — Display + Interaction ═══

  'stat': {
    slug: 'stat',
    name: 'Stat',
    description: 'Formatted statistic display with optional unit, delta, and size presets.',
    category: 'components',
    usage: `import { Stat } from '@ramtt/ui'

<Stat value={285} unit="W" label="FTP" />
<Stat value={3600} format="time" label="Duration" delta="+5%" deltaColor="positive" />`,
    props: [
      { name: 'value', type: 'number | string', description: 'Stat value', required: true },
      { name: 'unit', type: 'string', description: 'Unit suffix' },
      { name: 'label', type: 'string', description: 'Label text' },
      { name: 'format', type: "'number' | 'time' | 'percent' | 'compact'", default: "'number'", description: 'Value format' },
      { name: 'delta', type: 'number | string', description: 'Change value' },
      { name: 'deltaColor', type: "'positive' | 'negative' | 'default'", default: "'default'", description: 'Delta color' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Size preset' },
    ],
  },

  'comparison-card': { slug: 'comparison-card', name: 'ComparisonCard', description: 'Side-by-side comparison table with columns and rows.', category: 'components', usage: `import { ComparisonCard } from '@ramtt/ui'\n\n<ComparisonCard title="Plan comparison" columns={cols} rows={rows} />`, props: [{ name: 'title', type: 'string', description: 'Card title', required: true }, { name: 'columns', type: 'ComparisonColumn[]', description: 'Column definitions', required: true }, { name: 'rows', type: 'ComparisonRow[]', description: 'Row data', required: true }] },

  'timeline-strip': { slug: 'timeline-strip', name: 'TimelineStrip', description: 'Horizontal timeline bar with markers and zones.', category: 'components', usage: `import { TimelineStrip } from '@ramtt/ui'\n\n<TimelineStrip duration={3600} unit="s" markers={markers} />`, props: [{ name: 'duration', type: 'number', description: 'Total duration', required: true }, { name: 'markers', type: 'TimelineMarker[]', description: 'Position markers', required: true }, { name: 'zones', type: 'TimelineZone[]', description: 'Colored zones' }, { name: 'height', type: 'number', default: '48', description: 'Strip height' }] },

  'range-slider': { slug: 'range-slider', name: 'RangeSlider', description: 'Dual-thumb range slider for selecting a value range.', category: 'components', usage: `import { RangeSlider } from '@ramtt/ui'\n\n<RangeSlider min={0} max={100} value={[20, 80]} onChange={setRange} />`, props: [{ name: 'min', type: 'number', description: 'Minimum value', required: true }, { name: 'max', type: 'number', description: 'Maximum value', required: true }, { name: 'value', type: '[number, number]', description: 'Selected range', required: true }, { name: 'onChange', type: '(value: [number, number]) => void', description: 'Change handler', required: true }, { name: 'step', type: 'number', default: '1', description: 'Step increment' }] },

  'form-field': { slug: 'form-field', name: 'FormField', description: 'Form field wrapper with label, description, error message, and required indicator.', category: 'components', usage: `import { FormField } from '@ramtt/ui'\n\n<FormField label="Email" required error="Invalid email">\n  <Input type="email" />\n</FormField>`, props: [{ name: 'label', type: 'string', description: 'Field label', required: true }, { name: 'required', type: 'boolean', description: 'Required indicator' }, { name: 'description', type: 'string', description: 'Help text' }, { name: 'error', type: 'string', description: 'Error message' }, { name: 'children', type: 'ReactNode', description: 'Input element', required: true }] },

  'notification-badge': { slug: 'notification-badge', name: 'NotificationBadge', description: 'Badge overlay for showing notification counts on icons or avatars.', category: 'components', usage: `import { NotificationBadge } from '@ramtt/ui'\n\n<NotificationBadge count={5}>\n  <IconBell />\n</NotificationBadge>`, props: [{ name: 'count', type: 'number', description: 'Notification count' }, { name: 'dot', type: 'boolean', default: 'false', description: 'Show dot instead of count' }, { name: 'max', type: 'number', default: '99', description: 'Maximum display count' }, { name: 'children', type: 'ReactNode', description: 'Element to decorate', required: true }] },

  // ═══ Wave 8B — Compound Components ═══

  'chart-card': { slug: 'chart-card', name: 'ChartCard', description: 'Card pre-configured for charts with title, period selector, metric, and legend.', category: 'components', usage: `import { ChartCard } from '@ramtt/ui'\n\n<ChartCard title="Revenue" periods={['7d','30d','90d']}>\n  <Chart />\n</ChartCard>`, props: [{ name: 'title', type: 'string', description: 'Chart title', required: true }, { name: 'periods', type: 'string[]', description: 'Period selector options' }, { name: 'period', type: 'string', description: 'Active period' }, { name: 'onPeriodChange', type: '(period: string) => void', description: 'Period change handler' }, { name: 'children', type: 'ReactNode', description: 'Chart content', required: true }] },

  'leaderboard': { slug: 'leaderboard', name: 'Leaderboard', description: 'Ranked list with optional progress bars.', category: 'components', usage: `import { Leaderboard } from '@ramtt/ui'\n\n<Leaderboard items={[{ name: 'Malte', value: 285, unit: 'W' }]} />`, props: [{ name: 'items', type: 'LeaderboardItem[]', description: 'Ranked items', required: true }, { name: 'title', type: 'string', description: 'Title' }, { name: 'showRank', type: 'boolean', default: 'true', description: 'Show rank numbers' }, { name: 'showBars', type: 'boolean', default: 'true', description: 'Show progress bars' }] },

  'member-list': { slug: 'member-list', name: 'MemberList', description: 'Team member list with roles and actions.', category: 'components', usage: `import { MemberList } from '@ramtt/ui'\n\n<MemberList members={members} roles={['Admin','Member']} />`, props: [{ name: 'members', type: 'Member[]', description: 'Member data', required: true }, { name: 'roles', type: 'string[]', description: 'Available roles' }, { name: 'onRoleChange', type: '(id: string, role: string) => void', description: 'Role change handler' }, { name: 'onRemove', type: '(id: string) => void', description: 'Remove handler' }] },

  'invite-card': { slug: 'invite-card', name: 'InviteCard', description: 'Email invitation form with role selector.', category: 'components', usage: `import { InviteCard } from '@ramtt/ui'\n\n<InviteCard onInvite={(email, role) => invite(email, role)} />`, props: [{ name: 'onInvite', type: '(emails, role) => void', description: 'Invite handler', required: true }, { name: 'roles', type: 'string[]', description: 'Available roles' }, { name: 'title', type: 'string', default: "'Invite team member'", description: 'Card title' }] },

  'onboarding-layout': { slug: 'onboarding-layout', name: 'OnboardingLayout', description: 'Multi-step onboarding wizard with progress and back/next navigation.', category: 'components', usage: `import { OnboardingLayout } from '@ramtt/ui'\n\n<OnboardingLayout steps={steps} onComplete={finish} />`, props: [{ name: 'steps', type: 'OnboardingStep[]', description: 'Step definitions', required: true }, { name: 'onComplete', type: '() => void', description: 'Completion handler', required: true }, { name: 'allowBack', type: 'boolean', default: 'true', description: 'Allow back navigation' }, { name: 'showProgress', type: 'boolean', default: 'true', description: 'Show progress bar' }] },

  'notification-preferences': { slug: 'notification-preferences', name: 'NotificationPreferences', description: 'Grouped notification toggle settings.', category: 'components', usage: `import { NotificationPreferences } from '@ramtt/ui'\n\n<NotificationPreferences groups={groups} onChange={handleToggle} />`, props: [{ name: 'groups', type: 'NotificationGroup[]', description: 'Notification groups', required: true }, { name: 'onChange', type: '(id: string, enabled: boolean) => void', description: 'Toggle handler', required: true }] },

  // ═══ Wave 8C — Utility Components ═══

  'todo-list': { slug: 'todo-list', name: 'TodoList', description: 'Checklist with add/remove and optional progress tracking.', category: 'components', usage: `import { TodoList } from '@ramtt/ui'\n\n<TodoList items={items} onToggle={toggle} onAdd={add} showProgress />`, props: [{ name: 'items', type: 'TodoItem[]', description: 'Todo items', required: true }, { name: 'onToggle', type: '(id: string) => void', description: 'Toggle handler', required: true }, { name: 'onAdd', type: '(text: string) => void', description: 'Add handler' }, { name: 'showProgress', type: 'boolean', default: 'false', description: 'Show completion progress' }] },

  'help-section': { slug: 'help-section', name: 'HelpSection', description: 'FAQ / help accordion with search and grouping.', category: 'components', usage: `import { HelpSection } from '@ramtt/ui'\n\n<HelpSection items={faqItems} searchable />`, props: [{ name: 'items', type: 'HelpItem[]', description: 'Help items', required: true }, { name: 'searchable', type: 'boolean', default: 'false', description: 'Enable search' }, { name: 'grouped', type: 'boolean', description: 'Group by category' }] },

  'field-mapping': { slug: 'field-mapping', name: 'FieldMapping', description: 'Visual source-to-target field mapper.', category: 'components', usage: `import { FieldMapping } from '@ramtt/ui'\n\n<FieldMapping mappings={mappings} availableTargets={targets} />`, props: [{ name: 'mappings', type: 'FieldMappingItem[]', description: 'Current mappings', required: true }, { name: 'availableTargets', type: 'string[]', description: 'Available target fields' }, { name: 'sourceLabel', type: 'string', default: "'Source'", description: 'Source column label' }, { name: 'targetLabel', type: 'string', default: "'Target'", description: 'Target column label' }] },

  // ═══ Wave 8D — Layout & Form Patterns ═══

  'description-list': { slug: 'description-list', name: 'DescriptionList', description: 'Key–value list for displaying details. Supports striped and card variants.', category: 'components', usage: `import { DescriptionList } from '@ramtt/ui'\n\n<DescriptionList items={[{ label: 'FTP', value: '285 W' }]} />`, props: [{ name: 'items', type: 'DescriptionItem[]', description: 'List items', required: true }, { name: 'variant', type: "'default' | 'striped' | 'card'", default: "'default'", description: 'Visual style' }, { name: 'columns', type: '1 | 2', default: '1', description: 'Number of columns' }] },

  'feed': { slug: 'feed', name: 'Feed', description: 'Activity feed timeline with connected dots and content.', category: 'components', usage: `import { Feed } from '@ramtt/ui'\n\n<Feed items={activities} showLine />`, props: [{ name: 'items', type: 'FeedItem[]', description: 'Feed items', required: true }, { name: 'showLine', type: 'boolean', default: 'true', description: 'Show connecting line' }] },

  'action-panel': { slug: 'action-panel', name: 'ActionPanel', description: 'Form action bar with save/cancel and optional danger mode.', category: 'components', usage: `import { ActionPanel } from '@ramtt/ui'\n\n<ActionPanel onSave={save} onCancel={cancel} />`, props: [{ name: 'onSave', type: '() => void', description: 'Save handler' }, { name: 'onCancel', type: '() => void', description: 'Cancel handler' }, { name: 'danger', type: 'boolean', default: 'false', description: 'Destructive action styling' }, { name: 'saving', type: 'boolean', default: 'false', description: 'Loading state' }] },

  'grid-list': { slug: 'grid-list', name: 'GridList', description: 'Responsive grid layout for cards and items.', category: 'components', usage: `import { GridList } from '@ramtt/ui'\n\n<GridList columns={3}>\n  <GridList.Card>Item 1</GridList.Card>\n  <GridList.Card>Item 2</GridList.Card>\n</GridList>`, props: [{ name: 'columns', type: '2 | 3 | 4', default: '3', description: 'Column count' }, { name: 'gap', type: "'sm' | 'md' | 'lg'", default: "'md'", description: 'Gap size' }, { name: 'children', type: 'ReactNode', description: 'Grid items', required: true }] },

  'media-object': { slug: 'media-object', name: 'MediaObject', description: 'Icon/avatar + text layout pattern for lists and feeds.', category: 'components', usage: `import { MediaObject } from '@ramtt/ui'\n\n<MediaObject title="Session uploaded" description="2h ago" avatar="/me.jpg" />`, props: [{ name: 'title', type: 'string', description: 'Title text', required: true }, { name: 'description', type: 'string', description: 'Description text' }, { name: 'icon', type: 'ReactNode', description: 'Leading icon' }, { name: 'avatar', type: 'string', description: 'Avatar image URL' }, { name: 'action', type: 'ReactNode', description: 'Action element' }] },

  'form-layout': { slug: 'form-layout', name: 'FormLayout', description: 'Form layout with sections. Compound: FormLayout, Section, Field.', category: 'components', usage: `import { FormLayout } from '@ramtt/ui'\n\n<FormLayout>\n  <FormLayout.Section title="Profile">\n    <FormLayout.Field label="Name">\n      <Input />\n    </FormLayout.Field>\n  </FormLayout.Section>\n</FormLayout>`, props: [{ name: 'maxWidth', type: 'string', default: "'600px'", description: 'Maximum form width' }, { name: 'children', type: 'ReactNode', description: 'FormLayout.Section elements', required: true }] },

  'button-group': { slug: 'button-group', name: 'ButtonGroup', description: 'Connected button group for related actions.', category: 'components', usage: `import { ButtonGroup } from '@ramtt/ui'\n\n<ButtonGroup>\n  <Button>Save</Button>\n  <Button variant="outline">Cancel</Button>\n</ButtonGroup>`, props: [{ name: 'children', type: 'ReactNode', description: 'Button elements', required: true }] },

  'auth-layout': { slug: 'auth-layout', name: 'AuthLayout', description: 'Centered authentication page layout. Compound: AuthLayout, Divider, Footer.', category: 'components', usage: `import { AuthLayout } from '@ramtt/ui'\n\n<AuthLayout title="Sign in">\n  <Input label="Email" />\n  <Button>Continue</Button>\n  <AuthLayout.Divider />\n  <Button variant="outline">Google</Button>\n</AuthLayout>`, props: [{ name: 'title', type: 'string', description: 'Page title', required: true }, { name: 'subtitle', type: 'string', description: 'Subtitle text' }, { name: 'logo', type: 'ReactNode', description: 'Logo element' }, { name: 'children', type: 'ReactNode', description: 'Form content', required: true }] },
}

// ─── Lookup helpers ───

export function getComponentDoc(slug: string): ComponentDoc | undefined {
  return COMPONENT_DOCS[slug]
}

export function getAllComponentSlugs(): string[] {
  return Object.keys(COMPONENT_DOCS)
}
