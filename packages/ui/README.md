# @ramtt/ui

> 18 accessible React UI components with RAMTT design tokens. Zero dependencies. Tailwind-native.

[![License](https://img.shields.io/badge/license-MIT%20OR%20Apache--2.0-blue)](../../LICENSE-MIT)

## Install

```bash
npm install @ramtt/ui
```

Import design tokens in your root layout:

```tsx
import '@ramtt/ui/tokens.css'
```

## Usage

```tsx
import { MetricCard, Badge, ToggleGroup, Card, Button } from '@ramtt/ui'

<Card>
  <Card.Header>
    <Card.Title>Session Overview</Card.Title>
    <Card.Action><Button size="sm" variant="ghost">Export</Button></Card.Action>
  </Card.Header>
  <Card.Body>
    <MetricCard label="AVG POWER" value="238" unit="W" subtitle="Max 904W" />
  </Card.Body>
</Card>
```

## Components

| Component | Description |
|-----------|------------|
| `MetricCard` | Labeled value with unit, subtitle, badge -- standard + compact variants |
| `Badge` | Status pill -- filled/outline, semantic colors, zone badges |
| `ToggleGroup` | Connected buttons -- default (sand fill), pill, underline (tabs) variants |
| `Card` | Container with compound sub-components (Header, Title, Action, Body) |
| `DataRow` | Key-value row with unit, delta, badge -- semantic dt/dd |
| `SectionHeader` | Uppercase tracked label with optional action -- renders as h2 |
| `Button` | Primary (black), outline, ghost -- sm/md/lg/icon sizes |
| `SettingsCard` | Icon + title + description + chevron -- keyboard navigable |
| `DataTable` | Typed columns, number formatting, clickable rows with Enter handler |
| `ProgressBar` | Horizontal bar with role="progressbar" + ARIA value attributes |
| `Input` | Text/number input with label, unit suffix, proper label[htmlFor] |
| `Select` | Custom dark dropdown (#1E1E1E) with keyboard nav + type-ahead search |
| `Modal` | Dialog with backdrop, entry/exit animation, Escape to close |
| `Toast` | Notification system with ToastProvider + useToast hook |
| `Dropdown` | Accessible dropdown menu with keyboard navigation |
| `Tabs` | Tab navigation with roving tabindex |
| `Skeleton` | Loading placeholder with pulse animation |
| `Switch` | Toggle switch with ARIA checked state |

## Design system

**Satoshi for everything:**
- Body text, labels, numbers, UI copy -- all Satoshi via `--font-sans` / `--font-label`
- Cormorant Garamond (`--font-serif`) for editorial only, never in app UI

**4-level weight hierarchy** (Figma-calibrated):
- 400 (normal) -- body text, nav items, input text
- 450 (book) -- units, metadata, descriptions
- 500 (medium) -- badges, form labels, button text
- 550 (strong) -- section headers, card titles, values, active tabs

**Design tokens** (`tokens.css`):
- Warm neutral scale (#FAF9F5 to #131211)
- Tailwind Catalyst semantic colors (lime/rose/amber/sky)
- Border radius: 4/5/12/16px (5px for interactive, 12px for cards)
- 0.5px borders, no shadows, cursor: default everywhere

**5 interaction patterns:**

| Pattern | Token | Usage |
|---------|-------|-------|
| Sand fill | `bg: --n400` | ToggleGroup selected, filter pills |
| Underline | `border-bottom: 2px` | Tab navigation |
| White lift | `bg: #FFFFFF` | Cards on sand background |
| Black fill | `bg: --n1150` | Primary button ONLY |
| Sand hover | `bg: --n200` | Table rows, ghost buttons |

## Accessibility

- All components: `forwardRef` with named functions + `displayName`
- ToggleGroup: WAI-ARIA radiogroup/tablist/toolbar + roving tabindex
- Select: combobox + listbox + type-ahead + Escape to close
- DataTable: scope="col", Enter on clickable rows
- SettingsCard: role="button" + Enter/Space keyboard handler
- ProgressBar: role="progressbar" + aria-valuenow/min/max
- Modal: dialog element, focus trap, backdrop click to close
- Global `:focus-visible` ring (1px solid --n1050)
- WCAG AA contrast verified (--n600 #76726A = 4.55:1 on --bg)

## Design system utilities

All tokens and constants from `lib/ui.ts` are re-exported:

```tsx
import { WEIGHT, FONT, RADIUS, BORDER, TRANSITION, cn } from '@ramtt/ui'
import { HOVER_SAND, ACTIVE_SAND, ACTIVE_BLACK, FOCUS_RING } from '@ramtt/ui'
import { SIZE_HEIGHTS, SIZE_TEXT, SIZE_PADDING_X, LAYOUT } from '@ramtt/ui'
```

## Demo

Full interactive demo: [ramtt-charts.vercel.app/ui-demo](https://ramtt-charts.vercel.app/ui-demo)

## License

Licensed under either of:

- [Apache License, Version 2.0](../../LICENSE-APACHE)
- [MIT License](../../LICENSE-MIT)

at your option.

Copyright (c) 2026 RAMTT (Malte Therkildsen)

[Full repo](https://github.com/maltetherkildsen-web/ramtt-charts)
