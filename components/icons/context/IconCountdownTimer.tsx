// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'
import { getThresholdColor, HEALTH_THRESHOLDS, type Threshold } from './thresholds'

interface IconCountdownTimerProps extends IconProps {
  seconds?: number // remaining
  total?: number   // total duration
  thresholds?: Threshold[]
}

const RADIUS = 9
const CIRCUMFERENCE = 2 * Math.PI * RADIUS // ~56.55

export const IconCountdownTimer = forwardRef<SVGSVGElement, IconCountdownTimerProps>(
  ({ seconds = 30, total = 60, thresholds, ...props }, ref) => {
    const safeTotal = Math.max(1, total)
    const ratio = Math.max(0, Math.min(1, seconds / safeTotal))
    const percentage = ratio * 100
    const offset = CIRCUMFERENCE * (1 - ratio)
    const arcColor = getThresholdColor(percentage, thresholds ?? HEALTH_THRESHOLDS)

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
        {/* Remaining time arc */}
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
            transition: 'stroke-dashoffset 400ms var(--ease-out-expo), stroke 400ms var(--ease-out-expo)',
          }}
        />
        {/* Center dot */}
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
        {/* 12-o'clock tick */}
        <path d="M12 2V4" />
      </IconBase>
    )
  },
)
IconCountdownTimer.displayName = 'IconCountdownTimer'
