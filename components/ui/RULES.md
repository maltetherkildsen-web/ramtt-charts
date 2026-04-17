# @ramtt/ui — System Rules (112 components)

These rules are non-negotiable. Every component in the system follows them.
When Claude Code or any developer builds new components, these rules apply.

## Rule Zero

**NEVER build with hardcoded values and "convert to @ramtt/ui later."**

Every new component, page, or section MUST use `lib/ui.ts` constants and
`@ramtt/ui` components from the FIRST LINE. If the system exists, use it.
That's why it exists.

**This explicitly includes:**

- Never define a `function Something()` inside an `app/**/page.tsx` file
  that renders Tailwind classes for borders, colors, sizes, or font
  weights. Components go in `components/ui/`. Full stop.
- Never hardcode `border-[0.5px]`, `rounded-*`, `text-[Npx]`,
  `font-medium`, `bg-[#...]`, or similar in a page file. Use the
  corresponding constant from `lib/ui.ts`.
- Never copy styling from one component to build a "similar but slightly
  different" version inline. Extend the existing component or build a
  new one in `components/ui/`.

**If you find yourself building an inline component in a page file, STOP.**
You are violating Rule Zero even if you use some `lib/ui.ts` constants.
Go back to the Component Discovery Protocol (next section) and start over.

## Component Discovery Protocol

Before building any new UI element, follow these steps in order. Skipping
them is how Rule Zero gets violated by accident.

### Step 1: Search the existing library

```bash
ls components/ui/
grep -l "purpose-keyword" components/ui/*.tsx
```

112 components exist. Common mappings:

| You're thinking of | Use this existing component |
|--------------------|------------------------------|
| Rating picker, score selector, 1-10 or 1-5 picker | `RatingInput` |
| Status pill, tag, colored label | `Badge` |
| Segmented control, filter row, tab-like group | `ToggleGroup` |
| Dropdown menu, options list | `Dropdown` or `Select` |
| Small stat with label and value | `MetricCard` |
| Key-value row | `DataRow` |
| Checkbox, radio, switch | `Checkbox`, `Radio`, `Switch` |
| Expandable section | `Collapsible` or `Accordion` |
| Floating popup with rich content | `Popover` or `HoverCard` |
| Command palette, quick-search modal | `CommandPalette` or `QuickSearch` |

Check `app/ui-demo/page.tsx` and
`app/(docs)/components/[slug]/PreviewLoader.tsx` for canonical usage
examples of every component.

### Step 2: If something fits — use it

Read the component's file in full. Check its props, its `compact`
variant if any, its keyboard behavior. Then import and use it.

### Step 3: If nothing fits — decide between extend vs. new

**Extend:** if an existing component is 90% right and needs a new prop,
variant, or size, extend it. Add the prop with a sensible default that
preserves existing behavior. Update the component's preview in
`app/ui-demo/page.tsx` and `PreviewLoader.tsx`. Run `npm run audit`.

**New component in `components/ui/`:** if nothing is close, create a
new file in `components/ui/`. The new file MUST:

1. Import from `lib/ui.ts` only — no hardcoded values
2. Use `forwardRef` and `displayName`
3. Follow every rule in this file (typography, weights, borders,
   transitions, accessibility, focus)
4. Add an entry to `components/ui/index.ts` (barrel export)
5. Add a preview in `app/ui-demo/page.tsx`
6. Pass `npm run audit`
7. Have at least one test or a preview loader entry

### Step 4: NEVER build inline in a page file

Components defined inside `app/**/page.tsx` files escape:
- `npm run audit` (it scans `components/ui/` only)
- Discoverability (nobody will find it to reuse it)
- Visual consistency enforcement

If a component is worth building, it's worth putting in the library.
If it's not worth putting in the library, it's probably duplicating
something that already exists — go back to Step 1.

### Step 5: Commit message should name the component used

Good: "feat(chart-test): use RatingInput for session scores"
Bad: "feat(chart-test): add score picker"

Naming the existing component in the commit message forces you to
confirm you actually searched for it.

## Imports
- ALL components import from `lib/ui.ts`
- No hardcoded font-family, border-width, border-radius, or transition values
- Use `cn()` for class merging, never template literals

## Inline audit suppression

The audit supports one inline suppression marker: `// audit-ignore-hex`.
It suppresses the hex-color check on the line where it appears.

**Usage:**

```tsx
const NEUTRAL = '#F2F0EA' // audit-ignore-hex — var(--n200), alpha-compositing over --bg
```

**Rules:**

- Only use when `var(--*)` genuinely cannot substitute (e.g. hex-alpha
  composition in SVG, where CSS variables don't work for the alpha channel).
- The comment MUST include a rationale after the marker.
- No blanket file-level or directory-level suppressions — every
  suppression is one line, inline, with a reason.
- Suppression only applies to hex-color checks. All other rules still
  fire on suppressed lines.

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
- 400 (WEIGHT.normal): body text, input text, unselected toggles
- 450 (WEIGHT.book): units, metadata, descriptions, subtitles, sidebar nav items
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
- Never use border widths above 1px (exception: 2px underline for active tab via ACTIVE_UNDERLINE)
- Borders MAY be removed entirely where spacing alone creates sufficient separation (e.g., link lists, footer columns)
- If removing a border, the gap between items should be at least 8px to compensate

## Colors
- Primary text: --n1150
- Secondary text: --n800
- Muted/labels: --n600
- Semantic colors (positive/negative/warning/info) are NEVER used for text
- Text is ALWAYS the neutral scale

## Domain Colors & Accent System
- Three domains: Nutrition (Cyan 500 `#06B6D4`), Training (Pink 600 `#DB2777`), Body (Indigo 500 `#6366F1`)
- 14 CSS tokens per domain in tokens.css: pressed, hover, base, toggle, text, icon, icon-light, icon-lightest, border, selection, wash, badge, soft, light
- `--accent-*` aliases point to the current app accent (nutrition/cyan placeholder)
- Use `var(--domain-nutrition)` etc. for domain-specific UI, `var(--accent)` for generic accent
- `DOMAIN` constant + `DomainKey` type exported from lib/ui.ts
- Badge, ProgressBar, StatusIndicator accept domain keys as color props
- **Accent-soft opacity (~12%)** is the standard for active/selected states (sidebar nav, tabs). This intensity is LOCKED — do not weaken it.
- Button primary: `var(--accent)` bg, `var(--accent-hover)` hover, `var(--accent-pressed)` active
- Button outline: `var(--accent-text)` text, `var(--accent-border)` border
- Button ghost: `var(--accent-text)` text
- Switch on-track: `var(--accent-toggle)`
- Input/Textarea/Select focus: 1.5px `var(--accent)` border (FOCUS_RING_THIN)

## Indicator Dots
- Status indicator dots are **circles** (`rounded-full`)
- Domain color indicators (nutrition/training/body badges, category icons) use **squircles** (`rounded-[30%]`)
- ColorDot supports three variants:
  - `filled` (default) — solid circle, classic status dot
  - `hollow` — outline ring only (1.5px border, transparent fill)
  - `bar` — vertical pipe (2.5px wide, height scales with size)

## Interaction States
- Accent soft (~12%): sidebar active, selected nav items → use `bg-[var(--accent-soft)]`
- Sand fill (--n400): selected toggles, filters → use ACTIVE_SAND
- Underline (2px --n1150): tab navigation → use ACTIVE_UNDERLINE
- White lift (bg-white): card hover → use WHITE_LIFT
- Accent fill: primary CTA → Button primary uses accent tokens
- Sand hover (--n200): rows, ghost buttons → use HOVER_SAND

## Icons
- **ALWAYS** use icons from `components/icons/` — our own SVG icon library
- **NEVER** use emoji, Unicode symbols, or any third-party icon library (Lucide, Heroicons, Remix Icons, Font Awesome, etc.)
- Import from `components/icons/light/` (light variant) as default
- Size: 16px or 18px depending on context (16px inline/tight, 18px standalone/nav)
- Icons use `currentColor` — color is controlled by the parent's text color
- stroke-width: 1.25

## Transitions
- NEVER use `transition-all` — specify exact properties
- Use TRANSITION.colors, TRANSITION.background, TRANSITION.opacity, TRANSITION.transform
- Duration: 150ms for most interactions

## Accessibility
- forwardRef on all components (required on interactive, recommended on all)
- displayName on all components
- FOCUS_RING on all interactive elements (box-shadow: 0 0 0 2px, Figma technique)
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
- No box-shadow for decoration or elevation — RAMTT is flat
- box-shadow is ONLY used for focus rings (`0 0 0 2px` technique) and validation rings. This is the Figma-calibrated approach.
- Modal uses `::backdrop` with blur, not shadow
- Dropdown and Toast rely on border/color contrast for separation

### Shadow exceptions
Overlay and floating components (FloatingPanel, CommandPalette, QuickSearch, FloatingToolbar,
Modal, Drawer, Popover, Tooltip, Dropdown, ContextMenu, HoverCard, Combobox, Toast, ColorPicker)
MAY use box-shadow for elevation. All other components must remain flat — no box-shadow.

## Vertical Rhythm
- Section gaps use `gap` (flex/grid), never `margin-bottom`, to ensure consistent visual spacing
- The standard section gap is `40px` (`gap-10`) via `LAYOUT.sectionGap`
- Header-to-content gap is `12px` (`mt-3`)
- Card internal padding is `14px` (if it ever drifts, fix it)

## Edge Alignment (LOCKED)
- Within a page section, every stacked element — headings, labels, metric rows,
  collapsible panels, form fields — aligns to the SAME left edge. No surprise indents.
- A section gets a single horizontal padding (`px-6` on the page container, or similar).
  Children do NOT add their own horizontal padding unless visually required.
- Collapsible/accordion headers use only a horizontal divider (`border-b-[0.5px]`),
  never a full bordered+rounded+bg card that forces internal padding. The button
  text must line up with surrounding section labels.
- Chevron / leading icon sits INSIDE that same left edge — it's part of the row,
  not an indent.
- Rationale: top-tier design systems (Linear, Stripe, Vercel) enforce a single
  vertical rule down the page. Even a 4-8px drift is visible and cheapens the layout.

## Sidebar Navigation (LOCKED)
- All items (active AND inactive): `11px / weight 450 / --n1150` — identical text styling
- Active state: `bg-[var(--accent-soft)]` (~12% accent opacity) — NO weight change, NO color change
- Hover state: `bg-[var(--n200)]` (sand)
- Rationale: Satoshi 450 matches Inter 400 optically (verified via Figma `getComputedStyle`)
- Icons: import from `components/icons/light/` — 18px default, stroke-width 1.25, `currentColor`
- Icon-to-text gap: 14px (`gap-3.5`)
- Use `NAV_ICON` constant from lib/ui.ts for icon sizing
- Light variant is now shipped — no CSS overrides needed
- This pattern applies to ALL sidebar/nav-list components in the app
- Do NOT revert to w400, --n800, or weight-based active states for sidebar navigation
- Do NOT weaken the accent-soft opacity — the ~12% intensity is calibrated to Figma

## Link List Typography
- In link lists (navigation, footer, settings sidebar), heading and link text MAY be the same font size
- Hierarchy via weight (550 heading vs 400 links) and color (stronger heading vs muted links)
- This creates perfect vertical alignment — same-size text always lines up

## Link Hover Pattern
- Standard link hover: `color` transition (150ms via TRANSITION.colors), underline appears on hover
- `text-underline-offset: 0.25em` — never 0 or auto
- `text-decoration-thickness: 1px` — never thicker
- This applies to all text links in all contexts (footer, sidebar, body text, settings)

## Dark Surface Colors
- Dark backgrounds use `--dark-bg` (#141413), never pure black
- Text on dark uses `--dark-text` (#FAF9F5), which is the same as `--bg` — the system is self-inverting
- Muted text on dark uses `--dark-muted` (#B0AEA5 = `--n700`)
- Borders on dark use `--dark-border` (sand at 10% opacity)
- NO new color system for dark — just invert the existing warm neutral scale
- Use `DARK` constants from lib/ui.ts, never hardcode these values

## Letter-Spacing on Small Text
- Body text (13-14px): no letter-spacing (normal)
- Small link lists (12px): `-0.02em` (slightly tighter, as in footer/nav)
- Labels and headers: no letter-spacing

## Components (112)

### Wave 1 — Display & Input (12)
Button, Badge, ToggleGroup, Card, DataRow, DataTable, Input, Select, MetricCard, SettingsCard, ProgressBar, SectionHeader

### Wave 2 — Interaction Layer (6)
Modal, Toast (ToastProvider + useToast), Dropdown, Tabs, Skeleton, Switch

### Wave 3 — Polish & Navigation (6)
Tooltip, Accordion, Slider, Avatar, EmptyState, Breadcrumb

### Wave 4 — App-Specific (8)
Sidebar, PageHeader, Textarea, Checkbox, Radio, FileUpload, Tag/TagInput, Gauge

### Wave 5 — Full Parity + Beyond (10)
Calendar, DatePicker, Popover, Command, Pagination, Drawer, Spinner, Kbd, Alert, Combobox

### Wave 6 — Final Parity (8)
Separator, Label, Collapsible, InputGroup, ScrollArea, HoverCard, Resizable, ContextMenu

### Wave 7A — Atomic Display + Input (4)
ColorDot, StatusIndicator, SegmentedBar, NumberStepper

### Wave 7B — Input Patterns (3)
RatingInput, TimePicker, StepFlow

### Wave 7C — Widget System (3)
WidgetCard, WidgetPicker, DashboardGrid

### Wave 8A — Display + Interaction (6)
Stat, ComparisonCard, TimelineStrip, RangeSlider, FormField, NotificationBadge

### Wave 8B — Compound Components (6)
ChartCard, Leaderboard, MemberList, InviteCard, OnboardingLayout, NotificationPreferences

### Wave 8C — Utility Components (3)
TodoList, HelpSection, FieldMapping

### Wave 8D — Layout & Form Patterns (8)
DescriptionList, Feed, ActionPanel, GridList, MediaObject, FormLayout, ButtonGroup, AuthLayout

### Wave 9 — Dark Surfaces & Footer (5)
LinkGroup, LinkList, DarkSection, SocialIcons, Footer

### Wave 10 — Category System & Command Palette (2)
CategoryIcon, CommandPalette

### Wave 11 — Editor Shell (4)
IconTabBar, PanelSidebar, FloatingToolbar, FloatingPanel

### Wave 12 — Claude-Inspired (12)
WorkspaceSwitcher, ActivityHeatmap, QuickSearch, ConversationList, StatsGrid, AppSidebar, ProjectsGrid, ChatInput, MessageActions, WelcomeHero, PromoCard, ActiveTask

### Wave 13 — Animation Utilities (1)
AnimatedPanel
