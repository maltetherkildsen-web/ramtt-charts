// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from './IconBase'

export const IconInfo = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="12" cy="12" r="9" />
    <circle cx="12" cy="8" r="1" fill="currentColor" stroke="none" />
    <path d="M12 11V16" />
  </IconBase>
))
IconInfo.displayName = 'IconInfo'
