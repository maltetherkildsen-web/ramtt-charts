// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconBattery = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <rect x="2" y="7" width="18" height="10" rx="2"/><path d="M22 11v2"/><rect x="4.5" y="9.5" width="7" height="5" rx="1"/>
  </IconBase>
))
IconBattery.displayName = 'IconBattery'
