// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconPowerProfileContextProps extends IconProps {
  values?: [number, number, number, number, number] // sprint, anaerobic, VO2max, threshold, endurance (0-100)
}

// Pentagon vertices at 5 angles (top, then clockwise)
const ANGLES = [
  -Math.PI / 2,                    // top (sprint)
  -Math.PI / 2 + (2 * Math.PI / 5),  // upper right
  -Math.PI / 2 + (4 * Math.PI / 5),  // lower right
  -Math.PI / 2 + (6 * Math.PI / 5),  // lower left
  -Math.PI / 2 + (8 * Math.PI / 5),  // upper left
]

function getVertex(angle: number, radius: number): string {
  return `${12 + radius * Math.cos(angle)},${12 + radius * Math.sin(angle)}`
}

function polygonPoints(values: number[], maxR: number): string {
  return values.map((v, i) => {
    const r = 2 + (Math.max(0, Math.min(100, v)) / 100) * (maxR - 2)
    return getVertex(ANGLES[i], r)
  }).join(' ')
}

export const IconPowerProfileContext = forwardRef<SVGSVGElement, IconPowerProfileContextProps>(
  ({ values, ...props }, ref) => {
    const trackPoints = ANGLES.map(a => getVertex(a, 9)).join(' ')

    return (
      <IconBase ref={ref} {...props}>
        {/* Track (outer pentagon) */}
        <polygon points={trackPoints} fill="none" stroke="var(--n200)" />
        {/* Axis lines */}
        {ANGLES.map((a, i) => (
          <line key={i} x1="12" y1="12" x2={12 + 9 * Math.cos(a)} y2={12 + 9 * Math.sin(a)} stroke="var(--n200)" strokeWidth="0.5" />
        ))}
        {/* Data polygon */}
        {values && (
          <polygon
            points={polygonPoints(values, 9)}
            fill="currentColor"
            stroke="currentColor"
            fillOpacity={0.15}
            strokeWidth="1.5"
            strokeLinejoin="round"
            style={{ transition: 'all 400ms var(--ease-out-expo)' }}
          />
        )}
      </IconBase>
    )
  },
)
IconPowerProfileContext.displayName = 'IconPowerProfileContext'
