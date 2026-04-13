// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphThumbUpDownProps extends MorphIconProps {
  state: 'up' | 'down'
}

export const IconMorphThumbUpDown = forwardRef<SVGSVGElement, IconMorphThumbUpDownProps>(
  ({ state, ...props }, ref) => (
    <MorphBase ref={ref} {...props}>
      <g
        style={{
          transform: state === 'down' ? 'rotate(180deg)' : 'rotate(0deg)',
          transformOrigin: 'center',
          transition: 'transform var(--morph-duration) var(--ease-out-expo)',
        }}
      >
        {/* Thumb up shape */}
        <path d="M7 12L10 4C10 4 11.5 4 11.5 6V10H18C18 10 19.5 10 19 13L17.5 19H10L7 12Z" />
        <path d="M7 12V19H4V12H7Z" />
      </g>
    </MorphBase>
  ),
)
IconMorphThumbUpDown.displayName = 'IconMorphThumbUpDown'
