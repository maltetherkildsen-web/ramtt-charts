// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSlidersSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M10 5a2 2 0 114 0 2 2 0 01-4 0zm2-3.75a3.75 3.75 0 00-3.54 2.5H4a.75.75 0 000 1.5h4.46a3.75 3.75 0 007.08 0H20a.75.75 0 000-1.5h-4.46A3.75 3.75 0 0012 1.25zM6 12a2 2 0 114 0 2 2 0 01-4 0zm2-3.75a3.75 3.75 0 00-3.54 2.5H4a.75.75 0 000 1.5h.46a3.75 3.75 0 007.08 0H20a.75.75 0 000-1.5h-8.46A3.75 3.75 0 008 8.25zM14 19a2 2 0 114 0 2 2 0 01-4 0zm2-3.75a3.75 3.75 0 00-3.54 2.5H4a.75.75 0 000 1.5h8.46a3.75 3.75 0 007.08 0H20a.75.75 0 000-1.5h-.46A3.75 3.75 0 0016 15.25z"/>
  </IconBaseSolid>
))
IconSlidersSolid.displayName = 'IconSlidersSolid'
