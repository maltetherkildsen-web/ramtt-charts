// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconHash = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M4 9H20" />
    <path d="M4 15H20" />
    <path d="M10 3L8 21" />
    <path d="M16 3L14 21" />
  </IconBase>
))
IconHash.displayName = 'IconHash'
