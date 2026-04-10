// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, TRANSITION } from '@/lib/ui'

const VARIANT_BORDER: Record<string, string> = {
  default: 'var(--n600)',
  info: 'var(--info)',
  warning: 'var(--warning)',
  error: 'var(--negative)',
  success: 'var(--positive)',
}

export interface AlertProps {
  variant?: 'default' | 'info' | 'warning' | 'error' | 'success'
  title?: string
  children: ReactNode
  onDismiss?: () => void
  action?: { label: string; onClick: () => void }
  className?: string
}

const Alert = forwardRef<HTMLDivElement, AlertProps>(
  ({ variant = 'default', title, children, onDismiss, action, className }, ref) => {
    const borderColor = VARIANT_BORDER[variant]

    return (
      <div
        ref={ref}
        role="alert"
        className={cn(
          'relative bg-[var(--n50)]',
          'border-[0.5px] border-[var(--n400)]',
          'rounded-[8px]',
          'px-4 py-3',
          className,
        )}
        style={{ borderLeftWidth: 3, borderLeftColor: borderColor }}
      >
        <div className="flex items-start gap-2.5">
          {/* Dot */}
          <span
            className="shrink-0 rounded-full mt-1.5"
            style={{ width: 6, height: 6, backgroundColor: borderColor }}
          />

          <div className="flex-1 min-w-0">
            {title && (
              <div className={cn(FONT.body, 'text-[13px]', WEIGHT.strong, 'text-[var(--n1150)]')}>
                {title}
              </div>
            )}
            <div className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)]', title && 'mt-0.5')}>
              {children}
            </div>
            {action && (
              <button
                type="button"
                onClick={action.onClick}
                className={cn(
                  FONT.body,
                  'text-[12px]',
                  WEIGHT.medium,
                  'text-[var(--n1150)]',
                  'mt-2 px-2.5 py-1 border-[0.5px] border-[var(--n400)] rounded-[5px]',
                  'hover:bg-[var(--n200)]',
                  TRANSITION.background,
                )}
              >
                {action.label}
              </button>
            )}
          </div>

          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss"
              className={cn(
                'shrink-0 text-[var(--n600)] hover:text-[var(--n1150)]',
                TRANSITION.colors,
              )}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
              </svg>
            </button>
          )}
        </div>
      </div>
    )
  },
)

Alert.displayName = 'Alert'
export { Alert }
