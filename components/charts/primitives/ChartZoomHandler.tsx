'use client'

/**
 * ChartZoomHandler — attaches zoom/pan/brush listeners to the chart's SVG
 * and renders a semi-transparent brush overlay during drag selection.
 *
 * Place inside <ChartRoot> alongside other primitives.
 * Requires a <ChartSyncProvider> ancestor.
 *
 * Usage:
 *   <ChartSyncProvider dataLength={200}>
 *     <ChartRoot data={visibleData}>
 *       <ChartLine />
 *       <ChartZoomHandler />
 *     </ChartRoot>
 *   </ChartSyncProvider>
 */

import { useRef } from 'react'
import { useChart } from './chart-context'
import { useChartZoom } from './useChartZoom'

export function ChartZoomHandler() {
  const { chartHeight } = useChart()
  const brushRef = useRef<SVGRectElement>(null)
  useChartZoom(brushRef)

  return (
    <rect
      ref={brushRef}
      x={0}
      y={0}
      width={0}
      height={chartHeight}
      fill="rgba(15, 15, 14, 0.06)"
      stroke="rgba(15, 15, 14, 0.2)"
      strokeWidth={0.5}
      display="none"
      className="pointer-events-none"
    />
  )
}
