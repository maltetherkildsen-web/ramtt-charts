// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconCaffeine = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M4 8h12v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8Z"/>
    <path d="M16 11a3 3 0 0 1 0 5"/>
    <path d="M8 5c0-1.5.5-2.5 1-3"/>
    <path d="M11 5c0-1.5.5-2.5 1-3"/>
  </IconBase>
))
IconCaffeine.displayName = 'IconCaffeine'
