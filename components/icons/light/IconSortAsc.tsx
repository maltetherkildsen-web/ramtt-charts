// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconSortAsc = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M4 18h4"/>
    <path d="M4 14h6"/>
    <path d="M4 10h8"/>
    <path d="M4 6h10"/>
    <path d="M18 20V4"/>
    <path d="M15 7l3-3 3 3"/>
  </IconBaseLight>
))
IconSortAsc.displayName = 'IconSortAsc'
