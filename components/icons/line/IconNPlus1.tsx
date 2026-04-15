// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconNPlus1 = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="6" cy="16" r="3"/><circle cx="16" cy="16" r="3"/><path d="M6 16l3-6h4l2 6"/><path d="M9 10l5 6"/><path d="M18 4h4"/><path d="M20 2v4"/><circle cx="20" cy="4" r="3.5" strokeDasharray="2 1.5"/>
  </IconBase>
))
IconNPlus1.displayName = 'IconNPlus1'
