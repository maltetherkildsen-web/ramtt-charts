// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconIronSupplementSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M12 5a7 7 0 1 0 0 14 7 7 0 0 0 0-14Zm-6.25 6.25h12.5v1.5H5.75v-1.5Z"/>
    <circle cx="10" cy="9.5" r="1"/>
    <circle cx="14" cy="9.5" r="1"/>
  </IconBaseSolid>
))
IconIronSupplementSolid.displayName = 'IconIronSupplementSolid'
