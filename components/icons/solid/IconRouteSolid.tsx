// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRouteSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M4 2.25a2.75 2.75 0 00-.7 5.41c.46.12.95.09 1.38-.04H10a3.25 3.25 0 010 6.5H10a4.75 4.75 0 000 9.5h8.32a2.75 2.75 0 10.68-1.5H10a3.25 3.25 0 010-6.5h0a4.75 4.75 0 000-9.5H5.38A2.75 2.75 0 004 2.25z"/>
  </IconBaseSolid>
))
IconRouteSolid.displayName = 'IconRouteSolid'
