// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconGift = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="3" y="10" width="18" height="10" rx="2"/><path d="M3 14h18"/><path d="M12 10v10"/><path d="M12 10c-2 0-4-1-4-3s2-3 4-3c-2 0-4-1-4-3" /><path d="M12 10c2 0 4-1 4-3s-2-3-4-3c2 0 4-1 4-3"/>
  </IconBaseLight>
))
IconGift.displayName = 'IconGift'
