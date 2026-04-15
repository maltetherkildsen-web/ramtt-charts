// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconShieldCheck = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M12 2.5L4 6.5v5c0 5.5 3.4 10.2 8 11.5 4.6-1.3 8-6 8-11.5v-5L12 2.5z"/><path d="M9 12l2 2 4-4"/>
  </IconBase>
))
IconShieldCheck.displayName = 'IconShieldCheck'
