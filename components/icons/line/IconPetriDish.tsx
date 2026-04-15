// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconPetriDish = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <ellipse cx="12" cy="15" rx="8" ry="4"/>
    <path d="M4 13c0-1.7 3.6-3 8-3s8 1.3 8 3"/>
    <circle cx="10" cy="15.5" r=".75" fill="currentColor" stroke="none"/>
    <circle cx="14" cy="16" r=".75" fill="currentColor" stroke="none"/>
    <circle cx="12" cy="17" r=".75" fill="currentColor" stroke="none"/>
  </IconBase>
))
IconPetriDish.displayName = 'IconPetriDish'
