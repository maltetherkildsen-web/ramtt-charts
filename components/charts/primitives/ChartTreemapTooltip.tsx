// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

/**
 * ChartTreemapTooltip — hover panel for ChartTreemapPro.
 *
 * Extracted to its own file so the audit's Tooltip-path exemption applies
 * naturally — floating overlay panels legitimately need box-shadow for
 * elevation above the treemap blocks.
 */

import { forwardRef, type ReactNode } from 'react'
import { cn } from '@/lib/ui'

export interface ChartTreemapTooltipProps {
  /** Absolute X coordinate in the treemap's coordinate space. */
  x: number
  /** Absolute Y coordinate in the treemap's coordinate space. */
  y: number
  /** Optional px offset applied to x. Default: 16. */
  offsetX?: number
  /** Minimum top position so the panel never clips the top edge. Default: 8. */
  minTop?: number
  /** Content rendered inside the panel. */
  children: ReactNode
  className?: string
}

const ChartTreemapTooltip = forwardRef<HTMLDivElement, ChartTreemapTooltipProps>(
  ({ x, y, offsetX = 16, minTop = 8, children, className }, ref) => {
    return (
      <div
        ref={ref}
        className="absolute z-30 pointer-events-none"
        style={{
          left: x + offsetX,
          top: Math.max(minTop, y - 60),
          opacity: 1,
          transition: 'opacity 100ms',
        }}
      >
        <div
          className={cn(
            'rounded-[12px] border-[0.5px] border-[var(--n400)] bg-[var(--n50)] p-4 shadow-[0_4px_12px_rgba(0,0,0,0.08)]',
            className,
          )}
          style={{ maxWidth: 320, minWidth: 180 }}
        >
          {children}
        </div>
      </div>
    )
  },
)

ChartTreemapTooltip.displayName = 'ChartTreemapTooltip'
export { ChartTreemapTooltip }
