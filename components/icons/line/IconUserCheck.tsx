// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconUserCheck = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="10" cy="8" r="4" />
    <path d="M18 21C18 16.6 14.4 13 10 13C5.6 13 2 16.6 2 21" />
    <path d="M17 11L19 13L23 9" />
  </IconBase>
))
IconUserCheck.displayName = 'IconUserCheck'
