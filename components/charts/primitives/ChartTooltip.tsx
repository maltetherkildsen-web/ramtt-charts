'use client'

/**
 * ChartTooltip — floating tooltip for stacked charts.
 *
 * Positioning:
 *   - Horizontal: flips left ↔ right at 50% of crosshair X.
 *   - Vertical: always anchored at bottom of power chart
 *     (extends into HR chart area with glassmorphism).
 *   - CSS transition smooths horizontal flip (150ms ease-out).
 *
 * Architecture:
 *   - Renders via createPortal into a container ref (position: relative)
 *   - All updates happen via refs + rAF — zero React re-renders on hover
 *   - Subscribes to ChartSyncProvider for cross-chart hover sync
 */

import { useRef, useEffect, useCallback, useId, type RefObject } from 'react'
import { createPortal } from 'react-dom'
import { bisectNearest } from '@/lib/charts/utils/bisect'
import { useChart } from './chart-context'
import { useChartSync } from './ChartSyncProvider'

// ─── Types ───

export interface TooltipRow {
  label: string
  value: string
  color?: string
  zone?: { label: string; color: string }
}

export interface TooltipData {
  time: string
  rows: TooltipRow[]
}

export interface ChartTooltipProps {
  /** Resolve hover index to tooltip content. */
  resolveData: (index: number) => TooltipData | null
  /** Ref to the container div (position: relative) that holds all charts. */
  containerRef: RefObject<HTMLDivElement | null>
  /** Height of the power chart (first chart) for vertical quadrant logic. */
  powerChartHeight?: number
}

// ─── Constants ───

const TOOLTIP_WIDTH = 170
const GAP = 24 // px gap between crosshair and tooltip edge
const BOTTOM_INSET = 8 // tooltip top = powerChartHeight - this value

// ─── Helpers ───

function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r},${g},${b},${alpha})`
}

// ─── Component ───

export function ChartTooltip({
  resolveData,
  containerRef,
  powerChartHeight = 120,
}: ChartTooltipProps) {
  const { data, scaleX, chartWidth, padding, svgRef } = useChart()
  const sync = useChartSync()
  const instanceId = useId()

  // DOM refs
  const tooltipRef = useRef<HTMLDivElement>(null)
  const timeRef = useRef<HTMLDivElement>(null)
  const rowsRef = useRef<HTMLDivElement>(null)

  // State refs (no React re-renders)
  const rafRef = useRef<number>(0)
  const isVisible = useRef(false)

  // Pre-compute pixel-x for bisect
  const pixelXs = useRef<number[]>([])
  useEffect(() => {
    const xs = new Array(data.length)
    for (let i = 0; i < data.length; i++) {
      xs[i] = scaleX(i)
    }
    pixelXs.current = xs
  }, [data.length, scaleX])

  // ─── DOM helpers ───

  const updateContent = useCallback((tooltipData: TooltipData) => {
    const timeEl = timeRef.current
    const rowsEl = rowsRef.current
    if (!timeEl || !rowsEl) return

    timeEl.textContent = tooltipData.time

    let html = ''
    for (const row of tooltipData.rows) {
      html += '<div class="flex items-center justify-between gap-3">'
      html += `<span class="font-label uppercase" style="font-size:7px;font-weight:600;letter-spacing:.10em;color:#A8A49A">${row.label}</span>`
      html += '<div class="flex items-center gap-1">'
      html += `<span class="font-space tabular-nums" style="font-size:11px;font-weight:500;color:${row.color || '#131211'}">${row.value}</span>`
      if (row.zone) {
        const bg = hexToRgba(row.zone.color, 0.1)
        html += `<span class="font-label uppercase" style="font-size:6px;font-weight:700;letter-spacing:.06em;padding:1px 4px;border-radius:3px;color:${row.zone.color};background:${bg}">${row.zone.label}</span>`
      }
      html += '</div></div>'
    }
    rowsEl.innerHTML = html
  }, [])

  const show = useCallback(() => {
    const el = tooltipRef.current
    if (!el) return
    isVisible.current = true
    el.style.opacity = '1'
  }, [])

  const hide = useCallback(() => {
    const el = tooltipRef.current
    if (!el) return
    isVisible.current = false
    el.style.opacity = '0'
  }, [])

  // ─── Positioning ───

  const positionTooltip = useCallback((dataIdx: number) => {
    const el = tooltipRef.current
    if (!el) return

    // ── Horizontal: left/right flip at 50% ──
    const crosshairX = scaleX(dataIdx)
    const absX = padding.left + crosshairX
    const inLeftHalf = crosshairX < chartWidth / 2

    let left: number
    if (inLeftHalf) {
      left = absX + GAP
    } else {
      left = absX - GAP - TOOLTIP_WIDTH
    }
    left = Math.max(4, left)

    // ── Vertical: anchored at power/HR boundary ──
    const top = powerChartHeight - BOTTOM_INSET

    el.style.top = `${Math.round(top)}px`
    el.style.left = `${Math.round(left)}px`
  }, [scaleX, chartWidth, padding.left, powerChartHeight])

  // ─── Handle hover at index ───

  const handleHoverAtIndex = useCallback((idx: number) => {
    if (idx < 0 || idx >= data.length) { hide(); return }

    const tooltipData = resolveData(idx)
    if (!tooltipData) { hide(); return }

    updateContent(tooltipData)
    positionTooltip(idx)
    show()
  }, [data.length, resolveData, updateContent, positionTooltip, show, hide])

  // ─── Sync subscription ───

  useEffect(() => {
    if (!sync) return
    const unsub = sync.subscribeHover((index, sourceId) => {
      if (sourceId === instanceId) return
      if (index === null) { hide(); return }
      handleHoverAtIndex(index)
    })
    return unsub
  }, [sync, instanceId, handleHoverAtIndex, hide])

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
        if (idx < 0 || idx >= data.length) { hide(); return }
        handleHoverAtIndex(idx)
      })
    }

    const handleLeave = () => {
      cancelAnimationFrame(rafRef.current)
      hide()
    }

    svg.addEventListener('mousemove', handleMove)
    svg.addEventListener('mouseleave', handleLeave)
    return () => {
      cancelAnimationFrame(rafRef.current)
      svg.removeEventListener('mousemove', handleMove)
      svg.removeEventListener('mouseleave', handleLeave)
    }
  }, [data, padding.left, svgRef, hide, handleHoverAtIndex])

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  // ─── Portal into chart container ───

  const container = containerRef.current
  if (!container) return null

  return createPortal(
    <div
      ref={tooltipRef}
      className="pointer-events-none absolute z-50 w-[170px] rounded-[12px] border border-[#E8E5DC]/50"
      style={{
        top: powerChartHeight - BOTTOM_INSET,
        left: 0,
        opacity: 0,
        willChange: 'top, left, opacity',
        transition: 'top 150ms ease-out, left 150ms ease-out, opacity 100ms ease-out',
        background: 'rgba(255, 255, 255, 0.92)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        boxShadow: '0 2px 12px rgba(0,0,0,.05), 0 1px 2px rgba(0,0,0,.02)',
        padding: '10px 14px',
      }}
    >
      <div
        ref={timeRef}
        className="font-space tabular-nums slashed-zero border-b border-[#E8E5DC]/50 pb-1.5 text-[12px] font-semibold text-[#131211]"
      />
      <div
        ref={rowsRef}
        className="flex flex-col gap-1 pt-1.5"
      />
    </div>,
    container,
  )
}
