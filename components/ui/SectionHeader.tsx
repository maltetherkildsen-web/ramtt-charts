// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, LABEL_STYLE } from '@/lib/ui'

export interface SectionHeaderProps {
  children: string
  action?: ReactNode
  /** Render a 0.5px divider line above the header */
  divider?: boolean
  className?: string
}

const SectionHeader = forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ children, action, divider, className }, ref) => (
    <div ref={ref} className={cn(divider && 'border-t-[0.5px] border-t-[var(--n400)] pt-3', className)}>
      <div className="flex items-center justify-between pb-1.5">
        <h2 className={LABEL_STYLE}>{children}</h2>
        {action && <div>{action}</div>}
      </div>
    </div>
  )
)

SectionHeader.displayName = 'SectionHeader'
export { SectionHeader }
