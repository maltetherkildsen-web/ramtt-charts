// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useRef, useCallback, useId, type ReactElement } from 'react'
import { cn, TOOLTIP_BG, TOOLTIP_TEXT, TOOLTIP_RADIUS, TOOLTIP_PADDING } from '@/lib/ui'

export interface TooltipProps {
  content: string
  side?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
  children: ReactElement
  className?: string
}

const POSITION_CLASSES = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-1.5',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1.5',
  left: 'right-full top-1/2 -translate-y-1/2 mr-1.5',
  right: 'left-full top-1/2 -translate-y-1/2 ml-1.5',
} as const

const Tooltip = forwardRef<HTMLSpanElement, TooltipProps>(
  ({ content, side = 'top', delay = 300, children, className }, ref) => {
    const [visible, setVisible] = useState(false)
    const timerRef = useRef<ReturnType<typeof setTimeout>>(null)
    const tooltipId = useId()

    const show = useCallback(() => {
      timerRef.current = setTimeout(() => setVisible(true), delay)
    }, [delay])

    const hide = useCallback(() => {
      if (timerRef.current) clearTimeout(timerRef.current)
      setVisible(false)
    }, [])

    return (
      <span
        ref={ref}
        className={cn('relative inline-flex', className)}
        onMouseEnter={show}
        onMouseLeave={hide}
        onFocus={show}
        onBlur={hide}
        aria-describedby={tooltipId}
      >
        {children}

        <div
          id={tooltipId}
          role="tooltip"
          className={cn(
            'absolute z-40 pointer-events-none whitespace-nowrap',
            POSITION_CLASSES[side],
            TOOLTIP_BG,
            TOOLTIP_TEXT,
            TOOLTIP_RADIUS,
            TOOLTIP_PADDING,
            'max-w-[240px]',
            'transition-opacity duration-[120ms]',
            visible ? 'opacity-100' : 'opacity-0',
          )}
          style={{ display: visible ? undefined : 'none' }}
        >
          {content}
        </div>
      </span>
    )
  },
)

Tooltip.displayName = 'Tooltip'
export { Tooltip }
