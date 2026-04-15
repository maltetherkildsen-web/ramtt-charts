// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconMentalToughness = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M12 2c-3 0-5 2-6 4s-1 4 0 6"/><path d="M12 2c3 0 5 2 6 4s1 4 0 6"/><path d="M12 14l-4 2v3c0 2 1.5 3.5 4 4 2.5-.5 4-2 4-4v-3l-4-2z"/>
  </IconBase>
))
IconMentalToughness.displayName = 'IconMentalToughness'
