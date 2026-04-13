// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconPriceTag = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M20.6 11.5L12.5 3.4C12.1 3 11.6 2.8 11.1 2.8L4 3C3.4 3 3 3.4 3 4L2.8 11.1C2.8 11.6 3 12.1 3.4 12.5L11.5 20.6C12.3 21.4 13.6 21.4 14.4 20.6L20.6 14.4C21.4 13.6 21.4 12.3 20.6 11.5Z" />
    <circle cx="7.5" cy="7.5" r="1.5" fill="currentColor" stroke="none" />
  </IconBase>
))
IconPriceTag.displayName = 'IconPriceTag'
