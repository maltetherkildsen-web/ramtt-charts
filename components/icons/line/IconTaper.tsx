// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconTaper = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M3 6v14"/><path d="M3 8h4v4H3"/><path d="M7 10h3.5v4H7"/><path d="M10.5 12h3v4h-3"/><path d="M13.5 14h2.5v4h-2.5"/><path d="M19 10v10"/><path d="M19 10l3 2-3 2"/>
  </IconBase>
))
IconTaper.displayName = 'IconTaper'
