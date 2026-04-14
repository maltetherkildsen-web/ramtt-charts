// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconHRV = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M12 4C10.5 2.5 8 2 6 4s-1 5 6 9c7-4 7-7 6-9s-4.5-2.5-6 0Z"/>
    <path d="M3 18c1 0 1.5-2 3-2s2 3 3.5 3 2-4 3.5-4 1.5 2 3 2 2-3 4-3"/>
  </IconBase>
))
IconHRV.displayName = 'IconHRV'
