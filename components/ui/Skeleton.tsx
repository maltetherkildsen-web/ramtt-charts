// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, RADIUS } from '@/lib/ui'

export interface SkeletonProps {
  width?: number | string
  height?: number | string
  radius?: 'sm' | 'md' | 'lg' | 'full' | number
  className?: string
}

const radiusMap: Record<string, string> = {
  sm: RADIUS.sm,
  md: RADIUS.md,
  lg: RADIUS.lg,
  full: RADIUS.full,
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ width = '100%', height = 16, radius = 'sm', className }, ref) => {
    const radiusClass = typeof radius === 'string' ? radiusMap[radius] : undefined
    const radiusStyle = typeof radius === 'number' ? { borderRadius: radius } : undefined

    return (
      <div
        ref={ref}
        className={cn(
          'bg-[var(--n200)] overflow-hidden ramtt-skeleton',
          radiusClass,
          className,
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          animation: 'ramtt-skeleton-pulse 1.8s ease-in-out infinite',
          ...radiusStyle,
        }}
        aria-hidden="true"
      />
    )
  }
)

Skeleton.displayName = 'Skeleton'
export { Skeleton }
