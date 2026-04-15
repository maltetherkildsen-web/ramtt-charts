// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconSoftFlask = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>

    <path d="M9 6c-1 5-1.5 9-.5 13a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2c1-4 .5-8-.5-13"/>
    <path d="M9 6h6"/>
    <path d="M12 3v3"/>
  </IconBase>
))
IconSoftFlask.displayName = 'IconSoftFlask'
