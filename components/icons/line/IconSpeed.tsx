// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconSpeed = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M4 18a9 9 0 0 1 16 0"/>
    <path d="M7.5 9.5l.5.5"/>
    <path d="M12 7v1"/>
    <path d="M16.5 9.5l-.5.5"/>
    <path d="M12 18l3.5-8"/>
    <circle cx="12" cy="18" r="1.5" fill="currentColor" stroke="none"/>
  </IconBase>
))
IconSpeed.displayName = 'IconSpeed'
