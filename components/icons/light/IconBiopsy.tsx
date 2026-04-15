// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconBiopsy = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <rect x="10" y="2" width="4" height="6" rx="1"/>
    <path d="M11 8h2v10h-2z"/>
    <path d="M11 18l1 4 1-4"/>
    <path d="M10.5 4h3M10.5 6h3"/>
  </IconBaseLight>
))
IconBiopsy.displayName = 'IconBiopsy'
