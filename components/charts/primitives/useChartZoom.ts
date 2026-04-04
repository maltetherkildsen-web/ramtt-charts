'use client'

/**
 * useChartZoom — mouse wheel zoom + drag pan for synced charts.
 *
 * Attaches native wheel + pointer listeners to the SVG element.
 * Updates the ChartSyncProvider zoom range (React state).
 *
 * Zoom: scroll wheel → zoom in/out centered on cursor X position.
 * Pan:  shift+scroll or pointer drag → pan left/right.
 */

import { useEffect, useRef } from 'react'
import { useChart } from './chart-context'
import { useChartSync, type ZoomRange } from './ChartSyncProvider'

const MIN_VISIBLE_POINTS = 20
const ZOOM_SPEED = 0.15 // 15% per scroll tick

export function useChartZoom() {
  const { padding, svgRef, data } = useChart()
  const sync = useChartSync()
  const dragState = useRef<{ active: boolean; startX: number; startZoom: ZoomRange } | null>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || !sync) return

    const getDataFraction = (e: MouseEvent): number => {
      const rect = svg.getBoundingClientRect()
      const mx = e.clientX - rect.left - padding.left
      const chartWidth = rect.width - padding.left - padding.right
      return Math.max(0, Math.min(1, mx / chartWidth))
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
        const newRange = Math.round(range * factor)

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

    // ─── Drag: pan ───
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return // left click only
      dragState.current = {
        active: true,
        startX: e.clientX,
        startZoom: { ...sync.zoom },
      }
      svg.setPointerCapture(e.pointerId)
    }

    const handlePointerMove = (e: PointerEvent) => {
      const state = dragState.current
      if (!state?.active) return

      const rect = svg.getBoundingClientRect()
      const chartWidth = rect.width - padding.left - padding.right
      const dx = e.clientX - state.startX
      const range = state.startZoom.end - state.startZoom.start

      // Convert pixel delta to data index delta
      const dataDelta = Math.round((-dx / chartWidth) * range)
      const newStart = Math.max(0, Math.min(sync.dataLength - 1 - range, state.startZoom.start + dataDelta))

      sync.setZoom({ start: newStart, end: newStart + range })
    }

    const handlePointerUp = (e: PointerEvent) => {
      if (dragState.current?.active) {
        svg.releasePointerCapture(e.pointerId)
      }
      dragState.current = null
    }

    svg.addEventListener('wheel', handleWheel, { passive: false })
    svg.addEventListener('pointerdown', handlePointerDown)
    svg.addEventListener('pointermove', handlePointerMove)
    svg.addEventListener('pointerup', handlePointerUp)

    return () => {
      svg.removeEventListener('wheel', handleWheel)
      svg.removeEventListener('pointerdown', handlePointerDown)
      svg.removeEventListener('pointermove', handlePointerMove)
      svg.removeEventListener('pointerup', handlePointerUp)
    }
  }, [svgRef, sync, padding, data.length])
}
