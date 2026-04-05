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
import { useChart } from './chart-context'
import { useChartSync } from './ChartSyncProvider'

export interface ChartCrosshairProps {
  lineColor?: string
  lineWidth?: number
  dotRadius?: number
  dotColor?: string
  /** Callback fired on each hover frame with the nearest index. */
  onHover?: (index: number | null) => void
}

export function ChartCrosshair({
  lineColor = '#71717a',
  lineWidth = 0.5,
  dotRadius = 3,
  dotColor = '#16a34a',
  onHover,
}: ChartCrosshairProps) {
  const { data, scaleX, scaleY, chartHeight, padding, svgRef } = useChart()
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

    line.setAttribute('display', '')
    line.setAttribute('x1', String(px))
    line.setAttribute('x2', String(px))

    dot.setAttribute('display', '')
    dot.setAttribute('cx', String(px))
    dot.setAttribute('cy', String(py))
  }, [data, scaleX, scaleY])

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

        const idx = bisectNearest(pixelXs.current, mx)
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
  }, [data, scaleX, scaleY, padding.left, svgRef, hide, showAt, onHover, sync, instanceId])

  return (
    <g className="pointer-events-none">
      <line
        ref={lineRef}
        x1={0}
        y1={0}
        x2={0}
        y2={chartHeight}
        stroke={lineColor}
        strokeWidth={lineWidth}
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
