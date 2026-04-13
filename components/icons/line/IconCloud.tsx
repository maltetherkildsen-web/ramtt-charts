// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconCloud = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M18 10H16.7A6 6 0 0 0 5 11C3.3 11 2 12.3 2 14C2 15.7 3.3 17 5 17H18C20.2 17 22 15.2 22 13C22 10.8 20.2 9 18 9Z" />
  </IconBase>
))
IconCloud.displayName = 'IconCloud'
