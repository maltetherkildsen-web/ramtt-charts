// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconFish = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M2 12c3-4 7-6 11-6s5 2 7 6c-2 4-3 6-7 6s-8-2-11-6z"/><circle cx="17" cy="12" r="1" fill="currentColor" stroke="none"/><path d="M22 8l-3 4 3 4"/>
  </IconBase>
))
IconFish.displayName = 'IconFish'
