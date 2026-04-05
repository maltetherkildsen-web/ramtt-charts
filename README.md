# ramtt-charts

> Zero-dependency SVG chart system for React. Tailwind-native. Built for endurance sport analytics.

![Early Development](https://img.shields.io/badge/status-early%20development-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

Custom SVG chart system built from scratch for the RAMTT sports platform. Zero Recharts, zero D3 — pure math layer + React primitives + Tailwind className styling + Framer Motion animations. Designed for stacked training session charts with synced interactions, ref-based 60fps hover, CRISP rendering optimizations, and fullscreen analysis mode.

**Copyright (c) 2026 RAMTT**

---

## What it does

Five synced cycling charts (Power, HR, Speed, Cadence, Elevation) + optional Fuel/CHO lollipop chart. A Perplexity-style hover data table below the charts. Three-tier metrics above. Fullscreen analysis mode. All interactions at 60fps via refs — zero React re-renders on mousemove.

```
[Header — session title, scores]
[Tier 1 — key stats: Duration, Avg Power, NP, HR, Distance...]
[Tier 2 — RAMTT metrics: CHO, Fuel Score, Decoupling...]
[Tier 3 — Session context (collapsible)]
[Chart toggles: Power HR Speed Cadence Elevation Fuel | Zones | Fullscreen]
[Power chart ─────────────────────────── 110px]
[HR chart ────────────────────────────── 75px]
[Speed chart ─────────────────────────── 55px]
[Cadence chart ───────────────────────── 55px]
[Elevation chart ─────────────────────── 40px]
[Fuel/CHO lollipop chart ────────────── 75px (optional)]
[Crosshair time pill]
[Hover data table — live values per metric, selection averages]
[Fuel Log — add/remove intake cards]
[Tab bar — Summary, Intervals, Peaks, Zones, Load, Fuel, Analysis]
```

---

## Features

### Charts
- **Zero third-party chart deps** — pure SVG + React + TypeScript
- **Synced crosshair** — hover on one chart, crosshair moves on all simultaneously
- **Scroll zoom** — mouse wheel zoom centered on cursor position
- **Pan** — trackpad horizontal scroll, shift+scroll, or arrow keys
- **Brush selection** — click+drag to zoom into a range
- **Keyboard navigation** — arrows pan, +/- zoom, Home/End jump, Esc reset
- **Double-click** — reset zoom to full session
- **Chart toggles** — show/hide individual charts, toggle zone coloring
- **Zone-colored lines** — dynamic SVG gradient that shifts color by training zone (Coggan power, HR zones)

### Hover & Data
- **60fps hover** — mousemove -> rAF -> setAttribute(), zero React re-renders
- **Perplexity-style data table** — one row per metric below charts, updates live on hover
- **Selection averages** — zoom into an interval, table shows avg/max for that range
- **Crosshair time pill** — timestamp label on X-axis follows crosshair via CSS transform
- **Ref-based everything** — all hover updates via direct DOM mutation (textContent, style)
- **Toggle-aware** — data table only shows rows for active/visible charts

### Fuel/CHO Chart
- **Lollipop visualization** — stems + circles at each intake event, cumulative stepped area fill
- **Interactive intake log** — add/remove fuel products, chart updates live
- **Target reference line** — dashed line at CHO target (e.g. 200g)
- **Progress label** — "192g / 200g (96%)" at chart edge
- **Smart label collision** — gram labels hidden when dots are too close

### Fullscreen Mode
- **Fixed overlay** — charts fill entire viewport, press F to toggle
- **Data sidebar** — live hover values in a right-side panel (16px font, colored dots)
- **Proportional heights** — Power 35%, HR 20%, others scale proportionally
- **Toggle-aware** — sidebar only shows metrics for visible charts
- **All interactions work** — zoom, pan, brush, crosshair, keyboard nav

### Metrics
- **Three-tier system** above charts:
  - Tier 1: Key stats (Duration, Power, NP, HR, Distance, Elevation, Energy)
  - Tier 2: RAMTT metrics (CHO Intake, CHO Rate, Fuel Score, Decoupling)
  - Tier 3: Session context (collapsible, placeholder for platform data)
- **Computed from FIT data**: NP, VI, Decoupling, Peak Powers, Energy (kJ/kcal)

### Performance
- **HR smoothing** — zoom-adaptive rolling average removes integer-step staircase artifacts
- **Hybrid downsampling** — smoothDecimate combines even spacing with peak preservation
- **O(log n) hover** — bisectNearest for instant point lookup
- **rAF-batched pan** — fractional accumulator for sub-pixel trackpad precision
- **Keyboard momentum** — arrow keys accelerate/decelerate with friction decay (0.85/frame)

### CRISP Rendering
- **Antialiased SVG text** — `-webkit-font-smoothing: antialiased` + `font-kerning: normal` on all SVG text
- **geometricPrecision** — smooth anti-aliased curves on data paths
- **crispEdges** — pixel-aligned crosshair lines and reference lines
- **tabular-nums** — Y-axis labels align perfectly vertically
- **contain: paint** — chart stack repaints isolated from rest of page
- **contentVisibility: auto** — below-fold sections skip rendering until scrolled to

### Framer Motion Animations
- **Fullscreen enter/exit** — scale 0.98 fade with `ease-out-expo` (300ms enter, 200ms exit)
- **Chart toggle show/hide** — height + opacity animation (200ms) via `AnimatePresence`
- **Reduced motion** — `MotionConfig reducedMotion="user"` respects OS preferences
- **NOT animated** — crosshair (instant rAF), hover values (instant refs), path data (too many points). Motion is only for discrete state transitions.

### Easing Curves (CSS custom properties)
```css
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);   /* entrance */
--ease-in-expo: cubic-bezier(0.7, 0, 0.84, 0);     /* exit */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);  /* tactile */
```

---

## Primitives

16 composable SVG components + 1 context provider:

| Component | Purpose |
|-----------|---------|
| `ChartRoot` | SVG container, auto-scales, provides context |
| `ChartLine` | Polyline path with hybrid downsampling (smoothDecimate) |
| `ChartArea` | Gradient-filled area beneath the line |
| `ChartBar` | Vertical bar chart |
| `ChartCrosshair` | Zero-rerender hover tracking, broadcasts via sync |
| `ChartAxisY` | Left Y-axis with nice ticks (NaN-guarded) |
| `ChartAxisX` | Bottom X-axis with formatted labels (NaN-guarded) |
| `ChartRefLine` | Horizontal dashed reference line (CP, LT2, targets) |
| `ChartZoneLine` | Line colored by training zones via SVG linearGradient |
| `ChartZoomHandler` | Scroll-zoom + brush-select + keyboard nav |
| `ChartSyncProvider` | Syncs crosshair + zoom across charts (ref-based pub/sub) |
| `ChartScrubber` | Mini-map overview with draggable viewport window |
| `ChartIntervalMarkers` | Sprint/work interval labels + shaded regions |
| `ChartFuelLollipop` | Lollipop chart for discrete fuel/CHO intake events |
| `ChartTooltip` | Floating tooltip primitive (library component) |
| `CrosshairTimeLabel` | Timestamp pill on X-axis, positioned via transform |

---

## Math layer

Pure TypeScript, zero dependencies, zero DOM — `lib/charts/`:

| Module | Purpose |
|--------|---------|
| `scales/linear` | Linear scale with `.inverse()`, `.clamp()`, `.domain`, `.range` |
| `paths/line` | SVG path `d` string generator (M/L commands) |
| `paths/area` | Closed area path for gradient fills |
| `ticks/nice` | Human-friendly tick values (1, 2, 2.5, 5 x 10^n) |
| `utils/lttb` | Largest Triangle Three Buckets downsampling |
| `utils/smooth-decimate` | Hybrid downsampling: even spacing + peak preservation |
| `utils/extent` | Min/max with optional padding |
| `utils/bisect` | O(log n) nearest-point binary search |

---

## Architecture

```
Hover (zero re-renders — ref-based pub/sub):
  mousemove -> rAF -> bisectNearest(pixelXs, mouseX)
    -> setAttribute() on crosshair line + dot
    -> sync.broadcastHover(index)
      -> all ChartCrosshairs: showAt(index) via setAttribute()
      -> HoverDataTable: ref.textContent = value
      -> CrosshairTimeLabel: pill.style.transform = translateX(px)
      -> FullscreenDataSidebar: ref.textContent = value

Zoom (React state — re-renders expected, infrequent):
  wheel/keyboard -> setZoom({ start, end })
    -> SyncedCharts re-renders with sliced data arrays
    -> all ChartRoots receive new visible data + scales
    -> selection averages recompute via useMemo

Pan (rAF-batched):
  trackpad/shift+scroll -> accumulate deltaPixels in ref
    -> requestAnimationFrame -> convert to data-space delta
    -> setZoom() with clamped bounds

Fuel (stateful intakes):
  addIntake() -> setFuelIntakes([...prev, new])
    -> buildCumulativeCHO() recomputes per-second array
    -> ChartFuelLollipop re-renders with new intake positions
    -> Metrics tiers recompute CHO rate, fuel score, compliance
```

### Data flow

```
                     ChartSyncProvider
                    /        |        \
           broadcastHover  zoom    subscribeHover
               |            |           |
      ChartCrosshair    ChartRoot   HoverDataTable
      (setAttribute)   (re-render)  (ref.textContent)
                                        |
                            +-----------+------------+
                     CrosshairTimeLabel  |   FullscreenDataSidebar
                     (ref.transform)     |   (ref.textContent)
                                    MetricsTiers
                                   (React state)
```

---

## Quick start

### Single chart

```tsx
import { ChartRoot } from '@/components/charts/primitives/ChartRoot'
import { ChartLine } from '@/components/charts/primitives/ChartLine'
import { ChartArea } from '@/components/charts/primitives/ChartArea'
import { ChartCrosshair } from '@/components/charts/primitives/ChartCrosshair'
import { ChartAxisY } from '@/components/charts/primitives/ChartAxisY'

const data = [120, 145, 160, 180, 240, 265, 280, 250, 200, 140]

export function PowerChart() {
  return (
    <ChartRoot data={data} height={300}>
      <ChartAxisY />
      <ChartArea />
      <ChartLine />
      <ChartCrosshair />
    </ChartRoot>
  )
}
```

### Synced stacked charts

```tsx
import { ChartSyncProvider } from '@/components/charts/primitives/ChartSyncProvider'
import { ChartZoomHandler } from '@/components/charts/primitives/ChartZoomHandler'

<ChartSyncProvider dataLength={power.length}>
  <ChartRoot data={power} height={110}>
    <ChartAxisY tickCount={3} />
    <ChartRefLine y={280} label="CP 280W" />
    <ChartArea gradientColor="#059669" opacityFrom={0.10} opacityTo={0.005} />
    <ChartLine />
    <ChartCrosshair />
    <ChartZoomHandler />
  </ChartRoot>

  <ChartRoot data={heartRate} height={75}>
    <ChartArea gradientColor="#ef4444" opacityFrom={0.08} opacityTo={0.005} />
    <ChartLine className="fill-none stroke-red-500 stroke-[1.5]" />
    <ChartCrosshair dotColor="#ef4444" />
    <ChartZoomHandler />
  </ChartRoot>
</ChartSyncProvider>
```

### Fuel/CHO lollipop chart

```tsx
import { ChartFuelLollipop } from '@/components/charts/primitives/ChartFuelLollipop'

<ChartRoot data={cumulativeCHO} height={75} yDomain={[0, 220]}>
  <ChartFuelLollipop
    intakes={[
      { timestamp: 900, choGrams: 48 },
      { timestamp: 1800, choGrams: 48 },
    ]}
    target={200}
  />
  <ChartCrosshair dotColor="#f97316" />
  <ChartZoomHandler />
</ChartRoot>
```

### Keyboard shortcuts (when chart is focused)

| Key | Action |
|-----|--------|
| Arrow Left / Right | Pan 10% of visible range |
| + / - | Zoom in/out 20% centered |
| Home / End | Jump to start/end of session |
| Escape / 0 | Reset zoom to full range |
| F | Toggle fullscreen mode |

---

## Session analysis page

The demo at `/chart-test` is a complete session analysis page:

### Above the fold (~729px)
- **Session header** — title, date, device, effort/quality/legs scores
- **Three-tier metrics** — key stats, RAMTT metrics, collapsible context
- **Chart toggles** — per-chart visibility, zone mode, fullscreen button
- **5 synced charts** — Power (110px), HR (75px), Speed (55px), Cadence (55px), Elevation (40px)
- **Optional CHO lollipop** — fuel intake visualization (75px)
- **Hover data table** — Perplexity-style, one row per visible chart

### Below the fold
- **Fuel log** — add/remove intake cards with orange accent borders
- **Tab bar** — shell for future deep-dive content

### Computed metrics
- **Normalized Power (NP)** — 30s rolling average, 4th power
- **Variability Index (VI)** — NP / Avg Power
- **Decoupling** — first-half vs second-half efficiency factor comparison
- **Energy** — kJ, kcal, kJ/min from power data
- **CHO metrics** — intake rate, compliance %, fuel score from intake log
- **Peak Powers** — sliding window max for 5s/30s/1m/5m/10m/20m/1h

---

## Demo

```bash
npm install
npm run dev        # http://localhost:5000/chart-test
```

Loads real FIT cycling data (5223 records, 88 min session) with sprint interval markers, zone-colored lines, interactive fuel log, and fullscreen mode.

---

## Gotchas

- **Turbopack cache**: If changes don't appear, run `rm -rf .next && npm run dev`
- **Padding undefined bug**: Never use `condition ? undefined : value` in spread objects — `undefined` overwrites defaults. Use `condition ? objWithoutKey : { ...obj, key: value }` instead.
- **NaN guards**: ChartAxisX, ChartAxisY, and ChartRefLine skip rendering elements where computed position is NaN/Infinity.
- **HR smoothing**: HR data gets a zoom-adaptive rolling average (window 1/3/5) before downsampling to remove integer-step staircase artifacts from whole-bpm sensor readings.

---

## License

MIT License -- Copyright (c) 2026 RAMTT

See [LICENSE](./LICENSE) for full terms.
