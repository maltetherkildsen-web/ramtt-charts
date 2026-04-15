// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconElectrolyteMix = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M7 4h10v14a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V4Z"/>
    <path d="M5 4h14"/>
    <circle cx="10" cy="13" r=".75" fill="currentColor" stroke="none"/>
    <circle cx="14" cy="11" r=".75" fill="currentColor" stroke="none"/>
  </IconBase>
))
IconElectrolyteMix.displayName = 'IconElectrolyteMix'
