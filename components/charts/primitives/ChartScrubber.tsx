'use client'

/**
 * ChartScrubber — mini-map / scrubber bar placed below stacked charts.
 *
 * Shows a miniature filled-area view of the full session data with a
 * draggable window representing the current zoom range. Lives OUTSIDE
 * ChartRoot as a sibling — it only needs ChartSyncProvider context.
 *
 * Usage:
 *   <ChartSyncProvider dataLength={fullData.length}>
 *     <ChartRoot data={visibleSlice}>…</ChartRoot>
 *     <ChartScrubber data={fullData} />
 *   </ChartSyncProvider>
 *
 * Interaction:
 *   - Drag the window → pan the view.
 *   - Click outside the window → center the view on that position.
 */

import { useRef, useMemo, useCallback } from 'react'
import { useChartSync } from './ChartSyncProvider'
import { lttb } from '@/lib/charts/utils/lttb'
import { cn } from '@/lib/utils'

// ─── Constants ───

const SCRUBBER_HEIGHT = 28
const MINI_SVG_HEIGHT = SCRUBBER_HEIGHT - 8 // 20px drawing area (4px padding top+bottom)
const MAX_SAMPLE_POINTS = 300

// ─── Types ───

export interface ChartScrubberProps {
  /** Full dataset (e.g. power values for the entire session). */
  data: readonly number[]
  /** Accent color for the mini area fill. */
  color?: string
  className?: string
}

// ─── Helpers ───

/** Downsample a numeric array to at most `max` points via LTTB. */
function sampleData(data: readonly number[], max: number): number[] {
  if (data.length <= max) return data.slice()
  const points = data.map((y, x) => ({ x, y }))
  return lttb(points, max).map((p) => p.y)
}

/** Build an SVG area path from raw values into a [0,width] x [0,height] box. */
function buildMiniAreaPath(
  values: readonly number[],
  width: number,
  height: number,
): string {
  const len = values.length
  if (len === 0) return ''

  let min = Infinity
  let max = -Infinity
  for (let i = 0; i < len; i++) {
    if (values[i] < min) min = values[i]
    if (values[i] > max) max = values[i]
  }

  // Avoid division by zero when all values are identical
  const range = max - min || 1

  const parts: string[] = new Array(len + 3)
  for (let i = 0; i < len; i++) {
    const px = ((i / (len - 1)) * width).toFixed(1)
    // Invert Y so higher values go up
    const py = (height - ((values[i] - min) / range) * height).toFixed(1)
    parts[i] = `${i === 0 ? 'M' : 'L'}${px},${py}`
  }

  // Close the area down to the baseline
  parts[len] = `L${width.toFixed(1)},${height.toFixed(1)}`
  parts[len + 1] = `L0,${height.toFixed(1)}`
  parts[len + 2] = 'Z'

  return parts.join('')
}

// ─── Component ───

export function ChartScrubber({
  data,
  color = '#E36B30',
  className,
}: ChartScrubberProps) {
  const sync = useChartSync()
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartZoomStart = useRef(0)

  // ─── Derived values ───

  const dataLength = sync?.dataLength ?? data.length
  const zoom = sync?.zoom ?? { start: 0, end: dataLength - 1 }

  // Window position as percentages of the full data
  const windowLeftPct = (zoom.start / dataLength) * 100
  const windowWidthPct = ((zoom.end - zoom.start) / dataLength) * 100

  // ─── Mini area path (computed once, or when data changes) ───

  const sampled = useMemo(() => sampleData(data, MAX_SAMPLE_POINTS), [data])

  const miniPath = useMemo(() => {
    // We'll use 100% width conceptually — the SVG viewBox handles scaling
    // Use a fixed coordinate space and let viewBox stretch
    return buildMiniAreaPath(sampled, 1000, MINI_SVG_HEIGHT)
  }, [sampled])

  // ─── Drag handlers ───

  const handleWindowPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!sync || !containerRef.current) return
      e.preventDefault()
      e.stopPropagation()

      dragging.current = true
      dragStartX.current = e.clientX
      dragStartZoomStart.current = sync.zoom.start

      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    },
    [sync],
  )

  const handleWindowPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current || !sync || !containerRef.current) return

      const containerWidth = containerRef.current.getBoundingClientRect().width
      const deltaX = e.clientX - dragStartX.current
      const deltaFraction = deltaX / containerWidth
      const deltaIndices = Math.round(deltaFraction * dataLength)

      const visibleRange = sync.zoom.end - sync.zoom.start
      const newStart = Math.max(
        0,
        Math.min(dataLength - visibleRange, dragStartZoomStart.current + deltaIndices),
      )

      sync.setZoom({
        start: newStart,
        end: newStart + visibleRange,
      })
    },
    [sync, dataLength],
  )

  const handleWindowPointerUp = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current) return
      dragging.current = false
      ;(e.target as HTMLElement).releasePointerCapture(e.pointerId)
    },
    [],
  )

  // ─── Click outside window → center view ───

  const handleContainerClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sync || !containerRef.current || dragging.current) return

      const rect = containerRef.current.getBoundingClientRect()
      const clickFraction = (e.clientX - rect.left) / rect.width
      const clickIndex = Math.round(clickFraction * dataLength)

      const visibleRange = sync.zoom.end - sync.zoom.start
      const halfRange = Math.floor(visibleRange / 2)

      const newStart = Math.max(0, Math.min(dataLength - visibleRange, clickIndex - halfRange))

      sync.setZoom({
        start: newStart,
        end: newStart + visibleRange,
      })
    },
    [sync, dataLength],
  )

  if (!sync) return null

  const fillColor = `${color}33` // 20% opacity hex

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={cn(
        'relative cursor-pointer select-none border-t border-[#E8E5DC] px-12 py-1',
        className,
      )}
      style={{ height: SCRUBBER_HEIGHT }}
    >
      {/* Mini area background */}
      <div className="relative h-full w-full overflow-hidden rounded-[4px] bg-[#F2F0EA]">
        {/* SVG mini area */}
        <svg
          viewBox={`0 0 1000 ${MINI_SVG_HEIGHT}`}
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
        >
          <path d={miniPath} fill={fillColor} />
        </svg>

        {/* Draggable zoom window */}
        <div
          onPointerDown={handleWindowPointerDown}
          onPointerMove={handleWindowPointerMove}
          onPointerUp={handleWindowPointerUp}
          className="absolute inset-y-0 cursor-grab rounded-[3px] border border-[#A8A49A] active:cursor-grabbing"
          style={{
            left: `${windowLeftPct}%`,
            width: `${windowWidthPct}%`,
            backgroundColor: 'rgba(56, 54, 51, 0.08)',
          }}
        />
      </div>
    </div>
  )
}
