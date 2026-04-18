# RAMTT-Charts — Komplet Repo-Overblik

> **Sidst opdateret:** 2026-04-18
> **Commits:** 254 (siden 2026-04-05, 14 udviklingsdage)
> **Source-filer:** 2.042
> **Linjer kode:** ~99.640 (.ts/.tsx, ekskl. node_modules/.next)
> **Licens:** MIT OR Apache-2.0
> **Copyright:** 2026 RAMTT (Malte Therkildsen)

> _Denne version opdaterer 17-april-dokumentet med 35 nye commits fra 17.→18. april.
> Hovedtemaer: **bulletproof audit-system** (Husky + `/ship` + Rule Zero check + banned icon libs + CLAUDE-RULES-PASTE), **docs-oprydning** (10 filer arkiveret, 2 nye rod-docs), **unified audit-script** (audit-ui + audit-charts fusioneret til `scripts/audit.ts`), **HexSwatch** (ny UI-komponent), **ChartTreemapTooltip** (ekstraheret fra Pro), **ChartAxisValue** primitive, **sport-aware chart-test** (pace-kanal + BestSplitsStrip + running mode), **CRISP shape-rendering** overalt, og **ramtt.dev → Server Components + SSG**._

---

## Indholdsfortegnelse

1. [Projekt-Oversigt](#1-projekt-oversigt)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Sider & Routes (26)](#3-sider--routes)
4. [Chart-Primitiver (45 komponenter)](#4-chart-primitiver)
5. [Chart Math Layer (19+ moduler)](#5-chart-math-layer)
6. [UI-Komponenter (113 komponenter)](#6-ui-komponenter)
7. [Ikon-System (1.717 filer / 8 varianter / 400 base)](#7-ikon-system)
8. [Design System Foundation](#8-design-system-foundation)
9. [Data & Parsers (FIT / GPX / TCX)](#9-data--parsers)
10. [Scripts & Tooling (8)](#10-scripts--tooling)
11. [NPM Packages (2)](#11-npm-packages)
12. [Dokumentation (aktiv + arkiveret)](#12-dokumentation)
13. [Assets & Fonts](#13-assets--fonts)
14. [Backups (5)](#14-backups)
15. [Konfiguration + Bulletproof Audit System](#15-konfiguration)
16. [Git-Historik (254 commits, 14 dage)](#16-git-historik)
17. [Arkitektur-Mønstre](#17-arkitektur-mønstre)
18. [Vigtige Regler & Gotchas](#18-vigtige-regler--gotchas)
19. [Samlet Statistik](#19-samlet-statistik)

---

## 1. Projekt-Oversigt

**ramtt-charts** er et monorepo der indeholder to publicerbare NPM-pakker til RAMTT-platformen:

- **@ramtt/charts** — Zero-dependency SVG chart-primitiver med synkroniseret interaktion, 60fps hover, LTTB downsampling, pinch-to-zoom
- **@ramtt/ui** — 113 tilgængelige UI-komponenter med RAMTT design tokens (13 waves)

Repo'et fungerer som et selvstændigt Next.js-site med:
- En komplet **docs-site** under `(docs)/`
- En **FIT-fil-analyse-side** (`/chart-test`, crown jewel — nu sport-aware, cycling + running)
- **7 shadcn-parity demo-sider** (area, bar, line, pie, radar, tooltip, treemap)
- En **ikon-katalog** med søgning/filter/variant-toggle
- **Accent-/farve-labs** (`/accent-demo`, `/color-lab`, `/color-guide`)
- **UI showcase** med alle 113 komponenter

**NYT 2026-04-18:** Systemet er nu håndhævet via et 5-lags **bulletproof audit-system** (Husky pre-commit → `/ship` slash command → unified `scripts/audit.ts` → Rule Zero inline-detect → banned icon libs), samt `CLAUDE-RULES-PASTE.md` til normal Claude Chat og `HUSKE.md` operator-checklist.

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
| `motion` | ^12.38.0 | Animation (Framer successor) — **KUN i chart-test** for panel collapse/expand (LOCKED til 9 steder) |
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
| **`husky`** | **^9.1.7** | **NY 2026-04-18** — Git hooks. Installer pre-commit der kører `npm run audit`. |

### Zero Eksterne Dependencies
Chart-primitiver og math layer bruger **ingen** eksterne libraries — kun React + native SVG. `motion`-pakken bruges KUN til panel collapse/expand i `app/chart-test/page.tsx` (se CLAUDE.md § regler — scope LOCKED 2026-04-17).

**Banned icon libraries** (auditten blokerer dem): `lucide-react`, `@heroicons/react`, `react-icons`, `@iconify/react`, `@tabler/icons-react`, `react-feather`, `phosphor-react`, `@phosphor-icons/react`, `react-bootstrap-icons`, `@fortawesome/*`, `remixicon-react`, `@remixicon/react`, `react-ionicons`.

---

## 3. Sider & Routes

Total: **26 sider** (7 synlige hoved-sider + 7 demo-parity + 9 docs + 3 støtte).

### 3.1 Home (`/`) — `app/page.tsx`
Fandtes oprindeligt som redirect til `/chart-test`. Overskygges nu af `(docs)/page.tsx` som landing for docs-site. 5 linjer.

### 3.2 Session Analysis (`/chart-test`) — **CROWN JEWEL**
**`app/chart-test/page.tsx`** — Den primære feature-side. Nu **sport-aware** (cycling + running, 2026-04-18).

**Funktionalitet:**
- FIT-fil upload (Garmin .fit binær-filer) — parser detekterer `isRunning`
- Sport-aware chart-rækkefølge: running får `pace` før power; cycling beholder klassisk rækkefølge
- Pace-kanal + pace-zoner for running (2026-04-18)
- **BestSplitsStrip** — running-pendant til PeakPowers (klik-til-zoom på bedste splits)
- 7+ synkroniserede chart-kanaler: Power, HR, kJ/min, Cadence, Speed, Elevation, Torque, **Pace**
- Crosshair-synkronisering på tværs af alle charts (zero re-renders via ref-based pub/sub)
- Scroll-zoom + brush-selection + keyboard navigation + pinch-to-zoom
- Single-click = reset zoom til full range (2026-04-16)
- Peak Powers strip med 10 durationer (3s, 10s, 30s, 1m, 3m, 7m, 12m, 20m, 30m, 60m) — klik → zoom
- Power zones + HR zones overlay (toggle)
- Fullscreen-mode med chart-visibility toggles + **sport-aware sidebar** (2026-04-18)
- **AthleteParamsPanel** — manuel FTP/CP/Weight input, plus threshold pace sec/km (running) (2026-04-17/18)
- **MetricsTiers** — sport-guarded stats (nogle metrikker kun for cycling eller running)
- Metrisk visning: distance, kalorier, temperatur, ascent, energi-erstatning
- Fallback kcal fra energyKJ (2026-04-16)
- Fueling-metrics med progress bar
- Hover data-tabel — **sport-aware kolonner** (2026-04-18)
- Live stats grid (compact row, 2026-04-17/18)
- Scrubber mini-map
- Shortcut hints i sidebar (2026-04-18)

**Støtte-komponenter:**
- `components/chart-test/AthleteParamsPanel.tsx`
- `components/chart-test/BestSplitsStrip.tsx` (ny)
- `components/chart-test/MetricsTiers.tsx` (ny)

**Layout:** `app/chart-test/layout.tsx` — 15 linjer, `revalidate: 0`, `dynamic: 'force-dynamic'`.

### 3.3 Generic Demo (`/demo`) — `app/demo/page.tsx` + `app/demo/generate-data.ts`
**~600+ linjer** — Showcase af 20+ chart-typer med syntetiske data (stock, revenue, IoT, sparkline, donut, percent area, scatter, candlestick, waterfall, radar, radial bar, treemap, funnel, box plot, heatmap, calendar heatmap, sparkline table, annotations, gradient threshold).

### 3.4 Shadcn-Parity Demo-Sider

Dedikerede sider der beviser @ramtt/charts matcher shadcn/Recharts feature-for-feature:

| Route | Fil | Varianter | Nye features |
|-------|-----|-----------|--------------|
| `/demo/area` | `app/demo/area/page.tsx` | **9 varianter** | `CurveType`, stacked, gradient, dotted |
| `/demo/bar` | `app/demo/bar/page.tsx` | **12 varianter** | `horizontal`, `showLabels`, `activeIndex`, grouping stagger |
| `/demo/line` | `app/demo/line/page.tsx` | **9 varianter** | `showDots`, `renderDot`, step lines, labels |
| `/demo/pie` | `app/demo/pie/page.tsx` | **9 pie/donut** | `activeIndex` wedge expand, `centerContent`, leader lines |
| `/demo/radar` | `app/demo/radar/page.tsx` | **6 radar + 6 radial** | `gridType`, `showDots`, `centerContent` |
| `/demo/tooltip` | `app/demo/tooltip/page.tsx` | **6 tooltip-varianter** | `tooltipIndicator`, `showTotal`, ikon-integration |
| `/demo/treemap` | `app/demo/treemap/page.tsx` | Hierarchical | `ChartTreemapPro` + **ChartTreemapTooltip** (ekstraheret 2026-04-17) |

Hver side har sin egen `generate-data.ts` med shadcn-kompatibel seed data.

### 3.5 Login Demo (`/demo/login`) — `app/demo/login/page.tsx`
Auth-screen mockup. Bruger `AuthLayout` + `OAuthButton` + `RamttWordmark`.

### 3.6 UI Demo (`/ui-demo`) — `app/ui-demo/page.tsx`
Interaktiv showcase af alle 113 UI-komponenter med alle states, accessibility-demoer, dark dropdown, wave-gruppering.

### 3.7 Color Guide (`/color-guide`)
~700+ linjer. 30 sektioner, ~155 tokens, ~310 designbeslutninger, 65 chart-illustrationer, warm dark mode preview.

### 3.8 Accent Demo (`/accent-demo`)
`app/accent-demo/page.tsx` + 5 støtte-filer. ~171 accents på tværs af ~20 familier (Tailwind 500/600/700/800/900/950 + 14 custom + earth/teal/forest/exotic). Settings-replica, HSL token generator, 12 CSS-variabler per accent, sidebar-nav eksperimenter.

### 3.9 Color Lab (`/color-lab` + `/color-lab/live`)
Farvesystem-laboratorium. Live-version bruger `lib/oklch.ts` til OKLCH-baseret color manipulation.

### 3.10 Icon Demo (`/icon-demo`)
Ikon-katalog med alle 400 line-ikoner, variant- og størrelses-sammenligning, click-to-copy, animated showcase.

### 3.11 Icon Catalog (`/icon-catalog`)
1.020 linjer. Søgning, filter (30+ kategorier), variant toggle, størrelsestoggle, farve-picker, detail-paneler, context/morph/reactive sektioner.

### 3.12 Docs-Site (`app/(docs)/`)

Route group med komplet docs-landing:

| Route | Fil | Formål |
|-------|-----|--------|
| `/` (docs landing) | `(docs)/page.tsx` | Docs hjem |
| `/getting-started` | `getting-started/page.tsx` | Onboarding |
| `/tokens` | `tokens/page.tsx` | Design token reference |
| `/patterns` | `patterns/page.tsx` | UI-patterns |
| `/icons` | `icons/page.tsx` | Ikon-dokumentation |
| `/components` | `components/page.tsx` | Komponent-oversigt (113) |
| `/components/[slug]` | `components/[slug]/page.tsx` | Dynamic per-component docs (inkl. `HexSwatch`, registreret 2026-04-17) |
| `/charts` | `charts/page.tsx` | Chart-oversigt (45) |
| `/charts/[slug]` | `charts/[slug]/page.tsx` | Dynamic per-chart docs |

Layout: `(docs)/layout.tsx` + `LandingPreview.tsx`. **Konverteret til Server Components + SSG** (commit `e275331`, 2026-04-17). ToggleGroup-demoer er splittet ud i client-wrappers.

**Registry-filer (`lib/docs/`):**
- `registry.ts` — Komponent-registry for dynamic routes
- `chart-registry.ts` — Chart-registry for dynamic routes
- `navigation.ts` — Sidebar-navigation struktur

### 3.13 Root Layout — `app/layout.tsx`
Satoshi font loading, DevCacheGuard, global CSS.

### 3.14 Global CSS — `app/globals.css`
Tailwind `@theme` directives med RAMTT color system, surfaces, text hierarchy, power/HR/CHO/kJ zones.

---

## 4. Chart-Primitiver

**Sti:** `components/charts/primitives/`
**Antal:** **45 primitiver** + 2 hooks/utils + 1 context + 1 RULES.md + 10 test-filer

### 4.1 Kerne-Primitiver

| Komponent | Fil | Formål |
|-----------|-----|--------|
| **ChartRoot** | `ChartRoot.tsx` | SVG-container, auto-scaling, ChartContext provider |
| **ChartLine** | `ChartLine.tsx` | Polyline med hybrid downsampling + `CurveType` + `showDots` + `renderDot` |
| **ChartArea** | `ChartArea.tsx` | Gradient-filled area + `CurveType` |
| **ChartBar** | `ChartBar.tsx` | Vertikal/horizontal bar, `showLabels`, `activeIndex`, grouping |
| **ChartGrid** | `ChartGrid.tsx` | Bagvedliggende grid-linjer |
| **ChartAxisX** | `ChartAxisX.tsx` | X-akse med formatering |
| **ChartAxisY** | `ChartAxisY.tsx` | Y-akse med niceTicks, label |
| **ChartAxisValue** | `ChartAxisValue.tsx` | **NY 2026-04-18** — Axis-value label primitive (med test) |
| **ChartCrosshair** | `ChartCrosshair.tsx` | Zero-rerender hover via ref-based pub/sub |
| **ChartSyncProvider** | `ChartSyncProvider.tsx` | Synkroniserer zoom + hover. zoom MUST bruge direct `setZoomState()` |
| **ChartZoomHandler** | `ChartZoomHandler.tsx` | Scroll-zoom + brush + keyboard + pinch-gesture |
| **ChartRefLine** | `ChartRefLine.tsx` | Horisontal stiplet reference-linje |
| **ChartPattern** | `ChartPattern.tsx` | SVG pattern definitions |

### 4.2 Specialiserede Chart-Typer

| Komponent | Fil | Formål |
|-----------|-----|--------|
| **ChartScatter** | `ChartScatter.tsx` | Scatter plot |
| **ChartCandlestick** | `ChartCandlestick.tsx` | OHLC candlestick |
| **ChartRadar** | `ChartRadar.tsx` | Radar/spider, `gridType`, `showDots`, `centerContent` |
| **ChartRadialBar** | `ChartRadialBar.tsx` | Radial bar ringe |
| **ChartTreemap** | `ChartTreemap.tsx` | Nested rektangler |
| **ChartTreemapPro** | `ChartTreemapPro.tsx` | Hierarchical treemap med Jade/Clay 3-step color scale |
| **ChartTreemapTooltip** | `ChartTreemapTooltip.tsx` | **NY 2026-04-17** — Ekstraheret tooltip fra ChartTreemapPro (commit `c1cfc6f`) |
| **ChartFunnel** | `ChartFunnel.tsx` | Funnel chart |
| **ChartPyramid** | `ChartPyramid.tsx` | Pyramid/triangle |
| **ChartBoxPlot** | `ChartBoxPlot.tsx` | Q1, median, Q3, whiskers |
| **ChartHeatmap** | `ChartHeatmap.tsx` | 2D heatmap grid (fontFamily → `var(--font-sans)` fix, 2026-04-17) |
| **ChartCalendarHeatmap** | `ChartCalendarHeatmap.tsx` | GitHub-stil kalender |
| **ChartDonut** | `ChartDonut.tsx` | Donut/pie med `activeIndex`, `centerContent`, leader lines |
| **ChartWaterfall** | `ChartWaterfall.tsx` | Running totals |
| **ChartSankey** | `ChartSankey.tsx` | Sankey flow diagram |
| **ChartSunburst** | `ChartSunburst.tsx` | Sunburst/radial hierarchy |
| **ChartBullet** | `ChartBullet.tsx` | Target, range, measure |

### 4.3 Domain-Specifikke Visualiseringer

| Komponent | Fil | Formål |
|-----------|-----|--------|
| **ChartMMP** | `ChartMMP.tsx` | Mean Maximal Power curve (cycling) |
| **ChartPMC** | `ChartPMC.tsx` | Performance Management Chart (CTL/ATL/TSB) |
| **ChartZoneLine** | `ChartZoneLine.tsx` | SVG gradient zone-farver |
| **ChartZoneBackground** | `ChartZoneBackground.tsx` | Filled zone-regioner bag data |
| **ChartIntervalMarkers** | `ChartIntervalMarkers.tsx` | Sprint/interval labels |
| **ChartFuelLollipop** | `ChartFuelLollipop.tsx` | Diskrete fuel-intake events |
| **ChartValueTracker** | `ChartValueTracker.tsx` | Value-tracking indicator |

### 4.4 Interaktions-Lag

| Komponent | Fil | Formål |
|-----------|-----|--------|
| **ChartScrubber** | `ChartScrubber.tsx` | Mini-map med draggable viewport |
| **ChartNavigator** | `ChartNavigator.tsx` | Navigator med handles |
| **CrosshairTimeLabel** | `CrosshairTimeLabel.tsx` | Timestamp-pill på X-aksen |
| **BrushOverlay** | `BrushOverlay.tsx` | Semi-transparent brush overlay |
| **ChartTooltip** | `ChartTooltip.tsx` | Floating tooltip |
| **ChartAnnotation** | `ChartAnnotation.tsx` | Floating label med pointer |
| **ChartPeriodTabs** | `ChartPeriodTabs.tsx` | Periode-tabs til chart-filtre |
| **ChartWithSubChart** | `ChartWithSubChart.tsx` | Master/detail composition |

### 4.5 Polish: CRISP Shape-Rendering

Tre commits 2026-04-17/18 (`8ae9a05`, `e5847ba`, `d3e1c50`) rullede `shape-rendering: crispEdges` / `geometricPrecision` ud på tværs af alle 45 primitiver + hele sitet. SVG-text bruger nu eksplicit `fontFamily: var(--font-sans)` (ikke Tailwind-klasser — proven breakage).

### 4.6 Hooks & Context

| Fil | Formål |
|-----|--------|
| `chart-context.ts` | React.createContext for ChartRoot data/scales |
| `useChartZoom.ts` | Zoom-state management hook + pinch-to-zoom gesture |

### 4.7 Tests (10 primitiv-tests)

| Test-fil | Dækker |
|----------|--------|
| `ChartAnnotation.test.tsx` | Annotation rendering |
| `ChartAxisValue.test.tsx` | **NY 2026-04-18** |
| `ChartBoxPlot.test.tsx` | Box plot beregninger |
| `ChartCalendarHeatmap.test.tsx` | Kalender layout |
| `ChartCandlestick.test.tsx` | OHLC rendering |
| `ChartFunnel.test.tsx` | Funnel layout |
| `ChartHeatmap.test.tsx` | Heatmap farve-interpolation |
| `ChartRadar.test.tsx` | Radar geometry |
| `ChartRadialBar.test.tsx` | Radial bar arcs |
| `ChartTreemap.test.tsx` | Treemap layout algoritme |

### 4.8 Import-Regler

**Ingen barrel export** for chart-primitiver — import direkte fra fil-sti (`components/charts/primitives/ChartLine`).

---

## 5. Chart Math Layer

**Sti:** `lib/charts/`
**Princip:** Ren TypeScript, nul dependencies, nul React, nul DOM.

### 5.1 Scales — `lib/charts/scales/`

| Fil | Eksporter | Formål |
|-----|-----------|--------|
| `linear.ts` | `scaleLinear`, `LinearScale` | Lineær scale med `.inverse()`, `.clamp()` |
| `log.ts` | `scaleLog` | Logarithmic scale |
| `time.ts` | `scaleTime` | Time/date scale |
| `band.ts` | `scaleBand` | Band/ordinal scale til bar charts |

### 5.2 Paths — `lib/charts/paths/`

| Fil | Eksporter | Formål |
|-----|-----------|--------|
| `line.ts` | `linePath`, `Accessor`, `CurveType` | Polyline + step + 'natural'/'linear'/'step' |
| `area.ts` | `areaPath` | Lukket area-path |
| `arc.ts` | `arcPath`, `pieLayout` | SVG arc + pie/donut layout |
| `radar.ts` | `radarPoints`, `radarPath`, `radarGridPoints` | Radar/spider geometri |

### 5.3 Layouts — `lib/charts/layouts/`

| Fil | Eksporter | Formål |
|-----|-----------|--------|
| `sankey.ts` | Sankey flow layout | Multi-level flow diagram |
| `sunburst.ts` | Sunburst hierarchy layout | Radial tree layout |

### 5.4 Ticks — `lib/charts/ticks/`

| Fil | Eksporter | Formål |
|-----|-----------|--------|
| `nice.ts` | `niceTicks`, `niceNum` | Menneske-venlige tick-værdier |

### 5.5 Utils — `lib/charts/utils/`

| Fil | Eksporter | Formål |
|-----|-----------|--------|
| `lttb.ts` | `lttb`, `Point` | Largest Triangle Three Buckets downsampling — O(n) |
| `smooth-decimate.ts` | `smoothDecimate` | Hybrid downsampling: even spacing + peak preservation |
| `extent.ts` | `extent`, `extentOf` | Min/max med optional padding |
| `bisect.ts` | `bisectNearest`, `bisectData` | O(log n) binær søgning |
| `nearest2d.ts` | `nearest2d` | Nærmeste punkt i 2D |
| `stack.ts` | `stackSeries` | Stack multiple serier |
| `waterfall.ts` | `waterfallLayout` | Waterfall layout |
| `treemap.ts` | `treemapLayout` | Squarified treemap |
| `colorInterpolate.ts` | `interpolateColor`, `hexToRgb`, `rgbToHex` | RGB interpolation |
| `colorScale.ts` | `interpolateColorScale`, `parseHexColor`, `isLightColor` | Værdi-baseret interpolation |
| `peakPower.ts` | `computePeakPower` | Peak power (3s-60m) |
| `pmc.ts` | `computePMC` | Performance Management Chart (CTL, ATL, TSB) |
| `sma.ts` | `computeSMA` | Simple Moving Average |
| `zoom.ts` | `zoomReducer`, helpers | Ekstraheret zoom-logic |
| `animate.ts` | Animation helpers | Shared animation utilities |
| `capture.ts` | Export-til-image helpers | PNG/SVG capture |

### 5.6 Test-Oversigt

Total: **25+ math-tests** dækker scales (linear/log/time/band), paths (line/area/arc/radar), ticks, utils (lttb/extent/bisect/nearest2d/smooth-decimate/stack/treemap/waterfall/peakPower/pmc/sma/zoom/animate/capture/colorInterpolate/colorScale).

### 5.7 Barrel Export — `lib/charts/index.ts`

---

## 6. UI-Komponenter

**Sti:** `components/ui/`
**Antal:** **113 komponenter** (+ `ramtt-logo.tsx` + `index.ts` + `tokens.css` + `RULES.md` + `README.md`)

Bygget i **13 waves** (1, 2, 3, 4, 5, 6, 7A, 7B, 7C, 8A, 8B, 8C, 8D, 9, 10, 11, 12, 13).

### Wave 1 — Display & Input (12 stk)
`Button`, `Badge`, `ToggleGroup`, `Card`, `DataRow`, `DataTable`, `Input`, `Select`, `MetricCard`, `SettingsCard`, `ProgressBar`, `SectionHeader`.

### Wave 2 — Interaction Layer (6 stk)
`Modal`, `Toast`, `Dropdown`, `Tabs`, `Skeleton`, `Switch`.

### Wave 3 — Polish & Navigation (6 stk)
`Tooltip`, `Accordion`, `Slider`, `Avatar`, `EmptyState`, `Breadcrumb`.

### Wave 4 — App-Specific (8 stk)
`Sidebar`, `PageHeader`, `Textarea`, `Checkbox`, `Radio`, `FileUpload`, `Tag`, `Gauge`.

### Wave 5 — Full Parity + Beyond (10 stk)
`Calendar`, `DatePicker`, `Popover`, `Command`, `Pagination`, `Drawer`, `Spinner`, `Kbd`, `Alert`, `Combobox`.

### Wave 6 — Final Parity (8 stk)
`Separator`, `Label`, `Collapsible`, `InputGroup`, `ScrollArea`, `HoverCard`, `Resizable`, `ContextMenu`.

### Wave 7A — Atomic Display + Input (4 stk)
`ColorDot`, `StatusIndicator`, `SegmentedBar`, `NumberStepper`.

### Wave 7B — Input Patterns (3 stk)
`RatingInput`, `TimePicker`, `StepFlow`.

### Wave 7C — Widget System (3 stk)
`WidgetCard`, `WidgetPicker`, `DashboardGrid`.

### Wave 8A — Display + Interaction (6 stk)
`Stat`, `ComparisonCard`, `TimelineStrip`, `RangeSlider`, `FormField`, `NotificationBadge`.

### Wave 8B — Compound Components (6 stk)
`ChartCard`, `Leaderboard`, `MemberList`, `InviteCard`, `OnboardingLayout`, `NotificationPreferences`.

### Wave 8C — Utility Components (3 stk)
`TodoList`, `HelpSection`, `FieldMapping`.

### Wave 8D — Layout & Form Patterns (13 stk)
`DescriptionList`, `Feed`, `ActionPanel`, `GridList`, `MediaObject`, `FormLayout`, `ButtonGroup`, `AuthLayout`, `VirtualList`, `ColorPicker`, `OAuthButton`, `TrendBadge`, `AppSidebar`.

### Wave 9 — Dark Surfaces & Footer (5 stk)
`LinkGroup`, `LinkList`, `DarkSection`, `SocialIcons`, `Footer`.

### Wave 10 — Category System & Command Palette (2 stk)
`CategoryIcon`, `CommandPalette`.

### Wave 11 — Editor Shell (4 stk)
`IconTabBar`, `PanelSidebar`, `FloatingToolbar`, `FloatingPanel`.

### Wave 12 — Claude-Inspired (12 stk)
`WorkspaceSwitcher`, `ActivityHeatmap`, `QuickSearch`, `ConversationList`, `StatsGrid`, `ProjectsGrid`, `ChatInput`, `MessageActions`, `WelcomeHero`, `PromoCard`, `ActiveTask`, (plus 1 intern composition).

### Wave 13 — Animation Utilities + Swatches (3 stk)
| # | Komponent | Formål |
|---|-----------|--------|
| 111 | `AnimatedPanel` | Panel med collapse/expand-animation (CSS-baseret) |
| 112 | `ComingSoon` | Placeholder for fremtidige features |
| 113 | **`HexSwatch`** | **NY 2026-04-17** (commit `ad123c3`) — Hex-farve swatch til color-lab. Audit har data-array exception for hex i nærheden |

### Understøttende Filer

| Fil | Formål |
|-----|--------|
| `index.ts` | Public API barrel export af alle 113 komponenter + design system constants |
| `tokens.css` | Font loading + CSS variable definitions — inkl. dark surface tokens, accent-soft, 56 domain-color CSS tokens |
| `RULES.md` | Non-negotiable system regler |
| `README.md` | Komponent-library oversigt |
| `ramtt-logo.tsx` | `RamttWordmark` + `RIcon`. ALTID wordmark på auth/marketing |

---

## 7. Ikon-System

**Sti:** `components/icons/`
**Total:** **1.717 ikon-filer** på tværs af **8 variant-typer** med **400 base-ikoner**.

### 7.1 Base-Filer

| Fil | Formål |
|-----|--------|
| `IconBase.tsx` | Line-ikoner (24px, strokeWidth 1.5) |
| `IconBaseLight.tsx` | Light-ikoner (18px, strokeWidth 1.25) |
| `IconBaseSolid.tsx` | Solid (evenodd knockouts) |
| `IconBaseDuo.tsx` | Duo-tone (accent color parameter) |
| `types.ts` | Delte types |
| `catalog.ts` | Metadata (kategorier, tags) |
| `index.ts` | Barrel export |

### 7.2 Variant-Oversigt

| Variant | Antal | Default størrelse / stroke |
|---------|-------|----------------------------|
| Line | 400 | 24px / 1.5 |
| Light | 400 | 18px / 1.25 |
| Solid | 400 | filled |
| Duo | 400 | two-tone + accent |
| Animated | 20 | CSS transitions |
| Context-Aware | 25 | data-driven mikro-viz |
| Morph | 24 | smooth `d`-property transitions |
| Reactive | 45 | CSS hover micro-animations |
| **Total** | **1.717** | |

### 7.3 Kategorier (30+)

Navigation, Actions, Arrows, Status, Communication, Media, Files, Users, Layout, Data, Devices, Weather, Commerce, Toggle, Misc, Sport/Domain, Training, Nutrition, Body/Wellness, sport-equipment, sport-race, sport-lab, sport-anatomy, sport-nutrition, sport-physiology, navigation-app, sort, form, social, feedback, food (Wave 12) m.fl.

### 7.4 Icon Audit

**Audit-script:** `scripts/audit-icons.ts` — validerer variant-dækning, export consistency, ingen hardcoded fills, strokeWidth propagation. Aktuelt: **1717/1717 pass**.

---

## 8. Design System Foundation

### 8.1 Master Constants — `lib/ui.ts`

**Eksporterer:** `cn()`, `WEIGHT` (400/450/500/550), `FONT`, `LABEL_STYLE`, `VALUE_STYLE`, `MUTED_STYLE`, `BODY_STYLE`, `QUIET_STYLE`, `UNIT_STYLE`, `RADIUS` (sm 4 / md 5 / lg 12 / xl 16), `BORDER` (0.5px subtle/default), `SIZE_HEIGHTS`, `SIZE_TEXT`, `SIZE_PADDING_X`, `TRANSITION` (150ms, aldrig `transition-all`), `HOVER_SAND`, `ACTIVE_SAND`, `ACTIVE_BLACK`, `FOCUS_RING`/`FOCUS_RING_THICK`/`FOCUS_RING_THIN`, `WHITE_LIFT`, `SELECTION_SAND`, **`DOMAIN`**, `DomainKey`, `CATEGORY_COLORS`, sidebar-konstanter, Wave 11/12-konstanter, dark surface tokens, modal/toast/dropdown/switch/tooltip/slider/avatar/calendar/pagination/drawer/spinner/separator/scrollbar/dot/stepper/step/rating/widget/grid/stat/badge/gauge/layout-konstanter, format-funktioner (`formatTime`, `formatPercent`, `formatCompact`).

### 8.2 Color Constants — `lib/constants/colors.ts`
Zone-farver (6 × 4 typer: POWER, HR, CHO, KJ), signal-farver, `NUTRIENT_COLORS`, `COMPARISON_COLORS`, `DOT_COLORS`.

### 8.3 Domain Color Triade

| Domain | Farve | Kode |
|--------|-------|------|
| **Nutrition** (accent) | Cyan 500 | `#06B6D4` |
| **Training** | Pink 600 | |
| **Body** | Indigo 500 | |

56 CSS tokens fra triaden. Squircle dots 30% opacity. Accent-soft ~12% til active states. Hover bruger `--n200`.

### 8.4 OKLCH Utilities — `lib/oklch.ts`
Bruges af `/color-lab/live`.

### 8.5 CSS Tokens — `components/ui/tokens.css`
Font loading + CSS variable definitions. Neutral-skala, typografi, spacing, surfaces (inkl. dark surface tokens).

### 8.6 Global Theme — `app/globals.css`
Tailwind `@theme` directives: neutral-skala (--bg, --n50 → --n1150), zone-farver, signal-linjer, UI chrome (accent, danger, warning, success, info).

### 8.7 Shared Types — `types/ui.ts`
`Size`, `SemanticColor`, `BaseComponentProps`, `InteractiveProps`, `LabelledProps`, `ColoredProps`.

### 8.8 Sidebar Nav Standard — **LOCKED**

```
NAV_ITEM_STYLE: 11px, weight 450, color --n1150
NAV_ICON:       18px, stroke-width 1.25 (Light variant)
GAP:            14px (gap-3.5)
ACTIVE:         accent-soft (~12% opacity)
HOVER:          --n200 (warm neutral, ikke accent-wash)
```

---

## 9. Data & Parsers

### 9.1 FIT File Parser — `lib/fit-parser.ts`
Konverterer Garmin .fit til `FitData`:
- Power (W), HR (bpm), Cadence (rpm), Speed (km/h), Altitude (m), Temperature (°C), Distance (km), Timestamps
- `lengthUnit: 'km'` konverterer alle længder
- Fields er `number | undefined`
- Fallback kcal fra energyKJ
- **NY 2026-04-18:** `isRunning`, `distance[]`, `thresholdPaceSecPerKm` (commit `0c7d1e7`)

### 9.2 Andre Parsers — `lib/parsers/`

| Fil | Formål |
|-----|--------|
| `gpx-parser.ts` | GPX track parser |
| `tcx-parser.ts` | TCX workout parser |
| `types.ts` | Delte types |
| `index.ts` | Barrel export |
| `__tests__/parsers.test.ts` | Parser tests |

### 9.3 Demo Data Generators

Per-demo generators: `app/demo/generate-data.ts` + `area/`, `bar/`, `line/`, `pie/`, `radar/`, `tooltip/`, `treemap/` underfoldere.

### 9.4 Color Guide Data — `app/color-guide/chart-data.ts`

### 9.5 Sample FIT Files
- `FIT_FILES/i133046028_MIT_with_spikes (1).fit` — Real Garmin session
- `public/fit-data/mit-with-spikes.json` — Pre-parsed JSON

### 9.6 Andre Utilities
- `lib/utils.ts` — Legacy `cn`
- `lib/calendar-utils.ts` — Kalender helpers

---

## 10. Scripts & Tooling

**Sti:** `scripts/` (8 scripts)

| Script | Kommando | Formål |
|--------|----------|--------|
| **`audit.ts`** | `npm run audit` | **UNIFIED RAMTT audit** (fusioneret 2026-04-17, commit `b56724d`). Dækker UI, charts, math, sider, tokens. `--scope ui` og `--scope charts` scoper subsets. **Inkluderer Rule Zero inline-detect + banned icon libs.** |
| `audit-icons.ts` | `npm run audit:icons` | Ikon-system audit |
| `add-copyright-headers.ts` | Manuel | Tilføjer RAMTT copyright headers |
| `generate-400.mjs` | Manuel | The Lucky 7 — nå 400 base icons |
| `generate-reactive-wave.mjs` | Manuel | Reactive icon generator |
| `generate-wave10-icons.mjs` | Manuel | Wave 10 icons |
| `generate-wave11-icons.mjs` | Manuel | Wave 11 icons |
| `generate-wave11b-fun.mjs` | Manuel | Wave 11B fun icons |
| `generate-wave12-food.mjs` | Manuel | Wave 12 food icons |

> **Bemærk:** `scripts/audit-ui.ts` og `scripts/audit-charts.ts` eksisterer IKKE længere — fusioneret ind i `scripts/audit.ts` (2026-04-17). Legacy-referencer i docs blev opdateret 2026-04-17 (commit `5e11514`).

### 10.1 NPM Scripts (package.json)

```bash
npm run dev              # Next.js dev server, port 5000 (rydder .next cache)
npm run build            # Production build
npm run lint             # ESLint
npm run audit            # Unified audit (KUN denne — dækker alt)
npm run audit:ui         # UI-scope (audit.ts --scope ui)
npm run audit:charts     # Charts-scope (audit.ts --scope charts)
npm run audit:icons      # Ikon-audit
npm run ship             # NY 2026-04-18 — audit + build (guard før push)
npm run prepare          # NY 2026-04-18 — Husky install (kører automatisk via npm install)
npm run build:charts     # Build @ramtt/charts (tsup)
npm run build:ui         # Build @ramtt/ui (tsup)
npm run build:packages   # Build begge pakker
```

### 10.2 Audit-Checks i `scripts/audit.ts`

- **Hardcoded styling:** `border-[...]`, `rounded-[...]`, `text-[Npx]`, `bg-[#...]`, hex-farver udenfor allowlist
- **Font-weight:** `font-medium|semibold|bold` (undtagen i `app/(docs)/`, 2026-04-17)
- **Transition:** Ingen `transition-all`
- **Rule Zero inline components:** Detekterer `function Something()` i `app/**/page.tsx` med hardcoded styling. Path-allowlist for demo/playground/docs. `app/chart-test/page.tsx` grandfathered (warnings, ikke errors — 9 kendte inline-komponenter under gradvis refactor).
- **Banned icon libraries:** Blokerer imports af lucide-react, @heroicons/react, react-icons, @iconify/react, @tabler/icons-react, react-feather, phosphor-react, @phosphor-icons/react, react-bootstrap-icons, @fortawesome/*, remixicon-react, @remixicon/react, react-ionicons
- **Audit-ignore markers:** `// audit-ignore-hex` inline marker (restored 2026-04-17, commit `148bfd3`) + data-array exception for HexSwatch

**Audit-status:** **clean** (0 errors).

---

## 11. NPM Packages

### 11.1 @ramtt/charts — `packages/charts/`

| Fil | Formål |
|-----|--------|
| `package.json` | name: "@ramtt/charts", version 0.1.0 |
| `tsconfig.json`, `tsup.config.ts`, `dist/`, `README.md` | Standard pakke-struktur |
| `src/index.ts` | Re-eksporterer chart-primitiver |
| `src/math/index.ts` | Re-eksporterer math layer |

**Exports:** `@ramtt/charts` (alle 45 primitiver), `@ramtt/charts/math` (ren math).

### 11.2 @ramtt/ui — `packages/ui/`

| Fil | Formål |
|-----|--------|
| `package.json` | name: "@ramtt/ui", version 0.1.0 |
| `tsconfig.json`, `tsup.config.ts`, `src/index.ts`, `dist/`, `README.md` | Standard pakke-struktur |

**Exports:** `@ramtt/ui` (alle 113 komponenter + design system constants), `@ramtt/ui/tokens.css`.

---

## 12. Dokumentation

Stor oprydning 2026-04-18: 10 historiske filer arkiveret, 2 nye rod-filer tilføjet.

### 12.1 Aktive Filer — `docs/`

| Fil | Formål |
|-----|--------|
| `REPO-OVERVIEW.md` | **Denne fil** — komplet repo-overblik |
| `FONT-RULES.md` | Font-system regler (~21KB, 2026-04-17) — Satoshi, Cormorant, hierarki |
| `color-system-v2.md` | Farve-system design rationale |

### 12.2 Subdirectories — `docs/`

| Dir | Indhold |
|-----|---------|
| `competitive-analysis/` | `claude_look.md`, `figma_look.md`, `linear_look.md`, `perplexity_look.md` |
| `fonts/` | `Cormorant_Garamond/`, `Satoshi_Complete/` — Instrument_Sans flyttet til arkiv 2026-04-18 |

### 12.3 Arkiverede Filer — `docs/_archive/` (2026-04-18)

Flyttet fordi de refererer forældede sandheder (gamle komponent-counts, separate audit-scripts, one-time briefs):

| Arkiveret fil | Grund |
|---------------|-------|
| `AUDIT-GUIDE.md`, `AUDIT-UI-GUIDE.md` | Beskrev separate `audit-ui.ts` + `audit-charts.ts` (fusioneret 2026-04-17) |
| `RAMTT-UI-STATUS.md` | Sagde 12 komponenter — nu 113 |
| `RAMTT-CHARTS-SYSTEM-REFERENCE.md` | Sagde 12 UI + 19 primitiver — nu 113 + 45 |
| `RAMTT-CHARTS-DEVELOPMENT-LOG.md` | Historisk udvikling log |
| `CLAUDE-CODE-PROMPT-CHARTS-DEMO.md` | One-time prompt (eksekveret) |
| `BRIEF-icon-light-variant.md` | Brief eksekveret (Light variant bygget) |
| `RAMTT-CHARTS-GENERIC-DEMO-BRIEF.md` | One-time brief |
| `CHART-TEST-INTERACTION-AUDIT.md` | Historisk analyse 2026-04-16 — konklusion locked in `CLAUDE.md` |
| `Instrument_Sans/` (font folder) | Font ikke i brug siden 2026-04-06 |
| `README.md` (i _archive) | Forklarer arkivet |

### 12.4 Root-Level Docs

| Fil | Formål |
|-----|--------|
| `README.md` | Projekt-oversigt + arkitektur |
| `CLAUDE.md` | Repo-konventioner + `/ship` + Husky + motion-scope regler (opdateret 2026-04-18) |
| **`CLAUDE-RULES-PASTE.md`** | **NY 2026-04-18** — Paste-block for normal Claude Chat project instructions. ~400 ord. Kompakt Rule Zero + discovery protocol + no-fly zones. |
| **`HUSKE.md`** | **NY 2026-04-18** — Operator checklist for Malte (Danish). Session start routine, sync af 6 Project Knowledge filer til Claude Chat, hvornår bruge `/ship`, hvornår sige "opdater overblikket". |
| `LICENSE-MIT`, `LICENSE-APACHE`, `NOTICE` | Licens + copyright |
| `ramtt-chart-deep-technical-plan.md` | Dyb teknisk plan |
| `ramtt-chart-system-vision (2).md` | Vision-dokument |

### 12.5 Claude Chat Sync

6 filer skal holdes synkroniseret mellem repo og Claude Chat project:
1. `CLAUDE.md`
2. `components/ui/RULES.md`
3. `components/charts/primitives/RULES.md`
4. `lib/ui.ts`
5. `docs/REPO-OVERVIEW.md`
6. `docs/FONT-RULES.md`

Plus `CLAUDE-RULES-PASTE.md` pastes som INSTRUKTIONER (ikke fil). Workflow dokumenteret i `HUSKE.md`.

---

## 13. Assets & Fonts

### 13.1 Web Fonts — `public/fonts/`

| Font | Filer | Brug |
|------|-------|------|
| **Satoshi** | Variable.woff2, VariableItalic.woff2 | Body, labels, UI, numre — alt UI (--font-sans, --font-label, --font-mono alle peger på Satoshi) |
| **Cormorant Garamond** | VariableFont_wght.ttf, Italic-VariableFont_wght.ttf | Editorial/marketing KUN (--font-serif) |

Space Grotesk, Instrument Sans, JetBrains Mono er fjernet. `docs/fonts/Instrument_Sans/` flyttet til `_archive/` 2026-04-18.

### 13.2 FIT Data — `public/fit-data/`
- `mit-with-spikes.json` — Pre-parsed session data til demo

---

## 14. Backups

**Sti:** `backups/`

| Fil | Dato | Formål |
|-----|------|--------|
| `chart-test-page-2026-04-07-pre-ramtt-ui.tsx` | 7. apr 2026 | Før @ramtt/ui refactor (~67KB) |
| `chart-test-page-2026-04-16-pre-framer-removal.tsx` | 16. apr 2026 | Før framer-removal saga |
| `page-2026-04-05-v2.tsx` | 5. apr 2026 | Tidligere version |
| `page-2026-04-05.tsx` | 5. apr 2026 | Endnu tidligere version |
| `app/chart-test/page.backup.txt` | — | Inline backup |

---

## 15. Konfiguration

| Fil | Formål |
|-----|--------|
| `package.json` | Monorepo root, scripts, dependencies, `prepare: husky` |
| `package-lock.json` | Lockfile |
| `tsconfig.json` | TypeScript: ES2017, strict, paths (@/* → .) |
| `tsconfig.tsbuildinfo` | TS incremental build cache |
| `next.config.ts` | Next.js: Turbopack, dev cache headers |
| `next-env.d.ts` | Next.js types |
| `postcss.config.mjs` | PostCSS for Tailwind 4 |
| `.gitignore` | node_modules, .next, .DS_Store |
| `.vercel/` | Vercel deployment config |

### 15.1 Bulletproof Audit System — **NY 2026-04-18**

Installeret 2026-04-18 for at gøre det fysisk umuligt at committe system-violations. **5 lag:**

#### Lag 1 — `.husky/pre-commit` (Git hook)

Kører `npm run audit` før hver commit. Exit 1 blokerer commit fysisk. Aktiveres automatisk via `prepare: husky` i package.json.

```bash
echo "🔒 Running RAMTT audit before commit..."
npm run audit
if [ $? -ne 0 ]; then
  echo "❌ AUDIT FAILED — commit blocked."
  exit 1
fi
```

#### Lag 2 — `.claude/commands/ship.md` (Slash command)

`/ship <commit message>` — Safe ship workflow i Claude Code:
1. Audit (`npm run audit`) — stop hvis fejl
2. Build (`npm run build`) — stop hvis fejl
3. Review `git status` — verificer ingen secrets
4. Stage eksplicit (aldrig `git add -A`) + commit
5. Push

Husky pre-commit re-kører audit som safety net. Aldrig `--no-verify`. Conventional commits-format (`feat(ui):`, `fix(charts):` …).

#### Lag 3 — `scripts/audit.ts` Rule Zero check

Detekterer inline-komponenter i `app/**/page.tsx` med hardcoded styling (`border-[`, `rounded-[`, `text-[Npx]`, `font-medium|semibold|bold`). Path-allowlist for demo/playground/docs. `app/chart-test/page.tsx` grandfathered (warnings, ikke errors — 9 kendte inline-komponenter under gradvis refactor).

#### Lag 4 — `scripts/audit.ts` banned icon libs

Blokerer imports af Lucide, Heroicons, React-icons, Iconify, Tabler, Feather, Phosphor, Bootstrap-icons, FontAwesome, Remixicon, Ionicons. Kun `@ramtt/icons` tilladt.

#### Lag 5 — `CLAUDE-RULES-PASTE.md` (paste-block)

Paste-block til normal Claude Chat's project instructions. Kompakt Rule Zero + discovery protocol + no-fly zones. ~400 ord. Erstatter manuelt at oplære hver Claude Chat-session.

#### Supplerende — `HUSKE.md`

Operator-checklist for Malte i repo-roden. Covers: session-start routine, upload/sync af 6 Claude Chat Project Knowledge filer, hvornår bruge `/ship`, hvornår sige "opdater overblikket".

### 15.2 CLAUDE.md (opdateret 2026-04-18)

Master-regler for Claude Code. Indeholder nu også `/ship` + Husky-referencer. Motion-scope LOCKED til 9 steder i `app/chart-test/page.tsx` (kodificeret 2026-04-17).

### 15.3 Claude Code Config — `.claude/`

| Fil | Formål |
|-----|--------|
| `commands/ship.md` | `/ship` slash command (se 15.1 lag 2) |
| `launch.json`, `settings.local.json` | VSCode + lokale indstillinger |
| `visual_improvement/` | Design reference prompts (crisp rendering, design engineer, tailwind-enforcer) |

---

## 16. Git-Historik

**254 commits** fra 2026-04-05 til 2026-04-18 (**14 udviklingsdage**).

### Kronologisk Udvikling

| Fase | Commits | Periode | Indhold |
|------|---------|---------|---------|
| **Dag 1** | ~5 | 5. apr | Initial SVG chart system, 5 stacked charts |
| **Dag 2-3** | ~15 | 5-7. apr | FIT upload, zone metrics, scores, fueling, CHO |
| **Dag 3-4** | ~10 | 7-8. apr | Torque kanal, overlay (revert), brush overlay |
| **Dag 4-5** | ~8 | 8. apr | Peak powers, chart toggles, fullscreen, kJ/min |
| **Dag 5-6** | ~10 | 8-9. apr | Y-akse iterationer, chart heights, color system |
| **Dag 6-7** | ~15 | 9-10. apr | @ramtt/ui Wave 1, farve-guide, system reference docs |
| **Dag 7** | ~15 | 10. apr | @ramtt/ui Wave 2-6, demo 20 charts, audit scripts |
| **Dag 8** | ~20 | 13. apr | @ramtt/ui Wave 7-8A, @ramtt/icons 439 |
| **Dag 9** | ~25 | 14. apr | Accent-demo, domain color triade, squircle dots, sidebar nav LOCKED |
| **Dag 10** | ~30 | 15. apr | Wave 8B/8C/8D/9/10/11, 400 base icons, Light variant |
| **Dag 11** | ~35 | 16. apr | Wave 12, shadcn parity demos (7), chart redesigns, CLAUDE.md, zoom-lag saga |
| **Dag 12** | ~10 | 17. apr | Chart-test polish, CHO total, max W+HR, single-click reset |
| **Dag 13** | ~18 | 17. apr (kvæld) | **Unified audit-script**, HexSwatch, ChartTreemapTooltip, CRISP shape-rendering (x3), ramtt.dev → Server Components + SSG, chart-test inline-komponent refactors |
| **Dag 14** | ~17 | 18. apr | **Bulletproof audit system** (Husky + /ship + Rule Zero + banned icons + PASTE), **docs-oprydning** (10 filer arkiveret), **HUSKE.md + CLAUDE-RULES-PASTE.md**, **sport-aware chart-test** (pace, BestSplitsStrip, running mode), ChartAxisValue primitive, parser `isRunning` + `distance` + `thresholdPaceSecPerKm` |

### Dagens highlights (18. april, 17 commits)

```
f79449d feat(chart-test): sport-aware hover table + fullscreen sidebar
fc4338b feat(chart-test): AthleteParamsPanel wiring + MetricsTiers sport guards
802b63a feat(chart-test): BestSplitsStrip with click-to-zoom for running
4617253 feat(chart-test): sport-aware chart order + pace channel + pace zones
0c7d1e7 feat(parser): add isRunning, distance[], thresholdPaceSecPerKm
3b8b9bd feat(chart-test): ChartAxisValue primitive + shortcut hints + sidebar polish
f2b6e96 refactor(chart-test): RatingInput tighten + live stats grid
28ffbc6 refactor(chart-test): polish live stats + fullscreen sidebar
e8dcdad refactor(chart-test): compact live stats row, drop time label + dot
```

(Plus 17. apr kvæld: `5e11514` docs audit refs, `6991a06` HexSwatch registry, `d1b4278` docs font-medium skip, `c1cfc6f` ChartTreemapTooltip extract, `ad123c3` HexSwatch component, `148bfd3` audit-ignore-hex marker, `eeaad81` ChartHeatmap fontFamily fix, `b56724d` UNIFY audit script.)

### Udvalgte Milestones (Kronologisk)

| Commit | Beskrivelse |
|--------|-------------|
| `8ccb247` | Initial commit |
| `71d5078` | Peak powers strip |
| `78555ec` | @ramtt/ui Wave 1 |
| `457e173` | @ramtt/icons Wave 9A |
| `aa5d9a5` | **The Lucky 7 — 400 base icons milestone** |
| `23e50b6` | Domain color triade + 56 CSS tokens |
| `5c507db` | Sidebar nav standard LOCKED |
| `0bf4c1a` | @ramtt/icons Light variant |
| `5872d50` | Wave 12 Claude-inspired |
| `3398634` | **FIX zoom debounce — ROOT CAUSE of chart-test lag** |
| `73fc49a` | CLAUDE.md added |
| `e275331` | **ramtt.dev → Server Components + SSG** |
| `b56724d` | **UNIFY audit-ui + audit-charts → audit.ts** |
| `ad123c3` | **HexSwatch component** |
| `c1cfc6f` | **ChartTreemapTooltip extract** |
| `0c7d1e7` | Parser `isRunning` + pace |
| `4617253` | Sport-aware chart order + pace zones |
| `802b63a` | BestSplitsStrip running |

---

## 17. Arkitektur-Mønstre

### 17.1 Chart Interaktions-Arkitektur
```
Hover (zero re-renders — ref-based pub/sub):
  mousemove → rAF → bisectNearest → setAttribute()
    → sync.broadcastHover(index)
      → alle crosshairs, data-tabel, time-pill updater via refs

Zoom (React state — sjælden re-render, UDEN debounce):
  wheel/keyboard/pinch → setZoom({ start, end })
    → charts re-renderer med sliced data arrays

Brush:
  pointerdown → pointermove → BrushOverlay → pointerup → zoom

Pinch (touch):
  touchstart 2+ fingers → distance tracking → setZoom relative to center
```

### 17.2 Komponent-System
- **Compound components:** Card, ToggleGroup, DataTable, ChartCard, QuickSearch, ConversationList, ChatInput, ActiveTask, ProjectsGrid
- **Hooks:** useChartSync, useChartZoom, useToast
- **Context:** ChartContext, ChartSyncProvider
- **Accessibility:** WAI-ARIA (radiogroup, combobox, listbox, tablist, progressbar)
- **forwardRef** + **displayName** på alle interaktive komponenter

### 17.3 Publishing-Strategi
- To separate NPM-pakker (@ramtt/charts, @ramtt/ui)
- Math layer eksporteret som `./math` entrypoint
- CSS tokens som `./tokens.css`
- Zero eksterne dependencies for chart-primitiver
- Docs-site auto-genereres via registry-filer (Server Components + SSG)

### 17.4 Designprincipper
- **Warm palette:** Aldrig kolde sort-farver, altid warm neutrals
- **Sand interaktion:** Hover → sand-200, Active → sand-400, CTA → black
- **Specifik transition:** Aldrig `transition-all`
- **Font-hierarki:** Satoshi overalt, Cormorant kun editorial
- **0.5px borders:** Altid 0.5px, to niveauer (subtle + default)
- **Domain colors:** Nutrition (Cyan 500) = accent
- **Squircle dots:** 30% opacity
- **Accent-soft:** ~12% opacity til active states
- **Logo:** ALTID RamttWordmark, ALDRIG standalone RIcon
- **Rule Zero:** Aldrig hardcode styling, altid `lib/ui.ts` + `@ramtt/ui` fra første linje

---

## 18. Vigtige Regler & Gotchas

### 18.1 Non-Negotiable (CLAUDE.md + bulletproof system)

1. **Motion-pakken** bruges KUN i `app/chart-test/page.tsx` (9 steder, LOCKED 2026-04-17). ALDRIG erstat med AnimatedPanel/CSS grid.
2. **Zoom-state** MUST bruge direct `setZoomState()`. ALDRIG debounce.
3. **Audit** skal passe før commit. `npm run audit`. Håndhævet af Husky pre-commit (2026-04-18).
4. **Import charts** direkte fra fil-sti, ALDRIG barrel.
5. **cn()** — brug `lib/ui.ts` (ikke legacy `lib/utils.ts`).
6. **`/ship` workflow** — brug `/ship <message>` i Claude Code i stedet for manuelt commit+push.
7. **Banned icon libraries** — kun `@ramtt/icons`, audit blokerer alt andet.

### 18.2 UI-Regler (RULES.md + CLAUDE-RULES-PASTE.md)

1. Brug KUN `@ramtt/ui` og `lib/ui.ts` constants fra første linje.
2. Brug KUN `@ramtt/icons`. ALDRIG emoji, unicode, Lucide, tredjepartsbiblioteker.
3. ALTID `RamttWordmark` på auth/marketing — ALDRIG standalone `RIcon`.
4. ALTID tooltip på chart-demos.
5. Sidebar nav: 11px, weight 450, --n1150, icons 18px/sw 1.25, gap 14px.
6. Active state: accent-soft ~12%. Hover state: --n200.
7. **Ingen inline components i page.tsx** med hardcoded styling — audit blokerer det. Komponenter lever i `components/ui/`.
8. Sentence case overalt. Satoshi overalt. Ingen `uppercase` CSS.
9. Aldrig "Figma" i UI-tekst (undtagen color-lab/accent-demo).

### 18.3 Chart-Demo Regler

1. ALTID tooltip/crosshair interaction
2. ALTID ChartCard pattern
3. ALTID brug @ramtt/ui komponenter
4. Kør `npm run audit` (eller `/ship`) efter ændringer

### 18.4 FIT-Parser Gotchas

- Fields er `number | undefined`
- `lengthUnit: 'km'` konverterer ALLE længder — ALDRIG double-convert
- Fallback kcal fra `energyKJ` (kcal = kJ × 0.239)
- Weight er AthleteParam (manuel input), IKKE fra FIT
- **`isRunning` branch** styrer chart-rækkefølge, pace-kanal, BestSplitsStrip (2026-04-18)

### 18.5 Y-Akse Parkeret
Top tick når ikke data max. 3 tilgange prøvet + reverted. Accepteret as-is.

### 18.6 Dev Server
Brug `nohup` for long-running processes. Port = 5000.

### 18.7 Vercel-Deploy
Deploy KUN når explicitly bedt. Default = localhost.

### 18.8 Claude Chat Sync
Hold 7 filer i sync (`CLAUDE-RULES-PASTE.md` + 6 project knowledge). Se `HUSKE.md` for workflow.

### 18.9 Commit / Push / Deploy
Når brugeren siger "commit", "push", eller "deploy" direkte — bare gør det, ingen bekræftelse.

---

## 19. Samlet Statistik

| Metrik | Værdi |
|--------|-------|
| **Git commits** | **254** |
| **Udviklings-dage** | **14** (5-18. apr 2026) |
| **Totale source-filer (.ts/.tsx)** | **2.042** |
| **Linjer kode (.ts/.tsx)** | **~99.640** |
| **Sider/Routes** | **26** |
| **Chart-primitiver** | **45** komponenter |
| **Chart math utilities** | **19+** moduler |
| **Chart tests** | **25+** test-filer (10 primitiv + 15+ math) |
| **UI-komponenter** | **113** |
| **UI waves** | **13** (Wave 1–13) |
| **Ikon-filer (alle varianter)** | **1.717** |
| **Ikon-base (unique)** | **400** |
| **Ikon-varianter** | **8** (Line/Light/Solid/Duo + Animated/Context/Morph/Reactive) |
| **Ikon-kategorier** | **30+** |
| **Design tokens (CSS)** | **~155 + 56 domain + 12 accent** |
| **Color zones** | 24 (6×4 zone-typer) |
| **Scripts** | **8** (1 unified audit + 1 icon audit + 1 copyright + 5 icon-generators + 1 wave-reactive) |
| **NPM scripts** | **12** (inkl. `ship` + `prepare` NY 2026-04-18) |
| **Dokumentations-filer aktive** | **3** + 2 subdirs |
| **Dokumentations-filer arkiveret** | **10** (i `_archive/`) |
| **Root docs** | **5** (README, CLAUDE.md, CLAUDE-RULES-PASTE.md, HUSKE.md, plus vision-docs) |
| **NPM packages** | 2 (@ramtt/charts, @ramtt/ui) |
| **Web fonts** | 2 familier (Satoshi, Cormorant) |
| **Backup-filer** | **5** |
| **Dependencies (runtime)** | 13 |
| **Dependencies (dev)** | 3 (tsup, vitest, **husky**) |
| **Audit lag** | **5** (Husky → /ship → audit.ts → Rule Zero → banned libs) |

### Komponent-Total

| Type | Antal |
|------|-------|
| Chart-primitiver | **45** |
| UI-komponenter | **113** |
| Ikoner (alle varianter) | **1.717** |
| App-specifikke (chart-test helpers) | 3+ (AthleteParamsPanel, BestSplitsStrip, MetricsTiers) |
| **Total React-komponenter** | **~1.878** |

### Udvikling siden 17. april

| Metrik | 17. apr 19:49 | 18. apr | Δ |
|--------|---------------|---------|---|
| Commits | 219 | 254 | **+35** |
| UI-komponenter | 112 | 113 | +1 (HexSwatch) |
| Chart-primitiver | 43 | 45 | +2 (ChartTreemapTooltip, ChartAxisValue) |
| Scripts | 11 | 8 | **-3** (audit-ui + audit-charts fusioneret; wave-reactive-gen behold) |
| NPM scripts | 10 | 12 | +2 (ship, prepare) |
| Dev dependencies | 2 | 3 | +1 (husky) |
| Audit-lag | 1 (audit script) | **5** (bulletproof) | +4 |
| Aktive docs | 13+ filer | 3 filer + 10 arkiveret | ryddet |
| Root docs | 4 | 5 | +2 (CLAUDE-RULES-PASTE, HUSKE) -1 (FRAMER-MOTION-INVENTORY + CHART-TEST-INTERACTION-AUDIT flyttet/slettet) |
| Dev-dage | 13 | 14 | +1 |

### Udvikling siden 13. april

| Metrik | 13. apr | 18. apr | Δ |
|--------|---------|---------|---|
| Commits | 98 | 254 | **+156** |
| UI-komponenter | 66 | 113 | **+47** |
| Chart-primitiver | 28 | 45 | **+17** |
| Ikon-base | 126 | 400 | **+274** |
| Ikon-filer | 439 | 1.717 | **+1.278** |
| Ikon-varianter | 7 | 8 (Light ny) | +1 |
| Sider | 9 | 26 | +17 |
| Dev-dage | 8 | 14 | +6 |

---

*Genereret 2026-04-18 af Claude Code — komplet audit af ramtt-charts monorepo.*
*Erstatter 2026-04-17-versionen. Dagens tema: **bulletproof audit-system** + **docs-oprydning** + **sport-aware chart-test**.*
