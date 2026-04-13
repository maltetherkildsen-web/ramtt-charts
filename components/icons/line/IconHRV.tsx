// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconHRV = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M3 12C5 12 5 6 7 6C9 6 9 18 11 18C13 18 13 8 15 8C17 8 17 14 19 14C20 14 21 12 21 12" />
  </IconBase>
))
IconHRV.displayName = 'IconHRV'
