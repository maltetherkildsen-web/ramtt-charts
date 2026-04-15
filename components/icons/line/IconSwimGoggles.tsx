// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconSwimGoggles = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <circle cx="8" cy="12" r="3"/>
    <circle cx="16" cy="12" r="3"/>
    <path d="M11 12h2"/>
    <path d="M5 12H3M19 12h2"/>
  </IconBase>
))
IconSwimGoggles.displayName = 'IconSwimGoggles'
