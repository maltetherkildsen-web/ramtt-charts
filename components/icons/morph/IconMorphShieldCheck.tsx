// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphShieldCheckProps extends MorphIconProps {
  state: 'shield' | 'checked'
}

// Check grows from collapsed center point to full checkmark
const PATHS = {
  shield:  'M12 12 L12 12 L12 12',
  checked: 'M9 12 L11 14 L15 10',
}

const TRANSITION = 'd var(--morph-duration) var(--ease-out-expo)'

export const IconMorphShieldCheck = forwardRef<SVGSVGElement, IconMorphShieldCheckProps>(
  ({ state, ...props }, ref) => (
    <MorphBase ref={ref} {...props}>
      <path d="M12 2.5L4 6.5v5c0 5.5 3.4 10.2 8 11.5 4.6-1.3 8-6 8-11.5v-5L12 2.5z" />
      <path d={PATHS[state]} style={{ transition: TRANSITION }} />
    </MorphBase>
  ),
)
IconMorphShieldCheck.displayName = 'IconMorphShieldCheck'
