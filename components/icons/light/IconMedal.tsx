// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconMedal = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M9 2l3 8 3-8"/>
    <circle cx="12" cy="16" r="5"/>
    <path d="M10 16h4"/>
  </IconBaseLight>
))
IconMedal.displayName = 'IconMedal'
