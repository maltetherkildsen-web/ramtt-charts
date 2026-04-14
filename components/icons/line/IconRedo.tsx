// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconRedo = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M20 7l-3-3"/>
    <path d="M20 7l-3 3"/>
    <path d="M20 7h-6a7 7 0 0 0 0 14h4"/>
  </IconBase>
))
IconRedo.displayName = 'IconRedo'
