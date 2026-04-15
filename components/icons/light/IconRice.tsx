// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconRice = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M4 12c0 4 3.5 7 8 7s8-3 8-7H4z"/><path d="M2 12h20"/><path d="M15 3l-3 9"/><path d="M17 3l-3 9"/>
  </IconBaseLight>
))
IconRice.displayName = 'IconRice'
