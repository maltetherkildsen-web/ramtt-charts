// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGiftSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 3.25c-1.5 0-3 .7-3.7 1.75H5A2.75 2.75 0 002.25 7.75v10A2.75 2.75 0 005 20.5h14a2.75 2.75 0 002.75-2.75v-10A2.75 2.75 0 0019 5h-3.3c-.7-1.05-2.2-1.75-3.7-1.75z"/>
  </IconBaseSolid>
))
IconGiftSolid.displayName = 'IconGiftSolid'
