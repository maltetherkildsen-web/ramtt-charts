// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconMoodIndicatorProps extends IconProps {
  mood?: 1 | 2 | 3 | 4 | 5
}

// Mouth paths: Q bezier from left to right with control point Y determining curve
// mood 1 = deep frown, mood 3 = flat, mood 5 = big smile
const MOUTH_PATHS: Record<number, string> = {
  1: 'M8 17 Q12 13 16 17',  // Frown (control point above = inverted curve)
  2: 'M8 16 Q12 14.5 16 16', // Slight frown
  3: 'M8 16 Q12 16 16 16',   // Neutral (flat line)
  4: 'M8 15 Q12 17.5 16 15', // Slight smile
  5: 'M8 14 Q12 19 16 14',   // Big smile
}

export const IconMoodIndicator = forwardRef<SVGSVGElement, IconMoodIndicatorProps>(
  ({ mood = 3, ...props }, ref) => {
    const mouthD = MOUTH_PATHS[mood] ?? MOUTH_PATHS[3]

    return (
      <IconBase ref={ref} {...props}>
        {/* Face circle */}
        <circle cx="12" cy="12" r="9" />
        {/* Left eye */}
        <circle cx="9" cy="10" r="1" fill="currentColor" stroke="none" />
        {/* Right eye */}
        <circle cx="15" cy="10" r="1" fill="currentColor" stroke="none" />
        {/* Mouth — transitions between shapes */}
        <path
          d={mouthD}
          fill="none"
          style={{ transition: 'd 300ms var(--ease-out-expo)' }}
        />
      </IconBase>
    )
  },
)
IconMoodIndicator.displayName = 'IconMoodIndicator'
