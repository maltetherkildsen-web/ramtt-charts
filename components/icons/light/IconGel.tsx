// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconGel = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M9 6l-2 14a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1l-2-14"/>
    <path d="M9 6h6"/>
    <path d="M13 6l1.5-3"/>
  </IconBaseLight>
))
IconGel.displayName = 'IconGel'
