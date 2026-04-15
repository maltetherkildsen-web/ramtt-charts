// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconFatigueResistance = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M2 10h20"/><path d="M2 10c4 0 8 2 12 5s6 4 8 5" strokeDasharray="3 2" opacity="0.5"/><path d="M2 6l2 2-2 2"/>
  </IconBase>
))
IconFatigueResistance.displayName = 'IconFatigueResistance'
