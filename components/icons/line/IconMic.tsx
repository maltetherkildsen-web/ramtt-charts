// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconMic = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <rect x="9" y="2" width="6" height="11" rx="3" />
    <path d="M5 10C5 13.9 8.1 17 12 17C15.9 17 19 13.9 19 10" />
    <path d="M12 17V21" />
    <path d="M8 21H16" />
  </IconBase>
))
IconMic.displayName = 'IconMic'
