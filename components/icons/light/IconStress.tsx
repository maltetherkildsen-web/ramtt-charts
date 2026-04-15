// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconStress = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <circle cx="12" cy="12" r="4"/>
    <path d="M10 2l2 3 2-3"/>
    <path d="M10 22l2-3 2 3"/>
    <path d="M2 14l3-2-3-2"/>
    <path d="M22 14l-3-2 3-2"/>
  </IconBaseLight>
))
IconStress.displayName = 'IconStress'
