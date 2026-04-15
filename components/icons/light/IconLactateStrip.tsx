// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconLactateStrip = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <rect x="9" y="2" width="6" height="20" rx="1"/>
    <rect x="10" y="14" width="4" height="5" rx=".5"/>
    <circle cx="12" cy="6" r="1" fill="currentColor" stroke="none"/>
  </IconBaseLight>
))
IconLactateStrip.displayName = 'IconLactateStrip'
