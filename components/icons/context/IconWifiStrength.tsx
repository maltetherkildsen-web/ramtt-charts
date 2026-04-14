// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconWifiStrengthProps extends IconProps {
  bars?: 0 | 1 | 2 | 3
}

const ARCS = [
  // Innermost (closest to dot) — smallest arc
  'M9.5 16.5C10.87 15.13 13.13 15.13 14.5 16.5',
  // Middle arc
  'M7 14C9.76 11.24 14.24 11.24 17 14',
  // Outermost — largest arc
  'M4.5 11.5C8.64 7.36 15.36 7.36 19.5 11.5',
]

export const IconWifiStrength = forwardRef<SVGSVGElement, IconWifiStrengthProps>(
  ({ bars = 2, ...props }, ref) => (
    <IconBase ref={ref} {...props}>
      {/* Base dot — always visible */}
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
      {/* Arcs from inner to outer */}
      {ARCS.map((d, i) => {
        const active = bars != null && i < bars
        return (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={active ? 'currentColor' : 'var(--n200)'}
            opacity={active ? 1 : 0.15}
            style={{
              transition: 'opacity 300ms var(--ease-out-expo), stroke 300ms var(--ease-out-expo)',
            }}
          />
        )
      })}
    </IconBase>
  ),
)
IconWifiStrength.displayName = 'IconWifiStrength'
