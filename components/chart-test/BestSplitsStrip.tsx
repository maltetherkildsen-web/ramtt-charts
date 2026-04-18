// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * BestSplitsStrip — chart-test page only.
 *
 * Running mirror of PeakPowersStrip: shows fastest splits (400m / 1km /
 * 1mi / 5k / 10k / HM / M) and zooms the chart to that window on click.
 */

import { useCallback } from 'react'
import { cn, WEIGHT, TRANSITION, FOCUS_RING, ACTIVE_SAND } from '@/lib/ui'
import { useChartSync } from '@/components/charts/primitives/ChartSyncProvider'
import type { SplitResult } from '@/lib/charts/utils/splits'

export interface BestSplitsStripProps {
  splits: SplitResult[]
  activeSplit: SplitResult | null
  onActiveSplitChange: (s: SplitResult | null) => void
  totalPoints: number
}

function formatSplitTime(totalSeconds: number): string {
  const t = Math.round(totalSeconds)
  if (t >= 3600) {
    const h = Math.floor(t / 3600)
    const m = Math.floor((t % 3600) / 60)
    const s = t % 60
    return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }
  const m = Math.floor(t / 60)
  const s = t % 60
  return `${m}:${s.toString().padStart(2, '0')}`
}

function formatPaceCompact(secPerKm: number): string {
  if (!Number.isFinite(secPerKm) || secPerKm <= 0) return '—'
  const m = Math.floor(secPerKm / 60)
  const s = Math.round(secPerKm % 60)
  return `${m}:${s.toString().padStart(2, '0')}/km`
}

export function BestSplitsStrip({
  splits, activeSplit, onActiveSplitChange, totalPoints,
}: BestSplitsStripProps) {
  const sync = useChartSync()

  const handleClick = useCallback((split: SplitResult) => {
    if (!sync) return
    if (activeSplit && activeSplit.label === split.label) {
      onActiveSplitChange(null)
      sync.setZoom({ start: 0, end: totalPoints - 1 })
      return
    }
    // Same sqrt padding heuristic as PeakPowersStrip — generous for short
    // efforts, tight for long. Time-domain padding since splits live on
    // distance but indices are time-aligned.
    const pad = Math.max(5, Math.round(Math.sqrt(split.timeSec) * 2))
    const zoomStart = Math.max(0, split.startIdx - pad)
    const zoomEnd = Math.min(totalPoints - 1, split.endIdx + pad)
    sync.setZoom({ start: zoomStart, end: zoomEnd })
    onActiveSplitChange(split)
  }, [sync, activeSplit, onActiveSplitChange, totalPoints])

  return (
    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 pb-1">
      <span className={cn("text-[11px] text-(--n600)", WEIGHT.strong)}>Best splits</span>
      {splits.length === 0 && (
        <span className={cn("text-[11px] text-(--n600)", WEIGHT.book)}>—</span>
      )}
      {splits.map((split, i) => (
        <button
          key={split.label}
          onClick={() => handleClick(split)}
          className={cn(
            "flex items-baseline gap-1 rounded-[3px] px-1 py-0.5",
            TRANSITION.colors, FOCUS_RING,
            activeSplit?.label === split.label
              ? cn(ACTIVE_SAND, "text-(--n1150)")
              : "hover:bg-(--n200)",
          )}
        >
          <span className={cn("text-[11px] text-(--n600)", WEIGHT.book)}>{split.label}</span>
          <span className={cn("text-[11px] tabular-nums text-(--n1150)", WEIGHT.strong)}>{formatSplitTime(split.timeSec)}</span>
          <span className={cn("text-[10px] tabular-nums text-(--n600)", WEIGHT.book)}>{formatPaceCompact(split.pacePerKm)}</span>
          {i < splits.length - 1 && (
            <span className="ml-1 text-[11px] text-(--n600)">·</span>
          )}
        </button>
      ))}
    </div>
  )
}
