// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphSunMoonProps extends MorphIconProps {
  state: 'sun' | 'moon'
}

// Sun: circle center + 4 ray lines (8 paths total for matched structure)
// Moon: crescent achieved by morphing the same paths
// Both states: identical number of <path> elements with matched command structures

const PATHS = {
  sun: {
    body: 'M12 8 A4 4 0 0 1 12 16 A4 4 0 0 1 12 8',
    ray1: 'M12 2 L12 4',
    ray2: 'M12 20 L12 22',
    ray3: 'M4 12 L2 12',
    ray4: 'M20 12 L22 12',
    ray5: 'M6.34 6.34 L4.93 4.93',
    ray6: 'M17.66 17.66 L19.07 19.07',
    ray7: 'M6.34 17.66 L4.93 19.07',
    ray8: 'M17.66 6.34 L19.07 4.93',
  },
  moon: {
    body: 'M12 4 A8 8 0 0 1 12 20 A5 5 0 0 0 12 4',
    ray1: 'M12 12 L12 12',
    ray2: 'M12 12 L12 12',
    ray3: 'M12 12 L12 12',
    ray4: 'M12 12 L12 12',
    ray5: 'M12 12 L12 12',
    ray6: 'M12 12 L12 12',
    ray7: 'M12 12 L12 12',
    ray8: 'M12 12 L12 12',
  },
}

const TRANSITION = 'd var(--morph-duration) var(--ease-out-expo)'

export const IconMorphSunMoon = forwardRef<SVGSVGElement, IconMorphSunMoonProps>(
  ({ state, ...props }, ref) => {
    const paths = PATHS[state]
    return (
      <MorphBase ref={ref} {...props}>
        <path d={paths.body} style={{ transition: TRANSITION }} />
        <path d={paths.ray1} style={{ transition: TRANSITION }} />
        <path d={paths.ray2} style={{ transition: TRANSITION }} />
        <path d={paths.ray3} style={{ transition: TRANSITION }} />
        <path d={paths.ray4} style={{ transition: TRANSITION }} />
        <path
          d={paths.ray5}
          style={{
            transition: `${TRANSITION}, opacity var(--morph-duration) var(--ease-out-expo)`,
            opacity: state === 'moon' ? 0 : 1,
          }}
        />
        <path
          d={paths.ray6}
          style={{
            transition: `${TRANSITION}, opacity var(--morph-duration) var(--ease-out-expo)`,
            opacity: state === 'moon' ? 0 : 1,
          }}
        />
        <path
          d={paths.ray7}
          style={{
            transition: `${TRANSITION}, opacity var(--morph-duration) var(--ease-out-expo)`,
            opacity: state === 'moon' ? 0 : 1,
          }}
        />
        <path
          d={paths.ray8}
          style={{
            transition: `${TRANSITION}, opacity var(--morph-duration) var(--ease-out-expo)`,
            opacity: state === 'moon' ? 0 : 1,
          }}
        />
      </MorphBase>
    )
  },
)
IconMorphSunMoon.displayName = 'IconMorphSunMoon'
