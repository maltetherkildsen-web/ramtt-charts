// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphStarToggleProps extends MorphIconProps {
  state: 'empty' | 'filled'
}

// 5-point star — same path for both states, fill opacity toggles
const STAR_D =
  'M12 2 L14.94 8.06 L21.56 9.02 L16.78 13.64 L17.89 20.24 L12 17.18 L6.11 20.24 L7.22 13.64 L2.44 9.02 L9.06 8.06 Z'

export const IconMorphStarToggle = forwardRef<SVGSVGElement, IconMorphStarToggleProps>(
  ({ state, ...props }, ref) => (
    <MorphBase ref={ref} {...props}>
      <path
        d={STAR_D}
        fill={state === 'filled' ? 'currentColor' : 'none'}
        style={{
          transition: `fill-opacity var(--morph-duration) var(--ease-out-expo)`,
          fillOpacity: state === 'filled' ? 1 : 0,
        }}
      />
    </MorphBase>
  ),
)
IconMorphStarToggle.displayName = 'IconMorphStarToggle'
