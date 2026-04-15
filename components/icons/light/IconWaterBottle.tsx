// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconWaterBottle = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M9 2h6v3H9V2z"/><path d="M8 5h8l1 3v11a2 2 0 01-2 2H9a2 2 0 01-2-2V8l1-3z"/><path d="M8 13h8"/><path d="M11.5 5v-1"/>
  </IconBaseLight>
))
IconWaterBottle.displayName = 'IconWaterBottle'
