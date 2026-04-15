// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconGlycogen = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <rect x="3" y="8" width="16" height="8" rx="2"/>
    <path d="M19 11h2v2h-2"/>
    <rect x="5.5" y="10.5" width="7" height="3" rx=".5" fill="currentColor" fillOpacity={0.15} stroke="none"/>
  </IconBaseLight>
))
IconGlycogen.displayName = 'IconGlycogen'
