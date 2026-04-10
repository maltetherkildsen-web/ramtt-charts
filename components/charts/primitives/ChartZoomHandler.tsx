// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartZoomHandler — attaches zoom/pan/brush listeners to the chart's SVG.
 *
 * Renders nothing — the visual brush overlay is handled by <BrushOverlay>,
 * a single absolute-positioned div that spans the entire chart stack.
 */

import { useRef } from 'react'
import { useChartZoom } from './useChartZoom'

export function ChartZoomHandler() {
  const brushRef = useRef<SVGRectElement>(null)
  useChartZoom(brushRef)
  return null
}
