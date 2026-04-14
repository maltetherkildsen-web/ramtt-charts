// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCodeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M8 6L2 12l6 6 1.4-1.4L4.8 12l4.6-4.6L8 6ZM16 6l6 6-6 6-1.4-1.4 4.6-4.6-4.6-4.6L16 6Z"/>
  </IconBaseSolid>
))
IconCodeSolid.displayName = 'IconCodeSolid'
