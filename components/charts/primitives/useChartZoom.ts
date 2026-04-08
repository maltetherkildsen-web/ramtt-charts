'use client'

/**
 * useChartZoom — zoom, pan, brush, and keyboard navigation for synced charts.
 *
 * Brush uses document-level pointermove/pointerup during drag (not setPointerCapture).
 * This guarantees pointerup fires regardless of where the pointer ends up.
 */

import { useEffect, useRef } from 'react'
import { useChart } from './chart-context'
import { useChartSync } from './ChartSyncProvider'

const MIN_VISIBLE_POINTS = 2
const ZOOM_SPEED = 0.15
const MIN_BRUSH_POINTS = 2

export function useChartZoom() {
  const { padding, svgRef, data } = useChart()
  const sync = useChartSync()
  const dragState = useRef<{ startXContainer: number } | null>(null)
  const panAccum = useRef(0)
  const panRaf = useRef(0)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || !sync) return

    const brushContainer = svg.closest('[data-brush-container]') as HTMLElement | null

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

    const clearBrush = () => {
      sync.brush.current = { active: false, leftPx: 0, widthPx: 0 }
      dragState.current = null
    }

    const clampToPlotArea = (xInContainer: number, containerWidth: number): number => {
      return Math.max(padding.left, Math.min(containerWidth - padding.right, xInContainer))
    }

    // ─── Pan ───
    const flushPan = () => {
      panRaf.current = 0
      const cw = getChartWidth()
      if (cw <= 0) return
      const range = sync.zoom.end - sync.zoom.start
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

    // ─── Wheel ───
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()
      if (dragState.current) clearBrush()

      if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        pan(e.shiftKey ? e.deltaY : e.deltaX)
        return
      }

      const range = sync.zoom.end - sync.zoom.start
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

      const cursorIdx = sync.zoom.start + frac * range
      const newStart = Math.round(cursorIdx - frac * newRange)
      const clampedStart = Math.max(0, newStart)
      const clampedEnd = Math.min(dl - 1, clampedStart + newRange)

      sync.setZoom({
        start: clampedEnd - newRange < 0 ? 0 : clampedEnd - newRange,
        end: clampedEnd,
      })
    }

    // ─── Brush: document-level move/up during drag ───
    const handleDocumentPointerMove = (e: PointerEvent) => {
      const state = dragState.current
      if (!state || !brushContainer) return
      const containerRect = brushContainer.getBoundingClientRect()
      const xInContainer = clampToPlotArea(e.clientX - containerRect.left, containerRect.width)

      sync.brush.current = {
        active: true,
        leftPx: Math.min(state.startXContainer, xInContainer),
        widthPx: Math.abs(xInContainer - state.startXContainer),
      }
    }

    /** Remove all document-level drag listeners */
    const removeDragListeners = () => {
      document.removeEventListener('pointermove', handleDocumentPointerMove)
      document.removeEventListener('pointerup', handleDocumentPointerUp)
      document.removeEventListener('pointercancel', handleDocumentPointerCancel)
    }

    const handleDocumentPointerUp = (e: PointerEvent) => {
      const state = dragState.current
      if (!state || !brushContainer) return

      removeDragListeners()

      // Compute zoom range from container coordinates
      const containerRect = brushContainer.getBoundingClientRect()
      const xInContainer = clampToPlotArea(e.clientX - containerRect.left, containerRect.width)
      const plotWidth = containerRect.width - padding.left - padding.right
      const frac1 = Math.max(0, Math.min(1, (state.startXContainer - padding.left) / plotWidth))
      const frac2 = Math.max(0, Math.min(1, (xInContainer - padding.left) / plotWidth))

      // Clear brush BEFORE setZoom
      clearBrush()

      const range = sync.zoom.end - sync.zoom.start
      const idx1 = Math.round(sync.zoom.start + Math.min(frac1, frac2) * range)
      const idx2 = Math.round(sync.zoom.start + Math.max(frac1, frac2) * range)

      if (idx2 - idx1 >= MIN_BRUSH_POINTS) {
        sync.setZoom({ start: Math.max(0, idx1), end: Math.min(sync.dataLength - 1, idx2) })
      }
    }

    /** pointercancel = browser interrupted drag. Just clean up, no zoom. */
    const handleDocumentPointerCancel = () => {
      if (!dragState.current) return
      removeDragListeners()
      clearBrush()
    }

    // ─── Brush: pointerdown on SVG starts the drag ───
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0 || !brushContainer) return

      // Release any implicit pointer capture the browser set on the target.
      // Without this, the browser fires pointercancel (killing pointerup)
      // when the captured element changes during drag (e.g. path re-render).
      try { (e.target as Element).releasePointerCapture(e.pointerId) } catch {}

      const containerRect = brushContainer.getBoundingClientRect()
      const xInContainer = clampToPlotArea(e.clientX - containerRect.left, containerRect.width)

      dragState.current = { startXContainer: xInContainer }
      sync.brush.current = { active: true, leftPx: xInContainer, widthPx: 0 }

      const parent = svg.closest('[tabindex]') as HTMLElement | null
      parent?.focus({ preventScroll: true })

      // Register move/up/cancel on document — guaranteed to fire regardless of pointer position
      document.addEventListener('pointermove', handleDocumentPointerMove)
      document.addEventListener('pointerup', handleDocumentPointerUp)
      document.addEventListener('pointercancel', handleDocumentPointerCancel)
    }

    const handleDblClick = (e: MouseEvent) => {
      e.preventDefault()
      sync.setZoom({ start: 0, end: sync.dataLength - 1 })
    }

    // ─── Keyboard ───
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      const range = sync.zoom.end - sync.zoom.start
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
            const c = sync.zoom.start + range / 2
            const s = Math.max(0, Math.round(c - nr / 2))
            sync.setZoom({ start: s, end: Math.min(dl - 1, s + nr) }) }
          break
        case '-':
          e.preventDefault()
          { const amt = Math.max(1, Math.round(range * 0.2))
            const nr = Math.min(dl - 1, range + amt)
            const c = sync.zoom.start + range / 2
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

    svg.addEventListener('wheel', handleWheel, { passive: false })
    svg.addEventListener('pointerdown', handlePointerDown)
    svg.addEventListener('dblclick', handleDblClick)
    container?.addEventListener('keydown', handleKeyDown)

    return () => {
      cancelAnimationFrame(panRaf.current)
      // Clean up document listeners if drag was interrupted by unmount
      removeDragListeners()
      svg.removeEventListener('wheel', handleWheel)
      svg.removeEventListener('pointerdown', handlePointerDown)
      svg.removeEventListener('dblclick', handleDblClick)
      container?.removeEventListener('keydown', handleKeyDown)
    }
  }, [svgRef, sync, padding, data.length])
}
