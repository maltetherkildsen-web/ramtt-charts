# @ramtt/ui — System Rules (24 components)

These rules are non-negotiable. Every component in the system follows them.
When Claude Code or any developer builds new components, these rules apply.

## Rule Zero
**NEVER build with hardcoded values and "convert to @ramtt/ui later."**
Every new component, page, or section MUST use lib/ui.ts constants and @ramtt/ui components from the FIRST LINE. If the system exists, use it. That's why it exists.

## Imports
- ALL components import from `lib/ui.ts`
- No hardcoded font-family, border-width, border-radius, or transition values
- Use `cn()` for class merging, never template literals

## Typography
- Satoshi for EVERYTHING — body, labels, numbers, UI copy
- BODY TEXT: `FONT.body` or `BODY_STYLE` (weight 400)
- LABELS: `LABEL_STYLE` — sentence case, weight 550, --n600
- NUMBERS: `VALUE_STYLE` — tabular-nums, weight 550
- UNITS: `UNIT_STYLE` — weight 450, --n800
- MUTED TEXT: `MUTED_STYLE` — weight 450, --n800
- Cormorant Garamond is EDITORIAL ONLY — never in app UI
- Sentence case everywhere — no uppercase except abbreviations (Z2, FTP, HR, BPM, RPM)

## Font Weights
- Use `WEIGHT` constants, never hardcode font-weight values
- 400 (WEIGHT.normal): body text, nav items, input text, unselected toggles
- 450 (WEIGHT.book): units, metadata, descriptions, subtitles
- 500 (WEIGHT.medium): badges, form labels, buttons (primary/outline)
- 550 (WEIGHT.strong): section headers, card titles, values, active tabs, selected toggles

## Sizing
- Heights: 18px (xs/badges), 28px (sm), 32px (md/default), 36px (lg)
- Use SIZE_HEIGHTS constants, never hardcode h-* values

## Border Radius
- 4px (sm/badges), 5px (md/buttons/inputs), 12px (lg/cards), 16px (xl/modals)
- Use RADIUS constants, never hardcode rounded-* values

## Borders
- Always 0.5px
- Use BORDER.default (--n400) or BORDER.subtle (--n200)
- Never use border widths above 1px

## Colors
- Primary text: --n1150
- Secondary text: --n800
- Muted/labels: --n600
- Semantic colors (positive/negative/warning/info) are NEVER used for text
- Text is ALWAYS the neutral scale

## Interaction States
- Sand fill (--n400): selected toggles, filters → use ACTIVE_SAND
- Underline (2px --n1150): tab navigation → use ACTIVE_UNDERLINE
- White lift (bg-white): card hover → use WHITE_LIFT
- Black fill (--n1150): primary CTA ONLY → use ACTIVE_BLACK
- Sand hover (--n200): rows, ghost buttons → use HOVER_SAND

## Transitions
- NEVER use `transition-all` — specify exact properties
- Use TRANSITION.colors, TRANSITION.background, TRANSITION.opacity, TRANSITION.transform
- Duration: 150ms for most interactions

## Accessibility
- forwardRef on all components (required on interactive, recommended on all)
- displayName on all components
- FOCUS_RING (1px) on all interactive elements, FOCUS_RING_THICK (2px) on Input fields
- Semantic HTML: `<button>`, `<table>`, `<th>`, `<h2>`, `<dl>` where appropriate
- ARIA roles: radiogroup, tablist, toolbar, listbox, progressbar where appropriate
- Keyboard navigation: arrow keys in groups, Escape to close, Enter/Space to activate

## Tailwind Compliance
- No `style={{}}` except CSS variable bridge and SVG-only attributes
- No .css files per component
- No @apply
- All styling via className with Tailwind utility classes

## Cursor
- cursor-default everywhere
- cursor-text only in input fields
- cursor-grab/grabbing only for drag handles
- NEVER cursor-pointer

## Shadows
- No box-shadow on any component — RAMTT is flat
- Modal uses `::backdrop` with blur, not shadow
- Dropdown and Toast rely on border/color contrast for separation

## Components (24)

### Wave 1 — Display & Input (12)
Button, Badge, ToggleGroup, Card, DataRow, DataTable, Input, Select, MetricCard, SettingsCard, ProgressBar, SectionHeader

### Wave 2 — Interaction Layer (6)
Modal, Toast (ToastProvider + useToast), Dropdown, Tabs, Skeleton, Switch

### Wave 3 — Polish & Navigation (6)
Tooltip, Accordion, Slider, Avatar, EmptyState, Breadcrumb
