# CLAUDE.md

Custom chart library + UI component system + icon library for RAMTT. Everything built from scratch — no Recharts, no D3, no Radix, no shadcn.

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

- `motion` dependency is used in `app/chart-test/page.tsx` for panel collapse/expand. Framer's `motion.div` animates on mount/unmount only, so it's safe around charts. Do not replace with AnimatedPanel or CSS grid transitions.
- Chart zoom MUST use direct `setZoomState()` without debounce in ChartSyncProvider. Debouncing zoom state causes catastrophic lag. This was proven the hard way.
- Two `cn()` exist: `lib/ui.ts` (preferred) and `lib/utils.ts` (legacy). New files use `lib/ui.ts`.
- No barrel export for chart primitives — import by direct file path.
- Run `npm run audit` before committing. Non-negotiable.

## Read before working on specific areas

- UI components → `components/ui/RULES.md`
- Chart primitives → `components/charts/primitives/RULES.md`
- Design tokens → `components/ui/tokens.css`
- Shared constants → `lib/ui.ts`
- Full repo inventory → `REPO-STATE-APRIL-2026.md`
