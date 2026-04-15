// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconCHO = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M5 10c0-3 3-6 7-6s7 3 7 6v9a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1v-9Z"/>
    <path d="M8 8c2-1 6-1 8 0"/>
  </IconBaseLight>
))
IconCHO.displayName = 'IconCHO'
