'use client'

/**
 * ChartZoomHandler — invisible component that attaches zoom/pan
 * listeners to the chart's SVG element.
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

import { useChartZoom } from './useChartZoom'

export function ChartZoomHandler() {
  useChartZoom()
  return null // No DOM output — just attaches listeners
}
