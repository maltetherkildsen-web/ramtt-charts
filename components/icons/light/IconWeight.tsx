// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconWeight = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <rect x="3" y="7" width="18" height="13" rx="3"/>
    <rect x="7" y="9.5" width="10" height="4" rx="1.5"/>
    <circle cx="7" cy="22" r="1" fill="currentColor" stroke="none"/>
    <circle cx="17" cy="22" r="1" fill="currentColor" stroke="none"/>
  </IconBaseLight>
))
IconWeight.displayName = 'IconWeight'
