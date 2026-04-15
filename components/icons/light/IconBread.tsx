// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconBread = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M5 10c0-3 3-5 7-5s7 2 7 5v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z"/><path d="M5 10h14"/><path d="M9 13h6" opacity="0.3"/><path d="M10 16h4" opacity="0.3"/>
  </IconBaseLight>
))
IconBread.displayName = 'IconBread'
