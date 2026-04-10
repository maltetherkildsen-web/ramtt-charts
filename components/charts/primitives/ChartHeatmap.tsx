// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartHeatmap — generic heatmap (rows × columns).
 *
 * Self-contained: renders its own `<svg>`, does NOT use ChartRoot.
 * Interaction: hover adds a stroke ring to the hovered cell — other cells
 * stay fully opaque (pattern recognition requires all cells visible).
 *
 * Zero React state on hover — refs + rAF only.
 */

import { useMemo, useRef, useCallback, useId } from 'react'
import { cn } from '@/lib/utils'
import { interpolateColor } from '@/lib/charts/utils/colorInterpolate'

// ─── Types ───

export interface HeatmapCell {
  row: number
  col: number
  value: number
}

export interface ChartHeatmapProps {
  /** Grid of values — array of { row, col, value }. */
  cells: HeatmapCell[]
  /** Row labels (y-axis). */
  rowLabels: string[]
  /** Column labels (x-axis). */
  colLabels: string[]
  /** Two-color gradient: [minColor, maxColor]. */
  colorRange?: [string, string]
  /** Multi-stop color scale — takes precedence over colorRange. */
  colorStops?: { value: number; color: string }[]
  /** Cell size in px. Default: auto-calculated. */
  cellSize?: number
  /** Gap between cells in px. Default: 2. */
  gap?: number
  /** Border radius on cells. Default: 2. */
  radius?: number
  /** Show value text inside cells. Default: false. */
  showValues?: boolean
  className?: string
}

// ─── Component ───

export function ChartHeatmap({
  cells,
  rowLabels,
  colLabels,
  colorRange,
  colorStops,
  cellSize: cellSizeProp,
  gap = 2,
  radius = 2,
  showValues = false,
  className,
}: ChartHeatmapProps) {
  const gradId = useId()

  // Compute value range
  const [minVal, maxVal] = useMemo(() => {
    let lo = Infinity
    let hi = -Infinity
    for (const c of cells) {
      if (c.value < lo) lo = c.value
      if (c.value > hi) hi = c.value
    }
    return [lo === Infinity ? 0 : lo, hi === -Infinity ? 1 : hi]
  }, [cells])

  // Build color stops for interpolation
  const stops = useMemo(() => {
    if (colorStops) {
      const range = maxVal - minVal || 1
      return colorStops.map((s) => ({ at: (s.value - minVal) / range, color: s.color }))
    }
    const [c0, c1] = colorRange ?? ['#EBE9E3', '#1e3a5f']
    return [
      { at: 0, color: c0 },
      { at: 1, color: c1 },
    ]
  }, [colorStops, colorRange, minVal, maxVal])

  // Layout
  const rows = rowLabels.length
  const cols = colLabels.length
  const labelLeft = 36
  const labelBottom = 20
  const legendHeight = 28

  const cs = cellSizeProp ?? Math.max(8, Math.min(28, Math.floor((880 - labelLeft) / cols) - gap))
  const gridW = cols * (cs + gap) - gap
  const gridH = rows * (cs + gap) - gap
  const svgW = labelLeft + gridW + 4
  const svgH = gridH + labelBottom + legendHeight + 8

  // Build lookup for fast cell access
  const cellMap = useMemo(() => {
    const m = new Map<string, number>()
    for (const c of cells) m.set(`${c.row},${c.col}`, c.value)
    return m
  }, [cells])

  // Refs for zero-rerender hover
  const cellRefs = useRef<(SVGRectElement | null)[]>([])
  const ringRef = useRef<SVGRectElement | null>(null)
  const tooltipGroupRef = useRef<SVGGElement | null>(null)
  const tooltipBgRef = useRef<SVGRectElement | null>(null)
  const tooltipTextRef = useRef<SVGTextElement | null>(null)
  const currentCell = useRef(-1)
  const rafId = useRef(0)

  const showTooltip = useCallback(
    (col: number, row: number, cx: number, cy: number) => {
      const val = cellMap.get(`${row},${col}`)
      const label = `${rowLabels[row]}, ${colLabels[col]}: ${val ?? 0}`
      if (!tooltipGroupRef.current || !tooltipBgRef.current || !tooltipTextRef.current) return

      tooltipTextRef.current.textContent = label
      const bbox = tooltipTextRef.current.getBBox()
      const pw = bbox.width + 12
      const ph = bbox.height + 8

      // Position above cursor, flip if too high
      let tx = cx - pw / 2
      let ty = cy - ph - 8
      if (ty < 0) ty = cy + cs + 4
      if (tx < labelLeft) tx = labelLeft
      if (tx + pw > svgW) tx = svgW - pw

      tooltipBgRef.current.setAttribute('x', tx.toFixed(1))
      tooltipBgRef.current.setAttribute('y', ty.toFixed(1))
      tooltipBgRef.current.setAttribute('width', pw.toFixed(1))
      tooltipBgRef.current.setAttribute('height', ph.toFixed(1))
      tooltipTextRef.current.setAttribute('x', (tx + pw / 2).toFixed(1))
      tooltipTextRef.current.setAttribute('y', (ty + ph / 2 + bbox.height / 2 - 2).toFixed(1))
      tooltipGroupRef.current.style.opacity = '1'
    },
    [cellMap, rowLabels, colLabels, cs, svgW, labelLeft],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGRectElement>) => {
      const svg = e.currentTarget.ownerSVGElement
      if (!svg) return
      const pt = svg.createSVGPoint()
      pt.x = e.clientX
      pt.y = e.clientY
      const local = pt.matrixTransform(svg.getScreenCTM()!.inverse())

      const col = Math.floor((local.x - labelLeft) / (cs + gap))
      const row = Math.floor(local.y / (cs + gap))

      if (col < 0 || col >= cols || row < 0 || row >= rows) {
        // Outside grid
        cancelAnimationFrame(rafId.current)
        rafId.current = requestAnimationFrame(() => {
          if (ringRef.current) ringRef.current.style.opacity = '0'
          if (tooltipGroupRef.current) tooltipGroupRef.current.style.opacity = '0'
          currentCell.current = -1
        })
        return
      }

      const idx = row * cols + col
      if (idx === currentCell.current) return
      currentCell.current = idx

      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        // Position ring
        if (ringRef.current) {
          const rx = labelLeft + col * (cs + gap) - 1
          const ry = row * (cs + gap) - 1
          ringRef.current.setAttribute('x', rx.toFixed(1))
          ringRef.current.setAttribute('y', ry.toFixed(1))
          ringRef.current.setAttribute('width', (cs + 2).toFixed(1))
          ringRef.current.setAttribute('height', (cs + 2).toFixed(1))
          ringRef.current.style.opacity = '1'
        }
        // Tooltip
        const cx = labelLeft + col * (cs + gap) + cs / 2
        const cy = row * (cs + gap)
        showTooltip(col, row, cx, cy)
      })
    },
    [cols, rows, cs, gap, labelLeft, showTooltip],
  )

  const handlePointerLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      if (ringRef.current) ringRef.current.style.opacity = '0'
      if (tooltipGroupRef.current) tooltipGroupRef.current.style.opacity = '0'
      currentCell.current = -1
    })
  }, [])

  return (
    <svg
      width={svgW}
      height={svgH}
      viewBox={`0 0 ${svgW} ${svgH}`}
      className={cn(className)}
      shapeRendering="crispEdges"
    >
      {/* Row labels */}
      {rowLabels.map((label, r) => (
        <text
          key={`rl-${r}`}
          x={labelLeft - 6}
          y={r * (cs + gap) + cs / 2 + 4}
          textAnchor="end"
          fontSize={9}
          fill="var(--n600)"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
        >
          {label}
        </text>
      ))}

      {/* Column labels */}
      {colLabels.map((label, c) => {
        // Only show every Nth label if too dense
        const skip = cols > 24 ? 2 : 1
        if (c % skip !== 0) return null
        return (
          <text
            key={`cl-${c}`}
            x={labelLeft + c * (cs + gap) + cs / 2}
            y={gridH + 14}
            textAnchor="middle"
            fontSize={9}
            fill="var(--n600)"
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
          >
            {label}
          </text>
        )
      })}

      {/* Cells */}
      {Array.from({ length: rows }, (_, r) =>
        Array.from({ length: cols }, (_, c) => {
          const val = cellMap.get(`${r},${c}`) ?? 0
          const norm = maxVal === minVal ? 0 : (val - minVal) / (maxVal - minVal)
          const fill = interpolateColor(norm, stops)
          const idx = r * cols + c

          return (
            <rect
              key={`${r}-${c}`}
              ref={(el) => { cellRefs.current[idx] = el }}
              x={labelLeft + c * (cs + gap)}
              y={r * (cs + gap)}
              width={cs}
              height={cs}
              rx={radius}
              ry={radius}
              fill={fill}
            />
          )
        }),
      )}

      {/* Value text (optional) */}
      {showValues &&
        cs >= 20 &&
        Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const val = cellMap.get(`${r},${c}`) ?? 0
            return (
              <text
                key={`v-${r}-${c}`}
                x={labelLeft + c * (cs + gap) + cs / 2}
                y={r * (cs + gap) + cs / 2 + 3}
                textAnchor="middle"
                fontSize={8}
                fill="var(--n1150)"
                fillOpacity={0.7}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 450,
                  fontVariantNumeric: 'tabular-nums',
                  pointerEvents: 'none',
                }}
              >
                {val}
              </text>
            )
          }),
        )}

      {/* Hover ring */}
      <rect
        ref={ringRef}
        x={0}
        y={0}
        width={cs + 2}
        height={cs + 2}
        rx={radius + 1}
        ry={radius + 1}
        fill="none"
        stroke="var(--n1150)"
        strokeWidth={2}
        style={{ opacity: 0, transition: 'opacity 100ms', pointerEvents: 'none' }}
      />

      {/* Tooltip */}
      <g ref={tooltipGroupRef} style={{ opacity: 0, transition: 'opacity 100ms', pointerEvents: 'none' }}>
        <rect
          ref={tooltipBgRef}
          rx={3}
          ry={3}
          fill="var(--n1150)"
        />
        <text
          ref={tooltipTextRef}
          textAnchor="middle"
          fill="var(--n50)"
          fontSize={10}
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}
        />
      </g>

      {/* Invisible overlay for pointer events */}
      <rect
        x={labelLeft}
        y={0}
        width={gridW}
        height={gridH}
        fill="transparent"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      />

      {/* Color legend */}
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          {stops.map((s, i) => (
            <stop key={i} offset={`${s.at * 100}%`} stopColor={s.color} />
          ))}
        </linearGradient>
      </defs>
      <text
        x={labelLeft}
        y={gridH + labelBottom + 18}
        fontSize={9}
        fill="var(--n600)"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
      >
        Low
      </text>
      <rect
        x={labelLeft + 24}
        y={gridH + labelBottom + 10}
        width={160}
        height={8}
        rx={2}
        fill={`url(#${gradId})`}
      />
      <text
        x={labelLeft + 190}
        y={gridH + labelBottom + 18}
        fontSize={9}
        fill="var(--n600)"
        style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
      >
        High
      </text>
    </svg>
  )
}
