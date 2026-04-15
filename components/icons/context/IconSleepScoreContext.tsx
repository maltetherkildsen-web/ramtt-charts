// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconSleepScoreContextProps extends IconProps {
  stages?: number[] // up to 4 values (0-100): awake, light, deep, REM
}

const BAR_DEFS = [
  { x: 3, maxH: 6 },   // awake (shortest)
  { x: 7.5, maxH: 10 }, // light
  { x: 12, maxH: 14 },  // deep
  { x: 16.5, maxH: 10 }, // REM
]

export const IconSleepScoreContext = forwardRef<SVGSVGElement, IconSleepScoreContextProps>(
  ({ stages, ...props }, ref) => (
    <IconBase ref={ref} {...props}>
      {/* Moon */}
      <path d="M18 6a4 4 0 01-4.5-4A5 5 0 1018 6z" fill="none" />
      {/* Sleep stage bars */}
      {BAR_DEFS.map((bar, i) => {
        const value = stages?.[i]
        const h = value != null ? (Math.max(0, Math.min(100, value)) / 100) * bar.maxH : bar.maxH * 0.3
        const filled = stages != null
        return (
          <rect
            key={i}
            x={bar.x}
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
    </IconBase>
  ),
)
IconSleepScoreContext.displayName = 'IconSleepScoreContext'
