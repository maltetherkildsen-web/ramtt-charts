// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconPullUpBar = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M2 10h20"/>
    <path d="M5 4v6M19 4v6"/>
    <path d="M3 4h4M17 4h4"/>
  </IconBaseLight>
))
IconPullUpBar.displayName = 'IconPullUpBar'
