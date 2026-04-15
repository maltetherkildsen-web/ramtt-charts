// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconTransition = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <rect x="2" y="7" width="6" height="10" rx="1"/>
    <rect x="16" y="7" width="6" height="10" rx="1"/>
    <path d="M8 12h8"/>
    <path d="M13 9l3 3-3 3"/>
  </IconBase>
))
IconTransition.displayName = 'IconTransition'
