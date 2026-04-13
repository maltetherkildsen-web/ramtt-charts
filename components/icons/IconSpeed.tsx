// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from './IconBase'

/** Speedometer — arc with a needle. */
export const IconSpeed = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    {/* Speedometer arc */}
    <path d="M4 18A9 9 0 0 1 20 18" />
    {/* Needle pointing upper-right */}
    <path d="M12 18L16 8" />
    {/* Center pivot dot */}
    <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none" />
  </IconBase>
))
IconSpeed.displayName = 'IconSpeed'
