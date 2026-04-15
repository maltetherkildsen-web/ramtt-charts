// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconPowerProfile = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M12 3l8.5 6.2-3.2 10H6.7L3.5 9.2 12 3z"/><path d="M12 8l4.3 3.1-1.6 5H9.3l-1.6-5L12 8z"/><path d="M12 3v5"/><path d="M20.5 9.2l-4.2 1.9"/><path d="M17.3 19.2l-2.6-3.1"/><path d="M6.7 19.2l2.6-3.1"/><path d="M3.5 9.2l4.2 1.9"/>
  </IconBaseLight>
))
IconPowerProfile.displayName = 'IconPowerProfile'
