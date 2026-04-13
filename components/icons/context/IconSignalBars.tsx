// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconSignalBarsProps extends IconProps {
  bars?: number // 0-4
}

const BAR_DEFS = [
  { x: 4, height: 4 },
  { x: 8, height: 8 },
  { x: 12, height: 12 },
  { x: 16, height: 16 },
]

export const IconSignalBars = forwardRef<SVGSVGElement, IconSignalBarsProps>(
  ({ bars, ...props }, ref) => (
    <IconBase ref={ref} {...props}>
      {BAR_DEFS.map((bar, i) => {
        const filled = bars != null && i < bars
        return (
          <rect
            key={i}
            x={bar.x}
            y={20 - bar.height}
            width={3}
            height={bar.height}
            rx={0.5}
            fill={filled ? 'currentColor' : 'none'}
            stroke={filled ? 'none' : 'var(--n200)'}
          />
        )
      })}
    </IconBase>
  ),
)
IconSignalBars.displayName = 'IconSignalBars'
