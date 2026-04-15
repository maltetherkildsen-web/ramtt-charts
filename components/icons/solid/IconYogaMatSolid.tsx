// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconYogaMatSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M6 5h11c1.7 0 3 3 3 7s-1.3 7-3 7H6c-1.7 0-3-3-3-7s1.3-7 3-7Z"/>
  </IconBaseSolid>
))
IconYogaMatSolid.displayName = 'IconYogaMatSolid'
