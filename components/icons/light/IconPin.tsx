// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconPin = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M12 17v5"/>
    <path d="M5 12h14"/>
    <rect x="8" y="3" width="8" height="9" rx="1"/>
  </IconBaseLight>
))
IconPin.displayName = 'IconPin'
