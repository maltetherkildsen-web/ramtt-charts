// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconNegativeSplitContextProps extends IconProps {
  splits?: number[] // up to 4 values (seconds) — taller = slower
}

const BAR_X = [3, 8, 13, 18]
const MAX_H = 14

export const IconNegativeSplitContext = forwardRef<SVGSVGElement, IconNegativeSplitContextProps>(
  ({ splits, ...props }, ref) => {
    // Normalize: find max split, scale to MAX_H
    const max = splits ? Math.max(...splits, 1) : 1
    return (
      <IconBase ref={ref} {...props}>
        {BAR_X.map((x, i) => {
          const value = splits?.[i]
          const h = value != null ? (value / max) * MAX_H : MAX_H * (1 - i * 0.2)
          const filled = splits != null
          return (
            <rect
              key={i}
              x={x}
              y={20 - h}
              width={3}
              height={h}
              rx={0.5}
              fill={filled ? 'currentColor' : 'none'}
              stroke={filled ? 'none' : 'var(--n200)'}
              style={{ transition: 'y 300ms var(--ease-out-expo), height 300ms var(--ease-out-expo)' }}
            />
          )
        })}
        {/* Trend line */}
        <path d="M2 6l20 10" strokeDasharray="2 2" opacity="0.3" />
      </IconBase>
    )
  },
)
IconNegativeSplitContext.displayName = 'IconNegativeSplitContext'
