// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from './IconBase'

/** Power curve trace — a stylized watt output zigzag, not a lightning bolt. */
export const IconPower = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M3 16L6 14L8.5 16L11 7L14 14L16.5 10L18.5 12.5L21 8" />
  </IconBase>
))
IconPower.displayName = 'IconPower'
