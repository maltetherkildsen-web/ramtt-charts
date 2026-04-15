// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconCadenceOptimalContextProps extends IconProps {
  value?: number // 0-200 RPM
  zone?: [number, number] // [lo, hi] sweet spot range
}

export const IconCadenceOptimalContext = forwardRef<SVGSVGElement, IconCadenceOptimalContextProps>(
  ({ value, zone, ...props }, ref) => {
    // Map 0-200 to -120deg to +120deg
    const clamped = value != null ? Math.max(0, Math.min(200, value)) : 90
    const angle = -120 + (clamped / 200) * 240
    const inZone = zone && value != null && value >= zone[0] && value <= zone[1]

    // Zone arc (highlight the sweet spot)
    const zoneStartAngle = zone ? -120 + (zone[0] / 200) * 240 : 0
    const zoneEndAngle = zone ? -120 + (zone[1] / 200) * 240 : 0
    const zoneSweep = zoneEndAngle - zoneStartAngle

    return (
      <IconBase ref={ref} {...props}>
        {/* Track arc */}
        <path d="M4 18a9 9 0 1116 0" fill="none" stroke="var(--n200)" />
        {/* Zone highlight */}
        {zone && (
          <path
            d="M4 18a9 9 0 1116 0"
            fill="none"
            stroke={inZone ? 'var(--positive)' : 'currentColor'}
            strokeWidth="2.5"
            opacity={0.3}
            strokeDasharray={`${(zoneSweep / 240) * 56.5} ${56.5}`}
            strokeDashoffset={-((zoneStartAngle + 120) / 240) * 56.5}
            style={{ transition: 'stroke 200ms ease' }}
          />
        )}
        {/* Needle */}
        <line
          x1="12" y1="12" x2="12" y2="5"
          stroke={inZone ? 'var(--positive)' : 'currentColor'}
          strokeLinecap="round"
          style={{
            transform: `rotate(${angle}deg)`,
            transformOrigin: '12px 12px',
            transition: 'transform 400ms var(--ease-out-expo), stroke 200ms ease',
          }}
        />
        {/* Center */}
        <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      </IconBase>
    )
  },
)
IconCadenceOptimalContext.displayName = 'IconCadenceOptimalContext'
