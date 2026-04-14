// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'
import { getThresholdColor, HEALTH_THRESHOLDS, type Threshold } from './thresholds'

interface IconTemperatureGaugeProps extends IconProps {
  value?: number // 0-100
  thresholds?: Threshold[]
}

// Thermometer tube: interior from y=5 to y=15, total height 10
const TUBE_TOP = 5
const TUBE_BOTTOM = 15
const TUBE_HEIGHT = TUBE_BOTTOM - TUBE_TOP

export const IconTemperatureGauge = forwardRef<SVGSVGElement, IconTemperatureGaugeProps>(
  ({ value, thresholds, ...props }, ref) => {
    const clamped = value != null ? Math.max(0, Math.min(100, value)) : 0
    const fillHeight = (clamped / 100) * TUBE_HEIGHT
    const fillY = TUBE_BOTTOM - fillHeight
    const fillColor = value != null
      ? getThresholdColor(value, thresholds ?? HEALTH_THRESHOLDS)
      : 'currentColor'

    return (
      <IconBase ref={ref} {...props}>
        {/* Thermometer tube */}
        <path
          d="M10 3C10 2.45 10.45 2 11 2H13C13.55 2 14 2.45 14 3V15.17C15.17 15.82 16 17.02 16 18.5C16 20.71 14.21 22 12 22C9.79 22 8 20.71 8 18.5C8 17.02 8.83 15.82 10 15.17V3Z"
          fill="none"
        />
        {/* Bulb circle (always visible) */}
        <circle cx="12" cy="18.5" r="2.5" fill="none" />
        {/* Mercury fill level */}
        {value != null && (
          <>
            <rect
              x={10.75}
              y={fillY}
              width={2.5}
              height={fillHeight + 2}
              rx={0.5}
              fill={fillColor}
              stroke="none"
              opacity={0.8}
              style={{ transition: 'y 300ms var(--ease-out-expo), height 300ms var(--ease-out-expo)' }}
            />
            {/* Filled bulb */}
            <circle
              cx="12"
              cy="18.5"
              r="2"
              fill={fillColor}
              stroke="none"
              opacity={0.8}
            />
          </>
        )}
        {/* Tick marks */}
        <path d="M15 6H16" stroke="var(--n200)" />
        <path d="M15 9H16" stroke="var(--n200)" />
        <path d="M15 12H16" stroke="var(--n200)" />
      </IconBase>
    )
  },
)
IconTemperatureGauge.displayName = 'IconTemperatureGauge'
