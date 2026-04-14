// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconResilience = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M3 8c0 8 4 11 9 11s9-3 9-11"/>
    <path d="M17 4l4 4-4 4"/>
  </IconBase>
))
IconResilience.displayName = 'IconResilience'
