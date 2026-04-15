// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMuscleFiberSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M4 12c0-6 3-10 8-10s8 4 8 10-3 10-8 10-8-4-8-10Z"/>
  </IconBaseSolid>
))
IconMuscleFiberSolid.displayName = 'IconMuscleFiberSolid'
