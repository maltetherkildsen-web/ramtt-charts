// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconArrowDownAZ = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M4 20V4"/>
    <path d="M1 7l3-3 3 3"/>
    <path d="M13 8h6l-6 6h6"/>
    <path d="M13 20l3-6 3 6"/>
    <path d="M14 18h4"/>
  </IconBaseLight>
))
IconArrowDownAZ.displayName = 'IconArrowDownAZ'
