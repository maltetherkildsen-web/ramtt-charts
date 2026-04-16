// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartSyncProvider — synchronises crosshair + zoom across stacked charts.
 *
 * Zoom is ref-based for 60fps scroll-zoom:
 *   - zoomRef holds the instant truth (updated on every wheel tick)
 *   - zoom (React state) is debounced — updates 150ms after last interaction
 *   - subscribeZoom lets charts react to ref-based updates without re-render
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

export interface ZoomRange {
  start: number
  end: number
}

export type HoverCallback = (index: number | null, sourceId: string, clientY?: number) => void
export type ZoomCallback = (range: ZoomRange) => void

/** Shared brush state for synced overlay rendering (ref-based, zero re-renders). */
export interface BrushState {
  active: boolean
  /** Start fraction (0-1) in the visible range */
  startFrac: number
  /** Current fraction (0-1) in the visible range */
  currentFrac: number
}

export type ZoomMode = 'brush' | 'navigator' | 'none'

export interface ChartSyncContextValue {
  subscribeHover: (cb: HoverCallback) => () => void
  broadcastHover: (index: number | null, sourceId: string, clientY?: number) => void
  zoom: ZoomRange
  /** Set zoom — updates ref instantly + debounces React state (150ms). */
  setZoom: (range: ZoomRange | ((prev: ZoomRange) => ZoomRange)) => void
  /** Instant zoom ref — always current, no re-render. */
  zoomRef: React.RefObject<ZoomRange>
  dataLength: number
  brush: React.RefObject<BrushState>
  zoomMode: ZoomMode
}

const SyncContext = createContext<ChartSyncContextValue | null>(null)

export function useChartSync(): ChartSyncContextValue | null {
  return useContext(SyncContext)
}

export interface ChartSyncProviderProps {
  dataLength: number
  /** Zoom interaction mode. Default: 'brush'. */
  zoomMode?: ZoomMode
  children: ReactNode
}

const DEBOUNCE_MS = 100

export function ChartSyncProvider({ dataLength, zoomMode = 'brush', children }: ChartSyncProviderProps) {
  const hoverSubs = useRef(new Set<HoverCallback>())

  const subscribeHover = useCallback((cb: HoverCallback) => {
    hoverSubs.current.add(cb)
    return () => { hoverSubs.current.delete(cb) }
  }, [])

  const broadcastHover = useCallback((index: number | null, sourceId: string, clientY?: number) => {
    hoverSubs.current.forEach((cb) => cb(index, sourceId, clientY))
  }, [])

  const [zoom, setZoomState] = useState<ZoomRange>({ start: 0, end: dataLength - 1 })
  const zoomRef = useRef<ZoomRange>({ start: 0, end: dataLength - 1 })
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const brush = useRef<BrushState>({ active: false, startFrac: 0, currentFrac: 0 })

  // Wrapped setZoom: updates ref instantly, debounces React state
  const setZoom = useCallback((range: ZoomRange | ((prev: ZoomRange) => ZoomRange)) => {
    const newRange = typeof range === 'function' ? range(zoomRef.current) : range
    zoomRef.current = newRange

    // Debounce the React state update
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      setZoomState(newRange)
    }, DEBOUNCE_MS)
  }, [])

  const ctx = useMemo<ChartSyncContextValue>(
    () => ({
      subscribeHover,
      broadcastHover,
      zoom,
      setZoom,
      zoomRef,
      dataLength,
      brush,
      zoomMode,
    }),
    [subscribeHover, broadcastHover, zoom, setZoom, dataLength, zoomMode],
  )

  return <SyncContext.Provider value={ctx}>{children}</SyncContext.Provider>
}
