// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'
import { getThresholdColor, HEALTH_THRESHOLDS, type Threshold } from './thresholds'

interface IconCalorieBalanceProps extends IconProps {
  consumed?: number
  target?: number
  thresholds?: Threshold[]
}

const RADIUS = 8
const CIRCUMFERENCE = 2 * Math.PI * RADIUS // ~50.27

export const IconCalorieBalance = forwardRef<SVGSVGElement, IconCalorieBalanceProps>(
  ({ consumed = 1500, target = 2000, thresholds, ...props }, ref) => {
    const safeTarget = Math.max(1, target)
    const ratio = Math.max(0, Math.min(1, consumed / safeTarget))
    const percentage = ratio * 100
    const offset = CIRCUMFERENCE * (1 - ratio)
    const arcColor = getThresholdColor(percentage, thresholds ?? HEALTH_THRESHOLDS)

    return (
      <IconBase ref={ref} {...props}>
        {/* Background donut track */}
        <circle
          cx="12"
          cy="12"
          r={RADIUS}
          fill="none"
          stroke="var(--n200)"
          strokeWidth={3}
        />
        {/* Consumed arc */}
        <circle
          cx="12"
          cy="12"
          r={RADIUS}
          fill="none"
          stroke={arcColor}
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{
            transform: 'rotate(-90deg)',
            transformOrigin: 'center',
            transition: 'stroke-dashoffset 400ms var(--ease-out-expo), stroke 400ms var(--ease-out-expo)',
          }}
        />
        {/* Center flame icon (simplified) */}
        <path
          d="M12 8C12 8 14.5 10.5 14.5 12.5C14.5 13.88 13.38 15 12 15C10.62 15 9.5 13.88 9.5 12.5C9.5 10.5 12 8 12 8Z"
          fill="currentColor"
          stroke="none"
          opacity={0.3}
        />
      </IconBase>
    )
  },
)
IconCalorieBalance.displayName = 'IconCalorieBalance'
