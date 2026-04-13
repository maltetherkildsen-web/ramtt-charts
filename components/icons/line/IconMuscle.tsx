// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconMuscle = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M4 16C4 16 6 12 8 10C10 8 12 6 14 6C16 6 17 8 17 10C17 12 16 14 18 16C20 18 22 18 22 18" />
    <path d="M4 16C4 16 3 18 4 19C5 20 7 19 7 19" />
  </IconBase>
))
IconMuscle.displayName = 'IconMuscle'
