// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'
import { getThresholdColor, type Threshold } from './thresholds'

interface IconProgressRingProps extends IconProps {
  value?: number // 0-100
  thresholds?: Threshold[]
}

const RADIUS = 9
const CIRCUMFERENCE = 2 * Math.PI * RADIUS // ~56.55

export const IconProgressRing = forwardRef<SVGSVGElement, IconProgressRingProps>(
  ({ value, thresholds, ...props }, ref) => {
    const clamped = value != null ? Math.max(0, Math.min(100, value)) : 0
    const offset = CIRCUMFERENCE * (1 - clamped / 100)
    const arcColor = value != null && thresholds
      ? getThresholdColor(value, thresholds)
      : 'currentColor'

    return (
      <IconBase ref={ref} {...props}>
        {/* Background track */}
        <circle
          cx="12"
          cy="12"
          r={RADIUS}
          fill="none"
          stroke="var(--n200)"
        />
        {/* Progress arc */}
        {value != null && (
          <circle
            cx="12"
            cy="12"
            r={RADIUS}
            fill="none"
            stroke={arcColor}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{
              transform: 'rotate(-90deg)',
              transformOrigin: 'center',
              transition: 'stroke-dashoffset 400ms var(--ease-out-expo)',
            }}
          />
        )}
      </IconBase>
    )
  },
)
IconProgressRing.displayName = 'IconProgressRing'
