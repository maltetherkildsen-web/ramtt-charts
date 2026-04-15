// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn } from '@/lib/ui'

export interface DarkSectionProps {
  children: React.ReactNode
  className?: string
}

const DarkSection = forwardRef<HTMLDivElement, DarkSectionProps>(
  function DarkSection({ children, className }, ref) {
    return (
      <div
        ref={ref}
        className={cn('bg-[var(--dark-bg)] text-[var(--dark-text)]', className)}
      >
        {children}
      </div>
    )
  },
)

DarkSection.displayName = 'DarkSection'
export { DarkSection }
