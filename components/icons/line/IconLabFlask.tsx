// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconLabFlask = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M9 3v7l-4 10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2l-4-10V3"/>
    <path d="M8 3h8"/>
    <path d="M7 16h10"/>
  </IconBase>
))
IconLabFlask.displayName = 'IconLabFlask'
