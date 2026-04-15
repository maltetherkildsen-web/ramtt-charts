// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconTestTube = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M9 3v15a3 3 0 0 0 6 0V3"/>
    <path d="M8 3h8"/>
    <path d="M9 13a3 3 0 0 0 6 0"/>
  </IconBaseLight>
))
IconTestTube.displayName = 'IconTestTube'
