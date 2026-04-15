// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconKitchenScale = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <rect x="3" y="12" width="18" height="9" rx="2"/><path d="M6 12V9a6 6 0 0112 0v3"/><circle cx="12" cy="8" r="1.5"/><path d="M12 8l2-2"/><path d="M8 17h8"/>
  </IconBase>
))
IconKitchenScale.displayName = 'IconKitchenScale'
