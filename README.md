# ramtt-charts

> Zero-dependency SVG charts for React. Tailwind-native. < 12 KB.

![Early Development](https://img.shields.io/badge/status-early%20development-orange)
![License](https://img.shields.io/badge/license-MIT-blue)

Custom SVG chart system built from scratch — zero Recharts, zero D3. Pure math layer + React primitives + Tailwind className styling.

## Features

- **Zero third-party chart deps** — pure SVG + React + TypeScript
- **60fps hover** — mousemove → rAF → `setAttribute()`, zero React re-renders
- **Tailwind-native** — style everything with `className`, no inline styles
- **Zone-colored lines** — dynamic SVG gradient that shifts color by training zone
- **< 12 KB** — math layer + 8 primitives, tree-shakeable
- **Responsive** — ResizeObserver-based, no fixed widths

## Primitives

| Component | Purpose |
|-----------|---------|
| `ChartRoot` | SVG container, scales, context provider |
| `ChartLine` | Polyline path from data |
| `ChartArea` | Gradient-filled area |
| `ChartCrosshair` | Zero-rerender hover tracking |
| `ChartAxisY` | Left Y-axis with nice ticks |
| `ChartAxisX` | Bottom X-axis with formatted labels |
| `ChartRefLine` | Horizontal dashed reference line |
| `ChartZoneLine` | Line colored by training zones |

## Quick start

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

## Math layer

All chart math lives in `lib/charts/` — pure TypeScript, zero dependencies, zero DOM:

- `scaleLinear(domain, range)` — linear scale with `.inverse()` and `.clamp()`
- `linePath(data, x, y)` — SVG path `d` string generator
- `areaPath(data, x, y, baseline)` — closed area path
- `niceTicks(min, max, count)` — human-friendly tick values
- `lttb(data, threshold)` — Largest Triangle Three Buckets downsampling
- `extent(data, accessor, padding)` — min/max with padding
- `bisectNearest(values, target)` — O(log n) nearest-point lookup

## Architecture

```
mousemove → requestAnimationFrame → bisectNearest() → element.setAttribute()
                                                        ↑
                                              zero setState, zero re-renders
```

React renders the SVG once. Hover tracking bypasses React entirely via native event listeners and direct DOM manipulation in a rAF callback.

## License

MIT
