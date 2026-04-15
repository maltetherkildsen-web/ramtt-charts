// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconLungs = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M12 4v6"/>
    <path d="M12 10C8 10 4 13 4 17c0 2 1 3 3 3s3-2 3-4v-6"/>
    <path d="M12 10c4 0 8 3 8 7 0 2-1 3-3 3s-3-2-3-4v-6"/>
  </IconBaseLight>
))
IconLungs.displayName = 'IconLungs'
