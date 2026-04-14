// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * BrushOverlay — single absolute-positioned <div> over the chart stack.
 * No gaps between charts. Reads sync.brush fractions and converts to pixels.
 */

import { useRef, useEffect } from 'react'
import { SELECTION_SAND } from '@/lib/ui'
import { useChartSync } from './ChartSyncProvider'

interface BrushOverlayProps {
  paddingLeft?: number
  paddingRight?: number
}

export function BrushOverlay({ paddingLeft = 48, paddingRight = 64 }: BrushOverlayProps) {
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
        const parent = el.parentElement
        if (!parent) { rafRef.current = requestAnimationFrame(tick); return }
        const containerWidth = parent.clientWidth
        const chartWidth = containerWidth - paddingLeft - paddingRight
        const minF = Math.min(b.startFrac, b.currentFrac)
        const maxF = Math.max(b.startFrac, b.currentFrac)
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
      className="absolute top-0 bottom-0 z-10 pointer-events-none"
    >
      {/* Selection fill */}
      <div className={`absolute inset-0 ${SELECTION_SAND}`} />
      {/* Left edge indicator */}
      <div
        className="absolute top-0 bottom-0 left-0 w-[1px]"
        style={{ backgroundColor: 'var(--n1150)', opacity: 0.4 }}
      />
      {/* Right edge indicator */}
      <div
        className="absolute top-0 bottom-0 right-0 w-[1px]"
        style={{ backgroundColor: 'var(--n1150)', opacity: 0.4 }}
      />
    </div>
  )
}
