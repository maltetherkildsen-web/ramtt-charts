// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconNerve = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <circle cx="7" cy="12" r="3"/>
    <path d="M10 12h8"/>
    <path d="M5 9L3 6M5 15l-2 3"/>
    <path d="M18 12l3-2.5M18 12h3M18 12l3 2.5"/>
  </IconBase>
))
IconNerve.displayName = 'IconNerve'
