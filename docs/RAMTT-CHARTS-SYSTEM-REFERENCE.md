# RAMTT Charts & @ramtt/ui — Complete System Reference

> Exhaustive technical reference for the custom SVG chart system and component design system.
> Last updated: 2026-04-08

---

## Table of Contents

1. [Architecture Overview](#1-architecture-overview)
2. [lib/ui.ts — Design System Constants](#2-libuilts--design-system-constants)
3. [Design Tokens (tokens.css + globals.css)](#3-design-tokens)
4. [Color System](#4-color-system)
5. [Typography](#5-typography)
6. [UI Components (12)](#6-ui-components)
7. [Chart Math Layer](#7-chart-math-layer)
8. [Chart Primitives (19 files)](#8-chart-primitives)
9. [Interaction Architecture](#9-interaction-architecture)
10. [Downsampling & Performance](#10-downsampling--performance)
11. [Design Rules & Constraints](#11-design-rules--constraints)
12. [CRISP Rendering](#12-crisp-rendering)
13. [File Map](#13-file-map)

---

## 1. Architecture Overview

RAMTT Charts is a **zero-dependency custom SVG chart system** built for endurance sport session analysis. It replaces Recharts/D3 to achieve 60fps hover across 5+ synced stacked charts with full control over SVG, downsampling, and ref-based interactions.

### Stack

- **Math layer**: `lib/charts/` — Pure functions for scales, paths, ticks, downsampling
- **Primitives**: `components/charts/primitives/` — 19 React components (SVG + DOM)
- **Design system**: `lib/ui.ts` + `components/ui/` — 12 components + shared constants
- **Tokens**: `components/ui/tokens.css` + `app/globals.css` — CSS custom properties + @theme

### Key Principles

1. **No chart library dependencies** — All SVG, scales, and paths are custom (~3KB gzipped)
2. **Ref-based interactions** — Mouse hover uses `setAttribute()` directly, never React state
3. **Pub/sub for multi-chart sync** — Charts broadcast hover indices via `useRef(new Set())`
4. **Zoom-adaptive downsampling** — `smoothDecimate` preserves peaks while reducing points
5. **@ramtt/ui from line 1** — Every component uses `lib/ui.ts` constants, never hardcoded values

---

## 2. lib/ui.ts — Design System Constants

### Utility

```ts
cn(...inputs: (string | undefined | null | false)[]): string
// Merge class names, filters falsy values. Zero-dependency alternative to clsx.
```

### Size Scale

| Key | Height | Text | Padding X | Use |
|-----|--------|------|-----------|-----|
| `xs` | `h-[18px]` (18px) | `text-[11px]` | `px-1.5` (6px) | Badges |
| `sm` | `h-7` (28px) | `text-[12px]` | `px-2.5` (10px) | Small buttons, toggles |
| `md` | `h-8` (32px) | `text-[13px]` | `px-3.5` (14px) | Default buttons, inputs, selects |
| `lg` | `h-9` (36px) | `text-[14px]` | `px-[18px]` (18px) | Large buttons |

```ts
type Size = 'xs' | 'sm' | 'md' | 'lg'
```

### Font Weights — 4-Level Hierarchy

| Constant | Value | Use |
|----------|-------|-----|
| `WEIGHT.normal` | `font-normal` (400) | Body text, sidebar nav, list items, inputs, unselected toggles |
| `WEIGHT.book` | `font-[450]` (450) | Metadata, units, descriptions, filter dropdowns |
| `WEIGHT.medium` | `font-medium` (500) | Badges, form labels, buttons (primary/outline) |
| `WEIGHT.strong` | `font-[550]` (550) | Section headers, card titles, values, active tabs, selected toggles |

### Border Radius

| Constant | Value | Use |
|----------|-------|-----|
| `RADIUS.sm` | `rounded-[4px]` | Badges, small pills |
| `RADIUS.md` | `rounded-[5px]` | Buttons, inputs, toggles (THE DEFAULT) |
| `RADIUS.lg` | `rounded-[12px]` | Cards, panels (Figma-calibrated) |
| `RADIUS.xl` | `rounded-[16px]` | Modals, large containers |
| `RADIUS.full` | `rounded-full` | Avatars, circular badges |

### Fonts

```ts
FONT = {
  body:  "font-[family-name:var(--font-sans)]",   // Satoshi — body, UI
  label: "font-[family-name:var(--font-label)]",   // Satoshi — labels, values
}
```

> `FONT.serif` exists in lib/ui.ts (Cormorant Garamond) but is not loaded or used in ramtt-charts.

### Composed Text Styles

| Constant | Font | Size | Weight | Color | Use |
|----------|------|------|--------|-------|-----|
| `LABEL_STYLE` | Satoshi | 11px | 550 (strong) | `--n600` | Section labels, column headers |
| `VALUE_STYLE` | Satoshi | inherit | 550 (strong) | inherit | Stats, prices (tabular-nums) |
| `BODY_STYLE` | Satoshi | inherit | 400 (normal) | `--n1150` | Body copy |
| `MUTED_STYLE` | Satoshi | inherit | 450 (book) | `--n800` | Secondary/muted text |
| `QUIET_STYLE` | Satoshi | inherit | 400 (normal) | `--n600` | Quiet text, placeholders |
| `UNIT_STYLE` | Satoshi | inherit | 450 (book) | `--n800` | Unit suffixes (W, BPM, kJ) |

### Borders

```ts
BORDER = {
  subtle:  'border-[0.5px] border-[var(--n200)]',  // Between rows, subtle separators
  default: 'border-[0.5px] border-[var(--n400)]',  // Card/input borders, dividers
}
```

All borders are **0.5px**. Never use border widths above 1px.

### Transitions

```ts
TRANSITION = {
  colors:     'transition-colors duration-150',
  background: 'transition-[background-color] duration-150',
  opacity:    'transition-opacity duration-150',
  transform:  'transition-transform duration-150',
}
```

**`transition-all` is BANNED.** Always specify exact properties.

### Interactive States

| Constant | Class | Use |
|----------|-------|-----|
| `HOVER_SAND` | `hover:bg-[var(--n200)]` | Rows, ghost buttons |
| `ACTIVE_SAND` | `bg-[var(--n400)]` | Selected toggles, active filters |
| `SELECTION_SAND` | `bg-(--n600)/15` | Brush/selection overlays on charts |
| `ACTIVE_BLACK` | `bg-[var(--n1150)] text-[var(--n50)]` | Primary CTA only |
| `WHITE_LIFT` | `hover:bg-white` | Cards on sand background |
| `ACTIVE_UNDERLINE` | `border-b-2 border-[var(--n1150)]` | Tab navigation |

### Focus

```ts
FOCUS_RING = 'focus-visible:outline-2 focus-visible:outline-[var(--n600)] focus-visible:outline-offset-2'
```

Keyboard only (`:focus-visible`, not `:focus`).

### Layout

```ts
LAYOUT = {
  maxWidth:    'max-w-[800px]',   // Max content width for pages
  pagePadding: 'px-8',            // Standard horizontal padding (32px)
  sectionGap:  'space-y-10',      // Standard section gap (40px)
}
```

---

## 3. Design Tokens

### tokens.css — Tier 1 Identity (Fixed)

#### Neutral Scale (warm, slightly yellow-tinted greys)

| Token | Hex | Use |
|-------|-----|-----|
| `--bg` | `#FAF9F5` | Canvas background (sand) |
| `--n50` | `#FDFCFA` | Lightest neutral, elevated surfaces |
| `--n200` | `#F2F0EA` | Hover state, subtle separators |
| `--n400` | `#E8E5DC` | Active sand, default border |
| `--n600` | `#76726A` | Labels, quiet text (WCAG AA 4.55:1 on --bg) |
| `--n800` | `#6B6760` | Secondary text, muted metadata |
| `--n1050` | `#383633` | Near-black, strong text |
| `--n1150` | `#131211` | Primary text, brand black |

#### Spacing

| Token | Value |
|-------|-------|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |

#### Border Radius

| Token | Value | Use |
|-------|-------|-----|
| `--radius-sm` | 4px | Badges, small pills |
| `--radius-md` | 5px | Buttons, inputs, toggles |
| `--radius-lg` | 8px | (CSS token — lib/ui.ts overrides to 12px for cards) |
| `--radius-xl` | 12px | Modals, large containers |

#### Semantic Colors (Tier 2 — Tailwind Catalyst)

| Token | Hex | Soft BG | On-Soft Text |
|-------|-----|---------|-------------|
| `--positive` | `#84cc16` | `#f7fee7` | `#4d7c0f` |
| `--negative` | `#f43f5e` | `#fff1f2` | `#be123c` |
| `--warning` | `#f59e0b` | `#fffbeb` | `#b45309` |
| `--info` | `#0ea5e9` | `#f0f9ff` | `#0369a1` |

#### Accent

| Token | Hex |
|-------|-----|
| `--accent` | `#4A044E` (fuchsia 950) |
| `--accent-light` | `#4A044E12` (7% opacity) |
| `--accent-soft` | `#4A044E20` (12% opacity) |

#### Easing Curves

| Token | Value |
|-------|-------|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` |
| `--ease-in-expo` | `cubic-bezier(0.7, 0, 0.84, 0)` |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` |

#### Font Stacks

```css
--font-sans:     'Satoshi', sans-serif;
--font-label:    'Satoshi', sans-serif;
```

---

## 4. Color System

### Philosophy

**UI is MONOCHROMATIC.** The neutral scale (`--n50` through `--n1150`) handles ALL UI surfaces and text. Chart primitives accept colors as props — the consumer decides the palette.

### Chart Primitive Default Colors (Hardcoded in Components)

These are the actual colors used in the chart demos and session analysis:

| Component | Default Color | Hex | Use |
|-----------|--------------|-----|-----|
| ChartArea | Green | `#16a34a` | Default area fill |
| ChartCrosshair line | Zinc | `#71717a` | Hover vertical line |
| ChartCrosshair dot | Emerald | `#16a34a` | Hover dot |
| ChartFuelLollipop | Orange | `#f97316` | CHO intake lollipops |
| ChartIntervalMarkers work | Orange | `#E36B30` | Work interval shading |
| ChartIntervalMarkers rest | Teal | `#14B8A2` | Rest interval shading |
| ChartScrubber | Orange | `#E36B30` | Minimap area fill |

**ChartZoneLine default zones** (Coggan power zones):

| Zone | Hex | Label |
|------|-----|-------|
| Z1 | `#94a3b8` | Recovery (grey) |
| Z2 | `#22c55e` | Endurance (green) |
| Z3 | `#eab308` | Tempo (yellow) |
| Z4 | `#f97316` | Threshold (orange) |
| Z5 | `#ef4444` | VO2max (red) |
| Z6 | `#dc2626` | Anaerobic (dark red) |

All chart colors are passed as props — defaults are convenience values, not design tokens.

### CSS Variable Bridge (Root)

| Token | Value |
|-------|-------|
| `--background` | `var(--color-canvas)` |
| `--foreground` | `var(--color-text-primary)` |
| `--muted-foreground` | `var(--color-text-muted)` |
| `--card` | `var(--color-elevated)` |
| `--border` | `var(--color-border)` |
| `--accent` | `var(--color-accent)` |
| `--selection-bg` | `#0F1B3D` |
| `--selection-text` | `#F5E6C8` |
| `--border-1` | `rgba(0,0,0,0.06)` |
| `--border-2` | `rgba(0,0,0,0.04)` |

---

## 5. Typography

### Font: Satoshi Everywhere

Satoshi is the **only** UI font in the system. All text — body, labels, values, numbers, headers — uses Satoshi.

| Variable | Font | Use |
|----------|------|-----|
| `--font-sans` | Satoshi | Body text, UI copy — primary font |
| `--font-label` | Satoshi | Labels, values (same as sans) |

### Font Loading (app/layout.tsx)

- **Satoshi**: Self-hosted from `/public/fonts/Satoshi-Variable.woff2` (weight 100-900, `font-display: swap`)
- **Space Grotesk**: Loaded via Google Fonts (legacy, `--font-label` now resolves to Satoshi)
- **JetBrains Mono**: Loaded via Google Fonts (available as `font-space` utility for monospace contexts)

### Base Rendering (globals.css)

```css
body {
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-kerning: normal;
  font-feature-settings: 'kern' 1, 'liga' 1, 'calt' 1;
  font-optical-sizing: auto;
}
```

### Weight Usage Rules

- **400** (normal): Body text, nav items, inputs, unselected toggles
- **450** (book): Units, metadata, descriptions, subtitles
- **500** (medium): Badges, form labels, buttons
- **550** (strong): Section headers, card titles, values, active tabs

### Case Rules

- **Sentence case everywhere**
- **Uppercase ONLY** for abbreviations: Z1-Z6, FTP, CP, HR, BPM, RPM
- No tracking/letter-spacing on labels

---

## 6. UI Components

### Exports (from components/ui/index.ts)

**Components:** Button, Badge, ToggleGroup, Card, DataRow, DataTable, Input, Select, MetricCard, SettingsCard, ProgressBar, SectionHeader

**Constants:** cn, FONT, WEIGHT, LABEL_STYLE, VALUE_STYLE, MUTED_STYLE, BODY_STYLE, QUIET_STYLE, UNIT_STYLE, BORDER, RADIUS, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X, HOVER_SAND, ACTIVE_SAND, ACTIVE_BLACK, WHITE_LIFT, ACTIVE_UNDERLINE, FOCUS_RING, TRANSITION, LAYOUT

**Types:** Size, SemanticColor, BaseComponentProps, InteractiveProps, LabelledProps, ColoredProps

---

### Button

**Props:** `variant?: 'primary' | 'outline' | 'ghost'`, `size?: 'sm' | 'md' | 'lg' | 'icon'`, `disabled?`, `...ButtonHTMLAttributes`

| Variant | Style |
|---------|-------|
| `primary` | `bg-[var(--n1150)] text-[var(--n50)]` + `hover:opacity-90 active:opacity-80` |
| `outline` | Border + `text-[var(--n1050)]` + `HOVER_SAND active:bg-[var(--n400)]` |
| `ghost` | Transparent + `text-[var(--n800)]` + `HOVER_SAND active:bg-[var(--n400)]` |

Uses `SIZE_HEIGHTS`, `SIZE_TEXT`, `SIZE_PADDING_X` constants for sizing.

---

### Badge

**Props:** `variant?: 'filled' | 'outline'`, `color?: SemanticColor | string`, `size?: 'sm' | 'md'`

Always `h-[18px] text-[11px] px-1.5 rounded-[4px]`.

| Color | BG | Text | Border |
|-------|-----|------|--------|
| `default` | `var(--n200)` | `var(--n1050)` | `var(--n400)` |
| `positive` | `var(--positive-soft)` | `var(--positive-on-soft)` | `var(--positive)` |
| `negative` | `var(--negative-soft)` | `var(--negative-on-soft)` | `var(--negative)` |
| `warning` | `var(--warning-soft)` | `var(--warning-on-soft)` | `var(--warning)` |
| `info` | `var(--info-soft)` | `var(--info-on-soft)` | `var(--info)` |

Custom color string: `backgroundColor: color, color: var(--n50)` for filled.

---

### ToggleGroup

**Props:** `options`, `value`, `onChange`, `size?: Size`, `variant?: 'default' | 'pill' | 'underline'`, `multi?`

| Variant | Container | Active State | ARIA Role |
|---------|-----------|-------------|-----------|
| `default` | Connected buttons in border | `ACTIVE_SAND` | `radiogroup` / `toolbar` |
| `pill` | Individual rounded pills | `ACTIVE_SAND` | `radiogroup` / `toolbar` |
| `underline` | Underline style | `ACTIVE_UNDERLINE` | `tablist` |

Keyboard: Arrow keys navigate, Home/End jump. Single-select: selection follows focus. Multi: Space toggles.

---

### Card (Compound)

**Props (Root):** `padding?: 'none' | 'sm' | 'md' | 'lg'`, `onClick?`

| Padding | Value |
|---------|-------|
| `none` | 0 |
| `sm` | `p-2.5` (10px) |
| `md` | `p-3.5` (14px) |
| `lg` | `p-5` (20px) |

Base: `bg-[var(--n50)] border border-[var(--n400)] rounded-[12px]`

Sub-components: `Card.Header`, `Card.Title`, `Card.Body`, `Card.Action`

---

### DataRow

**Props:** `label`, `value`, `unit?`, `delta?`, `deltaColor?: 'positive' | 'negative' | 'default'`, `badge?`

Semantic `<dl>` with `<dt>` (label) and `<dd>` (value + unit + delta + badge).

---

### DataTable

**Props:** `columns: DataTableColumn[]`, `data`, `onRowClick?`

```ts
interface DataTableColumn {
  key: string; label: string; width?: string;
  align?: 'left' | 'right'; format?: 'number' | 'date' | 'string';
}
```

Semantic `<table>`, keyboard support (Enter on rows), `HOVER_SAND` hover.

---

### MetricCard

**Props:** `label`, `value`, `unit?`, `subtitle?`, `subtitleColor?`, `badge?`, `compact?`

- Normal: Label (11px, --n600) + Value (16px, weight 550) + Unit + Badge + Subtitle
- Compact: Horizontal layout for dense displays

---

### Input

**Props:** `label?`, `unit?`, `type?`, `...InputHTMLAttributes`

Auto-generated ID, optional label (LABEL_STYLE), optional right-aligned unit suffix.

---

### Select (Custom)

**Props:** `options: SelectOption[]`, `value?`, `onChange?`, `placeholder?`, `label?`

Type-ahead search, keyboard navigation, dark dropdown (`bg-[#1E1E1E]`), ARIA combobox.

---

### ProgressBar

**Props:** `value`, `max`, `color?`, `label?`, `height?: number` (default 6px)

Colors map to semantic tokens or custom hex.

---

### SectionHeader

**Props:** `children: string`, `action?: ReactNode`

Style: `LABEL_STYLE` (11px, weight 550, --n600). Optional right-aligned action.

---

### SettingsCard

**Props:** `icon?`, `title`, `description?`, `onClick?`

Horizontal layout with icon + title + description + chevron. Keyboard support, `HOVER_SAND`.

---

## 7. Chart Math Layer

All pure functions in `lib/charts/`. Zero dependencies.

### scaleLinear(domain, range)

```ts
interface LinearScale {
  (value: number): number          // Domain -> range
  inverse(pixel: number): number   // Range -> domain
  clamp(value: number): number     // Clamp to domain, then scale
  domain: readonly [number, number]
  range: readonly [number, number]
}
```

**SVG coordinate system:**
- X: `scaleLinear([0, dataLength-1], [0, chartWidth])` — index to pixels
- Y: `scaleLinear([yMin, yMax], [chartHeight, 0])` — INVERTED (higher values = lower pixels)
- Degenerate domains (e.g. [100, 100]) collapse to range midpoint

### linePath(data, x, y, digits = 1)

Generates SVG `d` attribute: `M10.0,20.0L30.5,40.2...`

Accessor pattern: `x(datum, index)` and `y(datum, index)` return pixel coordinates.

### areaPath(data, x, y, baseline, digits = 1)

Closed area: traces data forward, drops to baseline, walks back, closes with `Z`.

### niceTicks(min, max, count = 5)

NICE_STEPS = [1, 2, 2.5, 5, 10]. Computes magnitude, picks smallest step >= rawStep. Cleans floating-point noise with `Math.round(t * 1e12) / 1e12`.

### bisectNearest(sortedValues, target)

O(log n) binary search for nearest value index. Used by ChartCrosshair for hover lookup.

### extent(data, accessor, padding = 0)

Extract [min, max] with optional fractional padding on each side.

### lttb(data, threshold)

Largest Triangle Three Buckets downsampling (Steinarsson 2013). Exactly `threshold` output points. Used for scrubber minimap only.

### smoothDecimate(data, targetPoints, deviationPct = 0.15)

Hybrid downsampling: even spacing + peak preservation.

1. Divide into buckets, include evenly-spaced sample point
2. Find min/max within each bucket
3. Include min/max if they deviate >= 15% from sample
4. Output: ~1.1-1.4x targetPoints (preserves spikes/valleys)

Better for sports data: preserves power spikes and HR peaks that LTTB might miss.

---

## 8. Chart Primitives

19 files in `components/charts/primitives/`.

### ChartRoot — SVG Container

ResizeObserver-based responsive SVG with context provider.

```jsx
<svg viewBox="0 0 {width} {height}">
  <ChartContext.Provider value={{ width, height, chartWidth, chartHeight, padding, scaleX, scaleY, data, ... }}>
    <g transform={`translate(${padding.left},${padding.top})`}>
      {children}
    </g>
  </ChartContext.Provider>
</svg>
```

**Default padding:** `{ top: 8, right: 12, bottom: 24, left: 48 }`

**Context value:**

```ts
interface ChartContextValue {
  width: number; height: number;           // Full SVG
  chartWidth: number; chartHeight: number;  // Drawing area (minus padding)
  padding: ChartPadding;
  scaleX: LinearScale;    // Index -> pixel X
  scaleY: LinearScale;    // Value -> pixel Y
  data: readonly number[];
  sourceDataLength: number;
  svgRef: React.RefObject<SVGSVGElement>;
  decimationFactor: number;  // Default 0.3
}
```

### ChartLine — Polyline

- Applies `smoothDecimate` when data exceeds target
- Target = `Math.max(4, Math.floor(chartWidth * decimationFactor))`
- Renders `<path>` with `shapeRendering="geometricPrecision"`

### ChartArea — Filled Area

- Same downsampling as ChartLine
- SVG linear gradient from `opacityFrom` to `opacityTo`
- Closed path via `areaPath()`

### ChartAxisX — Bottom X-Axis

Evenly-spaced or explicit tick labels below chart.

### ChartAxisY — Left Y-Axis

Nice ticks generated via `niceTicks()`. Labels left-aligned.

### ChartBar — Vertical Bars

Per-bar rects with configurable gap, radius, `colorFn` per bar, highlight support. Handles negative values (bars extend down from zero).

### ChartCrosshair — Hover Tracker

Vertical line + dot, ref-based updates.

**Flow:**
1. `useEffect` pre-computes `pixelXs[i] = scaleX(i)` for all indices
2. `mousemove` -> `rAF` -> `bisectNearest(pixelXs, mouseX)` -> index
3. `showAt(idx)`: `setAttribute()` on `<line>` and `<circle>` refs
4. `broadcastHover(idx, instanceId, clientY)` if synced

### ChartTooltip — Floating Tooltip

Portal-rendered, ref-based DOM updates.

**Positioning:**
- Horizontal: flips left/right at 50% of chart width
- Vertical: anchored at `powerChartHeight - 8px`
- Transitions via CSS: `top 150ms ease-out, left 150ms ease-out`

**Data resolution:** `resolveData(index): { time, rows: [{ label, value, color?, zone? }] }`

### ChartRefLine — Horizontal Reference Line

Dashed line at a Y-value with optional label. `stroke-dasharray="4 3"`.

### ChartZoneLine — Zone-Colored Line

Line that changes color based on training zones via SVG `<linearGradient>`.

**Gradient calculation:**
1. Iterate all data points (full data, not downsampled)
2. Compute `ratio = value / threshold`, find zone
3. Emit gradient stops at zone transitions (two stops at same offset with old/new color)

### ChartIntervalMarkers — Work/Rest Intervals

Full-height colored rects for workout intervals.

- Work: 40% opacity, orange
- Rest: 15% opacity, teal
- Start boundaries: dashed lines

### ChartFuelLollipop — Cumulative CHO Intake

Five layers back-to-front:
1. Cumulative area fill (gradient)
2. Stepped line (dashed)
3. Lollipop stems (vertical dashed)
4. Circles (4.5px, white stroke, glow)
5. Gram labels + target line + progress text

### ChartScrubber — Minimap

Miniature view of full data + draggable zoom window.

- Data downsampled via LTTB to <=300 points
- Fixed 1000px SVG coordinate space
- Window position: `leftPct = (zoom.start / dataLength) * 100`

### ChartSyncProvider — Multi-Chart Sync

Hybrid architecture:
- **Hover**: Ref-based pub/sub (ZERO re-renders)
- **Zoom**: React state (re-renders expected, infrequent)
- **Brush**: Ref-based state for overlay

```ts
interface ChartSyncContextValue {
  subscribeHover: (cb) => () => void;   // Returns unsubscribe
  broadcastHover: (index | null, sourceId, clientY?) => void;
  zoom: { start: number; end: number };
  setZoom: (range) => void;
  brush: RefObject<{ active: boolean; leftPx: number; widthPx: number }>;
}
```

### ChartZoomHandler — Zoom/Pan/Brush

Attaches listeners to SVG, renders nothing.

**Wheel zoom:** `ZOOM_SPEED = 0.15`, centers on cursor position.
**Pan:** Shift+scroll or horizontal scroll, sub-pixel accumulation via ref.
**Brush:** `pointerdown` -> document-level `pointermove`/`pointerup`.

**Keyboard shortcuts:**
- Arrow keys: pan 5%
- +/=: zoom in 20%
- -: zoom out 20%
- Home/End: jump to start/end
- Esc/0: reset full range

### BrushOverlay — Selection Visual

Single absolute `<div>` with continuous `requestAnimationFrame` loop.

Reads `sync.brush.current` ref every frame. Applies `SELECTION_SAND` (`bg-(--n600)/15`).

### CrosshairTimeLabel — Time Pill

Floating pill at crosshair X position. Ref-based `style.transform = translateX(...)`. Uses `willChange: 'transform, opacity'` for GPU acceleration.

### useChartZoom — Hook

State machine for drag/zoom/pan with document-level pointer events.

---

## 9. Interaction Architecture

### Why No React State for Hover?

React re-renders take ~16ms (too slow for 60fps). `setAttribute()` takes ~0.01-1ms. The entire hover system uses refs + direct DOM manipulation + pub/sub via `useRef(new Set())`.

### Hover Flow (5+ charts at 60fps)

```
User mousemove on ChartCrosshair SVG
  -> cancelAnimationFrame (de-dupe events)
  -> requestAnimationFrame:
       1. rect = svg.getBoundingClientRect()
       2. mx = clientX - rect.left - padding.left
       3. idx = bisectNearest(pixelXs, mx)     // O(log n)
       4. if idx changed:
            setAttribute on <line> + <circle>   // ~0.01ms
            broadcastHover(idx, instanceId)
       5. All synced ChartCrosshairs:
            subscribeHover callback fires
            showAt(idx) -> setAttribute on their refs
       6. ChartTooltip:
            subscribeHover callback fires
            updateContent() -> textContent/innerHTML
            positionTooltip() -> style.top/left
```

### Zoom Flow (React state — expected re-renders)

```
User wheel scroll
  -> compute new zoom range
  -> sync.setZoom({ start, end })
  -> React re-render
  -> ChartRoot recomputes scales with zoomed data
  -> Children re-render with new scaleX/scaleY
```

### Brush Flow

```
pointerdown on SVG
  -> dragState.current = { startX }
  -> sync.brush.current = { active: true, leftPx, widthPx: 0 }
  -> document.addEventListener('pointermove')

pointermove (document-level)
  -> update sync.brush.current (leftPx, widthPx)
  -> BrushOverlay reads it on next rAF tick

pointerup (document-level)
  -> convert screen fractions to data indices
  -> if delta >= MIN_BRUSH_POINTS: setZoom()
  -> clearBrush()
```

### Pre-Computed Pixel Array

```ts
// Cached per data/scale change, used for O(log n) hover lookup
const pixelXs = useRef<number[]>([])
useEffect(() => {
  pixelXs.current = data.map((_, i) => scaleX(i))
}, [data.length, scaleX])
```

---

## 10. Downsampling & Performance

### Strategy per Component

| Component | Algorithm | Target | When |
|-----------|-----------|--------|------|
| ChartLine | `smoothDecimate` | `chartWidth * 0.3` | `data.length > target` |
| ChartArea | `smoothDecimate` | `chartWidth * 0.3` | `data.length > target` |
| ChartZoneLine | `smoothDecimate` (path) + full data (gradient) | same | same |
| ChartScrubber | `lttb` | 300 points | Always |
| ChartFuelLollipop | None | — | Event data is small |

### Why smoothDecimate Over LTTB?

- LTTB preserves overall shape but can lose peaks
- smoothDecimate: even spacing (smooth curves) + min/max preservation (spikes)
- Result: smooth curves that don't miss power spikes or HR peaks
- Output ~1.1-1.4x target (vs LTTB exactly target)

### Ref Categories

| Category | Examples | Purpose |
|----------|----------|---------|
| DOM refs | lineRef, dotRef, tooltipRef, overlayRef, pillRef | Direct DOM manipulation |
| State refs | hoverSubs, brush, dragState | Mutable state without re-renders |
| Optimization refs | pixelXs, lastIdx, panAccum | Cached computations |

### CSS Performance

- `will-change: transform` on frequently-updated elements (crosshair pill)
- `contain: paint` on chart container to isolate repaints
- `content-visibility: auto` for below-fold charts
- `pointer-events: none` on all overlay elements

### Duration Hierarchy (Chart-Specific)

| Element | Duration | Easing |
|---------|----------|--------|
| Crosshair position | 0ms (instant, rAF) | — |
| Time pill appear | 100ms | ease-out-expo |
| Zone toggle color | 250ms | ease-out-expo |
| Chart toggle | 200ms | ease-out-expo |
| Fullscreen enter | 300ms | ease-out-expo |
| Fullscreen exit | 200ms | ease-in-expo |

---

## 11. Design Rules & Constraints

### Rule Zero

**NEVER build with hardcoded values.** Every new component MUST use `lib/ui.ts` constants from the FIRST LINE. Never "build first, convert later."

### Import Requirements

All components import from `lib/ui.ts`. No hardcoded:
- font-family
- border-width
- border-radius
- transition
- hex colors
- font-weight values

### Interaction State Rules

| State | Token | Where |
|-------|-------|-------|
| Sand fill | `ACTIVE_SAND` (`--n400`) | Selected toggles, active filters |
| Underline | `ACTIVE_UNDERLINE` (2px `--n1150`) | Tab navigation |
| White lift | `WHITE_LIFT` (`bg-white`) | Card hover on sand background |
| Black fill | `ACTIVE_BLACK` (`--n1150`) | Primary CTA ONLY |
| Sand hover | `HOVER_SAND` (`--n200`) | Rows, ghost buttons |

### Cursor Rules

- `cursor-default` everywhere
- `cursor-text` only in input fields
- `cursor-grab/grabbing` only for drag handles
- NEVER `cursor-pointer`

### Shadow Rules

- No box-shadow on cards or static elements
- Shadows only on floating elements (modals, dropdowns, tooltips)

### Color Rules

- Primary text: `--n1150`
- Secondary text: `--n800`
- Labels/muted: `--n600`
- Semantic colors (positive/negative/warning/info) are NEVER for text
- All text uses neutral scale only

### Accessibility Requirements

- `forwardRef` on all components (required for interactive, recommended for all)
- `displayName` on all components
- `FOCUS_RING` on all interactive elements
- Semantic HTML: `<button>`, `<table>`, `<th>`, `<h2>`, `<dl>`
- ARIA roles: radiogroup, tablist, toolbar, listbox, progressbar
- Keyboard navigation: arrow keys in groups, Escape to close, Enter/Space to activate

### Tailwind v4 Rules

- `@import "tailwindcss"` (not v3 `@tailwind` directives)
- `@theme` in globals.css for tokens (not `tailwind.config.js`)
- No `@apply` — extract a component instead
- No `style={{}}` except CSS variable bridge and SVG-only attributes
- No standalone .css files per component
- No `<style>` tags or CSS-in-JS

### Animation Rules

- NEVER animate `path d` attributes (too many points, will lag)
- NEVER add motion to crosshair (must be instant via refs)
- NEVER `transition-all`
- NEVER animate layout properties (width, height, top, left) — only transform/opacity
- Always respect `prefers-reduced-motion`
- Never mix Framer Motion with refs for 60fps updates

### SVG Rules

- `shapeRendering="geometricPrecision"` for smooth data lines
- `shapeRendering="crispEdges"` for grid/reference lines
- `strokeWidth="0.5px"` for hairline borders
- NO `Math.round()` on scale values — preserve full floating point
- SVG `<text>` needs explicit `style={{ fontFamily }}` (Tailwind classes don't work on SVG text)

---

## 12. CRISP Rendering

### Font Pipeline

- Grayscale antialiasing (`-webkit-font-smoothing: antialiased`)
- OpenType features: kern, liga, calt, tnum enabled globally
- `font-optical-sizing: auto`
- `text-wrap: balance` on headings, `text-wrap: pretty` on body
- woff2 self-hosted, subsetted
- `font-display: swap` for display fonts

### Borders & Shadows

- 0.5px hairline borders with `@supports` fallback
- Layered shadows (contact + near + ambient) on floating elements only
- Micro-shadows at 0.04 opacity
- Frosted glass via `backdrop-blur` + `backdrop-saturate-150`

### Animation

- GPU-only properties (transform, opacity)
- Custom easing `cubic-bezier(0.16, 1, 0.3, 1)` as default
- Duration hierarchy: 100ms tooltips, 150ms buttons, 250ms panels, 400ms pages
- `prefers-reduced-motion` always respected

### Layout

- 4px spacing grid
- Fluid typography/spacing with `clamp()`
- Container queries for component-level responsiveness
- `max-w-prose` (65ch) for body
- CLS prevention with fixed dimensions

### Performance

- Surgical `will-change` (only actively animating elements)
- `contain: paint` on isolated components
- `content-visibility: auto` below fold
- Compositing awareness

---

## 13. File Map

### Math Layer (`lib/charts/`)

```
lib/charts/
  index.ts                    Main exports
  scales/linear.ts            Linear scale with inverse, clamp
  paths/line.ts               SVG polyline path generator
  paths/area.ts               SVG closed area path generator
  ticks/nice.ts               Nice tick generation (1, 2, 2.5, 5, 10)
  utils/bisect.ts             O(log n) nearest-point binary search
  utils/extent.ts             Min/max extraction with padding
  utils/lttb.ts               Largest Triangle Three Buckets downsampling
  utils/smooth-decimate.ts    Hybrid even-spacing + peak-preservation
  utils/__tests__/smooth-decimate.test.ts
```

### Chart Primitives (`components/charts/primitives/`)

```
components/charts/primitives/
  chart-context.ts            Context + useChart() hook
  ChartRoot.tsx               SVG container, ResizeObserver, provider
  ChartLine.tsx               Polyline with zoom-adaptive downsampling
  ChartArea.tsx               Filled area with SVG gradient
  ChartBar.tsx                Vertical bars with per-bar coloring
  ChartAxisX.tsx              Bottom X-axis labels
  ChartAxisY.tsx              Left Y-axis with nice ticks
  ChartRefLine.tsx            Horizontal dashed reference line
  ChartZoneLine.tsx           Zone-colored gradient line
  ChartIntervalMarkers.tsx    Work/rest interval shading
  ChartFuelLollipop.tsx       Cumulative lollipop chart
  ChartCrosshair.tsx          Hover line + dot (ref-based 60fps)
  ChartTooltip.tsx            Floating portal tooltip (ref-based)
  CrosshairTimeLabel.tsx      Time pill at crosshair position
  ChartScrubber.tsx           Minimap with draggable window
  ChartSyncProvider.tsx       Multi-chart hover/zoom sync hub
  ChartZoomHandler.tsx        Wheel zoom, pan, brush listeners
  BrushOverlay.tsx            Selection rectangle (rAF loop)
  useChartZoom.ts             Zoom/pan/brush state machine hook
```

### UI Components (`components/ui/`)

```
components/ui/
  index.ts                    Barrel export (components + constants)
  tokens.css                  CSS custom properties, font-face
  RULES.md                    Design system contract
  Button.tsx
  Badge.tsx
  ToggleGroup.tsx
  Card.tsx
  DataRow.tsx
  DataTable.tsx
  MetricCard.tsx
  SectionHeader.tsx
  SettingsCard.tsx
  Input.tsx
  Select.tsx
  ProgressBar.tsx
```

### Core Files

```
lib/ui.ts                     Design system constants (single source of truth)
lib/types/ui.ts               Shared type definitions
app/globals.css               @theme tokens, @layer base, CSS variables
app/layout.tsx                Font loading (Satoshi, Space Grotesk, JetBrains Mono)
components/ui/tokens.css      Tier 1 identity tokens, @font-face
```

### Demo Pages

```
app/demo/page.tsx             Generic multi-chart demo (stock, revenue, temp, IoT)
app/chart-test/page.tsx       Session analysis (5 synced charts, fullscreen)
app/ui-demo/page.tsx          UI component showcase
app/type-system/page.tsx      Typography documentation
```

### Quality Gates

```
scripts/audit-ui.ts           npm run audit:ui — enforces lib/ui.ts usage
```
