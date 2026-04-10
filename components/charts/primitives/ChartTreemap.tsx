'use client'

/**
 * ChartTreemap — squarified treemap chart primitive.
 *
 * Self-contained: renders its own `<svg>`, does NOT use ChartRoot.
 * Each rectangle's area is proportional to its value.
 *
 * Usage:
 *   <ChartTreemap
 *     data={[{ label: 'Photos', value: 42, color: '#3b82f6' }, ...]}
 *     height={300}
 *   />
 */

import { useMemo, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { treemapLayout, type TreemapItem } from '@/lib/charts/utils/treemap'

// ─── Props ───

export interface ChartTreemapProps {
  /** Array of items with label, value, and color. */
  data: TreemapItem[]
  /** Width in pixels. Default 880 (fills container). */
  width?: number
  /** Height in pixels. Default 300. */
  height?: number
  /** Tailwind classes on the wrapper. */
  className?: string
}

// ─── Helpers ───

/** Determine if text should be white or dark based on background hex. */
function textColorForBg(hex: string): string {
  // Handle CSS variables — default to white
  if (hex.startsWith('var(')) return 'white'
  const c = hex.replace('#', '')
  if (c.length < 6) return 'white'
  const r = parseInt(c.slice(0, 2), 16)
  const g = parseInt(c.slice(2, 4), 16)
  const b = parseInt(c.slice(4, 6), 16)
  // Relative luminance
  const lum = 0.299 * r + 0.587 * g + 0.114 * b
  return lum > 150 ? 'var(--n1150)' : 'white'
}

// ─── Component ───

export function ChartTreemap({
  data,
  width = 880,
  height = 300,
  className,
}: ChartTreemapProps) {
  const gap = 2

  const rects = useMemo(
    () => treemapLayout(data, width, height),
    [data, width, height],
  )

  // Refs for zero-rerender hover
  const rectRefs = useRef<(SVGGElement | null)[]>([])
  const currentIdx = useRef(-1)
  const rafId = useRef(0)

  const applyHighlight = useCallback((target: number) => {
    if (target === currentIdx.current) return
    currentIdx.current = target

    rectRefs.current.forEach((g, i) => {
      if (!g) return
      if (target === -1) {
        g.style.opacity = '1'
        const rect = g.querySelector('rect')
        if (rect) {
          ;(rect as SVGRectElement).setAttribute('stroke', 'none')
          ;(rect as SVGRectElement).setAttribute('stroke-width', '0')
        }
      } else if (i === target) {
        g.style.opacity = '1'
        const rect = g.querySelector('rect')
        if (rect) {
          ;(rect as SVGRectElement).setAttribute('stroke', 'white')
          ;(rect as SVGRectElement).setAttribute('stroke-width', '2')
        }
      } else {
        g.style.opacity = '0.6'
        const rect = g.querySelector('rect')
        if (rect) {
          ;(rect as SVGRectElement).setAttribute('stroke', 'none')
          ;(rect as SVGRectElement).setAttribute('stroke-width', '0')
        }
      }
    })
  }, [])

  const handleEnter = useCallback((idx: number) => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyHighlight(idx))
  }, [applyHighlight])

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyHighlight(-1))
  }, [applyHighlight])

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn(className)}
      shapeRendering="crispEdges"
    >
      {rects.map((r, i) => {
        const insetX = r.x + gap / 2
        const insetY = r.y + gap / 2
        const insetW = Math.max(0, r.width - gap)
        const insetH = Math.max(0, r.height - gap)
        const showLabel = insetW >= 40 && insetH >= 30
        const txtColor = textColorForBg(r.item.color)

        return (
          <g
            key={r.item.label}
            ref={(el) => { rectRefs.current[i] = el }}
            style={{ transition: 'opacity 200ms' }}
            onPointerEnter={() => handleEnter(i)}
            onPointerLeave={handleLeave}
          >
            <rect
              x={insetX}
              y={insetY}
              width={insetW}
              height={insetH}
              rx={3}
              ry={3}
              fill={r.item.color}
            />
            {showLabel && (
              <>
                <text
                  x={insetX + 8}
                  y={insetY + 18}
                  fill={txtColor}
                  fontSize={12}
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, pointerEvents: 'none' }}
                >
                  {r.item.label}
                </text>
                <text
                  x={insetX + 8}
                  y={insetY + 33}
                  fill={txtColor}
                  fillOpacity={0.8}
                  fontSize={11}
                  style={{ fontFamily: 'var(--font-sans)', fontWeight: 450, fontVariantNumeric: 'tabular-nums', pointerEvents: 'none' }}
                >
                  {r.item.value}
                </text>
              </>
            )}
          </g>
        )
      })}
    </svg>
  )
}
