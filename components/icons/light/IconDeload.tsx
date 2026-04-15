// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconDeload = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M4 5h4v4H4z"/><path d="M8 9h4v4H8z"/><path d="M12 13h4v4h-4z"/><path d="M17 18l1.5 1.5L22 16"/>
  </IconBaseLight>
))
IconDeload.displayName = 'IconDeload'
