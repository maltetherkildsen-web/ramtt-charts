// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconCreatine = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <rect x="6" y="9" width="12" height="12" rx="2"/>
    <path d="M7 6h10v3H7V6Z"/>
    <path d="M9 14h6"/>
    <circle cx="12" cy="3.5" r=".75" fill="currentColor" stroke="none"/>
  </IconBaseLight>
))
IconCreatine.displayName = 'IconCreatine'
