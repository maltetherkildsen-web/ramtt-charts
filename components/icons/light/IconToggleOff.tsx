// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconToggleOff = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="1" y="6" width="22" height="12" rx="6"/><circle cx="7" cy="12" r="3"/>
  </IconBaseLight>
))
IconToggleOff.displayName = 'IconToggleOff'
