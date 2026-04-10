// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, FONT, WEIGHT, TRANSITION } from '@/lib/ui'

// ─── Constants ───

const SEPARATOR_DEFAULT = 'bg-[var(--n400)]'
const SEPARATOR_SUBTLE = 'bg-[var(--n200)]'

// ─── Types ───

export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  variant?: 'default' | 'subtle'
  label?: string
  className?: string
}

// ─── Component ───

const Separator = forwardRef<HTMLDivElement, SeparatorProps>(
  ({ orientation = 'horizontal', variant = 'default', label, className }, ref) => {
    const color = variant === 'subtle' ? SEPARATOR_SUBTLE : SEPARATOR_DEFAULT

    // Vertical separator
    if (orientation === 'vertical') {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="vertical"
          className={cn('w-px self-stretch', color, className)}
          style={{ minHeight: 1 }}
        />
      )
    }

    // Horizontal with label
    if (label) {
      return (
        <div
          ref={ref}
          role="separator"
          aria-orientation="horizontal"
          className={cn('flex items-center w-full', className)}
        >
          <div className={cn('flex-1 h-px', color)} />
          <span
            className={cn(
              FONT.body,
              'text-[12px]',
              WEIGHT.normal,
              'text-[var(--n600)]',
              'px-3 shrink-0',
            )}
          >
            {label}
          </span>
          <div className={cn('flex-1 h-px', color)} />
        </div>
      )
    }

    // Horizontal (default)
    return (
      <div
        ref={ref}
        role="separator"
        aria-orientation="horizontal"
        className={cn('w-full h-px', color, className)}
      />
    )
  },
)

Separator.displayName = 'Separator'
export { Separator }
