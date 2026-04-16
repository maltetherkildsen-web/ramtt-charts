// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState, useRef, useEffect, type ReactNode } from 'react'
import { cn } from '@/lib/ui'

// ─── Types ───

export interface AnimatedPanelProps {
  /** Controls whether the panel is expanded or collapsed. */
  isOpen: boolean
  children: ReactNode
  className?: string
  /** Transition duration in ms. Default: 200. */
  duration?: number
  /** Unmount children when closed. Default: true.
   *  When true, children are removed from the DOM after the collapse
   *  animation completes — important for heavy content like charts
   *  with 10,000+ SVG elements. */
  unmountOnClose?: boolean
}

// ─── Component ───

export const AnimatedPanel = forwardRef<HTMLDivElement, AnimatedPanelProps>(
  ({ isOpen, children, className, duration = 200, unmountOnClose = true }, ref) => {
    // Track whether the panel has ever been open. Needed when unmountOnClose=false
    // so children stay mounted across close→open cycles without re-creating.
    const [hasBeenOpen, setHasBeenOpen] = useState(isOpen)
    const prevIsOpenRef = useRef(isOpen)
    const innerRef = useRef<HTMLDivElement>(null)
    // Track whether children should be in the DOM for unmountOnClose=true.
    // Only flips on actual open/close transitions, never on unrelated re-renders.
    const [shouldRender, setShouldRender] = useState(isOpen)

    useEffect(() => {
      // Bail out if isOpen didn't actually change. Prevents re-animation when
      // parent re-renders for unrelated reasons (e.g. zoom/pan sync).
      if (prevIsOpenRef.current === isOpen) return
      prevIsOpenRef.current = isOpen

      if (isOpen) {
        setHasBeenOpen(true)
        setShouldRender(true)
      }
    }, [isOpen])

    const handleTransitionEnd = (e: React.TransitionEvent) => {
      if (e.target !== innerRef.current) return
      if (!isOpen && unmountOnClose) {
        setShouldRender(false)
      }
    }

    const showContent = unmountOnClose ? shouldRender : (isOpen || hasBeenOpen)

    return (
      <div
        ref={ref}
        className={cn('grid overflow-hidden transition-[grid-template-rows,opacity]', className)}
        style={{
          gridTemplateRows: isOpen ? '1fr' : '0fr',
          opacity: isOpen ? 1 : 0,
          transitionDuration: `${duration}ms`,
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div
          ref={innerRef}
          className="overflow-hidden"
          onTransitionEnd={handleTransitionEnd}
        >
          {showContent && children}
        </div>
      </div>
    )
  },
)

AnimatedPanel.displayName = 'AnimatedPanel'
