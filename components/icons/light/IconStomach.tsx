// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconStomach = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M16 4s4 0 4 4-4 4-4 8-4 6-8 6-4-4-4-6 2-4 4-4"/>
    <path d="M16 4c-2 0-4 1-4 3"/>
  </IconBaseLight>
))
IconStomach.displayName = 'IconStomach'
