// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconHemoglobin = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    {/* Four-lobed protein structure */}
    <circle cx="9" cy="9" r="4"/>
    <circle cx="15" cy="9" r="4"/>
    <circle cx="9" cy="15" r="4"/>
    <circle cx="15" cy="15" r="4"/>
    {/* Central iron (Fe) dot */}
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
    {/* O2 binding indicator */}
    <circle cx="18" cy="5" r="1.2"/>
    <circle cx="20" cy="5" r="1.2"/>
  </IconBaseLight>
))
IconHemoglobin.displayName = 'IconHemoglobin'
