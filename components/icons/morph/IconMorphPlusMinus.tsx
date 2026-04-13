// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { MorphBase, type MorphIconProps } from './MorphBase'

interface IconMorphPlusMinusProps extends MorphIconProps {
  state: 'plus' | 'minus'
}

const PATHS = {
  horizontal: 'M5 12 L19 12',
  plus: 'M12 5 L12 19',
  minus: 'M12 12 L12 12',
}

export const IconMorphPlusMinus = forwardRef<SVGSVGElement, IconMorphPlusMinusProps>(
  ({ state, ...props }, ref) => (
    <MorphBase ref={ref} {...props}>
      <path d={PATHS.horizontal} />
      <path
        d={state === 'plus' ? PATHS.plus : PATHS.minus}
        style={{ transition: 'd var(--morph-duration) var(--ease-out-expo)' }}
      />
    </MorphBase>
  ),
)
IconMorphPlusMinus.displayName = 'IconMorphPlusMinus'
