'use client'

/**
 * ChartCrosshair — hover tracking OUTSIDE React's render cycle.
 *
 * Architecture (per deep-technical-plan §4):
 *   mousemove → requestAnimationFrame → bisect nearest point →
 *   element.setAttribute() on line + dot refs.
 *   Zero setState. Zero React re-renders.
 */

import { useRef, useEffect, useCallback } from 'react'
import { bisectNearest } from '@/lib/charts/utils/bisect'
import { useChart } from './chart-context'

export interface ChartCrosshairProps {
  lineColor?: string
  lineWidth?: number
  dotRadius?: number
  dotColor?: string
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

  const lineRef = useRef<SVGLineElement>(null)
  const dotRef = useRef<SVGCircleElement>(null)
  const rafRef = useRef<number>(0)
  const lastIdx = useRef<number>(-1)

  const pixelXs = useRef<number[]>([])
  useEffect(() => {
    const xs = new Array(data.length)
    for (let i = 0; i < data.length; i++) {
      xs[i] = scaleX(i)
    }
    pixelXs.current = xs
  }, [data.length, scaleX])

  const show = useCallback(() => {
    lineRef.current?.setAttribute('display', '')
    dotRef.current?.setAttribute('display', '')
  }, [])

  const hide = useCallback(() => {
    lineRef.current?.setAttribute('display', 'none')
    dotRef.current?.setAttribute('display', 'none')
    lastIdx.current = -1
    onHover?.(null)
  }, [onHover])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || data.length === 0) return

    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect = svg.getBoundingClientRect()
        const mx = e.clientX - rect.left - padding.left

        const idx = bisectNearest(pixelXs.current, mx)
        if (idx < 0 || idx >= data.length) {
          hide()
          return
        }

        if (idx === lastIdx.current) return
        lastIdx.current = idx

        const px = scaleX(idx)
        const py = scaleY(data[idx])

        const line = lineRef.current
        const dot = dotRef.current
        if (!line || !dot) return

        show()

        line.setAttribute('x1', String(px))
        line.setAttribute('x2', String(px))
        dot.setAttribute('cx', String(px))
        dot.setAttribute('cy', String(py))

        onHover?.(idx)
      })
    }

    const handleLeave = () => {
      cancelAnimationFrame(rafRef.current)
      hide()
    }

    svg.addEventListener('mousemove', handleMove)
    svg.addEventListener('mouseleave', handleLeave)

    return () => {
      cancelAnimationFrame(rafRef.current)
      svg.removeEventListener('mousemove', handleMove)
      svg.removeEventListener('mouseleave', handleLeave)
    }
  }, [data, scaleX, scaleY, padding.left, svgRef, hide, show, onHover])

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
