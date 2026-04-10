# Ekstremt Dybdegående Analyse af Linear App
Baseret på min grundige inspektion af DOM, CSS, JavaScript-bundles, React fiber-træet og alle stylesheets, her er alt hvad Linear gør teknisk og designmæssigt.

# 1\. Tech Stack — Den Præcise Fundament
**Framework og Runtime:** Linear er bygget med **React 18** i **Concurrent Mode** (bekræftet via containerFiber.mode = 1 som er ConcurrentMode-bitflagget). Det bruger createRoot() og alle moderne React 18 features som concurrent rendering.
**Bundler:** Linear bruger **Rolldown** (den nye Rust-baserede bundler fra Vox/Vite-teamet) — bekræftet af rolldown-runtime.zcDlVW45.js. Det er bemærkelsesværdigt, da Rolldown er et relativt nyt produkt og Linear er tidlig med det. Filnavnene følger mønsteret [navn].[contenthash].js.
**Styling — Et Hybrid System i Tre Lag:** Linear har et komplekst, historisk stylinglag der viser en igangværende migration:
**Lag 1 — Styled Components v6.1.18-20** (primært legacy-lag) Bekræftet via data-styled-version="6.1.18-20" på en <style> tag. Komponenterne har sc- prefix på en unik identifikator-klasse plus en hash-klasse der indeholder de faktiske styles. Eksempel fra sidebar:


css
.ielLHr { 
  position: relative; 
  display: flex; 
  flex-direction: column; 
  flex-shrink: 0; 
  height: 100%; 
}
### sc-iSxZmU er komponentens "stabile" identifikator (bruges til CSS-selektor reference), mens ielLHr indeholder de faktiske styles.
**Lag 2 — Migreret** sc2sx- **system (under migration)** Klasser som sc2sx-Flex-d11c8f6e og sc2sx-Text-c50a30fa viser, at Linear aktivt migrerer fra Styled Components til et custom CSS-in-JS system kaldet "sx". sc2sx betyder sandsynligvis "styled-components to sx". Det er en wrapper der bibeholder gamle komponentnavne under migration.
**Lag 3 — Atomic CSS via** sx- **prefix (nyt system)** Der er 137 aktive --sx- CSS-variabel-tokens og 59 unikke sx- klasser i DOM'et på den aktuelle side. Mønsteret ligner **StyleX** (Metas CSS-in-JS system) eller en custom implementation. Klasserne er hashed atoms:


css
.sx-78zum5 → display: flex
.sx-vx4679 → flex-direction: row  
.sx-1q0g3np → align-items: center
Hvert sx- token er et enkelt CSS-property, og man kombinerer dem som utility classes, men de er genereret programmatisk, ikke hånd-skrevne.
**Lag 4 — CSS Modules** (for tredjepartskomponenter) Klasser som _tooltipTriggerContent_1et26_1 og _draggableRegion_1ojkm_1 viser CSS Modules bruges for isolerede komponenter (Tooltip, Popover).
**@layer CSS Cascade:**


css
@layer reset, base;
```
Linear bruger CSS `@layer` for at etablere cascade-lag. Reset-laget nulstiller alle margins/paddings, `base` laget sætter fonts og root-variabler.

---

## 2. Design System — Farver

**Farve-system: LCH (OKLCH-adjacent)**
Linear bruger **LCH farverum** i stedet for hex/rgb. Dette er bemærkelsesværdigt avanceret — LCH giver perceptuelt ensartet farveafstand og er fremtidssikret til HDR-skærme. Syntaksen er `lch(Lightness% Chroma Hue / Alpha)`.

**Baggrunde (lys tilstand) — omtrentlige hex-værdier:**

| Token | LCH | Hex | Brug |
|-------|-----|-----|------|
| `--bg-base-color` | `lch(97.92 2.055 94.879)` | `#faf9f5` | Hoved-content baggrund |
| `--bg-sidebar-color` | `lch(96.42 2.055 94.879)` | `#f6f5f1` | Sidebar baggrund |
| Card-baggrund | `lch(100 1.805 94.879)` | `#fffffb` | Hvide kort/modals |
| `--color-bg-secondary` | `lch(95.17 2.055 94.879)` | `~#f0efe9` | Sekundær baggrund |
| `--color-bg-tertiary` | `lch(94.42 2.055 94.879)` | `~#eeedea` | Tertiær baggrund |

Alle baggrunde har **hue 94.879** (en svagt varm, gul-neutral tone) og meget lav chroma (~2), der giver den karakteristiske "off-white med meget svag varme" som er Linear's visuelle signatur i lys tilstand. Det er ikke koldt grå, ikke hvid — det er cream.

**Tekstfarver:**

| Token | LCH | Hex | Brug |
|-------|-----|-----|------|
| `--color-text-primary` | `lch(10.317 0 94.879)` | `#1c1c1c` | Overskrifter, primær tekst |
| `--color-text-secondary` | `lch(20.633 2.028 94.879)` | `#32322f` | Body tekst |
| `--color-text-tertiary` | `lch(41.266 2.028 94.879)` | `#62615e` | Labels, metadata |
| `--color-text-quaternary` | `lch(68.089 2.028 94.879)` | `#a7a6a2` | Placeholder, deactivated |

**Brand/Accent-farver (Linear's brand-purple/indigo):**

| Navn | Hex | Brug |
|------|-----|------|
| `#5e6ad2` (`--sx-1yxqotz`) | Indigo | Linear primær brand-farve |
| `#6d78d5` (`--sx-n8xqcl`) | Lys indigo | Focus ring variant |
| `#4f5ec4` (`--sx-kthb5v`) | Mørkere indigo | Hover state |
| `#4656bb` (`--sx-7ide1`) | Dyb indigo | Darkened brand |
| `#e9eaf6` (`--sx-1gakdvt`) | Lys indigo-tint | Brand-baggrund |

**Status-farver (fra sx-vars):**
```
Priority Urgent:  #d9343f  (rød)
Priority High:    #e85c20  (orange)  
Priority Medium:  #f2ab12  (gul)
Priority Low:     grøn
Status Backlog:   #cecdca  (neutral grå)
Done:             #26a544 / #007a1a (grøn)
Cancelled:        gråbrun
Info/Blue:        #006edd
Teal:             #00a2b5
```

**Andre Notable Farver:**
```
Urgent Red:       #d9343f / #c61c32
Orange:           #e85c20 / #f26428
Yellow:           #fad700 / #e0b100
Blue:             #006edd / #4d6cfa
Teal:             #00a2b5 / #9e9ea0
Green:            #26a544 / #007a1a / #32ae4b
Purple:           #5e6ad2 / #6d78d5
```

**Border-farver:**
```
--color-border-primary:   lch(96.57 0.705 94.879) → #efeeea  (næsten usynlig)
--color-border-secondary: lch(93.195 0.705 94.879) → #ecebea
--color-border-tertiary:  lch(91.17 0.705 94.879) → #e8e7e3
Borders bruger chroma ~0.7 (næsten farveløs), dvs. ren grå — ingen varm tone.

# 3\. Typografi
**Skrifttyper:**


css
--font-regular: "Inter Variable", "SF Pro Display", -apple-system, 
  BlinkMacSystemFont, "Segoe UI", Roboto, ...

--font-monospace: "Berkeley Mono", "SFMono Regular", Consolas, 
  "Liberation Mono", Menlo, Courier, monospace

--font-emoji: "Apple Color Emoji", "Segoe UI Emoji", ...

--font-display: var(--font-regular) (alias)
```

**Font-filer loaded:**
- `InterVariable.woff2` — Inter Variable (100–900 weight range), `font-display: swap`
- `InterVariable-Italic.woff2` — kursiv variant
- `Berkeley-Mono-Variable.woff2` — Berkeley Mono Variable (for kode/editor)
- `Linear Thai` — lokal font via `local()` (Thonburi/Sukhumvit) for Thai tekst

**Størrelsesskala:**
```
--font-size-micro:     0.6875rem  (11px)
--font-size-mini:      0.75rem    (12px)   ← mest brugt i sidebar/badges
--font-size-small:     0.8125rem  (13px)   ← sekundær UI-tekst
--font-size-regular:   0.9375rem  (15px)   ← editor body text
--font-size-large:     1.125rem   (18px)
--font-size-title3:    1.25rem    (20px)
--font-size-title2:    1.5rem     (24px)
--font-size-title1:    2.25rem    (36px)
```

**Font-weights:**
```
--font-weight-light:    300
--font-weight-normal:   450   ← Bemærkelsesværdigt! "Normal" er 450, ikke 400
--font-weight-medium:   500
--font-weight-semibold: 600
--font-weight-bold:     700
Brugen af **450 som "normal"** er karakteristisk for Linear. Inter Variable understøtter dette via variable font axes, og 450 giver en lidt tungere end "book" men lettere end "medium" — en mellemting der er meget behagelig at læse.
**Typografi i Editor:**


css
/* ProseMirror issue title */
font-size: 24px;
font-weight: 600;
line-height: 38.4px (160%)

/* ProseMirror description */
font-size: 15px;
font-weight: 450;
line-height: 24px (160%)
```

---

## 4. Layout-arkitektur

**HTML-struktur:**
```
<html> (position: fixed, height: 100vh, background: sidebar-color)
  <body class="layoutScrollbarObtrusive content-loaded is-bootstrapped loaded">
    <div id="root">
      [SVG sprite sheet - 0x0px hidden]
      [Theme provider]
      <div.sc-dYDfET.bydcMk>  ← app shell flex row
        [ThemeProvider (display:contents)]
        <div.sc-ewDXfa.iBEpFt>  ← layout wrapper
          <main.sc-kdwLBg.juPaZP>  ← main content
          <div.sc-fkLGVw.fpuKJN>  ← agent toolbar (28px bottom)


css
/* .bydcMk - App shell */
.bydcMk { 
  display: flex; 
  flex-direction: row; 
  width: 100%; height: 100%; 
  min-height: 100%; 
  transition: height 0.2s ease-out, min-height 0.2s ease-out; 
  align-items: stretch; 
  color: lch(10.317 0 94.879); 
  padding-right: env(safe-area-inset-right, 0px);
  padding-left: env(safe-area-inset-left, 0px);
}
Bemærk: Linear bruger env(safe-area-inset-*) — dvs. de understøtter notch-enheder.
**Sidebar:**


css
/* .ceBaRX - Sidebar container */
.ceBaRX {
  position: fixed;
  z-index: 96;
  will-change: transform;
  display: flex; flex-direction: column;
  max-width: min(-40px + 100vw, 330px);
  min-width: 220px;
  transition: box-shadow 0.15s ease-in;
  backdrop-filter: none;   /* light mode */
  background-color: lch(97.92 2.055 94.879);
  border: 0.5px solid lch(93.87 0.705 94.879);
}

/* .ielLHr - NAV element */
.ielLHr {
  position: relative;
  display: flex; flex-direction: column;
  flex-shrink: 0;
  height: 100%;
}
### --sidebar-width: 244px er det konfigurerbare mål.
**Main Content:**


css
/* .juPaZP - main */
.juPaZP {
  display: flex; flex-direction: column;
  flex: 1 1 auto;
  position: relative;
  overflow: hidden;
  place-items: stretch;
  background-color: lch(97.92 2.055 94.879);
  isolation: isolate;   /* Ny stacking context */
}
**Header:**


css
/* .eCvpg - page header */
.eCvpg {
  display: flex; align-items: center;
  gap: 12px; flex-shrink: 0;
  min-height: calc(var(--header-height, 57px) + 0.5px);
  transition: opacity 0.05s ease-in-out;
  background-color: var(--header-color);
  padding-right: max(8px, var(--scrollbar-width, 0px));
  padding-left: 8px;
}

# 5\. Komponent-Design i Detaljer
### Button-komponenten
### sc-kWmiKh er Linear's primære **Button** komponent (Styled Component). Den har ~24 distinkte varianter, genereret som separate CSS-klasser. De vigtigste:
### dtQOUT **— Standard Icon Button (28×28px):**


css
.dtQOUT {
  display: inline-flex;
  align-items: center; justify-content: center;
  border-radius: var(--radius-rounded);  /* 9999px – fuldpill */
  font-weight: var(--font-weight-medium);
  transition-property: border, background-color, color, opacity;
  transition-duration: var(--speed-highlightFadeOut);  /* 0.15s */
  user-select: none;
  app-region: no-drag;   /* Electron drag-region */
  border: 0.5px solid transparent;
  background-color: transparent;
  color: lch(20.633 2.028 94.879);
  min-width: 28px; height: 28px;
  padding: 0px 2px;
  font-size: var(--font-size-miniPlus);  /* 12px */
}
/* Hover: */
.dtQOUT:not(:disabled, [data-disabled="true"]):hover {
  background-color: lch(96.377 2.055 94.879);  /* ~#f6f5f1 */
  color: lch(10.317 0 94.879);
}
### foEVQZ **— Brand/Accent Button (Create new issue):**


css
background-color: lch(97.246 10.8 322.868);  /* #fff2ff – lys purple */
color: lch(0 5 322.868);                       /* #080008 – meget mørk purple */
/* Hover: */
background-color: lch(94.246 9.8 322.868);   /* lidt mere satureret */
### gepAXf **— Small Action Button (24×24px, i forms):**


css
background-color: lch(100 1.805 94.879);  /* hvid */
min-width: 24px; height: 24px;
padding: 0px 8px 0px 6px;
font-size: var(--font-size-mini);  /* 12px */
### ipoGAa **— Primary CTA Button (Create issue):**


css
background-color: lch(97.246 10.8 322.868);  /* lys purple */
color: lch(0 5 322.868);
height: 28px; padding: 0px 10px;
**Alle buttons deler:**
* border-radius: 9999px (pills) eller 8px (rundet rektangel)
* border: 0.5px solid (half-pixel border!)
* transition-duration: 0.15s (hurtig, snappy feedback)
* app-region: no-drag (Electron desktop support)

⠀Sidebar Navigation Item


css
/* .ceMjBf - nav link wrapper */
.ceMjBf {
  display: flex; align-items: center;
  border-radius: var(--control-border-radius, 4px);  /* 8px */
  margin: 1px 0px;
  position: relative;
  cursor: var(--pointer);
}
Nav items er 28px høje, med 8px border-radius. Aktiv item har baggrund lch(95.691 2.055 94.879) (~#f4f3ef).
### Toggle/Switch


css
/* .chSJNa - input toggle */
width: 30px; height: 20px;
border-radius: 72px;
/* ON state: */
background-color: lch(97.246 10.8 322.868);  /* Linear brand purple */
/* OFF state: */
background-color: lch(82.543 1.607 94.883);  /* ~#cecdca neutral */
Toggled er en native <input type="checkbox"> med CSS styling — ikke et custom component.
### Settings Card/Section


css
/* .sc-jbVHIj bmgdar - settings section card */
background-color: lch(100 1.805 94.879);   /* ~hvid */
border-radius: 11px;
border: 0.5px solid lch(95.95 0.455 94.879);
### Select/Dropdown Button


css
/* .gyZYsN + DzAIX */
height: 30px;
padding: 1px 28px 1px 10px;
border-radius: 8px;
border: 0.5px solid lch(93.25 0.455 94.879);
background-color: lch(100 1.805 94.879);  /* hvid */
font-size: 13px;
Drop-down pilen er positioneret absolut via padding-right: 28px.
### New Issue Modal


css
/* .kQKCsQ - modal card */
background-color: lch(100 1.805 94.879);
border: 0.5px solid lch(95.95 0.455 94.879);
border-radius: 22px;  /* ekstra rundt! */
box-shadow: 
  lch(0 0 0 / 0.08) 0px 9px 48px,   /* bred blød skygge */
  lch(0 0 0 / 0.1) 0px 6px 24px,    /* mellemskygge */
  lch(0 0 0 / 0.04) 0px 1px 1px;    /* subtil kontaktskygge */
max-width: 750px;
will-change: transform, opacity;
transition: max-width 300ms cubic-bezier(0.43, 0.07, 0.59, 0.94);
transform-origin: 50% 50% **!important**;
Det er 3-lags box-shadow — en teknik der giver dybde og "floating" effekt.

# 6\. Animationer
**Keyframe-animationer i systemet:**


css
@keyframes logoBackgroundPulse {
  0%   { opacity: 0; transform: scale(0.8); }
  70%  { opacity: 1; }
  100% { opacity: 0; transform: scale(1); }
}

@keyframes bootstrap-fade-in { 0% { opacity: 0; } }

@keyframes suspenseFadeIn {
  0%   { opacity: 0; }
  100% { opacity: 1; }
}

@keyframes inset-box-shadow-highlight-in {
  0%   { box-shadow: transparent 0px 0px 6px 3px inset; }
  100% { box-shadow: lch(97.246 10.8 322.868) 0px 0px 0px 1px inset; }
}

@keyframes loading-pulse { /* skeleton loading animation */ }

@keyframes claude-pulse { /* AI indicator pulse */ }

@keyframes swipe-out-left/right/up/down { /* toast dismiss */ }

@keyframes sonner-fade-in / sonner-fade-out { /* toast animations */ }
**Timing-tokens:**


css
--speed-highlightFadeIn:   0s      (instant)
--speed-highlightFadeOut:  0.15s   (very fast)
--speed-quickTransition:   0.1s    (quick)
--speed-regularTransition: 0.25s   (normal)
--speed-slowTransition:    0.35s   (slow)
**Easing-funktioner (komplet sæt):** Linear definerer et komplet sæt brugerdefinerede easing-kurver:


css
--ease-out-quad:      cubic-bezier(.25, .46, .45, .94)
--ease-out-cubic:     cubic-bezier(.215, .61, .355, 1)
--ease-out-quart:     cubic-bezier(.165, .84, .44, 1)
--ease-out-quint:     cubic-bezier(.23, 1, .32, 1)
--ease-out-expo:      cubic-bezier(.19, 1, .22, 1)
--ease-out-circ:      cubic-bezier(.075, .82, .165, 1)
--ease-in-out-quart:  cubic-bezier(.77, 0, .175, 1)
--ease-in-out-quint:  cubic-bezier(.86, 0, .07, 1)
--ease-in-out-expo:   cubic-bezier(1, 0, 0, 1)

# 7\. Border Radius System


css
--radius-rounded: 9999px   /* fuldpill */
--radius-circle:  50%       /* cirkel */
--control-border-radius: 8px  /* standard kontrol */
--editor-block-radius: 6px    /* editor blokke */
Knapper: 9999px (pills) eller 8px. Modals: 22px. Cards: 11px. Det er en bevidst hierarkisk skala.

# 8\. Spacing/Layout Tokens
**Editor-spacing:**


css
--editor-block-spacing:       1rem     (16px)
--editor-block-spacing-small: calc(.375 * 1rem)  (6px)
--editor-block-spacing-large: calc(1.375 * 1rem) (22px)
--editor-list-inset:          1.5rem   (24px)
--editor-safe-area:           16px
--editor-line-height:         1.6
--editor-font-size:           .9375rem (15px)
--editor-letter-spacing:      -.00666667em (subtil negativ tracking)
**App-dimensioner:**


css
--sidebar-width:        244px
--scrollbar-width:      11px
--agent-toolbar-height: 28px
--label-dot-size:       9px

# 9\. Icon-systemet
Linear bruger et **SVG Sprite Sheet** system med tre sæt:
* data-sprite-set="Base" — Funktionelle ikoner (Inbox, MyIssues, Projects, etc.)
* data-sprite-set="Brands" — Third-party brand-ikoner
* data-sprite-set="Decorative" — Dekorative illustrationer

⠀Alle ikoner i Base-settet er 16×16px viewBox med kun <path> elementer — clean, enkle ikoner. Ikonerne refereres via <use href="#IssueStatusBacklog"> syntax.
**Tilgængelige base-ikoner:** Attachment, Blockquote, Calendar, Checklist, CodeBlock, Comment, CreditCard, CustomView, Favorite, Folder, Home, Inbox, Initiative, IssueStatusBacklog, IssueStatusDone, IssueStatusReview, IssueStatusStarted, IssueStatusTodo, IssueStatusTriage, Label, Link, Lock, MilestoneNone, MilestoneStatusDone, MilestoneStatusPlanned, MilestoneStatusStarted, MyIssues, Project, Refresh, Search, Send, Subscribe, Team

# 10\. Editor: ProseMirror
**Issue-beskrivelser og titler redigeres med ProseMirror.** Linear har bygget et custom rigt tekstredigeringssystem oven på ProseMirror med:
* Custom node-typer: .text-node, .block-node, .list-node, .heading-node, .collapsible-heading, .collapsible-section, .tableContainer, .inline-comment, .diagram-source-node
* Custom widget-system via .ProseMirror-widget
* Samarbejdsmarkøre via .remote-cursor
* Readonly mode via .editor.readonly

⠀CSS for spacing er ekstremt kompleks med :is() selektor-kombinationer for nøjagtigt at kontrollere spacing mellem alle typer blokke — langt mere sofistikeret end et simpelt margin-system.


css
/* Eksempel på ProseMirror spacing-selektor kompleksitet: */
.iYapfE :is(.text-node, .collapsible-heading:not(:has(h3, h4))) 
+ :is(.text-node), 
.iYapfE :is(.text-node, .collapsible-heading:not(:has(h3, h4))) 
+ .ProseMirror-widget 
+ :is(.text-node)

# 11\. State Management: MobX
### vendor-mobx.Crhy2qQc.js er bundlet, og selvom MobX ikke eksponerer sig globalt, bruges det tydeligt som state management lag. Linear er kendt for at bruge MobX med et reaktivt model-lag. Bundlen indeholder MobX og sandsynligvis MobX-React for komponent-observability.

# 12\. Data & API: GraphQL
### vendor-graphql.DdKUT4az.js og vendor-graphql-request.cmz6U52W.js bekræfter GraphQL. Linear's API er public og dokumenteret som en GraphQL API — den interne web-app bruger naturligvis det samme lag.

# 13\. Routing: React Router v6
### vendor-react-router.DaDYXRDx.js + fiber-træet viste DataRouter, DataRouterState, Location, Navigation — alle React Router v6 DataAPI-komponenter. URLs er path-baserede (ikke hash-routing), f.eks. /ramtt-test/my-issues/assigned.

# 14\. Real-time Sync: Custom WebSocket
### SyncWebSocket.CnudlktO.js er Linear's custom real-time sync engine. Linear er kendt for at have bygget en **offline-first synkroniserings-arkitektur** med optimistiske updates. Signal.FNDixhWD.js er sandsynligvis en reaktiv signal/observable implementation til det reaktive data-layer.

# 15\. Tredjepartsbiblioteker
| **Bibliotek** | **Bundle** | **Formål** |
|:-:|:-:|:-:|
| **@radix-ui** | vendor-radix-ui.CllHmsTv.js | Primitive UI-komponenter (Tooltip, Dialog, Popover osv.) |
| **@dnd-kit** | vendor-dnd-kit.C5mi7t-E.js | Drag-and-drop (board view) |
| **Sonner** | Inline CSS | Toast notifikationer |
| **date-fns** | vendor-date-fns.o_8oEHXm.js | Dato-formatering |
| **@nivo** | vendor-nivo.VP7fux_7.js | Charts og grafer |
| **lodash** | vendor-lodash.BAAIdJM5.js | Utility functions |
| **Sentry** | vendor-sentry.DUIRvFmS.js | Error tracking |
| **@sanity/client** | vendor-sanity-client.DhG96cb9.js | "What's new" changelog content |
| **pluralize** | vendor-pluralize.DFnxlpbq.js | "1 issue" vs "2 issues" |

# 16\. Responsivt Design & Breakpoints


css
@media (max-width: 1023px)   /* Tablet */
@media (max-width: 1024px)   /* Tablet+ */
@media (max-width: 640px)    /* Mobile */
@media (max-width: 600px)    /* Small mobile */
@media (min-width: 1400px)   /* Large desktop */
@media (prefers-reduced-motion)
@media (hover: hover) / (hover: none)
@media (hover: none) and (pointer: coarse)  /* Touch devices */
@media print
@container embedded-list-row (max-width: 700px)
@container project-title-container (max-width: 500px)
Linear er primært desktop-fokuseret men har mobile breakpoints. De bruger CSS Container Queries for interne komponent-responsive layouts.

# 17\. Performance-teknikker
* **Service Worker** (data-sw-cache="true") — Offline caching
* will-change: transform på sidebar og modal for GPU-kompositing
* isolation: isolate på main content for ny stacking-context
* contain: layout style på header for layout containment
* font-display: swap på alle custom fonts
* @layer **cascade** for stylesheet-performance
* **SVG sprite** i stedet for individuelle icon-filer
* **Code splitting** — Linear loader >100 separate JS chunks on-demand
* **Rolldown bundler** med content-hashing for optimal caching

⠀
# 18\. Electron Desktop Support
Koden indeholder app-region: no-drag på alle knapper (for Electron's window-drag-region), og CSS-moduler som _draggableRegion_1ojkm_1 { app-region: drag }. Det bekræfter at Linear er et **cross-platform Electron app** med den nøjagtig samme kodebase som web-versionen — sandsynligvis ved at wrap'e web-appen i Electron.

# 19\. Tilgængelighed
* data-focus-trap-active på modals — fokus-fange til keyboard navigation
* data-disabled="true/false" som ARIA-state på knapper
* :focus-visible { outline: var(--focus-ring-outline) } — tydelig focus indikator
* user-select: none på knapper
* role="img" på SVG ikoner
* Linear Thai font-support

⠀
# Opsummering
Linear er et teknisk ekstremt velbygget produkt. Det mest bemærkelsesværdige er:
Det **LCH-baserede farve-system** er unikt i produktionsapps — de tager farvevidenskab seriøst. Den **igangværende migration fra Styled Components til et custom atomic CSS-system** (sx-) viser en bevidst teknisk gæld-håndtering. **React 18 Concurrent Mode** med MobX reaktivitet og custom WebSocket-sync er en kraftig kombination til den hurtige, responsive UI. **Font-weight 450 som "normal"** er et fint detaljevalg der giver Inter Variable dens karakteristiske luftige udseende i Linear. Og **3-lags box-shadow** på modals er et klassisk premium-design trick der skaber reel perceptuel dybde.




