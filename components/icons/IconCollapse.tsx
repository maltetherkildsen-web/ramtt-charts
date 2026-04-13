// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from './IconBase'

export const IconCollapse = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M4 10H10V4" />
    <path d="M10 10L3 3" />
    <path d="M20 14H14V20" />
    <path d="M14 14L21 21" />
  </IconBase>
))
IconCollapse.displayName = 'IconCollapse'
