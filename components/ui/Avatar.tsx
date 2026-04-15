// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef, useState } from 'react'
import { cn, FONT, WEIGHT, AVATAR_SIZES } from '@/lib/ui'

export interface AvatarProps {
  src?: string
  name: string
  size?: 'sm' | 'md' | 'lg'
  status?: 'online' | 'offline' | 'away'
  className?: string
}

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/)
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return (parts[0]?.[0] ?? '').toUpperCase()
}

const STATUS_COLORS = {
  online: 'bg-[var(--positive)]',
  away: 'bg-[var(--warning)]',
  offline: 'bg-[var(--n600)]',
} as const

const STATUS_DOT_SIZE = { sm: 8, md: 10, lg: 12 } as const

const INITIALS_TEXT = {
  sm: 'text-[10px]',
  md: 'text-[12px]',
  lg: 'text-[14px]',
} as const

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  ({ src, name, size = 'md', status, className }, ref) => {
    const [imgError, setImgError] = useState(false)
    const px = AVATAR_SIZES[size]
    const showImage = src && !imgError

    return (
      <div
        ref={ref}
        className={cn('relative inline-flex shrink-0', className)}
        style={{ width: px, height: px }}
      >
        <div
          className={cn(
            'flex items-center justify-center rounded-full overflow-hidden bg-[var(--n200)]',
            'w-full h-full',
          )}
        >
          {showImage ? (
            <img
              src={src}
              alt={name}
              onError={() => setImgError(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <span
              className={cn(
                FONT.body,
                WEIGHT.medium,
                INITIALS_TEXT[size],
                'text-[var(--n800)] select-none',
              )}
            >
              {getInitials(name)}
            </span>
          )}
        </div>

        {status && (
          <span
            className={cn(
              'absolute rounded-[30%] border-[2px] border-[var(--n50)]',
              STATUS_COLORS[status],
            )}
            style={{
              width: STATUS_DOT_SIZE[size],
              height: STATUS_DOT_SIZE[size],
              bottom: -1,
              right: -1,
            }}
          />
        )}
      </div>
    )
  },
)

Avatar.displayName = 'Avatar'
export { Avatar }
