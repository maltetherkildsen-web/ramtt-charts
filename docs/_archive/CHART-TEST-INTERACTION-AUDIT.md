# CHART-TEST-INTERACTION-AUDIT.md — Deep-Dive into chart-test Interactions

> Generated 2026-04-16 from line-by-line code reading.
> Purpose: Verify whether removing Framer Motion would affect chart-test quality.

---

## 1. Zoom-interaktion

### 1a. Scroll-zoom (mousewheel / touchpad pinch vertical)

**File:** `components/charts/primitives/useChartZoom.ts` (lines 155-189)

**Technique:** Native `wheel` event on `<svg>` → direct `sync.setZoom()` call. No animation, no tween, no Framer.

```ts
// useChartZoom.ts:155-189
const handleWheel = (e: WheelEvent) => {
  e.preventDefault()

  if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    pan(e.shiftKey ? e.deltaY : e.deltaX)
    return
  }

  // Read from ref for instant access (no stale closure)
  const currentZoom = sync.zoomRef?.current ?? sync.zoom
  const range = currentZoom.end - currentZoom.start
  const dl = sync.dataLength
  const frac = getDataFraction(e)
  const zoomIn = e.deltaY < 0
  const factor = zoomIn ? (1 - ZOOM_SPEED) : (1 + ZOOM_SPEED)  // ZOOM_SPEED = 0.15
  let newRange = Math.round(range * factor)
  // ... clamp logic ...

  const cursorIdx = currentZoom.start + frac * range
  const newStart = Math.round(cursorIdx - frac * newRange)
  // ... clamp to bounds ...

  sync.setZoom({
    start: clampedEnd - newRange < 0 ? 0 : clampedEnd - newRange,
    end: clampedEnd,
  })
}

svg.addEventListener('wheel', handleWheel, { passive: false })
```

**How visualization updates:**

1. `sync.setZoom()` updates `zoomRef.current` **instantly** (ref-based, no re-render)
2. After 100ms debounce (`DEBOUNCE_MS`), it calls `setZoomState()` which triggers React re-render
3. `SyncedCharts` component reads `sync.zoom` → slices data arrays → re-renders ChartRoots

```ts
// ChartSyncProvider.tsx:89-98
const setZoom = useCallback((range) => {
  const newRange = typeof range === 'function' ? range(zoomRef.current) : range
  zoomRef.current = newRange  // ← instant, ref-based

  if (debounceTimer.current) clearTimeout(debounceTimer.current)
  debounceTimer.current = setTimeout(() => {
    setZoomState(newRange)    // ← debounced 100ms, triggers React re-render
  }, DEBOUNCE_MS)
}, [])
```

```ts
// chart-test/page.tsx:1543-1548
const sync = useChartSync()!
const { zoom } = sync
const { start, end } = zoom
const visPower = useMemo(() => power.slice(start, end + 1), [power, start, end])
```

**Framer involved?** No. Zero Framer code in the zoom chain.

**Tween/easing?** No. Zoom is **instantaneous** — each wheel tick recalculates the range and jumps directly. There is no smooth animation from old zoom to new zoom. The 100ms debounce on React state creates a "batch" effect but there is no interpolation.

---

### 1b. Pinch-to-zoom (multi-touch)

**File:** `useChartZoom.ts` (lines 112-152, 278-295)

**Technique:** Tracks 2 simultaneous pointers via `activePointers` Map. Calculates distance ratio between initial and current finger positions. Applies as zoom factor.

```ts
// useChartZoom.ts:130-152
const handlePinchMove = () => {
  const ps = pinchState.current
  if (!ps?.active) return
  const dist = getPointerDist()
  const scale = ps.initialDist / dist // >1 = zoom out, <1 = zoom in
  const newRange = Math.round(ps.initialRange * scale)
  // ... clamp + center on pinch center ...
  sync.setZoom({ start: ..., end: ... })
}
```

**Framer involved?** No.

---

### 1c. Brush/drag-select a range

**File:** `useChartZoom.ts` (lines 192-258, 278-330)

**Technique:** `pointerdown` on SVG → track start position → `pointermove` on document (for reliable capture) → `pointerup` calculates selected range → zooms to it.

```ts
// useChartZoom.ts:278-330 (simplified)
const handlePointerDown = (e: PointerEvent) => {
  if (e.button !== 0 || sync.zoomMode !== 'brush') return

  // Release implicit pointer capture (prevents pointercancel during re-render)
  try { (e.target as Element).releasePointerCapture(e.pointerId) } catch {}

  const cx = getChartX(e)
  dragState.current = { active: true, startX: cx }

  // Store brush fractions for synced overlay rendering
  const frac = Math.max(0, Math.min(1, cx / cw))
  sync.brush.current = { active: true, startFrac: frac, currentFrac: frac }

  // Document-level listeners (guaranteed to fire anywhere)
  document.addEventListener('pointermove', handleDocPointerMove)
  document.addEventListener('pointerup', handleDocPointerUp)
}

// On pointerup: zoom to selected range
const handleDocPointerUp = (e: PointerEvent) => {
  // ... calculate idx1, idx2 from drag start/end fractions ...
  if (idx2 - idx1 >= MIN_BRUSH_POINTS) {
    sync.setZoom({ start: Math.max(0, idx1), end: Math.min(dl - 1, idx2) })
  }
}
```

**Visual brush overlay** is rendered by `BrushOverlay.tsx` — a separate component that runs a `requestAnimationFrame` loop reading `sync.brush.current` (ref) and updates a div's `left`/`width` via `el.style.left`:

```ts
// BrushOverlay.tsx:28-49
const tick = () => {
  const b = sync.brush.current
  const el = overlayRef.current
  if (b.active) {
    const left = paddingLeft + minF * chartWidth
    const width = (maxF - minF) * chartWidth
    el.style.left = `${left}px`
    el.style.width = `${Math.max(0, width)}px`
    el.style.display = ''
  } else {
    el.style.display = 'none'
  }
  rafRef.current = requestAnimationFrame(tick)
}
```

**Framer involved?** No. Pure pointer events + rAF + direct DOM manipulation.

---

### 1d. Double-click to reset

**File:** `useChartZoom.ts` (lines 332-335)

```ts
const handleDblClick = (e: MouseEvent) => {
  e.preventDefault()
  sync.setZoom({ start: 0, end: sync.dataLength - 1 })
}

svg.addEventListener('dblclick', handleDblClick)
```

**Framer involved?** No. Instant reset, no animation.

---

### 1e. Keyboard zoom/pan

**File:** `useChartZoom.ts` (lines 338-386)

```ts
switch (e.key) {
  case 'ArrowLeft':  panByPoints(-step); break
  case 'ArrowRight': panByPoints(step); break
  case '+': case '=':
    // Zoom in 20% centered
    sync.setZoom({ start: s, end: Math.min(dl - 1, s + nr) })
    break
  case '-':
    // Zoom out 20%
    sync.setZoom({ start: ..., end: ... })
    break
  case 'Home': sync.setZoom({ start: 0, end: range }); break
  case 'End':  sync.setZoom({ start: dl - 1 - range, end: dl - 1 }); break
  case '0': case 'Escape':
    sync.setZoom({ start: 0, end: dl - 1 }); break
}
```

**Framer involved?** No.

---

### 1f. How zoom syncs across 5-7 charts

**File:** `ChartSyncProvider.tsx`

All charts are wrapped in one `<ChartSyncProvider dataLength={totalPoints}>`. Each `<ChartZoomHandler>` inside each `<ChartRoot>` calls `useChartZoom()` which reads `sync.setZoom()`.

Since `setZoom()` updates React state (debounced), and `SyncedCharts` reads `sync.zoom` to slice all data arrays, **all charts re-render together with the same zoom range**.

The **ref-based fast path** (`zoomRef.current`) gives the zoom handler instant access to current zoom without waiting for React re-render, preventing stale closures during rapid scroll-zoom.

**Framer involved?** No. React Context + useState + useRef.

---

## 2. Pan/scroll-side-to-side

**File:** `useChartZoom.ts` (lines 70-98, 155-160)

**Trigger:** Horizontal scroll (trackpad two-finger swipe) or Shift+mousewheel.

```ts
// useChartZoom.ts:155-160
const handleWheel = (e: WheelEvent) => {
  e.preventDefault()
  if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
    pan(e.shiftKey ? e.deltaY : e.deltaX)
    return
  }
  // ... else: zoom ...
}
```

**Pan uses a rAF accumulator** to batch sub-pixel scroll deltas:

```ts
// useChartZoom.ts:95-98
const pan = (deltaPixels: number) => {
  panAccum.current += deltaPixels
  if (!panRaf.current) panRaf.current = requestAnimationFrame(flushPan)
}
```

```ts
// useChartZoom.ts:71-93
const flushPan = () => {
  panRaf.current = 0
  const cw = getChartWidth()
  const currentZoom = sync.zoomRef?.current ?? sync.zoom
  const range = currentZoom.end - currentZoom.start
  const dataFrac = (panAccum.current / cw) * range
  const intDelta = Math.trunc(dataFrac)
  if (intDelta === 0) return

  panAccum.current -= (intDelta / range) * cw

  sync.setZoom((prev) => {
    let s = prev.start + intDelta
    let e = prev.end + intDelta
    // ... clamp ...
    return { start: Math.max(0, s), end: Math.min(dl - 1, e) }
  })
}
```

**How x-domain updates:** `sync.setZoom()` → React state updates (100ms debounce) → `SyncedCharts` slices all data arrays → all ChartRoots re-render with new data slice.

**Sync across charts:** Same mechanism as zoom — single `ChartSyncProvider`.

**Framer involved?** No. Pure `requestAnimationFrame` + ref accumulator.

---

## 3. Crosshair-hover

**File:** `components/charts/primitives/ChartCrosshair.tsx`

**Technique: Zero React state. 100% ref-based DOM manipulation via rAF.**

```ts
// ChartCrosshair.tsx:126-169
const handleMove = (e: MouseEvent) => {
  cancelAnimationFrame(rafRef.current)
  rafRef.current = requestAnimationFrame(() => {
    const rect = svg.getBoundingClientRect()
    const mx = e.clientX - rect.left - padding.left

    // O(log n) binary search for nearest data point
    idx = bisectNearest(pixelXs.current, mx)

    if (idx === lastIdx.current) return  // skip if same point
    lastIdx.current = idx

    showAt(idx)      // direct setAttribute on SVG elements
    onHover?.(idx)
    sync?.broadcastHover(idx, instanceId, clientY)
  })
}

svg.addEventListener('mousemove', handleMove)
svg.addEventListener('mouseleave', handleLeave)
```

**`showAt()` is pure DOM manipulation — zero React:**

```ts
// ChartCrosshair.tsx:69-89
const showAt = useCallback((idx: number) => {
  const line = lineRef.current
  const dot = dotRef.current
  if (!line || !dot) return

  const px = scaleX(idx)
  const py = scaleY(data[idx])

  line.setAttribute('x1', String(px))
  line.setAttribute('x2', String(px))
  dot.setAttribute('cx', String(px))
  dot.setAttribute('cy', String(py))
  dot.setAttribute('display', '')
}, [data, scaleX, scaleY])
```

**Sync across charts via `ChartSyncProvider`:**

Broadcasting chart broadcasts hover index to all siblings:
```ts
sync?.broadcastHover(idx, instanceId, clientY)
```

Each sibling ChartCrosshair subscribes:
```ts
// ChartCrosshair.tsx:98-119
const unsub = sync.subscribeHover((index, sourceId) => {
  if (sourceId === instanceId) return  // skip own broadcast
  if (index === null) { hide(); return }
  showAt(index)  // same direct DOM manipulation
})
```

**Framer involved?** No. Native event listeners + rAF + setAttribute + pub/sub pattern.

---

## 4. Scrubber/mini-map drag

There are TWO scrubber implementations. Chart-test uses **ChartNavigator** (the premium one).

### ChartNavigator (368 lines)

**File:** `components/charts/primitives/ChartNavigator.tsx`

**Drag technique:** Three drag modes (viewport pan, left-handle resize, right-handle resize), all via `onPointerDown` + document-level `pointermove`/`pointerup`.

```ts
// ChartNavigator.tsx:150-166
const onPointerDown = useCallback((e: React.PointerEvent, mode: DragMode) => {
  dragMode.current = mode
  dragStartClientX.current = e.clientX
  dragStartLeft.current = currentZoom.start / (dl - 1)
  dragStartRight.current = currentZoom.end / (dl - 1)

  document.addEventListener('pointermove', handleDocMove)
  document.addEventListener('pointerup', handleDocUp)
})
```

**DOM update during drag is direct manipulation — zero re-renders:**

```ts
// ChartNavigator.tsx:128-142
const updateViewportDOM = useCallback((leftFrac, rightFrac) => {
  const vp = vpRef.current
  const dl = dimLeftRef.current
  const dr = dimRightRef.current
  vp.style.left = `${leftPct}%`
  vp.style.width = `${widthPct}%`
  dl.style.width = `${leftPct}%`
  dr.style.width = `${rightPct}%`
}, [])
```

Then `sync.setZoom()` for the debounced React state update:

```ts
// ChartNavigator.tsx:194-202
updateViewportDOM(newLeft, newRight)  // instant DOM
sync.setZoom({ start: startIdx, end: endIdx })  // debounced React
```

**Also supports:** Click outside viewport to center, scroll-wheel to zoom on navigator.

**Framer involved?** No. Pure pointer events + ref-based DOM + React state for sync.

### ChartScrubber (251 lines) — simpler alternative

Same pattern: `onPointerDown` → document-level `pointermove`/`pointerup` → `sync.setZoom()`. Click outside centers. No Framer.

---

## 5. Brush-drag (range selection)

**File:** `useChartZoom.ts` (lines 278-330 for start, 192-258 for move/end)

Already covered in section 1c. Summary:

| Phase | Event | Where | Technique |
|-------|-------|-------|-----------|
| Start | `pointerdown` on SVG | `useChartZoom` | Sets `dragState.current`, updates `sync.brush.current` |
| Move | `pointermove` on document | `useChartZoom` | Updates `sync.brush.current.currentFrac` |
| Visual | rAF loop | `BrushOverlay.tsx` | Reads `sync.brush.current`, sets `el.style.left/width` |
| End | `pointerup` on document | `useChartZoom` | Calculates index range, calls `sync.setZoom()` |
| Cancel | `Escape` key | `useChartZoom` | Clears brush, removes listeners |

**Framer involved?** No.

---

## 6. The 7+1 Framer usages in chart-test — verified

### Usage 1: Fullscreen overlay (lines 691-714)

```tsx
<AnimatePresence>
  {isFullscreen && (
    <motion.div
      key="fullscreen"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[9999] bg-(--bg)"
    >
      <FullscreenOverlay ... />
    </motion.div>
  )}
</AnimatePresence>
```

**What it does:** Fade+scale when entering/exiting fullscreen mode.
**What it does NOT do:** Nothing to do with zoom, pan, brush, crosshair, or chart rendering.

### Usages 2-8: Chart panel collapse/expand (lines 1608-1763)

Seven identical wrappers — one per channel: Power, HR, kJ/min, Cadence, Speed, Elevation, Torque.

Example (Power):
```tsx
<AnimatePresence initial={false}>
  {visibleCharts.has('power') && (
    <motion.div
      key="power"
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="overflow-hidden"
    >
      <ChartRoot data={visPower} height={h('power')} ...>
        <ChartAxisY />
        <ChartRefLine />
        <ChartArea />
        <ChartLine />
        <ChartCrosshair />
        <ChartZoomHandler />
      </ChartRoot>
    </motion.div>
  )}
</AnimatePresence>
```

**What it does:** When you toggle a chart channel on/off via the toggle buttons, the panel animates `height: 0 ↔ auto` with a 200ms fade.

**What it does NOT do:** The `<ChartRoot>`, `<ChartCrosshair>`, `<ChartZoomHandler>` and ALL interaction primitives inside are completely independent of the `<motion.div>` wrapper. Framer only controls the panel's enter/exit visibility — it has zero involvement in any chart interaction.

### Usage 9: MotionConfig (line 373)

```tsx
<MotionConfig reducedMotion="user">
  <SessionAnalysis ... />
</MotionConfig>
```

**Redundant.** `prefers-reduced-motion` is already handled globally in tokens.css.

### Any usage we missed?

**I searched exhaustively:**

```bash
grep -n "motion\|framer\|AnimatePresence\|MotionConfig\|useMotion\|useSpring\|useAnimation\|whileHover\|whileTap\|layoutId\|variants=" app/chart-test/page.tsx
```

**Result: Only the 9 usages listed above.** All on lines 25 (import), 373-375 (MotionConfig), 691-714 (fullscreen), and 1608-1763 (7 panels). Nothing else.

**Critical verification:** None of these files import from `motion` or `framer-motion`:
- `useChartZoom.ts` — imports: `useEffect`, `useRef`, `useChart`, `useChartSync`
- `ChartSyncProvider.tsx` — imports: `createContext`, `useContext`, `useRef`, `useState`, `useMemo`, `useCallback`
- `ChartCrosshair.tsx` — imports: `useRef`, `useEffect`, `useCallback`, `useId`, `bisectNearest`, `nearest2d`, `useChart`, `useChartSync`
- `ChartNavigator.tsx` — imports: `useRef`, `useMemo`, `useCallback`, `useEffect`, `useChartSync`, `lttb`, `cn`
- `BrushOverlay.tsx` — imports: `useRef`, `useEffect`, `SELECTION_SAND`, `useChartSync`
- `ChartRoot.tsx` — imports: `useRef`, `useState`, `useMemo`, `useEffect`, `scaleLinear`, `extentOf`, `cn`, `ChartContext`
- `CrosshairTimeLabel.tsx` — imports: `useRef`, `useEffect`, `useChartSync`
- `ChartZoomHandler.tsx` — imports: `useRef`, `useChartZoom`

**Zero Framer in any interaction primitive.**

---

## 7. Smooth zoom-animation — does it exist?

**No. Zoom is instantaneous.**

When the user scrolls the mousewheel:

1. `handleWheel` fires → calculates new `start`/`end` immediately
2. `sync.setZoom()` writes to `zoomRef.current` (instant)
3. After 100ms debounce, React state updates
4. `SyncedCharts` re-renders with new data slice
5. All ChartRoots render with new data — no interpolation between old and new

**There is no tween, no spring, no `requestAnimationFrame` interpolation loop, no CSS transition on the chart content.** The zoom feels responsive because:

- Each wheel tick changes the visible range by exactly `ZOOM_SPEED = 0.15` (15%)
- The trackpad/mousewheel fires at 60-120Hz on modern hardware
- The debounce (100ms) batches rapid ticks but doesn't animate between them

This is the same approach as Google Maps, VS Code's minimap, and most high-performance data viz tools — direct snapping, not animated tweening.

**Does Framer contribute to zoom smoothness?** No. The `<motion.div>` wrapper only handles panel show/hide, not zoom transitions.

---

## 8. Performance Architecture

### Update rate

Cannot measure FPS from code reading alone, but the architecture is designed for 60fps:

- **Crosshair hover:** `mousemove` → rAF → `setAttribute` (bypasses React entirely)
- **Brush drag:** `pointermove` → rAF → `el.style.left/width` (bypasses React entirely)
- **Navigator drag:** `pointermove` → `el.style.left/width` (instant DOM) + `sync.setZoom` (debounced)
- **Scroll zoom:** `wheel` → `sync.setZoom` → ref update (instant) + React re-render (100ms debounce)

### Re-renders per interaction

| Interaction | React re-renders |
|------------|-----------------|
| Crosshair hover | **0** — fully ref-based |
| Brush drag (while dragging) | **0** — rAF reads ref, updates DOM |
| Brush release (zoom to selection) | **1** — single `setZoom` |
| Scroll zoom (per wheel tick) | **0 during scroll**, **1 per 100ms** — debounced |
| Navigator drag | **0 during drag** (DOM direct), **1 per 100ms** — debounced |
| Panel toggle on/off | **1** — `visibleCharts` state change |

### Memory consideration

When a chart panel is toggled OFF with the current Framer `AnimatePresence`, the `<ChartRoot>` and all its SVG elements are **unmounted from the DOM** after the exit animation. This saves DOM nodes but the data arrays are still held in memory by the parent.

---

## 9. Direct Answers to Malte's Concerns

### Q1: Can scroll-zoom / pan / brush / crosshair be built 100% without Framer?

**Yes — they already ARE 100% without Framer.**

Every interaction in chart-test is built with:
- Native `wheel`/`pointer`/`keyboard` events
- `useRef` + `requestAnimationFrame` for hot paths
- `setAttribute` / `el.style.*` for DOM updates
- `ChartSyncProvider` (React Context + useState + debounce) for chart sync

Framer Motion is not in the interaction chain at any point. It only wraps the **outer div** of each chart panel for show/hide animation.

### Q2: Does chart-test use Framer for anything hard to replicate?

**No.**

The only Framer features used are:
1. `AnimatePresence` for unmount animation (height collapse)
2. `motion.div` for `height: 0 → auto` + opacity fade
3. `MotionConfig` for reduced motion (already handled by CSS)

None of these touch chart rendering or interaction. They are cosmetic panel transitions.

### Q3: If we remove Framer, will the user notice?

**For interactions: No — zero difference.** Zoom, pan, brush, crosshair, scrubber, keyboard nav — all untouched.

**For panel toggles: Depends on replacement quality.**
- If replaced with CSS `grid-template-rows` accordion pattern: **No difference** — same smooth collapse animation.
- If replaced with instant show/hide (no animation): **Minor difference** — panels snap instead of sliding. This is a cosmetic downgrade but doesn't affect functionality.
- If replaced with keeping panels mounted but collapsed: **No visual difference** to the user.

### Q4: Have we overlooked any Framer usage?

**No.** I grep-verified every line of `chart-test/page.tsx` and read every imported file (`useChartZoom.ts`, `ChartSyncProvider.tsx`, `ChartCrosshair.tsx`, `ChartNavigator.tsx`, `ChartScrubber.tsx`, `BrushOverlay.tsx`, `ChartRoot.tsx`, `CrosshairTimeLabel.tsx`, `ChartZoomHandler.tsx`). None of them import or use Framer Motion.

The Framer usage is:
- Line 25: `import { motion, AnimatePresence, MotionConfig } from 'motion/react'`
- Line 373: `<MotionConfig reducedMotion="user">`
- Lines 691-714: Fullscreen overlay (1 occurrence)
- Lines 1608-1763: Chart panel collapse (7 occurrences)

That is the complete list.

---

## 10. Final Verdict

### A) SAFE TO REMOVE

Framer Motion is used **exclusively** for cosmetic panel collapse/expand animations in chart-test. Every actual chart interaction — zoom, pan, brush, crosshair, scrubber, navigator, keyboard nav, pinch-to-zoom — is built with native browser APIs and custom ref-based architecture. The interaction quality of chart-test is **entirely independent** of Framer Motion.

**What Framer does in chart-test:**
- Animates `height: 0 ↔ auto` when toggling chart channels (7×)
- Fades fullscreen overlay on enter/exit (1×)
- Wraps root in `MotionConfig` for reduced motion (redundant)

**What Framer does NOT do in chart-test:**
- No zoom animation
- No pan animation
- No brush/selection
- No crosshair tracking
- No scrubber/navigator drag
- No data rendering
- No SVG manipulation
- No performance optimization

The existing codebase already has a CSS solution for the `height: auto` problem (Accordion's `grid-template-rows: 0fr → 1fr` in tokens.css). Replacing the 7 Framer panel wrappers with this pattern is a straightforward refactor that preserves the same visual behavior.

**Removing Framer Motion will not reduce the quality of chart-test in any way.**
