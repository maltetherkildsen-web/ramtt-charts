// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconWindSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M14 8.25a2.25 2.25 0 10-2.25 2.25H2a.75.75 0 010-1.5h9.75a3.75 3.75 0 113.75 3.75H2a.75.75 0 010-1.5h11.5a2.25 2.25 0 100-2.25H2a.75.75 0 010-1.5h10a3.75 3.75 0 112.68 1.62A3.75 3.75 0 0014 8.25zM12 15.5H2a.75.75 0 000 1.5h10a2.25 2.25 0 110 4.5.75.75 0 010-1.5 .75.75 0 100-1.5H2a.75.75 0 010-1.5h10a3.75 3.75 0 010 7.5.75.75 0 010-1.5A2.25 2.25 0 0014 20H2a.75.75 0 010-1.5h10z"/>
  </IconBaseSolid>
))
IconWindSolid.displayName = 'IconWindSolid'
