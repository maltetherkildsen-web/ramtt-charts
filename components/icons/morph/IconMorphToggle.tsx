// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphToggleProps extends MorphIconProps {
  state: 'on' | 'off'
}

// Pill stays constant, circle slides left ↔ right
const CX = { on: 17, off: 7 }

export const IconMorphToggle = forwardRef<SVGSVGElement, IconMorphToggleProps>(
  ({ state, ...props }, ref) => (
    <MorphBase ref={ref} {...props}>
      <rect x="1" y="6" width="22" height="12" rx="6" />
      <circle
        cx={CX[state]}
        cy={12}
        r={3}
        fill="currentColor"
        stroke="none"
        style={{ transition: 'cx var(--morph-duration) var(--ease-out-expo)' }}
      />
    </MorphBase>
  ),
)
IconMorphToggle.displayName = 'IconMorphToggle'
