// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import {
  cn,
  FONT,
  WEIGHT,
  RADIUS,
  BORDER,
  TRANSITION,
  HOVER_SAND,
  FOCUS_RING,
} from '@/lib/ui'

// ─── Types ───

export interface PromoCardProps {
  illustration?: ReactNode
  badge?: string
  title: string
  description?: string
  actionLabel?: string
  onAction?: () => void
  link?: { label: string; href: string }
  className?: string
}

// ─── Component ───

const PromoCard = forwardRef<HTMLDivElement, PromoCardProps>(
  (
    { illustration, badge, title, description, actionLabel, onAction, link, className },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          FONT.body,
          'flex gap-4 p-4',
          'bg-[var(--n50)]',
          BORDER.default,
          RADIUS.lg,
          'cursor-default',
          className,
        )}
      >
        {/* Left column — illustration + badge */}
        {(illustration || badge) && (
          <div className="flex flex-col items-center gap-1.5 shrink-0">
            {illustration}
            {badge && (
              <span
                className={cn(
                  'text-[11px]',
                  WEIGHT.normal,
                  'text-[var(--n600)]',
                )}
              >
                {badge}
              </span>
            )}
          </div>
        )}

        {/* Right column — copy + actions */}
        <div className="flex flex-col gap-2 min-w-0">
          <h3
            className={cn(
              'text-[14px]',
              WEIGHT.medium,
              'text-[var(--n1150)]',
            )}
          >
            {title}
          </h3>

          {description && (
            <p
              className={cn(
                'text-[12px]',
                WEIGHT.normal,
                'text-[var(--n700)]',
              )}
            >
              {description}
            </p>
          )}

          {(actionLabel || link) && (
            <div className="flex items-center gap-3">
              {actionLabel && (
                <button
                  type="button"
                  onClick={onAction}
                  className={cn(
                    'px-3 h-8',
                    'text-[12px]',
                    WEIGHT.medium,
                    'text-[var(--n1150)]',
                    BORDER.default,
                    RADIUS.sm,
                    HOVER_SAND,
                    FOCUS_RING,
                    TRANSITION.colors,
                    'cursor-default',
                  )}
                >
                  {actionLabel}
                </button>
              )}
              {link && (
                <a
                  href={link.href}
                  className={cn(
                    'text-[11px]',
                    WEIGHT.normal,
                    'text-[var(--n600)] hover:text-[var(--n900)]',
                    'underline underline-offset-[0.25em] decoration-[1px]',
                    TRANSITION.colors,
                  )}
                >
                  {link.label}
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    )
  },
)

PromoCard.displayName = 'PromoCard'
export { PromoCard }
