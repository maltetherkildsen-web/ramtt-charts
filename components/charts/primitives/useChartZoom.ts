'use client'

/**
 * useChartZoom — zoom, pan, brush, and keyboard navigation for synced charts.
 *
 * Zoom:     vertical scroll → zoom in/out centered on cursor X
 * Pan:      horizontal scroll (trackpad) or shift+scroll → smooth fractional pan
 * Brush:    click + drag → select range → zoom to selection on release
 * Keyboard: arrows → smooth animated pan, +/-/Home/End/Esc
 */

import { useEffect, useRef } from 'react'
import { useChart } from './chart-context'
import { useChartSync } from './ChartSyncProvider'

const MIN_VISIBLE_POINTS = 2
const ZOOM_SPEED = 0.15
const MIN_BRUSH_POINTS = 2
const PAN_FRICTION = 0.85       // keyboard momentum decay per frame
const KEY_PAN_SPEED = 0.03      // 3% of range per frame while key held

export function useChartZoom(brushRef: React.RefObject<SVGRectElement | null>) {
  const { padding, svgRef, data } = useChart()
  const sync = useChartSync()
  const dragState = useRef<{ active: boolean; startX: number } | null>(null)

  // Fractional pan accumulator — tracks sub-pixel remainder
  const panAccum = useRef(0)
  const panRaf = useRef(0)

  // Keyboard momentum state
  const keyVelocity = useRef(0)
  const keysHeld = useRef(new Set<string>())
  const momentumRaf = useRef(0)

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

    // ─── Pan with fractional accumulator ───
    const flushPan = () => {
      panRaf.current = 0
      const cw = getChartWidth()
      if (cw <= 0) return
      const { zoom, dataLength } = sync
      const range = zoom.end - zoom.start

      // Convert pixel accumulator to fractional data units
      const dataFrac = (panAccum.current / cw) * range
      const intDelta = Math.trunc(dataFrac)

      if (intDelta === 0) {
        // Keep accumulating sub-pixel remainder
        return
      }

      // Consume the integer part, keep the fractional remainder
      panAccum.current -= (intDelta / range) * cw

      sync.setZoom((prev) => {
        let s = prev.start + intDelta
        let e = prev.end + intDelta
        if (s < 0) { s = 0; e = range }
        if (e > dataLength - 1) { e = dataLength - 1; s = e - range }
        return { start: Math.max(0, s), end: Math.min(dataLength - 1, e) }
      })
    }

    const pan = (deltaPixels: number) => {
      panAccum.current += deltaPixels
      if (!panRaf.current) panRaf.current = requestAnimationFrame(flushPan)
    }

    // ─── Keyboard momentum loop ───
    const tickMomentum = () => {
      const { zoom, setZoom, dataLength } = sync
      const range = zoom.end - zoom.start

      // Apply held keys as acceleration
      if (keysHeld.current.has('ArrowLeft')) keyVelocity.current -= range * KEY_PAN_SPEED
      if (keysHeld.current.has('ArrowRight')) keyVelocity.current += range * KEY_PAN_SPEED

      // Apply friction
      keyVelocity.current *= PAN_FRICTION

      // Stop when velocity is negligible
      if (Math.abs(keyVelocity.current) < 0.5 && keysHeld.current.size === 0) {
        keyVelocity.current = 0
        momentumRaf.current = 0
        return
      }

      const delta = Math.round(keyVelocity.current)
      if (delta !== 0) {
        setZoom((prev) => {
          let s = prev.start + delta
          let e = prev.end + delta
          if (s < 0) { s = 0; e = range }
          if (e > dataLength - 1) { e = dataLength - 1; s = e - range }
          return { start: Math.max(0, s), end: Math.min(dataLength - 1, e) }
        })
      }

      momentumRaf.current = requestAnimationFrame(tickMomentum)
    }

    const startMomentum = () => {
      if (!momentumRaf.current) momentumRaf.current = requestAnimationFrame(tickMomentum)
    }

    // ─── Wheel: zoom or pan ───
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const { zoom, setZoom, dataLength } = sync
      const range = zoom.end - zoom.start

      if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        pan(e.shiftKey ? e.deltaY : e.deltaX)
        return
      }

      // Vertical scroll → zoom centered on cursor
      const frac = getDataFraction(e)
      const zoomIn = e.deltaY < 0
      const factor = zoomIn ? (1 - ZOOM_SPEED) : (1 + ZOOM_SPEED)
      let newRange = Math.round(range * factor)
      if (zoomIn && newRange >= range && range > MIN_VISIBLE_POINTS) newRange = range - 1
      if (!zoomIn && newRange <= range) newRange = range + 1

      if (zoomIn && newRange < MIN_VISIBLE_POINTS) return
      if (!zoomIn && newRange >= dataLength) {
        setZoom({ start: 0, end: dataLength - 1 })
        return
      }

      const cursorIdx = zoom.start + frac * range
      const newStart = Math.round(cursorIdx - frac * newRange)
      const clampedStart = Math.max(0, newStart)
      const clampedEnd = Math.min(dataLength - 1, clampedStart + newRange)

      setZoom({
        start: clampedEnd - newRange < 0 ? 0 : clampedEnd - newRange,
        end: clampedEnd,
      })
    }

    // ─── Brush ───
    const handlePointerDown = (e: PointerEvent) => {
      if (e.button !== 0) return
      const cx = getChartX(e)
      dragState.current = { active: true, startX: cx }
      svg.setPointerCapture(e.pointerId)

      const parent = svg.closest('[tabindex]') as HTMLElement | null
      parent?.focus({ preventScroll: true })

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
      const brush = brushRef.current
      if (brush) brush.setAttribute('display', 'none')

      const cx = getChartX(e)
      const cw = getChartWidth()
      const { zoom, dataLength } = sync
      const range = zoom.end - zoom.start
      const frac1 = Math.max(0, Math.min(1, state.startX / cw))
      const frac2 = Math.max(0, Math.min(1, cx / cw))
      const idx1 = Math.round(zoom.start + Math.min(frac1, frac2) * range)
      const idx2 = Math.round(zoom.start + Math.max(frac1, frac2) * range)
      dragState.current = null

      if (idx2 - idx1 >= MIN_BRUSH_POINTS) {
        sync.setZoom({ start: Math.max(0, idx1), end: Math.min(dataLength - 1, idx2) })
      }
    }

    const handleDblClick = (e: MouseEvent) => {
      e.preventDefault()
      sync.setZoom({ start: 0, end: sync.dataLength - 1 })
    }

    // ─── Keyboard ───
    const handleKeyDown = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return

      const { zoom, setZoom, dataLength } = sync
      const range = zoom.end - zoom.start

      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowRight':
          e.preventDefault()
          keysHeld.current.add(e.key)
          startMomentum()
          break
        case '+': case '=':
          e.preventDefault()
          { const amt = Math.max(1, Math.round(range * 0.2))
            const nr = Math.max(MIN_VISIBLE_POINTS, range - amt)
            const c = zoom.start + range / 2
            const s = Math.max(0, Math.round(c - nr / 2))
            setZoom({ start: s, end: Math.min(dataLength - 1, s + nr) }) }
          break
        case '-':
          e.preventDefault()
          { const amt = Math.max(1, Math.round(range * 0.2))
            const nr = Math.min(dataLength - 1, range + amt)
            const c = zoom.start + range / 2
            const s = Math.max(0, Math.round(c - nr / 2))
            const end = Math.min(dataLength - 1, s + nr)
            setZoom({ start: end - nr < 0 ? 0 : end - nr, end }) }
          break
        case 'Home':
          e.preventDefault()
          setZoom({ start: 0, end: Math.min(dataLength - 1, range) })
          break
        case 'End':
          e.preventDefault()
          setZoom({ start: Math.max(0, dataLength - 1 - range), end: dataLength - 1 })
          break
        case '0': case 'Escape':
          e.preventDefault()
          setZoom({ start: 0, end: dataLength - 1 })
          break
        default: return
      }
    }

    const handleKeyUp = (e: KeyboardEvent) => {
      keysHeld.current.delete(e.key)
    }

    const container = svg.closest('[tabindex]') as HTMLElement | null

    svg.addEventListener('wheel', handleWheel, { passive: false })
    svg.addEventListener('pointerdown', handlePointerDown)
    svg.addEventListener('pointermove', handlePointerMove)
    svg.addEventListener('pointerup', handlePointerUp)
    svg.addEventListener('dblclick', handleDblClick)
    container?.addEventListener('keydown', handleKeyDown)
    container?.addEventListener('keyup', handleKeyUp)

    return () => {
      cancelAnimationFrame(panRaf.current)
      cancelAnimationFrame(momentumRaf.current)
      svg.removeEventListener('wheel', handleWheel)
      svg.removeEventListener('pointerdown', handlePointerDown)
      svg.removeEventListener('pointermove', handlePointerMove)
      svg.removeEventListener('pointerup', handlePointerUp)
      svg.removeEventListener('dblclick', handleDblClick)
      container?.removeEventListener('keydown', handleKeyDown)
      container?.removeEventListener('keyup', handleKeyUp)
    }
  }, [svgRef, sync, padding, data.length, brushRef])
}
