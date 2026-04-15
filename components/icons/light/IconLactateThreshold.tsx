// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconLactateThreshold = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M3 20C6 18 9 12 12 8c2-3 4-3 6-2"/>
    <path d="M3 6h18"/>
    <circle cx="12" cy="8" r="1.5"/>
  </IconBaseLight>
))
IconLactateThreshold.displayName = 'IconLactateThreshold'
