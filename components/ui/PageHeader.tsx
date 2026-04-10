// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT } from '@/lib/ui'

export interface PageHeaderProps {
  title: string
  subtitle?: string
  breadcrumb?: ReactNode
  actions?: ReactNode
  className?: string
}

const PageHeader = forwardRef<HTMLDivElement, PageHeaderProps>(
  ({ title, subtitle, breadcrumb, actions, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex items-start justify-between',
          'pb-6 border-b-[0.5px] border-b-[var(--n200)] mb-6',
          className,
        )}
      >
        <div>
          {breadcrumb && <div className="mb-2">{breadcrumb}</div>}
          <h1 className={cn(FONT.body, 'text-[18px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
            {title}
          </h1>
          {subtitle && (
            <p className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] mt-0.5')}>
              {subtitle}
            </p>
          )}
        </div>
        {actions && (
          <div className="flex items-center gap-2 shrink-0">
            {actions}
          </div>
        )}
      </div>
    )
  },
)

PageHeader.displayName = 'PageHeader'
export { PageHeader }
