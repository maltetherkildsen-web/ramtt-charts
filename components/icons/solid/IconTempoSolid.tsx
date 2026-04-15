// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTempoSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="12" cy="14" r="8"/>
    <rect x="11" y="3" width="2" height="3" rx="1"/>
    <path d="M12 14l3-5"/>
  </IconBaseSolid>
))
IconTempoSolid.displayName = 'IconTempoSolid'
