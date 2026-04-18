# Task: Build Generic Demo Page for @ramtt/charts

## What to do
Build a demo page at `/app/demo/page.tsx` that showcases the chart primitives with NON-SPORT data. Read the attached brief for full details on the 4 demo charts to build (stock price, multi-line revenue, ColorLine temperature, synced IoT dashboard).

## Important context
The attached brief was written BEFORE I had the full dev log. Some details may be slightly off. Here's what to watch for:

1. **Check actual component names and props first.** The brief uses names like `ChartTooltip` and `ChartZoneLine` but the actual components may have evolved. Read the actual files in `components/charts/primitives/` before building — use what exists, don't assume the brief is 100% accurate on prop signatures.

2. **The hover system changed.** Floating tooltip was replaced with a data table below the charts (Perplexity-style) + `CrosshairTimeLabel` on the X-axis. Use whatever the current hover system is — don't try to build a floating tooltip if it's been removed.

3. **More components exist than the brief lists.** There's `ChartBar.tsx`, `ChartZoomHandler.tsx`, `ChartFuelLollipop.tsx`, `useChartZoom.ts`, `CrosshairTimeLabel.tsx`, `chart-context.ts`, `smooth-decimate.ts`. Use whatever makes sense for the demo.

4. **Framer Motion is already integrated.** The codebase uses it for fullscreen fade, chart toggle animations. Feel free to use it in the demo if it adds polish.

5. **CRISP rendering is already set up.** `geometricPrecision`, `crispEdges`, `tabular-nums`, `contain: paint` etc. are in `globals.css`. The demo should inherit these automatically.

## The one hard rule
Do NOT modify any existing components or the sport/cycling page. Only CREATE new files for the demo. If a component's props don't fit the generic use case perfectly, work around it and note what would need to change — don't refactor mid-task.

## Files to create
1. `app/demo/generate-data.ts` — fake data generators (stock prices, revenue/costs, temperature, IoT sensors)
2. `app/demo/page.tsx` — the demo page with 4 chart examples

## Read the brief first
The full spec is in the attached file. Start by reading it, then read the actual component files to reconcile any differences.
