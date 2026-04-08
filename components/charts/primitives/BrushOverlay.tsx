'use client'

/**
 * BrushOverlay — renders a single absolute-positioned <div> over the entire
 * chart stack during brush-select. No SVG, no gaps between charts.
 *
 * Place as a direct child of the chart stack container (the tabindex="0" div).
 * Reads shared brush state from ChartSyncProvider via rAF polling.
 *
 * @param paddingLeft — left padding of charts (to align overlay with chart area)
 * @param paddingRight — right padding of charts
 */

import { useRef, useEffect } from 'react'
import { SELECTION_SAND } from '@/lib/ui'
import { useChartSync } from './ChartSyncProvider'

interface BrushOverlayProps {
  paddingLeft?: number
  paddingRight?: number
}

export function BrushOverlay({ paddingLeft = 12, paddingRight = 64 }: BrushOverlayProps) {
  const sync = useChartSync()
  const overlayRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!sync?.brush) return

    const tick = () => {
      const b = sync.brush.current
      const el = overlayRef.current
      if (!el) { rafRef.current = requestAnimationFrame(tick); return }

      if (b.active) {
        const minF = Math.min(b.startFrac, b.currentFrac)
        const maxF = Math.max(b.startFrac, b.currentFrac)
        // Map fractions to pixel positions within the container
        const parent = el.parentElement
        if (!parent) { rafRef.current = requestAnimationFrame(tick); return }
        const containerWidth = parent.clientWidth
        const chartWidth = containerWidth - paddingLeft - paddingRight
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

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [sync, paddingLeft, paddingRight])

  return (
    <div
      ref={overlayRef}
      style={{ display: 'none' }}
      className={`absolute top-0 bottom-0 z-10 pointer-events-none ${SELECTION_SAND}`}
    />
  )
}
