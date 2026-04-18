# @ramtt/ui — Status & Reference

> Sidst opdateret: 8. april 2026

---

## Hvad er bygget

Et komplet, hærdet design system med 12 komponenter, shared constants, og automatisk enforcement. Alt i `ramtt-charts` repoen.

### Systemet i tal

| Metric | Værdi |
|--------|-------|
| Komponenter | 12 |
| Foundation fil | `lib/ui.ts` (sizes, fonts, borders, radius, transitions, interaction states) |
| Type definitions | `types/ui.ts` |
| Design tokens | `components/ui/tokens.css` |
| Audit script | `npm run audit:ui` — 12/12 pass |
| Hardcoded font-family | 0 |
| Hardcoded border-radius | 0 |
| `transition-all` | 0 (banned) |
| Inline styles i demo | 0 |
| WCAG AA contrast | Alle par passer |
| NPM dependencies | 0 (zero-dependency) |

---

## De 12 komponenter

| Komponent | Fil | Formål |
|-----------|-----|--------|
| **Button** | `components/ui/Button.tsx` | Primary (sort), outline, ghost — sm/md/lg/icon |
| **Badge** | `components/ui/Badge.tsx` | Status pills — filled/outline, semantic + custom farver |
| **ToggleGroup** | `components/ui/ToggleGroup.tsx` | Default (connected), pill, underline (tabs) — multi-select |
| **Card** | `components/ui/Card.tsx` | Compound: Card.Header / Card.Title / Card.Body / Card.Action |
| **DataRow** | `components/ui/DataRow.tsx` | Key-value par med unit, delta, badge |
| **DataTable** | `components/ui/DataTable.tsx` | Typed kolonner, number formatting, klikbare rækker |
| **MetricCard** | `components/ui/MetricCard.tsx` | Label + value + unit + subtitle — standard + compact |
| **Input** | `components/ui/Input.tsx` | Text/number med label, unit suffix, useId() |
| **Select** | `components/ui/Select.tsx` | Dark dropdown (#1E1E1E) med keyboard nav + type-ahead |
| **SettingsCard** | `components/ui/SettingsCard.tsx` | Icon + title + description + chevron |
| **ProgressBar** | `components/ui/ProgressBar.tsx` | Horizontal bar med ARIA progressbar |
| **SectionHeader** | `components/ui/SectionHeader.tsx` | Sentence case label — renders som h2 |

---

## Font

**Satoshi for everything.** Cormorant Garamond kun til editorial (aldrig i app UI).

Loades via `next/font/local` fra `public/fonts/Satoshi-Variable.woff2`.

### Weight hierarchy (Figma-kalibreret)

| Weight | Constant | Bruges til |
|--------|----------|-----------|
| 400 | `WEIGHT.normal` | Body text, nav items, input text, unselected toggles |
| 450 | `WEIGHT.book` | Units (W, BPM, kJ), metadata, descriptions, subtitles |
| 500 | `WEIGHT.medium` | Badges, form labels, button text (primary/outline) |
| 550 | `WEIGHT.strong` | Section headers, card titles, values, active tabs, selected toggles |

### Uppercase regler

Kun fysiologiske forkortelser: **Z1–Z6, FTP, CP, HR, BPM, RPM**. Alt andet er sentence case.

---

## Design tokens (neutral skala)

```
--bg:    #FAF9F5  ← sand canvas
--n50:   #FDFCFA  ← card baggrund
--n200:  #F2F0EA  ← subtle borders, hover sand
--n400:  #E8E5DC  ← default borders, active sand
--n600:  #76726A  ← labels, muted text (4.55:1 WCAG AA)
--n800:  #6B6760  ← secondary text (5.29:1 WCAG AA)
--n1050: #383633  ← heavy text
--n1150: #131211  ← primary text, black fill
```

Semantiske farver: `positive` (lime), `negative` (rose), `warning` (amber), `info` (sky) — med soft/on-soft varianter.

---

## 5 interaction patterns

| Pattern | Constant | Tailwind | Bruges til |
|---------|----------|----------|-----------|
| Sand hover | `HOVER_SAND` | `hover:bg-[var(--n200)]` | Rækker, ghost buttons, settings cards |
| Sand fill | `ACTIVE_SAND` | `bg-[var(--n400)]` | Selected toggles, filtre |
| Black fill | `ACTIVE_BLACK` | `bg-[var(--n1150)] text-[var(--n50)]` | Primary CTA KUN |
| White lift | `WHITE_LIFT` | `hover:bg-white` | Cards på sand baggrund |
| Underline | `ACTIVE_UNDERLINE` | `border-b-2 border-[var(--n1150)]` | Tab navigation |

### Underline hover behavior

Underline variant i ToggleGroup har hover feedback: unselected tekst går fra `--n600` → `--n1150` on hover (150ms transition). Valgt tab har `--n1150` tekst + 2px underline.

### Text selection

Global `::selection` bruger `--n1050` baggrund med `--n50` tekst. Ingen browser-default blå synlig noget sted.

---

## Size scale

| Size | Height | Font size | Padding X | Bruges til |
|------|--------|-----------|-----------|-----------|
| xs | 18px | 11px | 6px | Badges (Figma-calibrated) |
| sm | 28px (h-7) | 12px | 10px | Small buttons, toggles |
| md | 32px (h-8) | 13px | 14px | Default buttons, inputs, selects |
| lg | 36px (h-9) | 14px | 18px | Large buttons |

---

## Filstruktur

```
lib/
├── ui.ts                  ← HJERTET: sizes, fonts, borders, radius, transitions
├── constants/colors.ts    ← Zone-farver, signal-farver, nutrient-farver
types/
├── ui.ts                  ← Shared TypeScript types
components/ui/
├── Button.tsx             ← 12 komponenter
├── Badge.tsx
├── ToggleGroup.tsx
├── Card.tsx
├── DataRow.tsx
├── DataTable.tsx
├── MetricCard.tsx
├── Input.tsx
├── Select.tsx
├── SettingsCard.tsx
├── ProgressBar.tsx
├── SectionHeader.tsx
├── index.ts               ← Barrel export (komponenter + utilities + types)
├── tokens.css             ← Design tokens + CRISP rendering
├── RULES.md               ← Non-negotiable system rules
├── README.md              ← Quick-reference
scripts/
├── audit.ts               ← npm run audit (unified — also `--scope ui` / `--scope charts`)
app/
├── ui-demo/page.tsx       ← Showcase af alle 12 komponenter
```

---

## Accessibility

- **forwardRef** + **displayName** på alle 12 komponenter
- **FOCUS_RING** (1px `--n1050` outline) på alle interaktive elementer — tynd, elegant
- **FOCUS_RING_THICK** (2px `--n1050` outline) på Input felter — tykkere fordi brugeren aktivt taster
- **ToggleGroup**: WAI-ARIA radiogroup/tablist/toolbar + roving tabindex + arrow keys
- **Select**: combobox + listbox + type-ahead + Escape to close
- **DataTable**: scope="col", Enter på klikbare rækker
- **SettingsCard**: role="button" + Enter/Space keyboard handler
- **ProgressBar**: role="progressbar" + aria-valuenow/min/max
- **Cursor**: default overalt, text kun i inputs, grab/grabbing kun for drag handles

---

## Enforcement

### Audit script

```bash
npm run audit:ui
```

Tjekker alle 12 komponenter for:
- ❌ Hardcoded fontFamily → brug FONT constants
- ❌ transition-all → brug TRANSITION constants
- ❌ Manglende displayName
- ❌ Manglende import fra lib/ui.ts
- ❌ Hardcoded border-[0.5px] uden BORDER import
- ⚠️ Manglende forwardRef på interactive components
- ⚠️ Manglende className prop
- ⚠️ Template literals i className (brug cn())
- ⚠️ Inline styles (undtagen dynamic runtime values)

### System rules

Fuldt dokumenteret i `components/ui/RULES.md`. De vigtigste:
- ALT importeres fra `lib/ui.ts`
- ALDRIG `transition-all`
- ALDRIG hardcoded fonts, borders, radius, weights
- ALDRIG `cursor-pointer`
- ALDRIG semantiske farver til tekst
- ALDRIG uppercase undtagen Z1–Z6, FTP, CP, HR, BPM, RPM
- Brug WEIGHT constants — aldrig hardcoded font-weight
- Cormorant Garamond er KUN editorial

---

## Brug i ny komponent

```tsx
import { cn, FONT, LABEL_STYLE, VALUE_STYLE, BORDER, RADIUS, FOCUS_RING, TRANSITION } from '@/lib/ui'

function MyWidget({ label, value, className }) {
  return (
    <div className={cn(BORDER.default, RADIUS.lg, 'p-3.5', className)}>
      <span className={LABEL_STYLE}>{label}</span>
      <span className={cn(VALUE_STYLE, 'text-[16px] font-medium text-[var(--n1150)]')}>
        {value}
      </span>
    </div>
  )
}
```

---

## Hvad der IKKE er bygget endnu

- Dark mode
- Responsive breakpoints (alt er desktop-first)
- Animation library (kun transitions, ingen keyframe animations)
- Toast/notification component
- Modal/dialog component
- Tooltip component
- Form validation
- i18n integration med useLocale()

---

## Git historik

| Commit | Beskrivelse |
|--------|------------|
| `5a17036` | System hardening: shared constants, Satoshi font, audit script |
| `fca4938` | README: document @ramtt/ui component library alongside charts |
| `b84e62d` | Accessibility: ARIA, forwardRef, keyboard nav, WCAG contrast |
| `8c35ed4` | Polish: Figma density, 3-font system, interaction states |
| `78555ec` | Component system: 12 components + tokens + demo page |
| `ebb93db` | Generic demo page: 4 non-sport chart examples at /demo |
