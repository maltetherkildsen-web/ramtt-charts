# RAMTT System Audit

```bash
npm run audit
```

---

## Hvad er det?

En automatiseret kvalitetskontrol der scanner hele codebasen for designsystem-overtrædelser. Den tjekker at alle filer — UI-komponenter, chart primitives, math utilities og pages — følger de samme regler: Satoshi som eneste font, cursor: default overalt, ingen box-shadow, refs i stedet for state til hover, og meget mere.

Scriptet bor i `scripts/audit.ts` og kører på under et sekund.

## Kommandoer

| Kommando | Scope | Filer |
|----------|-------|-------|
| `npm run audit` | Alt | ~51 filer |
| `npm run audit:ui` | Kun UI-komponenter | ~13 filer |
| `npm run audit:charts` | Kun chart primitives + math | ~31 filer |

## De 4 faser

### Phase 1: UI Components (`components/ui/`)

Scanner alle 12+ UI-komponenter (Button, Badge, Card, Input, Select, osv.).

**Scope-specifikke checks:**
- Importerer fra `lib/ui.ts` (ikke hardcodede konstanter)
- Har `displayName`
- `forwardRef` på interaktive komponenter (Button, Input, Select, Toggle)
- Ingen template literals i className (brug `cn()`)
- Ingen hardcoded `fontFamily` i inline styles

**Integritetscheck:** Verificerer at `lib/ui.ts` eksporterer alle 21 påkrævede konstanter (WEIGHT, FONT, RADIUS, BORDER, TRANSITION, osv.).

### Phase 2: Chart Primitives (`components/charts/primitives/`)

Scanner alle 16+ chart primitives (ChartRoot, ChartLine, ChartBar, ChartDonut, osv.).

**Scope-specifikke checks:**
- `className` prop på alle visuelle primitives
- SVG `<text>` elementer har explicit `fontFamily` (Tailwind font-klasser virker ikke på SVG)
- Barrel exports i `lib/charts/index.ts` er komplette

**Whitelistede:** ChartSyncProvider og ChartZoomHandler er logic wrappers uden DOM — de behøver ikke className.

### Phase 3: Math Utilities (`lib/charts/`)

Scanner alle math-filer (scales, paths, ticks, utils).

**Checks:**
- Ingen eksterne chart-biblioteker importeret
- Ingen banned fonts
- Test-filer eksisterer for hver utility

### Phase 4: Pages (`app/`)

Scanner alle `.tsx` filer i app-mappen (demo, chart-test, color-guide, ui-demo, osv.).

Kører alle universelle checks (se nedenfor).

**Whitelistede:** `color-guide` og `generate-data` er undtaget fra hex-check fordi de viser farveværdier som data.

---

## Universelle checks (gælder ALLE filer)

Disse regler kører på tværs af alle 4 faser:

| Check | Hvad den fanger | Severity |
|-------|----------------|----------|
| **Banned fonts** | JetBrains Mono, Space Grotesk, Instrument Sans, Commit Mono, Inter | Error |
| **Cursor** | `cursor: pointer` eller `cursor: crosshair` | Error |
| **Box-shadow** | `box-shadow`, `boxShadow`, `shadow-sm/md/lg` (undtagen Tooltip/Select) | Error |
| **External chart deps** | Import af d3, recharts, highcharts, plotly, visx, osv. | Error |
| **transition-all** | `transition-all` eller `transition: all` | Error |
| **Hover state** | `useState` med hover/mouse/pointer i navnet | Error |
| **Hardcoded hex** | Neutral hex-farver (#131211, #FAF9F5, osv.) der burde være CSS vars | Error |
| **Banned weights** | `font-semibold`, `font-bold`, `font-light` | Error |
| **Uppercase** | `text-transform: uppercase` eller CSS `uppercase` klasse | Warning |
| **Letter-spacing** | `letter-spacing`, `letterSpacing`, `tracking-[...]` | Warning |

---

## Exit codes

| Code | Betydning |
|------|-----------|
| `0` | Ingen errors (warnings er OK) |
| `1` | En eller flere errors fundet |

Warnings er informationelle — de blokerer ikke CI, men bør adresseres over tid.

---

## Eksempel: alt er rent

```
━━━ RAMTT System Audit ━━━

Phase 1: UI components (13 files)
Phase 2: Chart primitives (20 files)
Phase 3: Math utilities (11 files)
Phase 4: Pages (7 files)

─── Results ───

✅ All files pass RAMTT system audit!

Audited 51 files across ui, charts, and pages.
```

## Eksempel: fejl fundet

```
━━━ RAMTT System Audit ━━━

Phase 1: UI components (13 files)
Phase 2: Chart primitives (20 files)
Phase 3: Math utilities (11 files)
Phase 4: Pages (7 files)

─── Results ───

❌ 2 ERROR(S):

  components/charts/primitives/ChartNew.tsx:42: Banned font "JetBrains Mono"
  app/demo/page.tsx:189: cursor: pointer is banned — use cursor: default

⚠️  1 WARNING(S):

  lib/charts/utils/newUtil.ts: No test file found

Audited 51 files across ui, charts, and pages.
```

---

## Hvornår skal auditen køres?

- **Altid** efter ændringer i `components/ui/`, `components/charts/primitives/`, eller `lib/charts/`
- **Før commit** af nye primitives eller math utilities
- **Som CI-gate** — exit code 1 fejler buildet

## Hvad gør man når auditen fejler?

1. Læs fejlmeddelelsen — den fortæller præcis hvad der er galt og hvad fikset er
2. Ret fejlen i den angivne fil og linje
3. Kør `npm run audit` igen
4. Gentag til `✅ All files pass`

---

## Whitelists

Nogle filer er legitimt undtaget fra visse checks. Disse er defineret øverst i `scripts/audit.ts`:

| Whitelist | Filer | Undtaget fra |
|-----------|-------|-------------|
| `CLASSNAME_WHITELIST` | ChartSyncProvider, ChartZoomHandler | className check |
| `HEX_CHECK_SKIP` | color-guide, chart-data, generate-data, tokens.css | Hardcoded hex check |
| Tooltip/Select/Modal | Alle filer med disse navne | Box-shadow check |

## Tilføje nye regler

Nye checks tilføjes i `scripts/audit.ts`:

1. Skriv en check-funktion: `function checkMyRule(path: string, content: string) { ... }`
2. Push til `ERRORS` (blokerer) eller `WARNINGS` (informationel)
3. Tilføj den i `runUniversalChecks()` hvis den gælder alle filer, eller i den relevante fase
4. Kør `npm run audit` for at verificere

---

## Filstruktur

```
scripts/
└── audit.ts              ← unified audit script

components/
├── ui/
│   └── RULES.md          ← UI system rules
└── charts/
    └── primitives/
        └── RULES.md      ← Chart system rules
```

De to RULES.md filer definerer *hvad* reglerne er. Audit scriptet *håndhæver* dem automatisk.
