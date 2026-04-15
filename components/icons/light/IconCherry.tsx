// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconCherry = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="8" cy="16" r="4"/><circle cx="16" cy="14" r="3.5"/><path d="M8 12c0-4 2-7 5-9"/><path d="M16 10.5c0-3 0-5-3-7.5"/><path d="M11 4c1-.5 2-.5 3 0"/>
  </IconBaseLight>
))
IconCherry.displayName = 'IconCherry'
