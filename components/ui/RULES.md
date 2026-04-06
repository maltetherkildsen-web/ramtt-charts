# @ramtt/ui — System Rules

These rules are non-negotiable. Every component in the system follows them.
When Claude Code or any developer builds new components, these rules apply.

## Imports
- ALL components import from `lib/ui.ts`
- No hardcoded font-family, border-width, border-radius, or transition values
- Use `cn()` for class merging, never template literals

## Typography
- BODY TEXT: Satoshi → use `FONT.body` or `BODY_STYLE`
- LABELS: Space Grotesk, uppercase, tracked → use `LABEL_STYLE`
- NUMBERS: Space Grotesk, tabular-nums → use `VALUE_STYLE`
- MUTED TEXT: Satoshi, --n800 → use `MUTED_STYLE`
- Cormorant Garamond is EDITORIAL ONLY — never in app UI

## Sizing
- Heights: 20px (xs/badges), 28px (sm), 32px (md/default), 36px (lg)
- Use SIZE_HEIGHTS constants, never hardcode h-* values

## Border Radius
- 4px (sm/badges), 5px (md/buttons/inputs), 8px (lg/cards), 12px (xl/modals)
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
- FOCUS_RING on all interactive elements
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
- No box-shadow on cards or static elements
- Shadows only on floating elements (modals, dropdowns, tooltips)
