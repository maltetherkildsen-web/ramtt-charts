// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconMuscle = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M7 19c0-3 2-5 4-6 2-1 3-3 3-5V5c0-1 1-2 2-2"/>
    <path d="M16 3c1.5 0 2 1.5 2 3 0 3-1.5 5-3.5 6-1 .5-1.5 1.5-1.5 3v4"/>
  </IconBaseLight>
))
IconMuscle.displayName = 'IconMuscle'
