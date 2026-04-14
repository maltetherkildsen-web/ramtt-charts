// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMinimizeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M4 14h6v6l-3-3-4 4-1.4-1.4L5.6 16 4 14ZM20 10h-6V4l3 3 4-4 1.4 1.4-4 4L20 10Z"/>
  </IconBaseSolid>
))
IconMinimizeSolid.displayName = 'IconMinimizeSolid'
