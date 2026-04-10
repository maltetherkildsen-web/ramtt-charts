// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { cn, SPINNER_SIZES } from '@/lib/ui'

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  color?: string
  className?: string
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = 'md', color = 'currentColor', className }, ref) => {
    const px = SPINNER_SIZES[size]

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn('inline-flex shrink-0 ramtt-spinner', className)}
        style={{ width: px, height: px }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-full h-full"
          style={{ animation: 'ramtt-spin 0.8s linear infinite' }}
        >
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke={color}
            strokeWidth="2.5"
            strokeDasharray="50 25"
            strokeLinecap="round"
          />
        </svg>
      </div>
    )
  },
)

Spinner.displayName = 'Spinner'
export { Spinner }
