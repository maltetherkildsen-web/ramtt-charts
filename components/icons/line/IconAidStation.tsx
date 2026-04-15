// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconAidStation = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M3 8h8l-1 9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1L3 8z"/>
    <path d="M5 11h4"/>
    <path d="M17 20V4"/>
    <path d="M17 4h4v4h-4"/>
  </IconBase>
))
IconAidStation.displayName = 'IconAidStation'
