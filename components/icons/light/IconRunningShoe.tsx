// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconRunningShoe = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M2 17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2H2Z"/>
    <path d="M4 17v-5a2 2 0 0 1 2-2h4l4 3h6v4"/>
    <path d="M9 12h3"/>
  </IconBaseLight>
))
IconRunningShoe.displayName = 'IconRunningShoe'
