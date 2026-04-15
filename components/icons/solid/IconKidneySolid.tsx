// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconKidneySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M14 3c3 0 6 3.5 6 9s-3 9-6 9-4-2-5-5c-.5-2-.5-4 0-6 1-4 3-7 5-7Z"/>
    <path d="M9 12c-1 .5-2.5 2-3.5 4L5 21h2l.5-5c.5-1.5 1-2.5 2-3.5Z"/>
  </IconBaseSolid>
))
IconKidneySolid.displayName = 'IconKidneySolid'
