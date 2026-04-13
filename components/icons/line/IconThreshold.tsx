// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconThreshold = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M3 14H7" strokeDasharray="2 2" />
    <path d="M11 14H15" strokeDasharray="2 2" />
    <path d="M19 14H21" strokeDasharray="2 2" />
    <path d="M12 20V14" />
    <path d="M9 17L12 14L15 17" />
    <path d="M12 14V6" />
    <path d="M9 9L12 6L15 9" />
  </IconBase>
))
IconThreshold.displayName = 'IconThreshold'
