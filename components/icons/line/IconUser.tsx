// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconUser = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <circle cx="12" cy="8" r="4" />
    <path d="M20 21C20 16.6 16.4 13 12 13C7.6 13 4 16.6 4 21" />
  </IconBase>
))
IconUser.displayName = 'IconUser'
