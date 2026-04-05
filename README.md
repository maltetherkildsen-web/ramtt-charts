# ramtt-charts

> Zero-dependency SVG charts for React. Tailwind-native. < 12 KB.

![Early Development](https://img.shields.io/badge/status-early%20development-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

Custom SVG chart system built from scratch — zero Recharts, zero D3. Pure math layer + React primitives + Tailwind className styling. Designed for stacked sport/training charts with synced interactions.

**Copyright (c) 2026 RAMTT — MIT License**

---

## Features

- **Zero third-party chart deps** — pure SVG + React + TypeScript
- **Synced crosshair** — hover on one chart, crosshair moves on all charts simultaneously
- **Scroll zoom + pan** — mouse wheel zoom centered on cursor, shift+scroll or drag to pan
- **60fps hover** — mousemove → rAF → `setAttribute()`, zero React re-renders
- **Ref-based live metrics** — header stats strip updates via direct DOM mutation, no floating tooltip
- **Crosshair time label** — pill on X-axis tracks crosshair position, positioned via `transform`
- **Scrubber mini-map** — draggable overview bar for panning through full session
- **Interval markers** — labeled sprint/work markers overlaid on chart area
- **Tailwind-native** — style everything with `className`, no inline styles
- **Zone-colored lines** — dynamic SVG gradient that shifts color by training zone
- **< 12 KB** — math layer + primitives, tree-shakeable
- **Responsive** — ResizeObserver-based, no fixed widths

## Primitives

| Component | Purpose |
|-----------|---------|
| `ChartRoot` | SVG container, auto-scales, provides context to children |
| `ChartLine` | Polyline path from data (supports LTTB downsampling) |
| `ChartArea` | Gradient-filled area beneath the line |
| `ChartBar` | Vertical bar chart with per-bar colors |
| `ChartCrosshair` | Zero-rerender hover tracking, broadcasts via sync provider |
| `ChartAxisY` | Left Y-axis with nice ticks |
| `ChartAxisX` | Bottom X-axis with formatted labels |
| `ChartRefLine` | Horizontal dashed reference line (e.g. FTP, LT2) |
| `ChartZoneLine` | Line colored by training zones (Coggan power / HR zones) |
| `ChartSyncProvider` | Syncs crosshair + zoom across stacked charts (pub/sub refs) |
| `ChartZoomHandler` | Attaches scroll-zoom + brush-select to a chart |
| `ChartScrubber` | Mini-map overview bar — drag window to pan, click to jump |
| `ChartIntervalMarkers` | Sprint/work interval labels + shaded regions |
| `ChartTooltip` | Floating tooltip primitive (library component, not used in stacked view) |
| `CrosshairTimeLabel` | Small pill on X-axis showing timestamp at crosshair position |

## Quick start

### Single chart

```tsx
import { ChartRoot } from '@/components/charts/primitives/ChartRoot'
import { ChartLine } from '@/components/charts/primitives/ChartLine'
import { ChartArea } from '@/components/charts/primitives/ChartArea'
import { ChartCrosshair } from '@/components/charts/primitives/ChartCrosshair'
import { ChartAxisY } from '@/components/charts/primitives/ChartAxisY'

const data = [120, 145, 160, 180, 240, 265, 280, 250, 200, 140]

export function PowerChart() {
  return (
    <ChartRoot data={data} height={300}>
      <ChartAxisY />
      <ChartArea />
      <ChartLine />
      <ChartCrosshair />
    </ChartRoot>
  )
}
```

### Synced stacked charts with live metrics

```tsx
import { ChartSyncProvider } from '@/components/charts/primitives/ChartSyncProvider'
import { ChartZoomHandler } from '@/components/charts/primitives/ChartZoomHandler'
import { ChartScrubber } from '@/components/charts/primitives/ChartScrubber'
import { CrosshairTimeLabel } from '@/components/charts/primitives/CrosshairTimeLabel'

<ChartSyncProvider dataLength={power.length}>
  {/* Metrics strip subscribes to hover broadcasts — updates via refs */}
  <LiveMetricsStrip ... />

  {/* Stacked charts — crosshair + zoom sync automatically */}
  <ChartRoot data={power} height={120}>
    <ChartLine />
    <ChartCrosshair />
    <ChartZoomHandler />
  </ChartRoot>

  <ChartRoot data={heartRate} height={100}>
    <ChartLine className="fill-none stroke-red-500 stroke-[1.5]" />
    <ChartCrosshair dotColor="#ef4444" />
    <ChartZoomHandler />
  </ChartRoot>

  {/* Time label on X-axis — follows crosshair */}
  <CrosshairTimeLabel format={(i) => `${Math.floor(i/60)}:${(i%60).toString().padStart(2,'0')}`} />

  {/* Scrubber mini-map */}
  <ChartScrubber data={power} />
</ChartSyncProvider>
```

## Math layer

All chart math lives in `lib/charts/` — pure TypeScript, zero dependencies, zero DOM:

| Function | Purpose |
|----------|---------|
| `scaleLinear(domain, range)` | Linear scale with `.inverse()` and `.clamp()` |
| `linePath(data, x, y)` | SVG path `d` string generator |
| `areaPath(data, x, y, baseline)` | Closed area path for fills |
| `niceTicks(min, max, count)` | Human-friendly tick values |
| `lttb(data, threshold)` | Largest Triangle Three Buckets downsampling |
| `smoothDecimate(data, opts)` | Gaussian-smoothed downsampling for noisy data |
| `extentOf(data, padding)` | Min/max with optional padding |
| `bisectNearest(values, target)` | O(log n) nearest-point lookup |

## Architecture

```
Hover (zero re-renders):
  mousemove → rAF → bisectNearest() → setAttribute()
    → ChartSyncProvider broadcasts index (ref-based pub/sub)
      → all ChartCrosshairs update via refs
      → LiveMetricsStrip updates values via refs + direct DOM mutation
      → CrosshairTimeLabel positions pill via transform

Zoom (React state — re-renders expected, infrequent):
  wheel → compute new range → setZoom() → re-render with sliced data
    → all charts share zoom range via provider

Scrubber:
  drag window → setZoom() → pan across session
  click outside → center view at click position
```

### Data flow diagram

```
                    ChartSyncProvider (pub/sub)
                   /          |           \
          broadcastHover   zoom state   subscribeHover
              |               |              |
     ChartCrosshair     ChartRoot      LiveMetricsStrip
     (setAttribute)    (re-render)    (ref.textContent)
                                           |
                                    CrosshairTimeLabel
                                    (ref.transform)
```

## Demo

Run locally:

```bash
npm install
npm run dev        # → http://localhost:5000/chart-test
```

The demo page loads real FIT cycling data (5223 records, 88 min session) and renders 5 synced charts: Power, Heart Rate, Speed, Cadence, Elevation — with sprint interval markers, zone-colored lines, live metrics strip, and scrubber mini-map.

## License

MIT License — Copyright (c) 2026 RAMTT

See [LICENSE](./LICENSE) for full terms.
