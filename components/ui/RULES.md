# @ramtt/ui — System Rules (90 components)

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
- Never use border widths above 1px (exception: 2px underline for active tab via ACTIVE_UNDERLINE)
- Borders MAY be removed entirely where spacing alone creates sufficient separation (e.g., link lists, footer columns)
- If removing a border, the gap between items should be at least 8px to compensate

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

## Vertical Rhythm
- Section gaps use `gap` (flex/grid), never `margin-bottom`, to ensure consistent visual spacing
- The standard section gap is `40px` (`gap-10`) via `LAYOUT.sectionGap`
- Header-to-content gap is `12px` (`mt-3`)
- Card internal padding is `14px` (if it ever drifts, fix it)

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

## Components (88)

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
