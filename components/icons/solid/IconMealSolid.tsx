// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMealSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="12" cy="14" r="7.5"/>
    <rect x="5" y="13.25" width="14" height="1.5" rx=".75"/>
    <path d="M9 5.5c.5-.5 1.5-1.5 3-1.5s2.5 1 3 1.5c.3.3 0 .7-.4.7H9.4c-.4 0-.7-.4-.4-.7Z"/>
  </IconBaseSolid>
))
IconMealSolid.displayName = 'IconMealSolid'
