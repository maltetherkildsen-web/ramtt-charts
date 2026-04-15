// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconFinishLine = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M5 21V3M19 21V3"/>
    <rect x="5" y="6" width="14" height="5" rx=".5"/>
    <path d="M9.5 6v5M14 6v5"/>
  </IconBase>
))
IconFinishLine.displayName = 'IconFinishLine'
