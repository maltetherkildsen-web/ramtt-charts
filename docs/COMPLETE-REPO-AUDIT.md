# RAMTT-Charts — Komplet Repo-Overblik

> **Sidst opdateret:** 2026-04-13
> **Commits:** 98 (siden 2026-04-05)
> **Source-filer:** 636
> **Linjer kode:** ~50.700
> **Licens:** MIT OR Apache-2.0
> **Copyright:** 2026 RAMTT (Malte Therkildsen)

---

## Indholdsfortegnelse

1. [Projekt-Oversigt](#1-projekt-oversigt)
2. [Tech Stack & Dependencies](#2-tech-stack--dependencies)
3. [Sider & Routes (9)](#3-sider--routes)
4. [Chart-Primitiver (28 komponenter)](#4-chart-primitiver)
5. [Chart Math Layer (15 moduler)](#5-chart-math-layer)
6. [UI-Komponenter (66 komponenter)](#6-ui-komponenter)
7. [Ikon-System (439 ikoner)](#7-ikon-system)
8. [Design System Foundation](#8-design-system-foundation)
9. [Data & Parsers](#9-data--parsers)
10. [Scripts & Tooling (5)](#10-scripts--tooling)
11. [NPM Packages (2)](#11-npm-packages)
12. [Dokumentation (14+ filer)](#12-dokumentation)
13. [Assets & Fonts](#13-assets--fonts)
14. [Backups](#14-backups)
15. [Konfiguration](#15-konfiguration)
16. [Git-Historik](#16-git-historik)
17. [Arkitektur-Mønstre](#17-arkitektur-mønstre)
18. [Samlet Statistik](#18-samlet-statistik)

---

## 1. Projekt-Oversigt

**ramtt-charts** er et monorepo der indeholder to publicerbare NPM-pakker til RAMTT-platformen:

- **@ramtt/charts** — Zero-dependency SVG chart-primitiver med synkroniseret interaktion, 60fps hover, LTTB downsampling
- **@ramtt/ui** — 66 tilgængelige UI-komponenter med RAMTT design tokens

Repo'et fungerer som et selvstændigt Next.js-site med demo-sider, en FIT-fil-analyse-side, farve-guide, ikon-katalog og UI-showcase.

---

## 2. Tech Stack & Dependencies

### Runtime Dependencies
| Pakke | Version | Formål |
|-------|---------|--------|
| `next` | 16.2.2 | App Router + Turbopack |
| `react` | 19.2.4 | UI-framework |
| `react-dom` | 19.2.4 | DOM-rendering |
| `typescript` | 6.0.2 | Type-checking |
| `tailwindcss` | 4.2.2 | Utility-first CSS (v4, @theme tokens) |
| `@tailwindcss/postcss` | 4.2.2 | PostCSS-integration |
| `motion` | 12.38.0 | Animation (Framer Motion successor) |
| `clsx` | 2.1.1 | Conditional class-merging |
| `tailwind-merge` | 3.5.0 | Tailwind class-dedup |
| `fit-file-parser` | 2.3.3 | Garmin .fit fil-parsing |

### Dev Dependencies
| Pakke | Version | Formål |
|-------|---------|--------|
| `tsup` | 8.5.1 | Package bundler |
| `vitest` | 4.1.2 | Unit testing |

### Nul Eksterne Dependencies
Chart-primitiver og math layer bruger **ingen** eksterne libraries — kun React + native SVG.

---

## 3. Sider & Routes

### 3.1 Home (`/`) — `app/page.tsx`
Redirect til `/chart-test`. 5 linjer.

### 3.2 Session Analysis (`/chart-test`) — `app/chart-test/page.tsx`
**2.075 linjer** — Den primære feature-side.

**Funktionalitet:**
- FIT-fil upload (Garmin .fit binær-filer)
- 7 synkroniserede chart-kanaler: Power, HR, kJ/min, Cadence, Speed, Elevation, Torque
- Crosshair-synkronisering på tværs af alle charts (zero re-renders via ref-based pub/sub)
- Scroll-zoom + brush-selection + keyboard navigation
- Peak Powers strip med 10 durationer (3s, 10s, 30s, 1m, 3m, 7m, 12m, 20m, 30m, 60m)
- Klik-på-peak → zoom til det tidsinterval
- Power zones + HR zones overlay (toggle)
- Fullscreen-mode med chart-visibility toggles
- Session-data input panel (vægt, CHO-intake)
- Metrisk visning: distance, kalorier, temperatur, ascent, energi-erstatning
- Fueling-metrics med progress bar
- Hover data-tabel (3-kolonne grid)
- Scrubber mini-map

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

### 3.4 UI Demo (`/ui-demo`) — `app/ui-demo/page.tsx`
**~600+ linjer** — Interaktiv showcase af alle 66 UI-komponenter med:
- Alle interaktions-states
- Accessibility-demonstrationer
- Dark dropdown
- Komponent-gruppering efter wave

### 3.5 Color Guide (`/color-guide`) — `app/color-guide/page.tsx` + `app/color-guide/chart-data.ts`
**~700+ linjer** — Visual farve-reference med:
- 30 sektioner
- ~155 design tokens
- ~310 design-beslutninger
- 65 chart farve-illustrationer
- Warm dark mode preview
- Neutral-skala, zone-farver, signal-farver, nutrient-farver

### 3.6 Icon Demo (`/icon-demo`) — `app/icon-demo/page.tsx`
**~315 linjer** — Ikon-katalog med:
- Alle 126 line-ikoner
- Variant-sammenligning (line/solid/duo)
- Størrelses-sammenligning (16/20/24px)
- Click-to-copy
- Animated ikoner showcase

### 3.7 Icon Catalog (`/icon-catalog`) — `app/icon-catalog/page.tsx`
**1.020 linjer** — Komplet interaktivt ikon-katalog med:
- Søgning efter navn/tags
- Filtrering efter 19 kategorier
- Variant toggle (Line/Solid/Duo)
- Størrelses toggle (16/20/24)
- Farve-picker
- Detail-paneler for hvert ikon
- Context-aware, morph og reactive ikon-sektioner

### 3.8 Root Layout — `app/layout.tsx`
**39 linjer** — Satoshi font loading, DevCacheGuard, global CSS.

### 3.9 Global CSS — `app/globals.css`
**174 linjer** — Tailwind `@theme` directives med RAMTT color system, surfaces, text hierarchy, power/HR/CHO/kJ zones.

---

## 4. Chart-Primitiver

**Sti:** `components/charts/primitives/`
**Antal:** 28 komponenter + 2 hooks + 1 context + 1 RULES.md + 9 test-filer = 41 filer

### 4.1 Kerne-Primitiver (bygger alt)

| Komponent | Fil | Formål |
|-----------|-----|--------|
| **ChartRoot** | `ChartRoot.tsx` | SVG-container, auto-scaling, ChartContext provider |
| **ChartLine** | `ChartLine.tsx` | Polyline med hybrid downsampling (smoothDecimate) |
| **ChartArea** | `ChartArea.tsx` | Gradient-filled area under en linje |
| **ChartBar** | `ChartBar.tsx` | Vertikal bar chart med optional zone-farver |
| **ChartAxisX** | `ChartAxisX.tsx` | X-akse med formatering (tid, dato, custom) |
| **ChartAxisY** | `ChartAxisY.tsx` | Y-akse med niceTicks, label |
| **ChartCrosshair** | `ChartCrosshair.tsx` | Zero-rerender hover via ref-based pub/sub |
| **ChartSyncProvider** | `ChartSyncProvider.tsx` | Context der synkroniserer zoom + hover |
| **ChartZoomHandler** | `ChartZoomHandler.tsx` | Scroll-zoom + brush + keyboard (piltaster, +/-, Home/End, Esc, F) |
| **ChartRefLine** | `ChartRefLine.tsx` | Horisontal stiplet reference-linje (FTP, threshold) |

### 4.2 Specialiserede Chart-Typer

| Komponent | Fil | Formål |
|-----------|-----|--------|
| **ChartScatter** | `ChartScatter.tsx` | Scatter plot (x,y punkter) |
| **ChartCandlestick** | `ChartCandlestick.tsx` | OHLC candlestick (aktier) |
| **ChartRadar** | `ChartRadar.tsx` | Radar/spider chart med web-grid |
| **ChartRadialBar** | `ChartRadialBar.tsx` | Radial bar (doughnut-stil ringer) |
| **ChartTreemap** | `ChartTreemap.tsx` | Treemap med nested rektangler |
| **ChartFunnel** | `ChartFunnel.tsx` | Funnel chart |
| **ChartBoxPlot** | `ChartBoxPlot.tsx` | Box plot (Q1, median, Q3, whiskers) |
| **ChartHeatmap** | `ChartHeatmap.tsx` | 2D heatmap grid med farve-interpolation |
| **ChartCalendarHeatmap** | `ChartCalendarHeatmap.tsx` | Kalender heatmap (GitHub-stil) |
| **ChartDonut** | `ChartDonut.tsx` | Donut/pie chart |

### 4.3 Interaktions-Lag

| Komponent | Fil | Formål |
|-----------|-----|--------|
| **ChartScrubber** | `ChartScrubber.tsx` | Mini-map med draggable viewport |
| **CrosshairTimeLabel** | `CrosshairTimeLabel.tsx` | Timestamp-pill på X-aksen |
| **BrushOverlay** | `BrushOverlay.tsx` | Semi-transparent brush overlay |
| **ChartTooltip** | `ChartTooltip.tsx` | Floating tooltip |
| **ChartAnnotation** | `ChartAnnotation.tsx` | Floating label med pointer |

### 4.4 Domain-Specifikke

| Komponent | Fil | Formål |
|-----------|-----|--------|
| **ChartZoneLine** | `ChartZoneLine.tsx` | SVG gradient zone-farver (power/HR zones) |
| **ChartIntervalMarkers** | `ChartIntervalMarkers.tsx` | Sprint/interval labels + shaded regioner |
| **ChartFuelLollipop** | `ChartFuelLollipop.tsx` | Diskrete fuel-intake events |

### 4.5 Hooks & Context

| Fil | Formål |
|-----|--------|
| `chart-context.ts` | React.createContext for ChartRoot data/scales |
| `useChartZoom.ts` | Zoom-state management hook |

### 4.6 Tests

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

---

## 5. Chart Math Layer

**Sti:** `lib/charts/`
**Princip:** Ren TypeScript, nul dependencies, nul React, nul DOM.

### 5.1 Scales — `lib/charts/scales/`

| Fil | Eksporter | Formål |
|-----|-----------|--------|
| `linear.ts` | `scaleLinear`, `LinearScale` | Lineær scale med .inverse(), .clamp(), .domain(), .range() |
| `__tests__/linear.test.ts` | Tests | Domain, range, inversion, clamping |

### 5.2 Paths — `lib/charts/paths/`

| Fil | Eksporter | Formål |
|-----|-----------|--------|
| `line.ts` | `linePath`, `Accessor` | SVG path d-streng for polylines + step-funktioner |
| `area.ts` | `areaPath` | Lukket area-path for gradient fills |
| `arc.ts` | `arcPath`, `pieLayout` | SVG arc path + pie/donut layout |
| `radar.ts` | `radarPoints`, `radarPath`, `radarGridPoints` | Radar/spider chart geometri |
| `radar.test.ts` | Tests | Radar path beregninger |
| `__tests__/` | Tests | Line, area, arc paths |

### 5.3 Ticks — `lib/charts/ticks/`

| Fil | Eksporter | Formål |
|-----|-----------|--------|
| `nice.ts` | `niceTicks`, `niceNum` | Menneske-venlige tick-værdier (1, 2, 2.5, 5 × 10^n) |
| `__tests__/nice.test.ts` | Tests | Tick range beregninger |

### 5.4 Utils — `lib/charts/utils/`

| Fil | Eksporter | Formål |
|-----|-----------|--------|
| `lttb.ts` | `lttb`, `Point` | Largest Triangle Three Buckets downsampling — O(n) |
| `smooth-decimate.ts` | `smoothDecimate` | Hybrid downsampling: even spacing + peak preservation |
| `extent.ts` | `extent`, `extentOf` | Min/max med optional padding |
| `bisect.ts` | `bisectNearest`, `bisectData` | O(log n) binær søgning for nærmeste punkt |
| `nearest2d.ts` | `nearest2d` | Nærmeste punkt i 2D-rum |
| `stack.ts` | `stackSeries` | Stack multiple serier (area, bar stacking) |
| `waterfall.ts` | `waterfallLayout`, `WaterfallItem`, `WaterfallBar` | Waterfall chart layout (running totals) |
| `treemap.ts` | `treemapLayout`, `TreemapItem`, `TreemapRect` | Squarified treemap layout algoritme |
| `colorInterpolate.ts` | `interpolateColor`, `hexToRgb`, `rgbToHex` | RGB farve-interpolation |
| `colorScale.ts` | `interpolateColorScale`, `parseHexColor`, `isLightColor` | Værdi-baseret farve-interpolation (heatmaps) |
| `colorInterpolate.test.ts` | Tests | Farve-interpolation |
| `colorScale.test.ts` | Tests | Farve-skala |
| `__tests__/` | Tests | lttb, extent, bisect, nearest2d, stack, treemap, smooth-decimate, waterfall |

### 5.5 Komplet Test-Oversigt (15 math test-filer)

| Test-fil | Dækker |
|----------|--------|
| `scales/__tests__/linear.test.ts` | Linear scale domain/range/inversion/clamping |
| `paths/__tests__/line.test.ts` | Line path generation |
| `paths/__tests__/area.test.ts` | Area path generation |
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
| `utils/colorInterpolate.test.ts` | RGB interpolation |
| `utils/colorScale.test.ts` | Value-based color scale |

### 5.6 Barrel Export — `lib/charts/index.ts`
Re-eksporterer alle scales, paths, ticks og utils.

---

## 6. UI-Komponenter

**Sti:** `components/ui/`
**Antal:** 66 komponenter + index.ts + tokens.css + RULES.md + README.md + ramtt-logo.tsx

Bygget i 9 waves (1, 2, 3, 4, 5, 6, 7A, 7B, 7C, 8A).

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
| 51 | `ColorDot` | Lille farve-swatch (6/8/10px) |
| 52 | `StatusIndicator` | Status badge (success/warning/error) |
| 53 | `SegmentedBar` | Horisontal segmenteret progress bar |
| 54 | `NumberStepper` | +/- buttons med number input |

### Wave 7B — Input Patterns (3 stk)

| # | Komponent | Formål |
|---|-----------|--------|
| 55 | `RatingInput` | Stjerne-rating input |
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

### Understøttende Filer

| Fil | Formål |
|-----|--------|
| `index.ts` | Public API barrel export af alle 66 komponenter + design system constants |
| `tokens.css` | Font loading + CSS variable definitions (~400 linjer) |
| `RULES.md` | Non-negotiable system regler for komponent-bygning |
| `README.md` | Komponent-library oversigt |
| `ramtt-logo.tsx` | RAMTT wordmark logo komponent |

---

## 7. Ikon-System

**Sti:** `components/icons/`
**Total:** 439 ikon-komponenter på tværs af 7 variant-typer

### 7.1 Base-Filer

| Fil | Formål |
|-----|--------|
| `IconBase.tsx` | Base wrapper for line-ikoner (24px, strokeWidth 1.5) |
| `IconBaseSolid.tsx` | Base wrapper for solid-ikoner (filled, no stroke) |
| `IconBaseDuo.tsx` | Base wrapper for duo-tone-ikoner (accent color parameter) |
| `types.ts` | Delte TypeScript-typer for ikon-props |
| `catalog.ts` | Metadata-katalog for alle ikoner (kategorier, tags) |
| `index.ts` | Barrel export af alle ikon-varianter |

### 7.2 Line-Ikoner (126 stk) — `components/icons/line/`

Standard outline-ikoner, 24px, strokeWidth 1.5px. Default variant.

**Kategorier:**
| Kategori | Ikoner |
|----------|--------|
| **Navigation** (5) | Today, Calendar, Analytics, Fuel, Settings |
| **Actions** (13) | Plus, Close, Search, Filter, Edit, Trash, Copy, Download, Upload, Expand, Collapse, MoreHorizontal, Grip |
| **Arrows** (6) | ChevronLeft, ChevronRight, ChevronDown, ChevronUp, ArrowLeft, ArrowRight |
| **Status** (4) | Check, AlertTriangle, Info, AlertCircle |
| **Communication** (8) | Mail, Send, MessageCircle, MessageSquare, Phone, Video, Share, Link |
| **Media** (6) | Image, Camera, Play, Pause, Volume, Mic |
| **Files** (6) | File, FileText, Folder, FolderOpen, Clipboard, Archive |
| **Users** (5) | User, Users, UserPlus, UserMinus, UserCheck |
| **Layout** (6) | Grid, List, Columns, Rows, PanelLeft, PanelRight |
| **Data** (8) | BarChart, LineChart, PieChart, TrendingUp, TrendingDown, Database, Table, Hash |
| **Devices** (4) | Smartphone, Laptop, Watch, Bluetooth |
| **Weather** (4) | Sun, Cloud, Thermometer, Droplet |
| **Commerce** (4) | CreditCard, ShoppingCart, Receipt, PriceTag |
| **Toggle/State** (7) | Eye, EyeOff, Lock, Unlock, Star, StarFilled, Bookmark |
| **Misc** (8) | Globe, Map, MapPin, Clock, Timer, Refresh, ExternalLink, QrCode |
| **Sport/Domain** (8) | Power, HeartRate, Cadence, Speed, Elevation, Gel, Glycogen, Gut |
| **Training** (8) | Interval, Zone, Threshold, Durability, Resilience, PeakCurve, TrainingLoad, Recovery |
| **Nutrition** (8) | CHO, Protein, Fat, Hydration, Sodium, Caffeine, Meal, Supplements |
| **Body/Wellness** (8) | Sleep, Muscle, Brain, Lungs, Stomach, Weight, HRV, Stress |

### 7.3 Solid-Ikoner (126 stk) — `components/icons/solid/`
Filled versioner af alle 126 line-ikoner. Brugt til aktive states (sidebar).

### 7.4 Duo-Tone-Ikoner (126 stk) — `components/icons/duo/`
To-tone versioner med accent-farve parameter. Alle 126 ikoner.

### 7.5 Animated Ikoner (8 stk) — `components/icons/animated/`

| Ikon | Formål |
|------|--------|
| `IconSpinnerRAMTT` | Loading spinner |
| `IconLoadingDots` | Pulserende dots |
| `IconCheckAnimated` | Animated checkmark |
| `IconUploadAnimated` | Upload-animation |
| `IconPulseHeart` | Pulserende hjerte |
| `IconSyncRotate` | Roterende sync-ikon |
| `IconTypingDots` | Typing-indicator |
| `IconWaveform` | Animeret waveform |

### 7.6 Context-Aware Ikoner (12 stk) — `components/icons/context/`
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

**Understøttende:** `thresholds.ts` — Threshold-konfiguration for data-drevne ikoner.

### 7.7 Morph-Ikoner (11 stk) — `components/icons/morph/`
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

**Understøttende:** `MorphBase.tsx` — Base-komponent for CSS path morphing.

### 7.8 Reactive Ikoner (30 stk) — `components/icons/reactive/`
CSS-only hover micro-animationer.

| Ikon | Hover-effekt |
|------|-------------|
| `IconReactiveAlertCircle` | Pulse |
| `IconReactiveAlertTriangle` | Shake |
| `IconReactiveArrowLeft` | Slide left |
| `IconReactiveArrowRight` | Slide right |
| `IconReactiveBell` | Swing |
| `IconReactiveBookmark` | Fill |
| `IconReactiveChevronDown` | Bounce down |
| `IconReactiveChevronUp` | Bounce up |
| `IconReactiveCopy` | Offset-duplicate |
| `IconReactiveCreditCard` | Flip |
| `IconReactiveDownload` | Drop |
| `IconReactiveEdit` | Wiggle |
| `IconReactiveExpand` | Scale out |
| `IconReactiveExternalLink` | Launch |
| `IconReactiveEye` | Blink |
| `IconReactiveFile` | Fold |
| `IconReactiveHeart` | Beat |
| `IconReactiveImage` | Zoom |
| `IconReactiveLink` | Rotate |
| `IconReactiveLock` | Jiggle |
| `IconReactiveMail` | Open |
| `IconReactiveMic` | Pulse |
| `IconReactiveNotification` | Pop |
| `IconReactiveRefresh` | Spin |
| `IconReactiveSearch` | Magnify |
| `IconReactiveSend` | Launch |
| `IconReactiveSettings` | Rotate |
| `IconReactiveStar` | Twinkle |
| `IconReactiveTrash` | Shake |
| `IconReactiveUpload` | Rise |

**Understøttende:** `ReactiveBase.tsx` + `reactions.css` — Base-komponent + CSS animationer.

### 7.9 Samlet Ikon-Tælling

| Variant | Antal |
|---------|-------|
| Line | 126 |
| Solid | 126 |
| Duo | 126 |
| Animated | 8 |
| Context-Aware | 12 |
| Morph | 11 |
| Reactive | 30 |
| **Total** | **439** |

---

## 8. Design System Foundation

### 8.1 Master Constants — `lib/ui.ts` (~283 linjer)

**Eksporterer:**
- `cn()` — `twMerge(clsx(...))`
- `WEIGHT` — 400 (normal), 450 (book), 500 (medium), 550 (strong)
- `FONT` — sans (Satoshi), label (Satoshi), serif (Cormorant Garamond), mono (JetBrains Mono)
- `RADIUS` — 4px (sm), 5px (md), 12px (lg), 16px (xl)
- `BORDER` — 0.5px, subtle (--n200), default (--n400)
- `SIZE_*` — Predefinerede størrelser
- `TRANSITION` — 150ms, specifikke properties
- `HOVER_SAND` — Hover-state (--n200)
- `ACTIVE_SAND` — Active-state (--n400)
- `ACTIVE_BLACK` — Primary CTA (--n1150)
- `SELECTION_SAND` — Brush overlay (--n400/35%)
- Format-funktioner for tal, enheder, tider

### 8.2 Color Constants — `lib/constants/colors.ts` (~156 linjer)

**Zone-farver:**
- `POWER_ZONES` — 6 niveauer (Z1-Z6)
- `HR_ZONES` — 6 niveauer
- `CHO_ZONES` — 6 niveauer
- `KJ_ZONES` — 6 niveauer

**Signal-farver:**
- Power, HR, Cadence, Speed, Altitude, Temperature, CHO, Fluid

**Andre:**
- `NUTRIENT_COLORS` — Farver for ernærings-kategorier
- `COMPARISON_COLORS` — Farver for sammenligning
- `DOT_COLORS` — Palette for dots/indicators

### 8.3 CSS Tokens — `components/ui/tokens.css` (~400 linjer)
Font loading + CSS variable definitions:
- Neutral-skala (8 stops)
- Typografi-variabler
- Spacing-variabler
- Surface-farver

### 8.4 Global Theme — `app/globals.css` (174 linjer)
Tailwind `@theme` directives:
- Neutral-skala: --bg (#FAF9F5), --n50, --n200, --n400, --n600, --n800, --n1050, --n1150
- Zone-farver: Power (6), HR (6), CHO (6), kJ (6)
- Signal-linjer: Power, HR, Cadence, Speed, Altitude, Temperature
- UI Chrome: Accent (#4A044E), Danger, Warning, Success, Info

### 8.5 Shared Types — `types/ui.ts`
`Size`, `SemanticColor`, `BaseComponentProps`, `InteractiveProps`, `LabelledProps`, `ColoredProps`

---

## 9. Data & Parsers

### 9.1 FIT File Parser — `lib/fit-parser.ts` (~150 linjer)
Konverterer Garmin .fit binær-filer til `FitData` shape:
- Power (W)
- Heart rate (bpm)
- Cadence (rpm)
- Speed (km/h)
- Altitude (m)
- Temperature (°C)
- Distance (km)
- Timestamps
- `lengthUnit: 'km'` konverterer alle længder

### 9.2 Demo Data Generators — `app/demo/generate-data.ts` (~500 linjer)
24+ funktioner til syntetisk data:
- Stock prices (random walk)
- Revenue/costs (seasonal)
- Server temperature (sinusoidal + noise)
- IoT sensor readings (multi-kanal)
- Scatter data
- Candlestick OHLC
- Waterfall data
- Radar data
- Treemap data
- Heatmap data
- Calendar heatmap data
- Osv.

### 9.3 Color Guide Data — `app/color-guide/chart-data.ts` (~200 linjer)
Specialiserede chart-data til farve-guide visualiseringer.

### 9.4 Sample FIT Files
- `FIT_FILES/i133046028_MIT_with_spikes (1).fit` — Rigtig Garmin-session
- `public/fit-data/mit-with-spikes.json` — Pre-parsed JSON-version

### 9.5 Andre Utilities
- `lib/utils.ts` — Generelle hjælpe-funktioner
- `lib/calendar-utils.ts` — Kalender dato-manipulation

---

## 10. Scripts & Tooling

**Sti:** `scripts/`

| Script | Kommando | Formål |
|--------|----------|--------|
| `audit.ts` | `npm run audit` | Unified RAMTT audit — scanner UI, charts, math, sider |
| `audit-ui.ts` | `npm run audit:ui` | Specialiseret UI-komponent audit (fonts, borders, transitions, WEIGHT) |
| `audit-charts.ts` | `npm run audit:charts` | Chart primitiv + math layer audit (dependencies, exports, pure functions) |
| `audit-icons.ts` | `npm run audit:icons` | Ikon-system audit (variant dækning, export consistency) |
| `add-copyright-headers.ts` | Manuel | Tilføjer RAMTT copyright headers til source-filer |

**NPM Scripts (package.json):**
```bash
npm run dev              # Next.js dev server, port 5000 (rydder .next cache)
npm run build            # Production build
npm run lint             # ESLint
npm run audit            # Unified audit
npm run audit:ui         # UI-specifik audit
npm run audit:charts     # Chart-specifik audit
npm run audit:icons      # Ikon-specifik audit
npm run build:charts     # Build @ramtt/charts (tsup)
npm run build:ui         # Build @ramtt/ui (tsup)
npm run build:packages   # Build begge pakker
```

---

## 11. NPM Packages

### 11.1 @ramtt/charts — `packages/charts/`

| Fil | Formål |
|-----|--------|
| `package.json` | name: "@ramtt/charts", version 0.1.0 |
| `tsconfig.json` | TypeScript config |
| `tsup.config.ts` | Build config (tsup) |
| `dist/` | Built output (index.js, index.cjs, index.d.ts, math/) |
| `README.md` | Pakke-dokumentation |

**Source entrypoints:**
- `src/index.ts` — Re-eksporterer chart-primitiver
- `src/math/index.ts` — Re-eksporterer math layer

**Exports:**
- `@ramtt/charts` — Alle chart-primitiver
- `@ramtt/charts/math` — Ren math layer (scales, paths, ticks, utils)

**Built artifacts (`dist/`):**
- `index.js` + `index.cjs` + `index.d.ts` + `index.d.cts` — Hoved-bundle
- `math/index.js` + `math/index.cjs` + `math/index.d.ts` + `math/index.d.cts` — Math entrypoint
- `chunk-EMFDHMPR.js` — Shared chunk
- Source maps (`.map`) for alle

### 11.2 @ramtt/ui — `packages/ui/`

| Fil | Formål |
|-----|--------|
| `package.json` | name: "@ramtt/ui", version 0.1.0 |
| `tsconfig.json` | TypeScript config |
| `tsup.config.ts` | Build config (tsup) |
| `src/index.ts` | Source entrypoint — re-eksporterer UI komponenter |
| `dist/` | Built output |
| `README.md` | Pakke-dokumentation |

**Built artifacts (`dist/`):**
- `index.js` + `index.cjs` + `index.d.ts` + `index.d.cts` — Hoved-bundle
- Source maps (`.map`) for alle

**Exports:**
- `@ramtt/ui` — Alle 66 UI-komponenter + design system constants
- `@ramtt/ui/tokens.css` — CSS tokens

---

## 12. Dokumentation

**Sti:** `docs/`

| Fil | Formål | Omfang |
|-----|--------|--------|
| `RAMTT-CHARTS-SYSTEM-REFERENCE.md` | Komplet chart system dokumentation | ~1200 linjer |
| `RAMTT-UI-COMPONENT-SYSTEM-BRIEF-v2.md` | UI komponent system oversigt | ~1000 linjer |
| `RAMTT-UI-STATUS.md` | Komponent status matrix | ~250 linjer |
| `RAMTT-UI-POLISH-PASS.md` | Polish forbedringer (animationer, accessibility) | ~280 linjer |
| `RAMTT-CHARTS-DEVELOPMENT-LOG.md` | Historisk udviklings-noter | ~300 linjer |
| `color-system-v2.md` | Farve-system design rationale | ~250 linjer |
| `AUDIT-GUIDE.md` | Instruktioner til system audits | ~150 linjer |
| `AUDIT-UI-GUIDE.md` | Detaljeret UI audit guide | ~200 linjer |
| `CLAUDE-CODE-PROMPT-CHARTS-DEMO.md` | Claude Code prompt til chart demo | ~80 linjer |
| `RAMTT-CHARTS-GENERIC-DEMO-BRIEF (1).md` | Demo-side implementerings-guide | ~200 linjer |
| `ramtt-4-font-system.html` | Interaktiv font-system reference | ~40KB |
| `ramtt-type-system-v3 (1).html` | Interaktiv typografi-system | ~50KB |

**Subdirectories:**
| Dir | Indhold |
|-----|---------|
| `competitive-analysis/` | `claude_look.md`, `figma_look.md`, `linear_look.md`, `perplexity_look.md` |
| `fonts/` | `Cormorant_Garamond/`, `Instrument_Sans (1)/`, `Satoshi_Complete/`, `SpaceGrotesk_Complete/` |

**Root-level docs:**
| Fil | Formål |
|-----|--------|
| `README.md` | Projekt-oversigt + arkitektur (269 linjer) |
| `LICENSE-MIT` | MIT-licens |
| `LICENSE-APACHE` | Apache 2.0-licens |
| `NOTICE` | Copyright/trademark notice |
| `ramtt-chart-deep-technical-plan.md` | Dyb teknisk plan for chart-systemet |
| `ramtt-chart-system-vision (2).md` | Vision-dokument for chart-systemet |
| `ramtt-chart-v2 (1).jsx` | Tidlig prototype JSX |

---

## 13. Assets & Fonts

### 13.1 Web Fonts — `public/fonts/`

| Font | Filer | Brug |
|------|-------|------|
| **Satoshi** | Variable.woff2, VariableItalic.woff2 | Body, labels, UI (--font-sans) |
| **Cormorant Garamond** | VariableFont_wght.ttf, Italic-VariableFont_wght.ttf | Editorial headings kun (--font-serif) |
| **Space Grotesk** | Variable.ttf, .woff, .woff2 | (Tilgængelig men ikke primær) |
| **Instrument Sans** | VariableFont.ttf, Italic-VariableFont.ttf | (Legacy, erstattet af Satoshi) |
| **JetBrains Mono** | VariableFont_wght.ttf, Italic-VariableFont_wght.ttf | Monospace tal/kode |

### 13.2 FIT Data — `public/fit-data/`
- `mit-with-spikes.json` — Pre-parsed session data til demo

---

## 14. Backups

**Sti:** `backups/`

| Fil | Dato | Formål |
|-----|------|--------|
| `chart-test-page-2026-04-07-pre-ramtt-ui.tsx` | 7. apr 2026 | Før @ramtt/ui refactor (~67KB) |
| `page-2026-04-05-v2.tsx` | 5. apr 2026 | Tidligere version (~65KB) |
| `page-2026-04-05.tsx` | 5. apr 2026 | Endnu tidligere version (~31KB) |
| `app/chart-test/page.backup.txt` | — | Inline backup af chart-test side |

---

## 15. Konfiguration

| Fil | Formål |
|-----|--------|
| `package.json` | Monorepo root, scripts, dependencies |
| `package-lock.json` | Lockfile for dependencies (~131KB) |
| `tsconfig.json` | TypeScript: ES2017, strict, paths (@/* → .) |
| `tsconfig.tsbuildinfo` | TypeScript incremental build cache (~268KB) |
| `next.config.ts` | Next.js: Turbopack, dev cache headers (no-store) |
| `next-env.d.ts` | Next.js TypeScript type declarations (auto-generated) |
| `postcss.config.mjs` | PostCSS for Tailwind CSS 4 |
| `.gitignore` | node_modules, .next, .DS_Store |
| `.vercel/project.json` | Vercel deployment konfiguration |
| `.vercel/README.txt` | Vercel CLI info |

### Claude Code Config — `.claude/`
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

**98 commits** fra 2026-04-05 til 2026-04-13 (8 dage).

### Kronologisk Udvikling

| Fase | Commits | Periode | Indhold |
|------|---------|---------|---------|
| **Dag 1** | ~5 | 5. apr | Initial SVG chart system, 5 stacked charts, synced crosshair + zoom |
| **Dag 2-3** | ~15 | 5-7. apr | FIT upload, zone metrics, scores, fueling, CHO, session data |
| **Dag 3-4** | ~10 | 7-8. apr | Torque kanal, overlay mode (bygget → revert), brush overlay |
| **Dag 4-5** | ~8 | 8. apr | Peak powers, chart toggles, fullscreen, kJ/min |
| **Dag 5-6** | ~10 | 8-9. apr | Y-akse iterationer (3 tilgange → revert), chart heights, color system |
| **Dag 6-7** | ~15 | 9-10. apr | @ramtt/ui Wave 1 (12 komp), farve-guide, system reference docs |
| **Dag 7** | ~15 | 10. apr | @ramtt/ui Wave 2-6 (38 komp), demo 20 charts, audit scripts |
| **Dag 8** | ~20 | 13. apr | @ramtt/ui Wave 7-8 (16 komp), @ramtt/icons 439 ikoner (Wave 9A-9F) |

### Vigtige Milestones

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

---

## 17. Arkitektur-Mønstre

### 17.1 Chart Interaktions-Arkitektur
```
Hover (zero re-renders — ref-based pub/sub):
  mousemove → rAF → bisectNearest → setAttribute()
    → sync.broadcastHover(index)
      → alle crosshairs, data tabel, time pill updater via refs

Zoom (React state — sjælden re-render):
  wheel/keyboard → setZoom({ start, end })
    → charts re-renderer med sliced data arrays

Brush (document-level drag):
  pointerdown → pointercancel handler → pointermove
    → BrushOverlay spænder over alle charts
    → pointerup → zoom til valgt interval
```

### 17.2 Komponent-System
- **Compound components:** Card (Header/Title/Action/Body), ToggleGroup, DataTable
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

### 17.4 Designprincipper
- **Warm palette:** Aldrig kolde sort-farver, altid warm neutrals
- **Sand interaktion:** Hover → sand-200, Active → sand-400, CTA → black
- **Specifik transition:** Aldrig `transition-all`, altid navngivne properties
- **Font-hierarki:** Satoshi body/UI, Cormorant Garamond kun editorial, JetBrains Mono kun tal
- **0.5px borders:** Altid 0.5px, to niveauer (subtle + default)

---

## 18. Samlet Statistik

| Metrik | Antal |
|--------|-------|
| **Git commits** | 98 |
| **Udviklings-dage** | 8 (5-13. apr 2026) |
| **Totale filer (ekskl. node_modules/.next/.git)** | 850 (+ 21 .DS_Store) |
| **Source-filer (.ts/.tsx/.css)** | 636 |
| **Font-arkiv filer (docs/fonts/)** | 138 |
| **Package dist-filer** | 20 |
| **Linjer kode** | ~50.700 |
| **Sider/Routes** | 7 synlige + 2 support |
| **Chart-primitiver** | 28 komponenter |
| **Chart math utilities** | 15 moduler |
| **Chart tests** | 9+ test-filer |
| **UI-komponenter** | 66 |
| **UI waves** | 9 (Wave 1–8A) |
| **Ikon-varianter** | 439 (126×3 + 8 + 12 + 11 + 30) |
| **Ikon-kategorier** | 19 |
| **Design tokens** | ~155 |
| **Color zones** | 24 (6×4 zone-typer) |
| **Audit scripts** | 5 |
| **Dokumentations-filer** | 14+ |
| **NPM packages** | 2 (@ramtt/charts, @ramtt/ui) |
| **Web fonts** | 5 familier (11 filer) |
| **Test-filer** | 25 (9 chart primitiv + 16 math layer) |
| **Backup-filer** | 3 |
| **Dependencies (runtime)** | 11 |
| **Dependencies (dev)** | 2 |

### Komponent-Total

| Type | Antal |
|------|-------|
| Chart-primitiver | 28 |
| UI-komponenter | 66 |
| Ikoner (alle varianter) | 439 |
| Dev-komponenter | 1 |
| **Total React-komponenter** | **534** |

---

*Genereret 2026-04-13 af Claude Code — komplet audit af ramtt-charts monorepo.*
