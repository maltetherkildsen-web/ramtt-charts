// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconArrowUpDown = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M7 4v16"/>
    <path d="M4 7l3-3 3 3"/>
    <path d="M17 20V4"/>
    <path d="M14 17l3 3 3-3"/>
  </IconBaseLight>
))
IconArrowUpDown.displayName = 'IconArrowUpDown'
