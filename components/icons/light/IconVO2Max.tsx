// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconVO2Max = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M4 18c2-3 4-10 8-10s6 7 8 10"/>
    <path d="M12 4v4"/>
    <path d="M10 6l2-2 2 2"/>
  </IconBaseLight>
))
IconVO2Max.displayName = 'IconVO2Max'
