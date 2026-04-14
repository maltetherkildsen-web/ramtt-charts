// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconSortDesc = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M4 6h10"/>
    <path d="M4 10h8"/>
    <path d="M4 14h6"/>
    <path d="M4 18h4"/>
    <path d="M18 4v16"/>
    <path d="M15 17l3 3 3-3"/>
  </IconBase>
))
IconSortDesc.displayName = 'IconSortDesc'
