// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, type ReactNode } from 'react'
import { cn, RADIUS, TRANSITION, HOVER_SAND, FOCUS_RING, FLOATING_SHADOW, TOOLBAR_BUTTON_SIZE } from '@/lib/ui'

export interface ToolbarItem {
  id: string
  icon: ReactNode
  label?: string
  active?: boolean
  hasDropdown?: boolean
}

export interface ToolbarGroup {
  items: ToolbarItem[]
}

export interface FloatingToolbarProps {
  groups: ToolbarGroup[]
  onItemClick?: (id: string) => void
  className?: string
}

const FloatingToolbar = forwardRef<HTMLDivElement, FloatingToolbarProps>(
  function FloatingToolbar({ groups, onItemClick, className }, ref) {
    return (
      <div
        ref={ref}
        role="toolbar"
        aria-label="Tools"
        className={cn(
          'inline-flex items-center gap-0 bg-[var(--n50)] px-1.5 py-1.5',
          RADIUS.lg,
          className,
        )}
        style={{ boxShadow: FLOATING_SHADOW }}
      >
        {groups.map((group, gi) => (
          <div key={gi} className="flex items-center">
            {gi > 0 && (
              <div
                className="mx-1 shrink-0 bg-[var(--n400)]"
                style={{ width: 0.5, height: 16, opacity: 0.5 }}
              />
            )}
            <div className="flex items-center gap-0.5">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  aria-label={item.label || item.id}
                  aria-pressed={item.active || false}
                  onClick={() => onItemClick?.(item.id)}
                  className={cn(
                    'flex items-center justify-center shrink-0',
                    RADIUS.md,
                    TRANSITION.background,
                    FOCUS_RING,
                    item.active
                      ? 'bg-[var(--n1150)] text-[var(--n50)]'
                      : cn('bg-transparent text-[var(--n800)]', HOVER_SAND),
                  )}
                  style={{ width: TOOLBAR_BUTTON_SIZE, height: TOOLBAR_BUTTON_SIZE }}
                >
                  <span className="flex items-center justify-center" style={{ width: 20, height: 20 }}>
                    {item.icon}
                  </span>
                  {item.hasDropdown && (
                    <svg
                      width="8"
                      height="8"
                      viewBox="0 0 16 16"
                      fill="none"
                      aria-hidden="true"
                      className="ml-[-2px] opacity-60"
                    >
                      <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
)

FloatingToolbar.displayName = 'FloatingToolbar'
export { FloatingToolbar }
