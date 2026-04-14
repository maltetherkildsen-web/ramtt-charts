// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartWithSubChart — compound component for main + companion chart layout.
 *
 * Two vertically stacked ChartRoot instances sharing the same X domain
 * and synced crosshair. Common pattern: price chart + volume bars,
 * power chart + kJ/min sub-chart.
 *
 * Usage:
 *   <ChartWithSubChart
 *     mainHeight={250}
 *     subHeight={60}
 *     data={data}
 *   >
 *     <ChartWithSubChart.Main>
 *       <ChartLine />
 *       <ChartGrid />
 *     </ChartWithSubChart.Main>
 *
 *     <ChartWithSubChart.Sub subData={volumeData}>
 *       <ChartBar />
 *     </ChartWithSubChart.Sub>
 *   </ChartWithSubChart>
 */

import { createContext, useContext, type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { ChartRoot } from './ChartRoot'
import { ChartSyncProvider, type ZoomMode } from './ChartSyncProvider'

// ─── Internal context for compound children ───

interface SubChartContextValue {
  mainHeight: number
  subHeight: number
  data: readonly number[]
  gap: number
}

const SubChartContext = createContext<SubChartContextValue | null>(null)

// ─── Props ───

export interface ChartWithSubChartProps {
  /** Height of the main chart in px. */
  mainHeight: number
  /** Height of the sub chart in px. */
  subHeight: number
  /** Gap between main and sub in px. Default 4. */
  gap?: number
  /** Primary data array (shared X domain). */
  data: readonly number[]
  /** Zoom mode for the synced pair. Default: 'brush'. */
  zoomMode?: ZoomMode
  children: ReactNode
  className?: string
}

// ─── Main sub-component ───

interface MainProps {
  /** Override data for the main chart. Defaults to parent data. */
  data?: readonly number[]
  /** Override Y domain. */
  yDomain?: readonly [number, number]
  children: ReactNode
}

function Main({ data: dataProp, yDomain, children }: MainProps) {
  const ctx = useContext(SubChartContext)
  if (!ctx) throw new Error('ChartWithSubChart.Main must be inside ChartWithSubChart')

  const chartData = dataProp ?? ctx.data

  return (
    <ChartRoot
      data={chartData}
      height={ctx.mainHeight}
      yDomain={yDomain}
      padding={{ right: 12, bottom: 4 }}
    >
      {children}
    </ChartRoot>
  )
}

// ─── Sub sub-component ───

interface SubProps {
  /** Data for the sub chart. Defaults to parent data. */
  subData?: readonly number[]
  /** Override Y domain. */
  yDomain?: readonly [number, number]
  children: ReactNode
}

function Sub({ subData, yDomain, children }: SubProps) {
  const ctx = useContext(SubChartContext)
  if (!ctx) throw new Error('ChartWithSubChart.Sub must be inside ChartWithSubChart')

  const chartData = subData ?? ctx.data

  return (
    <div style={{ marginTop: ctx.gap }}>
      <ChartRoot
        data={chartData}
        height={ctx.subHeight}
        yDomain={yDomain}
        padding={{ right: 12, bottom: 4, top: 4 }}
      >
        {children}
      </ChartRoot>
    </div>
  )
}

// ─── Compound component ───

export function ChartWithSubChart({
  mainHeight,
  subHeight,
  gap = 4,
  data,
  zoomMode = 'brush',
  children,
  className,
}: ChartWithSubChartProps) {
  const ctxValue: SubChartContextValue = { mainHeight, subHeight, data, gap }

  return (
    <SubChartContext.Provider value={ctxValue}>
      <ChartSyncProvider dataLength={data.length} zoomMode={zoomMode}>
        <div className={cn('relative', className)}>
          {children}
        </div>
      </ChartSyncProvider>
    </SubChartContext.Provider>
  )
}

// Attach sub-components
ChartWithSubChart.Main = Main
ChartWithSubChart.Sub = Sub
