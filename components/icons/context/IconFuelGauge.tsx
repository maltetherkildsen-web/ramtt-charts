// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'
import { getThresholdColor, HEALTH_THRESHOLDS, type Threshold } from './thresholds'

interface IconFuelGaugeProps extends IconProps {
  value?: number // 0-100
  thresholds?: Threshold[]
}

const R = 8
const CX = 12
const CY = 14
// Semi-circle arc length (180 degrees)
const ARC_LENGTH = Math.PI * R // ~25.13

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) }
}

// Arc from 180° (left) to 0° (right), sweeping through top
const ARC_START = 180
const ARC_END = 360

const start = polarToCartesian(CX, CY, R, ARC_START)
const end = polarToCartesian(CX, CY, R, ARC_END)
const ARC_D = `M ${start.x} ${start.y} A ${R} ${R} 0 0 1 ${end.x} ${end.y}`

export const IconFuelGauge = forwardRef<SVGSVGElement, IconFuelGaugeProps>(
  ({ value, thresholds, ...props }, ref) => {
    const clamped = value != null ? Math.max(0, Math.min(100, value)) : 0
    const offset = ARC_LENGTH * (1 - clamped / 100)
    const fillColor = value != null
      ? getThresholdColor(value, thresholds ?? HEALTH_THRESHOLDS)
      : 'currentColor'

    // Needle dot position along the arc
    const needleAngle = ARC_START + (clamped / 100) * (ARC_END - ARC_START)
    const needle = polarToCartesian(CX, CY, R, needleAngle)

    return (
      <IconBase ref={ref} {...props}>
        {/* Track */}
        <path d={ARC_D} fill="none" stroke="var(--n200)" />
        {/* Value arc */}
        {value != null && (
          <path
            d={ARC_D}
            fill="none"
            stroke={fillColor}
            strokeLinecap="round"
            strokeDasharray={ARC_LENGTH}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 400ms var(--ease-out-expo)' }}
          />
        )}
        {/* Needle dot */}
        {value != null && (
          <circle
            cx={needle.x}
            cy={needle.y}
            r={2}
            fill="currentColor"
            stroke="none"
          />
        )}
        {/* Center base dot */}
        <circle cx={CX} cy={CY} r={1.5} fill="currentColor" stroke="none" />
      </IconBase>
    )
  },
)
IconFuelGauge.displayName = 'IconFuelGauge'
