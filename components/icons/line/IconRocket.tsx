// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBase, type IconProps } from '../IconBase'

export const IconRocket = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBase ref={ref} {...props}>
    <path d="M12 2C8 6.5 6 10.5 6 14l-3 2 3 3 4 2c0-2 .5-3.5 2-6s3-5 4.5-6.5c1-1 2.5-1.5 3.5-2.5-1-1-2-2-3.5-2.5S13.5 2.5 12 2z"/><circle cx="13.5" cy="10.5" r="1.5"/>
  </IconBase>
))
IconRocket.displayName = 'IconRocket'
