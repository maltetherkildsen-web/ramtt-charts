'use client'

/**
 * BrushOverlay — single absolute-positioned <div> over the chart stack.
 * No gaps between charts. Dumb pixel renderer — reads leftPx/widthPx
 * from sync.brush and applies directly. Zero calculations.
 */

import { useRef, useEffect } from 'react'
import { SELECTION_SAND } from '@/lib/ui'
import { useChartSync } from './ChartSyncProvider'

export function BrushOverlay() {
  const sync = useChartSync()
  const overlayRef = useRef<HTMLDivElement>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    if (!sync?.brush) return

    const tick = () => {
      const b = sync.brush.current
      const el = overlayRef.current
      if (!el) { rafRef.current = requestAnimationFrame(tick); return }

      if (b.active && b.widthPx > 0) {
        el.style.left = `${b.leftPx}px`
        el.style.width = `${b.widthPx}px`
        el.style.display = ''
      } else {
        el.style.display = 'none'
      }
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [sync])

  return (
    <div
      ref={overlayRef}
      style={{ display: 'none' }}
      className={`absolute top-0 bottom-0 z-10 pointer-events-none ${SELECTION_SAND}`}
    />
  )
}
