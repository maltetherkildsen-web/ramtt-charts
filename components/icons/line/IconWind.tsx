// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconWind = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M2 12h12a3 3 0 100-3"/><path d="M2 8h8a3 3 0 110 3"/><path d="M2 16h10a3 3 0 110 3"/>
  </IconBase>
))
IconWind.displayName = 'IconWind'
