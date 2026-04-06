// components/ui/index.ts — PUBLIC API of @ramtt/ui

// ─── Components ───
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

// ─── Utilities (for building custom components with the same system) ───
export { cn, FONT, LABEL_STYLE, VALUE_STYLE, MUTED_STYLE, BODY_STYLE, QUIET_STYLE } from '@/lib/ui';
export { BORDER, RADIUS, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X } from '@/lib/ui';
export { HOVER_SAND, ACTIVE_SAND, ACTIVE_BLACK, WHITE_LIFT, ACTIVE_UNDERLINE, FOCUS_RING, TRANSITION } from '@/lib/ui';
export { LAYOUT } from '@/lib/ui';

// ─── Types ───
export type { Size, SemanticColor, BaseComponentProps, InteractiveProps, LabelledProps, ColoredProps } from '@/types/ui';
