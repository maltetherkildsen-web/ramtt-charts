// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartNavigator — premium minimap with draggable viewport and resize handles.
 *
 * Placed below stacked charts as a sibling. Reads ChartSyncProvider for zoom
 * state. All drag interactions are ref-based + document-level listeners for
 * zero re-renders on hot paths.
 *
 * Usage:
 *   <ChartSyncProvider dataLength={fullData.length}>
 *     <ChartRoot data={visibleSlice}>…</ChartRoot>
 *     <ChartNavigator data={fullData} />
 *   </ChartSyncProvider>
 */

import { useRef, useMemo, useCallback, useEffect } from 'react'
import { useChartSync } from './ChartSyncProvider'
import { lttb } from '@/lib/charts/utils/lttb'
import { cn } from '@/lib/utils'

// ─── Constants ───

const NAV_HEIGHT = 48
const MINI_HEIGHT = 40 // drawing area (4px padding top+bottom)
const MAX_SAMPLE = 300
const HANDLE_W = 8
const MIN_VP_PX = 20

// ─── Helpers ───

function sampleData(data: readonly number[], max: number): number[] {
  if (data.length <= max) return data.slice()
  const points = data.map((y, x) => ({ x, y }))
  return lttb(points, max).map((p) => p.y)
}

function buildMiniAreaPath(values: readonly number[], w: number, h: number): string {
  const len = values.length
  if (len === 0) return ''
  let mn = Infinity, mx = -Infinity
  for (let i = 0; i < len; i++) {
    if (values[i] < mn) mn = values[i]
    if (values[i] > mx) mx = values[i]
  }
  const range = mx - mn || 1
  const parts: string[] = new Array(len + 3)
  for (let i = 0; i < len; i++) {
    const px = ((i / (len - 1)) * w).toFixed(1)
    const py = (h - ((values[i] - mn) / range) * h).toFixed(1)
    parts[i] = `${i === 0 ? 'M' : 'L'}${px},${py}`
  }
  parts[len] = `L${w.toFixed(1)},${h.toFixed(1)}`
  parts[len + 1] = `L0,${h.toFixed(1)}`
  parts[len + 2] = 'Z'
  return parts.join('')
}

function buildMiniLinePath(values: readonly number[], w: number, h: number): string {
  const len = values.length
  if (len === 0) return ''
  let mn = Infinity, mx = -Infinity
  for (let i = 0; i < len; i++) {
    if (values[i] < mn) mn = values[i]
    if (values[i] > mx) mx = values[i]
  }
  const range = mx - mn || 1
  const parts: string[] = new Array(len)
  for (let i = 0; i < len; i++) {
    const px = ((i / (len - 1)) * w).toFixed(1)
    const py = (h - ((values[i] - mn) / range) * h).toFixed(1)
    parts[i] = `${i === 0 ? 'M' : 'L'}${px},${py}`
  }
  return parts.join('')
}

// ─── Types ───

export interface ChartNavigatorProps {
  /** Full dataset for the mini area chart. */
  data: readonly number[]
  /** Height in px. Default 48. */
  height?: number
  className?: string
}

// ─── Component ───

type DragMode = 'viewport' | 'left' | 'right' | null

export function ChartNavigator({
  data,
  height = NAV_HEIGHT,
  className,
}: ChartNavigatorProps) {
  const sync = useChartSync()
  const containerRef = useRef<HTMLDivElement>(null)

  // Drag state (ref-based, zero re-renders)
  const dragMode = useRef<DragMode>(null)
  const dragStartClientX = useRef(0)
  const dragStartLeft = useRef(0) // viewport left fraction at drag start
  const dragStartRight = useRef(0) // viewport right fraction at drag start

  // DOM refs for direct manipulation
  const vpRef = useRef<HTMLDivElement>(null)
  const dimLeftRef = useRef<HTMLDivElement>(null)
  const dimRightRef = useRef<HTMLDivElement>(null)
  const leftHandleRef = useRef<HTMLDivElement>(null)
  const rightHandleRef = useRef<HTMLDivElement>(null)

  // ─── Mini area path ───
  const sampled = useMemo(() => sampleData(data, MAX_SAMPLE), [data])
  const miniAreaPath = useMemo(() => buildMiniAreaPath(sampled, 1000, MINI_HEIGHT), [sampled])
  const miniLinePath = useMemo(() => buildMiniLinePath(sampled, 1000, MINI_HEIGHT), [sampled])

  // ─── Derived viewport fractions ───
  const dataLength = sync?.dataLength ?? data.length
  const zoom = sync?.zoom ?? { start: 0, end: dataLength - 1 }

  const vpLeftFrac = dataLength > 1 ? zoom.start / (dataLength - 1) : 0
  const vpRightFrac = dataLength > 1 ? zoom.end / (dataLength - 1) : 1

  // ─── Update DOM directly (zero re-renders) ───
  const updateViewportDOM = useCallback((leftFrac: number, rightFrac: number) => {
    const vp = vpRef.current
    const dl = dimLeftRef.current
    const dr = dimRightRef.current
    if (!vp || !dl || !dr) return

    const leftPct = (leftFrac * 100).toFixed(2)
    const rightPct = ((1 - rightFrac) * 100).toFixed(2)
    const widthPct = ((rightFrac - leftFrac) * 100).toFixed(2)

    vp.style.left = `${leftPct}%`
    vp.style.width = `${widthPct}%`
    dl.style.width = `${leftPct}%`
    dr.style.width = `${rightPct}%`
  }, [])

  // ─── Sync DOM with React state ───
  useEffect(() => {
    updateViewportDOM(vpLeftFrac, vpRightFrac)
  }, [vpLeftFrac, vpRightFrac, updateViewportDOM])

  // ─── Pointer handlers ───
  const onPointerDown = useCallback((e: React.PointerEvent, mode: DragMode) => {
    if (!sync || !containerRef.current) return
    e.preventDefault()
    e.stopPropagation()

    dragMode.current = mode
    dragStartClientX.current = e.clientX

    const dl = sync.dataLength
    dragStartLeft.current = dl > 1 ? sync.zoom.start / (dl - 1) : 0
    dragStartRight.current = dl > 1 ? sync.zoom.end / (dl - 1) : 1

    document.addEventListener('pointermove', handleDocMove)
    document.addEventListener('pointerup', handleDocUp)
    document.addEventListener('pointercancel', handleDocUp)
  }, [sync])

  const handleDocMove = useCallback((e: PointerEvent) => {
    if (!dragMode.current || !sync || !containerRef.current) return

    const containerW = containerRef.current.getBoundingClientRect().width
    if (containerW <= 0) return

    const deltaFrac = (e.clientX - dragStartClientX.current) / containerW
    const dl = sync.dataLength
    const minFrac = MIN_VP_PX / containerW

    let newLeft = dragStartLeft.current
    let newRight = dragStartRight.current

    if (dragMode.current === 'viewport') {
      const vpWidth = dragStartRight.current - dragStartLeft.current
      newLeft = dragStartLeft.current + deltaFrac
      newRight = newLeft + vpWidth
      // Clamp
      if (newLeft < 0) { newLeft = 0; newRight = vpWidth }
      if (newRight > 1) { newRight = 1; newLeft = 1 - vpWidth }
    } else if (dragMode.current === 'left') {
      newLeft = Math.max(0, Math.min(dragStartRight.current - minFrac, dragStartLeft.current + deltaFrac))
    } else if (dragMode.current === 'right') {
      newRight = Math.max(dragStartLeft.current + minFrac, Math.min(1, dragStartRight.current + deltaFrac))
    }

    // Update DOM immediately
    updateViewportDOM(newLeft, newRight)

    // Update sync zoom
    const startIdx = Math.round(newLeft * (dl - 1))
    const endIdx = Math.round(newRight * (dl - 1))
    if (endIdx > startIdx) {
      sync.setZoom({ start: Math.max(0, startIdx), end: Math.min(dl - 1, endIdx) })
    }
  }, [sync, updateViewportDOM])

  const handleDocUp = useCallback(() => {
    dragMode.current = null
    document.removeEventListener('pointermove', handleDocMove)
    document.removeEventListener('pointerup', handleDocUp)
    document.removeEventListener('pointercancel', handleDocUp)
  }, [handleDocMove])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.removeEventListener('pointermove', handleDocMove)
      document.removeEventListener('pointerup', handleDocUp)
      document.removeEventListener('pointercancel', handleDocUp)
    }
  }, [handleDocMove, handleDocUp])

  // ─── Click outside viewport → center view ───
  const handleContainerClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!sync || !containerRef.current || dragMode.current) return
    const rect = containerRef.current.getBoundingClientRect()
    const clickFrac = (e.clientX - rect.left) / rect.width
    const vpWidth = vpRightFrac - vpLeftFrac
    const halfVp = vpWidth / 2
    let newLeft = clickFrac - halfVp
    let newRight = clickFrac + halfVp
    if (newLeft < 0) { newLeft = 0; newRight = vpWidth }
    if (newRight > 1) { newRight = 1; newLeft = 1 - vpWidth }
    const dl = sync.dataLength
    sync.setZoom({
      start: Math.max(0, Math.round(newLeft * (dl - 1))),
      end: Math.min(dl - 1, Math.round(newRight * (dl - 1))),
    })
  }, [sync, vpLeftFrac, vpRightFrac])

  // ─── Scroll wheel → zoom viewport ───
  useEffect(() => {
    const el = containerRef.current
    if (!el || !sync) return

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      const rect = el.getBoundingClientRect()
      const cursorFrac = (e.clientX - rect.left) / rect.width
      const dl = sync.dataLength

      const currentLeft = dl > 1 ? sync.zoom.start / (dl - 1) : 0
      const currentRight = dl > 1 ? sync.zoom.end / (dl - 1) : 1
      const vpWidth = currentRight - currentLeft

      const zoomIn = e.deltaY < 0
      const factor = zoomIn ? 0.85 : 1.15
      let newWidth = Math.max(MIN_VP_PX / rect.width, Math.min(1, vpWidth * factor))
      if (newWidth >= 1) {
        sync.setZoom({ start: 0, end: dl - 1 })
        return
      }

      // Zoom centered on cursor
      const leftRatio = (cursorFrac - currentLeft) / vpWidth
      let newLeft = cursorFrac - leftRatio * newWidth
      let newRight = newLeft + newWidth
      if (newLeft < 0) { newLeft = 0; newRight = newWidth }
      if (newRight > 1) { newRight = 1; newLeft = 1 - newWidth }

      sync.setZoom({
        start: Math.max(0, Math.round(newLeft * (dl - 1))),
        end: Math.min(dl - 1, Math.round(newRight * (dl - 1))),
      })
    }

    el.addEventListener('wheel', handleWheel, { passive: false })
    return () => el.removeEventListener('wheel', handleWheel)
  }, [sync])

  if (!sync) return null

  return (
    <div
      ref={containerRef}
      onClick={handleContainerClick}
      className={cn('relative select-none', className)}
      style={{ height, touchAction: 'none' }}
    >
      {/* Mini area chart background */}
      <svg
        viewBox={`0 0 1000 ${MINI_HEIGHT}`}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <path d={miniAreaPath} fill="var(--n200)" />
        <path d={miniLinePath} fill="none" stroke="var(--n400)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      </svg>

      {/* Dimmed left overlay */}
      <div
        ref={dimLeftRef}
        className="absolute inset-y-0 left-0 pointer-events-none"
        style={{
          width: `${(vpLeftFrac * 100).toFixed(2)}%`,
          backgroundColor: 'var(--bg)',
          opacity: 0.6,
        }}
      />

      {/* Dimmed right overlay */}
      <div
        ref={dimRightRef}
        className="absolute inset-y-0 right-0 pointer-events-none"
        style={{
          width: `${((1 - vpRightFrac) * 100).toFixed(2)}%`,
          backgroundColor: 'var(--bg)',
          opacity: 0.6,
        }}
      />

      {/* Viewport window */}
      <div
        ref={vpRef}
        className="absolute inset-y-0"
        style={{
          left: `${(vpLeftFrac * 100).toFixed(2)}%`,
          width: `${((vpRightFrac - vpLeftFrac) * 100).toFixed(2)}%`,
          borderTop: '1px solid var(--n600)',
          borderBottom: '1px solid var(--n600)',
        }}
      >
        {/* Left handle */}
        <div
          ref={leftHandleRef}
          onPointerDown={(e) => onPointerDown(e, 'left')}
          className="absolute inset-y-0 -left-[4px] z-20"
          style={{ width: HANDLE_W, cursor: 'ew-resize !important' }}
        >
          <div
            className="absolute inset-y-1 left-[2px] rounded-[3px]"
            style={{ width: 4, backgroundColor: 'var(--n600)' }}
          />
        </div>

        {/* Center drag area */}
        <div
          onPointerDown={(e) => onPointerDown(e, 'viewport')}
          className="absolute inset-0 z-10"
          style={{ cursor: 'grab' }}
        />

        {/* Right handle */}
        <div
          ref={rightHandleRef}
          onPointerDown={(e) => onPointerDown(e, 'right')}
          className="absolute inset-y-0 -right-[4px] z-20"
          style={{ width: HANDLE_W, cursor: 'ew-resize !important' }}
        >
          <div
            className="absolute inset-y-1 right-[2px] rounded-[3px]"
            style={{ width: 4, backgroundColor: 'var(--n600)' }}
          />
        </div>
      </div>
    </div>
  )
}
