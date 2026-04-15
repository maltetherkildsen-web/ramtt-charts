// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseLight, type IconProps } from '../IconBaseLight'

export const IconKidney = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseLight ref={ref} {...props}>

    <path d="M14 3c3 0 6 3.5 6 9s-3 9-6 9-4-2-5-5c-.5-2-.5-4 0-6 1-4 3-7 5-7Z"/>
    <path d="M9 12c-1 .5-2.5 2-3.5 4"/>
    <path d="M5.5 16L5 21"/>
  </IconBaseLight>
))
IconKidney.displayName = 'IconKidney'
