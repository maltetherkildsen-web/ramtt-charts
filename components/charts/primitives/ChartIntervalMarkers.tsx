/**
 * ChartIntervalMarkers — renders interval boundaries and subtle shading.
 *
 * Place as a child of <ChartRoot>. All indices are relative to the
 * currently-visible data array (the parent should subtract zoom.start
 * before passing intervals here).
 *
 * Rects cover the FULL SVG height (including padding areas) so there
 * are no vertical gaps between stacked charts.
 */

import { useChart } from './chart-context'

// ─── Types ───

export interface Interval {
  name: string
  startIndex: number
  endIndex: number
  type: 'work' | 'rest'
}

export interface ChartIntervalMarkersProps {
  intervals: Interval[]
  workColor?: string
  restColor?: string
  showLabels?: boolean
}

// ─── Constants ───

const CHAR_WIDTH = 4.5
const LABEL_PAD = 6

// ─── Component ───

export function ChartIntervalMarkers({
  intervals,
  workColor = '#E36B30',
  restColor = '#14B8A2',
  showLabels = false,
}: ChartIntervalMarkersProps) {
  const { scaleX, height, padding, data } = useChart()
  const len = data.length

  const MIN_LABEL_LEFT = 50

  // Full SVG height coverage: from -padding.top to full SVG height
  const rectY = -padding.top
  const rectHeight = height

  let lastLabelEnd = -Infinity

  return (
    <g className="pointer-events-none" style={{ userSelect: 'none' }}>
      {intervals.map((iv, i) => {
        if (iv.endIndex < 0 || iv.startIndex >= len) return null

        const x1 = scaleX(Math.max(0, iv.startIndex))
        const x2 = scaleX(Math.min(len - 1, iv.endIndex))
        const opacity = iv.type === 'work' ? 0.4 : 0.15
        const showLine = iv.startIndex >= 0 && iv.startIndex < len

        const labelX = x1 + LABEL_PAD
        const labelWidth = iv.name.length * CHAR_WIDTH + LABEL_PAD * 2
        const canShowLabel = showLabels && showLine && labelX > lastLabelEnd + 4 && labelX > MIN_LABEL_LEFT
        if (canShowLabel) {
          lastLabelEnd = labelX + labelWidth
        }

        return (
          <g key={i}>
            {/* Shading — full SVG height, no vertical gaps */}
            <rect
              x={x1}
              y={rectY}
              width={Math.max(0, x2 - x1)}
              height={rectHeight}
              fill="var(--n400)"
              opacity={opacity}
            />

            {/* Start boundary line */}
            {showLine && (
              <line
                x1={x1}
                y1={rectY}
                x2={x1}
                y2={rectY + rectHeight}
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
