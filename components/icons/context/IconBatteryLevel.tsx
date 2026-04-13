// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'
import { getThresholdColor, HEALTH_THRESHOLDS, type Threshold } from './thresholds'

interface IconBatteryLevelProps extends IconProps {
  value?: number // 0-100
  thresholds?: Threshold[]
}

export const IconBatteryLevel = forwardRef<SVGSVGElement, IconBatteryLevelProps>(
  ({ value, thresholds, ...props }, ref) => {
    // Battery interior: x 4.5 to 17.5 => width 13
    const interiorWidth = 13
    const fillWidth = value != null ? (Math.max(0, Math.min(100, value)) / 100) * interiorWidth : 0
    const fillColor = value != null ? getThresholdColor(value, thresholds ?? HEALTH_THRESHOLDS) : undefined

    return (
      <IconBase ref={ref} {...props}>
        {/* Battery body */}
        <rect x="3" y="8" width="16" height="8" rx="1.5" />
        {/* Terminal nub */}
        <rect x="19" y="10" width="2" height="4" rx="0.5" fill="currentColor" stroke="none" />
        {/* Fill level */}
        {value != null && value > 0 && (
          <rect
            x={4.5}
            y={9.5}
            width={fillWidth}
            height={5}
            rx={0.5}
            fill={fillColor}
            stroke="none"
            opacity={0.8}
            style={{ transition: 'width 300ms var(--ease-out-expo)' }}
          />
        )}
      </IconBase>
    )
  },
)
IconBatteryLevel.displayName = 'IconBatteryLevel'
