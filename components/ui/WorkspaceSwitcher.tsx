// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useRef, useCallback, type ReactNode } from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  RADIUS,
  TRANSITION,
  HOVER_SAND,
  ACTIVE_SAND,
  FOCUS_RING,
  WORKSPACE_SWITCHER_HEIGHT,
} from '@/lib/ui'

// ─── Types ───

export interface WorkspaceSwitcherItem {
  id: string
  label: string
  icon: ReactNode
}

export interface WorkspaceSwitcherProps {
  items: WorkspaceSwitcherItem[]
  activeId: string
  onSwitch: (id: string) => void
  variant?: 'compact' | 'expanded'
  className?: string
}

// ─── Icon wrapper size ───
const ICON_SIZE = 18

// ─── Component ───

const WorkspaceSwitcher = forwardRef<HTMLDivElement, WorkspaceSwitcherProps>(
  function WorkspaceSwitcher(
    { items, activeId, onSwitch, variant = 'compact', className },
    ref,
  ) {
    const itemRefs = useRef<(HTMLButtonElement | null)[]>([])

    const handleKeyDown = useCallback(
      (e: React.KeyboardEvent, currentIndex: number) => {
        let nextIndex = currentIndex
        switch (e.key) {
          case 'ArrowRight':
            e.preventDefault()
            nextIndex = (currentIndex + 1) % items.length
            break
          case 'ArrowLeft':
            e.preventDefault()
            nextIndex = (currentIndex - 1 + items.length) % items.length
            break
          case 'Home':
            e.preventDefault()
            nextIndex = 0
            break
          case 'End':
            e.preventDefault()
            nextIndex = items.length - 1
            break
          default:
            return
        }
        itemRefs.current[nextIndex]?.focus()
        onSwitch(items[nextIndex].id)
      },
      [items, onSwitch],
    )

    const activeIndex = items.findIndex((item) => item.id === activeId)
    const focusableIndex = activeIndex >= 0 ? activeIndex : 0

    return (
      <div
        ref={ref}
        role="tablist"
        aria-label="Workspace"
        className={cn('flex gap-0.5', className)}
        style={{ '--ws-height': `${WORKSPACE_SWITCHER_HEIGHT}px` } as React.CSSProperties}
      >
        {items.map((item, i) => {
          const isActive = item.id === activeId
          const showLabel = variant === 'expanded' || isActive

          return (
            <button
              key={item.id}
              ref={(el) => { itemRefs.current[i] = el }}
              role="tab"
              aria-selected={isActive}
              tabIndex={i === focusableIndex ? 0 : -1}
              onClick={() => onSwitch(item.id)}
              onKeyDown={(e) => handleKeyDown(e, i)}
              className={cn(
                'inline-flex items-center justify-center gap-1.5 cursor-default',
                FONT.body,
                'text-[12px]',
                RADIUS.md,
                TRANSITION.background,
                FOCUS_RING,
                'h-[var(--ws-height)]',
                showLabel ? 'px-3' : 'px-2.5',
                isActive
                  ? cn(WEIGHT.strong, 'text-[var(--n1150)]', ACTIVE_SAND)
                  : cn(WEIGHT.book, 'text-[var(--n800)]', HOVER_SAND),
              )}
            >
              {/* Icon */}
              <span
                className="shrink-0 flex items-center justify-center"
                style={{ width: ICON_SIZE, height: ICON_SIZE }}
              >
                {item.icon}
              </span>

              {/* Label */}
              {showLabel && <span>{item.label}</span>}
            </button>
          )
        })}
      </div>
    )
  },
)

WorkspaceSwitcher.displayName = 'WorkspaceSwitcher'
export { WorkspaceSwitcher }
