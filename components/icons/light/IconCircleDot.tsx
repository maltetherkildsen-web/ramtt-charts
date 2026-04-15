// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconCircleDot = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="12" cy="12" r="9"/>
    <circle cx="12" cy="12" r="3" fill="currentColor" stroke="none"/>
  </IconBaseLight>
))
IconCircleDot.displayName = 'IconCircleDot'
