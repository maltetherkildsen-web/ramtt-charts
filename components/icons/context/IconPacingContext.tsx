// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconPacingContextProps extends IconProps {
  evenness?: number // 0-100 (100 = perfectly even splits)
}

// 4 dots interpolate between clustered (0) and uniform (100)
const UNIFORM = [5, 10, 15, 20]
const CLUSTERED = [9, 11, 13, 15]

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export const IconPacingContext = forwardRef<SVGSVGElement, IconPacingContextProps>(
  ({ evenness, ...props }, ref) => {
    const t = evenness != null ? Math.max(0, Math.min(100, evenness)) / 100 : 1
    return (
      <IconBase ref={ref} {...props}>
        {/* Track line */}
        <path d="M2 12h20" stroke="var(--n200)" />
        {/* Zone bounds */}
        <path d="M2 8h20" strokeDasharray="1 2" opacity="0.15" />
        <path d="M2 16h20" strokeDasharray="1 2" opacity="0.15" />
        {/* Pace dots */}
        {UNIFORM.map((ux, i) => {
          const cx = lerp(CLUSTERED[i], ux, t)
          return (
            <circle
              key={i}
              cx={cx}
              cy={12}
              r={1.5}
              fill="currentColor"
              stroke="none"
              style={{ transition: 'cx 400ms var(--ease-out-expo)' }}
            />
          )
        })}
      </IconBase>
    )
  },
)
IconPacingContext.displayName = 'IconPacingContext'
