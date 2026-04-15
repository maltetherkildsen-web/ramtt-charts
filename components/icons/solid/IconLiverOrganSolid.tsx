// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLiverOrganSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M4 11c0-4 3-7 8-7s9 3 9 7-3 7-7 8c-3 .5-6 0-8-2-1.5-1.5-2-3.5-2-6Z"/>
  </IconBaseSolid>
))
IconLiverOrganSolid.displayName = 'IconLiverOrganSolid'
