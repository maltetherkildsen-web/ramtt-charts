// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconProtein = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="5" cy="12" r="3" />
    <circle cx="12" cy="12" r="3" />
    <circle cx="19" cy="12" r="3" />
    <path d="M8 12H9" />
    <path d="M15 12H16" />
  </IconBase>
))
IconProtein.displayName = 'IconProtein'
