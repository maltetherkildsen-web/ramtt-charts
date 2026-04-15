// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconFat = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M12 2.69S5 10.69 5 15a7 7 0 0 0 14 0c0-4.31-7-12.31-7-12.31Z"/>
    <path d="M7 16c1.5-1 3.5 1 5 0s3.5-1 5 0"/>
  </IconBaseLight>
))
IconFat.displayName = 'IconFat'
