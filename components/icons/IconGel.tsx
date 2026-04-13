// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from './IconBase'

/** Gel packet — trapezoidal pouch with a tear-off top. */
export const IconGel = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    {/* Pouch body */}
    <path d="M9 6L7 20C7 20.5 7.5 21 8 21H16C16.5 21 17 20.5 17 20L15 6" />
    {/* Top seal */}
    <path d="M9 6H15" />
    {/* Tear tab */}
    <path d="M13 6L14.5 3" />
  </IconBase>
))
IconGel.displayName = 'IconGel'
