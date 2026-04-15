// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconPeriodization = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="2" y="16" width="4" height="4" rx="0.5"/><rect x="7.5" y="12" width="4" height="8" rx="0.5"/><rect x="13" y="8" width="4" height="12" rx="0.5"/><rect x="18.5" y="4" width="3.5" height="16" rx="0.5"/><path d="M3 14l5-4 5-4 5-4" strokeDasharray="2 2" opacity="0.5"/>
  </IconBaseLight>
))
IconPeriodization.displayName = 'IconPeriodization'
