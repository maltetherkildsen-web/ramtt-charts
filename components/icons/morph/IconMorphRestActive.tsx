// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

'use client'

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphRestActiveProps extends MorphIconProps {
  state: 'rest' | 'active'
}

// CouchPotato ↔ Running — opacity crossfade
export const IconMorphRestActive = forwardRef<SVGSVGElement, IconMorphRestActiveProps>(
  ({ state, ...props }, ref) => {
    const transition = 'opacity var(--morph-duration) ease, transform var(--morph-duration) ease'
    const isRest = state === 'rest'
    return (
      <MorphBase ref={ref} {...props}>
        <g style={{ opacity: isRest ? 1 : 0, transform: isRest ? 'scale(1)' : 'scale(0.85)', transformOrigin: 'center', transition }}>
          <path d="M3 14h18v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4z" />
          <path d="M5 14V10a2 2 0 012-2h10a2 2 0 012 2v4" />
          <circle cx="12" cy="5" r="2" />
          <path d="M9 14c0-1.5 1-2 3-2s3 .5 3 2" />
        </g>
        <g style={{ opacity: isRest ? 0 : 1, transform: isRest ? 'scale(0.85)' : 'scale(1)', transformOrigin: 'center', transition }}>
          <circle cx="15" cy="4" r="2" />
          <path d="M7 22l4-7" />
          <path d="M11 15l4-2 2 5" />
          <path d="M11 15l-3-4 4-3" />
          <path d="M4 17l4.5-2" />
          <path d="M16 9l-4 4" />
        </g>
      </MorphBase>
    )
  },
)
IconMorphRestActive.displayName = 'IconMorphRestActive'
