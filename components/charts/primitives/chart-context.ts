/**
 * Chart context — exposes scales, dimensions, and data to child primitives.
 *
 * Separated from ChartRoot so primitives can import the context type
 * without pulling in the full root component.
 */

import { createContext, useContext } from 'react'
import type { LinearScale } from '@/lib/charts/scales/linear'

// ─── Padding ───

export interface ChartPadding {
  top: number
  right: number
  bottom: number
  left: number
}

export const DEFAULT_PADDING: ChartPadding = {
  top: 8,
  right: 12,
  bottom: 24,
  left: 48,
} as const

// ─── Context value ───

export interface ChartContextValue {
  /** Full SVG width (px). */
  width: number
  /** Full SVG height (px). */
  height: number
  /** Usable drawing area width (width − padding left − padding right). */
  chartWidth: number
  /** Usable drawing area height (height − padding top − padding bottom). */
  chartHeight: number
  /** Padding around the drawing area. */
  padding: ChartPadding
  /** X scale: data index → pixel x (relative to drawing area). */
  scaleX: LinearScale
  /** Y scale: data value → pixel y (relative to drawing area). */
  scaleY: LinearScale
  /** The (possibly downsampled) data array used for rendering. */
  data: readonly number[]
  /** Original data length before downsampling. */
  sourceDataLength: number
  /** Ref to the outer SVG element — for mouse listeners. */
  svgRef: React.RefObject<SVGSVGElement | null>
  /** Multiplier for downsampling target (target = chartWidth × factor). Default 0.3. */
  decimationFactor: number
}

export const ChartContext = createContext<ChartContextValue | null>(null)

/**
 * Access chart context. Throws if used outside a `<ChartRoot>`.
 */
export function useChart(): ChartContextValue {
  const ctx = useContext(ChartContext)
  if (!ctx) {
    throw new Error('useChart must be used inside <ChartRoot>')
  }
  return ctx
}
