// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconRoute = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="4" cy="5" r="2"/><circle cx="20" cy="19" r="2"/><path d="M6 5h4a4 4 0 010 8H10a4 4 0 000 8h8"/>
  </IconBaseLight>
))
IconRoute.displayName = 'IconRoute'
