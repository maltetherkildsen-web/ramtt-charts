// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconKettlebell = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <circle cx="12" cy="15" r="5"/>
    <path d="M9 11c0-4 6-4 6 0"/>
  </IconBase>
))
IconKettlebell.displayName = 'IconKettlebell'
