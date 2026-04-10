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

// ─── Utilities (for building custom components with the same system) ───
export { cn, FONT, WEIGHT, LABEL_STYLE, VALUE_STYLE, MUTED_STYLE, BODY_STYLE, QUIET_STYLE, UNIT_STYLE } from '@/lib/ui';
export { BORDER, RADIUS, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X } from '@/lib/ui';
export { HOVER_SAND, ACTIVE_SAND, ACTIVE_BLACK, WHITE_LIFT, ACTIVE_UNDERLINE, FOCUS_RING, FOCUS_RING_THICK, TRANSITION } from '@/lib/ui';
export { LAYOUT, MODAL_WIDTH, TOAST_MAX_VISIBLE, TOAST_DEFAULT_DURATION, DROPDOWN_ITEM, SWITCH_TRACK, SWITCH_THUMB } from '@/lib/ui';
export { TOOLTIP_BG, TOOLTIP_TEXT, TOOLTIP_RADIUS, TOOLTIP_PADDING, SLIDER_TRACK_HEIGHT, SLIDER_THUMB_SIZE, AVATAR_SIZES } from '@/lib/ui';

// ─── Types ───
export type { Size, SemanticColor, BaseComponentProps, InteractiveProps, LabelledProps, ColoredProps } from '@/types/ui';
