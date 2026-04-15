// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  RADIUS,
  TRANSITION,
  HOVER_SAND,
  FOCUS_RING,
} from '@/lib/ui'

// ─── Types ───

export interface ActiveTaskProps {
  label?: string
  onClear?: () => void
  clearLabel?: string
  children: ReactNode
  className?: string
}

export interface ActiveTaskItemProps {
  title: string
  timestamp?: string
  status?: 'active' | 'paused' | 'completed'
  onClick?: () => void
  className?: string
}

// ─── Dot color by status ───

const DOT_COLOR: Record<NonNullable<ActiveTaskItemProps['status']>, string> = {
  active: 'bg-[var(--chart-1)]',
  paused: 'bg-[var(--n400)]',
  completed: 'bg-[var(--n600)]',
}

// ─── Root ───

const ActiveTaskRoot = forwardRef<HTMLDivElement, ActiveTaskProps>(
  function ActiveTask(
    { label = 'Active', onClear, clearLabel = 'Clear active', children, className },
    ref,
  ) {
    return (
      <section ref={ref} className={cn('flex flex-col gap-2', className)}>
        {/* Header */}
        <div className="flex items-center justify-between">
          <span
            className={cn(
              FONT.body,
              'text-[12px] uppercase tracking-wide text-[var(--n600)]',
              WEIGHT.medium,
            )}
          >
            {label}
          </span>
          {onClear && (
            <button
              type="button"
              onClick={onClear}
              className={cn(
                FONT.body,
                'text-[12px] text-[var(--n600)] hover:text-[var(--n900)] cursor-default',
                WEIGHT.normal,
                TRANSITION.colors,
                FOCUS_RING,
                RADIUS.sm,
              )}
            >
              {clearLabel}
            </button>
          )}
        </div>

        {/* Items */}
        <div className="flex flex-col">{children}</div>
      </section>
    )
  },
)
ActiveTaskRoot.displayName = 'ActiveTask'

// ─── Item ───

const ActiveTaskItem = forwardRef<HTMLButtonElement, ActiveTaskItemProps>(
  function ActiveTaskItem(
    { title, timestamp, status = 'active', onClick, className },
    ref,
  ) {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        className={cn(
          'flex items-start gap-3 p-2 -mx-2 w-[calc(100%+16px)] cursor-default text-left',
          RADIUS.sm,
          TRANSITION.colors,
          HOVER_SAND,
          FOCUS_RING,
          className,
        )}
      >
        {/* Status dot */}
        <span
          className={cn('w-2 h-2 rounded-[30%] mt-1.5 shrink-0', DOT_COLOR[status])}
          aria-hidden="true"
        />

        {/* Content */}
        <span className="flex flex-col gap-0.5 min-w-0">
          <span
            className={cn(
              FONT.body,
              'text-[13px] text-[var(--n1150)] truncate',
              WEIGHT.medium,
            )}
          >
            {title}
          </span>
          {timestamp && (
            <span
              className={cn(
                FONT.body,
                'text-[11px] text-[var(--n600)]',
                WEIGHT.normal,
              )}
            >
              {timestamp}
            </span>
          )}
        </span>
      </button>
    )
  },
)
ActiveTaskItem.displayName = 'ActiveTask.Item'

// ─── Export ───

export const ActiveTask = Object.assign(ActiveTaskRoot, {
  Item: ActiveTaskItem,
})
