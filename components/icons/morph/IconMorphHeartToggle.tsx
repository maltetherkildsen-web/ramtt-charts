// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphHeartToggleProps extends MorphIconProps {
  state: 'empty' | 'filled'
}

// Heart outline — same path for both states, fill opacity toggles
const HEART_D =
  'M12 21.35 C12 21.35 4 14.36 4 8.5 C4 5.42 6.42 3 9.5 3 C11.24 3 12 4.18 12 4.18 C12 4.18 12.76 3 14.5 3 C17.58 3 20 5.42 20 8.5 C20 14.36 12 21.35 12 21.35'

export const IconMorphHeartToggle = forwardRef<SVGSVGElement, IconMorphHeartToggleProps>(
  ({ state, ...props }, ref) => (
    <MorphBase ref={ref} {...props}>
      <path
        d={HEART_D}
        fill={state === 'filled' ? 'currentColor' : 'none'}
        style={{
          transition: `fill-opacity var(--morph-duration) var(--ease-out-expo)`,
          fillOpacity: state === 'filled' ? 1 : 0,
        }}
      />
    </MorphBase>
  ),
)
IconMorphHeartToggle.displayName = 'IconMorphHeartToggle'
