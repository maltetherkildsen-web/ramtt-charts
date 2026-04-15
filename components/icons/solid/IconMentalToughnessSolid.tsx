// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMentalToughnessSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 2c-3 0-5 2-6 4s-1 4 0 6c.5 1 1 1.5 1.5 2l4.5-2 4.5 2c.5-.5 1-1 1.5-2 1-2 1-4 0-6S15 2 12 2z" fill="currentColor" opacity="0.3"/><path d="M12 14l-4 2v3c0 2 1.5 3.5 4 4 2.5-.5 4-2 4-4v-3l-4-2z" fill="currentColor"/>
  </IconBaseSolid>
))
IconMentalToughnessSolid.displayName = 'IconMentalToughnessSolid'
