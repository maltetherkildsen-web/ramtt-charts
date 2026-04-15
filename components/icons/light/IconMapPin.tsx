// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconMapPin = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M12 22C12 22 19 16 19 10C19 6.1 15.9 3 12 3C8.1 3 5 6.1 5 10C5 16 12 22 12 22Z" />
    <circle cx="12" cy="10" r="3" />
  </IconBaseLight>
))
IconMapPin.displayName = 'IconMapPin'
