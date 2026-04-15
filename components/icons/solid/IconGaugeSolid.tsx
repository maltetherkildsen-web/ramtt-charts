// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGaugeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M2.25 12a9.75 9.75 0 1119.5 0 9.75 9.75 0 01-19.5 0zM12 6.25a.75.75 0 01.75.75v4.19l2.78 2.78a.75.75 0 01-1.06 1.06l-3-3A.75.75 0 0111.25 12V7a.75.75 0 01.75-.75z"/>
  </IconBaseSolid>
))
IconGaugeSolid.displayName = 'IconGaugeSolid'
