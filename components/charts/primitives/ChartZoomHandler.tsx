'use client'

/**
 * ChartZoomHandler — attaches zoom/pan/brush listeners to the chart's SVG
 * and renders a semi-transparent brush overlay during drag selection.
 *
 * The brush overlay is SYNCED across all charts via shared brush state
 * in ChartSyncProvider. When any chart starts a brush drag, ALL charts
 * render the overlay at the same x-range via SVG rects.
 */

import { useRef, useEffect } from 'react'
import { useChart } from './chart-context'
import { useChartSync } from './ChartSyncProvider'
import { useChartZoom } from './useChartZoom'

export function ChartZoomHandler() {
  const { chartWidth, chartHeight } = useChart()
  const sync = useChartSync()
  const brushRef = useRef<SVGRectElement>(null)
  const syncBrushRef = useRef<SVGRectElement>(null)
  const rafRef = useRef(0)
  useChartZoom(brushRef)

  // Poll shared brush state via rAF to render synced overlay (zero re-renders)
  useEffect(() => {
    if (!sync?.brush) return

    const tick = () => {
      const b = sync.brush.current
      const el = syncBrushRef.current
      if (!el) { rafRef.current = requestAnimationFrame(tick); return }

      if (b.active) {
        const minF = Math.min(b.startFrac, b.currentFrac)
        const maxF = Math.max(b.startFrac, b.currentFrac)
        const x = minF * chartWidth
        const w = (maxF - minF) * chartWidth
        el.setAttribute('x', String(x))
        el.setAttribute('width', String(Math.max(0, w)))
        el.setAttribute('display', '')
      } else {
        el.setAttribute('display', 'none')
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [sync, chartWidth])

  return (
    <>
      {/* Local brush rect — rendered by this chart's own drag */}
      <rect
        ref={brushRef}
        x={0} y={-1} width={0} height={chartHeight + 2}
        fill="rgba(118, 114, 106, 0.15)"
        display="none"
        className="pointer-events-none"
      />
      {/* Synced brush rect — rendered from shared state (all charts) */}
      <rect
        ref={syncBrushRef}
        x={0} y={-1} width={0} height={chartHeight + 2}
        fill="rgba(118, 114, 106, 0.15)"
        display="none"
        className="pointer-events-none"
      />
    </>
  )
}
