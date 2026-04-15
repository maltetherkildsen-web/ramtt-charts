// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconPeriodizationContextProps extends IconProps {
  phase?: 1 | 2 | 3 | 4 // base, build, peak, race
}

const BLOCKS = [
  { x: 2, y: 16, w: 4, h: 4 },    // base
  { x: 7.5, y: 12, w: 4, h: 8 },   // build
  { x: 13, y: 8, w: 4, h: 12 },     // peak
  { x: 18.5, y: 4, w: 3.5, h: 16 }, // race
]

export const IconPeriodizationContext = forwardRef<SVGSVGElement, IconPeriodizationContextProps>(
  ({ phase, ...props }, ref) => (
    <IconBase ref={ref} {...props}>
      {BLOCKS.map((b, i) => {
        const active = phase != null && i + 1 === phase
        return (
          <rect
            key={i}
            x={b.x}
            y={b.y}
            width={b.w}
            height={b.h}
            rx={0.5}
            fill={active ? 'currentColor' : 'none'}
            fillOpacity={active ? 0.2 : undefined}
            stroke={active ? 'currentColor' : 'var(--n200)'}
            style={{ transition: 'fill 200ms ease, stroke 200ms ease' }}
          />
        )
      })}
    </IconBase>
  ),
)
IconPeriodizationContext.displayName = 'IconPeriodizationContext'
