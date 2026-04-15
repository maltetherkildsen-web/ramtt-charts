// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconMuscleFiber = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M4 12c0-6 3-10 8-10s8 4 8 10-3 10-8 10-8-4-8-10Z"/>
    <path d="M8 4.5v15"/>
    <path d="M12 2v20"/>
    <path d="M16 4.5v15"/>
  </IconBaseLight>
))
IconMuscleFiber.displayName = 'IconMuscleFiber'
