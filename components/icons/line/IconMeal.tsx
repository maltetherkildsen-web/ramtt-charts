// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconMeal = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="12" cy="14" r="7" />
    <path d="M5 14H19" />
    <path d="M8 6C8 6 9 4 12 4C15 4 16 6 16 6" />
  </IconBase>
))
IconMeal.displayName = 'IconMeal'
