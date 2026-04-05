# RAMTT Chart System — Deep Technical Plan

**Forudsætning: dette dokument er ærligt. Det sugarcoater ikke. Det identificerer præcis hvad der skal til, hvad risiciene er, og hvor vi realistisk kan vinde.**

---

## Del 1: Hvad vi faktisk er oppe imod

### Recharts er en kolos

Recharts har 16,7 millioner ugentlige npm downloads (Snyk siger endda 14,8M). Det er 26.800 GitHub stars. Det er det library shadcn/ui har valgt som chart-fundament, hvilket betyder at det er default i stort set hele Next.js/Tailwind-økosystemet. shadcn/ui alene har 111K stars — når deres charts-side siger "Built using Recharts", er det en implicit anbefaling til millioner af udviklere.

Recharts 3.0 (released Q1 2026) har adresseret flere af de historiske problemer. De har fjernet react-smooth og recharts-scale dependencies, internaliseret alt. De har tilføjet custom component support (du kan nu wrappe chart-elementer i dine egne components). De har tilføjet useXAxisScale/useYAxisScale hooks der eksponerer scale-funktioner. De er ikke stået stille.

**Det er det vigtige at forstå: vi konkurrerer ikke med 2023-Recharts. Vi konkurrerer med et library der aktivt forbedrer sig og har massiv momentum.**

### Reelle, dokumenterede Recharts-problemer (fra GitHub issues)

Men Recharts har fundamentale arkitektoniske begrænsninger der IKKE er fixet i 3.0, og sandsynligvis aldrig vil blive det fordi de ville kræve en komplet rewrite:

**1. Hover re-render problem (Issue #281, #2862, #3401)**

Recharts' interne arkitektur kræver at hele chart-component-træet re-renderers ved tooltip/hover state changes. I version 2.x brugte de deep comparison i stedet for shallow comparison i deres PureRender, hvilket var ekstremt dyrt. 3.0 har forbedret dette med Redux Toolkit-baseret state management, men fundamentet er stadig React state → re-render → recalculate → repaint for hvert hover-event.

Perplexity's tilgang (som vi verificerede via DevTools): hover-tracking sker via en single mousemove listener der opdaterer crosshair/tooltip position via direkte DOM-manipulation eller minimal state. SVG paths re-renderes ALDRIG ved hover. Det er en arkitektonisk forskel der ikke kan patches ovenpå Recharts.

**2. Large dataset problem (Issue #1146, #1356, #1465)**

Med 10.000 datapunkter tager Recharts "several seconds" at rendere (deres egne issue-reporters). XAxis med default interval settings forårsager 4-5x render time fordi getTicksEnd kalder getStringSize som forcer layout reflow for HVERT tick.

Recharts har ALDRIG implementeret LTTB downsampling (Issue #1356 fra 2018, stadig åben). Deres officielle guidance er "Does your chart truly need to display all 50,000 data points?" — de anbefaler at udviklere manuelt reducer data. Det er en fair pointe for business dashboards, men for sports data er det utilstrækkeligt: en 2-timers cykeltur fra Garmin producerer 7.200 datapunkter (1 per sekund). Du kan ikke bare "vise færre" uden at miste intervaller, spikes, og fysiologiske events.

LTTB (Largest Triangle Three Buckets) er en veletableret algoritme fra Sveinn Steinarssons 2013 MSc thesis ved University of Iceland. Den reducerer datapunkter mens den bevarer den visuelle form — 7.200 punkter → 800 (skærmbredde) med nærmest identisk visuel output. Den bruges i Chart.js, D3fc, og finansielle chart-systemer. Det er en ~40-linje TypeScript-funktion. Det er trivielt at implementere. Og det er transformativt for performance.

**3. Bundle size (Issue #1417, #2174, #3697)**

Recharts 3.8.0 er ifølge Bundlephobia ~85KB minified+gzipped. Det inkluderer D3-submodules (d3-scale, d3-shape, d3-interpolate-path), clsx, es-toolkit, og interne utilities. For et chart der i virkeligheden er 3-5 SVG paths, en gradient, og noget tekst.

Recharts 3.0 internaliserede react-smooth og recharts-scale, hvilket fjernede to dependencies, men den faktiske bundle er stadig ~85KB fordi koden bare blev inkorporeret i stedet for importeret.

**4. Tailwind er et afterthought**

Recharts bruger inline styles internt. Du kan override farver via props (stroke, fill), men axis-styling, tooltip-positioning, grid-styling, og animation-timing er hardcoded internt. shadcn/ui's chart-wrapper løser noget af dette ved at tilføje Tailwind-kompatibel theming ovenpå (CSS custom properties for farver), men den underliggende rendering er stadig Recharts' inline styles.

Du kan IKKE skrive `<Line className="stroke-emerald-600 stroke-[1.5]" />` i Recharts. Du skriver `<Line stroke="#16a34a" strokeWidth={1.5} />`. Det virker, men det integrerer ikke med din Tailwind-baserede design system, dark mode, responsive breakpoints, eller custom themes.

### Visx: det rigtige sammenligningspunkt

Visx (Airbnb, 19K stars, ~650K downloads/uge) er tættere på hvad vi bygger. Airbnb's blog post fra 2020 er essentiel læsning: de identificerede præcis det problem vi ser.

De tegnede et diagram med to akser: "Ease of use" vs "Expressiveness." Recharts, Victory, Nivo er i "high ease, low expressiveness" hjørnet. D3 er i "low ease, high expressiveness" hjørnet. Visx placerer sig i "high expressiveness, medium ease" — men de indrømmede selv at "you'll end up building your own charting library" med visx.

Visx's problem: det er for lavniveau for de fleste. Du skal forstå D3-scales, SVG-koordinatsystemer, og path-generation for at bruge det. Det har ingen opinioned defaults. Ingen "her er et pænt line chart, copy-paste det." Docs'ene er sparse. Det er et toolkit for visualization engineers, ikke for React-udviklere der bare vil have et chart.

**Vores position er præcis i det ubesatte felt: visx's expressiveness + Recharts' ease of use + Tailwind-native styling + zero D3 dependency + domain-aware primitives.**

### Shopify Polaris Viz: en advarsel

Shopify byggede Polaris Viz til intern brug og open-sourcede det. Det er nu **decommissioned** (deres README siger: "We have decided to decommission the polaris-viz package due to the lack of external use"). Det er en vigtig lektie:

**Et domæne-specifikt chart-library UDEN bredere relevans dør.** Polaris Viz var designet til Shopify's e-commerce data. Det var for specifikt, for svært at customise til andre use cases, og for tæt koblet til Shopify's design system.

Vi skal undgå denne fælde. Vores sport/fitness domain pack skal være et LAG OVENPÅ et generelt nok chart-system. Core-laget skal være brugbart til enhver tidsserie-visualisering. Domain-laget skal være opt-in.

---

## Del 2: Hvor vi realistisk kan vinde

Vi kan ikke vinde på "vi er bedre end Recharts til alt." Det er 10 år og millioner af downloads. Vi kan vinde på specifikke, målbare dimensioner der betyder noget for en voksende del af markedet.

### Dimension 1: Performance (beviseligt, benchmarked)

**Target:** Publicér reproducerbare benchmarks der viser:
- Initial render: 2-5x hurtigere end Recharts på 5000+ datapunkter
- Hover latency: 60fps konsistent (vs. Recharts' 15-30fps på store datasets)
- Bundle parse time: 3-5x hurtigere (proportionalt med bundle size)

**Hvordan:**
- LTTB downsampling som default (auto, baseret på container-bredde)
- Ingen React re-renders ved hover (DOM manipulation via ref, ikke setState)
- Memoized path generation (SVG d-attributter beregnes én gang, cached)
- Ingen D3-import (custom scale-funktioner, ~200 bytes vs D3-scale's ~5KB)
- Tree-shakeable: du importerer kun det du bruger

**Kritisk:** Performance-claims uden benchmarks er værdiløse. Vi skal have en `/benchmarks` mappe i repo'et med reproducerbare tests, og en side på demo-siten der viser side-by-side rendering. Vi bruger Chrome DevTools Performance API og Lighthouse til at producere tal. Ikke påstande.

### Dimension 2: Bundle size (objektivt måleligt)

**Target:**
- Et komplet TimeSeriesChart (line + area + gradient + axes + tooltip + crosshair): < 12KB gzipped
- Core math-lag alene: < 3KB gzipped
- Sammenligning: Recharts' ækvivalent er ~85KB gzipped

**Hvordan:**
- Zero external dependencies. Alle scale-funktioner, path-generators, tick-generators er vores egne, optimeret til præcis det vi har brug for. Ingen D3, ingen lodash, ingen clsx (vi bruger Tailwind's cn() mønster).
- Tree-shaking: hver component er et separat export. Du betaler kun for det du bruger.
- Ingen animation library bundled (brugeren vælger: Framer Motion, CSS transitions, eller ingenting).

**Kritisk:** Publicér Bundlephobia-links og størrelses-badges i README fra dag ét. Gør det til en del af CI: PRs der øger bundle > 15KB total fails automatisk.

### Dimension 3: Tailwind-native DX

**Target:** Hvert SVG-element i chartet kan styles med Tailwind utilities via className.

```tsx
// Dette skal virke:
<ChartLine className="stroke-emerald-600 stroke-[1.5] dark:stroke-emerald-400" />
<ChartGrid className="stroke-zinc-100 dark:stroke-zinc-800" />
<ChartAxisY className="text-zinc-400 text-[10px] font-mono font-light" />
<ChartTooltip className="bg-white dark:bg-zinc-900 shadow-lg rounded-lg" />
```

**Ingen** inline styles. **Ingen** CSS-in-JS. **Ingen** theme-objekter. Bare Tailwind klasser.

Det lyder simpelt, men det er teknisk udfordrende for SVG-elementer. `<text>` i SVG bruger `fill` i stedet for `color`. `<path>` bruger `stroke` og `fill`. Tailwind's `text-*` klasser sætter `color`, ikke `fill`. Det kræver at vi enten:

a) Bruger Tailwind's `fill-*` og `stroke-*` utilities (som eksisterer men er mindre kendte)
b) Mapper Tailwind-klasser til SVG-attributter via en tynd abstraktions-layer
c) Dokumenterer SVG-specifik Tailwind-brug grundigt

Option (a) er renest. Tailwind v4 har `fill-*`, `stroke-*`, og `stroke-[width]` utilities. Vi bruger dem direkte. Det kræver at brugere lærer SVG-specifikke Tailwind utilities, men det er et par ekstra utility-klasser, ikke et nyt system.

For `<text>` elementer i SVG: Tailwind's font-relaterede utilities (`text-[10px]`, `font-mono`, `font-light`) virker via CSS inheritance i SVG. Men `text-zinc-400` sætter `color`, og SVG text bruger `fill`. Løsning: vi sætter `fill: currentColor` på alle SVG text-elementer internt, så Tailwind's `text-*` color utilities virker automatisk.

**Kritisk:** Dark mode skal virke out-of-the-box. `dark:stroke-emerald-400` på et chart-element SKAL opdatere korrekt. Det kræver at alle SVG-elementer respekterer Tailwind's dark mode variant, hvilket de gør naturligt når styling sker via className.

### Dimension 4: Domain-aware primitives (differentiering)

Det er det INGEN generisk chart-library tilbyder, og det er det der giver os en niche der kan vokse.

**Zone-farvede gradients:** En SVG `<linearGradient>` med dynamiske color stops beregnet fra datapunkterne og zone-definitionerne. Linjen skifter farve baseret på hvilken zone den passerer igennem. Det er 30-40 linjer kode, det ser spektakulært ud, og det er umuligt at gøre med Recharts uden at hacke deres internals.

**Annotation system:** Markers på tidslinjen for events (gel intake, interval start, lap marker, peak power). Ikke bare dots — customizable React components der renderes som SVG foreignObjects ved specifikke datapunkter. Det er et primitiv der er relevant for enhver tidsserie med events: financial trades, server incidents, deployment markers.

**Reference lines med semantik:** Ikke bare "horisontal linje ved Y=240." En reference line der ved den repræsenterer FTP, med auto-formatting, zone-band coloring, og tooltip-integration. Det er opt-in domain-awareness.

---

## Del 3: Hvad der faktisk skal bygges (scope + sequence)

### Iteration 0: Proof of concept (1-2 uger)

Byg ét chart. Et TimeSeriesChart der renderer power data fra en Garmin FIT-fil. Med:
- LTTB downsampling
- Smooth hover (60fps, no React re-renders)
- Gradient area fill
- One reference line (FTP)
- Y-axis, X-axis (JetBrains Mono, sparse)
- Tailwind-native styling

Det her er prototypen vi viste i Claude.ai, men implementeret ordentligt i RAMTT's codebase med rigtige data. Det skal bevise at arkitekturen virker.

### Iteration 1: Core math-lag (2-3 uger)

```
scales/linear.ts      — scaleLinear med inverse, clamp, nice
scales/time.ts        — scaleTime med Date domains
paths/line.ts         — SVG d-string fra data array
paths/area.ts         — Lukket area path
ticks/nice.ts         — Nice tick generation (5, 10, 20, 50, 100, 200, 500...)
ticks/time-ticks.ts   — Tid-aware ticks (1min, 5min, 15min, 1h, 6h, 1d)
ticks/format.ts       — Formattering (1.2K, 2:30, 145bpm, 240W)
utils/extent.ts       — Min/max med padding
utils/lttb.ts         — LTTB downsampling
utils/bisect.ts       — Nearest-point binary search for hover
```

Fuld test suite. 100% coverage. Zero dependencies. Target: < 3KB gzipped.

**Separat npm package:** `@ramtt/chart-core` (eller hvad vi ender med at kalde det). Det er vigtigt at core-laget kan bruges UDEN React. Det er ren matematik. Det kan bruges i Node, edge functions, SSR, anywhere.

### Iteration 2: React primitives (3-4 uger)

```
ChartRoot.tsx        — SVG container, ResizeObserver, scale context
ChartLine.tsx        — <path> med line()
ChartArea.tsx        — <path> + <linearGradient> i <defs>
ChartBar.tsx         — <rect> elements med configurable layout
ChartGrid.tsx        — Horizontale/vertikale grid lines
ChartAxisY.tsx       — Y-axis med tick generation og formattering
ChartAxisX.tsx       — X-axis med tid/kategori ticks
ChartRefLine.tsx     — Dashed/solid reference lines med labels
ChartCrosshair.tsx   — Vertical line + dot, hover-tracking via ref
ChartTooltip.tsx     — Positioneret tooltip (foreignObject eller portal)
ChartBrush.tsx       — Time-range selection for zoom
ChartLegend.tsx      — Minimal, customizable legend
```

Hvert component:
- Accepterer className for Tailwind styling
- Har sensible defaults (du kan droppe det ind uden props og det ser godt ud)
- Er fuldt TypeScript'ed med JSDoc
- Har Storybook story med interactive controls
- Har unit test

### Iteration 3: Composites + domain pack (2-3 uger)

Composites (pre-composed charts der er klar til brug):
```
TimeSeriesChart.tsx  — Line + area + gradient + axes + tooltip
SessionChart.tsx     — Sport-specifik: zones, phases, refs, nutrition
CompareChart.tsx     — Multi-line overlay med legend
DistChart.tsx        — Histogram for zone distribution
SparkChart.tsx       — Minimal inline sparkline
```

Domain pack (opt-in):
```
zones/coggan.ts      — Coggan power zones fra FTP
zones/karvonen.ts    — Karvonen HR zones
zones/cho.ts         — CHO Zones Z1-Z6
annotations/nutrition-cue.ts
annotations/interval-marker.ts
transforms/fit-to-chartdata.ts
transforms/strava-to-chartdata.ts
```

### Iteration 4: Erstatte Recharts i RAMTT (2-4 uger)

Identificér alle Recharts-imports i RAMTT-appen. Erstat dem én for én med vores eget system. Det er den mest ærlige test: fungerer det i produktion med rigtige data og rigtige brugere?

### Iteration 5: Demo-site + docs (2-3 uger)

Demo-site med:
- Interaktive eksempler for hvert component
- Performance benchmarks (side-by-side med Recharts)
- "From Recharts" migration guide
- Copy-paste code for alle eksempler
- Bundle size badges

### Iteration 6: Open source launch

GitHub repo. MIT license. README med benchmarks. Demo-site. Blog post: "We reverse-engineered Perplexity's charts and built an open source alternative to Recharts."

---

## Del 4: Render-arkitektur (det tekniske deep-dive)

### Hvorfor Recharts re-renderer alt

Recharts bruger en centraliseret state management (Redux Toolkit i v3) der holder tooltip-state, active-index, mouse-position. Når musen bevæger sig, opdateres denne state, som trigger re-render af hele chart-træet. Hvert child-component (Line, Area, XAxis, YAxis) re-evalueres af React for at bestemme om det skal re-renderes.

I v3 har de optimeret med mere granulær state (separate Redux slices for tooltip, axis, chart data), men fundamentet er stadig: mouse event → state update → React reconciliation → DOM update. Det er React's normal rendering pipeline, og det er designet til UI-updates, ikke til 60fps mouse tracking.

### Vores render-arkitektur

**Princip: chartet renderes ÉN gang via React. Hover-interaktion sker UDENFOR React's render cycle.**

```
1. React render (ÉN gang ved mount eller data-ændring):
   - Beregn scales fra data
   - Generer SVG path d-attributter (memoized)
   - Render SVG-elementer til DOM
   
2. Mouse tracking (via native event listener, INGEN React state):
   - mousemove listener på SVG container
   - Beregn nærmeste datapunkt via binary search (bisect)
   - Opdater crosshair position via ref (element.setAttribute)
   - Opdater tooltip content via ref (element.textContent)
   - Brug requestAnimationFrame for batching

3. React re-render triggers (KUN ved):
   - Data ændres
   - Container resizes (ResizeObserver → debounced state update)
   - Bruger interagerer med brush/zoom (state update → ny data range)
```

Det er den teknik Perplexity bruger (vi verificerede det). Det er den teknik TradingView Lightweight Charts bruger. Det er den teknik enhver high-performance chart-implementation bruger. Og det er arkitektonisk inkompatibelt med Recharts' tilgang, hvilket er grunden til at de aldrig kan matche det i performance.

Motion (Framer Motion) animerer "at up to 120fps without triggering React re-renders" — de bruger præcis denne teknik. Deres `motion.path` component renderer via React men animerer via direct DOM manipulation. Vi kan integrere med Motion for smooth path-transitions mellem datasets uden at ofre hover-performance.

### LTTB implementation

```typescript
export function lttb(data: Point[], threshold: number): Point[] {
  if (threshold >= data.length || threshold <= 2) return data;
  
  const sampled: Point[] = [data[0]]; // Always include first
  const bucketSize = (data.length - 2) / (threshold - 2);
  
  let a = 0; // Previously selected point index
  
  for (let i = 0; i < threshold - 2; i++) {
    // Calculate average point for next bucket (look-ahead)
    const avgRangeStart = Math.floor((i + 1) * bucketSize) + 1;
    const avgRangeEnd = Math.min(Math.floor((i + 2) * bucketSize) + 1, data.length);
    let avgX = 0, avgY = 0;
    for (let j = avgRangeStart; j < avgRangeEnd; j++) {
      avgX += data[j].x;
      avgY += data[j].y;
    }
    avgX /= (avgRangeEnd - avgRangeStart);
    avgY /= (avgRangeEnd - avgRangeStart);
    
    // Find point in current bucket with largest triangle area
    const rangeStart = Math.floor(i * bucketSize) + 1;
    const rangeEnd = Math.floor((i + 1) * bucketSize) + 1;
    
    let maxArea = -1;
    let maxIdx = rangeStart;
    
    for (let j = rangeStart; j < rangeEnd; j++) {
      const area = Math.abs(
        (data[a].x - avgX) * (data[j].y - data[a].y) -
        (data[a].x - data[j].x) * (avgY - data[a].y)
      ) * 0.5;
      
      if (area > maxArea) {
        maxArea = area;
        maxIdx = j;
      }
    }
    
    sampled.push(data[maxIdx]);
    a = maxIdx;
  }
  
  sampled.push(data[data.length - 1]); // Always include last
  return sampled;
}
```

~40 linjer. Reducerer 7.200 datapunkter til 800 med visuelt identisk output. Det er den mest impactful performance-optimering vi kan lave, og det er trivielt.

---

## Del 5: Go-to-market strategi (ærlig vurdering)

### Hvad vi kan kontrollere

1. **Kvaliteten af library'et.** Bundle size, performance benchmarks, Tailwind integration, TypeScript support, dokumentation. Det er alt sammen i vores hænder.

2. **Content marketing.** "How we reverse-engineered Perplexity Finance's chart system" er en article der har viral potentiale. "Why we ditched Recharts for our own SVG charts" er relevant for tusindvis af React-udviklere. "The hidden performance problem with React chart libraries" med konkrete benchmarks er valuable content.

3. **RAMTT som showcase.** Vores egen app er den mest overbevisende demo. Ikke en lorem-ipsum demo-site, men en rigtig produktions-app med rigtige data.

### Hvad vi ikke kan kontrollere

1. **Community adoption.** Vi kan skrive det bedste library i verden, og det kan stadig floppe hvis ingen opdager det. Timing, luck, og netværk spiller en kæmpe rolle.

2. **shadcn/ui integration.** Hvis shadcn/ui beslutter at tilbyde et alternativ til Recharts, er det en game-changer. Men det er shadcn's beslutning, ikke vores.

3. **Konkurrence.** Recharts 4.0 kunne adressere alle performance-problemerne. Tremor kunne droppe Recharts og bygge deres eget. Et nyt library fra et stort team kunne dukke op.

### Realistisk succes-definition

**6 måneder efter launch:**
- 1.000+ GitHub stars
- 5.000+ ugentlige npm downloads
- 10+ blog posts/tutorials fra community
- Brugt i RAMTT produktion + mindst 5 eksterne projekter

**12 måneder efter launch:**
- 5.000+ GitHub stars
- 20.000+ ugentlige npm downloads
- shadcn/ui community recognition (evt. officiel integration)
- Conference talk (React Summit, Next.js Conf, el. lign.)

**24 måneder efter launch:**
- 10.000+ GitHub stars
- 100.000+ ugentlige npm downloads
- Recognized som "the Tailwind-native chart library"
- Revenue possibility via pro-tier eller consulting

Det er ambitiøst men realistisk. Tremor gik fra 0 til 16K stars på ~2 år med en wrapper ovenpå Recharts. Vi tilbyder noget fundamentalt bedre for en growing niche.

### Hvad der kan gå galt

1. **Vi bygger det for specifikt til sports.** Løsning: core-laget skal være 100% generisk. Sport-features er opt-in domain pack.

2. **Vi undervurderer vedligeholdelsesomkostningen.** Et open source library kræver issue-response, PR-review, documentation-updates, og community management. Det er en ongoing cost. Løsning: definer scope aggressivt. Sig nej til features der ikke passer.

3. **Vi overpromiser og underdeliverer.** Min prototype beviste det: at påstå "nemt!" og levere noget grimt er værre end at sige ingenting. Løsning: ship intet før det er BEDRE end Recharts' defaults. Visuelt. Performancemæssigt. Dokumentationsmæssigt.

4. **Shopify-fælden.** Polaris Viz døde fordi ingen udenfor Shopify brugte det. Løsning: build in the open fra dag ét. Dokumentér designbeslutninger. Acceptér PRs. Gør det nemt for andre at bidrage.

---

## Del 6: Navngivning og branding

Library'ets navn er vigtigere end man tror. Det skal:
- Være kort (1-2 stavelser)
- Være ledigt på npm
- Ikke have naming-konflikter med eksisterende libraries
- Signalere "data visualisering" eller "precision/performance"
- Fungere som en package-prefix (`@name/core`, `@name/react`, `@name/sport`)

Kandidater (kræver npm-check):

| Navn | Vibe | Package | Problem? |
|------|------|---------|----------|
| trace | Dataspor, tidsserie | @trace/charts | Mulig konflikt med distributed tracing |
| pulse | Levende data, heartbeat | @pulse/charts | Mulig konflikt med health-tech |
| arc | Geometri, kurve | @arc/charts | Kort, clean |
| volt | Energi, power | @volt/charts | Sport-relevant |
| flux | Strøm, flow | @flux/charts | Mulig konflikt med Facebook Flux |
| grid | Data, structure | @grid/charts | For generisk? |
| mark | Datapunkt, annotation | @mark/charts | Clean, simple |

Eller vi beholder `@ramtt/charts` og lader RAMTT-brandet bære det. Det giver brandgenkendelse men begrænser opfattelsen ("det er bare for sports").

---

## Konklusion

Det her kræver 6-9 måneders fokuseret arbejde for at nå launch-kvalitet. Det kræver at vi er ærlige om hvad vi kan og ikke kan slå Recharts på. Det kræver at core-laget er generisk nok til at andre gider bruge det. Det kræver at vi publicerer benchmarks, ikke påstande. Og det kræver at vi builder in the open, med documentation og community fra dag ét.

Men potentialet er reelt. Der er et udokumenteret hul i markedet: Tailwind-native, zero-dependency, high-performance SVG charts for React. Ingen har bygget det endnu. Vi kan være de første.

Det starter ikke med "5 SVG paths." Det starter med at respektere kompleksiteten af det vi laver, og bygge fundamentet så solidt at resten kan vokse ovenpå.
