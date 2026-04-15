// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconIronSupplement = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <circle cx="12" cy="12" r="7"/>
    <path d="M5 12h14"/>
    <circle cx="10" cy="9.5" r=".75" fill="currentColor" stroke="none"/>
    <circle cx="14" cy="9.5" r=".75" fill="currentColor" stroke="none"/>
  </IconBase>
))
IconIronSupplement.displayName = 'IconIronSupplement'
