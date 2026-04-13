// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, useMemo } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconZoneIndicatorProps extends IconProps {
  zone?: number // 1-6
}

function zoneWavePath(zone: number): string {
  const clamped = Math.max(1, Math.min(6, zone))
  const amplitude = 2 + clamped * 1.2
  const frequency = 0.8 + clamped * 0.5
  const points: string[] = []

  for (let x = 3; x <= 21; x += 0.5) {
    const progress = (x - 3) / 18
    const y = 12 - amplitude * Math.sin(progress * frequency * Math.PI * 2)
    points.push(`${x},${y.toFixed(1)}`)
  }

  return `M${points.join(' L')}`
}

// Default: Z3 (moderate wave)
const DEFAULT_PATH = zoneWavePath(3)

export const IconZoneIndicator = forwardRef<SVGSVGElement, IconZoneIndicatorProps>(
  ({ zone, ...props }, ref) => {
    const path = useMemo(
      () => (zone != null ? zoneWavePath(zone) : DEFAULT_PATH),
      [zone],
    )

    return (
      <IconBase ref={ref} {...props}>
        <path d={path} fill="none" />
      </IconBase>
    )
  },
)
IconZoneIndicator.displayName = 'IconZoneIndicator'
