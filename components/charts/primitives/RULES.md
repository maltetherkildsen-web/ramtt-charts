# @ramtt/charts — System Rules

These rules are non-negotiable. Every chart primitive, math utility, and demo example follows them.
When Claude Code or any developer builds new chart components, these rules apply from the first line.

## Rule Zero
**NEVER build chart code without reading this file first.**
Every new primitive, math utility, or demo chart MUST follow these rules from the FIRST LINE. No "build it quick and fix later."

---

## Architecture

### ChartRoot Context
- All cartesian primitives consume `useChart()` from `chart-context.ts`
- ChartRoot provides: `scaleX`, `scaleY`, `chartWidth`, `chartHeight`, `padding`, `data`, `svgRef`, `decimationFactor`
- Non-cartesian primitives (ChartDonut) render their own `<svg>` — they do NOT use ChartRoot

### className Prop
- Every primitive MUST accept an optional `className?: string` prop
- Use `cn()` from `@/lib/utils` to merge defaults with user overrides
- Never drop the user's className

### Data Flow
- ChartRoot accepts `data: readonly number[]` and creates scales
- Child primitives can override data via their own `data` prop
- For categorical/bar charts: use `xDomain={[-0.5, N-0.5]}` for band positioning
- For stacked charts: use `y0Accessor` + `yAccessor` on ChartArea
- For dual Y-axis: use `yDomain` override on ChartLine and `domain` + `position="right"` on ChartAxisY

### Barrel Exports
- All `Chart*.tsx` primitives must be importable from their file path
- All math utilities must be exported from `lib/charts/index.ts`
- New paths, scales, ticks, or utils → add to `lib/charts/index.ts`

---

## Interaction Model

### Taxonomy — choose ONE per chart type:

| Category | Pattern | When | Example |
|----------|---------|------|---------|
| **Continuous** | Crosshair (vertical line + dot) | Time series, sensor data, stock prices | Charts 1-4, stacked area |
| **Discrete** | Bar spotlight (hovered = 100%, others = 40%) + value pill | Bar charts, categorical data | Monthly sales, P&L |
| **Proportional** | Segment highlight (translate out + fade others) + center text | Donut, pie, treemap | Budget allocation |
| **Micro** | None | Sparklines, tiny inline charts | Key metrics strip |

**NEVER put a crosshair on a bar chart. NEVER put bar spotlight on continuous data.**

### Continuous (ChartCrosshair)
- Vertical line follows cursor, snaps to nearest data point via `bisectNearest`
- Dot on the data line at the snapped index
- Uses native SVG mouse listeners on the `<svg>` element
- Zero React state — refs + rAF + direct `setAttribute`

### Discrete (Bar Spotlight)
- Invisible `<rect>` overlay captures all pointer events
- On hover: find nearest bar via `scaleX.inverse(localX)` + `Math.round` + clamp
- Hovered bar: `opacity: 1`. All other bars: `opacity: 0.4`
- Value pill: dark pill (`var(--n1150)`) with white text above bar, arrow pointing down
- For negative values: pill below bar, arrow pointing up
- All via refs + `requestAnimationFrame` — ZERO React state on mousemove

### Proportional (Segment Highlight)
- `onPointerEnter` / `onPointerLeave` directly on each `<path>` segment
- Hovered: translate outward 6px along segment midpoint angle
- Others: fade to 50% opacity
- Center text updates to show hovered segment name + value
- Legend items sync with segment hover (bidirectional)
- All via refs + rAF — ZERO React state

### Micro (No Interaction)
- Sparklines have no hover, no crosshair, no tooltip
- Pure visual trend indicator
- ChartRoot + ChartLine + ChartArea at small dimensions, no axes

---

## Performance Contract

### Zero Re-renders on Hover
- **NEVER** use `useState` for hover index, mouse position, or tooltip visibility
- **ALWAYS** use `useRef` + `requestAnimationFrame` + direct DOM manipulation
- Pattern: `ref.current.style.opacity = '...'` and `ref.current.setAttribute('transform', '...')`
- CSS transitions handle smoothing: `transition: opacity 150ms` on the element

### Downsampling
- ChartLine and ChartArea use hybrid `smoothDecimate` for zoom-adaptive rendering
- Target: `chartWidth * decimationFactor` points (default 0.3)
- Full data retained in context for correct crosshair/tooltip indices

### Bisect
- `bisectNearest` for O(log n) nearest-point lookup on hover
- Pre-computed pixel-x arrays cached in `useEffect`, stored in `useRef`

---

## SVG Typography

### Font Family
- **ALL** SVG `<text>` elements MUST have explicit `fontFamily` attribute or `style={{ fontFamily: 'var(--font-sans)' }}`
- Tailwind font classes (`font-sans`, `font-mono`) do NOT work on SVG `<text>` — they are ignored
- The only font is Satoshi: `var(--font-sans)`

### Weight Hierarchy (same as @ramtt/ui)
- 400: axis labels, body text
- 450: units, secondary text, subtitle
- 500: legends, badges
- 550: values, titles, strong emphasis

### Numeric Formatting
- All numbers in SVG: `fontVariantNumeric: 'tabular-nums'` as inline style
- Numbers align vertically in axis labels

### No Banned Fonts
- NEVER use `JetBrains Mono`, `Space Grotesk`, `Instrument Sans`, `Inter`, `Commit Mono`
- Satoshi is the ONLY font. Period.

---

## Visual Rules

### Axes
- Y-axis labels: `text-[9px]`, `fill-(--n600)`, `var(--font-sans)`, tabular-nums
- X-axis labels: `text-[10px]`, `fill-(--n600)`, `var(--font-sans)`
- No tick marks — labels only
- Right Y-axis: `position="right"` prop, same styling as left

### Grid Lines
- No visible grid lines by default
- If added: `stroke: var(--n200)`, 0.5px, very subtle

### Reference Lines
- ChartRefLine: dashed by default (`strokeDasharray="4 4"`, 0.5px)
- Zero lines on P&L charts: solid (not dashed), `stroke: var(--n600)`, 1px

### Colors
- Chart data colors use Tailwind classes: `fill-blue-500`, `stroke-emerald-500`, etc.
- OR hex values for zone/signal colors (whitelisted in audit)
- UI chrome (axes, labels, borders) uses CSS variables: `var(--n600)`, `var(--n1150)`, etc.
- NEVER use neutral hex colors inline — always CSS variables

### Transitions
- Bar opacity: `150ms`
- Donut segment transform: `200ms ease-out`
- Label/pill appearance: `100ms`
- NEVER use `transition-all` — specify exact properties

### Cursor
- `cursor: default` everywhere — globally set in globals.css
- NEVER set `cursor: pointer`, `cursor: crosshair`, or `cursor: grab` on chart elements
- Exception: drag handles in scrubber/brush use `cursor: grab`/`cursor: grabbing`

### Cards & Containers
- Card: `rounded-[12px] border-[0.5px] border-(--n400) bg-(--n50) p-5`
- No box-shadow on chart cards
- Title: `text-[22px] font-[550] text-(--n1150)` (sentence case)
- Subtitle: `text-[11px] font-[450] text-(--n600)` (describes components used)

### Legend
- Position: below chart for cartesian, right of chart for donut
- Each item: colored indicator (8x8px, `rounded-[2px]`) + label
- Text: `text-[12px] text-(--n800)`

---

## Testing

### Math Utilities (lib/charts/)
- Every math function MUST have unit tests
- Test file: adjacent `__tests__/` directory or `.test.ts` suffix
- Pure functions → easy to test, no excuse for skipping

### React Primitives (components/charts/primitives/)
- New primitives SHOULD have tests
- Test that the component renders without errors
- Test that the correct number of SVG elements are produced

---

## Composability Contract

### Primitives Compose Freely
- Any combination of ChartLine, ChartArea, ChartBar, ChartRefLine, etc. inside one ChartRoot
- Multiple ChartLines with different data → multi-series
- ChartBar + ChartLine → composed chart (dual Y-axis)
- Stacked ChartAreas with y0Accessor → stacked area chart

### Sync Across Charts
- ChartSyncProvider wraps multiple ChartRoots for crosshair sync
- ChartZoomHandler syncs zoom/brush across charts
- ChartScrubber provides mini-map navigation

### Self-Contained Non-Cartesian
- ChartDonut is self-contained (own SVG, own layout)
- Future polar/radial charts should follow the same pattern
- No ChartRoot dependency for non-cartesian types

---

## Build Checklist — New Primitive

1. Read this RULES.md
2. Determine interaction category (continuous / discrete / proportional / micro)
3. Write math utility in `lib/charts/` if needed + tests
4. Export from `lib/charts/index.ts`
5. Write React primitive in `components/charts/primitives/`
6. Accept `className` prop, use `cn()` for merging
7. Use `useChart()` for cartesian, own SVG for non-cartesian
8. SVG text: explicit `fontFamily`, Satoshi only
9. Hover: refs + rAF, zero useState
10. Add demo example to `/app/demo/page.tsx` with correct interaction model
11. Run `npm run audit:charts` — must pass with zero errors
