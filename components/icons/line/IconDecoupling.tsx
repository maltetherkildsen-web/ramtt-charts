// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconDecoupling = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M3 16c3-1 6-2 9-3s6-2 9-3"/><path d="M3 16c3 0 6-1 9-3s6-4 9-6" strokeDasharray="3 2"/><circle cx="3" cy="16" r="1.5" fill="currentColor" stroke="none"/>
  </IconBase>
))
IconDecoupling.displayName = 'IconDecoupling'
