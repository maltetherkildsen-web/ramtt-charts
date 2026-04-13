// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphSortAscDescProps extends MorphIconProps {
  state: 'asc' | 'desc'
}

export const IconMorphSortAscDesc = forwardRef<SVGSVGElement, IconMorphSortAscDescProps>(
  ({ state, ...props }, ref) => (
    <MorphBase ref={ref} {...props}>
      <g
        style={{
          transform: state === 'desc' ? 'rotate(180deg)' : 'rotate(0deg)',
          transformOrigin: 'center',
          transition: 'transform var(--morph-duration) var(--ease-out-expo)',
        }}
      >
        {/* Arrow pointing up */}
        <path d="M12 5L12 19" />
        <path d="M7 10L12 5L17 10" />
      </g>
    </MorphBase>
  ),
)
IconMorphSortAscDesc.displayName = 'IconMorphSortAscDesc'
