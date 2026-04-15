// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'
import { getThresholdColor, type Threshold } from './thresholds'

interface IconGaugeContextProps extends IconProps {
  value?: number // 0-100
  thresholds?: Threshold[]
}

export const IconGaugeContext = forwardRef<SVGSVGElement, IconGaugeContextProps>(
  ({ value, thresholds, ...props }, ref) => {
    const clamped = value != null ? Math.max(0, Math.min(100, value)) : 50
    // Map 0-100 to -120deg to +120deg (240deg sweep)
    const angle = -120 + (clamped / 100) * 240
    const needleColor = value != null && thresholds
      ? getThresholdColor(value, thresholds)
      : 'currentColor'

    return (
      <IconBase ref={ref} {...props}>
        {/* Arc track */}
        <path d="M4 18a9 9 0 1116 0" fill="none" stroke="var(--n200)" />
        {/* Needle */}
        <line
          x1="12"
          y1="12"
          x2="12"
          y2="5"
          stroke={needleColor}
          strokeLinecap="round"
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: '12px 12px',
            transition: 'transform 400ms var(--ease-out-expo)',
          }}
        />
        {/* Center dot */}
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </IconBase>
    )
  },
)
IconGaugeContext.displayName = 'IconGaugeContext'
