// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'
import { getThresholdColor, HEALTH_THRESHOLDS, type Threshold } from './thresholds'

interface IconGlycogenLevelProps extends IconProps {
  value?: number // 0-100
  thresholds?: Threshold[]
}

export const IconGlycogenLevel = forwardRef<SVGSVGElement, IconGlycogenLevelProps>(
  ({ value, thresholds, ...props }, ref) => {
    // Tank interior: y 9.5 to 14.5 => height 5
    const interiorHeight = 5
    const fillHeight = value != null ? (Math.max(0, Math.min(100, value)) / 100) * interiorHeight : 0
    const fillColor = value != null ? getThresholdColor(value, thresholds ?? HEALTH_THRESHOLDS) : undefined

    return (
      <IconBase ref={ref} {...props}>
        {/* Battery/tank body */}
        <rect x="3" y="8" width="16" height="8" rx="2" />
        {/* Terminal nub */}
        <path d="M19 11H21V13H19" />
        {/* Fill level — grows from bottom */}
        {value != null && value > 0 && (
          <rect
            x={4.5}
            y={14.5 - fillHeight}
            width={13}
            height={fillHeight}
            rx={0.5}
            fill={fillColor}
            stroke="none"
            opacity={0.8}
            style={{ transition: 'height 400ms var(--ease-out-expo), y 400ms var(--ease-out-expo)' }}
          />
        )}
      </IconBase>
    )
  },
)
IconGlycogenLevel.displayName = 'IconGlycogenLevel'
