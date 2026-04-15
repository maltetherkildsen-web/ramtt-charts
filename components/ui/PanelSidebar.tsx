// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, type ReactNode } from 'react'
import { cn, BORDER, TRANSITION, PANEL_WIDTH } from '@/lib/ui'

export interface PanelSidebarProps {
  side: 'left' | 'right'
  width?: number
  open: boolean
  onOpenChange?: (open: boolean) => void
  header?: ReactNode
  children: ReactNode
  className?: string
}

const PanelSidebar = forwardRef<HTMLDivElement, PanelSidebarProps>(
  function PanelSidebar({ side, width = PANEL_WIDTH, open, header, children, className }, ref) {
    const borderClass = side === 'left'
      ? 'border-r-[0.5px] border-r-[var(--n400)]'
      : 'border-l-[0.5px] border-l-[var(--n400)]'

    return (
      <div
        ref={ref}
        role="complementary"
        aria-label={`${side} panel`}
        className={cn(
          'flex flex-col bg-[var(--n50)] overflow-hidden shrink-0',
          borderClass,
          TRANSITION.transform,
          className,
        )}
        style={{
          width: open ? width : 0,
          transition: 'width 200ms var(--ease-out-expo)',
        }}
      >
        <div className="flex flex-col h-full" style={{ width, minWidth: width }}>
          {header && (
            <div className={cn('shrink-0 px-3 py-2', BORDER.subtle, 'border-b-[0.5px] border-b-[var(--n200)]')}>
              {header}
            </div>
          )}
          <div className="flex-1 overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    )
  }
)

PanelSidebar.displayName = 'PanelSidebar'
export { PanelSidebar }
