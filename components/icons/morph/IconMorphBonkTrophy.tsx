// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphBonkTrophyProps extends MorphIconProps {
  state: 'bonk' | 'trophy'
}

// Structurally different — use opacity crossfade with scale (MorphVariant pattern)
export const IconMorphBonkTrophy = forwardRef<SVGSVGElement, IconMorphBonkTrophyProps>(
  ({ state, ...props }, ref) => {
    const transition = 'opacity var(--morph-duration) ease, transform var(--morph-duration) ease'
    const isBonk = state === 'bonk'
    return (
      <MorphBase ref={ref} {...props}>
        <g style={{ opacity: isBonk ? 1 : 0, transform: isBonk ? 'scale(1)' : 'scale(0.85)', transformOrigin: 'center', transition }}>
          <rect x="4" y="7" width="14" height="10" rx="2" />
          <path d="M20 11v2" />
          <path d="M11 7l-1.5 5h3L11 17" />
        </g>
        <g style={{ opacity: isBonk ? 0 : 1, transform: isBonk ? 'scale(0.85)' : 'scale(1)', transformOrigin: 'center', transition }}>
          <path d="M6 4h12v6a6 6 0 01-12 0V4z" />
          <path d="M6 7H4a2 2 0 00-2 2v1a3 3 0 003 3h1.1" />
          <path d="M18 7h2a2 2 0 012 2v1a3 3 0 01-3 3h-1.1" />
          <path d="M9 17h6" />
          <path d="M10 21h4" />
          <path d="M12 14v3" />
        </g>
      </MorphBase>
    )
  },
)
IconMorphBonkTrophy.displayName = 'IconMorphBonkTrophy'
