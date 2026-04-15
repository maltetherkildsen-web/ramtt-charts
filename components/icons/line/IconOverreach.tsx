// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconOverreach = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M2 8h20" strokeDasharray="3 2"/><path d="M3 18c2-1 4-3 6-6s4-6 6-7 4-1 6 0"/><path d="M15 5l2-2"/><path d="M17 5l-2-2"/>
  </IconBase>
))
IconOverreach.displayName = 'IconOverreach'
