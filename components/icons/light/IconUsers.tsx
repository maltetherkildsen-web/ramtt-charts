// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconUsers = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="9" cy="8" r="3.5" />
    <path d="M17 21C17 17.1 13.4 14 9 14C4.6 14 1 17.1 1 21" />
    <circle cx="17" cy="8" r="2.5" />
    <path d="M23 21C23 18.2 20.8 16 18 16C17 16 16.1 16.3 15.3 16.8" />
  </IconBaseLight>
))
IconUsers.displayName = 'IconUsers'
