// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconPortaPotty = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <rect x="6" y="6" width="12" height="14" rx="1"/><path d="M6 4h12"/><path d="M10 6v14"/><path d="M12 10v4"/><path d="M11 12h2"/><circle cx="18" cy="5" r="3"/><path d="M18 3.5v1.5l1 1"/>
  </IconBaseLight>
))
IconPortaPotty.displayName = 'IconPortaPotty'
