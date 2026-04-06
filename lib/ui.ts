// lib/ui.ts — The foundation of @ramtt/ui

/** Merge class names, filtering out falsy values. Zero-dependency alternative to clsx. */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}

// ─── Size Scale ───
// Every component with a "size" prop uses these exact values.
// Change them here = changes everywhere.

export const SIZE_HEIGHTS = {
  xs: 'h-5',     // 20px — badges
  sm: 'h-7',     // 28px — small buttons, small toggles
  md: 'h-8',     // 32px — default buttons, inputs, selects, toggles
  lg: 'h-9',     // 36px — large buttons
} as const;

export const SIZE_TEXT = {
  xs: 'text-[10px]',
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

// ─── Radius Scale ───
// 4 values. Nothing else. Figma uses 5px for everything interactive — we do too.
export const RADIUS = {
  sm: 'rounded-[4px]',   // badges, small pills
  md: 'rounded-[5px]',   // buttons, inputs, toggles — THE DEFAULT
  lg: 'rounded-[8px]',   // cards, panels
  xl: 'rounded-[12px]',  // modals, large containers
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
// These ensure the right font is ALWAYS used for the right purpose.
// No component should ever hardcode a font-family — use these.
export const FONT = {
  /** Body text, descriptions, UI copy — Satoshi */
  body: "font-[family-name:var(--font-sans)]",
  /** Labels (uppercase tracked) AND numbers/values — Space Grotesk */
  label: "font-[family-name:var(--font-label)]",
  /** Editorial only, never in app UI — Cormorant Garamond */
  serif: "font-[family-name:var(--font-serif)]",
} as const;

// ─── Composed Text Styles ───
// Pre-composed styles for common text patterns. Use these, don't reinvent.

/** Section headers, field labels — Space Grotesk, 11px, uppercase, tracked, muted */
export const LABEL_STYLE = `${FONT.label} text-[11px] uppercase tracking-[0.08em] text-[var(--n600)]`;

/** Numeric values, stats, prices — Space Grotesk, tabular nums, no uppercase */
export const VALUE_STYLE = `${FONT.label} tabular-nums`;

/** Body text, descriptions — Satoshi, primary color */
export const BODY_STYLE = `${FONT.body} text-[var(--n1150)]`;

/** Secondary/muted text — Satoshi, muted color */
export const MUTED_STYLE = `${FONT.body} text-[var(--n800)]`;

/** Quiet/placeholder text — Satoshi, quiet color */
export const QUIET_STYLE = `${FONT.body} text-[var(--n600)]`;

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
// This is a CRISP rendering rule — transition-all causes unnecessary repaints.
export const TRANSITION = {
  colors: 'transition-colors duration-150',
  background: 'transition-[background-color] duration-150',
  opacity: 'transition-opacity duration-150',
  transform: 'transition-transform duration-150',
} as const;

// ─── Interactive States ───
// Five patterns. Every interactive element uses one of these. No exceptions.
export const HOVER_SAND = 'hover:bg-[var(--n200)]';           // rows, ghost buttons
export const ACTIVE_SAND = 'bg-[var(--n400)]';                // selected toggles, filters
export const ACTIVE_BLACK = 'bg-[var(--n1150)] text-[var(--n50)]'; // primary CTA only
export const WHITE_LIFT = 'hover:bg-white';                   // cards on sand background
export const ACTIVE_UNDERLINE = 'border-b-2 border-[var(--n1150)]'; // tab navigation

// ─── Focus ───
// Visible on keyboard only. Uses :focus-visible, not :focus.
export const FOCUS_RING = 'focus-visible:outline-2 focus-visible:outline-[var(--n600)] focus-visible:outline-offset-2';

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
