// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconMessageCircle = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M21 12C21 16.4 17 20 12 20C10.6 20 9.3 19.7 8.1 19.2L3 21L4.8 16C3.7 14.5 3 12.8 3 11C3 6.6 7 3 12 3C17 3 21 6.6 21 11V12Z" />
  </IconBase>
))
IconMessageCircle.displayName = 'IconMessageCircle'
