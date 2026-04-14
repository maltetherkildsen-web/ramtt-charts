// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconWeightSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M6 7a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h12a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3H6Zm1.5 2.5a1.5 1.5 0 0 0-1.5 1.5v1a1.5 1.5 0 0 0 1.5 1.5h9A1.5 1.5 0 0 0 18 12v-1a1.5 1.5 0 0 0-1.5-1.5h-9Z"/>
    <circle cx="7" cy="22" r="1.25"/>
    <circle cx="17" cy="22" r="1.25"/>
  </IconBaseSolid>
))
IconWeightSolid.displayName = 'IconWeightSolid'
