// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconYogurt = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M6 6h12l-1.5 14H7.5L6 6z"/><path d="M4 6h16"/><path d="M18 4c1 0 2 .5 2 1.5S19 7 18 7"/><path d="M9 10h6" opacity="0.3"/>
  </IconBase>
))
IconYogurt.displayName = 'IconYogurt'
