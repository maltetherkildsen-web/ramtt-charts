// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconCentrifuge = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <circle cx="12" cy="12" r="9"/>
    <circle cx="12" cy="12" r="2"/>
    <circle cx="12" cy="6" r="1.5"/>
    <circle cx="6.8" cy="15.5" r="1.5"/>
    <circle cx="17.2" cy="15.5" r="1.5"/>
  </IconBaseLight>
))
IconCentrifuge.displayName = 'IconCentrifuge'
