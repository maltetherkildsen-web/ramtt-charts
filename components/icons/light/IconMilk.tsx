// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconMilk = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M7 6V4h10v2"/><path d="M7 6l-1 2v12a2 2 0 002 2h8a2 2 0 002-2V8l-1-2H7z"/><path d="M7 12h10"/><path d="M10 4V2h4v2"/>
  </IconBaseLight>
))
IconMilk.displayName = 'IconMilk'
