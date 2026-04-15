// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconTaco = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M3 16c0-6 4-12 9-12s9 6 9 12"/><path d="M3 16c0 2 4 4 9 4s9-2 9-4"/><circle cx="8" cy="14" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.5"/><circle cx="16" cy="14" r="1" fill="currentColor" stroke="none"/><path d="M10 16h4" opacity="0.3"/>
  </IconBase>
))
IconTaco.displayName = 'IconTaco'
