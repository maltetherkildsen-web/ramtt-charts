# RAMTT — rules for any Claude assistant (Chat or Code)

Paste this block into normal Claude's project instructions.
It is the compressed contract that is auto-enforced in Claude Code by
Husky + `npm run audit`, but that normal Claude must remember manually.

---

## What this project is

Custom chart library (`@ramtt/charts`) + UI component system (`@ramtt/ui`) +
icon library (`@ramtt/icons`) for RAMTT. Zero external UI deps — no Recharts,
D3, Radix, shadcn, Lucide, emoji, Unicode icons.

## Rule Zero — the only rule that really matters

**Never write styling by hand. Always use the system from the first line.**

- Every new component, page, or section MUST use `lib/ui.ts` constants
  (`WEIGHT`, `BORDER`, `RADIUS`, `TRANSITION`, `LABEL_STYLE`, `VALUE_STYLE`,
  `FOCUS_RING`, `HOVER_SAND`, `ACTIVE_SAND`, etc.) and `@ramtt/ui` components
  from the FIRST line.
- Never hardcode `border-[...]`, `rounded-[...]`, `text-[Npx]`, `bg-[#...]`,
  `font-medium`, `font-semibold`, `font-bold`, or a hex in place of
  `var(--n600)`.
- Never define a `function Something()` inside `app/**/page.tsx` that renders
  Tailwind styling classes. Components live in `components/ui/` or
  `components/charts/primitives/`.
- Sentence case everywhere. Satoshi everywhere. No `uppercase` CSS.
- Icons come ONLY from `components/icons/` — never emoji, Lucide, Heroicons.

## Before writing any UI code — discovery protocol

1. Read `docs/REPO-OVERVIEW.md` — full inventory (112 UI + 43 chart
   primitives + math utils). If the component you need already exists,
   use it.
2. Read `components/ui/RULES.md` and (if touching charts)
   `components/charts/primitives/RULES.md`.
3. If nothing fits: either extend an existing component, or create a new
   one in `components/ui/` that imports from `lib/ui.ts` and follows
   every rule in `RULES.md`.

## Component name hints

- "Rating picker / score selector" → `RatingInput`
- "Status pill / tag" → `Badge`
- "Segmented control / filter row" → `ToggleGroup`
- "Small stat" → `MetricCard` or `Stat`
- "Key-value row" → `DataRow`
- "Expandable section" → `Collapsible` or `Accordion`

## Hard no-fly zones

- `motion` / Framer Motion: used ONLY in `app/chart-test/page.tsx` (9 sites)
  for panel collapse. Don't add it anywhere else. Don't replace it with
  CSS grid transitions — that broke zoom.
- Chart zoom: direct `setZoomState()` in `ChartSyncProvider`. No debounce.
- Two `cn()` exist: prefer `lib/ui.ts`, legacy is `lib/utils.ts`.
- No barrel export for chart primitives — import by file path.

## Weights, borders, colors

- `WEIGHT.normal` 400 body, `WEIGHT.book` 450 meta, `WEIGHT.medium` 500
  buttons/labels, `WEIGHT.strong` 550 values/titles/active states
- `BORDER.default` (--n400), `BORDER.subtle` (--n200). Always 0.5px.
- Primary text --n1150, secondary --n800, muted --n600.
- Accent-soft ~12% for active/selected states — do not weaken.

## Before committing

In Claude Code: Husky pre-commit hook blocks commits that fail
`npm run audit`. You cannot skip it.

In normal Claude (no terminal): tell the user to run `npm run audit`
and `npm run build` locally before committing. If either fails, fix
the errors first. Never suggest `--no-verify`.

## Commit message style

Conventional commits: `feat(ui):`, `fix(charts):`, `refactor(audit):`,
`docs:`, `chore:`. Name the component used: "feat(chart-test): use
RatingInput for scores" — not "feat(chart-test): add score picker".

## If you get stuck

Ask the user before diverging. Never use `--no-verify`, never silently
drop system constants to make something build.
