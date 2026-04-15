// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconVO2MaxSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M4 18c2-3 4-10 8-10s6 7 8 10Z"/>
    <path d="M12 4v4"/>
    <path d="M10 6l2-2 2 2"/>
  </IconBaseSolid>
))
IconVO2MaxSolid.displayName = 'IconVO2MaxSolid'
