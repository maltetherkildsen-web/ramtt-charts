// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconGlobe = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="12" cy="12" r="9" />
    <path d="M3 12H21" />
    <path d="M12 3C14.5 5.5 15.8 8.6 16 12C15.8 15.4 14.5 18.5 12 21C9.5 18.5 8.2 15.4 8 12C8.2 8.6 9.5 5.5 12 3Z" />
  </IconBaseLight>
))
IconGlobe.displayName = 'IconGlobe'
