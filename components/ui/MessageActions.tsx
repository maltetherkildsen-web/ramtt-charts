// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, type ReactNode } from 'react'
import {
  cn,
  RADIUS,
  TRANSITION,
  HOVER_SAND,
  FOCUS_RING,
} from '@/lib/ui'

// ─── Types ───

export interface MessageActionsProps {
  children: ReactNode
  className?: string
}

export interface MessageActionProps {
  icon: ReactNode
  label: string
  onClick?: () => void
  active?: boolean
  className?: string
}

// ─── Root ───

const Root = forwardRef<HTMLDivElement, MessageActionsProps>(
  function MessageActions({ children, className }, ref) {
    return (
      <div
        ref={ref}
        role="toolbar"
        aria-label="Message actions"
        className={cn('inline-flex items-center gap-0.5', className)}
      >
        {children}
      </div>
    )
  },
)

Root.displayName = 'MessageActions'

// ─── Action ───

const Action = forwardRef<HTMLButtonElement, MessageActionProps>(
  function MessageAction({ icon, label, onClick, active, className }, ref) {
    return (
      <button
        ref={ref}
        type="button"
        aria-label={label}
        title={label}
        onClick={onClick}
        className={cn(
          'inline-flex items-center justify-center w-7 h-7 cursor-default',
          RADIUS.sm,
          TRANSITION.colors,
          FOCUS_RING,
          active
            ? 'bg-[var(--n200)] text-[var(--n1150)]'
            : cn('text-[var(--n600)] hover:text-[var(--n900)]', HOVER_SAND),
          className,
        )}
      >
        {icon}
      </button>
    )
  },
)

Action.displayName = 'MessageActions.Action'

// ─── Compound export ───

const MessageActions = Object.assign(Root, { Action })
export { MessageActions }
