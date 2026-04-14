// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartSankey — flow/energy diagram with nodes and curved flow-paths.
 *
 * Self-contained: renders its own `<svg>`, does NOT use ChartRoot.
 *
 * Usage:
 *   <ChartSankey
 *     data={{
 *       nodes: [{ id: 'intake', label: 'kJ Intake' }, ...],
 *       links: [{ source: 'intake', target: 'z2', value: 800 }, ...],
 *     }}
 *     colors={['#3b82f6', '#22c55e', '#eab308']}
 *   />
 */

import { useMemo, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'
import {
  sankeyLayout,
  type SankeyNodeInput,
  type SankeyLinkInput,
} from '@/lib/charts/layouts/sankey'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'

// ─── Props ───

export interface ChartSankeyProps {
  data: {
    nodes: SankeyNodeInput[]
    links: SankeyLinkInput[]
  }
  width?: number
  height?: number
  nodeWidth?: number
  nodePadding?: number
  colors?: string[]
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
  className?: string
}

// ─── Component ───

export function ChartSankey({
  data,
  width = 600,
  height = 400,
  nodeWidth = 18,
  nodePadding = 10,
  colors = [],
  animate = true,
  className,
}: ChartSankeyProps) {
  const padLeft = 4
  const padRight = 4
  const padTop = 4
  const padBottom = 4
  const innerW = width - padLeft - padRight
  const innerH = height - padTop - padBottom

  const layout = useMemo(
    () => sankeyLayout(data.nodes, data.links, innerW, innerH, nodeWidth, nodePadding, colors),
    [data.nodes, data.links, innerW, innerH, nodeWidth, nodePadding, colors],
  )

  // Find max column for label positioning
  const maxCol = useMemo(
    () => Math.max(...layout.nodes.map((n) => n.column), 0),
    [layout.nodes],
  )

  // Hover refs
  const linkRefs = useRef<(SVGPathElement | null)[]>([])
  const nodeRefs = useRef<(SVGGElement | null)[]>([])
  const currentLink = useRef(-1)
  const rafId = useRef(0)

  const applyHighlight = useCallback((target: number) => {
    if (target === currentLink.current) return
    currentLink.current = target

    linkRefs.current.forEach((p, i) => {
      if (!p) return
      p.style.opacity = target === -1 ? '0.3' : i === target ? '0.5' : '0.08'
    })
    nodeRefs.current.forEach((g) => {
      if (!g) return
      g.style.opacity = target === -1 ? '1' : '0.5'
    })

    // Highlight source and target nodes of the hovered link
    if (target >= 0) {
      const link = layout.links[target]
      nodeRefs.current.forEach((g, i) => {
        if (!g) return
        const node = layout.nodes[i]
        if (node.id === link.source.id || node.id === link.target.id) {
          g.style.opacity = '1'
        }
      })
    }
  }, [layout.links, layout.nodes])

  const handleLinkEnter = useCallback((idx: number) => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyHighlight(idx))
  }, [applyHighlight])

  const handleLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => applyHighlight(-1))
  }, [applyHighlight])

  // Animation
  const anim = resolveAnimate(animate, { duration: 600, delay: 0, easing: EASE_OUT_EXPO })

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn(className)}
      shapeRendering="geometricPrecision"
    >
      <g transform={`translate(${padLeft}, ${padTop})`}>
        {/* Links (bottom layer) */}
        {layout.links.map((link, i) => (
          <path
            key={`link-${i}`}
            ref={(el) => { linkRefs.current[i] = el }}
            d={link.path}
            fill={link.source.color}
            opacity={0.3}
            style={{
              transition: 'opacity 200ms',
              ...(anim.enabled
                ? { animation: `ramtt-grid-fade ${anim.duration}ms ${anim.easing} ${anim.delay + 200 + i * 40}ms both` }
                : undefined),
            }}
            onPointerEnter={() => handleLinkEnter(i)}
            onPointerLeave={handleLeave}
          />
        ))}

        {/* Nodes (top layer) */}
        {layout.nodes.map((node, i) => (
          <g
            key={node.id}
            ref={(el) => { nodeRefs.current[i] = el }}
            style={{
              transition: 'opacity 200ms',
              ...(anim.enabled
                ? { animation: `ramtt-dot-pop 400ms ${anim.easing} ${anim.delay + node.column * 100}ms both` }
                : undefined),
            }}
          >
            <rect
              x={node.x}
              y={node.y}
              width={node.width}
              height={node.height}
              rx={3}
              fill={node.color}
            />
            {/* Label — left of first column, right of last, otherwise right */}
            <text
              x={node.column === 0 ? node.x - 6 : node.x + node.width + 6}
              y={node.y + node.height / 2}
              textAnchor={node.column === 0 ? 'end' : 'start'}
              dominantBaseline="central"
              fill="var(--n1050)"
              fontSize={11}
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 450 }}
            >
              {node.label}
            </text>
          </g>
        ))}
      </g>
    </svg>
  )
}
