# CLAUDE.md

Custom chart library + UI component system + icon library for RAMTT.
Everything built from scratch — no Recharts, no D3, no Radix, no shadcn.

## STOP — Before you write any UI code

These steps are non-negotiable. If you skip them, you will build
something that violates the system and will need to be rewritten.

### Step 1 — Read these files in full, in this order

1. `components/ui/RULES.md` — the system contract
2. `lib/ui.ts` — shared constants (FONT, WEIGHT, BORDER, RADIUS, SIZE,
   LABEL_STYLE, VALUE_STYLE, TRANSITION, FOCUS_RING, HOVER_SAND,
   ACTIVE_SAND, etc.)
3. `components/ui/tokens.css` — CSS variables

If you are touching charts: also `components/charts/primitives/RULES.md`.

You must be able to answer before writing code:
- Which WEIGHT constant applies to body text, to values, to labels?
- What is BORDER.default vs BORDER.subtle?
- What does FOCUS_RING apply to?
- What is the accent-soft opacity rule?

### Step 2 — Component discovery protocol (before building anything new)

Before building any new UI element, in this order:

1. `ls components/ui/` — scan the list of 112 components
2. Search by purpose, not just name. A "rating picker" is a RatingInput.
   A "status pill" is a Badge. A "segmented control" is a ToggleGroup.
3. Open the candidate component file and read its props
4. Check `app/ui-demo/page.tsx` and `app/(docs)/components/[slug]/PreviewLoader.tsx`
   for canonical usage examples
5. Only if nothing fits: consider Option A (extend existing) or Option B
   (build new in `components/ui/`, NEVER inline in a page file)

If you catch yourself writing a `function Something()` inside an
`app/**/page.tsx` file that contains Tailwind classes for borders,
colors, or sizes — STOP. That is a Rule Zero violation. Either:
- Use an existing `@ramtt/ui` component
- Extend an existing `@ramtt/ui` component
- Create a new component in `components/ui/` that imports from `lib/ui.ts`

**Inline components with hardcoded styling in page files are forbidden.**
They escape the audit, drift from the system, and create silent duplication.

### Step 3 — Rule Zero (quoted from components/ui/RULES.md)

> NEVER build with hardcoded values and "convert to @ramtt/ui later."
> Every new component, page, or section MUST use lib/ui.ts constants
> and @ramtt/ui components from the FIRST LINE. If the system exists,
> use it. That's why it exists.

## Commands

```bash
npm run dev            # Dev server, port 5000
npm run build          # TypeScript check — run after changes
npm run audit          # IMPORTANT: must pass before any commit
npx vitest run         # 248 tests, all must pass
```

## Structure

- `lib/charts/` — Math layer (pure TypeScript, zero React)
- `components/charts/primitives/` — 43 React SVG chart primitives
- `components/ui/` — 112 UI components, see RULES.md there
- `components/icons/` — 1717 icon files across 8 variants
- `lib/ui.ts` — Shared design constants (ALL components import from here)
- `app/chart-test/` — Session analysis (crown jewel, handle with care)

## Rules that Claude cannot infer from code

- `motion` dependency is used in `app/chart-test/page.tsx` for panel
  collapse/expand. Framer's `motion.div` animates on mount/unmount only,
  so it's safe around charts. Do not replace with AnimatedPanel or CSS
  grid transitions.
- Chart zoom MUST use direct `setZoomState()` without debounce in
  ChartSyncProvider. Debouncing zoom state causes catastrophic lag. This
  was proven the hard way.
- Two `cn()` exist: `lib/ui.ts` (preferred) and `lib/utils.ts` (legacy).
  New files use `lib/ui.ts`.
- No barrel export for chart primitives — import by direct file path.
- Run `npm run audit` before committing. Non-negotiable.
- Inline components in page files are forbidden. New components go in
  `components/ui/` and follow RULES.md. See Step 2 above.

## Full repo inventory

`docs/REPO-OVERVIEW.md` — regenerate after major features (say "opdater
overblikket" to rebuild).
