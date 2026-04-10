# Claude Code Brief — @ramtt/ui Component System

## Goal
Build a minimal, opinionated UI component library for RAMTT. Not a shadcn fork, not a wrapper — built from scratch with RAMTT's design tokens baked in. Every component should look like RAMTT out of the box, with zero configuration.

The purpose is twofold:
1. Replace shadcn as the go-to for building pages in the RAMTT app
2. Give Claude Code a vocabulary it can use without explanation — `import { MetricCard } from '@ramtt/ui'` just works

## Design Tokens (The Foundation)

Tokens are organized in three tiers. Understanding which tier a token belongs to determines whether it's fixed, adjustable, or fully dynamic.

### Tier 1 — Identity (FIXED, never change these)
These ARE RAMTT. They define the visual identity. Changing them means changing the brand.

```css
:root {
  /* ─── Neutral scale ─── */
  /* The warm, slightly yellow-tinted grey scale that makes RAMTT feel like RAMTT.
     NOT Tailwind zinc/slate/gray. These have warmth baked in. */
  --bg: #FAF9F5;       /* Page background — warm off-white */
  --n50: #FDFCFA;       /* Card/surface background — barely tinted */
  --n200: #F2F0EA;      /* Hover states, subtle fills, alternate rows */
  --n400: #E8E5DC;      /* Borders, dividers */
  --n600: #A8A49A;      /* Muted text, placeholders, icons */
  --n800: #6B6760;      /* Secondary text, units, subtitles */
  --n1050: #383633;     /* Strong secondary, dark UI elements */
  --n1150: #131211;     /* Primary text, headings — near-black with warmth */

  /* ─── Typography ─── */
  /* Three fonts, three roles. No exceptions. */
  --font-sans: 'Satoshi', sans-serif;     /* Body text, descriptions, UI copy */
  --font-label: 'Space Grotesk', sans-serif;       /* Section headers, labels, navigation — always uppercase */
  --font-mono: 'JetBrains Mono', monospace;        /* ALL numbers: values, stats, prices, dates, percentages */
  --font-serif: 'Cormorant Garamond', serif;       /* Editorial/marketing only — never in the app UI */

  /* ─── Spacing scale ─── */
  /* Fixed steps. Nothing in between. */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;

  /* ─── Border radius ─── */
  --radius-sm: 4px;     /* Badges, pills, small elements */
  --radius-md: 6px;     /* Buttons, inputs, toggle items */
  --radius-lg: 10px;    /* Cards, panels, containers */
  --radius-xl: 14px;    /* Large modals, hero sections */
}
```

### Tier 2 — Semantic (ADJUSTABLE, RAMTT's palette based on Figma's colors)
These map meaning to color. Based on Figma's battle-tested UI palette (Option C with 7 colors) — sharp, vivid, designed for interfaces.

**CRITICAL RULE: Semantic colors are NEVER used for text.**
Text is ALWAYS the neutral scale (`--n1150` primary, `--n1050` secondary, `--n800` muted).
Semantic colors are used for: badge fills, icon/dot colors, borders/accents, soft backgrounds.
The `-on-soft` variant is ONLY for text that sits on a colored `-soft` background (e.g., dark green text on a light green badge).

These CAN be adjusted, but the defaults below are the chosen palette. Components reference these tokens, not hardcoded hex values.

```css
:root {
  /* ─── Semantic colors ─── */
  /* USAGE: fills, icons, dots, borders, soft backgrounds — NEVER for body text.
     Text on --bg or --n50 is ALWAYS --n1150 / --n1050 / --n800.
     -soft = subtle tinted background (for badges, alerts, cards)
     -on-soft = text color ONLY when placed on a -soft background */

  --positive: #0ACF83;           /* Figma Green — badge fills, status dots, progress bars */
  --positive-soft: #e6faf2;      /* Subtle green bg for badges/alerts */
  --positive-on-soft: #07905b;   /* Text on --positive-soft backgrounds only */

  --negative: #F24E1E;           /* Figma Red-Orange — error badges, destructive icons */
  --negative-soft: #fde9e4;      /* Subtle red bg for error badges/alerts */
  --negative-on-soft: #b83a16;   /* Text on --negative-soft backgrounds only */

  --warning: #FFE156;            /* Warm Yellow — warning badge fills, icons */
  --warning-soft: #fff9e0;       /* Subtle yellow bg for warning badges/alerts */
  --warning-on-soft: #9e8a0a;    /* Text on --warning-soft backgrounds only */

  --info: #1ABCFE;               /* Figma Cyan — info badges, links as dots/icons */
  --info-soft: #e4f6ff;          /* Subtle cyan bg for info badges/alerts */
  --info-on-soft: #0d8bbf;       /* Text on --info-soft backgrounds only */

  /* ─── Accent colors (charts, categories, tags, data visualization) ─── */
  --accent-red: #FF7262;         /* Light Red — softer accent, secondary charts */
  --accent-purple: #A259FF;      /* Purple — categories, special states, chart series */
  --accent-indigo: #2F004F;      /* Deep Indigo — dark accent, contrast element */

  /* ─── Border style tokens ─── */
  --border-subtle: 0.5px solid var(--n400);
  --border-default: 1px solid var(--n400);
}
```

**How semantic colors are used in components:**
```
Badge "safe":       background: var(--positive-soft)  →  text: var(--positive-on-soft)
Badge "Z6":         background: var(--negative)       →  text: var(--n50)  (white on dark fill)
Status dot:         fill: var(--positive)  (just the dot, label text is --n1150)
Progress bar:       fill: var(--positive)  (track is --n200)
Alert card:         border-left: 3px solid var(--warning)  →  text: var(--n1150) as always
Metric subtitle:    "15% compliance" →  text: var(--n800)  with a colored dot/icon next to it
```

**Why Figma's palette?**
- Battle-tested by one of the best design teams in the world, specifically for UI/UX interfaces.
- All colors are vivid and sharp — they communicate instantly in small UI elements (badges, icons, dots).
- The palette covers all semantic roles plus three accent colors for data visualization and categories.
- Text remains in the neutral scale at all times — semantic colors only appear as fills, icons, and borders. This keeps the interface calm and readable while still communicating status clearly.

### Tier 3 — Domain (DYNAMIC, lives outside core)
These are sport-specific and do NOT belong in `tokens.css`. They live in the app or in `@ramtt/charts-sport`. Included here for reference only.

```css
/* These would be in the app's own CSS, NOT in @ramtt/ui */
:root {
  --zone-1: #94a3b8;   /* Recovery — grey */
  --zone-2: #22c55e;   /* Endurance — green */
  --zone-3: #eab308;   /* Tempo — yellow */
  --zone-4: #f97316;   /* Threshold — orange */
  --zone-5: #ef4444;   /* VO2max — red */
  --zone-6: #dc2626;   /* Anaerobic — dark red */
}
```

### Rules (Every Component Follows These)
**Borders:**
- Default: `0.5px`. Never 2px. Never bold borders.
- Between items in a list/strip: `0.5px solid var(--n400)`
- Card borders: `0.5px solid var(--n400)`
- Dividers/separators: `0.5px solid var(--n200)` (even more subtle)

**Typography hierarchy:**
- Labels/section headers: Space Grotesk, 11px, `letter-spacing: 0.08em`, `text-transform: uppercase`, `color: var(--n600)`
- Body text: Satoshi, 14px, `color: var(--n1150)`
- Secondary text: Satoshi, 13px, `color: var(--n800)`
- Muted/help text: Satoshi, 12px, `color: var(--n600)`
- ALL numbers/values: JetBrains Mono. No exceptions. If it's a digit, it's mono.
- Font-weight: 450 (regular) and 500 (medium) only. Never 600+. Hierarchy comes from size + color, not weight.
  - **Why 450?** Satoshi is a variable font (confirmed: `InstrumentSans-VariableFont_wdth,wght.ttf` with weight+width axes). Linear uses 450, Claude uses 430 — the "between regular and medium" weight reads as refined and slightly more present than 400 without feeling heavy. Load Satoshi as a variable font via `@font-face` with `font-weight: 100 900` range, then use 450 as the default body weight.

**Interaction:**
- Hover: `background: var(--n200)`, `transition: all 150ms`. Never color shifts, never shadows.
- Active/selected: `background: var(--n1150); color: var(--n50)` (inverted). See the ToggleGroup filter buttons.
- Focus: `outline: 2px solid var(--n600); outline-offset: 2px`. No box-shadow focus rings.

**Surfaces:**
- Page: `--bg` (#FAF9F5)
- Cards/panels: `--n50` (#FDFCFA)
- Hover/alternate: `--n200` (#F2F0EA)
- No shadows anywhere. No gradients. No glow. Flat and clean.

**Components:**
- All components accept `className` prop for Tailwind overrides
- Spacing uses the fixed scale only: 4, 8, 12, 16, 20, 24, 32px

---

## Components to Build (12 total)

### 1. MetricCard
The most-used component in the app. Displays a labeled value.

**Variants seen in screenshots:**
- Simple: "DURATION" → "1:28:40" (session metrics strip)
- With subtitle: "AVG POWER" → "238 W" → "Max 904W"
- With status color: "FORM" → "-8 → -14" → "-6 loaded" (green text)
- With badge: "ENERGY ZONE" → badge "Z6" → "192 g"
- Compact: Perplexity's "Volume 573.43K" / "P/E Ratio 102.13" (key-value inline)
- Status card: "TRAINING LOAD" → "40" → "CAPACITY" (settings dashboard)

```tsx
// Usage examples:
<MetricCard label="DURATION" value="1:28:40" />
<MetricCard label="AVG POWER" value="238" unit="W" subtitle="Max 904W" />
<MetricCard label="FORM" value="-8 → -14" subtitle="-6 loaded" subtitleColor="positive" />
<MetricCard label="ENERGY ZONE" value="192" unit="g" subtitle="of 200g" badge={{ label: "Z6", color: "zone-6" }} />
```

**Props:**
- `label: string` — uppercase caption (Space Grotesk, 11px, tracking-wider, --n600)
- `value: string | number` — large display (JetBrains Mono, 20-24px, --n1150)
- `unit?: string` — small suffix after value (14px, --n800)
- `subtitle?: string` — below value (12px, --n800)
- `subtitleColor?: 'positive' | 'negative' | 'warning' | 'default'`
- `badge?: { label: string; color: string }` — small pill next to value
- `compact?: boolean` — inline key-value layout (for sidebars/tables)
- `className?: string`

**Structure:** No border by default (lives inside a card or grid). The metrics strip at the top of session view is a flex row of MetricCards with `border-right: 0.5px solid var(--n400)` between them — that's layout, not the component's job.

---

### 2. Badge
Small colored pill for status, zones, tags.

**Variants seen:**
- Zone badge: "Z6" with red background
- Score badge: "Effort 7", "Quality 8", "Legs 7" (outline style)
- Change badge: "+7.55%" green, "-0.07%" red (Perplexity)
- Status badge: "safe" green, "optimal" green, "Build" yellow (session context)

```tsx
<Badge>Z6</Badge>
<Badge variant="outline">Effort 7</Badge>
<Badge color="positive">+7.55%</Badge>
<Badge color="negative">-0.07%</Badge>
<Badge color="warning">Build</Badge>
```

**Props:**
- `children: ReactNode`
- `variant?: 'filled' | 'outline'` — filled = colored bg, outline = border only
- `color?: 'default' | 'positive' | 'negative' | 'warning' | 'zone-1' ... 'zone-6' | string`
- `size?: 'sm' | 'md'` — sm = 10px font, md = 12px font
- `className?: string`

**Styling:** `border-radius: var(--radius-sm)` (4px). Filled: colored bg at 10-15% opacity, text in full color. Outline: `0.5px` border, transparent bg.

---

### 3. ToggleGroup
Row of toggle buttons for switching views/filters. This is THE component that appears everywhere.

**Variants seen:**
- Channel toggles: "Power | HR | Speed | Cadence | Elevation | Fuel" (session)
- Zone toggles: "Off | Power | HR" (smaller, right-aligned)
- Time period: "1D | 5D | 1M | 6M | YTD | 1Y | 5Y | MAX" (Perplexity)
- Filter pills: "ALL | INFO | WARNING | CRITICAL" (signals page)
- Time period small: "7D | 14D | 30D" (settings trends)

```tsx
<ToggleGroup
  value={selected}
  onChange={setSelected}
  options={[
    { value: 'power', label: 'Power' },
    { value: 'hr', label: 'HR' },
    { value: 'speed', label: 'Speed' },
  ]}
/>

<ToggleGroup
  value={period}
  onChange={setPeriod}
  size="sm"
  options={['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'MAX']}
/>
```

**Props:**
- `options: (string | { value: string; label: string })[]`
- `value: string` — currently selected
- `onChange: (value: string) => void`
- `size?: 'sm' | 'md' | 'lg'` — sm for compact filters, md default, lg for primary navigation
- `variant?: 'default' | 'pill'` — default = connected buttons, pill = separate rounded pills
- `multi?: boolean` — allow multiple selection (for filter groups)
- `className?: string`

**Styling:** Connected border, shared border-radius on outer edges only. Selected: `bg: var(--n1150); color: var(--n50)`. Unselected: `bg: transparent; color: var(--n800)`. Hover: `bg: var(--n200)`. Border: `0.5px solid var(--n400)`.

---

### 4. Card
Container with border and optional header. Everything lives inside cards.

```tsx
<Card>
  <Card.Header>
    <Card.Title>Data Density</Card.Title>
    <Card.Action><Button size="sm">Mark all read</Button></Card.Action>
  </Card.Header>
  <Card.Body>
    {/* content */}
  </Card.Body>
</Card>
```

**Props:**
- `children: ReactNode`
- `padding?: 'none' | 'sm' | 'md' | 'lg'` — default 'md' (16px 20px)
- `className?: string`

**Styling:** `bg: var(--n50)`. `border: 0.5px solid var(--n400)`. `border-radius: var(--radius-lg)` (10px). No shadow.

---

### 5. DataRow
Key-value row for data display. Used in tooltips, sidebars, detail panels.

**Variants seen:**
- Perplexity tooltip: "Close $110.25", "Open $110.28", "Volume 3,603,495"
- Session readout: "Power 167 W -92" with zone badge
- Settings status: "TRAINING LOAD 40 CAPACITY"

```tsx
<DataRow label="Close" value="$110.25" />
<DataRow label="Power" value="167" unit="W" delta="-92" badge={<Badge>Z2</Badge>} />
<DataRow label="Volume" value="3,603,495" />
```

**Props:**
- `label: string` — left side (14px, --n600)
- `value: string | number` — right side (14px, JetBrains Mono, --n1150)
- `unit?: string` — suffix (12px, --n800)
- `delta?: string | number` — change indicator after value
- `deltaColor?: 'positive' | 'negative' | 'default'`
- `badge?: ReactNode` — rendered after value
- `className?: string`

**Styling:** Flex row, `justify-between`, `padding: 6px 0`, optional `border-bottom: 0.5px solid var(--n200)` between rows.

---

### 6. SectionHeader
Uppercase label that introduces a section. Appears everywhere in the app.

**Seen as:** "PEAK POWERS", "ACTIVITY", "FUEL LOG", "TRENDS", "RECOVERY QUALITY", "TOP GAPS"

```tsx
<SectionHeader>Peak Powers</SectionHeader>
<SectionHeader action={<Button size="sm">+ Add intake</Button>}>Fuel Log</SectionHeader>
```

**Props:**
- `children: string` — auto-uppercased
- `action?: ReactNode` — right-aligned action button/link
- `className?: string`

**Styling:** Space Grotesk, 11px, `letter-spacing: 0.08em`, `text-transform: uppercase`, `color: var(--n600)`. `padding-bottom: 8px`. Optional `border-bottom: 0.5px solid var(--n200)`.

---

### 7. Button
Minimal button with clear hierarchy.

**Variants seen:**
- Primary: "Mark all read" (filled dark)
- Secondary: "Query transcripts", "Ask Buffett" (outline)
- Ghost: "READ", "DISMISS" (no border, just text)
- Small icon buttons (Perplexity's chart toolbar icons)

```tsx
<Button>Mark all read</Button>
<Button variant="outline">Query transcripts</Button>
<Button variant="ghost" size="sm">READ</Button>
<Button size="icon"><ExpandIcon /></Button>
```

**Props:**
- `children: ReactNode`
- `variant?: 'primary' | 'outline' | 'ghost'`
- `size?: 'sm' | 'md' | 'lg' | 'icon'`
- `disabled?: boolean`
- `onClick?: () => void`
- `className?: string`

**Styling:**
- Primary: `bg: var(--n1150); color: var(--n50); border-radius: var(--radius-md)`. Hover: slight opacity.
- Outline: `bg: transparent; border: 0.5px solid var(--n400); color: var(--n1050)`. Hover: `bg: var(--n200)`.
- Ghost: no bg, no border. `color: var(--n800)`. Hover: `bg: var(--n200)`.
- All: `font-family: var(--font-sans)`, `font-size: 13px`, `padding: 6px 14px`, `transition: all 150ms`.

---

### 8. SettingsCard
Card with icon, title, description, and optional chevron. For settings/navigation lists.

**Seen on:** Settings page — "Integrations", "Coach Connections", "Athlete Profile", "Thresholds & Zones", "Data Integrity"

```tsx
<SettingsCard
  icon={<IntegrationsIcon />}
  title="Integrations"
  description="Connect and sync Strava and wearables."
  onClick={() => navigate('/settings/integrations')}
/>
```

**Props:**
- `icon?: ReactNode` — 20x20 icon
- `title: string` — Satoshi, 15px, --n1150
- `description?: string` — 13px, --n800
- `onClick?: () => void` — adds chevron and hover state
- `className?: string`

**Styling:** `bg: var(--n50); border: 0.5px solid var(--n400); border-radius: var(--radius-lg); padding: 20px 24px`. Hover (if onClick): `bg: var(--n200)`. Chevron: `→` or `›` in --n600, right-aligned.

---

### 9. DataTable
Simple, clean table for structured data.

**Seen as:** Perplexity's historical data table, fuel log entries, signal list.

```tsx
<DataTable
  columns={[
    { key: 'date', label: 'Date', width: '120px' },
    { key: 'open', label: 'Open', align: 'right', format: 'number' },
    { key: 'close', label: 'Close', align: 'right', format: 'number' },
    { key: 'volume', label: 'Volume', align: 'right', format: 'number' },
  ]}
  data={rows}
  onRowClick={(row) => handleClick(row)}
/>
```

**Props:**
- `columns: { key: string; label: string; width?: string; align?: 'left' | 'right'; format?: 'number' | 'date' | 'string' }[]`
- `data: Record<string, any>[]`
- `onRowClick?: (row: any) => void`
- `className?: string`

**Styling:**
- Header: Space Grotesk, 11px uppercase, --n600, `border-bottom: 0.5px solid var(--n400)`
- Rows: 14px Satoshi (text) / JetBrains Mono (numbers), `padding: 10px 0`, `border-bottom: 0.5px solid var(--n200)`
- Hover: `bg: var(--n200)` if clickable
- Numbers right-aligned with tabular-nums

---

### 10. ProgressBar
Simple horizontal bar for percentages/completion.

**Seen as:** Quality Index bar on signals page, fuel progress (192g of 200g)

```tsx
<ProgressBar value={43} max={100} />
<ProgressBar value={192} max={200} color="positive" label="192g of 200g" />
```

**Props:**
- `value: number`
- `max: number`
- `color?: 'default' | 'positive' | 'negative' | 'warning' | string`
- `label?: string` — shown to the right
- `height?: number` — px, default 6
- `className?: string`

**Styling:** Track: `bg: var(--n200); border-radius: 3px`. Fill: `bg: var(--n1150)` default, or semantic color. Smooth transition on value change.

---

### 11. Input
Text input field.

```tsx
<Input placeholder="Search..." />
<Input label="FTP" value={ftp} onChange={setFtp} type="number" unit="W" />
```

**Props:**
- Standard input props (`value`, `onChange`, `placeholder`, `type`, `disabled`)
- `label?: string` — above input
- `unit?: string` — suffix inside input (right-aligned, --n600)
- `className?: string`

**Styling:** `bg: var(--n50); border: 0.5px solid var(--n400); border-radius: var(--radius-md); padding: 8px 12px; font-size: 14px`. Focus: `border-color: var(--n800); outline: none`. Placeholder: `color: var(--n600)`.

---

### 12. Select
Dropdown select.

```tsx
<Select
  value={status}
  onChange={setStatus}
  options={[
    { value: 'active', label: 'Active' },
    { value: 'dismissed', label: 'Dismissed' },
  ]}
/>
```

**Props:**
- `options: { value: string; label: string }[]`
- `value: string`
- `onChange: (value: string) => void`
- `placeholder?: string`
- `label?: string`
- `className?: string`

**Styling:** Same as Input. Chevron indicator on right side (CSS-only, no icon dependency).

---

## File Structure

```
components/ui/
├── tokens.css              ← CSS custom properties (imported once in layout.tsx)
├── MetricCard.tsx
├── Badge.tsx
├── ToggleGroup.tsx
├── Card.tsx
├── DataRow.tsx
├── SectionHeader.tsx
├── Button.tsx
├── SettingsCard.tsx
├── DataTable.tsx
├── ProgressBar.tsx
├── Input.tsx
├── Select.tsx
└── index.ts                ← barrel export
```

## Implementation Rules

### DO
- Use CSS custom properties from `tokens.css` for all colors, fonts, radii
- Use Tailwind utility classes where they map cleanly (`flex`, `gap-3`, `px-4`)
- Use `className` prop on every component for overrides
- Use `forwardRef` on all interactive components
- Use JetBrains Mono for ANY number display (values, percentages, prices, counts)
- Use Space Grotesk for ALL labels and section headers
- Use Satoshi for body text and descriptions
- Keep every component in a single file (no separate CSS files)
- Support both controlled and uncontrolled patterns where applicable

### DON'T
- Don't import shadcn anything. This replaces it.
- Don't add any npm dependencies. Pure React + Tailwind + CSS vars.
- Don't use box-shadow anywhere.
- Don't use gradients anywhere (except in charts).
- Don't use border-width above 1px. Default is 0.5px.
- Don't use font-weight above 600. Hierarchy comes from size + color, not weight.
- Don't add dark mode yet. Get light mode perfect first.
- Don't build a Tooltip component yet — that's complex and ties into the chart system. Defer it.

## Demo / Test Page

Create `app/ui-demo/page.tsx` that showcases every component in context:

1. **Metrics strip** — row of 6-8 MetricCards simulating a session header
2. **ToggleGroup examples** — time periods, channel selector, filter pills
3. **Card with DataRows** — mimicking a Perplexity-style tooltip/detail panel
4. **Settings list** — stack of SettingsCards
5. **DataTable** — historical price data or similar
6. **Badges gallery** — all variants and colors
7. **Form elements** — Input + Select + Button combinations
8. **ProgressBar** — various states

This page serves as both visual QA and documentation.

## Success Criteria
- Every component renders correctly with zero props except required ones
- The demo page looks like it belongs on ramtt.app — same visual language as screenshots
- Claude Code can build a new page using only `@ramtt/ui` imports and it looks right
- No shadcn imports anywhere in new pages
- Total bundle addition: < 8KB (these are simple components)
- Every number on screen uses JetBrains Mono
- Every label uses Space Grotesk uppercase
- Borders are 0.5px everywhere
- Hover states are subtle (--n200 background, 150ms transition)

## Migration Path
Once this is built and validated on the demo page:
1. Pick one existing page (e.g., settings) and replace shadcn components with @ramtt/ui
2. Verify it looks better with less code
3. Gradually migrate remaining pages
4. Eventually remove shadcn dependency entirely

## Visual Reference
The uploaded screenshots show:
- `localhost:5000/chart-test` — session view with metrics strip, charts, fuel log (TARGET QUALITY for MetricCard, Badge, ToggleGroup, SectionHeader)
- `ramtt.app/settings` — SettingsCards, status dashboard, trends charts (TARGET QUALITY for SettingsCard, Card)
- `ramtt.app/settings/signals` — Signal Center with filters, data table, progress bar (TARGET QUALITY for ToggleGroup pill variant, DataTable, ProgressBar)
- `perplexity.ai/finance/*` — tooltips, historical data, prediction markets (INSPIRATION for DataRow, DataTable, Badge change indicators)
- Claude chat artifact — session analysis view (INSPIRATION for clean metric card layout)

---

## Competitive Reference — Why These Design Decisions

We reverse-engineered four best-in-class product UIs (Perplexity, Claude.ai, Figma, Linear) using Chrome DevTools, React fiber tree inspection, and stylesheet analysis. Every design decision in this brief is validated against real production code from these apps. This section documents the patterns so you understand *why* — not just *what*.

### The Warm Off-White Consensus
All four apps converge on the same base background color:

| App | Hex | System |
|-----|-----|--------|
| Linear | `#faf9f5` | LCH (hue 94.879, chroma 2.055) |
| Claude | `#faf9f5` | HSL-based (--bg-100) |
| Perplexity | `#faf8f5` | oklch-based (--bg-base) |
| Figma | `#f5f5f5` | Slightly cooler, more neutral |
| **RAMTT** | **`#FAF9F5`** | Matches Linear and Claude exactly |

This is not coincidence. The warm off-white has become the signature of premium product design. It reads as paper-like, calm, and professional without the clinical sterility of pure white.

### The 0.5px Border Standard
All four apps use 0.5px borders as their default:
- **Linear:** `0.5px solid lch(93.87...)` on sidebar, cards, buttons, modals, selects
- **Claude:** `0.5px solid rgba(31,30,29,0.15)` on project cards, inputs, sidebar
- **Perplexity:** `0.5px solid` on filter chips, sidebar items
- **Figma:** `1px solid #e6e6e6` (the exception — Figma uses 1px)
- **RAMTT:** `0.5px solid var(--n400)` — matches the majority

### Variable Font Weights — The 450 Discovery
All four apps use variable fonts with non-standard weights between 400-500:
- **Linear:** Inter Variable at **450** as "normal" (`--font-weight-normal: 450`)
- **Claude:** Anthropic Sans at **430** as default body weight
- **Perplexity:** pplxSans at 400/500/550 (compresses the entire weight range, never uses 600+)
- **Figma:** Satoshi/Inter at **450** as default (`--font-weight-default: 450`)

**RAMTT adopts this pattern.** Satoshi IS a variable font (`InstrumentSans-VariableFont_wdth,wght.ttf` confirmed on disk at `docs/fonts/`). The weight axis supports the full 100-900 range. Use **450** as default body weight — it's the sweet spot that all four reference apps have independently converged on.

### Elevation Without Shadows
None of the four apps use box-shadow on standard cards or surfaces:
- **Linear:** Settings cards: `background: white, border: 0.5px, radius: 11px` — no shadow
- **Claude:** Project cards: `bg: transparent, border: 0.5px` — no shadow, no background fill
- **Perplexity:** Cards use `--bg-raised: #fdfbfa` (background color shift) for elevation — no shadow
- **Figma:** File cards use `outline: 2px solid #0d99ff` on hover instead of shadow

Shadows are reserved exclusively for floating elements (modals, dropdowns, tooltips). RAMTT's "no shadows anywhere" rule for cards is correct.

### Button Design — Dark Charcoal Primary
Three of four apps use near-black as primary button color (not brand color):
- **Claude:** `#141413` (warm charcoal)
- **Perplexity:** `#27251e` (warm charcoal)
- **Linear:** Light purple tint (brand-inflected, but still muted)
- **Figma:** `#0d99ff` (brand blue — exception for CTA)
- **RAMTT:** `var(--n1150): #131211` — matches Claude and Perplexity

### Text Hierarchy Patterns
All four apps keep text exclusively in neutral scales. Semantic colors (green, red, yellow) appear only as fills, icons, dots, and borders — never as body text color.

- **Perplexity:** One charcoal color at four opacity levels (100%, 65%, 14%, 7%)
- **Claude:** Three distinct hex values (#141413, #3d3d3a, #73726c)
- **Linear:** Four LCH values with identical hue/chroma, varying only lightness
- **RAMTT:** Four hex values (--n1150, --n1050, --n800, --n600) — correct approach

### Transition Timing
- **Linear:** `0.15s` for highlight transitions
- **Claude:** `35ms` base with `75ms` delay (deliberately slow sidebar)
- **Perplexity:** ~150ms estimated
- **RAMTT:** `150ms` — industry standard

### Border Radius Scale Comparison

| Element | Linear | Claude | Perplexity | Figma | RAMTT |
|---------|--------|--------|------------|-------|-------|
| Badges/pills | 9999px | 9999px | 9999px | 4px | 4px |
| Buttons | 8-9999px | 8px | 6-8px | 5px | 6px |
| Cards | 11px | 12px | 12px | 13px | 10px |
| Inputs | 8px | 9.6px | 12px | 8px | 6px |
| Modals | 22px | 20px | 16px | 13px | 14px |

RAMTT's radii are slightly tighter than the competition — a more structured, less bubbly aesthetic. This is intentional and correct.

---

## Font Loading — Critical Implementation Detail

All four RAMTT fonts are **variable fonts** — confirmed on disk. This means we load ONE file per font (+ italic variant where available) instead of multiple static weight files. Use woff2 where available (Space Grotesk has it), ttf otherwise.

Font files live in the repo at `docs/fonts/`. Copy them to `public/fonts/` for Next.js serving.

```css
/* ═══ tokens.css — Font Loading ═══ */

/* ─── Satoshi (body text, UI copy) ─── */
/* Variable: weight + width axes */
@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/InstrumentSans-VariableFont_wdth,wght.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: 'Satoshi';
  src: url('/fonts/InstrumentSans-Italic-VariableFont_wdth,wght.ttf') format('truetype');
  font-style: italic;
  font-weight: 100 900;
  font-display: swap;
}

/* ─── JetBrains Mono (ALL numbers, values, stats) ─── */
/* Variable: weight axis */
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: 'JetBrains Mono';
  src: url('/fonts/JetBrainsMono-Italic-VariableFont_wght.ttf') format('truetype');
  font-style: italic;
  font-weight: 100 900;
  font-display: swap;
}

/* ─── Space Grotesk (labels, section headers — always uppercase) ─── */
/* Variable: weight axis. woff2 available for better compression. */
@font-face {
  font-family: 'Space Grotesk';
  src: url('/fonts/SpaceGrotesk-Variable.woff2') format('woff2'),
       url('/fonts/SpaceGrotesk-Variable.woff') format('woff'),
       url('/fonts/SpaceGrotesk-Variable.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
}

/* ─── Cormorant Garamond (editorial/marketing ONLY — never in app UI) ─── */
/* Variable: weight axis */
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('/fonts/CormorantGaramond-VariableFont_wght.ttf') format('truetype');
  font-weight: 100 900;
  font-display: swap;
}
@font-face {
  font-family: 'Cormorant Garamond';
  src: url('/fonts/CormorantGaramond-Italic-VariableFont_wght.ttf') format('truetype');
  font-style: italic;
  font-weight: 100 900;
  font-display: swap;
}
```

Then in the body/root CSS:
```css
body {
  font-family: var(--font-sans);
  font-weight: 450;  /* The magic number — between regular and medium */
}
```

### Why 450?
Linear uses 450, Claude uses 430, Figma uses 450. The "between regular and medium" weight reads as refined and slightly more present than 400 without feeling heavy. Since all four RAMTT fonts are variable, we can use any weight value — no need to round to 400/500.

### Weight usage across the system:
- **Body text** (Satoshi): **450** — the default, slightly heavier than book
- **Medium emphasis** (Satoshi): **500** — for interactive elements, selected states
- **Labels** (Space Grotesk): **500** — uppercase labels need a touch more weight
- **Numbers** (JetBrains Mono): **400** — mono fonts read heavier naturally, keep at 400
- **Editorial** (Cormorant Garamond): **400** — serif fonts read heavier, keep light

### Important: Do NOT use Next.js `next/font` for these
Since the fonts live locally in the repo (not from Google Fonts), load them via `@font-face` in `tokens.css`. Do not use `next/font/local` — it adds complexity and CSS module class names that conflict with the CSS custom property approach. Simple `@font-face` + CSS vars is the correct pattern here.

---

## Cormorant Garamond — Usage Rules

Garamond is RAMTT's editorial voice. It appears in "Editorial Mode" — share cards, race recaps, RAMTT Letters, onboarding, marketing. The surfaces that need to *feel*. It is never used in "Functional Mode" (dashboards, settings, data tables).

A complete Type System v3 reference document exists at `docs/ramtt-type-system-v3.html` — consult it for the full scale with visual examples. The key rules are summarized below.

### Rule 1: Inverse weight relationship — the bigger, the thinner
This is the defining characteristic of RAMTT's editorial typography. It creates an elegant, old-world feel that no fitness app has:

| Size | Weight | Tracking | Usage |
|------|--------|----------|-------|
| 48-68px (Display) | **300** (Light) | -0.03em | Hero headlines, landing page |
| 36-44px (Headline 1) | **300** (Light) | -0.02em | Section headers, article titles |
| 24-32px (Headline 2) | **400** (Regular) | -0.015em | Card headers, share titles |
| 18-22px (Headline 3) | **500** (Medium) | -0.01em | Sub-sections, sidebar titles |
| 15-16px (Body) | **400** (Regular) | 0 | Lead paragraphs, editorial prose |

**Critical: Never use bold (600+) Garamond for anything. Never use 500 at sizes above 44px.** A 48px light Garamond looks like a luxury brand. A 48px bold Garamond looks like a tabloid headline.

### Rule 2: Oldstyle numerals
When Garamond displays numbers, always enable oldstyle (lowercase) numerals:
```css
font-feature-settings: 'onum' 1;
```
Oldstyle numerals have descenders and ascenders — the 3, 4, 5, 7, 9 dip below the baseline. This gives numbers a flowing, text-like quality. This is specifically why Garamond numbers look beautiful in editorial contexts.

**Important distinction:** JetBrains Mono uses `font-variant-numeric: tabular-nums` (lining, fixed-width) for data. Garamond uses `'onum' 1` (oldstyle, proportional) for editorial. Opposite approaches for opposite purposes.

### Rule 3: Almost never italic
Italic is used for exactly one purpose: a single *emphasized word* inside a headline, like "The Carbohydrate *Timing* Paradox". Never full italic sentences. The upright form is the beauty.

The one exception: the nav subtitle / tagline pattern — "Type System" in italic 300 next to the bold RAMTT logo. This is a specific compositional choice, not general usage.

### Rule 4: Two modes — Editorial vs. Functional
The same data can be shown in two modes:

**Editorial (Cormorant):** Race recap share card with "1:28:34" at 56px/300 in Garamond on a dark navy background with cream text. This is for sharing, storytelling, emotional impact.

**Functional (Satoshi):** Dashboard widget with "1:28:34" at 17px/600 in JetBrains Mono on a light surface. This is for analysis, comparison, decision-making.

The @ramtt/ui components are Functional Mode. Cormorant Garamond will appear in the RAMTT app for session titles, page headings, and share cards — but NOT in the component library's default rendering.

### Anti-patterns (from Type System v3 + 4-Font System v1)

**Space Grotesk — The Label Font:**
Space Grotesk has exactly ONE job: labels, tags, badges, section headers, tabs, categories. Always uppercase, always tracked. Three sizes:

| Name | Size | Weight | Tracking | Usage |
|------|------|--------|----------|-------|
| Section | 14px | 500 | 0.08em | Section headers, navigation |
| Default | 11px | 600 | 0.10em | Labels, badges, metadata |
| Micro | 10px | 600 | 0.12em | Tiny tags, footnote labels |

**Space Grotesk rules:**
- ALWAYS uppercase (`text-transform: uppercase`)
- ALWAYS tracked (`letter-spacing: 0.08em` minimum)
- NEVER in mixed case ("Aktive Zoner" is wrong, "AKTIVE ZONER" is right)
- NEVER for body text or descriptions
- NEVER for numbers/data values (that's JetBrains Mono's job)

**Decision flowchart (from 4-Font System v1):**
1. Is it a number or data value? → **JetBrains Mono**
2. Is it a label, tag, badge, section header, tab, or category? → **Space Grotesk** · UPPERCASE · tracked
3. Is it a "special moment" — welcome, milestone, onboarding, share card? → **Cormorant Garamond** · weight 300 · oldstyle nums
4. Everything else? → **Satoshi**

**NEVER:**
- Cormorant bold (600+) for anything
- Cormorant 500 at sizes above 44px
- Cormorant as everyday headline in the app — only "special moment" surfaces
- JetBrains for body text or descriptions
- JetBrains for labels like "ZONE 2" — that's Space Grotesk's job
- Text under 9px regardless of font
- Mix serif and sans in the same sentence
- Space Grotesk in mixed case
- Space Grotesk for body text
- Satoshi in uppercase as label — that's Space Grotesk's job

**ALWAYS:**
- Cormorant 300 for Display and H1 (the large ones)
- Negative letter-spacing on all headlines
- JetBrains for all numeric values
- Space Grotesk for all labels, uppercase with tracking
- Satoshi condensed for data tables (width axis)
- Generous line-height on body (1.65-1.8)
- Width axis before font-size for space problems
