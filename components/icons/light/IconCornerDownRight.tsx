// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconCornerDownRight = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M4 4v9a3 3 0 0 0 3 3h10"/>
    <path d="M14 12l4 4-4 4"/>
  </IconBaseLight>
))
IconCornerDownRight.displayName = 'IconCornerDownRight'
