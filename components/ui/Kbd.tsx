// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, BORDER } from '@/lib/ui'

export interface KbdProps {
  children: ReactNode
  className?: string
}

const Kbd = forwardRef<HTMLElement, KbdProps>(
  ({ children, className }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center',
          'min-w-[20px] h-[20px] px-[5px]',
          'bg-[var(--n200)]',
          BORDER.default,
          'rounded-[4px]',
          FONT.body,
          'text-[11px]',
          WEIGHT.book,
          'text-[var(--n800)]',
          'select-none',
          className,
        )}
      >
        {children}
      </kbd>
    )
  },
)

Kbd.displayName = 'Kbd'
export { Kbd }
