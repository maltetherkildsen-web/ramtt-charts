# RAMTT Font- & Motion-Regler

> **Sidst opdateret:** 2026-04-17
> **Kilde-filer:** `lib/ui.ts`, `components/ui/tokens.css`, `app/globals.css`, `components/ui/RULES.md`, `CLAUDE.md`, `.claude/visual_improvement/crisp-rendering.md`
> **Princip:** Weight kommunikerer vigtighed, ikke visuel størrelse. Ingen hardcoded font-værdier. Transitions er altid specifikke properties, aldrig `transition-all`.

---

# DEL 1 — FONTS

## 1. Font-Familier (kun to, intet andet)

| Familie | Filer | CSS variabel | Brug |
|---------|-------|--------------|------|
| **Satoshi** | `Satoshi-Variable.woff2` + `Satoshi-VariableItalic.woff2` | `--font-sans` / `--font-label` / `--font-body` / `--font-mono` | **ALT UI** — body, labels, numre, units, knapper, inputs, charts, sidebar, nav — alt |
| **Cormorant Garamond** | `CormorantGaramond-VariableFont_wght.ttf` + italic | `--font-serif` / `--font-display` | **KUN editorial/marketing** — landing-sider, color-guide headings, storytelling. ALDRIG i app UI |

**Det er HELE listen.** Ingen andre fonts er loadet. Ingen andre fonts må bruges.

### Historisk slettede fonts (må ALDRIG genindføres)

| Font | Status | Slettet |
|------|--------|---------|
| Space Grotesk | Fjernet fra hele repoet | 2026-04-17 |
| Instrument Sans | Fjernet 2026-04-06 | Erstattet af Satoshi |
| JetBrains Mono | Aldrig selv-hosted, nu forbudt | 2026-04-06 (Satoshi + tabular-nums dækker tal) |
| Inter, Commit Mono, Berkeley Mono m.fl. | Forbudt | — |

**Audit-regel:** `npm run audit` fejler på enhver mention af disse fonts i source-filer. Se `scripts/audit.ts` + `scripts/audit-charts.ts` ban-lists.

---

## 2. Reglen: Aldrig Hardcode

**Forbudt:**
```tsx
<span className="font-sans">...</span>                     // ❌ (bruger ikke CSS var)
<span style={{ fontFamily: 'Satoshi' }}>...</span>         // ❌
<text fontFamily="Satoshi">...</text>                      // ❌ (undtagen i SVG, se §9)
<span className="font-semibold">...</span>                 // ❌ (weight 600 er forbudt)
<span style={{ fontWeight: 600 }}>...</span>               // ❌
```

**Tilladt:**
```tsx
import { FONT, WEIGHT, BODY_STYLE } from '@/lib/ui';

<span className={`${FONT.body} ${WEIGHT.strong}`}>...</span>    // ✅
<span className={BODY_STYLE}>...</span>                          // ✅
```

Fra `components/ui/RULES.md`:
> Ingen hardcoded font-family, border-width, border-radius eller transition-værdier.

---

## 3. Vægt-Hierarkiet (`WEIGHT`)

**Figma-kalibreret** — Satoshi 450 ≈ Inter 400 optisk. Weight signalerer **vigtighed**, ikke bare visuel størrelse.

| Token | CSS | Værdi | Brug |
|-------|-----|-------|------|
| `WEIGHT.normal` | `font-normal` | **400** | Body text, list items, input text, unselected toggles, quiet/placeholder |
| `WEIGHT.book` | `font-[450]` | **450** | Secondary UI — units, metadata, descriptions, subtitles, sidebar nav items. **Default på `<body>`** |
| `WEIGHT.medium` | `font-medium` | **500** | Badges, form labels, primary/outline buttons |
| `WEIGHT.strong` | `font-[550]` | **550** | Section headers, card titles, active tabs, selected toggles, numeric values |

**Hele skalaen:**
```
400 ──── 450 ──── 500 ──── 550
normal   book      medium   strong
body     muted     emphasis heading
```

**Vigtigt:** Weight går IKKE højere end 550. `font-bold` (700), `font-semibold` (600), `font-black` (900) er forbudt — for tungt for warm UI-palette.

**Body defaults til 450** (ikke 400):
```css
body {
  font-family: var(--font-sans);
  font-weight: 450;   /* book — the RAMTT default */
}
```

---

## 4. Størrelser (`SIZE_TEXT`)

Præcise pixel-værdier. Ingen Tailwind `text-xs/sm/md/lg` — vi bruger vores egen kalibrerede skala.

| Token | Tailwind | Pixels | Brug |
|-------|----------|--------|------|
| `SIZE_TEXT.xs` | `text-[11px]` | **11px** | **Badges, sidebar nav, labels** (Figma-kalibreret) |
| `SIZE_TEXT.sm` | `text-[12px]` | **12px** | Små metadata, secondary UI |
| `SIZE_TEXT.md` | `text-[13px]` | **13px** | Default UI (knapper, inputs, select items) |
| `SIZE_TEXT.lg` | `text-[14px]` | **14px** | Stor body text, large inputs |

**Større størrelser** (headings m.m.) bruges via explicit arbitrary values (`text-[20px]`, `text-[28px]`). Der er ingen named heading-tokens endnu.

**Regel:** Brug altid arbitrary values i `[...]` — aldrig `text-sm/md/lg/xl` direkte. Tailwind's default-skala matcher ikke Figma.

---

## 5. `FONT` — Font-Familie-Klasser

Kun tre font-family-tokens. Ingen komponent skal hardcode `font-family`.

```ts
export const FONT = {
  /** Body text, descriptions, UI copy — Satoshi */
  body: "font-[family-name:var(--font-sans)]",
  /** Labels AND numre/values — Satoshi (samme font, separat token for semantisk klarhed) */
  label: "font-[family-name:var(--font-label)]",
  /** KUN editorial, aldrig i app UI — Cormorant Garamond */
  serif: "font-[family-name:var(--font-serif)]",
} as const;
```

**Brug:**
```tsx
<p className={FONT.body}>Body text</p>
<span className={FONT.label}>42 W</span>             // Tal bruger også label/body
<h1 className={FONT.serif}>Editorial heading</h1>    // KUN på marketing/color-guide
```

**`FONT.body` vs `FONT.label`** — begge peger på Satoshi. Forskellen er semantisk: `label` signalerer "dette er en label eller et tal". Der er ingen separat mono-font; `--font-mono` aliaser også til Satoshi.

---

## 6. Composed Text Styles (brug disse først!)

**6 pre-composed styles** i `lib/ui.ts`. De dækker 90% af text-brug i appen. Brug dem — genopfind aldrig mønsteret.

| Style | Font | Størrelse | Vægt | Farve | Brug |
|-------|------|-----------|------|-------|------|
| `LABEL_STYLE` | Satoshi | **11px** | 550 | `--n600` | Section headers, field labels, uppercase tracked labels |
| `VALUE_STYLE` | Satoshi | (inherit) | 550 | (inherit) | Numeric values, stats, priser — **inkluderer `tabular-nums`** |
| `BODY_STYLE` | Satoshi | (inherit) | 400 | `--n1150` | Body text, descriptions, primary content |
| `MUTED_STYLE` | Satoshi | (inherit) | 450 | `--n800` | Secondary/muted text |
| `QUIET_STYLE` | Satoshi | (inherit) | 400 | `--n600` | Placeholder text, helper text |
| `UNIT_STYLE` | Satoshi | (inherit) | 450 | `--n800` | Unit suffixer ("W", "BPM", "kJ") |

**Eksempler:**
```tsx
<label className={LABEL_STYLE}>AVERAGE POWER</label>
<span className={VALUE_STYLE}>247</span>
<span className={UNIT_STYLE}>W</span>
<p className={BODY_STYLE}>This is body text.</p>
<p className={MUTED_STYLE}>Secondary info</p>
<p className={QUIET_STYLE}>Optional helper text</p>
```

---

## 7. Farve-Hierarkiet (bruges sammen med font)

Font-farver går KUN gennem neutral-skalaen. Aldrig hardcode hex.

| Token | Hex | Brug |
|-------|-----|------|
| `--n1150` | `#131211` | **Primary text** — headlines, values, body emphasis |
| `--n1050` | `#383633` | Strong body |
| `--n800` | `#6B6760` | **Muted text** — secondary, units, descriptions |
| `--n600` | `#76726A` | **Quiet text** — labels, placeholder, metadata (WCAG AA 4.55:1) |
| `--n700` | `#B0AEA5` | Mid-muted — for dark surfaces |

**På dark surfaces** (Footer, DarkSection):
- `--dark-text` = `#FAF9F5` (self-inverting)
- `--dark-muted` = `#B0AEA5`

---

## 8. Specifikke Komponent-Regler

### 8.1 Badges
- `h-[18px]`, `text-[11px]`, `font-medium` (500), `rounded-[4px]`

### 8.2 Sidebar Nav — **LOCKED** (2026-04-14)
```ts
NAV_ITEM_STYLE = 'px-3 py-2 rounded-[6px] text-[11px] font-[450] text-[var(--n1150)]'
NAV_ICON       = { size: 18, strokeWidth: 1.25, gap: 'gap-3.5' }
```
- **11px, weight 450, --n1150** (ikke muted — primary farve selv for inaktive)
- Active state: `accent-soft` (~12% opacity), IKKE black fill
- Hover: `--n200` warm neutral, IKKE accent-wash

### 8.3 Buttons
- `text-[13px]` (md) eller matching size
- Primary/outline: `WEIGHT.medium` (500)
- Ghost: `WEIGHT.normal` (400)

### 8.4 Numre og værdier
- **ALTID `tabular-nums`** for tal der skal justere på kommaer (Stat, Leaderboard, MetricCard, DataTable m.fl.)
- `VALUE_STYLE` har `tabular-nums` indbygget
- Satoshi understøtter `tabular-nums` OpenType-feature — derfor har vi ikke brug for monospace

### 8.5 Editorial/Marketing (undtagelsen)
- KUN her må `FONT.serif` bruges (Cormorant Garamond)
- Typisk: `/color-guide` headings, landing-sider, storytelling
- ALDRIG i: app UI, dashboards, charts, form labels, knapper

---

## 9. SVG Tekst (charts)

SVG-tekst har sin egen gotcha: Tailwind `font-*` classes virker **ikke** på `<text>`-elementer. Brug eksplicit style:

```tsx
<text style={{ fontFamily: 'var(--font-sans)' }}>42</text>         // ✅
<text className="font-sans">42</text>                              // ❌ virker ikke
```

Fra feedback-memory: SVG text skal have eksplicit `fontFamily` style — ikke Tailwind class.

---

## 10. Cheat Sheet — Font

| Vil jeg vise... | Brug |
|-----------------|------|
| En label ("AVERAGE POWER") | `LABEL_STYLE` |
| Et tal (247) | `VALUE_STYLE` |
| En enhed ("W", "BPM") | `UNIT_STYLE` |
| Body-tekst (primary) | `BODY_STYLE` |
| Secondary/muted text | `MUTED_STYLE` |
| Placeholder/helper | `QUIET_STYLE` |
| Card title | `${FONT.body} ${WEIGHT.strong} text-[14px]` |
| Section header | `LABEL_STYLE` + `uppercase tracking-wide` |
| Button label | `text-[13px] ${WEIGHT.medium}` |
| Sidebar nav item | `NAV_ITEM_STYLE` |
| Chart axis tick | `<text style={{ fontFamily: 'var(--font-sans)' }} fontSize={11}>` |
| Large hero text | `${FONT.body} text-[28px] ${WEIGHT.strong}` |
| Marketing heading | `${FONT.serif} text-[48px]` (KUN på landing/editorial) |

---

# DEL 2 — MOTION & TRANSITIONS

## 11. Det Store Princip

> **RAMTT's interaktion føles rolig, specifik og forudsigelig.** Aldrig `transition-all`. Aldrig catch-all animations. Hver transition er navngivet, kort (150ms), og på én property.

---

## 12. `TRANSITION`-Tokens (kun disse fire)

**Fra `lib/ui.ts`:**
```ts
// NEVER use transition-all. Specify exact properties.
export const TRANSITION = {
  colors:     'transition-colors duration-150',
  background: 'transition-[background-color] duration-150',
  opacity:    'transition-opacity duration-150',
  transform:  'transition-transform duration-150',
} as const;
```

| Token | Hvornår |
|-------|---------|
| `TRANSITION.colors` | Hover-tekst, ikon-farve, border-color skift |
| `TRANSITION.background` | Hover-baggrund (sand fill, accent-soft), active states |
| `TRANSITION.opacity` | Fade-ind/ud af floating elementer (tooltip, popover) |
| `TRANSITION.transform` | Translate/scale/rotate — chevron-rotations, morph-ikoner |

**Regel:**
- **Default duration: 150ms.** Aldrig længere uden begrundelse (panels kan være 200-250ms).
- **Specifik property.** Aldrig `transition-all`, aldrig `transition`.
- **Kombinér ved behov:** `${TRANSITION.colors} ${TRANSITION.transform}` er ok.

**Forbudt:**
```tsx
<div className="transition-all duration-300">...</div>        // ❌
<div className="transition">...</div>                         // ❌
<div style={{ transition: 'all 0.3s' }}>...</div>             // ❌
```

**Tilladt:**
```tsx
<div className={TRANSITION.colors}>...</div>                  // ✅
<div className={`${TRANSITION.background} ${HOVER_SAND}`}>...</div>  // ✅
```

---

## 13. `motion`-Pakken — **Ekstremt Begrænset Brug**

Vi har `motion` (Framer Motion successor, v12.38.0) installeret. Men:

### Regel (fra CLAUDE.md)
> `motion` dependency bruges KUN i `app/chart-test/page.tsx` for panel collapse/expand. Framer's `motion.div` animerer på mount/unmount only, så safe around charts. **Erstat ALDRIG med AnimatedPanel eller CSS grid transitions.**

### Hvorfor?
- Chart-test er crown jewel. Motion-wrappere omkring charts kan introducere layout-thrashing.
- Men til **panel-collapse** (side-panel der skubbes ind/ud) er `motion.div` perfekt, fordi den animerer på mount/unmount — ikke på hvert frame, ikke inde i chart-tree.
- Tidligere forsøg på at erstatte (CSS grid transition, AnimatedPanel) forårsagede zoom-lag. Dokumenteret i "zoom-lag saga" (16. april).

### Tilladt brug af `motion`
```tsx
// ✅ app/chart-test/page.tsx — panel collapse/expand
<motion.div
  initial={{ width: 0 }}
  animate={{ width: 320 }}
  exit={{ width: 0 }}
  transition={{ duration: 0.2 }}
>
  {sidebarContent}
</motion.div>
```

### Forbudt brug af `motion`
- **Alle andre steder i repoet.** Enhver ny `import { motion } from 'motion/react'` uden for `app/chart-test/page.tsx` er en regel-overtrædelse.
- Brug i stedet CSS `TRANSITION` tokens + `max-height`/`opacity`/`transform`.
- For paneler andre steder: brug `AnimatedPanel` komponenten (Wave 13).

---

## 14. `AnimatedPanel` (Wave 13) — CSS-baseret Alternativ

`components/ui/AnimatedPanel.tsx` er den **default** måde at animere panel-collapse udenfor chart-test.

```tsx
import { AnimatedPanel } from '@/components/ui/AnimatedPanel';

<AnimatedPanel open={isOpen}>
  {content}
</AnimatedPanel>
```

Bruger CSS `max-height` + `opacity` + transform. Ingen motion-wrapper. 150-200ms duration.

**Brugs-matrix:**

| Kontekst | Komponent |
|----------|-----------|
| Chart-test sidebar collapse | `motion.div` (locked by CLAUDE.md) |
| Alle andre paneler/drawers/accordions | `AnimatedPanel` eller CSS transitions |

---

## 15. Chart-Zoom — NO DEBOUNCE (critical)

**Fra CLAUDE.md:**
> Chart zoom MUST bruge direct `setZoomState()` **uden debounce** i `ChartSyncProvider`. Debouncing zoom state = katastrofalt lag. This was proven the hard way.

### Hvad det betyder
- I `ChartSyncProvider`, når zoom-state ændres (wheel, pinch, brush, keyboard), kald `setZoomState()` **direkte og synkront**.
- Ingen `setTimeout`, ingen `requestAnimationFrame` før state-update, ingen `lodash.debounce`, ingen manuel debounce-wrapper.
- React batcher selv state-updates pr. event; det er nok.

### Historien
Commit `e2981a1` (16. apr) introducerede en debounce skjult i en stor fix-commit. Chart-test flimrede. En hel dag gik med at mistænke Framer → fjerne → genindsætte → debug. Endelig fandt vi at zoom-debounce var root cause. Revert i `3398634`. Kodificeret i CLAUDE.md.

### Gotcha
Hvis du ser chart-flicker eller zoom-lag → **første mistanke: debounce eller throttle i state-path**. Ikke Framer, ikke motion, ikke CSS.

---

## 16. Animated Icons — CSS @keyframes ONLY

**20 animated ikoner** i `components/icons/animated/`. Alle bruger **CSS `@keyframes`** — aldrig JS-baseret animation, aldrig `motion`.

```css
@keyframes ramtt-spinner-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.icon-spinner {
  animation: ramtt-spinner-rotate 1s linear infinite;
}
```

**Regel:**
- Ny animated icon = ny @keyframes i den komponents CSS (eller `reactions.css`).
- ALDRIG `motion.svg` eller JS animation til ikoner.
- `prefers-reduced-motion` respekteres — alle @keyframes animations skal have fallback:
  ```css
  @media (prefers-reduced-motion: reduce) {
    .icon-spinner { animation: none; }
  }
  ```

---

## 17. Reactive Icons (30 stk) — CSS Hover-Only

`components/icons/reactive/` + `reactions.css`. Alle hover-animationer er CSS-only (`transition-transform`, `:hover` keyframes).

**Regel:** Ny reactive icon = CSS-only. Aldrig React state for hover-animationer.

---

## 18. Morph Icons (24 stk) — CSS `d`-property transitions

`components/icons/morph/` bruger CSS path morphing:
```css
.icon-morph path {
  transition: d 200ms cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Regel:** Morph-varighed er 200ms med cubic-bezier ease. Aldrig linear. Ingen motion.

---

## 19. Chart-Animation

Charts rendererer synkront uden animation for at opretholde 60fps hover.

**Regel:**
- Chart-data-opdateringer (zoom, hover, data-skift) animeres **ikke**. De er diskrete re-renders.
- Enter/exit animationer på charts er forbudt.
- Undtagelser: `ChartAnnotation` floating labels kan fade ind med `TRANSITION.opacity`.

**Hvorfor:** Chart-hover er ref-based pub/sub med zero re-renders. Animation bryder dette garanti.

---

## 20. Fade/Slide/Scale — CSS Patterns

For floating elementer (Tooltip, Popover, Dropdown, Toast) bruges CSS keyframes + `transition-opacity` + `transition-transform`.

### Fade-in (standard 150ms)
```tsx
<div className={`${TRANSITION.opacity} ${isOpen ? 'opacity-100' : 'opacity-0'}`}>
```

### Slide-up (popover/tooltip entrance)
```tsx
<div
  className={cn(
    TRANSITION.transform,
    TRANSITION.opacity,
    isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'
  )}
>
```

### Scale-in (modal entrance)
```tsx
<div
  className={cn(
    TRANSITION.transform,
    isOpen ? 'scale-100' : 'scale-95'
  )}
>
```

**Duration-konvention:**
- 150ms — farver, opacity (default)
- 200ms — slide-ins, morphs
- 250ms — modal open/close (når der er mere at animere)
- Aldrig over 300ms undtagen bevidst storytelling (landing-sider).

---

## 21. Hover/Active/Focus States

Interaktions-states er deklarative — ikke animerede.

| State | Token | Transition |
|-------|-------|-----------|
| Hover (rows, ghost) | `HOVER_SAND` (`hover:bg-[var(--n200)]`) | `TRANSITION.background` |
| Active (toggles) | `ACTIVE_SAND` (`bg-[var(--n400)]`) | — (instant) |
| CTA Active | `ACTIVE_BLACK` (`bg-[var(--n1150)]`) | `TRANSITION.colors` |
| Focus (buttons) | `FOCUS_RING` (box-shadow trick) | — (instant) |
| Focus (inputs) | `FOCUS_RING_THIN` (1.5px accent border) | `TRANSITION.colors` |

**Focus ring:** 2px bg gap + 2px `--n600` ring. Følger border-radius perfekt. **KUN på `:focus-visible`**.

---

## 22. `prefers-reduced-motion`

**Regel:** Alle ikke-essentielle animationer skal respektere `prefers-reduced-motion: reduce`.

**Essentielle:** spinner, progress bar, loading dots (informerer status — må løbe).
**Ikke-essentielle:** reactive icon hover, morph, fade-in — deaktiveres ved reduced motion.

---

## 23. Crisp-Rendering (performance + sharpness)

Fra `.claude/visual_improvement/crisp-rendering.md` — de regler der gør Linear/Stripe/Vercel skarpe.

**Relevante regler:**
- **Self-host fonts** via `next/font/local` (Satoshi er self-hosted). Ingen Google Fonts CDN.
- **woff2 only** — ingen fallbacks.
- **`font-display: swap`** — text synlig med det samme.
- **Subpixel antialiasing** er OFF på macOS default — vi bruger `-webkit-font-smoothing: antialiased`.
- **Variable fonts** hvor muligt (Satoshi + Cormorant Garamond er begge variable).
- **GPU-acceleration:** Animér `transform` og `opacity`. Aldrig `width`/`height`/`top`/`left` for animationer.

---

## 24. Cheat Sheet — Motion

| Vil jeg animere... | Brug |
|--------------------|------|
| Farve-skift på hover | `TRANSITION.colors` |
| Baggrund-skift (sand fill) | `TRANSITION.background` |
| Fade ind/ud | `TRANSITION.opacity` |
| Rotation (chevron) | `TRANSITION.transform` + `rotate-90` |
| Panel collapse udenfor chart-test | `<AnimatedPanel>` |
| Panel collapse i chart-test | `motion.div` (ONLY her) |
| Ikon der animerer sig selv | CSS `@keyframes` i `animated/` |
| Hover-animation på ikon | CSS i `reactions.css` |
| Morph mellem to ikon-states | `MorphBase` + CSS `d` transition |
| Chart data-skift | INTET — re-render synkront |
| Chart floating label (annotation) | `TRANSITION.opacity` |

---

## 25. Forbudte Patterns

| Forbudt | Brug i stedet |
|---------|---------------|
| `transition-all` | Specifik: `TRANSITION.colors/background/opacity/transform` |
| `transition: all 300ms` | `TRANSITION.*` |
| `setTimeout` rundt om `setZoomState()` | Direkte kald |
| `motion.*` udenfor `app/chart-test/page.tsx` | `AnimatedPanel` eller CSS |
| JS-drevet animation-loop (requestAnimationFrame for visual) | CSS `@keyframes` |
| Width/height animations | `transform: scale()` |
| Top/left animations | `transform: translate()` |
| `animate-bounce`, `animate-ping`, `animate-pulse` (Tailwind defaults) | Custom `@keyframes` med reduced-motion support |
| `font-bold`, `font-semibold`, `font-black` | Max `WEIGHT.strong` (550) |
| `font-family: 'Space Grotesk'` / Inter / JetBrains / Instrument Sans | Satoshi only |

---

## 26. Opdaterings-Kilder

Hvis der ændres i font- eller motion-reglerne, opdater:

1. **`lib/ui.ts`** — `FONT`, `WEIGHT`, `SIZE_TEXT`, `TRANSITION`, composed styles
2. **`components/ui/tokens.css`** — CSS variabler + `body` defaults
3. **`app/globals.css`** — `@theme` font-familie declarations
4. **`components/ui/RULES.md`** — synlig regel for komponent-byggere
5. **`CLAUDE.md`** — motion & zoom-debounce regler
6. **`scripts/audit.ts`** — ban-list for forbidden fonts (unified — merged former audit-ui.ts + audit-charts.ts)
7. **Dette dokument** — menneske-vendt reference

**`npm run audit`** fanger:
- Hardcoded font-values (Space Grotesk, Inter, JetBrains m.fl.)
- Hardcoded font-weight værdier udenfor WEIGHT-tokens
- `transition-all` brug
- Nye `motion.*` imports udenfor chart-test
- Hardcoded colors udenfor tokens

---

*Skrevet 2026-04-17. Erstatter tidligere versioner hvor Space Grotesk var "loadet men ubrugt".*
*Synkroniseret med `lib/ui.ts` v1 (pre-1.0), `CLAUDE.md`, `RULES.md`.*
