// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconAnalyticsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M4 18l4-4 3 3 4-7 5-4v12H4Z"/>
    <circle cx="20" cy="6" r="2"/>
  </IconBaseSolid>
))
IconAnalyticsSolid.displayName = 'IconAnalyticsSolid'
