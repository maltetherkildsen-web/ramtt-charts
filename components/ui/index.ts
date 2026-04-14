// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

// components/ui/index.ts — PUBLIC API of @ramtt/ui

// ─── Components (Wave 1 — Display & Input) ───
export { Button } from './Button';
export { Badge } from './Badge';
export { ToggleGroup } from './ToggleGroup';
export { Card } from './Card';
export { DataRow } from './DataRow';
export { DataTable } from './DataTable';
export { Input } from './Input';
export { Select } from './Select';
export { MetricCard } from './MetricCard';
export { SettingsCard } from './SettingsCard';
export { ProgressBar } from './ProgressBar';
export { SectionHeader } from './SectionHeader';

// ─── Components (Wave 2 — Interaction Layer) ───
export { Modal } from './Modal';
export { ToastProvider, useToast } from './Toast';
export { Dropdown } from './Dropdown';
export { Tabs } from './Tabs';
export { Skeleton } from './Skeleton';
export { Switch } from './Switch';

// ─── Components (Wave 3 — Polish & Navigation) ───
export { Tooltip } from './Tooltip';
export { Accordion } from './Accordion';
export { Slider } from './Slider';
export { Avatar } from './Avatar';
export { EmptyState } from './EmptyState';
export { Breadcrumb } from './Breadcrumb';

// ─── Components (Wave 4 — App-Specific) ───
export { Sidebar } from './Sidebar';
export { PageHeader } from './PageHeader';
export { Textarea } from './Textarea';
export { Checkbox } from './Checkbox';
export { Radio } from './Radio';
export { FileUpload } from './FileUpload';
export { Tag } from './Tag';
export { Gauge } from './Gauge';

// ─── Components (Wave 5 — Full Parity + Beyond) ───
export { Calendar } from './Calendar';
export { DatePicker } from './DatePicker';
export { Popover } from './Popover';
export { Command } from './Command';
export { Pagination } from './Pagination';
export { Drawer } from './Drawer';
export { Spinner } from './Spinner';
export { Kbd } from './Kbd';
export { Alert } from './Alert';
export { Combobox } from './Combobox';

// ─── Components (Wave 6 — Final Parity) ───
export { Separator } from './Separator';
export { Label } from './Label';
export { Collapsible } from './Collapsible';
export { InputGroup } from './InputGroup';
export { ScrollArea } from './ScrollArea';
export { HoverCard } from './HoverCard';
export { Resizable } from './Resizable';
export { ContextMenu } from './ContextMenu';

// ─── Components (Wave 7A — Atomic Display + Input) ───
export { ColorDot } from './ColorDot';
export { StatusIndicator } from './StatusIndicator';
export { SegmentedBar } from './SegmentedBar';
export { NumberStepper } from './NumberStepper';

// ─── Components (Wave 7B — Input Patterns) ───
export { RatingInput } from './RatingInput';
export { TimePicker } from './TimePicker';
export { StepFlow } from './StepFlow';

// ─── Components (Wave 7C — Widget System) ───
export { WidgetCard } from './WidgetCard';
export { WidgetPicker } from './WidgetPicker';
export { DashboardGrid } from './DashboardGrid';

// ─── Components (Wave 8A — Display + Interaction) ───
export { Stat } from './Stat';
export { ComparisonCard } from './ComparisonCard';
export { TimelineStrip } from './TimelineStrip';
export { RangeSlider } from './RangeSlider';
export { FormField } from './FormField';
export { NotificationBadge } from './NotificationBadge';

// ─── Components (Wave 8B — Compound Components) ───
export { ChartCard } from './ChartCard';
export { Leaderboard } from './Leaderboard';
export { MemberList } from './MemberList';
export { InviteCard } from './InviteCard';
export { OnboardingLayout } from './OnboardingLayout';
export { NotificationPreferences } from './NotificationPreferences';

// ─── Components (Wave 8C — Utility Components) ───
export { TodoList } from './TodoList';
export { HelpSection } from './HelpSection';
export { FieldMapping } from './FieldMapping';

// ─── Components (Wave 8D — Layout & Form Patterns) ───
export { DescriptionList } from './DescriptionList';
export { Feed } from './Feed';
export { ActionPanel } from './ActionPanel';
export { GridList } from './GridList';
export { MediaObject } from './MediaObject';
export { FormLayout } from './FormLayout';
export { ButtonGroup } from './ButtonGroup';
export { AuthLayout } from './AuthLayout';

// ─── Utilities (for building custom components with the same system) ───
export { cn, FONT, WEIGHT, LABEL_STYLE, VALUE_STYLE, MUTED_STYLE, BODY_STYLE, QUIET_STYLE, UNIT_STYLE } from '@/lib/ui';
export { BORDER, RADIUS, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X } from '@/lib/ui';
export { HOVER_SAND, ACTIVE_SAND, ACTIVE_BLACK, WHITE_LIFT, ACTIVE_UNDERLINE, FOCUS_RING, FOCUS_RING_THICK, FOCUS_RING_THIN, TRANSITION } from '@/lib/ui';
export { LAYOUT, MODAL_WIDTH, TOAST_MAX_VISIBLE, TOAST_DEFAULT_DURATION, DROPDOWN_ITEM, SWITCH_TRACK, SWITCH_THUMB } from '@/lib/ui';
export { TOOLTIP_BG, TOOLTIP_TEXT, TOOLTIP_RADIUS, TOOLTIP_PADDING, SLIDER_TRACK_HEIGHT, SLIDER_THUMB_SIZE, AVATAR_SIZES } from '@/lib/ui';
export { SIDEBAR_WIDTH, SIDEBAR_ITEM_STYLE, SIDEBAR_ITEM_ACTIVE, GAUGE_SIZES } from '@/lib/ui';
export { CALENDAR_CELL_SIZE, CALENDAR_WEEK_STARTS_ON, PAGE_BUTTON_SIZE, PAGE_BUTTON_ACTIVE, DRAWER_WIDTHS, SPINNER_SIZES } from '@/lib/ui';
export { SEPARATOR_DEFAULT, SEPARATOR_SUBTLE, SCROLLBAR_WIDTH, SCROLLBAR_THUMB_MIN, SCROLLBAR_THUMB_COLOR, SCROLLBAR_THUMB_HOVER, SCROLLBAR_THUMB_ACTIVE } from '@/lib/ui';
export { DOT_SIZES, STEPPER_BUTTON_WIDTH, STEPPER_REPEAT_DELAY, STEPPER_REPEAT_INTERVAL } from '@/lib/ui';
export { STEP_DOT_SIZE, STEP_DOT_COMPLETED, STEP_DOT_UPCOMING, RATING_SEGMENT_SIZE } from '@/lib/ui';
export { WIDGET_ICON_SIZE, WIDGET_ICON_COLOR, WIDGET_ICON_HOVER, GRID_COLUMNS, GRID_ROW_HEIGHT, GRID_GAP } from '@/lib/ui';
export { STAT_SIZES, BADGE_NOTIFY_SIZE, BADGE_NOTIFY_DOT, BADGE_NOTIFY_MAX } from '@/lib/ui';
export { formatTime, formatPercent, formatCompact } from '@/lib/ui';

// ─── Types ───
export type { Size, SemanticColor, BaseComponentProps, InteractiveProps, LabelledProps, ColoredProps } from '@/types/ui';
