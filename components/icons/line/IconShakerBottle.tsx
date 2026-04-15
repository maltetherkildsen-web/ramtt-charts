// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconShakerBottle = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M7 8h10l.5 12a2 2 0 01-2 2H8.5a2 2 0 01-2-2L7 8z"/><path d="M7 8l1-3h8l1 3"/><path d="M10 5V3"/><path d="M14 5V3"/><path d="M10 5h4"/><circle cx="12" cy="14" r="2" strokeDasharray="2 1"/>
  </IconBase>
))
IconShakerBottle.displayName = 'IconShakerBottle'
