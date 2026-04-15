// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconYogaMat = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M6 5h11c1.7 0 3 3 3 7s-1.3 7-3 7H6c-1.7 0-3-3-3-7s1.3-7 3-7Z"/>
    <path d="M6 5v14"/>
  </IconBase>
))
IconYogaMat.displayName = 'IconYogaMat'
