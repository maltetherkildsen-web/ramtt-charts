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
  /** Standard text — sidebar nav, list items, body text, input text */
  normal: 'font-normal',        // 400
  /** Secondary UI — metadata, units, filter dropdowns, descriptions */
  book: 'font-[450]',           // 450 — between regular and medium
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

// ─── Focus ───
// Visible on keyboard only. Uses :focus-visible, not :focus.
// Single color: --n1050. Two thicknesses: thin (default) and thick (text inputs).
export const FOCUS_RING = 'focus-visible:outline focus-visible:outline-1 focus-visible:outline-[var(--n1050)] focus-visible:outline-offset-2';
export const FOCUS_RING_THICK = 'focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--n1050)] focus-visible:outline-offset-2';

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
export const TOOLTIP_BG = 'bg-[var(--n1150)]';
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
export const SIDEBAR_ITEM_STYLE = 'px-3 py-2 rounded-[6px] text-[13px] font-[400] text-[var(--n800)]';
export const SIDEBAR_ITEM_ACTIVE = 'bg-[var(--n200)] font-[550] text-[var(--n1150)]';

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

// ─── Layout ───
// Standard content widths for consistent alignment
export const LAYOUT = {
  /** Max content width for pages */
  maxWidth: 'max-w-[800px]',
  /** Standard horizontal padding */
  pagePadding: 'px-8',
  /** Standard section gap */
  sectionGap: 'space-y-10',
} as const;
