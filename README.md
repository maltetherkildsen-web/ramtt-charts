# ramtt-charts

> Zero-dependency SVG charts + UI components for React. Tailwind-native. 60fps hover. < 12KB.

![Early Development](https://img.shields.io/badge/status-early%20development-orange)
[![License](https://img.shields.io/badge/license-MIT%20OR%20Apache--2.0-blue)](LICENSE-MIT)

Two packages in one repo:
- **@ramtt/charts** — Custom SVG chart primitives with synced interactions, 60fps hover, LTTB downsampling
- **@ramtt/ui** — 12 accessible UI components with RAMTT design tokens baked in

**Copyright (c) 2026 RAMTT (Malte Therkildsen)**

## Install

```bash
npm install @ramtt/charts
npm install @ramtt/ui
```

Or just one:

```bash
npm install @ramtt/charts    # charts only
npm install @ramtt/ui        # UI components only
```

---

## Demo Pages

```bash
npm install
npm run dev        # http://localhost:5000
```

| Route | What it shows |
|-------|--------------|
| `/chart-test` | Full session analysis — 5 synced cycling charts, fuel log, fullscreen mode |
| `/demo` | 4 generic chart examples (stock, revenue, temperature, IoT sensors) |
| `/ui-demo` | All 12 UI components with interaction states, accessibility, dark dropdown |

---

## @ramtt/ui — Component Library

12 accessible components in `components/ui/`. Zero dependencies. Full WAI-ARIA compliance.

| Component | Description |
|-----------|------------|
| `MetricCard` | Labeled value with unit, subtitle, badge — standard + compact variants |
| `Badge` | Status pill — filled/outline, semantic colors, zone badges |
| `ToggleGroup` | Connected buttons — default (sand fill), pill, underline (tabs) variants |
| `Card` | Container with compound sub-components (Header, Title, Action, Body) |
| `DataRow` | Key-value row with unit, delta, badge — semantic dt/dd |
| `SectionHeader` | Uppercase tracked label with optional action — renders as h2 |
| `Button` | Primary (black), outline, ghost — sm/md/lg/icon sizes |
| `SettingsCard` | Icon + title + description + chevron — keyboard navigable |
| `DataTable` | Typed columns, number formatting, clickable rows with Enter handler |
| `ProgressBar` | Horizontal bar with role="progressbar" + ARIA value attributes |
| `Input` | Text/number input with label, unit suffix, proper label[htmlFor] |
| `Select` | Custom dark dropdown (#1E1E1E) with keyboard nav + type-ahead search |

### Design System

**Satoshi for everything:**
- **Satoshi** (`--font-sans` + `--font-label`) — body, labels, numbers, UI copy
- **Cormorant Garamond** (`--font-serif`) — editorial only, never in app UI

**4-level weight hierarchy** (Figma-calibrated):
- 400 (normal) — body text, nav items, input text
- 450 (book) — units, metadata, descriptions
- 500 (medium) — badges, form labels, button text
- 550 (strong) — section headers, card titles, values, active tabs

**Design tokens** in `components/ui/tokens.css`:
- Warm neutral scale (#FAF9F5 → #131211)
- Tailwind Catalyst semantic colors (lime/rose/amber/sky)
- Border radius: 4/5/12/16px (5px for interactive, 12px for cards)
- 0.5px borders, no shadows, cursor: default everywhere

**5 interaction patterns:**
| Pattern | Token | Usage |
|---------|-------|-------|
| Sand fill | `bg: --n400` | ToggleGroup selected, filter pills |
| Underline | `border-bottom: 2px` | Tab navigation |
| White lift | `bg: #FFFFFF` | Cards on sand background |
| Black fill | `bg: --n1150` | Primary button ONLY |
| Sand hover | `bg: --n200` | Table rows, ghost buttons |

**Accessibility:**
- All components: `forwardRef` with named functions
- ToggleGroup: WAI-ARIA radiogroup/tablist/toolbar + roving tabindex
- Select: combobox + listbox + type-ahead + Escape to close
- DataTable: scope="col", Enter on clickable rows
- SettingsCard: role="button" + Enter/Space keyboard handler
- ProgressBar: role="progressbar" + aria-valuenow/min/max
- Global `:focus-visible` ring (2px solid --n600)
- WCAG AA contrast verified (--n600 #76726A = 4.55:1 on --bg)

**System enforcement:**
- All 12 components import from `lib/ui.ts` — zero hardcoded values
- `npm run audit:ui` — consistency audit verifying fonts, borders, transitions, forwardRef, displayName
- `components/ui/RULES.md` — non-negotiable rules for building/extending components
- CRISP rendering: antialiased text, `text-wrap: balance/pretty`, reduced-motion respect

### Usage

```tsx
import { MetricCard, Badge, ToggleGroup, Card, Button } from '@/components/ui'

<Card>
  <Card.Header>
    <Card.Title>Session Overview</Card.Title>
    <Card.Action><Button size="sm" variant="ghost">Export</Button></Card.Action>
  </Card.Header>
  <Card.Body>
    <MetricCard label="AVG POWER" value="238" unit="W" subtitle="Max 904W" />
  </Card.Body>
</Card>
```

---

## @ramtt/charts — SVG Chart Primitives

16 composable SVG components + 8 math utilities. Zero chart dependencies.

| Component | Purpose |
|-----------|---------|
| `ChartRoot` | SVG container, auto-scales, provides context |
| `ChartLine` | Polyline with hybrid downsampling (smoothDecimate) |
| `ChartArea` | Gradient-filled area beneath the line |
| `ChartBar` | Vertical bar chart with colorFn support |
| `ChartCrosshair` | Zero-rerender hover tracking via refs |
| `ChartAxisY` | Left Y-axis with nice ticks |
| `ChartAxisX` | Bottom X-axis with formatted labels |
| `ChartRefLine` | Horizontal dashed reference line |
| `ChartZoneLine` | Line colored by training zones via SVG gradient |
| `ChartZoomHandler` | Scroll-zoom + brush-select + keyboard nav |
| `ChartSyncProvider` | Syncs crosshair + zoom across stacked charts |
| `ChartScrubber` | Mini-map with draggable viewport window |
| `ChartIntervalMarkers` | Sprint/interval labels + shaded regions |
| `ChartFuelLollipop` | Discrete fuel intake events (lollipop chart) |
| `ChartTooltip` | Floating tooltip primitive |
| `CrosshairTimeLabel` | Timestamp pill on X-axis |

### Math layer (`lib/charts/`)

| Module | Purpose |
|--------|---------|
| `scales/linear` | Linear scale with `.inverse()`, `.clamp()` |
| `paths/line` | SVG path d string generator |
| `paths/area` | Closed area path for gradient fills |
| `ticks/nice` | Human-friendly tick values (1, 2, 2.5, 5 × 10^n) |
| `utils/lttb` | Largest Triangle Three Buckets downsampling |
| `utils/smooth-decimate` | Hybrid downsampling: even spacing + peak preservation |
| `utils/extent` | Min/max with optional padding |
| `utils/bisect` | O(log n) nearest-point binary search |

### Quick start

```tsx
import { ChartRoot } from '@/components/charts/primitives/ChartRoot'
import { ChartLine } from '@/components/charts/primitives/ChartLine'
import { ChartArea } from '@/components/charts/primitives/ChartArea'
import { ChartCrosshair } from '@/components/charts/primitives/ChartCrosshair'
import { ChartAxisY } from '@/components/charts/primitives/ChartAxisY'

<ChartRoot data={[120, 145, 160, 180, 240, 265, 280, 250]} height={300}>
  <ChartAxisY />
  <ChartArea />
  <ChartLine />
  <ChartCrosshair />
</ChartRoot>
```

### Synced stacked charts

```tsx
<ChartSyncProvider dataLength={power.length}>
  <ChartRoot data={visiblePower} height={110}>
    <ChartLine />
    <ChartCrosshair />
    <ChartZoomHandler />
  </ChartRoot>
  <ChartRoot data={visibleHR} height={75}>
    <ChartLine className="fill-none stroke-red-500 stroke-[1.5]" />
    <ChartCrosshair dotColor="#ef4444" />
    <ChartZoomHandler />
  </ChartRoot>
  <ChartScrubber data={fullPower} />
</ChartSyncProvider>
```

---

## Architecture

```
Hover (zero re-renders — ref-based pub/sub):
  mousemove → rAF → bisectNearest → setAttribute()
    → sync.broadcastHover(index)
      → all crosshairs, data table, time pill update via refs

Zoom (React state — infrequent re-renders):
  wheel/keyboard → setZoom({ start, end })
    → charts re-render with sliced data arrays
```

---

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| Arrow Left/Right | Pan 10% of visible range |
| +/- | Zoom in/out 20% |
| Home/End | Jump to start/end |
| Escape | Reset zoom |
| F | Toggle fullscreen |

---

## File structure

```
components/
├── charts/primitives/     ← 16 SVG chart components
├── ui/                    ← 12 UI components + tokens.css + index.ts + RULES.md
lib/
├── ui.ts                  ← Design system foundation (sizes, fonts, borders, transitions)
├── charts/                ← Math: scales, paths, ticks, utils
app/
├── chart-test/            ← Full session analysis page
├── demo/                  ← Generic chart demo (non-sport)
├── ui-demo/               ← UI component showcase
public/
├── fonts/                 ← Variable font files (Satoshi + Cormorant Garamond)
```

---

## Gotchas

- **Turbopack cache**: `rm -rf .next && npm run dev` if changes don't appear
- **SVG text fonts**: Must use explicit `style={{ fontFamily }}` on `<text>` — Tailwind classes don't apply to SVG text
- **Padding undefined**: Never `{ ...obj, key: condition ? undefined : value }` — undefined overwrites defaults
- **Dev server**: Use `nohup npm run dev &` for persistent server, not background tasks

---

## License

Licensed under either of:

- [Apache License, Version 2.0](LICENSE-APACHE)
- [MIT License](LICENSE-MIT)

at your option.

Copyright (c) 2026 RAMTT (Malte Therkildsen)

### Trademark

"RAMTT" is a trademark of Malte Therkildsen. You may freely use, modify,
and distribute the code under the license terms, but derivative works must
not use the RAMTT name or branding without written permission.
