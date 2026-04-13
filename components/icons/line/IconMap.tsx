// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconMap = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z" />
    <path d="M8 2V18" />
    <path d="M16 6V22" />
  </IconBase>
))
IconMap.displayName = 'IconMap'
