// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMealSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="12" cy="14" r="7.5"/>
    <rect x="5" y="13.25" width="14" height="1.5" rx=".75"/>
    <path d="M8 6.5C8.5 5.5 10 4 12 4s3.5 1.5 4 2.5c.3.5-.1 1-.6 1H8.6c-.5 0-.9-.5-.6-1Z"/>
  </IconBaseSolid>
))
IconMealSolid.displayName = 'IconMealSolid'
