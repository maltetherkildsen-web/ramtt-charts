// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconThreshold = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M3 14h18" strokeDasharray="3 2"/>
    <path d="M12 22V6"/>
    <path d="M8 10l4-4 4 4"/>
  </IconBase>
))
IconThreshold.displayName = 'IconThreshold'
