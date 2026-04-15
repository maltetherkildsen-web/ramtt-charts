// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconAnalytics = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M4 18L8 14L11 17L15 10L20 6" />
    <circle cx="20" cy="6" r="1.5" fill="currentColor" stroke="none" />
  </IconBaseLight>
))
IconAnalytics.displayName = 'IconAnalytics'
