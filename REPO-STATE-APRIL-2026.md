# REPO-STATE-APRIL-2026.md — Complete Verified Inventory

> Generated 2026-04-16 from code inspection. Every number verified against actual files.
> Purpose: foundation for writing CLAUDE.md.

---

## 1. Repo Structure

```
.
├── app
│   ├── (docs)              # Documentation site (Next.js route group)
│   │   ├── charts/         # Chart type docs
│   │   ├── components/     # Component docs
│   │   ├── getting-started/ # Installation guide
│   │   ├── icons/          # Icon library docs
│   │   ├── patterns/       # Pattern docs
│   │   ├── tokens/         # Token system docs
│   │   ├── layout.tsx      # Docs layout (sidebar)
│   │   └── page.tsx        # Docs landing page
│   ├── accent-demo/        # Accent color picker (32→171 accents, settings replica)
│   ├── chart-test/         # FIT file chart playground (real cycling data)
│   ├── color-guide/        # Color token documentation
│   ├── color-lab/          # OKLCH interactive color explorer (UNCOMMITTED)
│   ├── demo/               # Shadcn-parity chart demos
│   │   ├── area/           # 9 area chart variants
│   │   ├── bar/            # 12 bar chart variants
│   │   ├── line/           # 9 line chart variants
│   │   ├── login/          # 3 login page variants (UNCOMMITTED)
│   │   ├── pie/            # 9 pie/donut variants
│   │   ├── radar/          # 12 radar + radial variants
│   │   ├── tooltip/        # 6 tooltip variants
│   │   ├── generate-data.ts # Shared data generators
│   │   └── page.tsx        # Master demo (40+ chart examples, 3292 lines)
│   ├── icon-catalog/       # Interactive icon browser/search
│   ├── icon-demo/          # Icon animation demo
│   ├── ui-demo/            # @ramtt/ui component showcase (all 111 components)
│   ├── globals.css         # Tailwind import + @theme tokens + base styles
│   └── layout.tsx          # Root layout (Satoshi only)
├── backups                 # Old page snapshots (pre-refactor)
├── components
│   ├── charts
│   │   ├── composites/     # ChartToolbar (1 file)
│   │   └── primitives/     # 43 chart primitives + 9 test files
│   ├── dev/                # DevCacheGuard
│   ├── docs/               # Documentation components (DocCode, DocPreview, etc.)
│   ├── icons/              # @ramtt/icons (1717 .tsx files across 8 variant dirs)
│   │   ├── animated/       # 20 animated icons
│   │   ├── context/        # 26 context-aware icons
│   │   ├── duo/            # 400 duo-tone icons
│   │   ├── light/          # 400 light icons
│   │   ├── line/           # 400 line icons (default)
│   │   ├── morph/          # 25 morph transition icons
│   │   ├── reactive/       # 46 reactive icons
│   │   ├── solid/          # 400 solid icons
│   │   ├── catalog.ts      # Icon metadata registry
│   │   ├── IconBase.tsx    # Base icon wrapper (line variant)
│   │   ├── IconBaseDuo.tsx # Base icon wrapper (duo variant)
│   │   ├── IconBaseLight.tsx # Base icon wrapper (light variant)
│   │   ├── IconBaseSolid.tsx # Base icon wrapper (solid variant)
│   │   ├── index.ts        # Barrel exports
│   │   └── types.ts        # IconProps, IconDuoProps
│   └── ui/                 # @ramtt/ui (111 components)
│       ├── *.tsx           # 111 component files
│       ├── index.ts        # Barrel exports (190 lines)
│       ├── RULES.md        # Non-negotiable design rules
│       ├── tokens.css      # Design tokens + animations (587 lines)
│       └── ramtt-logo.tsx  # Wordmark logo component
├── docs                    # Briefs, references, competitive analysis, font files
├── FIT_FILES               # Sample .fit file for chart testing
├── lib
│   ├── charts/             # Math layer (28 source files, 21 test files)
│   │   ├── layouts/        # Sankey, Sunburst
│   │   ├── paths/          # Line, Area, Arc, Radar
│   │   ├── scales/         # Linear, Log, Band, Time
│   │   ├── ticks/          # Nice ticks
│   │   ├── utils/          # 17 utility modules
│   │   └── index.ts        # Barrel exports
│   ├── constants/colors.ts # Color constants
│   ├── docs/               # Doc navigation + registry
│   ├── parsers/            # GPX, TCX parsers + tests
│   ├── calendar-utils.ts   # Calendar helpers
│   ├── fit-parser.ts       # FIT file parser wrapper
│   ├── oklch.ts            # OKLCH color utilities (UNCOMMITTED)
│   ├── ui.ts               # @ramtt/ui foundation (372 lines)
│   └── utils.ts            # General utils
├── packages
│   ├── charts/             # Publishable @ramtt/charts package
│   └── ui/                 # Publishable @ramtt/ui package
├── public
│   ├── fit-data/           # Pre-parsed FIT JSON
│   └── fonts/              # Satoshi, Cormorant Garamond, SpaceGrotesk, JetBrains, InstrumentSans
├── scripts                 # Audit + code generation scripts
├── types/ui.ts             # Shared UI types
├── package.json
├── tsconfig.json
└── next.config.ts
```

**File counts:**
- Total `.ts`/`.tsx` files (excl node_modules): **1,536**
- UI components: **111 files** (16,743 lines total)
- Chart primitives: **43 files** (9,191 lines total)
- Chart math layer: **28 source files** (~2,100 lines)
- Icon files: **1,717 .tsx** across 8 variant directories
- Test files: **35 total** (21 math + 9 primitive + 1 parser + 4 misc)

---

## 2. Package & Dependencies

### package.json (raw)

```json
{
  "name": "ramtt-charts",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "rm -rf .next && next dev --port 5000",
    "build": "next build",
    "lint": "next lint",
    "audit": "npx tsx scripts/audit.ts",
    "audit:ui": "npx tsx scripts/audit.ts --scope ui",
    "audit:charts": "npx tsx scripts/audit.ts --scope charts",
    "audit:icons": "npx tsx scripts/audit-icons.ts",
    "build:charts": "cd packages/charts && npx tsup",
    "build:ui": "cd packages/ui && npx tsup",
    "build:packages": "npm run build:charts && npm run build:ui"
  },
  "keywords": [],
  "author": "",
  "license": "MIT OR Apache-2.0",
  "dependencies": {
    "@tailwindcss/postcss": "^4.2.2",
    "@types/node": "^25.5.2",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "clsx": "^2.1.1",
    "fit-file-parser": "^2.3.3",
    "motion": "^12.38.0",
    "next": "^16.2.2",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "tailwind-merge": "^3.5.0",
    "tailwindcss": "^4.2.2",
    "typescript": "^6.0.2"
  },
  "devDependencies": {
    "tsup": "^8.5.1",
    "vitest": "^4.1.2"
  }
}
```

### Scripts

| Script | Description |
|--------|-------------|
| `dev` | Clears .next cache, starts Next.js dev server on port 5000 |
| `build` | Production Next.js build |
| `lint` | Next.js ESLint |
| `audit` | Runs unified audit script (UI + charts + pages, 225 files) |
| `audit:ui` | Audit scoped to UI components only |
| `audit:charts` | Audit scoped to chart components only |
| `audit:icons` | Separate icon library validation script |
| `build:charts` | Build @ramtt/charts package with tsup |
| `build:ui` | Build @ramtt/ui package with tsup |
| `build:packages` | Build both packages sequentially |

### Runtime Dependencies

**NOT zero-dependency.** The following are runtime deps beyond React/Next:

| Package | Why |
|---------|-----|
| `clsx` | Class name merging (but lib/ui.ts has its own `cn()`) |
| `fit-file-parser` | Parse .fit cycling files in chart-test page |
| `motion` | Framer Motion (animation library) |
| `tailwind-merge` | Tailwind class deduplication |

Note: `@types/*`, `tailwindcss`, `@tailwindcss/postcss`, and `typescript` are build-time only but listed under `dependencies` instead of `devDependencies`. This is a packaging issue.

### Environment

- Node: **v25.8.0**
- npm: **11.11.0**
- Package manager: **npm** (package-lock.json present)
- Framework: **Next.js 16** (App Router)
- CSS: **Tailwind CSS v4** (PostCSS plugin)

---

## 3. @ramtt/charts — Math Layer (lib/charts/)

### Scales (4 files)

| File | Exports | Lines | Tests | Status |
|------|---------|-------|-------|--------|
| `scales/linear.ts` | `scaleLinear()`, `LinearScale` | 51 | `__tests__/linear.test.ts` | ✅ Working |
| `scales/log.ts` | `scaleLog()`, `LogScale`, `niceLogTicks()` | 95 | `__tests__/log.test.ts` | ✅ Working |
| `scales/band.ts` | `scaleBand()`, `BandScale` | 97 | `__tests__/band.test.ts` | ✅ Working |
| `scales/time.ts` | `scaleTime()`, `TimeScale`, `formatTimeTick()` | 144 | `__tests__/time.test.ts` | ✅ Working |

### Paths (4 files)

| File | Exports | Lines | Tests | Status |
|------|---------|-------|-------|--------|
| `paths/line.ts` | `linePath()`, `Accessor`, `CurveType` ('natural'\|'linear'\|'step') | 122 | `__tests__/line.test.ts` | ✅ Working |
| `paths/area.ts` | `areaPath()` | 47 | `__tests__/area.test.ts` | ✅ Working |
| `paths/arc.ts` | `arcPath()`, `pieLayout()` | 115 | `__tests__/arc.test.ts` | ✅ Working |
| `paths/radar.ts` | `radarPoints()`, `radarPath()`, `radarGridPoints()` | 58 | `radar.test.ts` | ✅ Working |

### Ticks (1 file)

| File | Exports | Lines | Tests | Status |
|------|---------|-------|-------|--------|
| `ticks/nice.ts` | `niceTicks()`, `niceNum()` | 84 | `__tests__/nice.test.ts` | ✅ Working |

### Layouts (2 files)

| File | Exports | Lines | Tests | Status |
|------|---------|-------|-------|--------|
| `layouts/sankey.ts` | `sankeyLayout()`, types | 231 | **None** | ✅ Working (no tests) |
| `layouts/sunburst.ts` | `sunburstLayout()`, types | 97 | **None** | ✅ Working (no tests) |

### Utils (17 files)

| File | Exports | Lines | Tests | Status |
|------|---------|-------|-------|--------|
| `utils/extent.ts` | `extent()`, `extentOf()` | 52 | `__tests__/extent.test.ts` | ✅ Working |
| `utils/bisect.ts` | `bisectNearest()`, `bisectData()` | 89 | `__tests__/bisect.test.ts` | ✅ Working |
| `utils/lttb.ts` | `lttb()`, `Point` | 77 | `__tests__/lttb.test.ts` | ✅ Working |
| `utils/nearest2d.ts` | `nearest2d()` | 43 | `__tests__/nearest2d.test.ts` | ✅ Working |
| `utils/stack.ts` | `stackSeries()` | 44 | `__tests__/stack.test.ts` | ✅ Working |
| `utils/waterfall.ts` | `waterfallLayout()`, types | 75 | `__tests__/waterfall.test.ts` | ✅ Working |
| `utils/treemap.ts` | `treemapLayout()`, types | 187 | `__tests__/treemap.test.ts` | ✅ Working |
| `utils/smooth-decimate.ts` | `smoothDecimate()`, `DecimatedPoint` | 108 | `__tests__/smooth-decimate.test.ts` | ✅ Working |
| `utils/peakPower.ts` | `findPeakPower()`, `computeAllPeaks()`, `buildMMPCurve()`, `PEAK_DURATIONS` | 110 | `__tests__/peakPower.test.ts` | ✅ Working |
| `utils/pmc.ts` | `computePMC()`, `computeTSS()`, types | 95 | `__tests__/pmc.test.ts` | ✅ Working |
| `utils/sma.ts` | `sma()` | 38 | `sma.test.ts` | ✅ Working |
| `utils/colorInterpolate.ts` | `interpolateColor()`, `hexToRgb()`, `rgbToHex()` | 83 | `colorInterpolate.test.ts` | ✅ Working |
| `utils/colorScale.ts` | `interpolateColorScale()`, `parseHexColor()`, `isLightColor()`, `ColorStop` | 101 | `colorScale.test.ts` | ✅ Working |
| `utils/zoom.ts` | `clampViewport()`, `pixelToFraction()`, `indicesToFractions()`, `fractionsToIndices()` | 55 | `zoom.test.ts` | ✅ Working |
| `utils/animate.ts` | `resolveAnimate()`, `EASE_OUT_EXPO`, `EASE_SPRING`, types | 43 | `animate.test.ts` | ✅ Working |
| `utils/capture.ts` | `captureChart()`, `CaptureOptions` | 124 | `capture.test.ts` | ✅ Working |

### Barrel Exports (index.ts)

69 lines. Re-exports all scales, paths, ticks, layouts, and utils above. Also exports:
- Radar geometry (`radarPoints`, `radarPath`, `radarGridPoints`)
- Color scale utilities
- Peak Power / MMP
- PMC (Performance Management Chart)
- Zoom utilities
- Animation config

### Test Summary

```
 Test Files  35 passed (35)
      Tests  248 passed (248)
   Duration  678ms
```

All 248 tests pass. Zero failures. Zero TODO/FIXME in any math layer file.

---

## 4. @ramtt/charts — React Primitives (components/charts/primitives/)

**43 component files + 9 test files + 2 support files (chart-context.ts, useChartZoom.ts) + 1 old file (ChartTooltip.old.tsx) + RULES.md**

### Context / Infrastructure

| File | Lines | Description |
|------|-------|-------------|
| `chart-context.ts` | 69 | `ChartContext`, `useChart()` hook, `ChartPadding`, `DEFAULT_PADDING` |
| `useChartZoom.ts` | ~400 | Zoom state management hook |

### Core Primitives (Cartesian — use ChartRoot)

| Primitive | Lines | Key Props |
|-----------|-------|-----------|
| `ChartRoot.tsx` | 155 | `data`, `height`, `padding`, `yPadding`, `yDomain`, `xDomain`, `decimationFactor` |
| `ChartLine.tsx` | 197 | `data`, `yDomain`, `yAccessor`, `curve`, `animate`, `showDots`, `dotRadius`, `renderDot` |
| `ChartArea.tsx` | 225 | `data`, `gradientColor`, `opacityFrom/To`, `y0Accessor`, `thresholdY`, `negativeColor`, `curve`, `animate` |
| `ChartBar.tsx` | 276 | `data`, `gap`, `radius`, `colorFn`, `y0Accessor`, `orientation`, `showLabels`, `activeIndex`, `groupIndex/Count`, `animate` |
| `ChartGrid.tsx` | 114 | `horizontal`, `vertical`, `tickCount`, `strokeDasharray`, `animate` |
| `ChartAxisX.tsx` | 98 | `labelCount`, `format`, `tickValues`, `fontFamily`, `animate` |
| `ChartAxisY.tsx` | 81 | `tickCount`, `format`, `position`, `domain`, `animate` |
| `ChartRefLine.tsx` | 61 | `y`, `label`, `animate` |
| `ChartScatter.tsx` | 151 | `data`, `xAccessor`, `yAccessor`, `sizeAccessor`, `sizeRange`, `colorFn`, `animate` |
| `ChartCandlestick.tsx` | 154 | `data`, OHLC accessors, `upColor`, `downColor`, `bodyWidth` |
| `ChartBoxPlot.tsx` | 163 | `data`, `boxWidth`, `color`, `medianColor` |
| `ChartZoneLine.tsx` | 189 | `data`, `zones`, `threshold`, `animate` |
| `ChartZoneBackground.tsx` | 118 | `threshold`, `zones`, `opacity`, `showLabels` |
| `ChartPattern.tsx` | 82 | `variant` (dots/lines/crosses/none), `opacity`, `spacing` |
| `ChartAnnotation.tsx` | 223 | `annotations` (point/line/range types) |
| `ChartIntervalMarkers.tsx` | 115 | Marks intervals on chart |
| `ChartFuelLollipop.tsx` | 246 | `intakes`, `target`, `color` — cumulative fuel intake |

### Interaction Primitives

| Primitive | Lines | Key Props |
|-----------|-------|-----------|
| `ChartTooltip.tsx` | 538 | `series`, `labelFn`, `formatValue`, `indicator`, `tooltipIndicator`, `showTotal` |
| `ChartCrosshair.tsx` | 214 | `lineColor`, `lineWidth`, `dotRadius`, `tooltipMode`, `maxDistance`, `onHover` |
| `ChartValueTracker.tsx` | 161 | `formatValue`, `color` |
| `ChartScrubber.tsx` | 251 | Scrubber control (mini-map) |
| `BrushOverlay.tsx` | 75 | Brush/selection overlay |
| `CrosshairTimeLabel.tsx` | 88 | Time label for crosshair |
| `ChartNavigator.tsx` | 367 | `data`, `height` — draggable viewport mini-chart |
| `ChartZoomHandler.tsx` | 20 | Connects useChartZoom to ChartRoot |

### Self-Contained Primitives (own SVG, no ChartRoot)

| Primitive | Lines | Key Props |
|-----------|-------|-----------|
| `ChartDonut.tsx` | 238 | `data`, `innerRadius`, `padAngle`, `size`, `centerContent`, `activeIndex`, `onSegmentClick` |
| `ChartRadar.tsx` | 502 | `dimensions`, `series`, `rings`, `gridType` (polygon/circle), `showDots`, `fillOpacity`, `renderLabel` |
| `ChartRadialBar.tsx` | 260 | `items`, `trackWidth`, `gap`, `showCaps`, `centerContent` |
| `ChartTreemap.tsx` | 174 | `data`, `width`, `height` |
| `ChartFunnel.tsx` | 223 | `data`, `width`, `height` |
| `ChartWaterfall.tsx` | 245 | `data`, `positiveClassName`, `negativeClassName`, `radius`, `gap`, `animate` |
| `ChartHeatmap.tsx` | 399 | `data`, `xLabels`, `yLabels`, `colorScale`, `cellSize`, `cellGap`, `showValues`, `animate` |
| `ChartCalendarHeatmap.tsx` | 425 | `data`, `startDate`, `endDate`, `colors`, `cellSize`, `gap` |
| `ChartSankey.tsx` | 198 | `data`, `nodeWidth`, `nodePadding`, `colors`, `animate` |
| `ChartSunburst.tsx` | 242 | `data`, `innerRadius`, `colors`, `padAngle`, `animate` |
| `ChartBullet.tsx` | 191 | `value`, `target`, `ranges`, `label`, `unit`, `animate` |
| `ChartPyramid.tsx` | 205 | `data`, `colors`, `gap`, `neckWidth`, `animate` |
| `ChartPMC.tsx` | 390 | `data`, `ctlColor`, `atlColor`, `tsbColor`, `showBars`, `grid` |
| `ChartMMP.tsx` | 338 | `data`, `peaks`, `color`, `fillOpacity`, `grid`, `animate` |

### State & Composition

| Primitive | Lines | Key Props |
|-----------|-------|-----------|
| `ChartSyncProvider.tsx` | 116 | `dataLength`, `zoomMode`, `children` — syncs hover/zoom across charts |
| `ChartWithSubChart.tsx` | 147 | `mainHeight`, `subHeight`, `gap`, `data`, `zoomMode` — compound main+sub |
| `ChartPeriodTabs.tsx` | 66 | `periods`, `selected`, `onChange` |

### Tests (9 files)

| Test File | Tests |
|-----------|-------|
| `ChartAnnotation.test.tsx` | Renders annotation types |
| `ChartBoxPlot.test.tsx` | Render check |
| `ChartCalendarHeatmap.test.tsx` | Calendar layout |
| `ChartCandlestick.test.tsx` | OHLC rendering |
| `ChartFunnel.test.tsx` | Funnel stages |
| `ChartHeatmap.test.tsx` | Heatmap cells |
| `ChartRadar.test.tsx` | Radar grid + series |
| `ChartRadialBar.test.tsx` | Render check |
| `ChartTreemap.test.tsx` | Render check |

### Notes

- **NONE** of the chart primitives use `forwardRef`
- **NONE** have `displayName`
- All cartesian primitives consume `useChart()` from `chart-context.ts`
- All use ref-based DOM manipulation for hover (zero React re-renders)
- `ChartTooltip.old.tsx` is an obsolete version — should be cleaned up

---

## 5. @ramtt/charts — Composites (components/charts/composites/)

**1 file:**

| File | Lines | Description |
|------|-------|-------------|
| `ChartToolbar.tsx` | 220 | Period tabs, chart type toggle, SMA selector, capture & fullscreen buttons |

No barrel file for composites or primitives — all imported by direct file path.

---

## 6. @ramtt/ui — Components (components/ui/)

### Component Count: 111

All 111 components are exported from `components/ui/index.ts` organized by wave.

### Coverage Stats
- **forwardRef**: 109/111 (98%) — exceptions: `Toast.tsx` (Provider+Hook pattern), `TrendBadge.tsx` (simple display)
- **displayName**: 111/111 (100%)
- **ARIA attributes**: 79/111 (71%)

### Full Component List by Wave

#### Wave 1 — Display & Input (12)
Button, Badge, ToggleGroup, Card, DataRow, DataTable, Input, Select, MetricCard, SettingsCard, ProgressBar, SectionHeader

#### Wave 2 — Interaction Layer (6)
Modal, Toast (ToastProvider + useToast), Dropdown, Tabs, Skeleton, Switch

#### Wave 3 — Polish & Navigation (6)
Tooltip, Accordion, Slider, Avatar, EmptyState, Breadcrumb

#### Wave 4 — App-Specific (8)
Sidebar, PageHeader, Textarea, Checkbox, Radio, FileUpload, Tag, Gauge

#### Wave 5 — Full Parity + Beyond (10)
Calendar, DatePicker, Popover, Command, Pagination, Drawer, Spinner, Kbd, Alert, Combobox

#### Wave 6 — Final Parity (8)
Separator, Label, Collapsible, InputGroup, ScrollArea, HoverCard, Resizable, ContextMenu

#### Wave 7A — Atomic Display + Input (4)
ColorDot, StatusIndicator, SegmentedBar, NumberStepper

#### Wave 7B — Input Patterns (3)
RatingInput, TimePicker, StepFlow

#### Wave 7C — Widget System (3)
WidgetCard, WidgetPicker, DashboardGrid

#### Wave 8A — Display + Interaction (6)
Stat, ComparisonCard, TimelineStrip, RangeSlider, FormField, NotificationBadge

#### Wave 8B — Compound Components (6)
ChartCard, Leaderboard, MemberList, InviteCard, OnboardingLayout, NotificationPreferences

#### Wave 8C — Utility Components (3)
TodoList, HelpSection, FieldMapping

#### Wave 8D — Layout & Form Patterns (8 + 3 extra)
DescriptionList, Feed, ActionPanel, GridList, MediaObject, FormLayout, ButtonGroup, AuthLayout, VirtualList, ColorPicker, OAuthButton

#### Wave 9 — Dark Surfaces & Footer (5)
LinkGroup, LinkList, DarkSection, SocialIcons, Footer

#### Wave 10 — Category System & Command Palette (2)
CategoryIcon, CommandPalette

#### Wave 11 — Editor Shell (4)
IconTabBar, PanelSidebar, FloatingToolbar, FloatingPanel

#### Wave 12 — Claude-Inspired (12)
WorkspaceSwitcher, ActivityHeatmap, QuickSearch, ConversationList, StatsGrid, AppSidebar, ProjectsGrid, ChatInput, MessageActions, WelcomeHero, PromoCard, ActiveTask

### Compound Component Pattern (17 components)

These use `Object.assign()` to attach sub-components:
Accordion, Modal, Drawer, Card, ChatInput, ActiveTask, Tabs, Command, Dropdown, Select, Combobox, ContextMenu, Collapsible, HoverCard, Popover, Radio, Resizable

### lib/ui.ts (raw content)

```ts
// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

// lib/ui.ts — The foundation of @ramtt/ui

/** Merge class names, filtering out falsy values. Zero-dependency alternative to clsx. */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(' ');
}

// ─── Size Scale ───
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
export const WEIGHT = {
  normal: 'font-normal',        // 400
  book: 'font-[450]',           // 450
  medium: 'font-medium',        // 500
  strong: 'font-[550]',         // 550
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

// ─── Domain Colors ───
export const DOMAIN = {
  nutrition: { color: '#06B6D4', name: 'Cyan 500',    label: 'Nutrition' },
  training:  { color: '#DB2777', name: 'Pink 600',    label: 'Training' },
  body:      { color: '#6366F1', name: 'Indigo 500',  label: 'Body' },
} as const;

export type DomainKey = keyof typeof DOMAIN;

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
export const CATEGORY_COLORS = {
  session: 'var(--cat-session)',
  plan: 'var(--cat-plan)',
  analysis: 'var(--cat-analysis)',
  nutrition: 'var(--cat-nutrition)',
  coaching: 'var(--cat-coaching)',
} as const;

export type CategoryType = keyof typeof CATEGORY_COLORS;

// ─── Dark Surface ───
export const N1100 = 'var(--n1100)';

export const DARK = {
  BG: 'var(--dark-bg)',
  TEXT: 'var(--dark-text)',
  MUTED: 'var(--dark-muted)',
  BORDER: 'var(--dark-border)',
  HOVER: 'var(--dark-hover)',
} as const;

// ─── Font Classes ───
export const FONT = {
  body: "font-[family-name:var(--font-sans)]",
  label: "font-[family-name:var(--font-label)]",
  serif: "font-[family-name:var(--font-serif)]",
} as const;

// ─── Composed Text Styles ───
export const LABEL_STYLE = `${FONT.body} text-[11px] ${WEIGHT.strong} text-[var(--n600)]`;
export const VALUE_STYLE = `${FONT.body} tabular-nums ${WEIGHT.strong}`;
export const BODY_STYLE = `${FONT.body} text-[var(--n1150)] ${WEIGHT.normal}`;
export const MUTED_STYLE = `${FONT.body} text-[var(--n800)] ${WEIGHT.book}`;
export const QUIET_STYLE = `${FONT.body} text-[var(--n600)] ${WEIGHT.normal}`;
export const UNIT_STYLE = `${FONT.body} text-[var(--n800)] ${WEIGHT.book}`;

// ─── Border ───
export const BORDER = {
  subtle: 'border-[0.5px] border-[var(--n200)]',
  default: 'border-[0.5px] border-[var(--n400)]',
} as const;

// ─── Transition ───
export const TRANSITION = {
  colors: 'transition-colors duration-150',
  background: 'transition-[background-color] duration-150',
  opacity: 'transition-opacity duration-150',
  transform: 'transition-transform duration-150',
} as const;

// ─── Interactive States ───
export const HOVER_SAND = 'hover:bg-[var(--n200)]';
export const ACTIVE_SAND = 'bg-[var(--n400)]';
export const SELECTION_SAND = 'bg-(--n600)/15';
export const ACTIVE_BLACK = 'bg-[var(--n1150)] text-[var(--n50)]';
export const WHITE_LIFT = 'hover:bg-white';
export const ACTIVE_UNDERLINE = 'border-b-2 border-[var(--n1150)]';

// ─── Focus ring ───
export const FOCUS_RING = 'focus-visible:shadow-[0_0_0_2px_var(--bg),0_0_0_4px_var(--n600)] focus-visible:outline-none';
export const FOCUS_RING_THICK = FOCUS_RING;
export const FOCUS_RING_THIN = 'focus-visible:border-[1.5px] focus-visible:border-[var(--accent)] focus-visible:outline-none';
export const FOCUS_WITHIN_RING = 'focus-within:shadow-[0_0_0_2px_var(--bg),0_0_0_4px_var(--n600)]';

// ─── Modal ───
export const MODAL_WIDTH = { sm: 'max-w-[400px]', md: 'max-w-[520px]', lg: 'max-w-[640px]' } as const;

// ─── Toast ───
export const TOAST_MAX_VISIBLE = 3;
export const TOAST_DEFAULT_DURATION = 4000;

// ─── Dropdown ───
export const DROPDOWN_ITEM = cn('px-2.5 py-1.5', RADIUS.sm, SIZE_TEXT.md, WEIGHT.normal, 'text-[var(--n1150)]');

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
export const AVATAR_SIZES = { sm: 24, md: 32, lg: 40 } as const;

// ─── Sidebar ───
export const SIDEBAR_WIDTH = { expanded: 240, collapsed: 56 } as const;
export const NAV_ITEM_STYLE = 'px-3 py-2 rounded-[6px] text-[11px] font-[450] text-[var(--n1150)]';
export const NAV_ITEM_ACTIVE_BG = 'bg-[var(--accent-soft)]';
export const NAV_ICON = { size: 18, strokeWidth: 1.25, gap: 'gap-3.5' } as const;
/** @deprecated */ export const SIDEBAR_ITEM_STYLE = NAV_ITEM_STYLE;
/** @deprecated */ export const SIDEBAR_ITEM_ACTIVE = NAV_ITEM_ACTIVE_BG;

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
export const RATING_SEGMENT_SIZE = { default: 20, compact: 16 } as const

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
export function formatTime(seconds: number): string { ... }
export function formatPercent(ratio: number, precision = 1): string { ... }
export function formatCompact(n: number): string { ... }

// ─── Floating Shadow ───
export const FLOATING_SHADOW = '0 0 0.5px rgba(19,18,17,0.15), 0 3px 8px rgba(19,18,17,0.08), 0 1px 3px rgba(19,18,17,0.06)';

// ─── Editor Shell ───
export const PANEL_WIDTH = 240;
export const ICON_TAB_SIZE = 56;
export const TOOLBAR_BUTTON_SIZE = 32;

// ─── ActivityHeatmap ───
export const HEATMAP_CELL_SIZE = 12
export const HEATMAP_GAP = 2
export const HEATMAP_LEVELS = 5

// ─── WorkspaceSwitcher ───
export const WORKSPACE_SWITCHER_HEIGHT = 40

// ─── QuickSearch ───
export const QUICK_SEARCH_MAX_HEIGHT = 480

// ─── ConversationList ───
export const CONVERSATION_ITEM_HEIGHT = 44

// ─── StatsGrid ───
export const STATS_GRID_COLUMNS = { sm: 2, md: 3, lg: 4 } as const

// ─── Layout ───
export const LAYOUT = {
  maxWidth: 'max-w-[800px]',
  pagePadding: 'px-8',
  sectionGap: 'flex flex-col gap-10',
} as const;
```

### types/ui.ts (raw content)

```ts
// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import type { Size, SemanticColor } from '@/lib/ui';

export type { Size, SemanticColor };

export interface BaseComponentProps {
  className?: string;
}

export interface InteractiveProps extends BaseComponentProps {
  disabled?: boolean;
}

export interface LabelledProps extends BaseComponentProps {
  label?: string;
}

export interface ColoredProps extends BaseComponentProps {
  color?: SemanticColor;
}
```

### tokens.css — See section 8 (587 lines, too long to duplicate)

### RULES.md — See section 8 (included in Locked Design Decisions)

### Audit Result

```
━━━ RAMTT System Audit ━━━

Phase 1: UI components (111 files)
Phase 2: Chart primitives (54 files)
Phase 3: Math utilities (28 files)
Phase 4: Pages (32 files)

─── Results ───

✅ All files pass RAMTT system audit!

Audited 225 files across ui, charts, and pages.
```

---

## 7. Demo Pages

### /demo (Charts Demo) — page.tsx (3,292 lines, 40+ chart examples)

**All chart types demonstrated:**
ChartRoot, ChartLine, ChartArea, ChartBar, ChartCrosshair, ChartTooltip, ChartGrid, ChartPattern, ChartToolbar, ChartValueTracker, ChartAxisX, ChartAxisY, ChartRefLine, ChartZoneLine, ChartSyncProvider, ChartZoomHandler, ChartScrubber, ChartScatter, ChartCandlestick, ChartRadar, ChartRadialBar, ChartTreemap, ChartFunnel, ChartBoxPlot, ChartHeatmap, ChartCalendarHeatmap, ChartAnnotation, ChartSankey, ChartSunburst, ChartPyramid, ChartWaterfall, ChartBullet, ChartNavigator, ChartPeriodTabs, ChartWithSubChart

**Data sources:** Stock data, revenue, temperature/sensor, sparklines, sales, scatter, OHLC, cash flow, athlete profiles, browser share, disk usage, sales pipeline, response times, activity heatmaps, season maps, portfolio, timelines, energy balance, bullet metrics

### /demo/area — 9 area chart variants (785 lines)
1. Interactive area (hero, period selection, metrics)
2. Basic area (single series, natural curve)
3. Linear area (straight lines)
4. Step area (step interpolation)
5. Legend area (two series)
6. Stacked area (`stackSeries`)
7. Stacked expanded/100%
8. Gradient area
9. Axes area (Y-axis + tooltip)

### /demo/bar — 12 bar chart variants (827 lines)
1. Interactive bar (hero, period selection)
2. Basic bar
3. Horizontal bar (`orientation='horizontal'`)
4. Grouped bar (`groupIndex` + `groupCount`)
5. Stacked bar + legend
6. Label bar (`showLabels='outside'`)
7. Custom label (horizontal)
8. Mixed bar (per-bar colors via `colorFn`)
9. Active bar (click highlight, `activeIndex`)
10. Negative bar (above/below zero)
11. Axes bar (X/Y axes)
12. Percentage bar (normalized to 100%)

### /demo/line — 9 line chart variants (653 lines)
1. Interactive line (hero)
2. Basic line (natural curve)
3. Linear line
4. Step line
5. Multiple line (two series)
6. Dots line (`showDots`)
7. Custom dots (`renderDot`)
8. Label line (value labels above dots)
9. Dot colors (cycling `CHART_COLORS`)

### /demo/pie — 9 pie/donut variants (565 lines)
1. Basic pie
2. Separator none (`padAngle=0`)
3. Label pie (leader lines)
4. Custom label (far leader lines)
5. Label list (inside labels)
6. Legend pie
7. Donut (`innerRadius=0.6`)
8. Donut active (click selection, `centerContent`)
9. Donut with text (dropdown, `centerContent`)

### /demo/radar — 12 radar + radial variants (564 lines)
Radar (6): Basic, Dots, Lines only, Custom label, Grid circle, Grid none
Radial (6): Basic, Label, Grid, Text, Shape (rounded caps), Stacked

### /demo/tooltip — 6 tooltip variants (302 lines)
1. Default (dot indicators)
2. Indicator line
3. Indicator dashed
4. Formatter (custom value format)
5. Icons (inline SVG icons)
6. Advanced (`showTotal`)

### /demo/login — 3 login page variants (490 lines, UNCOMMITTED)
1. Minimal centered (violet accent)
2. Split screen (rose accent)
3. Floating card (indigo accent, magic link/password toggle)

### /ui-demo — All 111 @ramtt/ui components (1000+ lines)
Comprehensive showcase of every component with interactive examples, demo data, icon imports.

### Other Pages

| Page | Lines | Description |
|------|-------|-------------|
| `/accent-demo` | 300+ | Accent color picker, ~171 accents, settings replica, token panel |
| `/chart-test` | 1000+ | FIT file chart playground (real cycling data) |
| `/color-guide` | 150+ | Color token documentation |
| `/color-lab` | 587 | OKLCH color explorer (9 sections) — UNCOMMITTED |
| `/color-lab/live` | 402 | Interactive OKLCH sliders — UNCOMMITTED |
| `/icon-catalog` | 400+ | Icon browser (search, filter, variant selector, detail panel) |
| `/icon-demo` | ~100 | Icon animation demo |
| `/(docs)/*` | 819 total | Documentation site (7 pages) |

---

## 8. Locked Design Decisions (Verified from Code)

### Fonts

**Actually imported in layout.tsx:**
- Satoshi (via `next/font/local`, `--font-sans` variable) — **the ONLY font loaded by Next.js**

**Loaded in tokens.css via @font-face:**
- Satoshi (regular + italic) — used everywhere
- Space Grotesk — **loaded but NOT used** (all font vars resolve to Satoshi)
- Cormorant Garamond (regular + italic) — editorial only

**Font files in public/fonts/:**
- Satoshi-Variable.woff2, Satoshi-VariableItalic.woff2
- SpaceGrotesk-Variable.ttf/woff/woff2
- CormorantGaramond-VariableFont_wght.ttf (+ italic)
- InstrumentSans (still in public/fonts but NOT loaded anywhere)
- JetBrainsMono (still in public/fonts but NOT loaded anywhere)

**globals.css @theme font assignments:**
```
--font-body: "Satoshi"
--font-sans: "Satoshi"
--font-display: "Cormorant Garamond"
--font-serif: "Cormorant Garamond"
--font-mono: "Satoshi"       ← NOT a monospace font
--font-space: "Satoshi"      ← was Space Grotesk, now Satoshi
--font-label: "Satoshi"      ← was Space Grotesk, now Satoshi
```

### Weight Hierarchy (in live components, excl. backups)

From `lib/ui.ts` WEIGHT constants:
- **400** (`WEIGHT.normal`): body text, input text
- **450** (`WEIGHT.book`): units, metadata, sidebar nav
- **500** (`WEIGHT.medium`): badges, form labels, buttons
- **550** (`WEIGHT.strong`): headers, values, active tabs

Actual `font-[N]` usage in UI components: `font-[550]` (3×), `font-[450]` (1×), `font-[400]` (1×)
Actual `font-[N]` usage in chart components: `font-[550]` (2×), `font-[500]` (2×), `font-[450]` (1×)

### Border Width

`border-[0.5px]` occurrences: **73** (including `BORDER.default` and `BORDER.subtle` definitions)
This is the universal border width.

### Border Radius (actual values found in live code)

| Value | Count | Purpose |
|-------|-------|---------|
| `rounded-[2px]` | 38 | Chart legend indicators, small elements |
| `rounded-[4px]` | 29 | `RADIUS.sm` — badges |
| `rounded-[5px]` | 22 | `RADIUS.md` — buttons, inputs |
| `rounded-[6px]` | 17 | Nav items, tooltips |
| `rounded-[8px]` | 26 | Various |
| `rounded-[12px]` | 17 | `RADIUS.lg` — cards |
| `rounded-[3px]` | 8 | Small elements |
| `rounded-[1px]` | 1 | Minimal |

**Note:** `rounded-[8px]` (26 occurrences) is NOT in the RADIUS constant system. This is a deviation — should be `rounded-[5px]` or `rounded-[12px]`.

### Cursor

`cursor: default` is set **globally** in tokens.css:
```css
*, *::before, *::after { cursor: default !important; }
```
With overrides for `cursor: text` (inputs/textarea) and `cursor: grab/grabbing` (resize handles).

### transition-all

**0 occurrences** in live code (excluding backups/scripts/audit rules). The ban is enforced.

### style={{}}

**790 occurrences** in live code (excluding backups). Breakdown:
- `components/ui/`: 188 (CSS variable bridges, dynamic colors, SVG attributes)
- `components/charts/primitives/`: 101 (SVG positioning, font-family, dynamic styles)
- `app/demo/*`: 79 (chart card styling, `fontFamily: 'var(--font-sans)'`)
- `components/icons/*`: 59 (morph transitions, context-aware state)
- `app/accent-demo/`: 41 (accent token overrides)
- `app/color-guide/`: 37 (color swatches)
- `app/color-lab/`: 33 (interactive color display)

Most are CSS variable bridges (fontFamily, backgroundColor with CSS vars, SVG-specific attributes). This is expected and allowed by RULES.md.

### font-mono

**0 occurrences** as a Tailwind class in live code. The 7 hits in demo pages use `style={{ fontFamily: 'var(--font-mono)' }}` which resolves to Satoshi — this is fine.

### font-medium

**0 occurrences** as a Tailwind class in live code (only in lib/ui.ts definition and docs page reference). All components use `WEIGHT.medium` constant.

### uppercase

**0 occurrences** in live code (excluding backups/scripts). Sentence case is enforced.

### tracking-[*] (custom letter-spacing)

**0 occurrences** in live code (excluding backups/scripts). Only `tracking-wide` and `tracking-tight` appear in demo pages and chart-test page (12 occurrences — these are Tailwind presets, not custom values).

---

## 9. Open TODOs & Known Issues

### TODO/FIXME/HACK/XXX in project files

**0 occurrences** in any `.ts`/`.tsx` file in the project (excluding node_modules). The codebase is clean.

### Observed Issues from Code Reading

1. **ChartTooltip.old.tsx** — Obsolete file (253 lines) sitting alongside the current `ChartTooltip.tsx` (538 lines). Should be deleted.

2. **Space Grotesk loaded but unused** — `tokens.css` loads Space Grotesk via @font-face but all font variables now resolve to Satoshi. Wasted bandwidth on page load.

3. **InstrumentSans and JetBrainsMono font files in public/** — No longer loaded anywhere. Dead files.

4. **`clsx` dependency is redundant** — `lib/ui.ts` has its own `cn()` function, and `tailwind-merge` is also in deps. Three class-merging solutions exist.

5. **`@types/*` in dependencies instead of devDependencies** — `@types/node`, `@types/react`, `@types/react-dom` are in `dependencies` instead of `devDependencies`. Not harmful for the app but incorrect for package publishing.

6. **`rounded-[8px]` proliferation** — 26 occurrences of a border radius value not in the RADIUS constant system. Either should use `RADIUS.md` (5px) or `RADIUS.lg` (12px), or a new `RADIUS.md2` should be added for 8px.

7. **No barrel export for chart primitives** — Unlike `components/ui/index.ts`, chart primitives have no barrel file. Every import requires the full file path.

8. **RULES.md says "106 components"** — But index.ts exports 111 components. The count in RULES.md is stale.

9. **@ramtt/ui package.json says "18 accessible React UI components"** — Actual count is 111. Package description is stale.

10. **@ramtt/icons index.ts says "136 icons × 3 variants + 8 animated + 12 context + 11 morph + 30 reactive = 469 components"** — Actual counts: 400 line + 400 light + 400 solid + 400 duo + 20 animated + 26 context + 25 morph + 46 reactive = 1717 files. The index.ts comment is very stale.

---

## 10. Git Status

### Current branch: `main`

### Last 10 commits:

```
ad91e2b fix(icons): replace emoji with @ramtt/icons SVG + add icon rules to both RULES.md
ea0c9bc feat(charts): add /demo/tooltip page — 6 tooltip variants with tooltipIndicator + showTotal + icons
03f35ef feat(charts): add /demo/radar page — 6 radar + 6 radial variants with gridType + showDots + centerContent
93a3e81 feat(charts): add /demo/pie page — 9 pie/donut variants with activeIndex + centerContent + leader lines
dd01bf5 feat(charts): add /demo/line page — 9 line chart variants with showDots + renderDot
37b0f2f feat(charts): add /demo/bar page — 12 bar chart variants with horizontal + labels + activeIndex
2081719 fix(audit): resolve all 39 errors + 13 warnings — audit now passes clean
3389de6 fix(ui-demo): audit + fix all rule violations — tokens, spacing, structure
8417086 feat(charts): add /demo/area page — 9 area chart variants with curve prop
ee8eabb fix(ui-demo): clean up Wave 12 — remove bad components, rebuild properly
```

### Uncommitted changes:

```
Modified:   app/ui-demo/page.tsx
Untracked:  app/color-lab/
Untracked:  app/demo/login/
Untracked:  lib/oklch.ts
```

### Remote: Up to date with `origin/main`

---

## 11. What's Missing / Next Steps

### Briefs in docs/

| Brief | Status |
|-------|--------|
| `BRIEF-icon-light-variant.md` | **Done** — light variant is shipped (400 icons) |
| `CLAUDE-CODE-PROMPT-CHARTS-DEMO.md` | **Done** — master demo built |
| `RAMTT-CHARTS-GENERIC-DEMO-BRIEF (1).md` | **Done** — 40+ chart examples built |
| `RAMTT-UI-COMPONENT-SYSTEM-BRIEF-v2.md` | **Done** — 111 components shipped |
| `RAMTT-UI-POLISH-PASS.md` | **Done** — audit passes clean |

### Not Yet Built (based on code gaps)

1. **No dark mode** — Only light theme exists. Dark surface tokens exist for dark SURFACES but no system-wide dark mode.
2. **No i18n** — `lang="da"` hardcoded in layout, no translation system.
3. **No auth/API** — Demo pages only, no backend.
4. **No Storybook or component playground** — Components are tested via /ui-demo page only.
5. **No E2E tests** — Only unit tests (vitest). No Playwright/Cypress.
6. **No CI/CD pipeline** — No GitHub Actions, no automated testing.
7. **Packages not published** — `@ramtt/charts` and `@ramtt/ui` have package.json but are not on npm.

### Uncommitted Work in Progress

- `/color-lab` — OKLCH color explorer (interactive, functional)
- `/demo/login` — 3 login page variants with accent switching
- `lib/oklch.ts` — OKLCH utility functions

---

## 12. Questions for Malte

1. **Space Grotesk @font-face** — It's still loaded in tokens.css but all CSS variables now point to Satoshi. Can I remove the @font-face declaration and the SpaceGrotesk font files from public/fonts/?

2. **InstrumentSans + JetBrainsMono font files** — These are in public/fonts/ but not loaded anywhere. Safe to delete?

3. **`clsx` dependency** — `lib/ui.ts` has its own `cn()` and `tailwind-merge` is also installed. Is `clsx` used anywhere? Can it be removed?

4. **`motion` (Framer Motion)** — It's in dependencies. Is it actually used in any component? A quick grep would tell, but asking because it's a heavy dependency.

5. **`rounded-[8px]`** — 26 occurrences exist but it's not in the RADIUS constant. Should this become an official radius tier, or should occurrences be normalized to 5px or 12px?

6. **ChartTooltip.old.tsx** — Can this be deleted?

7. **Component count in RULES.md** — Says 106, actual is 111. Should I update it?

8. **@ramtt/icons index.ts comment** — Says "136 icons × 3 variants", actual is 400×4 variants + specials = 1717 files. Update?

9. **@ramtt/ui package.json description** — Says "18 accessible React UI components", actual is 111. Update?

10. **Uncommitted files** (`color-lab/`, `demo/login/`, `lib/oklch.ts`) — Are these ready to commit or still WIP?

11. **`backups/` directory** — Three old page snapshots. Still needed or can they be archived/removed?

12. **`tracking-wide` and `tracking-tight`** in demo/chart-test pages — These are Tailwind presets not custom `tracking-[*]` values, but the audit script doesn't catch them. Are they intentional or should they use normal letter-spacing?
