// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * useChartZoom — zoom, pan, brush, and keyboard navigation for synced charts.
 *
 * Zoom:     vertical scroll → zoom in/out centered on cursor X
 * Pan:      horizontal scroll (trackpad) or shift+scroll → fractional pan
 * Brush:    click + drag → select range → zoom to selection on release
 * Keyboard: arrows pan, +/- zoom, Home/End jump, Esc reset
 */

import { useEffect, useRef } from 'react'
import { useChart } from './chart-context'
import { useChartSync } from './ChartSyncProvider'

const MIN_VISIBLE_POINTS = 2
const ZOOM_SPEED = 0.15
const MIN_BRUSH_POINTS = 2

export function useChartZoom(brushRef: React.RefObject<SVGRectElement | null>) {
  const { padding, svgRef, data } = useChart()
  const sync = useChartSync()
  const dragState = useRef<{ active: boolean; startX: number } | null>(null)
  const panAccum = useRef(0)
  const panRaf = useRef(0)

  // Pinch-to-zoom state: tracks two simultaneous pointers
  const pinchState = useRef<{
    active: boolean
    pointerId1: number
    pointerId2: number
    initialDist: number
    initialRange: number
    centerFrac: number
  } | null>(null)
  const activePointers = useRef(new Map<number, { x: number; y: number }>())

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || !sync) return

    const getChartX = (e: MouseEvent): number => {
      const rect = svg.getBoundingClientRect()
      return e.clientX - rect.left - padding.left
    }

    const getChartWidth = (): number => {
      const rect = svg.getBoundingClientRect()
      return rect.width - padding.left - padding.right
    }

    const getDataFraction = (e: MouseEvent): number => {
      const cw = getChartWidth()
      return Math.max(0, Math.min(1, getChartX(e) / cw))
    }

    // ─── Clear brush state ───
    const clearBrush = () => {
      if (sync.brush?.current) {
        sync.brush.current = { active: false, startFrac: 0, currentFrac: 0 }
      }
      const brush = brushRef.current
      if (brush) brush.setAttribute('display', 'none')
      dragState.current = null
    }

    // ─── Pan with fractional accumulator ───
    const flushPan = () => {
      panRaf.current = 0
      const cw = getChartWidth()
      if (cw <= 0) return

      const currentZoom = sync.zoomRef?.current ?? sync.zoom
      const range = currentZoom.end - currentZoom.start
      const dataFrac = (panAccum.current / cw) * range
      const intDelta = Math.trunc(dataFrac)
      if (intDelta === 0) return

      panAccum.current -= (intDelta / range) * cw
      const dl = sync.dataLength

      sync.setZoom((prev) => {
        let s = prev.start + intDelta
        let e = prev.end + intDelta
        const r = prev.end - prev.start
        if (s < 0) { s = 0; e = r }
        if (e > dl - 1) { e = dl - 1; s = e - r }
        return { start: Math.max(0, s), end: Math.min(dl - 1, e) }
      })
    }

    const pan = (deltaPixels: number) => {
      panAccum.current += deltaPixels
      if (!panRaf.current) panRaf.current = requestAnimationFrame(flushPan)
    }

    const panByPoints = (points: number) => {
      const dl = sync.dataLength
      sync.setZoom((prev) => {
        const r = prev.end - prev.start
        let s = prev.start + points
        let e = prev.end + points
        if (s < 0) { s = 0; e = r }
        if (e > dl - 1) { e = dl - 1; s = e - r }
        return { start: Math.max(0, s), end: Math.min(dl - 1, e) }
      })
    }

    // ─── Pinch-to-zoom: multi-touch gesture ───
    const getPointerDist = (): number => {
      const pts = [...activePointers.current.values()]
      if (pts.length < 2) return 0
      const dx = pts[1].x - pts[0].x
      const dy = pts[1].y - pts[0].y
      return Math.sqrt(dx * dx + dy * dy)
    }

    const getPointerCenterFrac = (): number => {
      const pts = [...activePointers.current.values()]
      if (pts.length < 2) return 0.5
      const rect = svg.getBoundingClientRect()
      const cx = (pts[0].x + pts[1].x) / 2 - rect.left - padding.left
      const cw = rect.width - padding.left - padding.right
      return Math.max(0, Math.min(1, cx / cw))
    }

    const handlePinchMove = () => {
      const ps = pinchState.current
      if (!ps?.active) return
      const dist = getPointerDist()
      if (dist <= 0 || ps.initialDist <= 0) return

      const scale = ps.initialDist / dist // >1 = zoom out, <1 = zoom in
      const dl = sync.dataLength
      const newRange = Math.round(ps.initialRange * scale)

      if (newRange < MIN_VISIBLE_POINTS || newRange >= dl) return

      const currentZoom = sync.zoomRef?.current ?? sync.zoom
      const cursorIdx = currentZoom.start + ps.centerFrac * ps.initialRange
      const newStart = Math.round(cursorIdx - ps.centerFrac * newRange)
      const clampedStart = Math.max(0, newStart)
      const clampedEnd = Math.min(dl - 1, clampedStart + newRange)

      sync.setZoom({
        start: clampedEnd - newRange < 0 ? 0 : clampedEnd - newRange,
        end: clampedEnd,
      })
    }

    // ─── Wheel: zoom or pan ───
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
      const factor = zoomIn ? (1 - ZOOM_SPEED) : (1 + ZOOM_SPEED)
      let newRange = Math.round(range * factor)
      if (zoomIn && newRange >= range && range > MIN_VISIBLE_POINTS) newRange = range - 1
      if (!zoomIn && newRange <= range) newRange = range + 1

      if (zoomIn && newRange < MIN_VISIBLE_POINTS) return
      if (!zoomIn && newRange >= dl) {
        sync.setZoom({ start: 0, end: dl - 1 })
        return
      }

      const cursorIdx = currentZoom.start + frac * range
      const newStart = Math.round(cursorIdx - frac * newRange)
      const clampedStart = Math.max(0, newStart)
      const clampedEnd = Math.min(dl - 1, clampedStart + newRange)

      sync.setZoom({
        start: clampedEnd - newRange < 0 ? 0 : clampedEnd - newRange,
        end: clampedEnd,
      })
    }

    // ─── Brush: document-level move/up during drag ───
    const handleDocPointerMove = (e: PointerEvent) => {
      // Update pointer tracking for pinch
      if (activePointers.current.has(e.pointerId)) {
        activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })
      }

      // Handle pinch gesture
      if (pinchState.current?.active) {
        handlePinchMove()
        return
      }

      const state = dragState.current
      if (!state?.active) return
      const cx = getChartX(e)
      const cw = getChartWidth()

      const frac = Math.max(0, Math.min(1, cx / cw))
      if (sync.brush?.current) {
        sync.brush.current.currentFrac = frac
      }

      const brush = brushRef.current
      if (brush) {
        const x = Math.max(0, Math.min(state.startX, cx))
        const w = Math.min(cw - x, Math.abs(cx - state.startX))
        brush.setAttribute('x', String(x))
        brush.setAttribute('width', String(Math.max(0, w)))
      }
    }

    const removeDragListeners = () => {
      document.removeEventListener('pointermove', handleDocPointerMove)
      document.removeEventListener('pointerup', handleDocPointerUp)
      document.removeEventListener('pointercancel', handleDocPointerCancel)
      document.removeEventListener('keydown', handleDragKeyDown)
    }

    const handleDocPointerUp = (e: PointerEvent) => {
      // Clean up pointer tracking
      activePointers.current.delete(e.pointerId)
      if (pinchState.current?.active) {
        if (activePointers.current.size < 2) {
          pinchState.current = null
        }
        return
      }

      const state = dragState.current
      if (!state?.active) return

      removeDragListeners()

      const cx = getChartX(e)
      const cw = getChartWidth()
      const currentZoom = sync.zoomRef?.current ?? sync.zoom
      const range = currentZoom.end - currentZoom.start
      const frac1 = Math.max(0, Math.min(1, state.startX / cw))
      const frac2 = Math.max(0, Math.min(1, cx / cw))
      const idx1 = Math.round(currentZoom.start + Math.min(frac1, frac2) * range)
      const idx2 = Math.round(currentZoom.start + Math.max(frac1, frac2) * range)

      clearBrush()

      if (idx2 - idx1 >= MIN_BRUSH_POINTS) {
        sync.setZoom({ start: Math.max(0, idx1), end: Math.min(sync.dataLength - 1, idx2) })
      }
    }

    const handleDocPointerCancel = (e: PointerEvent) => {
      activePointers.current.delete(e.pointerId)
      pinchState.current = null
      removeDragListeners()
      clearBrush()
    }

    // Escape key cancels active brush drag
    const handleDragKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dragState.current?.active) {
        e.preventDefault()
        removeDragListeners()
        clearBrush()
      }
    }

    // ─── Brush: pointerdown on SVG starts drag (or pinch) ───
    const handlePointerDown = (e: PointerEvent) => {
      // Track all active pointers for pinch detection
      activePointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY })

      // If 2 pointers active → start pinch
      if (activePointers.current.size === 2) {
        // Cancel any active brush drag
        clearBrush()
        pinchState.current = {
          active: true,
          pointerId1: [...activePointers.current.keys()][0],
          pointerId2: [...activePointers.current.keys()][1],
          initialDist: getPointerDist(),
          initialRange: (sync.zoomRef?.current ?? sync.zoom).end - (sync.zoomRef?.current ?? sync.zoom).start,
          centerFrac: getPointerCenterFrac(),
        }
        return
      }

      if (e.button !== 0) return
      // Skip brush in navigator/none modes
      if (sync.zoomMode !== 'brush') return

      // Release implicit pointer capture the browser sets on the target element.
      // Without this, browser fires pointercancel when the captured <path>/<svg>
      // changes during drag (downsampling re-render).
      try { (e.target as Element).releasePointerCapture(e.pointerId) } catch {}

      const cx = getChartX(e)
      const cw = getChartWidth()
      dragState.current = { active: true, startX: cx }

      const parent = svg.closest('[tabindex]') as HTMLElement | null
      parent?.focus({ preventScroll: true })

      const frac = Math.max(0, Math.min(1, cx / cw))
      if (sync.brush?.current) {
        sync.brush.current = { active: true, startFrac: frac, currentFrac: frac }
      }

      const brush = brushRef.current
      if (brush) {
        brush.setAttribute('x', String(Math.max(0, cx)))
        brush.setAttribute('width', '0')
        brush.setAttribute('display', '')
      }

      // Document-level listeners — guaranteed to fire regardless of pointer position
      document.addEventListener('pointermove', handleDocPointerMove)
      document.addEventListener('pointerup', handleDocPointerUp)
      document.addEventListener('pointercancel', handleDocPointerCancel)
      document.addEventListener('keydown', handleDragKeyDown)
    }

    const handleDblClick = (e: MouseEvent) => {
      e.preventDefault()
      sync.setZoom({ start: 0, end: sync.dataLength - 1 })
    }

    // ─── Keyboard ───
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      const currentZoom = sync.zoomRef?.current ?? sync.zoom
      const range = currentZoom.end - currentZoom.start
      const dl = sync.dataLength
      const step = Math.max(1, Math.round(range * 0.05))

      switch (e.key) {
        case 'ArrowLeft':
          e.preventDefault()
          panByPoints(-step)
          break
        case 'ArrowRight':
          e.preventDefault()
          panByPoints(step)
          break
        case '+': case '=':
          e.preventDefault()
          { const amt = Math.max(1, Math.round(range * 0.2))
            const nr = Math.max(MIN_VISIBLE_POINTS, range - amt)
            const c = currentZoom.start + range / 2
            const s = Math.max(0, Math.round(c - nr / 2))
            sync.setZoom({ start: s, end: Math.min(dl - 1, s + nr) }) }
          break
        case '-':
          e.preventDefault()
          { const amt = Math.max(1, Math.round(range * 0.2))
            const nr = Math.min(dl - 1, range + amt)
            const c = currentZoom.start + range / 2
            const s = Math.max(0, Math.round(c - nr / 2))
            const end = Math.min(dl - 1, s + nr)
            sync.setZoom({ start: end - nr < 0 ? 0 : end - nr, end }) }
          break
        case 'Home':
          e.preventDefault()
          sync.setZoom({ start: 0, end: Math.min(dl - 1, range) })
          break
        case 'End':
          e.preventDefault()
          sync.setZoom({ start: Math.max(0, dl - 1 - range), end: dl - 1 })
          break
        case '0': case 'Escape':
          e.preventDefault()
          sync.setZoom({ start: 0, end: dl - 1 })
          break
        default: return
      }
    }

    const container = (svg.closest('[tabindex]') ?? svg) as HTMLElement
    if (!container.hasAttribute('tabindex')) container.setAttribute('tabindex', '0')

    // pointercancel from implicit capture — must be on SVG directly (where capture lives)
    const handleSvgPointerCancel = (e: PointerEvent) => {
      activePointers.current.delete(e.pointerId)
      pinchState.current = null
      if (dragState.current?.active) {
        removeDragListeners()
        clearBrush()
      }
    }

    svg.addEventListener('wheel', handleWheel, { passive: false })
    svg.addEventListener('pointerdown', handlePointerDown)
    svg.addEventListener('pointercancel', handleSvgPointerCancel, true) // capture phase
    svg.addEventListener('dblclick', handleDblClick)
    container?.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(panRaf.current)
      removeDragListeners()
      svg.removeEventListener('wheel', handleWheel)
      svg.removeEventListener('pointerdown', handlePointerDown)
      svg.removeEventListener('pointercancel', handleSvgPointerCancel, true)
      svg.removeEventListener('dblclick', handleDblClick)
      container?.removeEventListener('keydown', handleKeyDown)
    }
  }, [svgRef, sync, padding, data.length, brushRef])
}
