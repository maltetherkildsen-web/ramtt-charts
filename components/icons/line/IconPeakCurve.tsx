// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconPeakCurve = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M3 20C3 20 4 4 6 4c2 0 3 6 5 9 2 3 4 5 7 5.5 2 .3 3 .5 3 1.5"/>
  </IconBase>
))
IconPeakCurve.displayName = 'IconPeakCurve'
