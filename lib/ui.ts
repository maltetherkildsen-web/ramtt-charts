// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

// lib/ui.ts — The foundation of @ramtt/ui

/** Merge class names, filtering out falsy values. Zero-dependency alternative to clsx. */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}

// ─── Size Scale ───
// Every component with a "size" prop uses these exact values.
// Change them here = changes everywhere.

export const SIZE_HEIGHTS = {
  xs: 'h-[18px]',  // 18px — badges (Figma-calibrated)
  sm: 'h-7',       // 28px — small buttons, small toggles
  md: 'h-8',       // 32px — default buttons, inputs, selects, toggles
  lg: 'h-9',       // 36px — large buttons
} as const;

export const SIZE_TEXT = {
  xs: 'text-[11px]',  // 11px — badges (Figma-calibrated)
  sm: 'text-[12px]',
  md: 'text-[13px]',
  lg: 'text-[14px]',
} as const;

export const SIZE_PADDING_X = {
  xs: 'px-1.5',   // 6px
  sm: 'px-2.5',   // 10px
  md: 'px-3.5',   // 14px
  lg: 'px-[18px]', // 18px
} as const;

export type Size = keyof typeof SIZE_HEIGHTS;

// ─── Font Weight Scale ───
// Figma's hierarchy: weight communicates IMPORTANCE, not just visual size.
export const WEIGHT = {
  /** Standard text — list items, body text, input text */
  normal: 'font-normal',        // 400
  /** Secondary UI — metadata, units, filter dropdowns, descriptions, sidebar nav items */
  book: 'font-[450]',           // 450 — between regular and medium. Satoshi 450 ≈ Inter 400 optically.
  /** Badges, medium emphasis, form labels */
  medium: 'font-medium',        // 500
  /** Strong emphasis — section headers, active tabs, card titles, values */
  strong: 'font-[550]',         // 550 — between medium and semibold
} as const;

// ─── Radius Scale ───
export const RADIUS = {
  sm: 'rounded-[4px]',   // badges, small pills
  md: 'rounded-[5px]',   // buttons, inputs, toggles — THE DEFAULT
  lg: 'rounded-[12px]',  // cards, panels (Figma-calibrated)
  xl: 'rounded-[16px]',  // modals, large containers
  full: 'rounded-full',  // avatars, circular badges
} as const;

export type Radius = keyof typeof RADIUS;

// ─── Semantic Colors ───
export const SEMANTIC_COLORS = {
  default: '',
  positive: 'positive',
  negative: 'negative',
  warning: 'warning',
  info: 'info',
} as const;

export type SemanticColor = keyof typeof SEMANTIC_COLORS;

// ─── Category Colors ───
// Content-type identity (5 types). Used by CategoryIcon and content cards.
export const CATEGORY_COLORS = {
  session: 'var(--cat-session)',
  plan: 'var(--cat-plan)',
  analysis: 'var(--cat-analysis)',
  nutrition: 'var(--cat-nutrition)',
  coaching: 'var(--cat-coaching)',
} as const;

export type CategoryType = keyof typeof CATEGORY_COLORS;

// ─── Dark Surface ───
// Use --n1100 for dark surface backgrounds (code blocks, toasts, dark panels).
// --n1150 stays for primary text and button fills.
export const N1100 = 'var(--n1100)';

// ─── Dark Surface Tokens ───
// For components on dark backgrounds (footer, overlays, dark bars).
// NOT dark mode — just dark SURFACES. The system self-inverts: --dark-text = --bg.
export const DARK = {
  BG: 'var(--dark-bg)',
  TEXT: 'var(--dark-text)',
  MUTED: 'var(--dark-muted)',
  BORDER: 'var(--dark-border)',
  HOVER: 'var(--dark-hover)',
} as const;

// ─── Font Classes ───
// No component should ever hardcode a font-family — use these.
export const FONT = {
  /** Body text, descriptions, UI copy — Satoshi */
  body: "font-[family-name:var(--font-sans)]",
  /** Labels AND numbers/values — Satoshi (same font, kept for semantic clarity) */
  label: "font-[family-name:var(--font-label)]",
  /** Editorial only, never in app UI — Cormorant Garamond */
  serif: "font-[family-name:var(--font-serif)]",
} as const;

// ─── Composed Text Styles ───
// Pre-composed styles for common text patterns. Use these, don't reinvent.

/** Section headers, field labels — Satoshi, 11px, weight 550, muted */
export const LABEL_STYLE = `${FONT.body} text-[11px] ${WEIGHT.strong} text-[var(--n600)]`;

/** Numeric values, stats, prices — Satoshi, tabular nums, weight 550 */
export const VALUE_STYLE = `${FONT.body} tabular-nums ${WEIGHT.strong}`;

/** Body text, descriptions — Satoshi, weight 400, primary color */
export const BODY_STYLE = `${FONT.body} text-[var(--n1150)] ${WEIGHT.normal}`;

/** Secondary/muted text — Satoshi, weight 450, muted color */
export const MUTED_STYLE = `${FONT.body} text-[var(--n800)] ${WEIGHT.book}`;

/** Quiet/placeholder text — Satoshi, weight 400, quiet color */
export const QUIET_STYLE = `${FONT.body} text-[var(--n600)] ${WEIGHT.normal}`;

/** Unit suffixes ("W", "BPM", "kJ") — Satoshi, weight 450, muted color */
export const UNIT_STYLE = `${FONT.body} text-[var(--n800)] ${WEIGHT.book}`;

// ─── Border ───
// Two levels. Nothing else. All borders are 0.5px warm sand.
export const BORDER = {
  /** Between rows, subtle separators — barely visible */
  subtle: 'border-[0.5px] border-[var(--n200)]',
  /** Card borders, input borders, dividers — visible but calm */
  default: 'border-[0.5px] border-[var(--n400)]',
} as const;

// ─── Transition ───
// NEVER use transition-all. Specify exact properties.
export const TRANSITION = {
  colors: 'transition-colors duration-150',
  background: 'transition-[background-color] duration-150',
  opacity: 'transition-opacity duration-150',
  transform: 'transition-transform duration-150',
} as const;

// ─── Interactive States ───
// Six patterns. Every interactive element uses one of these. No exceptions.
export const HOVER_SAND = 'hover:bg-[var(--n200)]';           // rows, ghost buttons
export const ACTIVE_SAND = 'bg-[var(--n400)]';                // selected toggles, filters
export const SELECTION_SAND = 'bg-(--n600)/15';                // brush/selection overlays on charts
export const ACTIVE_BLACK = 'bg-[var(--n1150)] text-[var(--n50)]'; // primary CTA only
export const WHITE_LIFT = 'hover:bg-white';                   // cards on sand background
export const ACTIVE_UNDERLINE = 'border-b-2 border-[var(--n1150)]'; // tab navigation

// ─── Focus ring ───
// Two-tier system: thick ring for buttons/toggles, thin ring for inputs/selects.

/** Thick ring — buttons, toggles, cards, large interactive areas.
 *  Uses box-shadow with offset: 2px bg gap + 2px --n600 ring.
 *  Follows border-radius perfectly. ONLY on :focus-visible. */
export const FOCUS_RING = 'focus-visible:shadow-[0_0_0_2px_var(--bg),0_0_0_4px_var(--n600)] focus-visible:outline-none';
export const FOCUS_RING_THICK = FOCUS_RING;

/** Thin ring — inputs, selects, textareas, inline controls.
 *  Subtle border-color shift from --n400 → --n800. No box-shadow. */
export const FOCUS_RING_THIN = 'focus-visible:border-[var(--n800)] focus-visible:outline-none';

/** For compound inputs where the CONTAINER needs the ring when a child is focused */
export const FOCUS_WITHIN_RING = 'focus-within:shadow-[0_0_0_2px_var(--bg),0_0_0_4px_var(--n600)]';

// ─── Modal ───
export const MODAL_WIDTH = {
  sm: 'max-w-[400px]',
  md: 'max-w-[520px]',
  lg: 'max-w-[640px]',
} as const;

// ─── Toast ───
export const TOAST_MAX_VISIBLE = 3;
export const TOAST_DEFAULT_DURATION = 4000;

// ─── Dropdown ───
export const DROPDOWN_ITEM = cn(
  'px-2.5 py-1.5',
  RADIUS.sm,
  SIZE_TEXT.md,
  WEIGHT.normal,
  'text-[var(--n1150)]',
);

// ─── Switch ───
export const SWITCH_TRACK = { width: 36, height: 20, radius: 10 } as const;
export const SWITCH_THUMB = { size: 16, inset: 2 } as const;

// ─── Tooltip ───
export const TOOLTIP_BG = 'bg-[var(--n1100)]';
export const TOOLTIP_TEXT = 'text-[var(--n50)] text-[12px] font-[400]';
export const TOOLTIP_RADIUS = 'rounded-[6px]';
export const TOOLTIP_PADDING = 'px-2 py-1';

// ─── Slider ───
export const SLIDER_TRACK_HEIGHT = 4;
export const SLIDER_THUMB_SIZE = 16;

// ─── Avatar ───
export const AVATAR_SIZES = {
  sm: 24,
  md: 32,
  lg: 40,
} as const;

// ─── Sidebar ───
export const SIDEBAR_WIDTH = { expanded: 240, collapsed: 56 } as const;

/** Sidebar nav items — ALL states have identical text styling.
 *  Active state adds background only — no weight or color change.
 *  Satoshi 450 ≈ Inter 400 optically (verified via Figma getComputedStyle). */
export const NAV_ITEM_STYLE = 'px-3 py-2 rounded-[6px] text-[11px] font-[450] text-[var(--n1150)]';
export const NAV_ITEM_ACTIVE_BG = 'bg-[var(--n200)]';

/** Nav item icons — Light variant: 18px, stroke-width 1.25, 14px gap to text.
 *  Use [&_svg]:[stroke-width:1.25] wrapper until proper Light icon variant ships. */
export const NAV_ICON = { size: 18, strokeWidth: 1.25, gap: 'gap-3.5' } as const;

/** @deprecated Use NAV_ITEM_STYLE + NAV_ITEM_ACTIVE_BG instead */
export const SIDEBAR_ITEM_STYLE = NAV_ITEM_STYLE;
/** @deprecated Use NAV_ITEM_ACTIVE_BG instead */
export const SIDEBAR_ITEM_ACTIVE = NAV_ITEM_ACTIVE_BG;

// ─── Gauge ───
export const GAUGE_SIZES = { sm: 64, md: 96, lg: 128 } as const;

// ─── Calendar ───
export const CALENDAR_CELL_SIZE = 36;
export const CALENDAR_WEEK_STARTS_ON = 1; // Monday

// ─── Pagination ───
export const PAGE_BUTTON_SIZE = 'w-8 h-8';
export const PAGE_BUTTON_ACTIVE = 'bg-[var(--n1150)] text-[var(--n50)] font-[550]';

// ─── Drawer ───
export const DRAWER_WIDTHS = { sm: 320, md: 420, lg: 560 } as const;

// ─── Spinner ───
export const SPINNER_SIZES = { sm: 14, md: 18, lg: 24 } as const;

// ─── Separator ───
export const SEPARATOR_DEFAULT = 'bg-[var(--n400)]'
export const SEPARATOR_SUBTLE = 'bg-[var(--n200)]'

// ─── Scrollbar ───
export const SCROLLBAR_WIDTH = 6
export const SCROLLBAR_THUMB_MIN = 30
export const SCROLLBAR_THUMB_COLOR = 'var(--n600)'
export const SCROLLBAR_THUMB_HOVER = 'var(--n800)'
export const SCROLLBAR_THUMB_ACTIVE = 'var(--n1050)'

// ─── ColorDot ───
export const DOT_SIZES = { sm: 6, md: 8, lg: 10 } as const

// ─── NumberStepper ───
export const STEPPER_BUTTON_WIDTH = 32
export const STEPPER_REPEAT_DELAY = 500
export const STEPPER_REPEAT_INTERVAL = 100

// ─── StepFlow ───
export const STEP_DOT_SIZE = 8
export const STEP_DOT_COMPLETED = 'bg-[var(--n1150)]'
export const STEP_DOT_UPCOMING = 'bg-[var(--n400)]'

// ─── RatingInput ───
export const RATING_SEGMENT_SIZE = { default: 28, compact: 20 } as const

// ─── WidgetCard ───
export const WIDGET_ICON_SIZE = 14
export const WIDGET_ICON_COLOR = 'text-[var(--n400)]'
export const WIDGET_ICON_HOVER = 'text-[var(--n800)]'

// ─── DashboardGrid ───
export const GRID_COLUMNS = 12
export const GRID_ROW_HEIGHT = 80
export const GRID_GAP = 16

// ─── Stat ───
export const STAT_SIZES = {
  sm: { value: 'text-[12px]', unit: 'text-[10px]' },
  md: { value: 'text-[14px]', unit: 'text-[12px]' },
  lg: { value: 'text-[20px]', unit: 'text-[16px]' },
} as const

// ─── NotificationBadge ───
export const BADGE_NOTIFY_SIZE = 16
export const BADGE_NOTIFY_DOT = 8
export const BADGE_NOTIFY_MAX = 99

// ─── Format Utilities ───

/** Format seconds to h:mm:ss or m:ss. 5280 → "1:28:00", 88 → "1:28" */
export function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = Math.floor(seconds % 60)
  if (h > 0) return `${h}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
  return `${m}:${String(s).padStart(2, '0')}`
}

/** Format ratio to percent. 0.952 → "95.2%", 1.0 → "100.0%" */
export function formatPercent(ratio: number, precision = 1): string {
  return `${(ratio * 100).toFixed(precision)}%`
}

/** Format large numbers compactly. 42350 → "42.4k", 1200000 → "1.2M" */
export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}k`
  return String(n)
}

// ─── Floating Shadow ───
// 3-layer warm shadow for floating elements ONLY (toolbar, panel, palette, dropdown).
// NEVER on regular cards or panels — those are flat.
export const FLOATING_SHADOW = '0 0 0.5px rgba(19,18,17,0.15), 0 3px 8px rgba(19,18,17,0.08), 0 1px 3px rgba(19,18,17,0.06)';

// ─── Editor Shell ───
export const PANEL_WIDTH = 240;
export const ICON_TAB_SIZE = 56;
export const TOOLBAR_BUTTON_SIZE = 32;

// ─── Layout ───
// Standard content widths for consistent alignment
export const LAYOUT = {
  /** Max content width for pages */
  maxWidth: 'max-w-[800px]',
  /** Standard horizontal padding */
  pagePadding: 'px-8',
  /** Standard section gap — flex gap for consistent visual spacing (not margin-based) */
  sectionGap: 'flex flex-col gap-10',
} as const;
