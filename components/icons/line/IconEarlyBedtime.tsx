// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconEarlyBedtime = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/><path d="M19 3a3 3 0 01-2.5 4.5A4 4 0 0119 3z"/><path d="M3 3l1.5 1.5"/><path d="M4 7H2.5"/>
  </IconBase>
))
IconEarlyBedtime.displayName = 'IconEarlyBedtime'
