// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconTendon = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M4 3h5"/>
    <path d="M15 21h5"/>
    <path d="M7 3c2 4 5 9 7 12s4 4 6 6"/>
    <path d="M5 3c2 4 5 9 7 12s5 4 7 6"/>
  </IconBase>
))
IconTendon.displayName = 'IconTendon'
