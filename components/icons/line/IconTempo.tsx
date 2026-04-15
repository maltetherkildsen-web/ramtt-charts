// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconTempo = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <circle cx="12" cy="14" r="8"/>
    <path d="M12 6V4"/>
    <path d="M12 14l3-5"/>
  </IconBase>
))
IconTempo.displayName = 'IconTempo'
