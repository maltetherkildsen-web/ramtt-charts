'use client'

/**
 * ChartCalendarHeatmap — GitHub-style contribution graph.
 *
 * Self-contained: renders its own `<svg>`, does NOT use ChartRoot.
 * 7 rows (Sun–Sat) × ~52 columns (weeks), 5-level quantized color.
 *
 * Zero React state on hover — refs + rAF only.
 */

import { useMemo, useRef, useCallback } from 'react'
import { cn } from '@/lib/utils'

// ─── Types ───

export interface CalendarDay {
  date: string   // 'YYYY-MM-DD'
  value: number  // intensity (0 = empty)
}

export interface ChartCalendarHeatmapProps {
  /** Array of day values. Missing dates render as empty cells. */
  data: CalendarDay[]
  /** Start date. Default: 52 weeks ago from today. */
  startDate?: string
  /** End date. Default: today. */
  endDate?: string
  /** 5 colors from empty (level 0) to max (level 4). */
  colors?: string[]
  /** Cell size in px. Default: 11. */
  cellSize?: number
  /** Gap between cells. Default: 2. */
  gap?: number
  /** Border radius. Default: 2. */
  radius?: number
  /** Show month labels. Default: true. */
  showMonthLabels?: boolean
  /** Show day-of-week labels. Default: true. */
  showDayLabels?: boolean
  className?: string
}

// ─── Defaults ───

const DEFAULT_COLORS = [
  '#EBE9E3', // level 0 — empty
  '#bfdbfe', // level 1
  '#60a5fa', // level 2
  '#2563eb', // level 3
  '#1e3a5f', // level 4
]

const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const DAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

// ─── Helpers ───

/** Parse YYYY-MM-DD to Date (UTC). */
function parseDate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

/** Format date for tooltip: "Mar 15, 2026". */
function formatDate(d: Date): string {
  return `${MONTH_NAMES[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`
}

/** YYYY-MM-DD string from Date (UTC). */
function toDateStr(d: Date): string {
  const y = d.getUTCFullYear()
  const m = String(d.getUTCMonth() + 1).padStart(2, '0')
  const day = String(d.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

/** Sunday on or before date. */
function prevSunday(d: Date): Date {
  const r = new Date(d)
  r.setUTCDate(r.getUTCDate() - r.getUTCDay())
  return r
}

// ─── Component ───

export function ChartCalendarHeatmap({
  data,
  startDate,
  endDate,
  colors = DEFAULT_COLORS,
  cellSize = 11,
  gap = 2,
  radius = 2,
  showMonthLabels = true,
  showDayLabels = true,
  className,
}: ChartCalendarHeatmapProps) {
  // Date range
  const end = endDate ? parseDate(endDate) : new Date()
  const start = startDate
    ? parseDate(startDate)
    : (() => {
        const d = new Date(end)
        d.setUTCDate(d.getUTCDate() - 52 * 7 + 1)
        return d
      })()
  const gridStart = prevSunday(start)

  // Build value map + find max for quantization
  const { valueMap, maxVal, totalContributions } = useMemo(() => {
    const vm = new Map<string, number>()
    let mx = 0
    let total = 0
    for (const d of data) {
      vm.set(d.date, d.value)
      if (d.value > mx) mx = d.value
      total += d.value
    }
    return { valueMap: vm, maxVal: mx, totalContributions: total }
  }, [data])

  // Quantize value to 0-4 level
  const quantize = useCallback(
    (v: number): number => {
      if (v === 0) return 0
      if (maxVal === 0) return 0
      const frac = v / maxVal
      if (frac <= 0.25) return 1
      if (frac <= 0.5) return 2
      if (frac <= 0.75) return 3
      return 4
    },
    [maxVal],
  )

  // Build cell grid
  const cells = useMemo(() => {
    const result: { date: Date; dateStr: string; col: number; row: number; level: number; value: number }[] = []
    const cursor = new Date(gridStart)
    const endTime = end.getTime()

    while (cursor.getTime() <= endTime) {
      const ds = toDateStr(cursor)
      const val = valueMap.get(ds) ?? 0
      const daysSinceStart = Math.round((cursor.getTime() - gridStart.getTime()) / (24 * 60 * 60 * 1000))
      const col = Math.floor(daysSinceStart / 7)
      const row = cursor.getUTCDay()

      result.push({
        date: new Date(cursor),
        dateStr: ds,
        col,
        row,
        level: quantize(val),
        value: val,
      })
      cursor.setUTCDate(cursor.getUTCDate() + 1)
    }
    return result
  }, [gridStart, end, valueMap, quantize])

  // Layout
  const numCols = cells.length > 0 ? cells[cells.length - 1].col + 1 : 0
  const dayLabelWidth = showDayLabels ? 28 : 0
  const monthLabelHeight = showMonthLabels ? 16 : 0
  const gridW = numCols * (cellSize + gap) - gap
  const gridH = 7 * (cellSize + gap) - gap
  const summaryHeight = 28
  const legendHeight = 20
  const svgW = dayLabelWidth + gridW + 4
  const svgH = monthLabelHeight + gridH + summaryHeight + legendHeight

  // Month label positions
  const monthLabels = useMemo(() => {
    const labels: { label: string; x: number }[] = []
    let lastMonth = -1
    for (const c of cells) {
      const m = c.date.getUTCMonth()
      if (m !== lastMonth && c.row === 0) {
        labels.push({
          label: MONTH_NAMES[m],
          x: dayLabelWidth + c.col * (cellSize + gap),
        })
        lastMonth = m
      }
    }
    return labels
  }, [cells, cellSize, gap, dayLabelWidth])

  // Refs for zero-rerender hover
  const ringRef = useRef<SVGRectElement | null>(null)
  const tooltipGroupRef = useRef<SVGGElement | null>(null)
  const tooltipBgRef = useRef<SVGRectElement | null>(null)
  const tooltipTextRef = useRef<SVGTextElement | null>(null)
  const currentIdx = useRef(-1)
  const rafId = useRef(0)

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<SVGRectElement>) => {
      const svg = e.currentTarget.ownerSVGElement
      if (!svg) return
      const pt = svg.createSVGPoint()
      pt.x = e.clientX
      pt.y = e.clientY
      const local = pt.matrixTransform(svg.getScreenCTM()!.inverse())

      const col = Math.floor((local.x - dayLabelWidth) / (cellSize + gap))
      const row = Math.floor((local.y - monthLabelHeight) / (cellSize + gap))

      if (col < 0 || col >= numCols || row < 0 || row >= 7) {
        cancelAnimationFrame(rafId.current)
        rafId.current = requestAnimationFrame(() => {
          if (ringRef.current) ringRef.current.style.opacity = '0'
          if (tooltipGroupRef.current) tooltipGroupRef.current.style.opacity = '0'
          currentIdx.current = -1
        })
        return
      }

      // Find cell at this col/row
      const cell = cells.find((c) => c.col === col && c.row === row)
      if (!cell) return

      const cellIdx = col * 7 + row
      if (cellIdx === currentIdx.current) return
      currentIdx.current = cellIdx

      cancelAnimationFrame(rafId.current)
      rafId.current = requestAnimationFrame(() => {
        const cx = dayLabelWidth + col * (cellSize + gap)
        const cy = monthLabelHeight + row * (cellSize + gap)

        // Ring
        if (ringRef.current) {
          ringRef.current.setAttribute('x', (cx - 1).toFixed(1))
          ringRef.current.setAttribute('y', (cy - 1).toFixed(1))
          ringRef.current.style.opacity = '1'
        }

        // Tooltip
        if (tooltipTextRef.current && tooltipBgRef.current && tooltipGroupRef.current) {
          const label = `${formatDate(cell.date)} — ${cell.value} contributions`
          tooltipTextRef.current.textContent = label
          const bbox = tooltipTextRef.current.getBBox()
          const pw = bbox.width + 12
          const ph = bbox.height + 8

          let tx = cx - pw / 2 + cellSize / 2
          let ty = cy - ph - 6
          if (ty < 0) ty = cy + cellSize + 4
          if (tx < 0) tx = 0
          if (tx + pw > svgW) tx = svgW - pw

          tooltipBgRef.current.setAttribute('x', tx.toFixed(1))
          tooltipBgRef.current.setAttribute('y', ty.toFixed(1))
          tooltipBgRef.current.setAttribute('width', pw.toFixed(1))
          tooltipBgRef.current.setAttribute('height', ph.toFixed(1))
          tooltipTextRef.current.setAttribute('x', (tx + pw / 2).toFixed(1))
          tooltipTextRef.current.setAttribute('y', (ty + ph / 2 + bbox.height / 2 - 2).toFixed(1))
          tooltipGroupRef.current.style.opacity = '1'
        }
      })
    },
    [cells, cellSize, gap, dayLabelWidth, monthLabelHeight, numCols, svgW],
  )

  const handlePointerLeave = useCallback(() => {
    cancelAnimationFrame(rafId.current)
    rafId.current = requestAnimationFrame(() => {
      if (ringRef.current) ringRef.current.style.opacity = '0'
      if (tooltipGroupRef.current) tooltipGroupRef.current.style.opacity = '0'
      currentIdx.current = -1
    })
  }, [])

  return (
    <div className={cn(className)}>
      <svg
        width={svgW}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        shapeRendering="crispEdges"
      >
        {/* Month labels */}
        {showMonthLabels &&
          monthLabels.map((m, i) => (
            <text
              key={i}
              x={m.x}
              y={11}
              fontSize={9}
              fill="var(--n600)"
              style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
            >
              {m.label}
            </text>
          ))}

        {/* Day-of-week labels */}
        {showDayLabels &&
          DAY_LABELS.map((label, i) =>
            label ? (
              <text
                key={i}
                x={dayLabelWidth - 4}
                y={monthLabelHeight + i * (cellSize + gap) + cellSize / 2 + 3}
                textAnchor="end"
                fontSize={9}
                fill="var(--n600)"
                style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
              >
                {label}
              </text>
            ) : null,
          )}

        {/* Day cells */}
        {cells.map((c) => (
          <rect
            key={c.dateStr}
            x={dayLabelWidth + c.col * (cellSize + gap)}
            y={monthLabelHeight + c.row * (cellSize + gap)}
            width={cellSize}
            height={cellSize}
            rx={radius}
            ry={radius}
            fill={colors[c.level]}
          />
        ))}

        {/* Hover ring */}
        <rect
          ref={ringRef}
          width={cellSize + 2}
          height={cellSize + 2}
          rx={radius + 1}
          ry={radius + 1}
          fill="none"
          stroke="var(--n1150)"
          strokeWidth={1.5}
          style={{ opacity: 0, transition: 'opacity 100ms', pointerEvents: 'none' }}
        />

        {/* Tooltip */}
        <g ref={tooltipGroupRef} style={{ opacity: 0, transition: 'opacity 100ms', pointerEvents: 'none' }}>
          <rect ref={tooltipBgRef} rx={3} ry={3} fill="var(--n1150)" />
          <text
            ref={tooltipTextRef}
            textAnchor="middle"
            fill="var(--n50)"
            fontSize={10}
            style={{ fontFamily: 'var(--font-sans)', fontWeight: 500 }}
          />
        </g>

        {/* Invisible overlay */}
        <rect
          x={dayLabelWidth}
          y={monthLabelHeight}
          width={gridW}
          height={gridH}
          fill="transparent"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        />

        {/* Summary text */}
        <text
          x={dayLabelWidth}
          y={monthLabelHeight + gridH + 20}
          fontSize={11}
          fill="var(--n800)"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 550, fontVariantNumeric: 'tabular-nums' }}
        >
          {totalContributions.toLocaleString()}
        </text>
        <text
          x={dayLabelWidth + String(totalContributions.toLocaleString()).length * 6.5 + 4}
          y={monthLabelHeight + gridH + 20}
          fontSize={11}
          fill="var(--n600)"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
        >
          contributions in the last year
        </text>

        {/* Color legend */}
        <text
          x={svgW - 140}
          y={monthLabelHeight + gridH + 20}
          fontSize={9}
          fill="var(--n600)"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
        >
          Less
        </text>
        {colors.map((c, i) => (
          <rect
            key={`legend-${i}`}
            x={svgW - 112 + i * (cellSize + 2)}
            y={monthLabelHeight + gridH + 11}
            width={cellSize}
            height={cellSize}
            rx={radius}
            ry={radius}
            fill={c}
          />
        ))}
        <text
          x={svgW - 112 + colors.length * (cellSize + 2) + 4}
          y={monthLabelHeight + gridH + 20}
          fontSize={9}
          fill="var(--n600)"
          style={{ fontFamily: 'var(--font-sans)', fontWeight: 400 }}
        >
          More
        </text>
      </svg>
    </div>
  )
}
