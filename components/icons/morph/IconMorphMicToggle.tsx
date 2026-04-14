// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphMicToggleProps extends MorphIconProps {
  state: 'on' | 'off'
}

// Matched command structures for both states
const PATHS = {
  on: {
    body: 'M12 2 C10.34 2 9 3.34 9 5 L9 12 C9 13.66 10.34 15 12 15 C13.66 15 15 13.66 15 12 L15 5 C15 3.34 13.66 2 12 2',
    pickup: 'M19 10 L19 12 C19 15.87 15.87 19 12 19 C8.13 19 5 15.87 5 12 L5 10',
    stand: 'M12 19 L12 22',
    base: 'M9 22 L15 22',
    strike: 'M4 4 L4 4',
  },
  off: {
    body: 'M12 2 C10.34 2 9 3.34 9 5 L9 12 C9 13.66 10.34 15 12 15 C13.66 15 15 13.66 15 12 L15 5 C15 3.34 13.66 2 12 2',
    pickup: 'M19 10 L19 12 C19 15.87 15.87 19 12 19 C8.13 19 5 15.87 5 12 L5 10',
    stand: 'M12 19 L12 22',
    base: 'M9 22 L15 22',
    strike: 'M4 4 L20 20',
  },
}

const TRANSITION = 'd var(--morph-duration) var(--ease-out-expo)'

export const IconMorphMicToggle = forwardRef<SVGSVGElement, IconMorphMicToggleProps>(
  ({ state, ...props }, ref) => {
    const paths = PATHS[state]
    return (
      <MorphBase ref={ref} {...props}>
        <path
          d={paths.body}
          style={{ transition: TRANSITION }}
          fill="none"
          opacity={state === 'off' ? 0.4 : 1}
        />
        <path
          d={paths.pickup}
          style={{ transition: TRANSITION }}
          fill="none"
          opacity={state === 'off' ? 0.4 : 1}
        />
        <path d={paths.stand} style={{ transition: TRANSITION }} />
        <path d={paths.base} style={{ transition: TRANSITION }} />
        <path
          d={paths.strike}
          style={{
            transition: `${TRANSITION}, opacity var(--morph-duration) var(--ease-out-expo)`,
            opacity: state === 'off' ? 1 : 0,
          }}
          strokeWidth={2}
        />
      </MorphBase>
    )
  },
)
IconMorphMicToggle.displayName = 'IconMorphMicToggle'
