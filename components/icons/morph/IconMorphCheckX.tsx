// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphCheckXProps extends MorphIconProps {
  state: 'check' | 'x'
}

// Matched structure: both paths have M L L
const PATHS = {
  check: {
    a: 'M5 12 L10 17 L19 7',
    b: 'M19 7 L19 7 L19 7',
  },
  x: {
    a: 'M6 6 L12 12 L18 18',
    b: 'M18 6 L12 12 L6 18',
  },
}

const TRANSITION = 'd var(--morph-duration) var(--ease-out-expo)'

export const IconMorphCheckX = forwardRef<SVGSVGElement, IconMorphCheckXProps>(
  ({ state, ...props }, ref) => {
    const paths = PATHS[state]
    return (
      <MorphBase ref={ref} {...props}>
        <path d={paths.a} style={{ transition: TRANSITION }} />
        <path
          d={paths.b}
          style={{
            transition: `${TRANSITION}, opacity var(--morph-duration) var(--ease-out-expo)`,
            opacity: state === 'check' ? 0 : 1,
          }}
        />
      </MorphBase>
    )
  },
)
IconMorphCheckX.displayName = 'IconMorphCheckX'
