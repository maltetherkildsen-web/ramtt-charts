// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphEyeToggleProps extends MorphIconProps {
  state: 'eye' | 'eyeOff'
}

// Matched cubic bezier structures for smooth CSS d transition
// Upper lid, lower lid, iris/strike — all using C commands
const PATHS = {
  eye: {
    upper: 'M2 12 C2 12 6 5 12 5 C18 5 22 12 22 12',
    lower: 'M2 12 C2 12 6 19 12 19 C18 19 22 12 22 12',
    iris: 'M12 9 C13.7 9 15 10.3 15 12 C15 13.7 13.7 15 12 15 C10.3 15 9 13.7 9 12 C9 10.3 10.3 9 12 9',
  },
  eyeOff: {
    upper: 'M2 12 C2 12 6 10 12 10 C18 10 22 12 22 12',
    lower: 'M2 12 C2 12 6 14 12 14 C18 14 22 12 22 12',
    // Iris morphs into a diagonal strike-through (as a degenerate circle)
    iris: 'M4 4 C8 8 12 12 12 12 C12 12 16 16 20 20 C20 20 20 20 20 20 C20 20 8 8 4 4',
  },
}

const TRANSITION = 'd var(--morph-duration) var(--ease-out-expo)'

export const IconMorphEyeToggle = forwardRef<SVGSVGElement, IconMorphEyeToggleProps>(
  ({ state, ...props }, ref) => {
    const paths = PATHS[state]
    return (
      <MorphBase ref={ref} {...props}>
        <path d={paths.upper} style={{ transition: TRANSITION }} fill="none" />
        <path d={paths.lower} style={{ transition: TRANSITION }} fill="none" />
        <path d={paths.iris} style={{ transition: TRANSITION }} fill="none" />
      </MorphBase>
    )
  },
)
IconMorphEyeToggle.displayName = 'IconMorphEyeToggle'
