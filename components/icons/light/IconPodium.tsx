// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconPodium = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <rect x="2" y="13" width="6" height="8"/>
    <rect x="9" y="7" width="6" height="14"/>
    <rect x="16" y="16" width="6" height="5"/>
    <path d="M2 21h20"/>
  </IconBaseLight>
))
IconPodium.displayName = 'IconPodium'
