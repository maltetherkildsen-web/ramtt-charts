// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconZone = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M3 21h18"/>
    <path d="M5 17h14"/>
    <path d="M7 13h10"/>
    <path d="M9 9h6"/>
    <path d="M11 5h2"/>
  </IconBaseLight>
))
IconZone.displayName = 'IconZone'
