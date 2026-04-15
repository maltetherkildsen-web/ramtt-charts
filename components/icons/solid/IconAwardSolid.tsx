// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconAwardSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 2.25a6.75 6.75 0 00-4.11 12.1L6.3 21.27a.75.75 0 001.1.83L12 19.22l4.6 2.88a.75.75 0 001.1-.83l-1.59-6.92A6.75 6.75 0 0012 2.25z"/>
  </IconBaseSolid>
))
IconAwardSolid.displayName = 'IconAwardSolid'
