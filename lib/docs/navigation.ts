// lib/docs/navigation.ts — Sidebar navigation structure
// Generated from actual codebase inventory (83 UI components, ~16 chart types, 126 icons)

export interface NavItem {
  label: string
  href: string
  badge?: string
}

export interface NavSection {
  title: string
  items: NavItem[]
}

// ─── Helpers ───

function toSlug(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
    .toLowerCase()
}

function toLabel(name: string): string {
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
    .replace(/^./, (c) => c.toUpperCase())
}

// ─── Component inventory (from components/ui/index.ts barrel export) ───

export const UI_COMPONENTS = [
  // Wave 1 — Display & Input
  'Button', 'Badge', 'ToggleGroup', 'Card', 'DataRow', 'DataTable',
  'Input', 'Select', 'MetricCard', 'SettingsCard', 'ProgressBar', 'SectionHeader',
  // Wave 2 — Interaction Layer
  'Modal', 'Toast', 'Dropdown', 'Tabs', 'Skeleton', 'Switch',
  // Wave 3 — Polish & Navigation
  'Tooltip', 'Accordion', 'Slider', 'Avatar', 'EmptyState', 'Breadcrumb',
  // Wave 4 — App-Specific
  'Sidebar', 'PageHeader', 'Textarea', 'Checkbox', 'Radio', 'FileUpload', 'Tag', 'Gauge',
  // Wave 5 — Full Parity + Beyond
  'Calendar', 'DatePicker', 'Popover', 'Command', 'Pagination', 'Drawer', 'Spinner', 'Kbd', 'Alert', 'Combobox',
  // Wave 6 — Final Parity
  'Separator', 'Label', 'Collapsible', 'InputGroup', 'ScrollArea', 'HoverCard', 'Resizable', 'ContextMenu',
  // Wave 7A — Atomic Display + Input
  'ColorDot', 'StatusIndicator', 'SegmentedBar', 'NumberStepper',
  // Wave 7B — Input Patterns
  'RatingInput', 'TimePicker', 'StepFlow',
  // Wave 7C — Widget System
  'WidgetCard', 'WidgetPicker', 'DashboardGrid',
  // Wave 8A — Display + Interaction
  'Stat', 'ComparisonCard', 'TimelineStrip', 'RangeSlider', 'FormField', 'NotificationBadge',
  // Wave 8B — Compound Components
  'ChartCard', 'Leaderboard', 'MemberList', 'InviteCard', 'OnboardingLayout', 'NotificationPreferences',
  // Wave 8C — Utility Components
  'TodoList', 'HelpSection', 'FieldMapping',
  // Wave 8D — Layout & Form Patterns
  'DescriptionList', 'Feed', 'ActionPanel', 'GridList', 'MediaObject', 'FormLayout', 'ButtonGroup', 'AuthLayout',
] as const

// ─── Chart type inventory (user-facing chart types from components/charts/primitives/) ───

export const CHART_TYPES = [
  { name: 'ChartLine', label: 'Line chart' },
  { name: 'ChartArea', label: 'Area chart' },
  { name: 'ChartBar', label: 'Bar chart' },
  { name: 'ChartZoneLine', label: 'Zone line' },
  { name: 'ChartScatter', label: 'Scatter plot' },
  { name: 'ChartDonut', label: 'Donut chart' },
  { name: 'ChartCandlestick', label: 'Candlestick' },
  { name: 'ChartRadar', label: 'Radar chart' },
  { name: 'ChartRadialBar', label: 'Radial bar' },
  { name: 'ChartTreemap', label: 'Treemap' },
  { name: 'ChartFunnel', label: 'Funnel' },
  { name: 'ChartBoxPlot', label: 'Box plot' },
  { name: 'ChartHeatmap', label: 'Heatmap' },
  { name: 'ChartCalendarHeatmap', label: 'Calendar heatmap' },
  { name: 'ChartFuelLollipop', label: 'Fuel lollipop' },
  { name: 'ChartAnnotation', label: 'Annotation' },
] as const

// ─── Build navigation ───

export const DOCS_NAV: NavSection[] = [
  {
    title: '',
    items: [
      { label: 'Overview', href: '/' },
      { label: 'Getting started', href: '/getting-started' },
    ],
  },
  {
    title: 'Foundations',
    items: [
      { label: 'Tokens', href: '/tokens' },
    ],
  },
  {
    title: 'Components',
    items: [...UI_COMPONENTS]
      .sort((a, b) => a.localeCompare(b))
      .map((name) => ({
        label: toLabel(name),
        href: `/components/${toSlug(name)}`,
      })),
  },
  {
    title: 'Charts',
    items: CHART_TYPES.map(({ name, label }) => ({
      label,
      href: `/charts/${toSlug(name.replace('Chart', ''))}`,
    })),
  },
  {
    title: '',
    items: [
      { label: 'Icons', href: '/icons' },
      { label: 'Patterns', href: '/patterns' },
    ],
  },
]

export { toSlug, toLabel }
