'use client'

/**
 * ChartZoomHandler — attaches zoom/pan/brush listeners to the chart's SVG.
 *
 * Renders nothing — the visual brush overlay is handled by <BrushOverlay>,
 * a single absolute-positioned div that spans the entire chart stack
 * (no gaps between charts).
 */

import { useChartZoom } from './useChartZoom'

export function ChartZoomHandler() {
  useChartZoom()
  return null
}
