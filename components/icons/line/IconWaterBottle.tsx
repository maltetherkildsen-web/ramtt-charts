// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconWaterBottle = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M8 9a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v11a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2V9Z"/>
    <path d="M10 5h4v3h-4V5Z"/>
    <path d="M11.5 2.5V5"/>
    <path d="M9 15h6"/>
  </IconBase>
))
IconWaterBottle.displayName = 'IconWaterBottle'
