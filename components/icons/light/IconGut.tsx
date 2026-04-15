// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconGut = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M8 3C6 3 4 5 4 7c0 3 3 3 3 6s-3 3-3 6c0 1.5 1.5 2 3 2"/>
    <path d="M16 3c2 0 4 2 4 4 0 3-3 3-3 6s3 3 3 6c0 1.5-1.5 2-3 2"/>
    <path d="M7 7h10"/>
    <path d="M7 19h10"/>
  </IconBaseLight>
))
IconGut.displayName = 'IconGut'
