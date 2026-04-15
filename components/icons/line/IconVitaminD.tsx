// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconVitaminD = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <rect x="7" y="8" width="10" height="14" rx="5"/>
    <path d="M7 15h10"/>
    <circle cx="12" cy="4" r="2"/>
  </IconBase>
))
IconVitaminD.displayName = 'IconVitaminD'
