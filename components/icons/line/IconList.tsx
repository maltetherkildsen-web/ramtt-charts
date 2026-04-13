// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconList = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M9 6H21" />
    <path d="M9 12H21" />
    <path d="M9 18H21" />
    <circle cx="4.5" cy="6" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="12" r="1.5" fill="currentColor" stroke="none" />
    <circle cx="4.5" cy="18" r="1.5" fill="currentColor" stroke="none" />
  </IconBase>
))
IconList.displayName = 'IconList'
