// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconJumpRope = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <rect x="5" y="3" width="2" height="5" rx="1"/>
    <rect x="17" y="3" width="2" height="5" rx="1"/>
    <path d="M6 8c0 12 12 12 12 0"/>
  </IconBase>
))
IconJumpRope.displayName = 'IconJumpRope'
