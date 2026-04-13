// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconArchive = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <rect x="2" y="3" width="20" height="5" rx="1" />
    <path d="M4 8V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V8" />
    <path d="M10 12H14" />
  </IconBase>
))
IconArchive.displayName = 'IconArchive'
