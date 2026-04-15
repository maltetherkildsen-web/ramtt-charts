// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconHash = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>
    <path d="M4 9H20" />
    <path d="M4 15H20" />
    <path d="M10 3L8 21" />
    <path d="M16 3L14 21" />
  </IconBaseLight>
))
IconHash.displayName = 'IconHash'
