// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMaximizeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M15 3h6v6l-3-3-4 4-1.4-1.4L16.6 5 15 3ZM9 21H3v-6l3 3 4-4 1.4 1.4L7.4 19 9 21Z"/>
  </IconBaseSolid>
))
IconMaximizeSolid.displayName = 'IconMaximizeSolid'
