// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphSunriseSunsetProps extends MorphIconProps {
  state: 'sunrise' | 'sunset'
}

// Sun moves up (sunrise) or down (sunset) — vertical path morphs
const PATHS = {
  sunrise: {
    ray: 'M12 2 L12 6',
    arc: 'M5 20 A7 7 0 0 1 19 20',
  },
  sunset: {
    ray: 'M12 8 L12 12',
    arc: 'M5 20 A7 7 0 0 1 19 20',
  },
}

const TRANSITION = 'd var(--morph-duration) var(--ease-out-expo)'

export const IconMorphSunriseSunset = forwardRef<SVGSVGElement, IconMorphSunriseSunsetProps>(
  ({ state, ...props }, ref) => {
    const p = PATHS[state]
    return (
      <MorphBase ref={ref} {...props}>
        <path d={p.ray} style={{ transition: TRANSITION }} />
        <path d="M4.93 5.93l2.83 2.83" />
        <path d="M19.07 5.93l-2.83 2.83" />
        <path d="M2 16h20" />
        <path d={p.arc} style={{ transition: TRANSITION }} />
      </MorphBase>
    )
  },
)
IconMorphSunriseSunset.displayName = 'IconMorphSunriseSunset'
