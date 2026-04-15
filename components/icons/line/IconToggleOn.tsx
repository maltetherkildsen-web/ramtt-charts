// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconToggleOn = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <rect x="1" y="6" width="22" height="12" rx="6"/><circle cx="17" cy="12" r="3" fill="currentColor" stroke="none"/>
  </IconBase>
))
IconToggleOn.displayName = 'IconToggleOn'
