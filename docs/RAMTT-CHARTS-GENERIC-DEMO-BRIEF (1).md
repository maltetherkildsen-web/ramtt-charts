# Claude Code Brief — @ramtt/charts Generic Demo Page

## Goal
Build a demo page at `/app/demo/page.tsx` that showcases the chart primitives as a **generic library** — no sport, no cycling, no FIT data. This page serves two purposes:
1. Proves the API works for non-sport use cases
2. Becomes the visual documentation / README showcase

## Context
All math + React primitives already exist and work (76+ tests passing). The demo page uses the **existing components** — we're not rewriting anything. We're just importing them with non-sport data.

The existing primitives live at:
- Math: `lib/charts/` (scaleLinear, linePath, areaPath, niceTicks, lttb, extent, bisect)
- React: `components/charts/primitives/` (ChartRoot, ChartLine, ChartArea, ChartCrosshair, ChartAxisX, ChartAxisY, ChartRefLine, ChartZoneLine, ChartTooltip, ChartSyncProvider)

## Demo Charts to Build

### 1. Simple Line Chart — "Stock Price"
Single line, area gradient fill underneath, crosshair with tooltip.
- Generate fake data: 365 days of stock price (random walk from $100)
- Shows: `ChartRoot`, `ChartLine`, `ChartArea`, `ChartAxisX`, `ChartAxisY`, `ChartCrosshair`, `ChartTooltip`
- Tooltip render: date + price, simple `<div>` — no zone badges
- Area fill: line color at ~10% opacity fading to transparent
- Tailwind styling: `stroke-blue-500` for line, `fill-blue-500/10` for area

### 2. Multi-Line Chart — "Revenue vs. Costs"
Two lines in the same chart with a legend.
- Generate fake data: 12 months, revenue (growing) + costs (flatter)
- Shows: Two `ChartLine` components in one `ChartRoot`
- One `ChartRefLine` at break-even point with label "Break-even"
- Legend: simple flex row with colored dots + labels below chart
- Colors: `stroke-emerald-500` for revenue, `stroke-red-400` for costs

### 3. ColorLine Chart — "Server Temperature"
Line that changes color based on value thresholds (generic version of ZoneLine).
- Generate fake data: 24 hours of server CPU temperature (fluctuating 30-85°C)
- Shows: `ChartZoneLine` used generically with non-sport thresholds
- Thresholds:
  - < 40°C → `#3b82f6` (blue, cool)
  - 40-60°C → `#22c55e` (green, normal)
  - 60-75°C → `#f59e0b` (amber, warm)
  - > 75°C → `#ef4444` (red, hot)
- ChartRefLine at 75°C labeled "Alert threshold"
- Tooltip shows temperature + zone label ("Cool" / "Normal" / "Warm" / "Hot")

### 4. Synced Stacked Charts — "IoT Sensor Dashboard"
The showpiece. 3 synced charts with shared crosshair, zoom, and brush.
- Generate fake data: 1000 points over 24 hours — temperature, humidity, pressure
- Shows: `ChartSyncProvider` wrapping 3 `ChartRoot` instances
- Top chart: Temperature (°C) — line + area gradient
- Middle chart: Humidity (%) — line only
- Bottom chart: Pressure (hPa) — line only, with AxisX
- Synced crosshair across all three
- Scroll-zoom + brush-select + double-click reset (all existing functionality)
- Only bottom chart gets `ChartAxisX`
- Each chart gets `ChartAxisY`

## Data Generation
Create a utility file `app/demo/generate-data.ts` with functions:
- `generateStockData(days: number): { date: number; price: number }[]`
- `generateRevenueData(months: number): { month: number; revenue: number; costs: number }[]`
- `generateTemperatureData(hours: number, pointsPerHour: number): { time: number; temp: number }[]`
- `generateSensorData(points: number): { time: number; temperature: number; humidity: number; pressure: number }[]`

Use seeded random (simple LCG or just fixed seed with Math.random replacement) so charts look identical on every load. Data should look realistic — not just noise.

## Page Layout
```
/app/demo/page.tsx

┌─────────────────────────────────────┐
│  @ramtt/charts                      │
│  Zero-dependency React SVG charts   │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 1. Stock Price (Line+Area)  │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 2. Revenue vs Costs (Multi) │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 3. Server Temp (ColorLine)  │    │
│  └─────────────────────────────┘    │
│                                     │
│  ┌─────────────────────────────┐    │
│  │ 4. IoT Dashboard (Synced)   │    │
│  │    ├── Temperature           │    │
│  │    ├── Humidity              │    │
│  │    └── Pressure + AxisX      │    │
│  └─────────────────────────────┘    │
└─────────────────────────────────────┘
```

Clean, minimal page. RAMTT design tokens for background/text colors. Each chart in a card-like container with subtle border. Chart titles in Space Grotesk. Values in JetBrains Mono.

## Important Notes

### What NOT to change
- Do NOT modify any existing primitives. Use them as-is.
- Do NOT touch the sport/cycling page or any FIT-related code.
- Do NOT add new dependencies.

### Props to check
- `ChartZoneLine` currently expects a specific prop structure for thresholds — check the actual component signature and pass data accordingly. The concept is the same (value → color mapping) but the prop names may be sport-specific. If so, note it but work with what exists for now.
- `ChartTooltip` may have sport-specific defaults (zone badges etc). Use the `render` prop to override with generic content. If it doesn't have a render prop yet, note it as a follow-up task.
- `ChartSyncProvider` may have hardcoded assumptions about 5 charts. Verify it works with 3.

### Visual Quality
- This is the public face of the library. It must look beautiful.
- Smooth lines, proper spacing, readable axes, clean tooltips.
- Test at different viewport widths — charts should be responsive via ResizeObserver.
- Use LTTB downsampling on the 1000-point sensor data for the synced charts.

## Files to Create
1. `app/demo/generate-data.ts` — fake data generators
2. `app/demo/page.tsx` — the demo page with all 4 chart examples

## Success Criteria
- Page loads at `localhost:3000/demo`
- All 4 charts render with realistic fake data
- Crosshair works on all charts
- Synced charts zoom/brush/reset together
- ColorLine shows threshold-based coloring on non-sport data
- Zero sport terminology anywhere on the page
- Looks good enough to screenshot for a README
