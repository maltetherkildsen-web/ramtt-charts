// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconMitochondria = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    {/* Outer membrane */}
    <ellipse cx="12" cy="12" rx="9" ry="6"/>
    {/* Inner membrane cristae folds */}
    <path d="M6 10c2 1 2 3 0 4"/>
    <path d="M10 9c2 2 2 4 0 6"/>
    <path d="M14 9c2 2 2 4 0 6"/>
    <path d="M18 10c-2 1-2 3 0 4"/>
  </IconBase>
))
IconMitochondria.displayName = 'IconMitochondria'
