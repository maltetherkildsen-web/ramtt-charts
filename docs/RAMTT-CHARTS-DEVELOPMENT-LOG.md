# RAMTT Charts — Development Log

> Intern dokumentation af hele chart-systemets udvikling, arkitektur, og nuværende status.
> Sidst opdateret: april 2026

---

## Hvad er ramtt-charts?

Et komplet, skræddersyet SVG chart-system bygget fra bunden til RAMTT sports-platformen. Nul afhængigheder af Recharts, D3, Chart.js eller lignende — alt er custom: matematik, rendering, interaktioner.

Systemet driver session-analyse for udholdenhedsatleter: cykling, løb, triathlon. Det visualiserer power, puls, hastighed, kadence, elevation og kulhydratindtag i synkroniserede, stakkede charts med 60fps hover-interaktioner.

**Tech stack:** Next.js 16 + React + TypeScript + Tailwind CSS v4 + Framer Motion + Pure SVG

**Repository:** github.com/maltetherkildsen-web/ramtt-charts

---

## Udviklings-tidslinje

### Fase 1: Grundlæggende chart-primitiver
Startede med de mest basale byggeklodser:

- `ChartRoot` — SVG container med auto-skalering via ResizeObserver, kontekst-provider til child-komponenter
- `ChartLine` — polyline path generator med hybrid downsampling (smoothDecimate)
- `ChartArea` — gradient-fyldt area under linjen
- `ChartAxisY` / `ChartAxisX` — akse-labels med "nice ticks" algoritme
- `ChartRefLine` — horisontale reference-linjer (CP, LT2)
- `scaleLinear` — custom lineær skalafunktion med `.inverse()` og `.clamp()`
- `linePath` / `areaPath` — SVG path `d` string generatorer
- `niceTicks` — human-friendly tick-værdier (1, 2, 2.5, 5 × 10^n)
- `bisectNearest` — O(log n) binær søgning for hover-tracking

### Fase 2: Synkroniserede stakkede charts
Det der gør systemet unikt — 5 charts der opfører sig som ét:

- `ChartSyncProvider` — pub/sub system via refs (IKKE React state) for hover-synkronisering. Zero re-renders.
- `ChartCrosshair` — hover-tracking med `requestAnimationFrame` + `setAttribute()`. Aldrig React state.
- Hover-flow: `mousemove → rAF → bisectNearest → setAttribute → broadcastHover → alle charts opdaterer`
- Zoom via React state (sjældne opdateringer) — data slices med `useMemo`
- Brush-selection: klik+træk for at zoome ind på et interval

### Fase 3: Downsampling og data-kvalitet
Rå FIT-data har ~5000+ punkter. For mange til at rendere direkte.

- `smoothDecimate` — hybrid downsampling: jævn fordeling + peak preservation. Bedre end ren LTTB for sportsdata.
- `lttb` — Largest Triangle Three Buckets som fallback
- HR smoothing — zoom-adaptiv rolling average (vindue 1/3/5) fjerner integer-step trappetrin fra hele-bpm sensor-data
- Elevation smoothing — GPS altitude-støj dæmpes med samme teknik

### Fase 4: Hover Data Table (Perplexity-stil)
Inspireret af Perplexity Finance's watchlist-side:

- Floating tooltip FJERNET — blokerede altid data i stakkede charts
- Erstattet med en data-tabel UNDER charts med én række per metric
- Ref-baseret: alle opdateringer via `textContent` og `style` — zero React re-renders på hover
- Viser live point-data under hover, selection averages når zoomet ind, session averages som default
- Crosshair time pill på X-aksen — positioneret via CSS `transform`
- Toggle-aware: rækker forsvinder når man slår et chart fra

### Fase 5: Session Analysis Page
Fuld session-analyse side med charts-first layout:

- **SessionHeader** — titel, dato, device, effort/quality/legs scores
- **Three-tier metrics system:**
  - Tier 1: Key stats (Duration, Avg Power, NP, HR, Distance, Elevation, Energy)
  - Tier 2: RAMTT metrics (CHO Intake, CHO Rate, Fuel Score, Decoupling)
  - Tier 3: Session context (collapsible, placeholder for platform-data)
- **Chart toggles** — per-chart visibility + zone mode (Off/Power/HR)
- **Zone-colored lines** — `ChartZoneLine` med dynamisk SVG `linearGradient` der skifter farve per training zone
- **Interval markers** — sprint/work labels over chart-area

### Fase 6: Fuel/CHO system
Interaktivt kulhydrat-tracking:

- **Mock fuel data** — 4 gel-intakes (15:00, 30:00, 45:00, 65:00 = 192g af 200g target)
- **Lollipop chart** (`ChartFuelLollipop`) — stems + cirkler ved hvert intake, kumulativ stepped area fill
- **Fuel Log** — add/remove intake-kort med orange accent border. Tilføj via inline form.
- **Live chart-opdatering** — tilføj et intake → chart + metrics opdateres øjeblikkeligt
- **Smart label collision** — gram-labels skjules når dots er for tæt
- **Computed metrics** — CHO rate (g/h), fuel score, compliance %, CHO zone

### Fase 7: Fullscreen Mode
Analyse-mode til deep-dive:

- Fixed overlay der fylder hele viewport (F-tast eller knap)
- **Data sidebar** — live hover-værdier i højre panel (16px font, farvede dots)
- Proportionelle chart-højder: Power 35%, HR 20%, Speed/Cadence 15%, Elevation/Fuel 10%
- Toggle-aware — sidebar viser kun metrics for synlige charts
- Alle interaktioner virker: zoom, pan, brush, crosshair, keyboard

### Fase 8: Navigation og interaktion
- **Scroll zoom** — musehjul centreret på cursor-position
- **Pan** — trackpad horizontal scroll, shift+scroll med fractional accumulator
- **Keyboard** — piltaster panner (5% per tryk), +/- zoomer, Home/End springer, Esc nulstiller
- **Brush selection** — klik+træk for at zoome ind
- **Double-click** — reset zoom
- Zoom-stuck bug fix — `Math.round()` afrunding kunne fastlåse zoom ved max-in

### Fase 9: CRISP Rendering + Framer Motion
Polish-pass for premium kvalitet:

- **Antialiased SVG tekst** — `-webkit-font-smoothing: antialiased` + `font-kerning`
- **`geometricPrecision`** — smooth anti-aliased kurver på data-paths
- **`crispEdges`** — pixel-aligned crosshair og ref-linjer
- **`tabular-nums`** — Y-akse tal aligner vertikalt
- **`contain: paint`** — chart repaints isoleret fra resten af siden
- **`contentVisibility: auto`** — below-fold sektioner springes over til synlige
- **Framer Motion** — fullscreen fade (scale 0.98), chart toggle height+opacity animation
- **`MotionConfig reducedMotion="user"`** — respekterer OS-præference
- **Easing curves** — `ease-out-expo`, `ease-in-expo`, `ease-spring` som CSS custom properties

---

## Arkitektur-beslutninger

### Hvorfor zero dependencies?
- Recharts/D3 er designet til generelle charts, ikke stakkede sportsdata
- Vi har brug for 60fps hover på 5+ charts samtidigt — ingen chart-lib kan det
- Fuld kontrol over SVG output, downsampling, og interaktioner
- Bundle size: < 12 KB for hele math-laget

### Hvorfor ref-baseret hover?
- React re-renders er ~16ms — for langsomt til 60fps mousemove
- `setAttribute()` er ~0.01ms — 1000x hurtigere
- Pub/sub via `Set<callback>` i `useRef` — ingen React state-opdatering
- Hover-data (textContent, style) opdateres direkte på DOM-elementer

### Hvorfor smoothDecimate i stedet for LTTB?
- LTTB bevarer form men kan miste peaks
- smoothDecimate: jævn fordeling + min/max peak preservation per bucket
- Resultat: smooth kurver MED bevarede power-spikes og HR-toppe
- Target: `chartWidth * 0.3` datapunkter (~240 ved 800px bredde)

### Hvorfor separate zoom og hover systemer?
- Hover: 60fps, ref-based, zero re-renders → pub/sub
- Zoom: sjælden (1-2 gange per sekund), påvirker data-slicing → React state
- Blanding af de to ville skabe stale closures og race conditions

---

## Computed Metrics (fra FIT-data alene)

| Metric | Beregning |
|--------|-----------|
| Normalized Power (NP) | 30s rolling avg → 4th power avg → 4th root |
| Variability Index (VI) | NP / Avg Power |
| Decoupling | (EF_first_half - EF_second_half) / EF_first_half × 100 |
| Energy | Sum(power) / 1000 = kJ, × 0.239 = kcal |
| Peak Powers | Sliding window max for 5s/30s/1m/5m/10m/20m/1h |
| CHO Rate | Total CHO grams / session hours |
| Fuel Score | min(100, compliance × 0.92) |
| Distance | Sum(speed) / 3600 = km |
| Elevation Gain | Sum(positive altitude deltas) |

---

## Kendte gotchas

| Problem | Løsning |
|---------|---------|
| Turbopack viser gammel kode | `rm -rf .next && npm run dev` |
| `undefined` i spread overskriver defaults | Brug `condition ? objWithoutKey : { ...obj, key: val }` |
| NaN i SVG attributter | `isFinite()` guards i ChartAxisX, ChartAxisY, ChartRefLine |
| HR trappetrin ved zoom | Rolling average med zoom-adaptivt vindue (1/3/5) |
| Zoom stuck ved max-in | Tving mindst 1 punkt fremgang: `if (newRange >= range) newRange = range - 1` |
| Stale closure i keyboard pan | Læs `sync.zoom` fresh i `setZoom(prev => ...)`, aldrig fra closure |

---

## Fil-struktur

```
components/charts/primitives/
  ChartRoot.tsx              — SVG container + context
  ChartLine.tsx              — Polyline med downsampling
  ChartArea.tsx              — Gradient area fill
  ChartBar.tsx               — Vertikal bar chart
  ChartCrosshair.tsx         — Ref-based hover tracking
  ChartAxisY.tsx             — Y-akse labels
  ChartAxisX.tsx             — X-akse labels
  ChartRefLine.tsx           — Reference linjer (CP, LT2)
  ChartZoneLine.tsx          — Zone-farvede linjer
  ChartZoomHandler.tsx       — Zoom + pan + brush + keyboard
  ChartSyncProvider.tsx      — Hover + zoom synkronisering
  ChartScrubber.tsx          — Minimap navigation
  ChartIntervalMarkers.tsx   — Sprint/interval markers
  ChartFuelLollipop.tsx      — Lollipop fuel chart
  ChartTooltip.tsx           — Floating tooltip (library)
  CrosshairTimeLabel.tsx     — Tid-pill på X-aksen
  chart-context.ts           — React context definition
  useChartZoom.ts            — Zoom/pan/keyboard hook

lib/charts/
  scales/linear.ts           — Lineær skala
  paths/line.ts              — Line path generator
  paths/area.ts              — Area path generator
  ticks/nice.ts              — Nice tick generator
  utils/bisect.ts            — Binær søgning
  utils/extent.ts            — Min/max
  utils/lttb.ts              — LTTB downsampling
  utils/smooth-decimate.ts   — Hybrid downsampling

app/chart-test/page.tsx      — Session analysis demo page
app/globals.css              — Tailwind theme + CRISP CSS
```

---

## Næste skridt

- [ ] Overlay chart mode (alle linjer i ét chart)
- [ ] Interval-statistik tab (gennemsnit per interval)
- [ ] Peaks tab (peak power kurve)
- [ ] Zones tab (tid-i-zone fordeling)
- [ ] Real FIT file parsing (i stedet for JSON)
- [ ] Integration med RAMTT backend (session context, training load)
- [ ] Planned workout overlay på scrubber
- [ ] Framer Motion zone badge transitions
- [ ] Touch/mobile support
- [ ] Export til billede/PDF

---

*Copyright (c) 2026 RAMTT*
