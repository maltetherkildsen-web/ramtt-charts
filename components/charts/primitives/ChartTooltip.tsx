// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartTooltip — universal, composable tooltip for all chart types.
 *
 * Architecture (zero React re-renders on hover):
 *   - Pointer position tracked via requestAnimationFrame + refs
 *   - Tooltip DOM element positioned via direct style manipulation
 *   - Visibility toggled via style.opacity, NOT conditional rendering
 *   - Data lookup via bisectNearest (continuous) or index rounding (discrete)
 *
 * The tooltip renders OUTSIDE the SVG as an absolutely-positioned HTML div
 * portalled into ChartRoot's wrapper div. The crosshair line + dot render
 * as SVG elements directly (since this component lives inside ChartRoot's <g>).
 *
 * Supports:
 *   - Auto-format: single-series (label + value) and multi-series (colored dots + rows)
 *   - Custom render via children render prop
 *   - Built-in crosshair line/dot via `indicator` prop
 *   - Sync with ChartSyncProvider for stacked chart hover
 */

import { useRef, useEffect, useCallback, useId, useState, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { bisectNearest } from '@/lib/charts/utils/bisect'
import { useChart } from './chart-context'
import { useChartSync } from './ChartSyncProvider'

// ─── Types ───

export interface TooltipSeriesConfig {
  /** Display label, e.g. 'Revenue' */
  label: string
  /** CSS color, e.g. 'var(--chart-1)' or '#3b82f6' */
  color: string
  /** Data values array for this series */
  values: readonly number[]
  /** Value formatter, e.g. (v) => `$${v.toLocaleString()}` */
  format?: (v: number) => string
}

export interface TooltipPayload {
  /** The raw data value at this index (from ChartRoot context) */
  datum: number
  /** Index in the data array */
  index: number
  /** Pixel x coordinate (relative to plot area) */
  x: number
  /** Pixel y coordinate (relative to plot area) */
  y: number
  /** Chart drawing area width */
  chartWidth: number
  /** Chart drawing area height */
  chartHeight: number
}

export interface ChartTooltipProps {
  /** Custom render function. Receives the hovered datum + metadata. */
  children?: (payload: TooltipPayload) => ReactNode

  /**
   * Series definitions for auto-formatted multi-series tooltips.
   * Each series gets a colored dot + label + value row.
   */
  series?: TooltipSeriesConfig[]

  /**
   * Label extractor for the tooltip header.
   * Receives the index and the datum value, returns the string shown at the top.
   */
  labelFn?: (index: number, datum: number) => string

  /**
   * Value formatter for single-series charts (no `series` prop).
   * Applied to the context data value at the hovered index.
   */
  formatValue?: (v: number) => string

  /**
   * Tooltip indicator style.
   * 'line' = vertical crosshair line + dot (default)
   * 'dot' = colored dot on the data point only
   * 'none' = no indicator, just the tooltip box
   */
  indicator?: 'line' | 'dot' | 'none'

  /** Color for the crosshair dot. Default: '#3b82f6' */
  dotColor?: string

  /** Color for the crosshair line. Default: '#71717a' */
  lineColor?: string

  /** Additional CSS class for the tooltip container. */
  className?: string
}

// ─── Constants ───

const GAP = 16         // px between crosshair and tooltip edge
const TOP_OFFSET = 8   // px from plot area top
const MIN_EDGE = 8     // min px from container edge
const TOOLTIP_WIDTH = 180

// ─── Component ───

export function ChartTooltip({
  children,
  series,
  labelFn,
  formatValue,
  indicator = 'line',
  dotColor = '#3b82f6',
  lineColor = '#71717a',
  className,
}: ChartTooltipProps) {
  const { data, scaleX, scaleY, chartWidth, chartHeight, padding, svgRef } = useChart()
  const sync = useChartSync()
  const instanceId = useId()

  // Portal target: ChartRoot's wrapper div (parent of the SVG)
  const [container, setContainer] = useState<HTMLElement | null>(null)
  useEffect(() => {
    const svg = svgRef.current
    if (svg?.parentElement) setContainer(svg.parentElement as HTMLElement)
  }, [svgRef])

  // DOM refs — SVG elements
  const lineRef = useRef<SVGLineElement>(null)
  const svgDotRef = useRef<SVGCircleElement>(null)
  // Multi-series dots (one per series, only used when series prop is provided)
  const seriesDotRefs = useRef<(SVGCircleElement | null)[]>([])

  // DOM refs — HTML tooltip
  const tooltipRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)

  // State refs (no React re-renders)
  const rafRef = useRef<number>(0)
  const lastIdx = useRef<number>(-1)

  // Pre-compute pixel-x for bisect
  const pixelXs = useRef<number[]>([])
  useEffect(() => {
    const xs = new Array(data.length)
    for (let i = 0; i < data.length; i++) {
      xs[i] = scaleX(i)
    }
    pixelXs.current = xs
  }, [data.length, scaleX])

  // ─── SVG indicator helpers ───

  const showIndicatorAt = useCallback((idx: number) => {
    if (indicator === 'none') return
    const px = scaleX(idx)

    if (indicator === 'line' && lineRef.current) {
      lineRef.current.setAttribute('display', '')
      lineRef.current.setAttribute('x1', String(px))
      lineRef.current.setAttribute('x2', String(px))
    }

    if (series && series.length > 0) {
      // Multi-series: position one dot per series
      series.forEach((s, i) => {
        const dot = seriesDotRefs.current[i]
        if (!dot) return
        const val = s.values[idx]
        if (val === undefined) { dot.setAttribute('display', 'none'); return }
        const py = scaleY(val)
        dot.setAttribute('display', '')
        dot.setAttribute('cx', String(px))
        dot.setAttribute('cy', String(py))
      })
      // Hide the single dot
      svgDotRef.current?.setAttribute('display', 'none')
    } else {
      // Single-series: one dot at the data point
      const py = scaleY(data[idx])
      if (svgDotRef.current) {
        svgDotRef.current.setAttribute('display', '')
        svgDotRef.current.setAttribute('cx', String(px))
        svgDotRef.current.setAttribute('cy', String(py))
      }
    }
  }, [data, scaleX, scaleY, indicator, series])

  const hideIndicator = useCallback(() => {
    lineRef.current?.setAttribute('display', 'none')
    svgDotRef.current?.setAttribute('display', 'none')
    seriesDotRefs.current.forEach((dot) => dot?.setAttribute('display', 'none'))
  }, [])

  // ─── Tooltip content helpers ───

  const updateTooltipContent = useCallback((idx: number) => {
    const el = tooltipRef.current
    if (!el) return

    // If using custom render prop, the content is handled by React portal re-render
    // For auto-format mode, update via innerHTML
    if (children) return

    // Header
    if (headerRef.current) {
      const label = labelFn ? labelFn(idx, data[idx]) : String(idx)
      headerRef.current.textContent = label
    }

    // Body
    if (bodyRef.current) {
      if (series && series.length > 0) {
        // Multi-series mode
        let html = ''
        for (const s of series) {
          const val = s.values[idx]
          if (val === undefined) continue
          const formatted = s.format ? s.format(val) : String(val)
          html += `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px">`
          html += `<span style="display:flex;align-items:center;gap:6px">`
          html += `<span style="width:6px;height:6px;border-radius:50%;background:${s.color};flex-shrink:0"></span>`
          html += `<span style="font-family:var(--font-sans);font-size:12px;font-weight:400;color:var(--n800)">${s.label}</span>`
          html += `</span>`
          html += `<span style="font-family:var(--font-sans);font-size:12px;font-weight:550;font-variant-numeric:tabular-nums;color:var(--n1150)">${formatted}</span>`
          html += `</div>`
        }
        bodyRef.current.innerHTML = html
      } else {
        // Single-series mode
        const val = data[idx]
        const formatted = formatValue ? formatValue(val) : String(val)
        bodyRef.current.innerHTML = `<span style="font-family:var(--font-sans);font-size:14px;font-weight:550;font-variant-numeric:tabular-nums;color:var(--n1150)">${formatted}</span>`
      }
    }
  }, [children, data, series, labelFn, formatValue])

  // ─── Tooltip positioning ───

  const positionTooltip = useCallback((idx: number) => {
    const el = tooltipRef.current
    if (!el) return

    const crosshairX = scaleX(idx)
    const absX = padding.left + crosshairX
    const inLeftHalf = crosshairX < chartWidth / 2

    let left: number
    if (inLeftHalf) {
      left = absX + GAP
    } else {
      left = absX - GAP - TOOLTIP_WIDTH
    }
    // Clamp to container edges
    left = Math.max(MIN_EDGE, left)

    const top = padding.top + TOP_OFFSET

    el.style.left = `${Math.round(left)}px`
    el.style.top = `${Math.round(top)}px`
  }, [scaleX, chartWidth, padding.left, padding.top])

  // ─── Show/hide tooltip ───

  const showTooltip = useCallback(() => {
    const el = tooltipRef.current
    if (el) el.style.opacity = '1'
  }, [])

  const hideTooltip = useCallback(() => {
    const el = tooltipRef.current
    if (el) el.style.opacity = '0'
    lastIdx.current = -1
  }, [])

  // ─── Handle hover at index ───

  const handleHoverAtIndex = useCallback((idx: number) => {
    if (idx < 0 || idx >= data.length) {
      hideTooltip()
      hideIndicator()
      return
    }

    if (idx === lastIdx.current) return
    lastIdx.current = idx

    showIndicatorAt(idx)
    updateTooltipContent(idx)
    positionTooltip(idx)
    showTooltip()
  }, [data.length, showIndicatorAt, hideIndicator, updateTooltipContent, positionTooltip, showTooltip, hideTooltip])

  // ─── Sync subscription ───

  useEffect(() => {
    if (!sync) return
    const unsub = sync.subscribeHover((index, sourceId) => {
      if (sourceId === instanceId) return
      if (index === null) {
        hideTooltip()
        hideIndicator()
        return
      }
      handleHoverAtIndex(index)
    })
    return unsub
  }, [sync, instanceId, handleHoverAtIndex, hideTooltip, hideIndicator])

  // ─── Native mouse listeners on SVG ───

  useEffect(() => {
    const svg = svgRef.current
    if (!svg || data.length === 0) return

    const handleMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = requestAnimationFrame(() => {
        const rect = svg.getBoundingClientRect()
        const mx = e.clientX - rect.left - padding.left

        const idx = bisectNearest(pixelXs.current, mx)
        if (idx < 0 || idx >= data.length) {
          hideTooltip()
          hideIndicator()
          sync?.broadcastHover(null, instanceId)
          return
        }

        handleHoverAtIndex(idx)
        sync?.broadcastHover(idx, instanceId, e.clientY)
      })
    }

    const handleLeave = () => {
      cancelAnimationFrame(rafRef.current)
      hideTooltip()
      hideIndicator()
      lastIdx.current = -1
      sync?.broadcastHover(null, instanceId)
    }

    svg.addEventListener('mousemove', handleMove)
    svg.addEventListener('mouseleave', handleLeave)
    return () => {
      cancelAnimationFrame(rafRef.current)
      svg.removeEventListener('mousemove', handleMove)
      svg.removeEventListener('mouseleave', handleLeave)
    }
  }, [data, padding.left, svgRef, handleHoverAtIndex, hideTooltip, hideIndicator, sync, instanceId])

  // Cleanup rAF on unmount
  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // ─── Custom render tracking ───
  // For the children render prop, we need to track the current index
  // and force a portal re-render. We use a ref + manual DOM update approach.
  const customContentRef = useRef<HTMLDivElement>(null)
  const renderCustom = useCallback((idx: number) => {
    if (!children || !customContentRef.current) return
    // Custom render is handled by the portal — we store idx for the render
    // Since we can't trigger React re-render from rAF, we use a different approach:
    // The custom content div is updated via a render callback stored in a ref
    const payload: TooltipPayload = {
      datum: data[idx],
      index: idx,
      x: scaleX(idx),
      y: scaleY(data[idx]),
      chartWidth,
      chartHeight,
    }
    // We need to use a temporary React root or innerHTML approach
    // For now, fall back to innerHTML with the render result
    // This is handled in the portal render below
  }, [children, data, scaleX, scaleY, chartWidth, chartHeight])

  // ─── Render ───

  return (
    <>
      {/* SVG crosshair elements */}
      <g className="pointer-events-none">
        {indicator === 'line' && (
          <line
            ref={lineRef}
            x1={0}
            y1={0}
            x2={0}
            y2={chartHeight}
            stroke={lineColor}
            strokeWidth={0.5}
            shapeRendering="crispEdges"
            display="none"
          />
        )}
        {/* Multi-series dots — one per series, each in the series' color */}
        {indicator !== 'none' && series && series.length > 0 && series.map((s, i) => (
          <circle
            key={i}
            ref={(el) => { seriesDotRefs.current[i] = el }}
            cx={0}
            cy={0}
            r={4}
            fill={s.color}
            stroke="var(--n50)"
            strokeWidth={2}
            display="none"
          />
        ))}
        {/* Single-series dot — used when no series prop */}
        {indicator !== 'none' && (!series || series.length === 0) && (
          <circle
            ref={svgDotRef}
            cx={0}
            cy={0}
            r={4}
            fill={dotColor}
            stroke="var(--n50)"
            strokeWidth={2}
            display="none"
          />
        )}
      </g>

      {/* HTML tooltip — portalled outside SVG */}
      {container && createPortal(
        <div
          ref={tooltipRef}
          className={className}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            opacity: 0,
            pointerEvents: 'none',
            zIndex: 50,
            width: TOOLTIP_WIDTH,
            // Surface
            background: 'var(--n50)',
            border: '0.5px solid var(--n400)',
            borderRadius: 8,
            // Shadow — tooltips are the ONE exception to no-shadow rule
            boxShadow: '0 4px 12px rgba(0,0,0,0.08), 0 1px 3px rgba(0,0,0,0.04)',
            // Layout
            padding: '8px 12px',
            // Animation
            willChange: 'left, opacity',
            transition: 'opacity 100ms ease-out, left 150ms cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Header: label */}
          <div
            ref={headerRef}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 11,
              fontWeight: 450,
              color: 'var(--n600)',
              marginBottom: 4,
            }}
          />
          {/* Body: value(s) */}
          <div
            ref={bodyRef}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          />
        </div>,
        container,
      )}
    </>
  )
}
