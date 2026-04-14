// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartToolbar — composed toolbar for chart interaction controls.
 *
 * Sits above a chart and provides: period tabs, chart type toggle,
 * capture, fullscreen, and an extensible actions slot.
 *
 * Uses @ramtt/ui primitives (ToggleGroup, Button) for rendering.
 */

import { useCallback, useRef, type ReactNode } from 'react'
import { ToggleGroup } from '@/components/ui/ToggleGroup'
import { captureChart } from '@/lib/charts/utils/capture'

// ─── Types ───

export interface ChartToolbarProps {
  /** Period options. Default: ['1D','5D','1M','6M','YTD','1Y','5Y','MAX'] */
  periods?: string[]
  period?: string
  onPeriodChange?: (period: string) => void

  /** Chart type toggle. Values like 'line', 'candle'. */
  chartTypes?: string[]
  chartType?: string
  onChartTypeChange?: (type: string) => void

  /** SMA window sizes. Pass array to enable SMA toggle. */
  smaOptions?: number[]
  smaWindow?: number | null
  onSmaChange?: (window: number | null) => void

  /** Ref to the chart SVG for capture */
  svgRef?: React.RefObject<SVGSVGElement | null>
  captureFilename?: string

  /** Enable fullscreen toggle */
  fullscreenRef?: React.RefObject<HTMLElement | null>

  /** Additional actions (right side) */
  actions?: ReactNode

  className?: string
}

// ─── Icons (inline SVG, 16x16) ───

function LineChartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 12L6 6L10 9L14 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CandlestickIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <line x1="5" y1="2" x2="5" y2="14" stroke="currentColor" strokeWidth="1" />
      <rect x="3" y="5" width="4" height="5" rx="0.5" fill="currentColor" opacity="0.7" />
      <line x1="11" y1="3" x2="11" y2="13" stroke="currentColor" strokeWidth="1" />
      <rect x="9" y="6" width="4" height="4" rx="0.5" fill="currentColor" opacity="0.7" />
    </svg>
  )
}

function CameraIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="1" y="4" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="8" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M5.5 4V3.5C5.5 2.95 5.95 2.5 6.5 2.5H9.5C10.05 2.5 10.5 2.95 10.5 3.5V4" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  )
}

function ExpandIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M2 6V2H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 6V2H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 10V14H6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 10V14H10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ─── Toolbar Button ───

function ToolbarButton({
  onClick,
  title,
  children,
}: {
  onClick: () => void
  title: string
  children: ReactNode
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="flex h-7 w-7 items-center justify-center rounded-[5px] text-[var(--n600)] transition-colors duration-150 hover:bg-[var(--n200)] hover:text-[var(--n1150)]"
    >
      {children}
    </button>
  )
}

// ─── Component ───

export function ChartToolbar({
  periods = ['1D', '5D', '1M', '6M', 'YTD', '1Y', '5Y', 'MAX'],
  period = '1Y',
  onPeriodChange,
  chartTypes,
  chartType,
  onChartTypeChange,
  smaOptions,
  smaWindow,
  onSmaChange,
  svgRef,
  captureFilename = 'chart',
  fullscreenRef,
  actions,
  className,
}: ChartToolbarProps) {
  // ─── Capture handler ───
  const handleCapture = useCallback(() => {
    const svg = svgRef?.current
    if (!svg) return
    captureChart(svg, { filename: captureFilename })
  }, [svgRef, captureFilename])

  // ─── Fullscreen handler ───
  const handleFullscreen = useCallback(() => {
    const el = fullscreenRef?.current
    if (!el) return
    if (document.fullscreenElement) {
      document.exitFullscreen()
    } else {
      el.requestFullscreen()
    }
  }, [fullscreenRef])

  return (
    <div className={`mb-3 flex items-center gap-3 ${className ?? ''}`}>
      {/* Left: Period tabs */}
      {onPeriodChange && (
        <ToggleGroup
          options={periods}
          value={period}
          onChange={(v) => onPeriodChange(v as string)}
          size="sm"
          variant="pill"
        />
      )}

      {/* Middle: Chart type toggle */}
      {chartTypes && onChartTypeChange && chartType && (
        <div className="flex items-center gap-0.5 rounded-[5px] border-[0.5px] border-[var(--n400)] bg-[var(--n50)] p-0.5">
          {chartTypes.map((t) => {
            const isActive = t === chartType
            return (
              <button
                key={t}
                onClick={() => onChartTypeChange(t)}
                className={`flex h-6 w-7 items-center justify-center rounded-[4px] transition-colors duration-150 ${
                  isActive ? 'bg-[var(--n1150)] text-[var(--n50)]' : 'text-[var(--n600)] hover:bg-[var(--n200)]'
                }`}
                title={t === 'line' ? 'Line chart' : t === 'candle' ? 'Candlestick' : t}
              >
                {t === 'line' ? <LineChartIcon /> : t === 'candle' ? <CandlestickIcon /> : <span className="text-[10px]">{t}</span>}
              </button>
            )
          })}
        </div>
      )}

      {/* SMA toggle */}
      {smaOptions && onSmaChange && (
        <ToggleGroup
          options={[
            { value: 'off', label: 'SMA' },
            ...smaOptions.map((w) => ({ value: String(w), label: String(w) })),
          ]}
          value={smaWindow ? String(smaWindow) : 'off'}
          onChange={(v) => onSmaChange(v === 'off' ? null : Number(v))}
          size="sm"
          variant="pill"
        />
      )}

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right: Action buttons */}
      <div className="flex items-center gap-1">
        {actions}

        {svgRef && (
          <ToolbarButton onClick={handleCapture} title="Download as PNG">
            <CameraIcon />
          </ToolbarButton>
        )}

        {fullscreenRef && (
          <ToolbarButton onClick={handleFullscreen} title="Toggle fullscreen">
            <ExpandIcon />
          </ToolbarButton>
        )}
      </div>
    </div>
  )
}
