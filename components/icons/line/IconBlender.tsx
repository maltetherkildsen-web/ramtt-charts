// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconBlender = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M6 4h10l-1 12H7L6 4z"/><path d="M16 4h2a1 1 0 011 1v2a1 1 0 01-1 1h-2"/><path d="M7 16h8v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2z"/><path d="M9 20v2"/><path d="M13 20v2"/><path d="M7 8h8"/>
  </IconBase>
))
IconBlender.displayName = 'IconBlender'
