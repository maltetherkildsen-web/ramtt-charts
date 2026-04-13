// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconTrendArrowProps extends IconProps {
  trend?: number
}

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v))
}

function getTrendColor(trend: number): string | undefined {
  if (trend > 5) return 'var(--positive)'
  if (trend < -5) return 'var(--negative)'
  return undefined // currentColor via IconBase
}

export const IconTrendArrow = forwardRef<SVGSVGElement, IconTrendArrowProps>(
  ({ trend, ...props }, ref) => {
    const rotation = trend != null ? -clamp(trend, -20, 20) * (45 / 20) : 0
    const trendColor = trend != null ? getTrendColor(trend) : undefined

    return (
      <IconBase ref={ref} {...props} color={trendColor ?? props.color}>
        <g
          style={{
            transform: `rotate(${rotation}deg)`,
            transformOrigin: 'center',
            transition: 'transform 300ms var(--ease-out-expo)',
          }}
        >
          <path d="M4 12H20" />
          <path d="M14 6L20 12L14 18" />
        </g>
      </IconBase>
    )
  },
)
IconTrendArrow.displayName = 'IconTrendArrow'
