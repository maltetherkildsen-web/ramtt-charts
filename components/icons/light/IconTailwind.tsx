// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconTailwind = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <circle cx="8" cy="5" r="2"/><path d="M10 8l4 5-4 3v6"/><path d="M14 13l2 3"/><path d="M16 8h6"/><path d="M17 12h5"/><path d="M18 16h4"/>
  </IconBaseLight>
))
IconTailwind.displayName = 'IconTailwind'
