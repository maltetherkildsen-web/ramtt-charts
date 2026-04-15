// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconStreak = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M12 22c-4 0-6-3.5-6-7 0-4 3-6 4-9 .5 2 2 3 2 3s2-3 2-5c2 3 4 5 4 8 0 5-2 10-6 10z"/><path d="M12 22c-1.5 0-3-1.5-3-4 0-2 1.5-3.5 3-5 1.5 1.5 3 3 3 5s-1.5 4-3 4z"/>
  </IconBase>
))
IconStreak.displayName = 'IconStreak'
