// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconCarboLoadingContextProps extends IconProps {
  day?: 1 | 2 | 3 // progressive loading days
}

const BARS = [
  { x: 7.5, maxH: 4 },
  { x: 11, maxH: 7 },
  { x: 14.5, maxH: 10 },
]

export const IconCarboLoadingContext = forwardRef<SVGSVGElement, IconCarboLoadingContextProps>(
  ({ day, ...props }, ref) => (
    <IconBase ref={ref} {...props}>
      {/* Container */}
      <rect x="5" y="4" width="14" height="16" rx="2" fill="none" stroke="var(--n200)" />
      {/* Loading arrow */}
      <path d="M4 8l-2-1.5L4 5" opacity="0.4" />
      {/* Progressive bars */}
      {BARS.map((bar, i) => {
        const filled = day != null && i < day
        return (
          <rect
            key={i}
            x={bar.x}
            y={18 - bar.maxH}
            width={2.5}
            height={bar.maxH}
            rx={0.5}
            fill={filled ? 'currentColor' : 'none'}
            stroke={filled ? 'none' : 'var(--n200)'}
            style={{ transition: 'fill 200ms ease' }}
          />
        )
      })}
    </IconBase>
  ),
)
IconCarboLoadingContext.displayName = 'IconCarboLoadingContext'
