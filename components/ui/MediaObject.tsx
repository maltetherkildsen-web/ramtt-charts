// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, type ReactNode } from 'react'
import { cn, FONT, WEIGHT, AVATAR_SIZES } from '@/lib/ui'
import { Avatar } from './Avatar'

// ─── Types ───

export interface MediaObjectProps {
  /** Icon element (left side) */
  icon?: ReactNode
  /** Avatar URL (alternative to icon) */
  avatar?: string
  /** Avatar size */
  avatarSize?: 'sm' | 'md' | 'lg'
  /** Primary text */
  title: string
  /** Secondary text */
  description?: string
  /** Timestamp */
  timestamp?: string
  /** Right-side action */
  action?: ReactNode
  className?: string
}

// ─── Component ───

const MediaObject = forwardRef<HTMLDivElement, MediaObjectProps>(
  function MediaObject(
    { icon, avatar, avatarSize = 'md', title, description, timestamp, action, className },
    ref,
  ) {
    return (
      <div ref={ref} className={cn('flex items-start gap-3', className)}>
        {/* Icon or avatar */}
        {icon && <div className="shrink-0">{icon}</div>}
        {!icon && avatar && (
          <Avatar src={avatar} name={title} size={avatarSize} />
        )}

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <span className={cn(FONT.body, 'text-[14px]', WEIGHT.book, 'text-[var(--n1150)] block')}>
            {title}
          </span>
          {description && (
            <span className={cn(FONT.body, 'text-[13px]', WEIGHT.normal, 'text-[var(--n800)] mt-0.5 block')}>
              {description}
            </span>
          )}
          {timestamp && (
            <span className={cn(FONT.body, 'text-[11px]', WEIGHT.normal, 'text-[var(--n600)] mt-0.5 block')}>
              {timestamp}
            </span>
          )}
        </div>

        {/* Action */}
        {action && <div className="shrink-0">{action}</div>}
      </div>
    )
  },
)

MediaObject.displayName = 'MediaObject'
export { MediaObject }
