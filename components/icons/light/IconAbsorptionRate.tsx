// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconAbsorptionRate = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M4 4h16"/><path d="M6 4l3 8v8a2 2 0 004 0v-8l3-8"/><path d="M9 12h6"/><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none"/>
  </IconBaseLight>
))
IconAbsorptionRate.displayName = 'IconAbsorptionRate'
