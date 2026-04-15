// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconNuts = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <ellipse cx="8" cy="12" rx="4" ry="5" transform="rotate(-15 8 12)"/><ellipse cx="16" cy="11" rx="3.5" ry="4.5" transform="rotate(10 16 11)"/><path d="M11 16c1.5 1 3 1.5 5 1"/>
  </IconBase>
))
IconNuts.displayName = 'IconNuts'
