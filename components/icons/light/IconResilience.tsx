// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconResilience = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M3 8c0 8 4 11 9 11s9-3 9-11"/>
    <path d="M17 4l4 4-4 4"/>
  </IconBaseLight>
))
IconResilience.displayName = 'IconResilience'
