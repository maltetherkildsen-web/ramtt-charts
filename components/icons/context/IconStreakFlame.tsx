// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef, useMemo } from 'react'
import { IconBase, type IconProps } from '../IconBase'

interface IconStreakFlameProps extends IconProps {
  days?: number
}

// 4 tiers of flame paths — each a distinct drawing, not a scaled version
const FLAME_TIERS = {
  // 1-3 days: tiny flicker, small teardrop centered
  flicker: 'M12 16C12 16 10 13 10 11.5C10 10.1 10.9 9 12 9C13.1 9 14 10.1 14 11.5C14 13 12 16 12 16Z',
  // 4-7 days: small clean flame
  small: 'M12 18C12 18 8 13.5 8 10.5C8 8 9.8 6 12 6C14.2 6 16 8 16 10.5C16 13.5 12 18 12 18Z',
  // 8-20 days: medium flame with inner flicker
  medium: {
    outer: 'M12 19C12 19 7 14 7 10C7 7 9.2 5 12 5C14.8 5 17 7 17 10C17 14 12 19 12 19Z',
    inner: 'M12 18C12 18 10 15 10 12.5C10 11 10.9 10 12 10C13.1 10 14 11 14 12.5C14 15 12 18 12 18Z',
  },
  // 21+ days: roaring two-layer flame with curl
  roaring: {
    outer: 'M12 20C12 20 6 14 6 9.5C6 6.5 8.7 4 12 4C15.3 4 18 6.5 18 9.5C18 14 12 20 12 20Z',
    inner: 'M12 19C12 19 9 15 9 12C9 10 10.3 9 12 9C13.7 9 15 10 15 12C15 15 12 19 12 19Z',
    glow: true,
  },
}

function getTier(days: number) {
  if (days >= 21) return 'roaring'
  if (days >= 8) return 'medium'
  if (days >= 4) return 'small'
  return 'flicker'
}

export const IconStreakFlame = forwardRef<SVGSVGElement, IconStreakFlameProps>(
  ({ days, ...props }, ref) => {
    const tier = useMemo(() => getTier(days ?? 1), [days])

    return (
      <IconBase ref={ref} {...props}>
        {tier === 'flicker' && (
          <path d={FLAME_TIERS.flicker} fill="none" />
        )}
        {tier === 'small' && (
          <path d={FLAME_TIERS.small} fill="none" />
        )}
        {tier === 'medium' && (
          <>
            <path d={FLAME_TIERS.medium.outer} fill="none" />
            <path d={FLAME_TIERS.medium.inner} fill="none" opacity={0.5} />
          </>
        )}
        {tier === 'roaring' && (
          <>
            {/* Glow behind */}
            <path
              d={FLAME_TIERS.roaring.outer}
              fill="none"
              stroke="currentColor"
              opacity={0.15}
              strokeWidth={4}
            />
            <path d={FLAME_TIERS.roaring.outer} fill="none" />
            <path d={FLAME_TIERS.roaring.inner} fill="none" opacity={0.5} />
          </>
        )}
      </IconBase>
    )
  },
)
IconStreakFlame.displayName = 'IconStreakFlame'
