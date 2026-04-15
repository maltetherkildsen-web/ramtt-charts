// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconJellyLegs = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="12" cy="4" r="2"/><path d="M10 7h4"/><path d="M12 7v4"/><path d="M9 11c0 2 1 3 0 5s-1 3 0 5"/><path d="M15 11c0 2-1 3 0 5s1 3 0 5"/><path d="M7 21h4"/><path d="M13 21h4"/>
  </IconBaseLight>
))
IconJellyLegs.displayName = 'IconJellyLegs'
