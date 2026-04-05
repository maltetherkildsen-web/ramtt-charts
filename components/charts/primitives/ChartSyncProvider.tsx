'use client'

/**
 * ChartSyncProvider — synchronises crosshair + zoom across stacked charts.
 *
 * Architecture:
 *   Hover sync: pure pub/sub via refs — zero React re-renders.
 *   Zoom sync:  React state — re-renders are expected when zoom changes.
 *
 * Hover flow:
 *   Chart A mousemove → broadcast(index, 'chart-a')
 *     → every subscribed ChartCrosshair (incl. B, C, D, E)
 *       receives index → maps to own scaleX/scaleY → setAttribute()
 *
 * Zoom flow:
 *   Chart A wheel → setZoom(newRange) → React re-render →
 *     all ChartRoots receive new visibleRange → new scales
 */

import {
  createContext,
  useContext,
  useRef,
  useState,
  useMemo,
  useCallback,
  type ReactNode,
} from 'react'

// ─── Types ───

export interface ZoomRange {
  /** Start index (inclusive) in the full data array. */
  start: number
  /** End index (inclusive) in the full data array. */
  end: number
}

/** Callback for hover sync — receives data index or null (mouse left). */
export type HoverCallback = (index: number | null, sourceId: string, clientY?: number) => void

/** Callback for zoom sync. */
export type ZoomCallback = (range: ZoomRange) => void

export interface ChartSyncContextValue {
  // ─── Hover (ref-based, zero re-renders) ───
  /** Subscribe to hover broadcasts. Returns unsubscribe function. */
  subscribeHover: (cb: HoverCallback) => () => void
  /** Broadcast a hover index to all subscribers. clientY is viewport Y for tooltip positioning. */
  broadcastHover: (index: number | null, sourceId: string, clientY?: number) => void

  // ─── Zoom (state-based, triggers re-render) ───
  /** Current visible range. */
  zoom: ZoomRange
  /** Update visible range. */
  setZoom: (range: ZoomRange | ((prev: ZoomRange) => ZoomRange)) => void
  /** Total data length (set by the page, needed for zoom bounds). */
  dataLength: number
}

const SyncContext = createContext<ChartSyncContextValue | null>(null)

/**
 * Access sync context. Returns null if not inside a provider
 * (allows ChartCrosshair to work standalone too).
 */
export function useChartSync(): ChartSyncContextValue | null {
  return useContext(SyncContext)
}

// ─── Provider ───

export interface ChartSyncProviderProps {
  /** Total number of data points across all synced charts. */
  dataLength: number
  children: ReactNode
}

export function ChartSyncProvider({ dataLength, children }: ChartSyncProviderProps) {
  // ─── Hover pub/sub (ref-based) ───
  const hoverSubs = useRef(new Set<HoverCallback>())

  const subscribeHover = useCallback((cb: HoverCallback) => {
    hoverSubs.current.add(cb)
    return () => { hoverSubs.current.delete(cb) }
  }, [])

  const broadcastHover = useCallback((index: number | null, sourceId: string, clientY?: number) => {
    hoverSubs.current.forEach((cb) => cb(index, sourceId, clientY))
  }, [])

  // ─── Zoom (state-based) ───
  const [zoom, setZoom] = useState<ZoomRange>({ start: 0, end: dataLength - 1 })

  // ─── Stable context value ───
  const ctx = useMemo<ChartSyncContextValue>(
    () => ({
      subscribeHover,
      broadcastHover,
      zoom,
      setZoom,
      dataLength,
    }),
    [subscribeHover, broadcastHover, zoom, dataLength],
  )

  return <SyncContext.Provider value={ctx}>{children}</SyncContext.Provider>
}
