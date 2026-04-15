// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGutTrainingSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M8 6c-2 0-3 2-3 4s1 3 2 4 2 3 2 5h6c0-2 1-3 2-5s2-2 2-4-1-4-3-4H8z" fill="currentColor" opacity="0.2"/><path d="M12 14v-4M10 12l2-2 2 2" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/><path d="M8 6h8M9 19h6" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
  </IconBaseSolid>
))
IconGutTrainingSolid.displayName = 'IconGutTrainingSolid'
