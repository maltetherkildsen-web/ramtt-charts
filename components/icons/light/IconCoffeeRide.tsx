// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconCoffeeRide = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="12" cy="15" r="7"/><circle cx="12" cy="15" r="2"/><path d="M8 6h5v3a2 2 0 01-2 2H9"/><path d="M13 7h1.5a1.5 1.5 0 010 3H13"/><path d="M9 4v1"/><path d="M11 3.5v1.5"/>
  </IconBaseLight>
))
IconCoffeeRide.displayName = 'IconCoffeeRide'
