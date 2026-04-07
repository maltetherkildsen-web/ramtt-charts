/**
 * ChartIntervalMarkers — renders interval boundaries and subtle shading
 * inside a chart.
 *
 * Place as a child of <ChartRoot>. All indices are relative to the
 * currently-visible data array (the parent should subtract zoom.start
 * before passing intervals here).
 *
 * Visual noise is kept minimal:
 *   - Shading opacity: work 0.02, rest 0.01
 *   - Labels only rendered when `showLabels` is true (typically top chart only)
 *   - Overlapping labels are automatically hidden
 */

import { useChart } from './chart-context'

// ─── Types ───

export interface Interval {
  /** Interval name (e.g. "Tempo #1", "Pause", "Cooldown") */
  name: string
  /** Start index in the visible data array */
  startIndex: number
  /** End index in the visible data array */
  endIndex: number
  /** Interval type — determines shading color */
  type: 'work' | 'rest'
}

export interface ChartIntervalMarkersProps {
  intervals: Interval[]
  /** Work shading color. Default: '#E36B30' */
  workColor?: string
  /** Rest shading color. Default: '#14B8A2' */
  restColor?: string
  /** Show interval name labels. Default: false (only top chart should enable). */
  showLabels?: boolean
}

// ─── Constants ───

/** Approx width of a label character in the 8px font. */
const CHAR_WIDTH = 4.5
/** Horizontal padding on each side of a label. */
const LABEL_PAD = 6

// ─── Component ───

export function ChartIntervalMarkers({
  intervals,
  workColor = '#E36B30',
  restColor = '#14B8A2',
  showLabels = false,
}: ChartIntervalMarkersProps) {
  const { scaleX, chartHeight, data } = useChart()
  const len = data.length

  // Pre-compute label positions and filter overlaps
  let lastLabelEnd = -Infinity

  return (
    <g className="pointer-events-none" style={{ userSelect: 'none' }}>
      {intervals.map((iv, i) => {
        // Skip intervals entirely outside the visible range
        if (iv.endIndex < 0 || iv.startIndex >= len) return null

        const x1 = scaleX(Math.max(0, iv.startIndex))
        const x2 = scaleX(Math.min(len - 1, iv.endIndex))
        const color = iv.type === 'work' ? workColor : restColor
        const opacity = iv.type === 'work' ? 0.02 : 0.01
        const showLine = iv.startIndex >= 0 && iv.startIndex < len

        // Label overlap detection: only render if it doesn't collide
        const labelX = x1 + LABEL_PAD
        const labelWidth = iv.name.length * CHAR_WIDTH + LABEL_PAD * 2
        const canShowLabel = showLabels && showLine && labelX > lastLabelEnd + 4
        if (canShowLabel) {
          lastLabelEnd = labelX + labelWidth
        }

        return (
          <g key={i}>
            {/* Shading */}
            <rect
              x={x1}
              y={0}
              width={Math.max(0, x2 - x1)}
              height={chartHeight}
              fill={color}
              opacity={opacity}
            />

            {/* Start boundary line — dashed, very subtle */}
            {showLine && (
              <line
                x1={x1}
                y1={0}
                x2={x1}
                y2={chartHeight}
                stroke="var(--n400)"
                strokeWidth={0.5}
                strokeDasharray="3 4"
              />
            )}

            {/* Label — only on top chart, no overlap */}
            {canShowLabel && (
              <text
                x={labelX}
                y={13}
                className="fill-(--n600) text-[7px] font-[550]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {iv.name}
              </text>
            )}
          </g>
        )
      })}
    </g>
  )
}
