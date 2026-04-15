// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconWifi = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none"/><path d="M8.5 15.5a5 5 0 017 0"/><path d="M5 12a10 10 0 0114 0"/><path d="M1.5 8.5a14.5 14.5 0 0121 0"/>
  </IconBaseLight>
))
IconWifi.displayName = 'IconWifi'
