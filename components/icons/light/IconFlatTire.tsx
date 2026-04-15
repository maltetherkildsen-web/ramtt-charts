// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconFlatTire = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <ellipse cx="12" cy="14" rx="8" ry="5"/><circle cx="12" cy="12" r="2"/><path d="M12 12l8 2" strokeDasharray="2 2" opacity="0.4"/><path d="M12 12l-8 2" strokeDasharray="2 2" opacity="0.4"/><path d="M10 4l1 1-1 1" opacity="0.5"/><path d="M13 3l1 1-1 1" opacity="0.5"/><path d="M15 5l1 1-1 1" opacity="0.5"/>
  </IconBaseLight>
))
IconFlatTire.displayName = 'IconFlatTire'
