// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from './IconBase'

export const IconToday = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="12" cy="9" r="3.5" />
    <path d="M4 17H20" />
    {/* Rays */}
    <path d="M12 3V4" />
    <path d="M17.5 9H18.5" />
    <path d="M5.5 9H6.5" />
    <path d="M15.5 5.5L16.2 4.8" />
    <path d="M7.8 4.8L8.5 5.5" />
  </IconBase>
))
IconToday.displayName = 'IconToday'
