// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconZone = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M3 21h18"/>
    <path d="M5 17h14"/>
    <path d="M7 13h10"/>
    <path d="M9 9h6"/>
    <path d="M11 5h2"/>
  </IconBase>
))
IconZone.displayName = 'IconZone'
