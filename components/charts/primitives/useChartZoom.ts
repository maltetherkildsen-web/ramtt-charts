'use client'

/**
 * useChartZoom — mouse wheel zoom + brush selection for synced charts.
 *
 * Attaches native wheel + pointer listeners to the SVG element.
 * Updates the ChartSyncProvider zoom range (React state).
 *
 * Zoom:  scroll wheel → zoom in/out centered on cursor X position.
 * Pan:   shift+scroll → pan left/right.
 * Brush: click + drag → select range → zoom to selection on release.
 */

import { useEffect, useRef } from 'react'
import { useChart } from './chart-context'
import { useChartSync } from './ChartSyncProvider'

const MIN_VISIBLE_POINTS = 2 // Allow deep zoom (2-3 seconds like Intervals.icu)
const ZOOM_SPEED = 0.15 // 15% per scroll tick
const MIN_BRUSH_POINTS = 2 // minimum drag distance to trigger zoom

export function useChartZoom(brushRef: React.RefObject<SVGRectElement | null>) {
  const { padding, svgRef, data } = useChart()
  const sync = useChartSync()
  const dragState = useRef<{ active: boolean; startX: number } | null>(null)

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

    // ─── Wheel: zoom or pan ───
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const { zoom, setZoom, dataLength } = sync
      const range = zoom.end - zoom.start

      if (e.shiftKey) {
        // Shift+scroll → pan
        const panAmount = Math.round(range * ZOOM_SPEED * Math.sign(e.deltaY))
        setZoom((prev) => {
          const newStart = Math.max(0, Math.min(dataLength - 1 - range, prev.start + panAmount))
          return { start: newStart, end: newStart + range }
        })
      } else {
        // Scroll → zoom centered on cursor
        const frac = getDataFraction(e)
        const zoomIn = e.deltaY < 0
        const factor = zoomIn ? (1 - ZOOM_SPEED) : (1 + ZOOM_SPEED)
        let newRange = Math.round(range * factor)
        // Ensure zoom always makes progress (avoid rounding back to same range)
        if (zoomIn && newRange >= range && range > MIN_VISIBLE_POINTS) newRange = range - 1
        if (!zoomIn && newRange <= range) newRange = range + 1

        if (zoomIn && newRange < MIN_VISIBLE_POINTS) return
        if (!zoomIn && newRange >= dataLength) {
          setZoom({ start: 0, end: dataLength - 1 })
          return
        }

        // Cursor position in data space
        const cursorIdx = zoom.start + frac * range
        const newStart = Math.round(cursorIdx - frac * newRange)
        const clampedStart = Math.max(0, newStart)
        const clampedEnd = Math.min(dataLength - 1, clampedStart + newRange)

        setZoom({
          start: clampedEnd - newRange < 0 ? 0 : clampedEnd - newRange,
          end: clampedEnd,
        })
      }
    }

    // ─── Brush: drag to select range ───
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return // left click only
      const cx = getChartX(e)
      dragState.current = { active: true, startX: cx }
      svg.setPointerCapture(e.pointerId)

      const brush = brushRef.current
      if (brush) {
        brush.setAttribute('x', String(Math.max(0, cx)))
        brush.setAttribute('width', '0')
        brush.setAttribute('display', '')
      }
    }

    const handlePointerMove = (e: PointerEvent) => {
      const state = dragState.current
      if (!state?.active) return

      const cx = getChartX(e)
      const cw = getChartWidth()
      const brush = brushRef.current
      if (brush) {
        const x = Math.max(0, Math.min(state.startX, cx))
        const w = Math.min(cw - x, Math.abs(cx - state.startX))
        brush.setAttribute('x', String(x))
        brush.setAttribute('width', String(Math.max(0, w)))
      }
    }

    const handlePointerUp = (e: PointerEvent) => {
      const state = dragState.current
      if (!state?.active) return

      svg.releasePointerCapture(e.pointerId)

      // Hide brush overlay
      const brush = brushRef.current
      if (brush) {
        brush.setAttribute('display', 'none')
      }

      const cx = getChartX(e)
      const cw = getChartWidth()
      const { zoom, dataLength } = sync
      const range = zoom.end - zoom.start

      // Convert pixel positions to data indices
      const frac1 = Math.max(0, Math.min(1, state.startX / cw))
      const frac2 = Math.max(0, Math.min(1, cx / cw))
      const idx1 = Math.round(zoom.start + Math.min(frac1, frac2) * range)
      const idx2 = Math.round(zoom.start + Math.max(frac1, frac2) * range)

      dragState.current = null

      // Only zoom if selection covers enough data points
      if (idx2 - idx1 >= MIN_BRUSH_POINTS) {
        sync.setZoom({
          start: Math.max(0, idx1),
          end: Math.min(dataLength - 1, idx2),
        })
      }
    }

    // ─── Double-click: reset zoom to full range ───
    const handleDblClick = (e: MouseEvent) => {
      e.preventDefault()
      sync.setZoom({ start: 0, end: sync.dataLength - 1 })
    }

    svg.addEventListener('wheel', handleWheel, { passive: false })
    svg.addEventListener('pointerdown', handlePointerDown)
    svg.addEventListener('pointermove', handlePointerMove)
    svg.addEventListener('pointerup', handlePointerUp)
    svg.addEventListener('dblclick', handleDblClick)

    return () => {
      svg.removeEventListener('wheel', handleWheel)
      svg.removeEventListener('pointerdown', handlePointerDown)
      svg.removeEventListener('pointermove', handlePointerMove)
      svg.removeEventListener('pointerup', handlePointerUp)
      svg.removeEventListener('dblclick', handleDblClick)
    }
  }, [svgRef, sync, padding, data.length, brushRef])
}
