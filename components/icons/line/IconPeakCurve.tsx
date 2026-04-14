// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconPeakCurve = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M3 20l3-16 3 6 3 3 3 2 3 1 3 1"/>
  </IconBase>
))
IconPeakCurve.displayName = 'IconPeakCurve'
