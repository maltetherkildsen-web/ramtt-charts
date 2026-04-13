// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphPlayPauseProps extends MorphIconProps {
  state: 'play' | 'pause'
}

// Both states: 2 paths with identical M L L L Z structure (4 points each)
const PATHS = {
  play: {
    left: 'M8 5 L8 19 L13 16 L13 8 Z',
    right: 'M13 8 L13 16 L19 12 L19 12 Z',
  },
  pause: {
    left: 'M7 5 L7 19 L10 19 L10 5 Z',
    right: 'M14 5 L14 19 L17 19 L17 5 Z',
  },
}

const TRANSITION = 'd var(--morph-duration) var(--ease-out-expo)'

export const IconMorphPlayPause = forwardRef<SVGSVGElement, IconMorphPlayPauseProps>(
  ({ state, ...props }, ref) => {
    const paths = PATHS[state]
    return (
      <MorphBase ref={ref} {...props}>
        <path
          d={paths.left}
          fill="currentColor"
          stroke="none"
          style={{ transition: TRANSITION }}
        />
        <path
          d={paths.right}
          fill="currentColor"
          stroke="none"
          style={{ transition: TRANSITION }}
        />
      </MorphBase>
    )
  },
)
IconMorphPlayPause.displayName = 'IconMorphPlayPause'
