# RAMTT-Charts — Komplet Repo-Overblik

> **Sidst opdateret:** 2026-04-17
> **Commits:** 219 (siden 2026-04-05, 13 udviklingsdage)
> **Source-filer:** 2.040
> **Linjer kode:** ~104.582
> **Licens:** MIT OR Apache-2.0
> **Copyright:** 2026 RAMTT (Malte Therkildsen)

> _Denne version opdaterer 13-april-dokumentet med de 121 nye commits fra 13.→17. april: Wave 8B/9/10/11/12/13 UI (66→112), Light-variant ikoner (439→1717), 24 nye chart-primitiver (28→52), 7 shadcn-parity demo-sider, docs-site `(docs)/`, accent-system, color-lab, CLAUDE.md-regler, chart-test zoom-lag saga, 400-ikon-milepæl m.m._

---

## Indholdsfortegnelse

1. [Projekt-Oversigt](#1-projekt-oversigt)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Sider & Routes (26)](#3-sider--routes)
4. [Chart-Primitiver (52 komponenter)](#4-chart-primitiver)
5. [Chart Math Layer (19 moduler)](#5-chart-math-layer)
6. [UI-Komponenter (112 komponenter)](#6-ui-komponenter)
7. [Ikon-System (1.717 filer / 8 varianter / 400 base)](#7-ikon-system)
8. [Design System Foundation](#8-design-system-foundation)
9. [Data & Parsers (FIT / GPX / TCX)](#9-data--parsers)
10. [Scripts & Tooling (11)](#10-scripts--tooling)
11. [NPM Packages (2)](#11-npm-packages)
12. [Dokumentation (17+ filer)](#12-dokumentation)
13. [Assets & Fonts](#13-assets--fonts)
14. [Backups (4)](#14-backups)
15. [Konfiguration + CLAUDE.md](#15-konfiguration)
16. [Git-Historik (219 commits, 13 dage)](#16-git-historik)
17. [Arkitektur-Mønstre](#17-arkitektur-mønstre)
18. [Vigtige Regler & Gotchas](#18-vigtige-regler--gotchas)
19. [Samlet Statistik](#19-samlet-statistik)

---

## 1. Projekt-Oversigt

**ramtt-charts** er et monorepo der indeholder to publicerbare NPM-pakker til RAMTT-platformen:

- **@ramtt/charts** — Zero-dependency SVG chart-primitiver med synkroniseret interaktion, 60fps hover, LTTB downsampling, pinch-to-zoom
- **@ramtt/ui** — 112 tilgængelige UI-komponenter med RAMTT design tokens (13 waves)

Repo'et fungerer som et selvstændigt Next.js-site med:
- En komplet **docs-site** under `(docs)/`
- En **FIT-fil-analyse-side** (`/chart-test`, crown jewel)
- **7 shadcn-parity demo-sider** (area, bar, line, pie, radar, tooltip, treemap)
- En **ikon-katalog** med søgning/filter/variant-toggle
- **Accent-/farve-labs** (`/accent-demo`, `/color-lab`, `/color-guide`)
- **UI showcase** med alle 112 komponenter

---

## 2. Tech Stack & Dependencies

### Runtime Dependencies (package.json)
| Pakke | Version | Formål |
|-------|---------|--------|
| `next` | ^16.2.2 | App Router + Turbopack |
| `react` | ^19.2.4 | UI-framework |
| `react-dom` | ^19.2.4 | DOM-rendering |
| `typescript` | ^6.0.2 | Type-checking |
| `tailwindcss` | ^4.2.2 | Utility-first CSS (v4, @theme tokens) |
| `@tailwindcss/postcss` | ^4.2.2 | PostCSS-integration |
| `motion` | ^12.38.0 | Animation (Framer Motion successor) — **KUN i chart-test** for panel collapse/expand |
| `clsx` | ^2.1.1 | Conditional class-merging |
| `tailwind-merge` | ^3.5.0 | Tailwind class-dedup |
| `fit-file-parser` | ^2.3.3 | Garmin .fit fil-parsing |
| `@types/node` | ^25.5.2 | Node type definitions |
| `@types/react` | ^19.2.14 | React type definitions |
| `@types/react-dom` | ^19.2.3 | React DOM type definitions |

### Dev Dependencies
| Pakke | Version | Formål |
|-------|---------|--------|
| `tsup` | ^8.5.1 | Package bundler |
| `vitest` | ^4.1.2 | Unit testing |

### Zero Eksterne Dependencies
Chart-primitiver og math layer bruger **ingen** eksterne libraries — kun React + native SVG. `motion`-pakken bruges KUN til panel collapse/expand i `app/chart-test/page.tsx` (se CLAUDE.md § regler).

---

## 3. Sider & Routes

Total: **26 sider** (7 synlige hoved-sider + 7 demo-parity + 9 docs + 3 støtte).

### 3.1 Home (`/`) — `app/page.tsx`
Fandtes oprindeligt som redirect til `/chart-test`. Overskygges nu af `(docs)/page.tsx` som landing for docs-site. 5 linjer.

### 3.2 Session Analysis (`/chart-test`) — **CROWN JEWEL**
**`app/chart-test/page.tsx`** — Den primære feature-side.

**Funktionalitet:**
- FIT-fil upload (Garmin .fit binær-filer)
- 7 synkroniserede chart-kanaler: Power, HR, kJ/min, Cadence, Speed, Elevation, Torque
- Crosshair-synkronisering på tværs af alle charts (zero re-renders via ref-based pub/sub)
- Scroll-zoom + brush-selection + keyboard navigation + **pinch-to-zoom**
- **Single-click = reset zoom til full range** (2026-04-16)
- Peak Powers strip med 10 durationer (3s, 10s, 30s, 1m, 3m, 7m, 12m, 20m, 30m, 60m)
- Klik-på-peak → zoom til det tidsinterval (sqrt padding)
- Power zones + HR zones overlay (toggle)
- Fullscreen-mode med chart-visibility toggles
- **AthleteParamsPanel** — manuel FTP/CP/Weight input (erstatter SessionDataPanel's weight)
- Metrisk visning: distance, kalorier, temperatur, ascent, energi-erstatning
- **Fallback kcal fra energyKJ** når FIT-fil mangler `total_calories` (2026-04-16)
- Fueling-metrics med progress bar
- **CHO total label** + max W/HR i hover data-tabel (2026-04-17)
- **Max W + max HR** i fullscreen sidebar (2026-04-17)
- Hover data-tabel (3-kolonne grid)
- Scrubber mini-map

**Støtte-komponenter:** `components/chart-test/AthleteParamsPanel.tsx`

**Layout:** `app/chart-test/layout.tsx` — 15 linjer, `revalidate: 0`, `dynamic: 'force-dynamic'`.

### 3.3 Generic Demo (`/demo`) — `app/demo/page.tsx` + `app/demo/generate-data.ts`
**~600+ linjer** — Showcase af 20+ chart-typer med syntetiske data.

**Chart-typer demonstreret:**
1. Stock Price (linje + area)
2. Revenue vs Costs (multi-linje)
3. Server Temperature (gradient area)
4. IoT Sensor Dashboard (multi-kanal)
5. Sparkline Strip
6. Monthly Sales (bar)
7. Revenue & Growth (composed)
8. Market Share (stacked area)
9. Donut
10. Percent Area (100% stacked)
11. Scatter Plot
12. Stacked Bar
13. Candlestick (OHLC)
14. Waterfall
15. Radar/Spider
16. Radial Bar
17. Treemap
18. Funnel
19. Box Plot
20. Heatmap
21. Calendar Heatmap (GitHub-stil)
22. Sparkline Table
23. Annotations
24. Gradient Threshold Area

**Data Generator:** `generate-data.ts` — 24+ funktioner til at generere realistisk demo-data.

**Fix A/B/C (2026-04-16):** 8 visual redesigns (muted colors, token fills, refined proportions) + 4 interaction bugs + 3 polish fixes.

### 3.4 Shadcn-Parity Demo-Sider (NYE — 2026-04-16)

Dedikerede sider der beviser @ramtt/charts matcher shadcn/Recharts feature-for-feature:

| Route | Fil | Varianter | Nye features |
|-------|-----|-----------|--------------|
| `/demo/area` | `app/demo/area/page.tsx` | **9 varianter** | `CurveType` prop ('natural' \| 'linear' \| 'step'), stacked, gradient, dotted |
| `/demo/bar` | `app/demo/bar/page.tsx` | **12 varianter** | `horizontal` orientation, `showLabels`, `activeIndex`, `groupIndex`/`groupCount` stagger, mixed colorFn |
| `/demo/line` | `app/demo/line/page.tsx` | **9 varianter** | `showDots`, `renderDot` custom, step lines, labels |
| `/demo/pie` | `app/demo/pie/page.tsx` | **9 pie/donut** | `activeIndex` wedge expand, `centerContent`, leader lines, labels |
| `/demo/radar` | `app/demo/radar/page.tsx` | **6 radar + 6 radial** | `gridType` ('polygon' \| 'circle'), `showDots`, `centerContent` |
| `/demo/tooltip` | `app/demo/tooltip/page.tsx` | **6 tooltip-varianter** | `tooltipIndicator`, `showTotal`, ikon-integration |
| `/demo/treemap` | `app/demo/treemap/page.tsx` | Hierarchical | `ChartTreemapPro` med Jade/Clay 3-step color scale |

Hver side har sin egen `generate-data.ts` med shadcn-kompatibel seed data.

### 3.5 Login Demo (`/demo/login`) — `app/demo/login/page.tsx`
Auth-screen mockup. Bruger `AuthLayout` + `OAuthButton` + `RamttWordmark`.

### 3.6 UI Demo (`/ui-demo`) — `app/ui-demo/page.tsx`
Interaktiv showcase af alle 112 UI-komponenter med:
- Alle interaktions-states
- Accessibility-demonstrationer
- Dark dropdown
- Komponent-gruppering efter wave (1-13)
- Wave 12 Claude-inspired demos (2026-04-16)

Senest oprydning: audit+fix alle rule violations, remove emoji→Light icons (18px), rebuilt Wave 12 demos.

### 3.7 Color Guide (`/color-guide`) — `app/color-guide/page.tsx` + `app/color-guide/chart-data.ts`
**~700+ linjer** — Visual farve-reference med:
- 30 sektioner
- ~155 design tokens
- ~310 design-beslutninger
- 65 chart farve-illustrationer
- Warm dark mode preview
- Neutral-skala, zone-farver, signal-farver, nutrient-farver

### 3.8 Accent Demo (`/accent-demo`) — **NY** (2026-04-14 → 16)
**`app/accent-demo/page.tsx`** + 5 støtte-filer:
- `AccentPicker.tsx` — accent-vælger UI
- `accents.ts` — **~171 accents** på tværs af ~20 familier (Tailwind 500/600/700/800/900/950 + 14 custom: vivid purple, acid yellow, hot pink m.fl. + earth tones, teal, forest, exotic)
- `components.tsx` — sidebar nav components
- `SettingsReplica.tsx` — komplet settings-replica til at teste accents i real context
- `TokenPanel.tsx` — HSL-baseret token ramp generator (kollapsibel)

**Features:**
- Settings-replica med sidebar, header, cards
- 12 CSS variabler genereres fra hver accent
- Sidebar-nav eksperimenter (gap 8px→14px, icons 18/20/24px, weight 400/450/550)
- Accent-wash vs. accent-soft active state-tests

### 3.9 Color Lab (`/color-lab` + `/color-lab/live`) — **NY**
Farvesystem-laboratorium. Live-version bruger `lib/oklch.ts` til OKLCH-baseret color manipulation.

### 3.10 Icon Demo (`/icon-demo`) — `app/icon-demo/page.tsx`
**~315 linjer** — Ikon-katalog med:
- Alle 400 line-ikoner
- Variant-sammenligning (line/light/solid/duo)
- Størrelses-sammenligning (16/18/20/24px)
- Click-to-copy
- Animated ikoner showcase

### 3.11 Icon Catalog (`/icon-catalog`) — `app/icon-catalog/page.tsx`
**1.020 linjer** — Komplet interaktivt ikon-katalog med:
- Søgning efter navn/tags
- Filtrering efter kategorier (nu 30+)
- Variant toggle (Line/Light/Solid/Duo)
- Størrelses toggle (16/18/20/24)
- Farve-picker
- Detail-paneler for hvert ikon
- Context-aware, morph og reactive ikon-sektioner

**Fixes (2026-04-15):** fjernet `min-h-screen`, enlarged close button til 32×32px, click-outside to close.

### 3.12 Docs-Site (`app/(docs)/`) — **HELT NYT** (2026-04-16)

Route group med komplet docs-landing:

| Route | Fil | Formål |
|-------|-----|--------|
| `/` (docs landing) | `(docs)/page.tsx` | Docs hjem |
| `/getting-started` | `getting-started/page.tsx` | Onboarding |
| `/tokens` | `tokens/page.tsx` | Design token reference |
| `/patterns` | `patterns/page.tsx` | UI-patterns |
| `/icons` | `icons/page.tsx` | Ikon-dokumentation |
| `/components` | `components/page.tsx` | Komponent-oversigt |
| `/components/[slug]` | `components/[slug]/page.tsx` | Dynamic per-component docs |
| `/charts` | `charts/page.tsx` | Chart-oversigt |
| `/charts/[slug]` | `charts/[slug]/page.tsx` | Dynamic per-chart docs |

Layout: `(docs)/layout.tsx`

**Registry-filer (lib/docs/):**
- `registry.ts` — Komponent-registry for dynamic routes
- `chart-registry.ts` — Chart-registry for dynamic routes
- `navigation.ts` — Sidebar-navigation struktur

### 3.13 Root Layout — `app/layout.tsx`
**39 linjer** — Satoshi font loading, DevCacheGuard, global CSS.

### 3.14 Global CSS — `app/globals.css`
**174 linjer** — Tailwind `@theme` directives med RAMTT color system, surfaces, text hierarchy, power/HR/CHO/kJ zones.

---

## 4. Chart-Primitiver

**Sti:** `components/charts/primitives/`
**Antal:** **52 primitiver** + 2 hooks/utils + 1 context + 1 RULES.md + 9 test-filer

### 4.1 Kerne-Primitiver (bygger alt)

| Komponent | Fil | Formål |
|-----------|-----|--------|
| **ChartRoot** | `ChartRoot.tsx` | SVG-container, auto-scaling, ChartContext provider |
| **ChartLine** | `ChartLine.tsx` | Polyline med hybrid downsampling + `CurveType` + `showDots` + `renderDot` |
| **ChartArea** | `ChartArea.tsx` | Gradient-filled area under en linje + `CurveType` |
| **ChartBar** | `ChartBar.tsx` | Vertikal/**horizontal** bar chart, `showLabels`, `activeIndex`, `groupIndex`/`groupCount` stagger |
| **ChartGrid** | `ChartGrid.tsx` | Bagvedliggende grid-linjer (ny) |
| **ChartAxisX** | `ChartAxisX.tsx` | X-akse med formatering (tid, dato, custom) |
| **ChartAxisY** | `ChartAxisY.tsx` | Y-akse med niceTicks, label |
| **ChartCrosshair** | `ChartCrosshair.tsx` | Zero-rerender hover via ref-based pub/sub |
| **ChartSyncProvider** | `ChartSyncProvider.tsx` | Context der synkroniserer zoom + hover. **VIGTIGT:** zoom MUST bruge direct `setZoomState()` — debouncing = katastrofalt lag |
| **ChartZoomHandler** | `ChartZoomHandler.tsx` | Scroll-zoom + brush + keyboard (piltaster, +/-, Home/End, Esc, F) + **pinch-gesture** |
| **ChartRefLine** | `ChartRefLine.tsx` | Horisontal stiplet reference-linje (FTP, threshold) |
| **ChartPattern** | `ChartPattern.tsx` | SVG pattern definitions (ny) |

### 4.2 Specialiserede Chart-Typer

| Komponent | Fil | Formål |
|-----------|-----|--------|
| **ChartScatter** | `ChartScatter.tsx` | Scatter plot (x,y punkter) |
| **ChartCandlestick** | `ChartCandlestick.tsx` | OHLC candlestick (aktier) |
| **ChartRadar** | `ChartRadar.tsx` | Radar/spider chart, `gridType` ('polygon'\|'circle'), `showDots`, `centerContent` |
| **ChartRadialBar** | `ChartRadialBar.tsx` | Radial bar (doughnut-stil ringer) |
| **ChartTreemap** | `ChartTreemap.tsx` | Treemap med nested rektangler |
| **ChartTreemapPro** | `ChartTreemapPro.tsx` | **NY** — Hierarchical treemap med Jade/Clay 3-step color scale |
| **ChartFunnel** | `ChartFunnel.tsx` | Funnel chart |
| **ChartPyramid** | `ChartPyramid.tsx` | **NY** — Pyramid/triangle visualisering |
| **ChartBoxPlot** | `ChartBoxPlot.tsx` | Box plot (Q1, median, Q3, whiskers) |
| **ChartHeatmap** | `ChartHeatmap.tsx` | 2D heatmap grid med farve-interpolation |
| **ChartCalendarHeatmap** | `ChartCalendarHeatmap.tsx` | Kalender heatmap (GitHub-stil) |
| **ChartDonut** | `ChartDonut.tsx` | Donut/pie chart med `activeIndex`, `centerContent`, leader lines |
| **ChartWaterfall** | `ChartWaterfall.tsx` | Waterfall chart (running totals) |
| **ChartSankey** | `ChartSankey.tsx` | **NY** — Sankey flow diagram |
| **ChartSunburst** | `ChartSunburst.tsx` | **NY** — Sunburst/radial hierarchy |
| **ChartBullet** | `ChartBullet.tsx` | **NY** — Bullet chart (target, range, measure) |

### 4.3 Domain-Specifikke Visualiseringer

| Komponent | Fil | Formål |
|-----------|-----|--------|
| **ChartMMP** | `ChartMMP.tsx` | **NY** — Mean Maximal Power curve (cycling) |
| **ChartPMC** | `ChartPMC.tsx` | **NY** — Performance Management Chart (CTL/ATL/TSB) |
| **ChartZoneLine** | `ChartZoneLine.tsx` | SVG gradient zone-farver (power/HR zones) |
| **ChartZoneBackground** | `ChartZoneBackground.tsx` | **NY** — Filled zone-regioner bag data |
| **ChartIntervalMarkers** | `ChartIntervalMarkers.tsx` | Sprint/interval labels + shaded regioner |
| **ChartFuelLollipop** | `ChartFuelLollipop.tsx` | Diskrete fuel-intake events |
| **ChartValueTracker** | `ChartValueTracker.tsx` | **NY** — Value-tracking indicator |

### 4.4 Interaktions-Lag

| Komponent | Fil | Formål |
|-----------|-----|--------|
| **ChartScrubber** | `ChartScrubber.tsx` | Mini-map med draggable viewport |
| **ChartNavigator** | `ChartNavigator.tsx` | **NY** — Navigator med handles |
| **CrosshairTimeLabel** | `CrosshairTimeLabel.tsx` | Timestamp-pill på X-aksen |
| **BrushOverlay** | `BrushOverlay.tsx` | Semi-transparent brush overlay |
| **ChartTooltip** | `ChartTooltip.tsx` | Floating tooltip med `tooltipIndicator`, `showTotal` |
| **ChartAnnotation** | `ChartAnnotation.tsx` | Floating label med pointer |
| **ChartPeriodTabs** | `ChartPeriodTabs.tsx` | **NY** — Periode-tabs til chart-filtre |
| **ChartWithSubChart** | `ChartWithSubChart.tsx` | **NY** — Master/detail composition |

### 4.5 Hooks & Context

| Fil | Formål |
|-----|--------|
| `chart-context.ts` | React.createContext for ChartRoot data/scales |
| `useChartZoom.ts` | Zoom-state management hook + **pinch-to-zoom gesture** (2026-04-15) |

### 4.6 Tests (9 primitiv-tests)

| Test-fil | Dækker |
|----------|--------|
| `ChartAnnotation.test.tsx` | Annotation rendering |
| `ChartBoxPlot.test.tsx` | Box plot beregninger |
| `ChartCalendarHeatmap.test.tsx` | Kalender layout |
| `ChartCandlestick.test.tsx` | OHLC rendering |
| `ChartFunnel.test.tsx` | Funnel layout |
| `ChartHeatmap.test.tsx` | Heatmap farve-interpolation |
| `ChartRadar.test.tsx` | Radar geometry |
| `ChartRadialBar.test.tsx` | Radial bar arcs |
| `ChartTreemap.test.tsx` | Treemap layout algoritme |

### 4.7 Import-Regler

**Ingen barrel export** for chart-primitiver — import direkte fra fil-sti (`components/charts/primitives/ChartLine`).

---

## 5. Chart Math Layer

**Sti:** `lib/charts/`
**Princip:** Ren TypeScript, nul dependencies, nul React, nul DOM.

### 5.1 Scales — `lib/charts/scales/`

| Fil | Eksporter | Formål |
|-----|-----------|--------|
| `linear.ts` | `scaleLinear`, `LinearScale` | Lineær scale med .inverse(), .clamp(), .domain(), .range() |
| `log.ts` | `scaleLog` | **NY** — Logarithmic scale |
| `time.ts` | `scaleTime` | **NY** — Time/date scale |
| `band.ts` | `scaleBand` | **NY** — Band/ordinal scale til bar charts |
| `__tests__/` | Tests for alle 4 scales | Domain, range, inversion, clamping |

### 5.2 Paths — `lib/charts/paths/`

| Fil | Eksporter | Formål |
|-----|-----------|--------|
| `line.ts` | `linePath`, `Accessor`, **`CurveType`** | SVG path d-streng for polylines + step-funktioner + 'natural'/'linear'/'step' curves |
| `area.ts` | `areaPath` | Lukket area-path for gradient fills (med CurveType) |
| `arc.ts` | `arcPath`, `pieLayout` | SVG arc path + pie/donut layout |
| `radar.ts` | `radarPoints`, `radarPath`, `radarGridPoints` | Radar/spider chart geometri |

### 5.3 Layouts — `lib/charts/layouts/` (NY)

| Fil | Eksporter | Formål |
|-----|-----------|--------|
| `sankey.ts` | Sankey flow layout | **NY** — Multi-level flow diagram |
| `sunburst.ts` | Sunburst hierarchy layout | **NY** — Radial tree layout |

### 5.4 Ticks — `lib/charts/ticks/`

| Fil | Eksporter | Formål |
|-----|-----------|--------|
| `nice.ts` | `niceTicks`, `niceNum` | Menneske-venlige tick-værdier (1, 2, 2.5, 5 × 10^n) |

### 5.5 Utils — `lib/charts/utils/`

| Fil | Eksporter | Formål |
|-----|-----------|--------|
| `lttb.ts` | `lttb`, `Point` | Largest Triangle Three Buckets downsampling — O(n) |
| `smooth-decimate.ts` | `smoothDecimate` | Hybrid downsampling: even spacing + peak preservation |
| `extent.ts` | `extent`, `extentOf` | Min/max med optional padding |
| `bisect.ts` | `bisectNearest`, `bisectData` | O(log n) binær søgning for nærmeste punkt |
| `nearest2d.ts` | `nearest2d` | Nærmeste punkt i 2D-rum |
| `stack.ts` | `stackSeries` | Stack multiple serier (area, bar stacking) |
| `waterfall.ts` | `waterfallLayout`, `WaterfallItem`, `WaterfallBar` | Waterfall chart layout |
| `treemap.ts` | `treemapLayout`, `TreemapItem`, `TreemapRect` | Squarified treemap layout algoritme |
| `colorInterpolate.ts` | `interpolateColor`, `hexToRgb`, `rgbToHex` | RGB farve-interpolation |
| `colorScale.ts` | `interpolateColorScale`, `parseHexColor`, `isLightColor` | Værdi-baseret farve-interpolation (heatmaps) |
| `peakPower.ts` | `computePeakPower` | **NY** — Peak power beregning (3s-60m durationer) |
| `pmc.ts` | `computePMC` | **NY** — Performance Management Chart (CTL, ATL, TSB) |
| `sma.ts` | `computeSMA` | **NY** — Simple Moving Average |
| `zoom.ts` | `zoomReducer`, helpers | **NY** — Ekstraheret zoom-logic |
| `animate.ts` | Animation helpers | **NY** — Shared animation utilities |
| `capture.ts` | Export-til-image helpers | **NY** — PNG/SVG capture |

### 5.6 Komplet Test-Oversigt (19+ math test-filer)

| Test-fil | Dækker |
|----------|--------|
| `scales/__tests__/linear.test.ts` | Linear scale |
| `scales/__tests__/log.test.ts` | **NY** Log scale |
| `scales/__tests__/time.test.ts` | **NY** Time scale |
| `scales/__tests__/band.test.ts` | **NY** Band scale |
| `paths/__tests__/line.test.ts` | Line path + CurveType |
| `paths/__tests__/area.test.ts` | Area path |
| `paths/__tests__/arc.test.ts` | Arc path + pie layout |
| `paths/radar.test.ts` | Radar points + path + grid |
| `ticks/__tests__/nice.test.ts` | Nice tick ranges |
| `utils/__tests__/lttb.test.ts` | LTTB downsampling |
| `utils/__tests__/extent.test.ts` | Min/max + padding |
| `utils/__tests__/bisect.test.ts` | Binary search |
| `utils/__tests__/nearest2d.test.ts` | 2D nearest point |
| `utils/__tests__/smooth-decimate.test.ts` | Hybrid downsampling |
| `utils/__tests__/stack.test.ts` | Series stacking |
| `utils/__tests__/treemap.test.ts` | Treemap layout |
| `utils/__tests__/waterfall.test.ts` | Waterfall layout |
| `utils/__tests__/peakPower.test.ts` | **NY** Peak power curves |
| `utils/__tests__/pmc.test.ts` | **NY** PMC model |
| `utils/animate.test.ts` | **NY** Animation helpers |
| `utils/capture.test.ts` | **NY** Image capture |
| `utils/colorInterpolate.test.ts` | RGB interpolation |
| `utils/colorScale.test.ts` | Value-based color scale |
| `utils/sma.test.ts` | **NY** Moving average |
| `utils/zoom.test.ts` | **NY** Zoom reducer |

Total: **25 math-tests** (fra 16 tidligere).

### 5.7 Barrel Export — `lib/charts/index.ts`
Re-eksporterer alle scales, paths, layouts, ticks og utils.

---

## 6. UI-Komponenter

**Sti:** `components/ui/`
**Antal:** **112 komponenter** + index.ts + tokens.css + RULES.md + README.md + ramtt-logo.tsx

Bygget i **13 waves** (1, 2, 3, 4, 5, 6, 7A, 7B, 7C, 8A, 8B, 8C, 8D, 9, 10, 11, 12, 13).

### Wave 1 — Display & Input (12 stk)

| # | Komponent | Formål |
|---|-----------|--------|
| 1 | `Button` | Primary (black), outline, ghost — sm/md/lg/icon |
| 2 | `Badge` | Status pill — filled/outline, semantiske farver |
| 3 | `ToggleGroup` | Connected buttons — default (sand), pill, underline |
| 4 | `Card` | Container med compound sub-components (Header/Title/Action/Body) |
| 5 | `DataRow` | Key-value row med unit, delta, badge |
| 6 | `DataTable` | Typede kolonner, number formatting, clickable rows |
| 7 | `Input` | Text/number input med label, unit suffix |
| 8 | `Select` | Custom dark dropdown (#1E1E1E) med keyboard nav + type-ahead |
| 9 | `MetricCard` | Labeled value med unit, subtitle, badge — standard + compact |
| 10 | `SettingsCard` | Icon + title + description + chevron |
| 11 | `ProgressBar` | Horisontal bar med role="progressbar" + ARIA |
| 12 | `SectionHeader` | Uppercase tracked label med optional action |

### Wave 2 — Interaction Layer (6 stk)

| # | Komponent | Formål |
|---|-----------|--------|
| 13 | `Modal` | Dialog med backdrop blur, keyboard Escape |
| 14 | `Toast` | Toast-system med ToastProvider + useToast, max 3 synlige |
| 15 | `Dropdown` | Floating dropdown med portal, keyboard nav |
| 16 | `Tabs` | Tab navigation med underline indicator |
| 17 | `Skeleton` | Placeholder skeleton med pulsing animation |
| 18 | `Switch` | Toggle switch med track + thumb, ARIA |

### Wave 3 — Polish & Navigation (6 stk)

| # | Komponent | Formål |
|---|-----------|--------|
| 19 | `Tooltip` | Hover tooltip med portal |
| 20 | `Accordion` | Expandable/collapsible sektioner |
| 21 | `Slider` | Range slider med track, thumb |
| 22 | `Avatar` | User avatar med initials fallback |
| 23 | `EmptyState` | Placeholder med icon + title + description |
| 24 | `Breadcrumb` | Breadcrumb navigation med separators |

### Wave 4 — App-Specific (8 stk)

| # | Komponent | Formål |
|---|-----------|--------|
| 25 | `Sidebar` | Collapsible sidebar navigation |
| 26 | `PageHeader` | Side-heading + description layout |
| 27 | `Textarea` | Multi-line text input |
| 28 | `Checkbox` | Checkbox med label, indeterminate state |
| 29 | `Radio` | Radio button group |
| 30 | `FileUpload` | Fil-input med drag-and-drop, preview |
| 31 | `Tag` | Dismissible tag/chip |
| 32 | `Gauge` | Radial gauge/speedometer |

### Wave 5 — Full Parity + Beyond (10 stk)

| # | Komponent | Formål |
|---|-----------|--------|
| 33 | `Calendar` | Interaktiv kalender med dato-selektion |
| 34 | `DatePicker` | Dato-input med popup-kalender |
| 35 | `Popover` | Floating popover |
| 36 | `Command` | Command palette / søgbar liste med keyboard |
| 37 | `Pagination` | Side-navigation |
| 38 | `Drawer` | Slide-out drawer |
| 39 | `Spinner` | Loading spinner |
| 40 | `Kbd` | Keyboard key visual (f.eks. "⌘K") |
| 41 | `Alert` | Alert box med semantisk farve |
| 42 | `Combobox` | Autocomplete combobox |

### Wave 6 — Final Parity (8 stk)

| # | Komponent | Formål |
|---|-----------|--------|
| 43 | `Separator` | Horisontal/vertikal divider |
| 44 | `Label` | Form label med htmlFor |
| 45 | `Collapsible` | Collapsible sektion (simplere end Accordion) |
| 46 | `InputGroup` | Grouped input med prefix/suffix |
| 47 | `ScrollArea` | Custom scrollbar |
| 48 | `HoverCard` | Hover-triggered card |
| 49 | `Resizable` | Resizable panel divider |
| 50 | `ContextMenu` | Højreklik context menu |

### Wave 7A — Atomic Display + Input (4 stk)

| # | Komponent | Formål |
|---|-----------|--------|
| 51 | `ColorDot` | Farve-swatch — circle/hollow/bar varianter (6/8/10px) |
| 52 | `StatusIndicator` | Status badge (success/warning/error) |
| 53 | `SegmentedBar` | Horisontal segmenteret progress bar |
| 54 | `NumberStepper` | +/- buttons med number input |

### Wave 7B — Input Patterns (3 stk)

| # | Komponent | Formål |
|---|-----------|--------|
| 55 | `RatingInput` | Stjerne-rating input — smaller segments (20/16px), accent color |
| 56 | `TimePicker` | Tid-selektion (timer, minutter, sekunder) |
| 57 | `StepFlow` | Step indicator + progress flow |

### Wave 7C — Widget System (3 stk)

| # | Komponent | Formål |
|---|-----------|--------|
| 58 | `WidgetCard` | Draggable widget card |
| 59 | `WidgetPicker` | Tilføj/fjern widgets UI |
| 60 | `DashboardGrid` | 12-kolonne responsivt grid |

### Wave 8A — Display + Interaction (6 stk)

| # | Komponent | Formål |
|---|-----------|--------|
| 61 | `Stat` | Display stat med value + unit |
| 62 | `ComparisonCard` | Sammenlign to værdier side om side |
| 63 | `TimelineStrip` | Horisontal tidslinje |
| 64 | `RangeSlider` | Dual-thumb range selektion |
| 65 | `FormField` | Wrapper for input + label + error |
| 66 | `NotificationBadge` | Notification dot/number badge |

### Wave 8B — Compound Components (6 stk) — **NY**

| # | Komponent | Formål |
|---|-----------|--------|
| 67 | `ChartCard` | Card pre-configured til charts — title, subtitle, period selector, metric display, legend |
| 68 | `Leaderboard` | Rangordnet liste med rank-positions, avatars, scores |
| 69 | `MemberList` | Team members med roles, avatars, status |
| 70 | `InviteCard` | Invite-UI card |
| 71 | `OnboardingLayout` | Multi-step onboarding flow layout |
| 72 | `NotificationPreferences` | Preferences UI |

### Wave 8C — Utility Components (3 stk) — **NY**

| # | Komponent | Formål |
|---|-----------|--------|
| 73 | `TodoList` | Checkbox-liste med items |
| 74 | `HelpSection` | Help-panel UI |
| 75 | `FieldMapping` | Field→field mapping UI |

### Wave 8D — Layout & Form Patterns (13 stk) — **NY**

| # | Komponent | Formål |
|---|-----------|--------|
| 76 | `DescriptionList` | `<dl>`-baseret key/value liste |
| 77 | `Feed` | Activity feed |
| 78 | `ActionPanel` | Panel med actions |
| 79 | `GridList` | Grid-list layout |
| 80 | `MediaObject` | Media + text layout |
| 81 | `FormLayout` | Form layout wrapper |
| 82 | `ButtonGroup` | Button-cluster |
| 83 | `AuthLayout` | Login/signup layout med sidebar |
| 84 | `VirtualList` | Windowed rendering for large lists |
| 85 | `ColorPicker` | Color selection UI |
| 86 | `OAuthButton` | OAuth provider button (Google, Apple, etc.) |
| 87 | `TrendBadge` | Trend indicator badge |
| 88 | `AppSidebar` | Full app sidebar wrapper |

### Wave 9 — Dark Surfaces & Footer (5 stk) — **NY** (2026-04-15)

Inspireret af Anthropic's footer — ekstrem typografisk disciplin.

| # | Komponent | Formål |
|---|-----------|--------|
| 89 | `LinkGroup` | Grupperet link-liste med heading |
| 90 | `LinkList` | Raw link-liste |
| 91 | `DarkSection` | Dark surface wrapper (bruger dark surface tokens) |
| 92 | `SocialIcons` | Social icon row |
| 93 | `Footer` | Komplet footer-komponent |

**Bonus:** Dark surface tokens + vertical rhythm fix. Hierarki via weight/color, ikke size.

### Wave 10 — Category System & Command Palette (2 stk) — **NY**

| # | Komponent | Formål |
|---|-----------|--------|
| 94 | `CategoryIcon` | Kategori-ikon med farve og domain |
| 95 | `CommandPalette` | Komplet ⌘K-palette — active state via accent-soft (ikke black fill) |

### Wave 11 — Editor Shell (4 stk) — **NY**

Komponenter til code-editor/IDE-lignende UI.

| # | Komponent | Formål |
|---|-----------|--------|
| 96 | `IconTabBar` | Vertical icon tab bar |
| 97 | `PanelSidebar` | Collapsible panel sidebar |
| 98 | `FloatingToolbar` | Floating toolbar (med groups og items) |
| 99 | `FloatingPanel` | Floating panel med shadow + border |

### Wave 12 — Claude-Inspired (12 stk) — **NY** (2026-04-16)

Komponenter inspireret af Claude's UI.

| # | Komponent | Formål |
|---|-----------|--------|
| 100 | `WorkspaceSwitcher` | Workspace selector med switcher |
| 101 | `ActivityHeatmap` | GitHub-stil heatmap — 7-days × 52-weeks |
| 102 | `QuickSearch` | Floating ⌘K search med FLOATING_SHADOW, RADIUS.sm, modal backdrop blur |
| 103 | `ConversationList` | Chat conversation list med groups |
| 104 | `StatsGrid` | Stats grid layout |
| 105 | `ProjectsGrid` | Projects gallery grid |
| 106 | `ChatInput` | Chat input med textarea + action bar + actions |
| 107 | `MessageActions` | Message hover actions |
| 108 | `WelcomeHero` | Welcome hero — heading 20px, icon 16px (ikke 28px) |
| 109 | `PromoCard` | Promotional card |
| 110 | `ActiveTask` | Active task item med items |

### Wave 13 — Animation Utilities (1 stk) — **NY**

| # | Komponent | Formål |
|---|-----------|--------|
| 111 | `AnimatedPanel` | Panel med collapse/expand-animation (CSS-baseret alternativ til motion) |

### Understøttende Filer

| Fil | Formål |
|-----|--------|
| `index.ts` | Public API barrel export af alle 112 komponenter + design system constants |
| `tokens.css` | Font loading + CSS variable definitions (~400 linjer) — **inkl. dark surface tokens, accent-soft, 56 domain-color CSS tokens** |
| `RULES.md` | Non-negotiable system regler — **opdateret** med domain colors, squircle dots, accent-soft, ikon-regler |
| `README.md` | Komponent-library oversigt |
| `ramtt-logo.tsx` | **RamttWordmark** + **RIcon** logo komponenter. ALTID wordmark på auth/marketing, ALDRIG standalone RIcon |

---

## 7. Ikon-System

**Sti:** `components/icons/`
**Total:** **1.717 ikon-filer** på tværs af **8 variant-typer** med **400 base-ikoner**

### 7.1 Base-Filer

| Fil | Formål |
|-----|--------|
| `IconBase.tsx` | Base wrapper for **line**-ikoner (24px, strokeWidth 1.5, `strokeWidth` prop nu tilføjet) |
| `IconBaseLight.tsx` | **NY** — Base wrapper for **light**-ikoner (18px, strokeWidth 1.25) |
| `IconBaseSolid.tsx` | Base wrapper for solid-ikoner (filled, no stroke, evenodd knockouts) |
| `IconBaseDuo.tsx` | Base wrapper for duo-tone-ikoner (accent color parameter) |
| `types.ts` | Delte TypeScript-typer for ikon-props |
| `catalog.ts` | Metadata-katalog for alle ikoner (kategorier, tags) |
| `index.ts` | Barrel export af alle ikon-varianter |

### 7.2 Line-Ikoner (400 stk) — `components/icons/line/`

Standard outline-ikoner, 24px, strokeWidth 1.5px. Default variant.

**Kategorier (30+ kategorier efter Wave 10-12):**

**Oprindelige (126 ikoner, fra 2026-04-13 snapshot):**
- Navigation (5), Actions (13), Arrows (6), Status (4), Communication (8), Media (6), Files (6), Users (5), Layout (6), Data (8), Devices (4), Weather (4), Commerce (4), Toggle/State (7), Misc (8)
- Sport/Domain (8): Power, HeartRate, Cadence, Speed, Elevation, Gel, Glycogen, Gut
- Training (8): Interval, Zone, Threshold, Durability, Resilience, PeakCurve, TrainingLoad, Recovery
- Nutrition (8): CHO, Protein, Fat, Hydration, Sodium, Caffeine, Meal, Supplements
- Body/Wellness (8): Sleep, Muscle, Brain, Lungs, Stomach, Weight, HRV, Stress

**Tilføjet efter 13. april:**
- **sport-equipment** (12): Bike m.fl.
- **sport-race** (10): AidStation, Award m.fl.
- **sport-lab** (10)
- **sport-anatomy** (10): AnatomicalHeart m.fl.
- **sport-nutrition** (8): ATP, AbsorptionRate, AminoAcid m.fl.
- **sport-physiology** (14)
- **navigation-app** (7): Undo, Redo, Save, Pin, MoreVertical, Menu, Minus
- **sort** (5+): ArrowDownAZ, ArrowUpDown m.fl.
- **form, social, feedback** (Wave 8A icon additions)
- **Wave 10** — 58 unique icons across 8 new categories
- **Wave 11** — 38 training science + fun icons
- **Wave 11B** — 15 fun/easter egg icons
- **Wave 12 (food)** — 45 food & sports nutrition (Apple, Avocado, Banana, Beer, Beetroot, Berries m.fl.)
- **The Lucky 7** — Final milestone push to 400

### 7.3 Light-Ikoner (400 stk) — `components/icons/light/` — **NY** (2026-04-15)

**Lettere variant:** 18px default, strokeWidth 1.25. Brugt til:
- Sidebar nav icons
- Wave 12 Claude-inspired demos (erstattet emojis)
- Optical-density kontekster

### 7.4 Solid-Ikoner (400 stk) — `components/icons/solid/`
Filled versioner af alle 400 line-ikoner. Brugt til aktive states (sidebar). Uses evenodd knockouts (ikke hardcoded `var(--icon-bg)`).

### 7.5 Duo-Tone-Ikoner (400 stk) — `components/icons/duo/`
To-tone versioner med accent-farve parameter. Alle 400 ikoner.

### 7.6 Animated Ikoner (20 stk) — `components/icons/animated/`

| Ikon | Formål |
|------|--------|
| `IconSpinnerRAMTT` | Loading spinner |
| `IconLoadingDots` | Pulserende dots |
| `IconLoadingBarAnimated` | Loading bar |
| `IconCheckAnimated` | Animated checkmark |
| `IconSuccessAnimated` | Success-animation |
| `IconErrorAnimated` | Error-animation |
| `IconUploadAnimated` | Upload-animation |
| `IconDownloadAnimated` | Download-animation |
| `IconPulseHeart` | Pulserende hjerte |
| `IconSyncRotate` | Roterende sync-ikon |
| `IconRefreshAnimated` | Refresh-animation |
| `IconTypingDots` | Typing-indicator |
| `IconWaveform` | Animeret waveform |
| `IconBellAnimated` | Notification bell |
| `IconMailAnimated` | Mail-icon |
| `IconLockAnimated` | Lock-icon |
| `IconSaveAnimated` | Save-icon |
| `IconSearchAnimated` | Search-icon |
| `IconStarAnimated` | Star-icon |
| `IconTrashAnimated` | Trash-icon |

### 7.7 Context-Aware Ikoner (25 stk) — `components/icons/context/`
Ikoner der renderer data som mikro-visualiseringer i 24×24 SVG.

| Ikon | Formål |
|------|--------|
| `IconBatteryLevel` | Batteri-indikator med level |
| `IconComplianceDot` | Compliance-status dot |
| `IconFormTrend` | Form-trend mikro-graf |
| `IconFuelGauge` | Fuel gauge med nål |
| `IconGlycogenLevel` | Glycogen-level bar |
| `IconHRBeat` | Pulserende HR-indikator |
| `IconProgressRing` | Cirkulær progress |
| `IconRegulatorRings` | Multi-ring regulering |
| `IconSignalBars` | Signal-styrke bars |
| `IconStreakFlame` | Streak/flamme med antal |
| `IconTrendArrow` | Trend-retning pil |
| `IconZoneIndicator` | Zone-indikator med farve |
| **Nye (2026-04-15):** | |
| `IconCadenceOptimalContext` | Cadence optimal range |
| `IconCalorieBalance` | Calorie balance indicator |
| `IconCarboLoadingContext` | Carbo loading status |
| `IconCountdownTimer` | Countdown timer |
| `IconGaugeContext` | Generic gauge |
| `IconMoodIndicator` | Mood indicator |
| `IconNegativeSplitContext` | Negative split indicator |
| `IconPacingContext` | Pacing indicator |
| `IconPeriodizationContext` | Periodization phase |
| `IconPowerProfileContext` | Power profile bars |
| `IconSleepScoreContext` | Sleep score ring |
| `IconTemperatureGauge` | Temperature gauge |
| `IconWeatherCondition` | Weather condition |
| `IconWifiStrength` | WiFi signal |

**Understøttende:** `thresholds.ts` — Threshold-konfiguration for data-drevne ikoner.

### 7.8 Morph-Ikoner (24 stk) — `components/icons/morph/`
Smooth CSS `d`-property transitions mellem to ikon-states.

| Ikon | Morphs mellem |
|------|--------------|
| `IconMorphCheckX` | Check ↔ X |
| `IconMorphChevronArrow` | Chevron ↔ Arrow |
| `IconMorphExpandCollapse` | Expand ↔ Collapse |
| `IconMorphEyeToggle` | Eye ↔ EyeOff |
| `IconMorphLockUnlock` | Lock ↔ Unlock |
| `IconMorphMenuClose` | Menu ↔ Close |
| `IconMorphPlayPause` | Play ↔ Pause |
| `IconMorphPlusMinus` | Plus ↔ Minus |
| `IconMorphSortAscDesc` | Sort Asc ↔ Desc |
| `IconMorphThumbUpDown` | Thumb Up ↔ Down |
| `IconMorphVariant` | Generisk morph-base |
| **Nye (2026-04-15):** | |
| `IconMorphBonkTrophy` | Bonk ↔ Trophy |
| `IconMorphBookmarkToggle` | Bookmark add/remove |
| `IconMorphCoffeeBeer` | Coffee ↔ Beer |
| `IconMorphGridList` | Grid ↔ List view |
| `IconMorphHeartToggle` | Heart add/remove |
| `IconMorphMicToggle` | Mic on/off |
| `IconMorphRestActive` | Rest ↔ Active |
| `IconMorphShieldCheck` | Shield ↔ Check |
| `IconMorphStarToggle` | Star add/remove |
| `IconMorphSunMoon` | Sun ↔ Moon |
| `IconMorphSunriseSunset` | Sunrise ↔ Sunset |
| `IconMorphToggle` | Generic toggle |
| `IconMorphVolumeToggle` | Volume on/off |

**Understøttende:** `MorphBase.tsx` — Base-komponent for CSS path morphing.

### 7.9 Reactive Ikoner (45 stk) — `components/icons/reactive/`
CSS-only hover micro-animationer.

**Oprindelige 30:** AlertCircle, AlertTriangle, ArrowLeft, ArrowRight, Bell, Bookmark, ChevronDown, ChevronUp, Copy, CreditCard, Download, Edit, Expand, ExternalLink, Eye, File, Heart, Image, Link, Lock, Mail, Mic, Notification, Refresh, Search, Send, Settings, Star, Trash, Upload.

**Tilføjet 2026-04-15 (+15):** Banana, Beer, Bike, Coffee, Crown, Donut, Dumbbell, PizzaSlice, Rocket, Running, Shield, Taco, Target, Trophy, Zap.

**Understøttende:** `ReactiveBase.tsx` + `reactions.css` — Base-komponent + CSS animationer.

### 7.10 Samlet Ikon-Tælling

| Variant | Antal |
|---------|-------|
| Line (24px, sw 1.5) | 400 |
| **Light (18px, sw 1.25)** | **400** |
| Solid (filled) | 400 |
| Duo (two-tone + accent) | 400 |
| Animated | 20 |
| Context-Aware | 25 |
| Morph | 24 |
| Reactive | 45 |
| **Total ikon-filer** | **1.717** |
| **Base-ikoner (unique)** | **400** |
| **Variant-dækning** | 400 × 4 = 1.600 core + 114 specials |

### 7.11 Icon Audit

**Audit-script:** `scripts/audit-icons.ts` — validerer variant-dækning, export consistency, ingen hardcoded fills, strokeWidth propagation. Aktuelt: **1717/1717 pass**.

---

## 8. Design System Foundation

### 8.1 Master Constants — `lib/ui.ts` (~400+ linjer)

**Eksporterer:**
- `cn()` — `twMerge(clsx(...))` (preferred — `lib/utils.ts` er legacy)
- `WEIGHT` — 400 (normal), 450 (book), 500 (medium), 500 (strong)
- `FONT` — sans (Satoshi), label (Satoshi), serif (Cormorant Garamond), mono (JetBrains Mono)
- `LABEL_STYLE`, `VALUE_STYLE`, `MUTED_STYLE`, `BODY_STYLE`, `QUIET_STYLE`, `UNIT_STYLE`
- `RADIUS` — 4px (sm), 5px (md), 12px (lg), 16px (xl)
- `BORDER` — 0.5px, subtle (--n200), default (--n400)
- `SIZE_HEIGHTS`, `SIZE_TEXT`, `SIZE_PADDING_X` — Predefinerede størrelser
- `TRANSITION` — 150ms, specifikke properties (aldrig `transition-all`)
- `HOVER_SAND` — Hover-state (--n200)
- `ACTIVE_SAND` — Active-state (--n400)
- `ACTIVE_BLACK` — Primary CTA (--n1150)
- `ACTIVE_UNDERLINE`, `FOCUS_RING`, `FOCUS_RING_THICK`, `FOCUS_RING_THIN`
- `WHITE_LIFT` — White lift effect
- `SELECTION_SAND` — Brush overlay (--n400/35%)
- **`DOMAIN`** (NY) — Domain color triade: `nutrition`, `training`, `body`
- **`DomainKey`** type
- **`CATEGORY_COLORS`** (NY)
- **Sidebar**: `SIDEBAR_WIDTH`, `SIDEBAR_ITEM_STYLE`, `SIDEBAR_ITEM_ACTIVE`, `NAV_ITEM_STYLE`, `NAV_ICON`
- **Wave 11**: `FLOATING_SHADOW`, `PANEL_WIDTH`, `ICON_TAB_SIZE`, `TOOLBAR_BUTTON_SIZE`, `CONVERSATION_ITEM_HEIGHT`
- **Wave 12**: `HEATMAP_CELL_SIZE`, `HEATMAP_GAP`, `HEATMAP_LEVELS`, `WORKSPACE_SWITCHER_HEIGHT`, `QUICK_SEARCH_MAX_HEIGHT`, `STATS_GRID_COLUMNS`
- `DARK` surface tokens
- `MODAL_WIDTH`, `TOAST_MAX_VISIBLE`, `TOAST_DEFAULT_DURATION`
- `DROPDOWN_ITEM`, `SWITCH_TRACK`, `SWITCH_THUMB`
- `TOOLTIP_BG`, `TOOLTIP_TEXT`, `TOOLTIP_RADIUS`, `TOOLTIP_PADDING`
- `SLIDER_TRACK_HEIGHT`, `SLIDER_THUMB_SIZE`, `AVATAR_SIZES`
- `CALENDAR_CELL_SIZE`, `CALENDAR_WEEK_STARTS_ON`
- `PAGE_BUTTON_SIZE`, `PAGE_BUTTON_ACTIVE`, `DRAWER_WIDTHS`, `SPINNER_SIZES`
- `SEPARATOR_DEFAULT`, `SEPARATOR_SUBTLE`
- `SCROLLBAR_WIDTH`, `SCROLLBAR_THUMB_MIN`, `SCROLLBAR_THUMB_COLOR`, `SCROLLBAR_THUMB_HOVER`, `SCROLLBAR_THUMB_ACTIVE`
- `DOT_SIZES`, `STEPPER_BUTTON_WIDTH`, `STEPPER_REPEAT_DELAY`, `STEPPER_REPEAT_INTERVAL`
- `STEP_DOT_SIZE`, `STEP_DOT_COMPLETED`, `STEP_DOT_UPCOMING`
- `RATING_SEGMENT_SIZE`
- `WIDGET_ICON_SIZE`, `WIDGET_ICON_COLOR`, `WIDGET_ICON_HOVER`, `GRID_COLUMNS`, `GRID_ROW_HEIGHT`, `GRID_GAP`
- `STAT_SIZES`, `BADGE_NOTIFY_SIZE`, `BADGE_NOTIFY_DOT`, `BADGE_NOTIFY_MAX`
- `GAUGE_SIZES`
- `LAYOUT`
- `formatTime`, `formatPercent`, `formatCompact` — Format-funktioner

### 8.2 Color Constants — `lib/constants/colors.ts` (~156 linjer)

**Zone-farver:**
- `POWER_ZONES` — 6 niveauer (Z1-Z6)
- `HR_ZONES` — 6 niveauer
- `CHO_ZONES` — 6 niveauer
- `KJ_ZONES` — 6 niveauer

**Signal-farver:**
- Power, HR, Cadence, Speed, Altitude, Temperature, CHO, Fluid

**Andre:**
- `NUTRIENT_COLORS`
- `COMPARISON_COLORS`
- `DOT_COLORS`

### 8.3 Domain Color Triade — **NY** (2026-04-14)

| Domain | Farve | Kode |
|--------|-------|------|
| **Nutrition** (accent) | Cyan 500 | `#06B6D4` |
| **Training** | Pink 600 | |
| **Body** | Indigo 500 | |

- **56 CSS tokens** genereret fra triaden
- **Squircle dots** 30% opacity (ikke perfect circles)
- **Accent-soft** ~12% opacity — brugt til active states i stedet for black fill
- **Accent-wash** til hover states (reverted: bruger nu `--n200` for alle hover)

### 8.4 OKLCH Utilities — **NY** — `lib/oklch.ts`

OKLCH color manipulation — bruges af `/color-lab/live`.

### 8.5 CSS Tokens — `components/ui/tokens.css` (~400 linjer)
Font loading + CSS variable definitions:
- Neutral-skala (8 stops)
- Typografi-variabler
- Spacing-variabler
- Surface-farver (inkl. **dark surface tokens** til Wave 9 Footer/DarkSection)

### 8.6 Global Theme — `app/globals.css` (174 linjer)
Tailwind `@theme` directives:
- Neutral-skala: --bg (#FAF9F5), --n50, --n200, --n400, --n600, --n800, --n1050, --n1150
- Zone-farver: Power (6), HR (6), CHO (6), kJ (6)
- Signal-linjer: Power, HR, Cadence, Speed, Altitude, Temperature
- UI Chrome: Accent (Cyan 500), Danger, Warning, Success, Info

### 8.7 Shared Types — `types/ui.ts`
`Size`, `SemanticColor`, `BaseComponentProps`, `InteractiveProps`, `LabelledProps`, `ColoredProps`

### 8.8 Sidebar Nav Standard — **LOCKED** (2026-04-14)

```
NAV_ITEM_STYLE: 11px, weight 450, color --n1150
NAV_ICON:       18px, stroke-width 1.25 (Light variant)
GAP:            14px (gap-3.5)
ACTIVE:         accent-soft (~12% opacity)
HOVER:          --n200 (warm neutral, ikke accent-wash)
```

---

## 9. Data & Parsers

### 9.1 FIT File Parser — `lib/fit-parser.ts` (~150 linjer)
Konverterer Garmin .fit binær-filer til `FitData` shape:
- Power (W), Heart rate (bpm), Cadence (rpm), Speed (km/h)
- Altitude (m), Temperature (°C), Distance (km), Timestamps
- `lengthUnit: 'km'` konverterer alle længder
- Fields er `number | undefined` (ikke garanterede)
- **Fallback kcal fra energyKJ** når total_calories mangler

### 9.2 Andre Parsers — **NY** — `lib/parsers/`

| Fil | Formål |
|-----|--------|
| `gpx-parser.ts` | GPX track parser |
| `tcx-parser.ts` | TCX workout parser |
| `types.ts` | Delte types |
| `index.ts` | Barrel export |
| `__tests__/parsers.test.ts` | Parser tests |

### 9.3 Demo Data Generators

**Per-demo generators (NY):**
- `app/demo/generate-data.ts` — Generic demo (24+ funktioner)
- `app/demo/area/generate-data.ts` — Shadcn area seed data
- `app/demo/bar/generate-data.ts` — Bar seed data
- `app/demo/line/generate-data.ts` — Line seed data
- `app/demo/pie/generate-data.ts` — Pie seed data
- `app/demo/radar/generate-data.ts` — Radar seed data
- `app/demo/tooltip/generate-data.ts` — Tooltip seed data
- `app/demo/treemap/generate-data.ts` — Treemap seed data

Generator-funktioner: stock prices, revenue/costs, server temp, IoT sensor, scatter, candlestick OHLC, waterfall, radar, treemap, heatmap, calendar, gradient-threshold, sparkline.

### 9.4 Color Guide Data — `app/color-guide/chart-data.ts` (~200 linjer)
Specialiserede chart-data til farve-guide visualiseringer.

### 9.5 Sample FIT Files
- `FIT_FILES/i133046028_MIT_with_spikes (1).fit` — Rigtig Garmin-session
- `public/fit-data/mit-with-spikes.json` — Pre-parsed JSON-version

### 9.6 Andre Utilities
- `lib/utils.ts` — Generelle hjælpe-funktioner (legacy `cn`)
- `lib/calendar-utils.ts` — Kalender dato-manipulation

---

## 10. Scripts & Tooling

**Sti:** `scripts/`

| Script | Kommando | Formål |
|--------|----------|--------|
| `audit.ts` | `npm run audit` | **Unified RAMTT audit** — dækker UI, charts, math, sider, tokens. `--scope ui` og `--scope charts` scoper subsets. |
| `audit-icons.ts` | `npm run audit:icons` | Ikon-system audit (variant dækning, export consistency) |
| `add-copyright-headers.ts` | Manuel | Tilføjer RAMTT copyright headers til source-filer |
| **NYE icon-generators (6):** | | |
| `generate-400.mjs` | Manuel | The Lucky 7 — nå 400 base icons |
| `generate-reactive-wave.mjs` | Manuel | Reactive icon generator |
| `generate-wave10-icons.mjs` | Manuel | Wave 10 icons |
| `generate-wave11-icons.mjs` | Manuel | Wave 11 icons |
| `generate-wave11b-fun.mjs` | Manuel | Wave 11B fun icons |
| `generate-wave12-food.mjs` | Manuel | Wave 12 food icons (45 stk) |

**NPM Scripts (package.json):**
```bash
npm run dev              # Next.js dev server, port 5000 (rydder .next cache)
npm run build            # Production build
npm run lint             # ESLint
npm run audit            # Unified audit (KUN denne — dækker alt)
npm run audit:ui         # UI-scope (audit.ts --scope ui)
npm run audit:charts     # Charts-scope (audit.ts --scope charts)
npm run audit:icons      # Ikon-audit
npm run build:charts     # Build @ramtt/charts (tsup)
npm run build:ui         # Build @ramtt/ui (tsup)
npm run build:packages   # Build begge pakker
```

**Audit-status:** Efter oprydning 2026-04-16 passer auditten **clean** (0 errors, 0 warnings — tidligere 39 errors, 13 warnings).

---

## 11. NPM Packages

### 11.1 @ramtt/charts — `packages/charts/`

| Fil | Formål |
|-----|--------|
| `package.json` | name: "@ramtt/charts", version 0.1.0 |
| `tsconfig.json` | TypeScript config |
| `tsup.config.ts` | Build config (tsup) |
| `dist/` | Built output |
| `README.md` | Pakke-dokumentation |
| `src/index.ts` | Re-eksporterer chart-primitiver |
| `src/math/index.ts` | Re-eksporterer math layer |

**Exports:**
- `@ramtt/charts` — Alle 52 chart-primitiver
- `@ramtt/charts/math` — Ren math layer (scales, paths, layouts, ticks, utils)

**Built artifacts (`dist/`):**
- `index.js` + `index.cjs` + `index.d.ts` + `index.d.cts` — Hoved-bundle
- `math/index.js` + `math/index.cjs` + `math/index.d.ts` + `math/index.d.cts` — Math entrypoint
- Shared chunks + source maps

### 11.2 @ramtt/ui — `packages/ui/`

| Fil | Formål |
|-----|--------|
| `package.json` | name: "@ramtt/ui", version 0.1.0 |
| `tsconfig.json` | TypeScript config |
| `tsup.config.ts` | Build config (tsup) |
| `src/index.ts` | Source entrypoint — re-eksporterer UI komponenter |
| `dist/` | Built output |
| `README.md` | Pakke-dokumentation |

**Exports:**
- `@ramtt/ui` — Alle 112 UI-komponenter + design system constants
- `@ramtt/ui/tokens.css` — CSS tokens

---

## 12. Dokumentation

**Sti:** `docs/`

| Fil | Formål |
|-----|--------|
| `RAMTT-CHARTS-SYSTEM-REFERENCE.md` | Komplet chart system dokumentation (~1200 linjer) |
| `RAMTT-UI-COMPONENT-SYSTEM-BRIEF-v2.md` | UI komponent system oversigt (~1000 linjer) |
| `RAMTT-UI-STATUS.md` | Komponent status matrix (~250 linjer) |
| `RAMTT-UI-POLISH-PASS.md` | Polish forbedringer (~280 linjer) |
| `RAMTT-CHARTS-DEVELOPMENT-LOG.md` | Historisk udviklings-noter (~300 linjer) |
| `color-system-v2.md` | Farve-system design rationale (~250 linjer) |
| `AUDIT-GUIDE.md` | Instruktioner til system audits (~150 linjer) |
| `AUDIT-UI-GUIDE.md` | Detaljeret UI audit guide (~200 linjer) |
| `CLAUDE-CODE-PROMPT-CHARTS-DEMO.md` | Claude Code prompt til chart demo (~80 linjer) |
| `RAMTT-CHARTS-GENERIC-DEMO-BRIEF (1).md` | Demo-side implementerings-guide (~200 linjer) |
| **`BRIEF-icon-light-variant.md`** | **NY** — Light ikon-variant brief (18px, sw 1.25) |
| **`COMPLETE-REPO-AUDIT.md`** | **NY** — Komplet repo audit (2026-04-15) |
| `ramtt-4-font-system.html` | Interaktiv font-system reference (~40KB) |
| `ramtt-type-system-v3 (1).html` | Interaktiv typografi-system (~50KB) |

**Subdirectories:**
| Dir | Indhold |
|-----|---------|
| `competitive-analysis/` | `claude_look.md`, `figma_look.md`, `linear_look.md`, `perplexity_look.md` |
| `fonts/` | `Cormorant_Garamond/`, `Satoshi_Complete/` (Instrument Sans og Space Grotesk slettet 2026-04-17 — kun Satoshi + Cormorant i brug) |

**Root-level docs:**
| Fil | Formål |
|-----|--------|
| `README.md` | Projekt-oversigt + arkitektur (269 linjer) |
| `CLAUDE.md` | Repo-konventioner + AnimatedPanel-regel + motion-regel + zoom-debounce-forbud |
| `CHART-TEST-INTERACTION-AUDIT.md` | Chart-test interaction audit |
| `FRAMER-MOTION-INVENTORY.md` | Framer/motion usage-inventory |
| `LICENSE-MIT` | MIT-licens |
| `LICENSE-APACHE` | Apache 2.0-licens |
| `NOTICE` | Copyright/trademark notice |
| `ramtt-chart-deep-technical-plan.md` | Dyb teknisk plan for chart-systemet |
| `ramtt-chart-system-vision (2).md` | Vision-dokument |

---

## 13. Assets & Fonts

### 13.1 Web Fonts — `public/fonts/`

| Font | Filer | Brug |
|------|-------|------|
| **Satoshi** | Variable.woff2, VariableItalic.woff2 | Body, labels, UI, numre — alt UI (--font-sans, --font-label, --font-mono alle peger på Satoshi) |
| **Cormorant Garamond** | VariableFont_wght.ttf, Italic-VariableFont_wght.ttf | Editorial/marketing KUN (--font-serif) |

Space Grotesk, Instrument Sans, JetBrains Mono er fjernet 2026-04-17 — Satoshi har fuldt erstattet dem. Kun de to familier ovenfor eksisterer i repoet.

### 13.2 FIT Data — `public/fit-data/`
- `mit-with-spikes.json` — Pre-parsed session data til demo

---

## 14. Backups

**Sti:** `backups/`

| Fil | Dato | Formål |
|-----|------|--------|
| `chart-test-page-2026-04-07-pre-ramtt-ui.tsx` | 7. apr 2026 | Før @ramtt/ui refactor (~67KB) |
| `chart-test-page-2026-04-16-pre-framer-removal.tsx` | **16. apr 2026** | **NY** — Før framer-removal saga |
| `page-2026-04-05-v2.tsx` | 5. apr 2026 | Tidligere version (~65KB) |
| `page-2026-04-05.tsx` | 5. apr 2026 | Endnu tidligere version (~31KB) |
| `app/chart-test/page.backup.txt` | — | Inline backup af chart-test side |

---

## 15. Konfiguration

| Fil | Formål |
|-----|--------|
| `package.json` | Monorepo root, scripts, dependencies |
| `package-lock.json` | Lockfile (~131KB) |
| `tsconfig.json` | TypeScript: ES2017, strict, paths (@/* → .) |
| `tsconfig.tsbuildinfo` | TypeScript incremental build cache (~591KB) |
| `next.config.ts` | Next.js: Turbopack, dev cache headers (no-store) |
| `next-env.d.ts` | Next.js TypeScript types (auto-generated) |
| `postcss.config.mjs` | PostCSS for Tailwind CSS 4 |
| `.gitignore` | node_modules, .next, .DS_Store |
| `.vercel/project.json` | Vercel deployment konfiguration |
| `.vercel/README.txt` | Vercel CLI info |

### 15.1 CLAUDE.md — **NY** (2026-04-16)

Master-regler for Claude Code i repoet:

- `motion` dependency bruges KUN i `app/chart-test/page.tsx` for panel collapse/expand. Framer's `motion.div` animerer på mount/unmount only, så safe around charts. Erstat ALDRIG med AnimatedPanel eller CSS grid transitions.
- Chart zoom MUST bruge direct `setZoomState()` **uden debounce** i ChartSyncProvider. Debouncing zoom state = katastrofalt lag.
- To `cn()` eksisterer: `lib/ui.ts` (preferred) og `lib/utils.ts` (legacy). Nye filer bruger `lib/ui.ts`.
- Ingen barrel export for chart-primitiver — import by direct file path.
- Kør `npm run audit` før commit. Non-negotiable.

### 15.2 Claude Code Config — `.claude/`

| Fil | Formål |
|-----|--------|
| `launch.json` | VSCode debug profil |
| `settings.local.json` | Lokale Claude Code-indstillinger |

**Design Reference Docs — `.claude/visual_improvement/`**
| Fil | Formål |
|-----|--------|
| `ALWAYS_READ_FIRST_crisp-rendering-and-framer-motion-prompt.md` | Master prompt for crisp rendering + Framer Motion |
| `crisp-rendering.md` | Regler for skarp SVG/CSS rendering |
| `design-engineer.md` | Design engineer mindset + principper |
| `tailwind-enforcer.md` | Tailwind-only CSS enforcement regler |

---

## 16. Git-Historik

**219 commits** fra 2026-04-05 til 2026-04-17 (**13 udviklingsdage**).

### Kronologisk Udvikling

| Fase | Commits | Periode | Indhold |
|------|---------|---------|---------|
| **Dag 1** | ~5 | 5. apr | Initial SVG chart system, 5 stacked charts, synced crosshair + zoom |
| **Dag 2-3** | ~15 | 5-7. apr | FIT upload, zone metrics, scores, fueling, CHO, session data |
| **Dag 3-4** | ~10 | 7-8. apr | Torque kanal, overlay mode (bygget → revert), brush overlay |
| **Dag 4-5** | ~8 | 8. apr | Peak powers, chart toggles, fullscreen, kJ/min |
| **Dag 5-6** | ~10 | 8-9. apr | Y-akse iterationer, chart heights, color system |
| **Dag 6-7** | ~15 | 9-10. apr | @ramtt/ui Wave 1 (12 komp), farve-guide, system reference docs |
| **Dag 7** | ~15 | 10. apr | @ramtt/ui Wave 2-6 (38 komp), demo 20 charts, audit scripts |
| **Dag 8** | ~20 | 13. apr | @ramtt/ui Wave 7-8A (16 komp), @ramtt/icons 439 (Wave 9A-9F) |
| **Dag 9** | ~25 | 14. apr | Accent-demo, domain color triade + 56 CSS tokens, squircle dots, accent-soft active state, sidebar nav LOCKED |
| **Dag 10** | ~30 | 15. apr | Wave 8B/8C/8D/9/10/11 (40+ komp), @ramtt/icons 295→400, Light variant (18px/1.25sw), VirtualList, ColorPicker, OAuthButton, Editor Shell, context/morph/reactive expansion |
| **Dag 11** | ~35 | 16. apr | Wave 12 (12 Claude-inspired), shadcn parity demos (7 sider), chart visual redesigns (8 charts), audit fixes (39→0 errors), CLAUDE.md, zoom-lag saga |
| **Dag 12** | ~10 | 17. apr | Chart-test polish: max W/HR, CHO total label, fallback kcal, single-click reset, max W + HR i fullscreen sidebar |

### Vigtige Milestones (Kronologisk)

| Commit | Beskrivelse |
|--------|-------------|
| `8ccb247` | Initial commit — custom SVG chart system |
| `f9af25b` | FIT file upload + zone metrics + interactive scores |
| `71d5078` | Peak powers strip med clickable zoom |
| `78555ec` | @ramtt/ui Wave 1 (12 komponenter) |
| `1f7f3d3` | Demo udvidet til 20 chart-typer |
| `457e173` | @ramtt/icons Wave 9A (36 ikoner + IconBase) |
| `a0e04f2` | 126 × 3 varianter + 8 animated = 386 ikoner |
| `2b1b329` | 30 reactive hover-ikoner (439 total) |
| `cd33acb` | **ChartZoneBackground** — filled zone regions |
| `47ac6d5` | Remove hoverWash token — single wash color |
| `604b9dd` | **VirtualList** — windowed rendering |
| `7231ff8` | **Pinch-to-zoom gesture** til useChartZoom |
| `9c214d4` | **ColorPicker + OAuthButton** components |
| `582ea2a` | **CategoryIcon + CommandPalette**, Select/ToggleGroup enhancements |
| `e7642c5` | **Wave 11 Editor Shell** (IconTabBar, PanelSidebar, FloatingToolbar, FloatingPanel) |
| `602c514` | Accent-demo +58 new accents (earth tones, teal, forest) |
| `d5283da` | Accent-demo +68 Tailwind 700/800/900/950 shades |
| `23e50b6` | **Domain color triade + 56 CSS tokens, squircles, accent-driven** |
| `c13faeb` | Sidebar nav demo + accent-soft active (~12%) |
| `656350a` | Codify domain colors, squircle dots, accent-soft (RULES.md) |
| `5c507db` | Codify sidebar nav standard — NAV_ITEM_STYLE, NAV_ICON |
| `0bf4c1a` | **@ramtt/icons Light variant** — 174 icons, 18px, sw 1.25 |
| `5872d50` | **Wave 12 Claude-inspired** (12 components, total 106) |
| `064521b` | Wave 10 icons — 58 unique, 8 new categories (295 base, 1180 total) |
| `04b0221` | Wave 11 icons — 38 training science + fun (333 base) |
| `54c321e` | Wave 11B icons — 15 fun/easter egg (348 base) |
| `ddc24bc` | Wave 12 food icons — 45 food & nutrition (393 base, 1572 total) |
| `aa5d9a5` | **The Lucky 7 — 400 base icons milestone** |
| `8417086` | `/demo/area` — 9 area variants (shadcn parity 1) |
| `37b0f2f` | `/demo/bar` — 12 bar variants (shadcn parity 2) |
| `dd01bf5` | `/demo/line` — 9 line variants |
| `93a3e81` | `/demo/pie` — 9 pie/donut variants |
| `03f35ef` | `/demo/radar` — 6 radar + 6 radial |
| `ea0c9bc` | `/demo/tooltip` — 6 tooltip variants |
| `75bc0e3` | **ChartTreemapPro** — hierarchical Jade/Clay |
| `6df0469` | Visual quality redesign — 8 demo charts |
| `d23822e` | Tooltip overlap + scatter depth + stacked area polish |
| `e2981a1` | **Crosshair full-height, fullscreen CSS, navigator handles, zoom debounce introduced (!)** |
| `89baa6f` | **Rollback** — Framer version (CSS replacement caused zoom lag) |
| `73fc49a` | **CLAUDE.md added** — repo conventions + AnimatedPanel rule |
| `dd66752` | Strip motion wrappers — conflict med CLAUDE.md |
| `2c95026` | **Revert** — strip motion |
| `3398634` | **FIX: revert zoom debounce — ROOT CAUSE of chart-test lag** |
| `25884a9` | Fallback kcal fra energyKJ |
| `f6c5882` | **Single-click = reset zoom til full range** |
| `3dff7f5` | CHO total label + max W/HR i hover table |
| `5ff6db9` | **Max W + max HR i fullscreen sidebar** (latest) |

### Zoom-Lag Saga (Dag 11, 16. april)

Full-day misadventure worth documenting:
1. Commit `e2981a1` introducerede ChartSyncProvider zoom debounce (skjult i kæmpe fix-commit)
2. User observerede chart-test flicker/lag
3. Mistænkte Framer → fjernede Framer → AnimatedPanel → CSS grid
4. CSS replacement forværrede lag → rollback til Framer
5. Strip motion wrappers → CLAUDE.md konflikt → revert
6. Endelig: `3398634` fandt **reel root cause — zoom debounce** — reverteret
7. Codified in CLAUDE.md: "Chart zoom MUST use direct `setZoomState()` without debounce"

---

## 17. Arkitektur-Mønstre

### 17.1 Chart Interaktions-Arkitektur
```
Hover (zero re-renders — ref-based pub/sub):
  mousemove → rAF → bisectNearest → setAttribute()
    → sync.broadcastHover(index)
      → alle crosshairs, data tabel, time pill updater via refs

Zoom (React state — sjælden re-render, UDEN debounce):
  wheel/keyboard/pinch → setZoom({ start, end })
    → charts re-renderer med sliced data arrays

Brush (document-level drag):
  pointerdown → pointercancel handler → pointermove
    → BrushOverlay spænder over alle charts
    → pointerup → zoom til valgt interval

Pinch (touch):
  touchstart 2+ fingers → distance tracking
    → pinch → setZoom relative to pinch center
```

### 17.2 Komponent-System
- **Compound components:** Card (Header/Title/Action/Body), ToggleGroup, DataTable, ChartCard, QuickSearch (items/groups), ConversationList (items/groups), ChatInput (textarea/actionbar/actions), ActiveTask (items), ProjectsGrid (header/items)
- **Hooks:** useChartSync, useChartZoom, useToast
- **Context:** ChartContext (scales, domain, range), ChartSyncProvider
- **Accessibility:** WAI-ARIA (radiogroup, combobox, listbox, tablist, progressbar)
- **forwardRef** på alle interaktive komponenter
- **displayName** på alle komponenter

### 17.3 Publishing-Strategi
- To separate NPM-pakker (@ramtt/charts, @ramtt/ui)
- Math layer eksporteret som `./math` entrypoint
- CSS tokens eksporteret separat (`./tokens.css`)
- Zero eksterne dependencies for chart-primitiver
- Docs-site til automatisk generation via registry-filer

### 17.4 Designprincipper
- **Warm palette:** Aldrig kolde sort-farver, altid warm neutrals
- **Sand interaktion:** Hover → sand-200, Active → sand-400, CTA → black
- **Specifik transition:** Aldrig `transition-all`, altid navngivne properties
- **Font-hierarki:** Satoshi body/UI, Cormorant Garamond kun editorial, JetBrains Mono kun tal
- **0.5px borders:** Altid 0.5px, to niveauer (subtle + default)
- **Domain colors:** Nutrition (Cyan 500) = accent, training (Pink 600), body (Indigo 500)
- **Squircle dots:** 30% opacity (ikke perfect circles)
- **Accent-soft:** ~12% opacity til active states (ikke black fill)
- **Logo:** ALTID RamttWordmark, ALDRIG standalone RIcon (undtagen favicon/collapsed sidebar)

---

## 18. Vigtige Regler & Gotchas

### 18.1 Non-Negotiable (CLAUDE.md)

1. **Motion-pakken** bruges KUN i `app/chart-test/page.tsx`. ALDRIG erstat med AnimatedPanel/CSS grid.
2. **Zoom-state** MUST bruge direct `setZoomState()`. ALDRIG debounce — proven the hard way.
3. **Audit** skal passe før commit. `npm run audit`. Non-negotiable.
4. **Import charts** direkte fra fil-sti, ALDRIG barrel.
5. **cn()** — brug `lib/ui.ts` (ikke legacy `lib/utils.ts`).

### 18.2 UI-Regler (RULES.md)

1. Brug KUN `@ramtt/ui` og `lib/ui.ts` constants fra første linje — ALDRIG hardcode farver, spacing, radius, typography.
2. Brug KUN `@ramtt/icons` SVG-ikoner. ALDRIG emoji, unicode, Lucide, tredjepartsbiblioteker.
3. ALTID `RamttWordmark` på auth/marketing sider — ALDRIG standalone `RIcon`.
4. ALTID tooltip på chart-demos. 100% af shadcn chart-demos har interaction — vi matcher.
5. Sidebar nav: 11px, weight 450, --n1150, icons 18px/sw 1.25, gap 14px.
6. Active state: accent-soft ~12%, IKKE black fill.
7. Hover state: --n200 (warm neutral), IKKE accent-wash.

### 18.3 Chart-Demo Regler

1. ALTID tooltip/crosshair interaction på hver chart
2. ALTID ChartCard pattern (title, subtitle, period, legend)
3. ALTID brug @ramtt/ui komponenter (ingen divs med hardcoded styles)
4. Kør `npm run audit` efter chart/UI ændringer

### 18.4 FIT-Parser Gotchas

- Fields er `number | undefined` (ikke garanterede)
- `lengthUnit: 'km'` konverterer ALLE længder — ALDRIG double-convert
- Fallback kcal fra `energyKJ` når `total_calories` mangler (kcal = kJ × 0.239)
- Weight er AthleteParam (manuel input), IKKE fra FIT

### 18.5 Y-Akse Parkeret

Top tick når ikke data max. 3 tilgange prøvet + reverted. Accepteret as-is.

### 18.6 Dev Server

Brug `nohup` for long-running processes (ikke `run_in_background`). Dev-port = 5000.

### 18.7 Vercel-Deploy

Deploy KUN når explicitly bedt. Default = localhost. Ingen auto-deploy.

---

## 19. Samlet Statistik

| Metrik | Værdi |
|--------|-------|
| **Git commits** | **219** |
| **Udviklings-dage** | **13** (5-17. apr 2026) |
| **Totale filer (ekskl. node_modules/.next/.git)** | ~2.040 |
| **Source-filer (.ts/.tsx/.css)** | **2.040** |
| **Linjer kode** | **~104.582** |
| **Sider/Routes** | **26** (7 synlige + 7 demo-parity + 9 docs + 3 støtte) |
| **Chart-primitiver** | **52** komponenter |
| **Chart math utilities** | **19+** moduler |
| **Chart tests** | **25** test-filer (9 primitiv + 16+ math) |
| **UI-komponenter** | **112** |
| **UI waves** | **13** (Wave 1–13) |
| **Ikon-filer (alle varianter)** | **1.717** |
| **Ikon-base (unique)** | **400** |
| **Ikon-varianter** | **8** (Line/Light/Solid/Duo + Animated/Context/Morph/Reactive) |
| **Ikon-kategorier** | **30+** |
| **Design tokens (CSS)** | **~155 + 56 domain + 12 accent** |
| **Color zones** | 24 (6×4 zone-typer) |
| **Audit scripts** | **11** (1 unified + 6 icon-generators + 4 legacy) |
| **Dokumentations-filer** | **17+** |
| **NPM packages** | 2 (@ramtt/charts, @ramtt/ui) |
| **Web fonts** | 5 familier (11 filer) |
| **Backup-filer** | **4** |
| **Dependencies (runtime)** | 13 |
| **Dependencies (dev)** | 2 |

### Komponent-Total

| Type | Antal |
|------|-------|
| Chart-primitiver | **52** |
| UI-komponenter | **112** |
| Ikoner (alle varianter) | **1.717** |
| App-specifikke (AthleteParamsPanel m.fl.) | 1+ |
| **Total React-komponenter** | **~1.882** |

### Udvikling siden 13. april

| Metrik | 13. apr | 17. apr | Δ |
|--------|---------|---------|---|
| Commits | 98 | 219 | **+121** |
| UI-komponenter | 66 | 112 | **+46** |
| Chart-primitiver | 28 | 52 | **+24** |
| Ikon-base | 126 | 400 | **+274** |
| Ikon-filer | 439 | 1.717 | **+1.278** |
| Ikon-varianter | 7 | 8 (Light ny) | **+1** |
| Sider | 9 | 26 | **+17** |
| UI waves | 9 (til 8A) | 13 (8B-13) | **+4-5** |
| LOC | ~50.700 | ~104.582 | **+53.882** (mere end fordoblet!) |
| Dev-dage | 8 | 13 | **+5** |

---

*Genereret 2026-04-17 af Claude Code — komplet audit af ramtt-charts monorepo.*
*Erstatter `RAMTT-Charts — Komplet Repo-Overblik.md` (2026-04-13).*
