// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconHydration = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M7 10c0-1 .5-2 2-2h6c1.5 0 2 1 2 2v10a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V10Z"/>
    <path d="M10 5h4v3h-4V5Z"/>
    <path d="M11 2h2v3h-2Z"/>
    <path d="M7 15h10"/>
  </IconBase>
))
IconHydration.displayName = 'IconHydration'
