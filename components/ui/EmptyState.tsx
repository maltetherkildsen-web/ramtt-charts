// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT } from '@/lib/ui'

export interface EmptyStateProps {
  icon?: ReactNode
  title: string
  description?: string
  action?: ReactNode
  className?: string
}

const EmptyState = forwardRef<HTMLDivElement, EmptyStateProps>(
  ({ icon, title, description, action, className }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col items-center text-center',
          'py-12 px-6 max-w-[320px] mx-auto',
          className,
        )}
      >
        {icon && (
          <div
            className="text-[var(--n400)] mb-4 flex items-center justify-center"
            style={{ width: 48, height: 48 }}
          >
            {icon}
          </div>
        )}

        <h3 className={cn(FONT.body, 'text-[15px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
          {title}
        </h3>

        {description && (
          <p
            className={cn(
              FONT.body,
              'text-[13px]',
              WEIGHT.normal,
              'text-[var(--n800)] mt-1.5 leading-relaxed',
            )}
          >
            {description}
          </p>
        )}

        {action && <div className="mt-4">{action}</div>}
      </div>
    )
  },
)

EmptyState.displayName = 'EmptyState'
export { EmptyState }
