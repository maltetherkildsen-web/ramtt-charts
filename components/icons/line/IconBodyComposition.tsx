// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconBodyComposition = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <circle cx="12" cy="4" r="2"/>
    <path d="M9 9h6v6l1 7H8l1-7V9Z"/>
    <path d="M6 12h12"/>
    <path d="M7 17h10"/>
  </IconBase>
))
IconBodyComposition.displayName = 'IconBodyComposition'
