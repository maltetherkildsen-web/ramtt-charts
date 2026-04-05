# RAMTT Chart System — Vision & Technical Brief

**Status:** Concept validated via prototype  
**Dato:** 1. april 2026  
**Forfatter:** Malte Lodberg Therkildsen  

---

## Baggrund

Vi har reverse-engineered Perplexity Finance's chart-system via Chrome DevTools. Det vi fandt ændrede vores perspektiv på chart-visualisering fundamentalt.

Perplexity bruger IKKE noget tredjeparts chart-bibliotek. Ikke Recharts, ikke D3, ikke TradingView Lightweight Charts, ikke Highcharts. Hele deres chart-system er custom SVG: 5 paths, 3 rects, SVG gradients i `<defs>`, oklch CSS custom properties til farver, og Framer Motion til animation. Det hele.

Det er ikke en begrænsning. Det er en bevidst arkitektonisk beslutning. Og resultatet er charts der visuelt og interaktionsmæssigt overgår alt hvad standard chart-libraries producerer.

Det inspirerede et spørgsmål: kan vi gøre det samme for RAMTT? Og kan vi gøre det bedre, fordi vores domæne (sports performance data) har behov som ingen eksisterende chart-library adresserer?

Svaret er ja. Og potentialet rækker langt ud over RAMTT.

---

## Problemet med eksisterende chart-libraries

### Recharts, Tremor, Nivo, Victory

Disse libraries er designet til generiske business dashboards. De løser "vis en linje på en graf" problemet, men de gør det med massive kompromiser:

**Bundle size.** Recharts alene er ~100KB minified+gzipped. Det inkluderer D3-scale, D3-shape, D3-interpolate, og en masse React wrapper-kode. For et chart der i virkeligheden er 5 SVG paths.

**Styling-begrænsninger.** Recharts' klasser (`recharts-cartesian-grid`, `recharts-area`, `recharts-tooltip-wrapper`) er hardcoded. Du kan override dem med CSS, men du kæmper konstant mod library'ets opinions. Tailwind-integration er et afterthought.

**Interaktions-model.** Tooltip-positioning, hover-detection, crosshair-rendering — det hele er abstraheret bag library-API'er der aldrig helt gør hvad du vil. Vil du have en crosshair der snapper til nærmeste datapunkt med zone-farvede dots? Det kræver custom plugins, workarounds, eller forking.

**Performance.** Recharts renderer hele component-træet ved hver hover-event. Det er mærkbart på store datasets. Perplexity's tilgang (ren SVG, ingen React re-renders ved hover) er fundamentalt hurtigere.

**Generisk æstetik.** Alle Recharts-charts ligner Recharts-charts. Alle Tremor-charts ligner Tremor-charts. Det er den visuelle ækvivalent af "det her er lavet med et template." Perplexity's charts har en visuel identitet der er deres egen.

### D3.js

D3 er det modsatte problem. Det er for lavniveau. D3 giver dig scale-funktioner, shape-generators, og DOM-manipulation, men det integrerer dårligt med React's rendering model. Du ender med useEffect-spaghetti der manipulerer DOM'en udenfor React's kontrol.

D3's reelle værdi er dens matematiske funktioner: scales, interpolation, color spaces. De er brilliante. Men du behøver ikke hele D3 for at bruge dem. Du kan implementere en scaleLinear-funktion i 5 linjer TypeScript.

### TradingView Lightweight Charts

Tæt på hvad vi har brug for, men canvas-baseret (ikke SVG), og designet specifikt til finansielle charts. Ingen zone-coloring, ingen nutrition annotations, ingen integration med React's component model.

---

## Hvad vi bygger

Et chart-system bygget fra bunden. Ren SVG, ren React, ren Tailwind. Nul tredjeparts chart-dependencies.

### Kerneprincipper

**1. SVG over Canvas**

SVG giver os DOM-elementer vi kan style med CSS/Tailwind, animere med Framer Motion, og interagere med via standard React event handlers. Hvert element i chartet er en React component. Hvert element kan have hover-states, transitions, og aria-labels.

Canvas er hurtigere til 100.000+ datapunkter, men vi arbejder typisk med 200-2000 datapunkter pr. session. SVG er mere end hurtigt nok, og giver os dramatisk bedre DX og styling-kontrol.

**2. Ingen abstraktioner der skjuler SVG'en**

De fleste chart-libraries abstraherer SVG'en helt væk. Du skriver `<AreaChart data={data}>` og håber på det bedste. Vores system eksponerer SVG-primitiverne direkte. Du skriver `<ChartLine path={path} />` og du ved præcis hvad der renderes. Du kan style det med Tailwind klasser. Du kan wrappe det i `<motion.path>` for animation.

**3. Scale-funktioner som foundation**

Hele systemet bygger på to simple funktioner:

```typescript
function scaleLinear(domain: [number, number], range: [number, number]) {
  return (value: number) => {
    const [d0, d1] = domain
    const [r0, r1] = range
    return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0)
  }
}

function scaleTime(domain: [Date, Date], range: [number, number]) {
  return (value: Date) => {
    const [d0, d1] = domain.map(d => d.getTime())
    const [r0, r1] = range
    return r0 + ((value.getTime() - d0) / (d1 - d0)) * (r1 - r0)
  }
}
```

Det er det. Ingen D3-import. Ingen dependency. To funktioner der mapper data-domæner til pixel-ranges.

**4. Tailwind-native styling**

```tsx
<path
  d={linePath}
  className="fill-none stroke-emerald-600 stroke-[1.5] 
             dark:stroke-emerald-400"
  strokeLinejoin="round"
/>

<text
  x={labelX}
  y={labelY}
  className="fill-zinc-400 text-[10px] font-mono font-light"
>
  {formattedValue}
</text>
```

Ingen inline styles. Ingen CSS-in-JS. Ren Tailwind. Dark mode via `dark:` prefix. Responsive via standard breakpoints.

**5. Composable architecture**

```tsx
<Chart data={sessionData} width={800} height={300}>
  <ChartGrid horizontal ticks={5} className="stroke-zinc-100" />
  <ChartArea gradient={{ from: 'emerald-500/10', to: 'emerald-500/0' }} />
  <ChartLine className="stroke-emerald-600 stroke-[1.5]" />
  <ChartReferenceLine y={ftp} label="FTP" dashed />
  <ChartZoneBands zones={powerZones} />
  <ChartCrosshair snapToData />
  <ChartTooltip>
    {({ point }) => <SessionTooltip data={point} />}
  </ChartTooltip>
</Chart>
```

Hvert child er en selvstændig SVG-component. Du kan fjerne `<ChartGrid>` og der er ingen grid. Du kan tilføje `<ChartAnnotation>` for nutrition cues. Composability, ikke configuration.

---

## RAMTT-specifikke features

### Zone-farvede gradients

Ingen eksisterende chart-library understøtter dette. Linjen skifter farve baseret på hvilken træningszone datapunktet falder i. Z1 grå, Z2 grøn, Z3 gul, Z4 orange, Z5 rød. Implementeret via SVG `<linearGradient>` med dynamiske color stops baseret på data-værdier.

### CHO Zone visualisering

RAMTT's unikke CHO Zones (Z1-Z6) kan visualiseres som baggrundsbånd, reference lines, eller farvede segmenter på linjen. Ingen anden platform har dette.

### CP/CS reference lines

Critical Power og Critical Speed som dashed reference lines med labels. Kontekstualiserer al data relativt til atletens kapacitet.

### Nutrition cue annotations

Markers på tidslinjen der viser hvornår atleten skal indtage ernæring. Integreret direkte i chartet, ikke som et overlay.

### Dual-axis rendering

Power + Heart Rate på samme chart med uafhængige Y-akser. Eller Power + Cadence. Eller Power + CHO oxidation rate. Kombinationerne er domæne-specifikke og kræver præcis kontrol over axis-scaling.

### Session phase segmentering

Warmup, intervals, recovery, cooldown — visualiseret som subtile baggrundszoner med labels. Giver kontekst til data uden at distrahere.

### Garmin integration

Data fra Garmin Connect API (godkendt marts 2026) kan renderes direkte. FIT-fil parsing → vores scale-funktioner → SVG paths. Ingen mellemled.

---

## Teknisk arkitektur

### Fil-struktur

```
src/components/charts/
├── primitives/
│   ├── ChartContainer.tsx    // SVG wrapper, ResizeObserver, mouse events
│   ├── ChartLine.tsx         // <path> med line path generation
│   ├── ChartArea.tsx         // <path> med area fill + gradient defs
│   ├── ChartGrid.tsx         // Horizontale/vertikale grid lines
│   ├── ChartAxis.tsx         // Y/X axis med tick generation
│   ├── ChartReferenceLine.tsx // Dashed reference lines (FTP, LT2, etc.)
│   ├── ChartCrosshair.tsx    // Vertical line + dot on hover
│   ├── ChartTooltip.tsx      // foreignObject-baseret tooltip
│   ├── ChartAnnotation.tsx   // Point/range annotations
│   └── ChartZoneBands.tsx    // Zone-farvede baggrundsbånd
├── composites/
│   ├── SessionChart.tsx      // Pre-composed: line + area + zones + tooltip
│   ├── ComparisonChart.tsx   // Multi-line overlay
│   ├── DistributionChart.tsx // Histogram / zone distribution
│   └── MiniChart.tsx         // Sparkline / volume bars
├── scales/
│   ├── linear.ts             // scaleLinear
│   ├── time.ts               // scaleTime
│   ├── nice.ts               // Nice tick generation
│   └── clamp.ts              // Domain clamping
├── paths/
│   ├── line.ts               // Line path generation
│   ├── area.ts               // Area path generation (closed)
│   ├── step.ts               // Step/staircase paths
│   └── smooth.ts             // Catmull-Rom smoothing (optional)
├── zones/
│   ├── power.ts              // Power zone definitions
│   ├── hr.ts                 // Heart rate zones
│   ├── cho.ts                // CHO Zones Z1-Z6
│   └── colors.ts             // Zone → color mapping
└── hooks/
    ├── useChartDimensions.ts  // ResizeObserver hook
    ├── useChartHover.ts       // Mouse tracking + nearest point
    ├── useChartScales.ts      // Auto-scale from data
    └── useChartPath.ts        // Memoized path generation
```

### Core implementation

Scale-funktionerne er hele fundamentet. Alt andet bygger ovenpå:

```typescript
// scales/linear.ts
export function scaleLinear(
  domain: [number, number],
  range: [number, number]
): Scale {
  const [d0, d1] = domain
  const [r0, r1] = range
  const ratio = (r1 - r0) / (d1 - d0)
  
  const scale = (value: number) => r0 + (value - d0) * ratio
  scale.inverse = (pixel: number) => d0 + (pixel - r0) / ratio
  scale.domain = domain
  scale.range = range
  scale.clamp = (value: number) => 
    scale(Math.max(d0, Math.min(d1, value)))
  
  return scale
}
```

```typescript
// paths/line.ts
export function linePath(
  data: DataPoint[],
  scaleX: Scale,
  scaleY: Scale,
): string {
  if (!data.length) return ''
  return data
    .map((d, i) => 
      `${i === 0 ? 'M' : 'L'}${scaleX(i).toFixed(1)},${scaleY(d.value).toFixed(1)}`
    )
    .join('')
}
```

```typescript
// paths/area.ts
export function areaPath(
  data: DataPoint[],
  scaleX: Scale,
  scaleY: Scale,
  baseline: number, // Y-pixel position of bottom
): string {
  const line = linePath(data, scaleX, scaleY)
  if (!line) return ''
  const lastX = scaleX(data.length - 1).toFixed(1)
  const firstX = scaleX(0).toFixed(1)
  return `${line}L${lastX},${baseline}L${firstX},${baseline}Z`
}
```

Det er bogstaveligt talt hele math-laget. Resten er React components der renderer SVG-elementer med Tailwind klasser.

### Gradient system

Perplexity's tilgang med SVG `<defs>`:

```tsx
// ChartArea.tsx
function ChartArea({ path, color = 'emerald-500' }) {
  const id = useId()
  return (
    <>
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
          <stop 
            offset="0%" 
            className={`[stop-color:theme(colors.${color})]`}
            stopOpacity={0.10} 
          />
          <stop 
            offset="100%" 
            className={`[stop-color:theme(colors.${color})]`}
            stopOpacity={0.01} 
          />
        </linearGradient>
      </defs>
      <path d={path} fill={`url(#${id})`} />
    </>
  )
}
```

### Hover/interaction model

Ren SVG mouse events, ingen React state updates på selve chart-elementerne:

```tsx
// hooks/useChartHover.ts
export function useChartHover(
  data: DataPoint[],
  scaleX: Scale,
  containerRef: RefObject<SVGSVGElement>,
  paddingLeft: number,
) {
  const [hover, setHover] = useState<HoverState | null>(null)
  
  const onMove = useCallback((e: MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const mx = e.clientX - rect.left - paddingLeft
    const idx = Math.round(scaleX.inverse(mx))
    const clamped = Math.max(0, Math.min(data.length - 1, idx))
    setHover({
      index: clamped,
      x: scaleX(clamped),
      y: scaleY(data[clamped].value),
      point: data[clamped],
    })
  }, [data, scaleX, paddingLeft])
  
  return { hover, onMove, onLeave: () => setHover(null) }
}
```

---

## Visuelt designsprog

### Fra Perplexity-analysen

Hvad der gør Perplexity's charts visuelt overlegne:

- **Tynd linje (1.5px).** Ikke 2px, ikke 1px. 1.5px er sweet spot for datadensitet vs. læsbarhed.
- **Ingen interpolation.** Raw point-to-point. Det ser "ægte" ud, ikke glattet og artificielt.
- **Subtil area gradient.** 8-10% opacity ved linjen, fading til 0-1% i bunden. Næsten usynligt, men giver dybde.
- **Sparse akser.** 4-5 Y-ticks, 4-6 X-labels. Meget lys grå (#a1a1aa-ish). Font weight 300.
- **Ingen grid lines.** Kun reference lines (prev close) som dashed. Chartet er ikke et regneark.
- **Clean tooltip.** Hvid baggrund, minimal shadow, monospace tal. Ingen pynt.
- **Massiv whitespace.** Chartet ånder. Ingen container-borders.
- **Prev close / reference line.** Én dashed horisontal linje giver kontekst uden at distrahere.

### RAMTT-tilpasning

Vi adopterer samme principper, men med vores design tokens:

- **Cormorant Garamond** til chart-titler og session-headings
- **JetBrains Mono** til alle numeriske værdier, axis labels, tooltip data
- **Space Grotesk** til zone labels, stat labels, UI-tekst
- **Fuchsia accent** til highlights og interaktive elementer (men IKKE til selve chart-linjen — den skal være grøn/rød/neutral afhængig af kontekst)
- **Warm off-white (#fafaf8)** som side-baggrund, hvid (#fff) som chart-baggrund
- **CRISP-RENDERING** på alle SVG paths: `shape-rendering: geometricPrecision`

---

## Det langsigtede perspektiv

### Fase 1: RAMTT intern (nu → Q3 2026)

Byg chart-systemet som en intern RAMTT-package. Brug det i platformen. Iterér baseret på reelle data og bruger-feedback. 

Mål: erstatte alle Recharts/Tremor-charts i RAMTT med vores eget system.

### Fase 2: Extraction og polish (Q3-Q4 2026)

Extrahér chart-systemet til en standalone package. Fjern RAMTT-specifikke dependencies. Skriv dokumentation. Byg en demo-site.

Navnet kan være noget domæne-specifikt. Noget der signalerer "dette er lavet af folk der forstår performance data, ikke af folk der laver generiske dashboards."

### Fase 3: Open source eller kommercielt (2027)

To mulige veje:

**Open source:** Frigiv som MIT-licenseret package. Byg community. Positionér RAMTT som "holdet bag chart-library'et." Marketing-værdi er enorm. Tænk hvordan Vercel positionerede sig via Next.js, eller hvordan Airbnb positionerede sig via visx/React-dates.

**Kommercielt:** Frigiv en gratis core med betalte pro-features (avancerede chart-typer, enterprise themes, dedicated support). Tænk Highcharts-modellen, men React-native og Tailwind-first.

### Hvorfor det kan blive stort

Der er et hul i markedet. Se på landskabet:

| Library | Styrke | Svaghed |
|---------|--------|---------|
| Recharts | Nemt at bruge | Generisk, langsomt, svært at customise |
| Tremor | Tailwind-integration | Meget begrænsede chart-typer |
| Nivo | Flotte defaults | Tungt, svært at compose |
| Victory | Composable API | Forældet look, svag styling |
| visx | Fleksibelt | For lavniveau, ingen opinioned defaults |
| D3 | Alt er muligt | Ikke React-native, steep learning curve |
| Chart.js | Bredt adopted | Canvas-only, ingen React-integration |
| Highcharts | Feature-complete | Dyrt, ikke React-native, gammel arkitektur |

Ingen af dem er: React-native + Tailwind-first + SVG-baseret + composable + visuelt premium + performance/sports-optimeret.

Det er vores position.

### Teknisk differentiering

Hvad vi kan tilbyde som ingen andre gør:

**Zone-aware rendering.** Linjer der skifter farve baseret på træningszoner. Baggrundsbånd der matcher zone-definitioner. Zone distribution histogrammer. Det er en primitiv der ikke eksisterer i noget chart-library.

**Annotation system.** Markers på tidslinjen for nutrition, events, interval-starts. Med customizable render-functions. Ikke bare "sæt en prik," men "sæt et ikon med en tooltip der viser CHO-indtag."

**Dual-axis med intelligent scaling.** To Y-akser der automatisk aligner med hinanden baseret på domæne-forholdet. Power 0-400W + HR 60-200bpm, skaleret så baseline og peak aligner visuelt.

**FIT/TCX data pipeline.** Parsers der går direkte fra device-data til chart-ready arrays. Ingen mellemmand.

**Responsive uden re-render.** SVG viewBox + ResizeObserver. Chartet skalerer uden at React re-renderer component-træet.

**Dark mode gratis.** Tailwind `dark:` klasser på alle elementer. Ingen theme-configuration.

**Animation via Framer Motion.** `<motion.path>` med animeret `d`-attribut. Smooth transitions mellem datasets. Perplexity gør dette, og det føles premium.

---

## Konklusion

Vi startede med at spørge "hvad bruger Perplexity til deres charts?" og endte med at indse at svaret er: ingenting. De byggede det selv. Og resultatet er bedre end alle tredjeparts-alternativer.

Vi kan gøre det samme. Og fordi vores domæne (sports performance) har specifikke behov som ingen chart-library adresserer, har vi muligheden for ikke bare at bygge noget til RAMTT, men at bygge noget der kan blive en standard for performance-visualisering.

Det starter med 5 SVG paths og en scaleLinear-funktion. Resten er iteration.
