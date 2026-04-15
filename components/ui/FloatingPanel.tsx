// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useRef, useState, useCallback, useEffect, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, RADIUS, TRANSITION, HOVER_SAND, FOCUS_RING, FLOATING_SHADOW } from '@/lib/ui'

export interface FloatingPanelProps {
  open: boolean
  onClose: () => void
  title: string
  draggable?: boolean
  defaultPosition?: { x: number; y: number }
  width?: number
  maxHeight?: number
  children: ReactNode
  className?: string
}

const FloatingPanel = forwardRef<HTMLDivElement, FloatingPanelProps>(
  function FloatingPanel(
    { open, onClose, title, draggable = true, defaultPosition, width = 520, maxHeight = 500, children, className },
    ref,
  ) {
    const panelRef = useRef<HTMLDivElement | null>(null)
    const [offset, setOffset] = useState({ x: 0, y: 0 })
    const dragState = useRef<{ startX: number; startY: number; origX: number; origY: number } | null>(null)

    // Reset offset when opened
    useEffect(() => {
      if (open) setOffset({ x: 0, y: 0 })
    }, [open])

    const onPointerDown = useCallback((e: React.PointerEvent) => {
      if (!draggable) return
      e.preventDefault()
      dragState.current = { startX: e.clientX, startY: e.clientY, origX: offset.x, origY: offset.y }
      ;(e.target as HTMLElement).setPointerCapture(e.pointerId)
    }, [draggable, offset])

    const onPointerMove = useCallback((e: React.PointerEvent) => {
      if (!dragState.current) return
      const dx = e.clientX - dragState.current.startX
      const dy = e.clientY - dragState.current.startY
      setOffset({ x: dragState.current.origX + dx, y: dragState.current.origY + dy })
    }, [])

    const onPointerUp = useCallback(() => {
      dragState.current = null
    }, [])

    // Close on Escape
    useEffect(() => {
      if (!open) return
      const handler = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose()
      }
      document.addEventListener('keydown', handler)
      return () => document.removeEventListener('keydown', handler)
    }, [open, onClose])

    if (!open) return null

    const posX = (defaultPosition?.x ?? 0) + offset.x
    const posY = (defaultPosition?.y ?? 0) + offset.y

    return (
      <div
        ref={(node) => {
          panelRef.current = node
          if (typeof ref === 'function') ref(node)
          else if (ref) ref.current = node
        }}
        role="dialog"
        aria-label={title}
        className={cn(
          'flex flex-col bg-[var(--n50)]',
          RADIUS.lg,
          className,
        )}
        style={{
          boxShadow: FLOATING_SHADOW,
          width,
          maxHeight,
          transform: `translate(${posX}px, ${posY}px)`,
        }}
      >
        {/* Title bar */}
        <div
          className={cn(
            'flex items-center justify-between shrink-0 px-4',
            'border-b-[0.5px] border-b-[var(--n200)]',
            'select-none',
          )}
          style={{
            height: 44,
            cursor: draggable ? 'grab' : undefined,
          }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          <span className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
            {title}
          </span>
          <button
            aria-label="Close"
            onClick={onClose}
            className={cn(
              'flex items-center justify-center shrink-0',
              'rounded-[5px]',
              TRANSITION.colors,
              FOCUS_RING,
              'text-[var(--n600)]',
              HOVER_SAND,
              'hover:text-[var(--n1150)]',
            )}
            style={{ width: 24, height: 24 }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M4 4L12 12M12 4L4 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ maxHeight: maxHeight - 44 }}>
          {children}
        </div>
      </div>
    )
  }
)

FloatingPanel.displayName = 'FloatingPanel'
export { FloatingPanel }
