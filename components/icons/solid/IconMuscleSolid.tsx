// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMuscleSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M7 19c0-3 2-5 4-6 2-1 3-3 3-5V5c0-1 1-2 2-2h1c1.5 0 2 1.5 2 3 0 3-1.5 5-3.5 6-1 .5-1.5 1.5-1.5 3v4c0 2-1 3-2 3h-1c-2 0-4-2-4-6v3Z"/>
  </IconBaseSolid>
))
IconMuscleSolid.displayName = 'IconMuscleSolid'
