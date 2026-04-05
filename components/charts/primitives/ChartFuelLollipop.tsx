'use client'

/**
 * ChartFuelLollipop — lollipop chart for discrete fuel/CHO intake events.
 *
 * Layers (back to front):
 *   1. Cumulative stepped area fill (gradient)
 *   2. Cumulative stepped line (thin stroke)
 *   3. Lollipop stems (vertical lines from baseline)
 *   4. Lollipop circles (at cumulative Y for each intake)
 *   5. Gram labels above circles
 *   6. Target reference line (dashed)
 *   7. Total label (top-right)
 */

import { useId, useMemo } from 'react'
import { scaleLinear } from '@/lib/charts/scales/linear'
import { useChart } from './chart-context'

export interface LollipopIntake {
  /** Seconds from session start (absolute, NOT relative to visible range). */
  timestamp: number
  choGrams: number
}

export interface ChartFuelLollipopProps {
  intakes: LollipopIntake[]
  target?: number
  color?: string
}

const COLOR = '#f97316'

export function ChartFuelLollipop({
  intakes,
  target = 200,
  color = COLOR,
}: ChartFuelLollipopProps) {
  const { scaleX, chartHeight, chartWidth, data } = useChart()
  const gradId = useId()
  const glowId = useId()
  const dataLen = data.length

  // Sort intakes and compute cumulative values
  const sorted = useMemo(() => {
    const s = [...intakes].sort((a, b) => a.timestamp - b.timestamp)
    let cum = 0
    return s.map((i) => {
      cum += i.choGrams
      return { ...i, cumulative: cum }
    })
  }, [intakes])

  const totalCHO = sorted.length > 0 ? sorted[sorted.length - 1].cumulative : 0

  // Y-scale: FIXED to target — lollipops grow UP toward target, never shrink
  // If totalCHO exceeds target, extend slightly above
  const yMax = Math.max(target * 1.1, totalCHO * 1.05, 10)
  const yScale = useMemo(() => scaleLinear([0, yMax], [chartHeight, 0]), [yMax, chartHeight])

  // Filter intakes to visible range (data indices 0..dataLen-1 map to the visible slice)
  // scaleX maps index-in-visible-range → pixels.
  // We need to know the absolute offset: the ChartRoot receives visCHO which is
  // cumulativeCHO.slice(start, end+1), so index 0 in data = second `start`.
  // But we receive intakes with absolute timestamps. The parent already filters
  // and offsets them for us — timestamp is relative to visible range start.

  const visibleIntakes = useMemo(() => {
    return sorted.filter((i) => i.timestamp >= 0 && i.timestamp < dataLen)
  }, [sorted, dataLen])

  // Build cumulative stepped path for area + line
  const steppedPath = useMemo(() => {
    if (visibleIntakes.length === 0) return { area: '', line: '' }

    const baseline = chartHeight

    // Build step points: start at 0, jump at each intake
    const pts: { x: number; y: number }[] = []
    let prevCum = 0

    // Start at x=0, y=baseline (cum=0)
    pts.push({ x: 0, y: yScale(0) })

    for (const intake of visibleIntakes) {
      const px = scaleX(intake.timestamp)
      // Horizontal to this x at previous cumulative level
      pts.push({ x: px, y: yScale(prevCum) })
      // Jump up to new cumulative level
      pts.push({ x: px, y: yScale(intake.cumulative) })
      prevCum = intake.cumulative
    }

    // Extend to end of chart
    pts.push({ x: chartWidth, y: yScale(prevCum) })

    // Line path
    let line = `M${pts[0].x.toFixed(1)},${pts[0].y.toFixed(1)}`
    for (let i = 1; i < pts.length; i++) {
      const p = pts[i]
      const prev = pts[i - 1]
      if (Math.abs(p.x - prev.x) > 0.01) line += ` H${p.x.toFixed(1)}`
      if (Math.abs(p.y - prev.y) > 0.01) line += ` V${p.y.toFixed(1)}`
    }

    // Area path — same shape, closed to baseline
    const area = `${line} V${baseline.toFixed(1)} H0 Z`

    return { area, line }
  }, [visibleIntakes, scaleX, yScale, chartHeight, chartWidth])

  // Lollipop positions
  const lollipops = useMemo(() => {
    return visibleIntakes.map((i) => ({
      x: scaleX(i.timestamp),
      y: yScale(i.cumulative),
      grams: i.choGrams,
      cumulative: i.cumulative,
    }))
  }, [visibleIntakes, scaleX, yScale])

  // Smart label visibility — hide labels that would overlap
  const labelVisible = useMemo(() => {
    const MIN_GAP = 32 // minimum px between label centers
    const vis = new Array(lollipops.length).fill(true)
    for (let i = 1; i < lollipops.length; i++) {
      if (lollipops[i].x - lollipops[i - 1].x < MIN_GAP && vis[i - 1]) {
        vis[i] = false // skip this one, keep previous
      }
    }
    return vis
  }, [lollipops])

  const targetY = yScale(target)
  const pct = target > 0 ? Math.round((totalCHO / target) * 100) : 0

  return (
    <g>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.15} />
          <stop offset="100%" stopColor={color} stopOpacity={0.01} />
        </linearGradient>
        <filter id={glowId} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="0.5" stdDeviation="1.5" floodColor={color} floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Layer 1 — Cumulative area fill */}
      {steppedPath.area && (
        <path d={steppedPath.area} fill={`url(#${gradId})`} className="stroke-none" />
      )}

      {/* Layer 2 — Cumulative stepped line */}
      {steppedPath.line && (
        <path
          d={steppedPath.line}
          fill="none"
          stroke={color}
          strokeOpacity={0.45}
          strokeWidth={1.5}
          strokeLinejoin="miter"
          vectorEffect="non-scaling-stroke"
        />
      )}

      {/* Layer 3 — Lollipop stems */}
      {lollipops.map((lp, i) => (
        <line
          key={`stem-${i}`}
          x1={lp.x} y1={chartHeight} x2={lp.x} y2={lp.y}
          stroke={color} strokeWidth={1.5} strokeOpacity={0.35}
          strokeDasharray="2,2"
        />
      ))}

      {/* Layer 4 — Lollipop circles with glow */}
      {lollipops.map((lp, i) => (
        <circle
          key={`dot-${i}`}
          cx={lp.x} cy={lp.y} r={4.5}
          fill={color} stroke="white" strokeWidth={2}
          filter={`url(#${glowId})`}
        />
      ))}

      {/* Layer 5 — Gram labels (only where they fit) */}
      {lollipops.map((lp, i) => (
        labelVisible[i] && (
          <text
            key={`label-${i}`}
            x={lp.x} y={lp.y - 10}
            textAnchor="middle"
            className="font-space text-[10px] font-medium"
            fill={color}
          >
            {lp.grams}g
          </text>
        )
      ))}

      {/* Layer 6 — Target reference line */}
      {isFinite(targetY) && targetY >= -2 && targetY <= chartHeight + 2 && (
        <g>
          <line
            x1={0} y1={targetY} x2={chartWidth} y2={targetY}
            stroke={color} strokeOpacity={0.25} strokeWidth={0.5} strokeDasharray="3,3"
          />
          <text
            x={chartWidth + 4} y={targetY} dy="0.32em"
            className="fill-[#A8A49A] font-space text-[9px]"
          >
            {target}g
          </text>
        </g>
      )}

      {/* Layer 7 — Total label */}
      {totalCHO > 0 && (
        <text
          x={chartWidth - 4} y={12}
          textAnchor="end"
          className="font-space text-[10px] font-medium"
          fill={color}
        >
          {totalCHO}g / {target}g ({pct}%)
        </text>
      )}
    </g>
  )
}
