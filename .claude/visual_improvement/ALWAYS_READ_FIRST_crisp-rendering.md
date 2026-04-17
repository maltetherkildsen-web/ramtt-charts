# CRISP Rendering Optimization for RAMTT Charts

## Overview
Apply the CRISP-RENDERING-DEEP-DIVE principles to the chart system. This is a polish pass that takes the charts from "working" to "premium."

> **Framer Motion note:** This project intentionally keeps Framer Motion use minimal — only the panel collapse/expand and fullscreen overlay in `app/chart-test/page.tsx`. See CLAUDE.md. Do NOT add Framer to chart lines, zone badges, crosshair, hover values, or anywhere else. Prior proposals to expand Framer usage were superseded 2026-04-16 after a CSS replacement caused zoom lag and was rolled back.

## ⚠️ Tailwind Compliance Note
This project enforces Tailwind-only styling. The `style={{}}` attribute is BANNED for visual styling. However, this prompt uses `style={{}}` in a few specific places for:
1. **SVG attributes** that have no Tailwind equivalent (`fontVariantNumeric`, `shapeRendering`, `contain`)
2. **CSS performance hints** that Tailwind doesn't cover (`contentVisibility`, `containIntrinsicSize`)

These are the ONLY acceptable exceptions. All visual styling (colors, spacing, borders, typography, layout) MUST use Tailwind utility classes. If in doubt, use a Tailwind class. Each SVG/performance exception should have a comment: `// SVG attr — no Tailwind equivalent`

## CRISP Rendering Applied to Charts

### 1.1 SVG Text Rendering
All SVG `<text>` elements in charts (axis labels, interval markers, ref line labels, chart type labels) need proper rendering:

```css
/* Add to global CSS or chart container */
svg text {
  -webkit-font-smoothing: antialiased;
  font-kerning: normal;
}

/* Headings-equivalent labels (chart type: "POWER", "HR", etc.) */
svg text.chart-label {
  text-rendering: optimizeLegibility;
}
```

And on SVG text elements for numeric displays (Y-axis ticks, time labels, hover values):
```tsx
<text 
  fontFamily="'JetBrains Mono', monospace"
  style={{ fontVariantNumeric: 'tabular-nums slashed-zero' }}
>
```

This ensures:
- All numbers in Y-axis labels align perfectly vertically (tabular-nums)
- Zero is distinguishable from O (slashed-zero)
- Text is razor-sharp on retina displays (antialiased)

### 1.2 Subpixel Precision in Scales
**Rule 45 from CRISP: Never Math.round() on layout values.**

Check all scale functions — `scaleLinear` and path generation should return full floating-point values:

```typescript
// BAD — loses subpixel precision
const scale = (value: number) => Math.round(r0 + (value - d0) * ratio)

// GOOD — full precision, browser handles subpixel rendering
const scale = (value: number) => r0 + (value - d0) * ratio
```

Also: use `getBoundingClientRect()` instead of `offsetWidth`/`offsetHeight` everywhere in the chart system. The offset properties return integers and lose subpixel information.

```typescript
// BAD
const width = containerRef.current.offsetWidth

// GOOD
const { width } = containerRef.current.getBoundingClientRect()
```

### 1.3 GPU Compositing for Interactive Elements

Promote frequently-updated elements to their own compositing layers:

```css
/* Crosshair — moves on every mousemove */
.chart-crosshair {
  will-change: transform;
  contain: layout style;
}

/* Time pill — moves with crosshair */
.chart-time-pill {
  will-change: transform;
  contain: layout style;
}

/* Hover data table values — update on every mousemove */
.hover-value {
  contain: layout style;
}
```

**Important:** `will-change` should only be on elements that actually animate frequently. Don't add it to static elements like chart lines or axis labels — that wastes GPU memory. Each `will-change` element gets its own compositing layer (~1-2MB VRAM each).

**Cleanup rule:** If an element stops animating (e.g., crosshair hidden on mouse leave), remove `will-change` dynamically:
```tsx
crosshairRef.current.style.willChange = isHovering ? 'transform' : 'auto'
```
Never leave `will-change` on permanently. Never add it globally. Never use it on more than 3-4 elements simultaneously in the chart system.

### 1.4 contain: paint on Chart Container

Isolate chart repaints from the rest of the page:

```tsx
<div 
  ref={chartStackRef}
  style={{ contain: 'paint' }}
  className="..."
>
  {/* All charts render inside this containment boundary */}
  {/* Repaints from crosshair movement don't affect metrics strip, header, etc. */}
</div>
```

This tells the browser: "nothing inside this element can visually overflow or affect rendering outside it." Crosshair movement, hover effects, and zoom all repaint only within this boundary.

### 1.5 content-visibility for Below-Fold Sections

Sections below the charts (peak powers, advanced metrics, fuel log, tabs) don't need to render until visible:

```tsx
<div style={{ contentVisibility: 'auto', containIntrinsicSize: '0 300px' }}>
  <PeakPowersStrip />
  <AdvancedMetricsCards />
  <FuelLog />
  <TabBar />
</div>
```

This skips rendering of below-fold content until the user scrolls to it — free performance.

### 1.6 Hairline Borders on Chart Grid

Chart grid lines and separators should use 0.5px for true hairline rendering on retina:

```tsx
// Y-axis grid lines
<line 
  x1={0} y1={y} x2={width} y2={y} 
  stroke="var(--n400)" 
  strokeWidth="0.5"  // hairline on retina
  strokeOpacity="0.3"
/>

// Separator between stacked charts
<div className="border-b" style={{ borderWidth: '0.5px', borderColor: 'var(--n200)' }} />
```

### 1.7 Path Rendering Quality

SVG paths should use `shape-rendering` for optimal crispness:

```tsx
// Chart lines — smooth anti-aliased curves
<path d={pathData} shapeRendering="geometricPrecision" />

// Grid lines and reference lines — crisp pixel-aligned
<line shapeRendering="crispEdges" />

// Crosshair — pixel-aligned vertical line
<line shapeRendering="crispEdges" />
```

`geometricPrecision` tells the browser to prioritize smooth curves over speed — perfect for data lines. `crispEdges` aligns straight lines to pixel boundaries — perfect for grid lines and the crosshair.

### 1.8 Easing Curves

Replace any `ease` or `ease-in-out` with the premium curve from CRISP:

```css
/* Default entrance easing — used by Vercel, Linear */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

/* Exit easing */
--ease-in-expo: cubic-bezier(0.7, 0, 0.84, 0);

/* Springy/tactile */
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
```

Apply to:
- Zone toggle transition: `--ease-out-expo`, 250ms
- Chart toggle (show/hide a chart): `--ease-out-expo`, 200ms
- Fullscreen enter/exit: `--ease-out-expo`, 300ms
- Tooltip/time-pill flip: `--ease-out-expo`, 150ms

### 1.9 Duration Hierarchy

From CRISP Rule 28 — consistent timing across all chart interactions:

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Crosshair position | 0ms (instant, rAF) | none |
| Time pill appear | 100ms | ease-out-expo |
| Hover data table update | 0ms (instant, refs) | none |
| Zone toggle color change | 250ms | ease-out-expo |
| Chart toggle show/hide | 200ms | ease-out-expo |
| Fullscreen enter | 300ms | ease-out-expo |
| Fullscreen exit | 200ms | ease-in-expo |
| Zoom animation | 150ms | ease-out-expo |
| Brush selection | 0ms (instant) | none |

---

## Performance Safety

### Don't over-animate
- Crosshair position: NEVER animate — it must be instant (rAF, direct DOM)
- Path `d` attributes on zoom: NEVER animate — too expensive, 5000+ points
- Y-axis label updates on zoom: NEVER animate — instant swap

### Respect user preferences
`prefers-reduced-motion` is handled globally in `components/ui/tokens.css` — all CSS animations and transitions are shortened to 0.01ms when the user requests reduced motion. Do not rely on per-component wrappers for this.

### Test on low-end devices
All animations should be tested with CPU throttling (6x slowdown in Chrome DevTools). If any animation drops below 30fps on a throttled CPU, remove it or simplify it.

---

## What NOT to do
- Do NOT animate path `d` attributes — too many points, will lag
- Do NOT add motion to the crosshair — it must be instant via refs
- Do NOT use `transition-all` anywhere — specify exact properties
- Do NOT add `will-change` to every element — max 3-4 simultaneously, remove when not animating
- Do NOT animate layout properties (width, height, top, left) — only transform and opacity
- Do NOT forget `prefers-reduced-motion` — always respect user preference
- Do NOT use `style={{}}` for visual styling — Tailwind classes only. `style` is ONLY acceptable for SVG attributes without Tailwind equivalents
- Do NOT leave `will-change` on permanently — add on hover/animation start, remove on leave/end
- Do NOT add Framer Motion beyond the existing panel wrappers in `app/chart-test/page.tsx` — see CLAUDE.md
