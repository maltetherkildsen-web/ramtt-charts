// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useEffect, useRef, useState, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, BADGE_NOTIFY_SIZE, BADGE_NOTIFY_DOT, BADGE_NOTIFY_MAX } from '@/lib/ui'

// ─── Types ───

export interface NotificationBadgeProps {
  count?: number
  dot?: boolean
  max?: number
  color?: string
  children: ReactNode
  className?: string
}

// ─── Component ───

const NotificationBadge = forwardRef<HTMLSpanElement, NotificationBadgeProps>(
  (
    {
      count,
      dot = false,
      max = BADGE_NOTIFY_MAX,
      color = 'var(--negative)',
      children,
      className,
    },
    ref,
  ) => {
    const showBadge = dot || (count !== undefined && count > 0)
    const prevShowRef = useRef(showBadge)
    const [animate, setAnimate] = useState(false)

    useEffect(() => {
      if (showBadge && !prevShowRef.current) {
        setAnimate(true)
        const timer = setTimeout(() => setAnimate(false), 200)
        return () => clearTimeout(timer)
      }
      prevShowRef.current = showBadge
    }, [showBadge])

    const displayText =
      count !== undefined && count > max ? `${max}+` : count !== undefined ? String(count) : ''

    return (
      <span ref={ref} className={cn('relative inline-flex', className)}>
        {children}
        {showBadge && (
          dot ? (
            <span
              className={cn(
                'absolute -top-1 -right-1',
                animate && 'ramtt-badge-enter',
              )}
              style={{
                width: BADGE_NOTIFY_DOT,
                height: BADGE_NOTIFY_DOT,
                borderRadius: '50%',
                backgroundColor: color,
                border: '2px solid var(--n50)',
                animation: animate ? 'ramtt-badge-enter 200ms var(--ease-out-expo)' : undefined,
              }}
              aria-hidden="true"
            />
          ) : (
            <span
              className={cn(
                FONT.body,
                WEIGHT.strong,
                'absolute -top-1 -right-1 flex items-center justify-center tabular-nums text-white',
                animate && 'ramtt-badge-enter',
              )}
              style={{
                minWidth: BADGE_NOTIFY_SIZE,
                height: BADGE_NOTIFY_SIZE,
                borderRadius: BADGE_NOTIFY_SIZE / 2,
                padding: '0 4px',
                fontSize: 10,
                lineHeight: `${BADGE_NOTIFY_SIZE}px`,
                backgroundColor: color,
                border: '2px solid var(--n50)',
                animation: animate ? 'ramtt-badge-enter 200ms var(--ease-out-expo)' : undefined,
              }}
              aria-label={`${count} notifications`}
            >
              {displayText}
            </span>
          )
        )}
      </span>
    )
  },
)

NotificationBadge.displayName = 'NotificationBadge'
export { NotificationBadge }
