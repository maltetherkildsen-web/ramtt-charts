// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMoreHorizontalSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="6" cy="12" r="2"/>
    <circle cx="12" cy="12" r="2"/>
    <circle cx="18" cy="12" r="2"/>
  </IconBaseSolid>
))
IconMoreHorizontalSolid.displayName = 'IconMoreHorizontalSolid'
