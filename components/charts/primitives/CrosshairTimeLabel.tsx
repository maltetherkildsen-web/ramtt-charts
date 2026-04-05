'use client'

/**
 * CrosshairTimeLabel — a small pill that tracks the crosshair position
 * on the X-axis, showing the formatted timestamp.
 *
 * Fully ref-based: subscribes to ChartSyncProvider hover broadcasts
 * and positions via transform — zero React re-renders on mousemove.
 *
 * Place as a zero-height sibling between the last chart and the scrubber.
 * The pill floats upward into the bottom padding of the chart above.
 */

import { useRef, useEffect } from 'react'
import { useChartSync } from './ChartSyncProvider'

export interface CrosshairTimeLabelProps {
  /** Convert a full data index to a display string (e.g. "12:34"). */
  format: (index: number) => string
  /** Left padding to match chart padding. Default 48. */
  padLeft?: number
  /** Right padding to match chart padding. Default 64. */
  padRight?: number
}

export function CrosshairTimeLabel({
  format,
  padLeft = 48,
  padRight = 64,
}: CrosshairTimeLabelProps) {
  const sync = useChartSync()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const pillRef = useRef<HTMLDivElement>(null)
  const widthRef = useRef(0)
  // Store format in ref to avoid re-subscribing on every render
  const formatRef = useRef(format)
  formatRef.current = format

  // Track parent container width via ResizeObserver
  useEffect(() => {
    const el = wrapperRef.current?.parentElement
    if (!el) return
    widthRef.current = el.getBoundingClientRect().width
    const ro = new ResizeObserver((entries) => {
      widthRef.current = entries[0]?.contentRect.width ?? 0
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Subscribe to hover broadcasts — position pill via transform
  useEffect(() => {
    if (!sync) return

    return sync.subscribeHover((visIdx) => {
      const pill = pillRef.current
      if (!pill) return

      if (visIdx === null) {
        pill.style.opacity = '0'
        return
      }

      const chartWidth = widthRef.current - padLeft - padRight
      const visibleLen = sync.zoom.end - sync.zoom.start + 1
      const px = padLeft + (visIdx / Math.max(1, visibleLen - 1)) * chartWidth

      pill.style.opacity = '1'
      pill.style.transform = `translateX(${px.toFixed(1)}px) translateX(-50%)`
      pill.textContent = formatRef.current(sync.zoom.start + visIdx)
    })
  }, [sync, padLeft, padRight])

  if (!sync) return null

  return (
    <div ref={wrapperRef} className="pointer-events-none relative h-0 overflow-visible">
      <div
        ref={pillRef}
        className="absolute left-0 rounded-full bg-[#0F0F0E]/75 px-2 py-[2px] font-mono text-[10px] tabular-nums text-white/90 backdrop-blur-sm"
        style={{ opacity: 0, top: '-18px', willChange: 'transform, opacity' }}
      />
    </div>
  )
}
