// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphVolumeToggleProps extends MorphIconProps {
  state: 'on' | 'off'
}

// Matched command structures — speaker body stays, waves morph to X
const PATHS = {
  on: {
    speaker: 'M3 9 L7 9 L11 5 L11 19 L7 15 L3 15 Z',
    line1: 'M16 9 C17.66 10.34 17.66 13.66 16 15',
    line2: 'M19 6 C22.31 9.31 22.31 14.69 19 18',
  },
  off: {
    speaker: 'M3 9 L7 9 L11 5 L11 19 L7 15 L3 15 Z',
    line1: 'M16 9 L22 15',
    line2: 'M22 9 L16 15',
  },
}

const TRANSITION = 'd var(--morph-duration) var(--ease-out-expo)'

export const IconMorphVolumeToggle = forwardRef<SVGSVGElement, IconMorphVolumeToggleProps>(
  ({ state, ...props }, ref) => {
    const paths = PATHS[state]
    return (
      <MorphBase ref={ref} {...props}>
        <path d={paths.speaker} fill="none" />
        <path d={paths.line1} style={{ transition: TRANSITION }} fill="none" />
        <path d={paths.line2} style={{ transition: TRANSITION }} fill="none" />
      </MorphBase>
    )
  },
)
IconMorphVolumeToggle.displayName = 'IconMorphVolumeToggle'
