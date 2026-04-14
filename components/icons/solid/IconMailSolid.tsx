// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMailSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M3 5a2 2 0 0 0-1.73 1L12 12.67 22.73 6A2 2 0 0 0 21 5H3ZM1 8.33V17a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V8.33l-10.45 6.4a1 1 0 0 1-1.1 0L1 8.33Z"/>
  </IconBaseSolid>
))
IconMailSolid.displayName = 'IconMailSolid'
