// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconStorm = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M20 16.58A5 5 0 0018 7h-1.26A8 8 0 104 15.25"/><path d="M13 12l-2 4h4l-2 5"/>
  </IconBase>
))
IconStorm.displayName = 'IconStorm'
