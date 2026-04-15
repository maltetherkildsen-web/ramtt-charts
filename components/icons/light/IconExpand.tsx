// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconExpand = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M14 4H20V10" />
    <path d="M20 4L13 11" />
    <path d="M10 20H4V14" />
    <path d="M4 20L11 13" />
  </IconBaseLight>
))
IconExpand.displayName = 'IconExpand'
