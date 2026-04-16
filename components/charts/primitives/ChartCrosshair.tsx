// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartCrosshair — hover tracking OUTSIDE React's render cycle.
 *
 * Supports two modes:
 *   1. Standalone: hover on this chart only (no sync provider).
 *   2. Synced: hover broadcasts to all sibling charts via ChartSyncProvider.
 *
 * Architecture (per deep-technical-plan §4):
 *   mousemove → rAF → bisectNearest → setAttribute (zero setState)
 *   + broadcast index to sync provider → all other crosshairs update
 */

import { useRef, useEffect, useCallback, useId } from 'react'
import { bisectNearest } from '@/lib/charts/utils/bisect'
import { nearest2d } from '@/lib/charts/utils/nearest2d'
import { useChart } from './chart-context'
import { useChartSync } from './ChartSyncProvider'

export type TooltipMode = 'index' | 'nearest' | 'band'

export interface ChartCrosshairProps {
  lineColor?: string
  lineWidth?: number
  dotRadius?: number
  dotColor?: string
  /** Tooltip detection mode. Default: 'index'. */
  tooltipMode?: TooltipMode
  /** Max pixel distance for 'nearest' mode. Default: 50. */
  maxDistance?: number
  /** Callback fired on each hover frame with the nearest index. */
  onHover?: (index: number | null) => void
}

export function ChartCrosshair({
  lineColor = '#71717a',
  lineWidth = 0.5,
  dotRadius = 3,
  dotColor = '#16a34a',
  tooltipMode = 'index',
  maxDistance = 50,
  onHover,
}: ChartCrosshairProps) {
  const { data, scaleX, scaleY, chartWidth, chartHeight, padding, svgRef } = useChart()
  const sync = useChartSync()
  const instanceId = useId()

  const lineRef = useRef<SVGLineElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const rafRef = useRef<number>(0)
  const lastIdx = useRef<number>(-1)

  // Pre-compute pixel-x for bisect
  const pixelXs = useRef<number[]>([])
  useEffect(() => {
    const xs = new Array(data.length)
    for (let i = 0; i < data.length; i++) {
      xs[i] = scaleX(i)
    }
    pixelXs.current = xs
  }, [data.length, scaleX])

  // ─── DOM helpers ───

  const showAt = useCallback((idx: number) => {
    const line = lineRef.current
    const dot = dotRef.current
    if (!line || !dot || idx < 0 || idx >= data.length) return

    const px = scaleX(idx)
    const py = scaleY(data[idx])

    // In 'nearest' mode, hide the vertical crosshair line
    if (tooltipMode === 'nearest') {
      line.setAttribute('display', 'none')
    } else {
      line.setAttribute('display', '')
      line.setAttribute('x1', String(px))
      line.setAttribute('x2', String(px))
    }

    dot.setAttribute('display', '')
    dot.setAttribute('cx', String(px))
    dot.setAttribute('cy', String(py))
  }, [data, scaleX, scaleY, tooltipMode])

  const hide = useCallback(() => {
    lineRef.current?.setAttribute('display', 'none')
    dotRef.current?.setAttribute('display', 'none')
    lastIdx.current = -1
  }, [])

  // ─── Sync subscription: receive broadcasts from other charts ───
  useEffect(() => {
    if (!sync) return

    const unsub = sync.subscribeHover((index, sourceId) => {
      // Skip if this is our own broadcast
      if (sourceId === instanceId) return

      if (index === null) {
        hide()
        onHover?.(null)
        return
      }

      if (index === lastIdx.current) return
      lastIdx.current = index

      showAt(index)
      onHover?.(index)
    })

    return unsub
  }, [sync, instanceId, showAt, hide, onHover])

  // ─── Native mouse listeners on the SVG ───
  useEffect(() => {
    const svg = svgRef.current
    if (!svg || data.length === 0) return

    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current)
      const clientY = e.clientY // capture outside rAF
      rafRef.current = requestAnimationFrame(() => {
        const rect = svg.getBoundingClientRect()
        const mx = e.clientX - rect.left - padding.left
        const my = e.clientY - rect.top - padding.top

        let idx = -1

        if (tooltipMode === 'nearest') {
          // 2D nearest point — build pixel coords on the fly
          const pts = data.map((v, i) => ({ x: scaleX(i), y: scaleY(v) }))
          const result = nearest2d(pts, mx, my)
          if (result.index >= 0 && result.distance <= maxDistance) {
            idx = result.index
          }
        } else if (tooltipMode === 'band') {
          // Band mode — snap to bar that cursor falls within
          const bandWidth = data.length > 0 ? chartWidth / data.length : 0
          if (bandWidth > 0) {
            idx = Math.max(0, Math.min(data.length - 1, Math.floor(mx / bandWidth)))
          }
        } else {
          // Index mode (default) — bisect nearest X
          idx = bisectNearest(pixelXs.current, mx)
        }

        if (idx < 0 || idx >= data.length) {
          hide()
          sync?.broadcastHover(null, instanceId)
          onHover?.(null)
          return
        }

        if (idx === lastIdx.current) return
        lastIdx.current = idx

        showAt(idx)
        onHover?.(idx)

        // Broadcast to sibling charts (include clientY for tooltip positioning)
        sync?.broadcastHover(idx, instanceId, clientY)
      })
    }

    const handleLeave = () => {
      cancelAnimationFrame(rafRef.current)
      hide()
      onHover?.(null)
      sync?.broadcastHover(null, instanceId)
    }

    svg.addEventListener('mousemove', handleMove)
    svg.addEventListener('mouseleave', handleLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      svg.removeEventListener('mousemove', handleMove)
      svg.removeEventListener('mouseleave', handleLeave)
    }
  }, [data, scaleX, scaleY, chartWidth, padding.left, padding.top, svgRef, hide, showAt, onHover, sync, instanceId, tooltipMode, maxDistance])

  return (
    <g className="pointer-events-none">
      <line
        ref={lineRef}
        x1={0}
        y1={-padding.top}
        x2={0}
        y2={chartHeight + padding.bottom}
        stroke={lineColor}
        strokeWidth={lineWidth}
        shapeRendering="crispEdges"
        display="none"
      />
      <circle
        ref={dotRef}
        cx={0}
        cy={0}
        r={dotRadius}
        fill="white"
        stroke={dotColor}
        strokeWidth={2}
        display="none"
      />
    </g>
  )
}
