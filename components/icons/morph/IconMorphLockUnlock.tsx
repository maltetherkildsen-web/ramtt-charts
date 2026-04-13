// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphLockUnlockProps extends MorphIconProps {
  state: 'locked' | 'unlocked'
}

// Matched: body is M L L L Z, shackle is M L A L
const PATHS = {
  locked: {
    body: 'M6 11 L18 11 L18 20 L6 20 Z',
    shackle: 'M8 11 L8 7 A4 4 0 0 1 16 7 L16 11',
  },
  unlocked: {
    body: 'M6 11 L18 11 L18 20 L6 20 Z',
    shackle: 'M8 11 L8 7 A4 4 0 0 1 16 7 L16 5',
  },
}

const TRANSITION = 'd var(--morph-duration) var(--ease-out-expo)'

export const IconMorphLockUnlock = forwardRef<SVGSVGElement, IconMorphLockUnlockProps>(
  ({ state, ...props }, ref) => {
    const paths = PATHS[state]
    return (
      <MorphBase ref={ref} {...props}>
        <rect x="6" y="11" width="12" height="9" rx="1.5" />
        <path d={paths.shackle} style={{ transition: TRANSITION }} fill="none" />
      </MorphBase>
    )
  },
)
IconMorphLockUnlock.displayName = 'IconMorphLockUnlock'
