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
import { cn } from '@/lib/ui'
import {
  interpolateColorScale,
  isLightColor,
  type ColorStop,
} from '@/lib/charts/utils/colorScale'
import { resolveAnimate, EASE_OUT_EXPO, type AnimateConfig } from '@/lib/charts/utils/animate'

// ─── Types ───

export interface ChartHeatmapProps {
  /** Grid of values — rows × columns. null = no data (grey cell). */
  data: (number | null)[][]
  /** Column labels (x-axis). Empty string = skip label. */
  xLabels?: string[]
  /** Row labels (y-axis). */
  yLabels?: string[]
  /** Color scale stops with raw data values. Min 2 stops. */
  colorScale: ColorStop[]
  /** Cell size in px. Default: 14. */
  cellSize?: number
  /** Gap between cells in px. Default: 2. */
  cellGap?: number
  /** Border radius per cell. Default: 2. */
  cellRadius?: number
  /** Show numeric value in each cell. Default: false. */
  showValues?: boolean
  /** Called on cell hover. */
  onCellHover?: (row: number, col: number, value: number | null) => void
  /** Called on cell click. */
  onCellClick?: (row: number, col: number, value: number | null) => void
  className?: string
  /** Entry animation. Default: true. */
  animate?: AnimateConfig
}

// ─── Component ───

export function ChartHeatmap({
  data,
  xLabels,
  yLabels,
  colorScale,
  cellSize: cs = 14,
  cellGap: gap = 2,
  cellRadius: radius = 2,
  showValues = false,
  onCellHover,
  onCellClick,
  className,
  animate = true,
}: ChartHeatmapProps) {
  const gradId = useId()

  const rows = data.length
  const cols = rows > 0 ? Math.max(...data.map((r) => r.length)) : 0

  // Layout measurements
  const yLabelWidth = yLabels ? 48 : 0
  const xLabelHeight = xLabels ? 18 : 0
  const legendHeight = 28

  const gridW = cols * (cs + gap) - (cols > 0 ? gap : 0)
  const gridH = rows * (cs + gap) - (rows > 0 ? gap : 0)
  const svgW = yLabelWidth + gridW + 4
  const svgH = xLabelHeight + gridH + legendHeight + 8

  // Precompute cell colors
  const cellColors = useMemo(() => {
    return data.map((row) =>
      row.map((val) => {
        if (val === null) return 'var(--n400)'
        return interpolateColorScale(val, colorScale)
      }),
    )
  }, [data, colorScale])

  // Color scale min/max for legend
  const scaleMin = colorScale.length > 0 ? colorScale[0].value : 0
  const scaleMax = colorScale.length > 0 ? colorScale[colorScale.length - 1].value : 100

  // Gradient stops for legend (normalized 0-1)
  const legendStops = useMemo(() => {
    const range = scaleMax - scaleMin || 1
    return colorScale.map((s) => ({
      offset: ((s.value - scaleMin) / range) * 100,
      color: s.color,
    }))
  }, [colorScale, scaleMin, scaleMax])

  // Animation
  const anim = resolveAnimate(animate, { duration: 200, delay: 0, easing: EASE_OUT_EXPO })
  const cellStagger = 20

  // Refs for zero-rerender hover
  const ringRef = useRef<SVGRectElement | null>(null)
  const tooltipGroupRef = useRef<SVGGElement | null>(null)
  const tooltipBgRef = useRef<SVGRectElement | null>(null)
  const tooltipTextRef = useRef<SVGTextElement | null>(null)
  const currentCell = useRef(-1)
  const rafId = useRef(0)

  const showTooltip = useCallback(
    (col: number, row: number, cellX: number, cellY: number) => {
      const val = data[row]?.[col]
      const rowLabel = yLabels?.[row] ?? `Row ${row}`
      const colLabel = xLabels?.[col] ?? `Col ${col}`
      const label = val !== null && val !== undefined
        ? `${rowLabel}, ${colLabel}: ${val}`
        : `${rowLabel}, ${colLabel}: —`
      if (!tooltipGroupRef.current || !tooltipBgRef.current || !tooltipTextRef.current) return

      tooltipTextRef.current.textContent = label
      const bbox = tooltipTextRef.current.getBBox()
      const pw = bbox.width + 12
      const ph = bbox.height + 8

      let tx = cellX - pw / 2
      let ty = cellY - ph - 8
      if (ty < 0) ty = cellY + cs + 4
      if (tx < yLabelWidth) tx = yLabelWidth
      if (tx + pw > svgW) tx = svgW - pw

      tooltipBgRef.current.setAttribute('x', tx.toFixed(1))
      tooltipBgRef.current.setAttribute('y', ty.toFixed(1))
      tooltipBgRef.current.setAttribute('width', pw.toFixed(1))
      tooltipBgRef.current.setAttribute('height', ph.toFixed(1))
      tooltipTextRef.current.setAttribute('x', (tx + pw / 2).toFixed(1))
      tooltipTextRef.current.setAttribute('y', (ty + ph / 2 + bbox.height / 2 - 2).toFixed(1))
      tooltipGroupRef.current.style.opacity = '1'
    },
    [data, yLabels, xLabels, cs, svgW, yLabelWidth],
  )

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGRectElement>) => {
      const svg = e.currentTarget.ownerSVGElement
      if (!svg) return
      const pt = svg.createSVGPoint()
      pt.x = e.clientX
      pt.y = e.clientY
      const local = pt.matrixTransform(svg.getScreenCTM()!.inverse())

      const col = Math.floor((local.x - yLabelWidth) / (cs + gap))
      const row = Math.floor((local.y - xLabelHeight) / (cs + gap))

      if (col < 0 || col >= cols || row < 0 || row >= rows) {
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

      onCellHover?.(row, col, data[row]?.[col] ?? null)

      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        if (ringRef.current) {
          const rx = yLabelWidth + col * (cs + gap) - 1
          const ry = xLabelHeight + row * (cs + gap) - 1
          ringRef.current.setAttribute('x', rx.toFixed(1))
          ringRef.current.setAttribute('y', ry.toFixed(1))
          ringRef.current.setAttribute('width', (cs + 2).toFixed(1))
          ringRef.current.setAttribute('height', (cs + 2).toFixed(1))
          ringRef.current.style.opacity = '1'
        }
        const cellCx = yLabelWidth + col * (cs + gap) + cs / 2
        const cellCy = xLabelHeight + row * (cs + gap)
        showTooltip(col, row, cellCx, cellCy)
      })
    },
    [cols, rows, cs, gap, yLabelWidth, xLabelHeight, showTooltip, onCellHover, data],
  )

  const handlePointerLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      if (ringRef.current) ringRef.current.style.opacity = '0'
      if (tooltipGroupRef.current) tooltipGroupRef.current.style.opacity = '0'
      currentCell.current = -1
    })
  }, [])

  const handleClick = useCallback(
    (e: React.PointerEvent<SVGRectElement>) => {
      if (!onCellClick) return
      const svg = e.currentTarget.ownerSVGElement
      if (!svg) return
      const pt = svg.createSVGPoint()
      pt.x = e.clientX
      pt.y = e.clientY
      const local = pt.matrixTransform(svg.getScreenCTM()!.inverse())

      const col = Math.floor((local.x - yLabelWidth) / (cs + gap))
      const row = Math.floor((local.y - xLabelHeight) / (cs + gap))

      if (col >= 0 && col < cols && row >= 0 && row < rows) {
        onCellClick(row, col, data[row]?.[col] ?? null)
      }
    },
    [onCellClick, yLabelWidth, xLabelHeight, cs, gap, cols, rows, data],
  )

  return (
    <svg
      width={svgW}
      height={svgH}
      viewBox={`0 0 ${svgW} ${svgH}`}
      className={cn(className)}
      shapeRendering="crispEdges"
    >
      {/* Y labels (row) */}
      {yLabels?.map((label, r) => (
        <text
          key={`rl-${r}`}
          x={yLabelWidth - 6}
          y={xLabelHeight + r * (cs + gap) + cs / 2 + 4}
          textAnchor="end"
          fontSize={11}
          fill="var(--n800)"
          style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
        >
          {label}
        </text>
      ))}

      {/* X labels (column) */}
      {xLabels?.map((label, c) => {
        if (!label) return null
        return (
          <text
            key={`cl-${c}`}
            x={yLabelWidth + c * (cs + gap) + cs / 2}
            y={xLabelHeight - 5}
            textAnchor="middle"
            fontSize={10}
            fill="var(--n600)"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 450 }}
          >
            {label}
          </text>
        )
      })}

      {/* Cells */}
      {data.map((row, r) =>
        row.map((val, c) => (
          <rect
            key={`${r}-${c}`}
            x={yLabelWidth + c * (cs + gap)}
            y={xLabelHeight + r * (cs + gap)}
            width={cs}
            height={cs}
            rx={radius}
            ry={radius}
            fill={cellColors[r]?.[c] ?? 'var(--n400)'}
            style={anim.enabled
              ? { animation: `ramtt-cell-fade ${anim.duration}ms ${anim.easing} ${anim.delay + (r + c) * cellStagger}ms both` }
              : undefined
            }
          />
        )),
      )}

      {/* Value text (optional) */}
      {showValues &&
        cs >= 20 &&
        data.map((row, r) =>
          row.map((val, c) => {
            if (val === null) return null
            const cellColor = cellColors[r]?.[c] ?? 'var(--n400)'
            const textColor = cellColor.startsWith('#') && !isLightColor(cellColor)
              ? 'var(--n50)'
              : 'var(--n1150)'
            return (
              <text
                key={`v-${r}-${c}`}
                x={yLabelWidth + c * (cs + gap) + cs / 2}
                y={xLabelHeight + r * (cs + gap) + cs / 2 + 3}
                textAnchor="middle"
                fontSize={cs * 0.4}
                fill={textColor}
                style={{
                  fontFamily: "var(--font-sans)",
                  fontWeight: 550,
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
          style={{ fontFamily: "var(--font-sans)", fontWeight: 500, fontVariantNumeric: 'tabular-nums' }}
        />
      </g>

      {/* Invisible overlay for pointer events */}
      <rect
        x={yLabelWidth}
        y={xLabelHeight}
        width={gridW}
        height={gridH}
        fill="transparent"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        onClick={handleClick as unknown as React.MouseEventHandler}
      />

      {/* Color scale legend */}
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="1" y2="0">
          {legendStops.map((s, i) => (
            <stop key={i} offset={`${s.offset}%`} stopColor={s.color} />
          ))}
        </linearGradient>
      </defs>
      <text
        x={yLabelWidth}
        y={xLabelHeight + gridH + 18}
        fontSize={9}
        fill="var(--n600)"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
      >
        {scaleMin}
      </text>
      <rect
        x={yLabelWidth + 28}
        y={xLabelHeight + gridH + 10}
        width={120}
        height={8}
        rx={4}
        fill={`url(#${gradId})`}
      />
      <text
        x={yLabelWidth + 154}
        y={xLabelHeight + gridH + 18}
        fontSize={9}
        fill="var(--n600)"
        style={{ fontFamily: "var(--font-sans)", fontWeight: 400 }}
      >
        {scaleMax}
      </text>
    </svg>
  )
}
