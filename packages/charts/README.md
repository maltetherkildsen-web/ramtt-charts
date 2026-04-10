# @ramtt/charts

> Zero-dependency SVG chart primitives for React. Tailwind-native. 60fps hover.

[![License](https://img.shields.io/badge/license-MIT%20OR%20Apache--2.0-blue)](../../LICENSE-MIT)

## Install

```bash
npm install @ramtt/charts
```

## Quick start

```tsx
import { ChartRoot, ChartLine, ChartArea, ChartCrosshair, ChartAxisY } from '@ramtt/charts'

<ChartRoot data={[120, 145, 160, 180, 240, 265, 280, 250]} height={300}>
  <ChartAxisY />
  <ChartArea />
  <ChartLine />
  <ChartCrosshair />
</ChartRoot>
```

## Components

| Component | Purpose |
|-----------|---------|
| `ChartRoot` | SVG container, auto-scales, provides context |
| `ChartLine` | Polyline with hybrid downsampling (smoothDecimate) |
| `ChartArea` | Gradient-filled area beneath the line |
| `ChartBar` | Vertical bar chart with colorFn support |
| `ChartCrosshair` | Zero-rerender hover tracking via refs |
| `ChartAxisY` | Left Y-axis with nice ticks |
| `ChartAxisX` | Bottom X-axis with formatted labels |
| `ChartRefLine` | Horizontal dashed reference line |
| `ChartZoneLine` | Line colored by training zones via SVG gradient |
| `ChartZoomHandler` | Scroll-zoom + brush-select + keyboard nav |
| `ChartSyncProvider` | Syncs crosshair + zoom across stacked charts |
| `ChartScrubber` | Mini-map with draggable viewport window |
| `ChartIntervalMarkers` | Sprint/interval labels + shaded regions |
| `ChartFuelLollipop` | Discrete fuel intake events (lollipop chart) |
| `ChartTooltip` | Floating tooltip primitive |
| `CrosshairTimeLabel` | Timestamp pill on X-axis |
| `ChartDonut` | Donut/pie chart with arc paths |
| `ChartScatter` | Scatter plot with nearest-point hover |
| `ChartCandlestick` | OHLC candlestick chart |
| `ChartRadar` | Radar/spider chart |
| `ChartRadialBar` | Radial bar chart |
| `ChartTreemap` | Treemap layout |
| `ChartBoxPlot` | Box and whisker plot |
| `ChartFunnel` | Funnel chart |
| `ChartHeatmap` | Grid heatmap |
| `ChartCalendarHeatmap` | GitHub-style calendar heatmap |
| `ChartAnnotation` | Points, lines, and range annotations |
| `BrushOverlay` | Brush selection overlay |

## Math layer

Import math utilities separately:

```ts
import { scaleLinear, niceTicks, lttb, extent } from '@ramtt/charts/math'
```

| Module | Purpose |
|--------|---------|
| `scaleLinear` | Linear scale with `.inverse()`, `.clamp()` |
| `linePath` | SVG path d string generator |
| `areaPath` | Closed area path for gradient fills |
| `arcPath` / `pieLayout` | Arc paths and pie layout |
| `niceTicks` / `niceNum` | Human-friendly tick values (1, 2, 2.5, 5 x 10^n) |
| `lttb` | Largest Triangle Three Buckets downsampling |
| `extent` / `extentOf` | Min/max with optional padding |
| `bisectNearest` / `bisectData` | O(log n) nearest-point binary search |
| `nearest2d` | 2D nearest-point search |
| `stackSeries` | Stack series for stacked area/bar |
| `waterfallLayout` | Waterfall chart layout |
| `treemapLayout` | Treemap layout algorithm |
| `interpolateColor` | Color interpolation utilities |

## Synced stacked charts

```tsx
import { ChartSyncProvider, ChartRoot, ChartLine, ChartCrosshair, ChartZoomHandler, ChartScrubber } from '@ramtt/charts'

<ChartSyncProvider dataLength={power.length}>
  <ChartRoot data={visiblePower} height={110}>
    <ChartLine />
    <ChartCrosshair />
    <ChartZoomHandler />
  </ChartRoot>
  <ChartRoot data={visibleHR} height={75}>
    <ChartLine className="fill-none stroke-red-500 stroke-[1.5]" />
    <ChartCrosshair dotColor="#ef4444" />
    <ChartZoomHandler />
  </ChartRoot>
  <ChartScrubber data={fullPower} />
</ChartSyncProvider>
```

## Architecture

```
Hover (zero re-renders -- ref-based pub/sub):
  mousemove -> rAF -> bisectNearest -> setAttribute()
    -> sync.broadcastHover(index)
      -> all crosshairs, data table, time pill update via refs

Zoom (React state -- infrequent re-renders):
  wheel/keyboard -> setZoom({ start, end })
    -> charts re-render with sliced data arrays
```

## Keyboard shortcuts

| Key | Action |
|-----|--------|
| Arrow Left/Right | Pan 10% of visible range |
| +/- | Zoom in/out 20% |
| Home/End | Jump to start/end |
| Escape | Reset zoom |
| F | Toggle fullscreen |

## Demo

Full interactive demo: [ramtt-charts.vercel.app/demo](https://ramtt-charts.vercel.app/demo)

## License

Licensed under either of:

- [Apache License, Version 2.0](../../LICENSE-APACHE)
- [MIT License](../../LICENSE-MIT)

at your option.

Copyright (c) 2026 RAMTT (Malte Therkildsen)

[Full repo](https://github.com/maltetherkildsen-web/ramtt-charts)
