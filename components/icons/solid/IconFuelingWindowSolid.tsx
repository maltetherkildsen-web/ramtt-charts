// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconFuelingWindowSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM12 6.25a.75.75 0 01.75.75v4.44l3.28 3.28a.75.75 0 01-1.06 1.06l-3.5-3.5A.75.75 0 0111.25 12V7a.75.75 0 01.75-.75z"/>
  </IconBaseSolid>
))
IconFuelingWindowSolid.displayName = 'IconFuelingWindowSolid'
