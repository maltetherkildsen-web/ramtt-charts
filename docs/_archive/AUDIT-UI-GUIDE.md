# @ramtt/ui Design System Audit

> Automatisk kvalitetskontrol af hele codebasen mod designsystemets regler.

---

## Kør audit

```bash
npm run audit:ui
```

Det er alt. Scriptet scanner alle filer og rapporterer errors og warnings.

**Alternativt** (hvis npm script ikke virker):

```bash
npx tsx scripts/audit-ui.ts
```

---

## Hvad sker der?

Scriptet (`scripts/audit-ui.ts`) scanner **39+ filer** i fire faser:

| Fase | Hvad scannes | Antal filer |
|------|-------------|-------------|
| Phase 1 | `components/ui/*.tsx` — alle 12 UI komponenter | 12 |
| Phase 2 | `app/**/*.tsx` — alle sider/routes | 10+ |
| Phase 3 | `components/charts/primitives/*.tsx` — chart primitives | 17 |
| Phase 4 | `lib/ui.ts` — integritet af selve systemet | 1 |

---

## Resultat-typer

| Type | Betydning | Exit code |
|------|-----------|-----------|
| **Error** | Regel-brud der SKAL fixes | Exit 1 (fejl) |
| **Warning** | Anbefaling, ikke blokerende | Exit 0 (OK) |
| **Pass** | Ingen fejl overhovedet | Exit 0 (OK) |

---

## Alle regler der tjekkes

### Errors (blokerende)

#### 1. Hardcoded neutral hex-farver

Scriptet scanner for de 8 neutrale hex-værdier og kræver at CSS vars bruges i stedet.

| Hardcoded hex | Skal være |
|---------------|-----------|
| `#FAF9F5` | `var(--bg)` |
| `#FDFCFA` | `var(--n50)` |
| `#F2F0EA` | `var(--n200)` |
| `#E8E5DC` | `var(--n400)` |
| `#76726A` | `var(--n600)` |
| `#6B6760` | `var(--n800)` |
| `#383633` | `var(--n1050)` |
| `#131211` | `var(--n1150)` |

**Undtagelser:** Kommentarer, imports, og zone-definitioner (lines med `Zone`/`zone`/`Z1-Z6` + `color:`).

#### 2. Hardcoded font-weight klasser

| Forbudt | Brug i stedet |
|---------|---------------|
| `font-semibold` | `WEIGHT.strong` |
| `font-bold` | `WEIGHT.strong` (eller genovervej) |
| `font-light` | `WEIGHT.normal` (eller genovervej) |

#### 3. `transition-all` er banned

Altid brug specifikke transition-properties:

| Forbudt | Brug i stedet |
|---------|---------------|
| `transition-all` | `TRANSITION.colors` / `.background` / `.opacity` / `.transform` |

#### 4. Hardcoded `fontFamily` i inline styles

Ethvert `fontFamily:` i style-objects der ikke indeholder `var(--font-` er en error.

Brug `var(--font-sans)` eller `FONT.body` / `FONT.label` constants.

#### 5. UI komponenter SKAL importere fra `lib/ui`

Alle filer i `components/ui/*.tsx` skal have:

```ts
import { ... } from '@/lib/ui'
```

#### 6. UI komponenter SKAL have `displayName`

Alle filer i `components/ui/*.tsx` skal indeholde `.displayName = '...'`.

#### 7. `lib/ui.ts` eksport-integritet

Scriptet verificerer at ALLE 21 required exports findes:

```
WEIGHT, FONT, RADIUS, BORDER, TRANSITION,
LABEL_STYLE, VALUE_STYLE, MUTED_STYLE, UNIT_STYLE, BODY_STYLE, QUIET_STYLE,
HOVER_SAND, ACTIVE_SAND, ACTIVE_BLACK, WHITE_LIFT, ACTIVE_UNDERLINE, FOCUS_RING,
LAYOUT, SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X
```

Hvis nogen mangler = error.

---

### Warnings (ikke-blokerende)

#### 8. CSS `uppercase`

Sentence case er reglen. `uppercase` i CSS giver en warning.

**Tilladt uppercase (via data, ikke CSS):** Z1-Z6, FTP, CP, HR, BPM, RPM.

#### 9. `tracking-[...]` (letter-spacing)

Designsystemet bruger ingen letter-spacing. Giver warning.

#### 10. Tailwind `rounded-*` klasser

`rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl` osv. giver warning — brug `RADIUS.sm` / `.md` / `.lg` / `.xl` constants i stedet.

**Tilladt:** `rounded-full` og `rounded-[Npx]` (custom values via RADIUS constants).

#### 11. `font-medium` uden for `lib/ui.ts`

Giver warning — overvej at bruge `WEIGHT.medium` constant i stedet.

#### 12. Interaktive komponenter uden `forwardRef`

Button, Input, Select, Toggle filer uden `forwardRef` giver warning.

#### 13. Template literals i `className`

```tsx
// Warning:
className={`text-sm ${active ? 'bg-red' : ''}`}

// Korrekt:
className={cn('text-sm', active && 'bg-red')}
```

---

## Tilladte hex-farver (ignoreres af audit)

Disse hex-farver er eksplicit hvidlistet fordi de bruges til chart-data, zones og signals — ikke UI chrome:

```
#7ca3be  #14b8a2  #e8b020  #e36b30  #e83b52  #9b40e8   (zone colors)
#94a3b8  #22c55e  #eab308  #f97316  #ef4444  #dc2626   (Coggan zones)
#3b82f6  #8b5cf6  #a8a49a  #f43f5e                     (chart lines)
#1e1e1e  #2a2a2a                                        (dark dropdown)
#ffffff  #fff                                           (white)
```

---

## Eksempel output

### Rent (ingen fejl):

```
━━━ @ramtt/ui Design System Audit ━━━

Phase 1: Components (12 files)
Phase 2: App pages (10 files)
Phase 3: Chart primitives (17 files)
Phase 4: lib/ui.ts integrity

─── Results ───

✅ All files pass design system audit!

Audited 39 files across components, pages, and chart primitives.
```

### Med fejl:

```
━━━ @ramtt/ui Design System Audit ━━━

Phase 1: Components (12 files)
Phase 2: App pages (10 files)
Phase 3: Chart primitives (17 files)
Phase 4: lib/ui.ts integrity

─── Results ───

❌ 2 ERROR(S):

  app/my-page/page.tsx:42: Hardcoded #131211 → use var(--n1150)
  app/my-page/page.tsx:87: transition-all is banned → use TRANSITION constants

⚠️  1 WARNING(S):

  app/my-page/page.tsx:55: CSS uppercase found → sentence case is the rule

Audited 39 files across components, pages, and chart primitives.
```

---

## Hurtig reference

| Regel | Type | Fix |
|-------|------|-----|
| Hardcoded neutral hex | Error | Brug `var(--n*)` CSS vars |
| `font-semibold` / `font-bold` | Error | Brug `WEIGHT.strong` |
| `transition-all` | Error | Brug `TRANSITION.*` constants |
| Hardcoded `fontFamily` | Error | Brug `var(--font-sans)` |
| Manglende `lib/ui` import | Error | Tilføj import |
| Manglende `displayName` | Error | Tilføj `.displayName` |
| Manglende export i `lib/ui.ts` | Error | Tilføj manglende export |
| CSS `uppercase` | Warning | Brug sentence case |
| `tracking-[...]` | Warning | Fjern letter-spacing |
| Tailwind `rounded-*` | Warning | Brug `RADIUS.*` constants |
| `font-medium` direkte | Warning | Brug `WEIGHT.medium` |
| Manglende `forwardRef` | Warning | Tilføj `forwardRef` |
| Template literal i className | Warning | Brug `cn()` |

---

## Hvornår skal jeg køre audit?

- **Før du committer** — fang fejl inden de rammer repo
- **Efter Claude Code har lavet ændringer** — dobbelttjek at AI-genereret kode overholder reglerne
- **Når du er i tvivl** — hurtigere end at læse koden igennem selv

Det tager under 1 sekund at køre.

---

## Vedligeholdelse af audit-scriptet

De eksisterende regler er **permanente** — de ændres ikke. Men scriptet bør vokse med systemet:

### Hvad der allerede er dækket

Alt omkring farver, fonts, radius, borders, transitions, weights og tilgængelighed. De fundamentale regler.

### Hvad der bør tilføjes efterhånden

- **Nye tokens fra Ruth** — når zone-farver, serie-farver osv. besluttes og tilføjes som CSS vars, bør deres hex-værdier tilføjes til `HEX_TO_VAR`-listen i scriptet, så ingen hardcoder dem
- **Nye regler** — hvis I beslutter nye konventioner (f.eks. "ingen `gap-` under 4px" eller "ingen `z-` over 50"), tilføjes de som nye checks i `auditDesignSystem()` funktionen
- **Nye komponenter** — nye UI komponenter i `components/ui/` fanges automatisk af Phase 1 (ingen ændring nødvendig)
- **Nye sider** — nye routes i `app/` fanges automatisk af Phase 2 (ingen ændring nødvendig)

### Hvad der IKKE skal ændres

De eksisterende regler er fundamentet. Disse er permanente beslutninger:

- `transition-all` banned
- `WEIGHT` constants (400/450/500/550)
- `RADIUS` constants (4/5/12/16px)
- 0.5px borders via `BORDER` constants
- Satoshi som eneste UI font
- Sentence case (ingen CSS `uppercase`)
- Ingen `letter-spacing` / `tracking`

### Hvor tilføjer man nye regler?

I `scripts/audit-ui.ts`, i funktionen `auditDesignSystem()`. Mønsteret er altid det samme:

```ts
// Eksempel: ny regel for max z-index
for (let i = 0; i < lines.length; i++) {
  if (/z-\d{3,}/.test(lines[i]) && !lines[i].trim().startsWith('//')) {
    WARNINGS.push(`${path}:${i + 1}: z-index over 99 → keep z-index low`)
  }
}
```
