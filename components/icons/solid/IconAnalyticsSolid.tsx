// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconAnalyticsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M4 18L8 14L11 17L15 10L20 6" />
    <circle fill="currentColor" cx="20" cy="6" r="1.5" />
    </IconBaseSolid>
))
IconAnalyticsSolid.displayName = 'IconAnalyticsSolid'
