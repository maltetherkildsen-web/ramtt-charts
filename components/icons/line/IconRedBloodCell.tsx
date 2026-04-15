// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconRedBloodCell = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <ellipse cx="12" cy="12" rx="9" ry="5"/>
    <ellipse cx="12" cy="12" rx="4" ry="2"/>
  </IconBase>
))
IconRedBloodCell.displayName = 'IconRedBloodCell'
