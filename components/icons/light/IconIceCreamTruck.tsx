// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconIceCreamTruck = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M8 11l4 11 4-11"/><circle cx="12" cy="7" r="4"/><path d="M8.5 8c-.5 1.5-1.5 2-3 2"/><path d="M15.5 8c.5 1.5 1.5 2 3 2"/><path d="M10 5.5c-.5-.5-1-1.5 0-2.5"/>
  </IconBaseLight>
))
IconIceCreamTruck.displayName = 'IconIceCreamTruck'
