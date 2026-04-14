// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconMeal = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <circle cx="12" cy="14" r="7"/>
    <path d="M5 14h14"/>
    <path d="M9 5c0-1 1-2 3-2s3 1 3 2"/>
  </IconBase>
))
IconMeal.displayName = 'IconMeal'
