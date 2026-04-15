// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconDiamond = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M5 8l7-6 7 6-7 14L5 8z"/><path d="M5 8h14"/><path d="M8.5 2L5 8l7 14"/><path d="M15.5 2L19 8l-7 14"/>
  </IconBase>
))
IconDiamond.displayName = 'IconDiamond'
