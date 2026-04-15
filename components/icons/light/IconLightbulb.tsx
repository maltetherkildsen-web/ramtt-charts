// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconLightbulb = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M12 2a7 7 0 00-4 12.7V17a1 1 0 001 1h6a1 1 0 001-1v-2.3A7 7 0 0012 2z"/><path d="M9 21h6"/><path d="M10 17v-2.5c-1-.5-2-1.5-2-3"/><path d="M14 17v-2.5c1-.5 2-1.5 2-3"/>
  </IconBaseLight>
))
IconLightbulb.displayName = 'IconLightbulb'
