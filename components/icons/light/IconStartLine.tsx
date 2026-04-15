// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconStartLine = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M5 21V8a7 7 0 0 1 14 0v13"/>
    <path d="M5 12h14"/>
    <circle cx="12" cy="5" r="1" fill="currentColor" stroke="none"/>
  </IconBaseLight>
))
IconStartLine.displayName = 'IconStartLine'
