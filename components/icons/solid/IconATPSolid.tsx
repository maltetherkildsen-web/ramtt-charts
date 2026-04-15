// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconATPSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M6 9l2.5-4h5L16 9l-2.5 4h-5Z"/>
    <circle cx="19" cy="9" r="1.8"/>
    <rect x="16" y="8.2" width="2" height="1.6" rx=".4"/>
    <circle cx="19" cy="16" r="1.8"/>
    <rect x="16.5" y="12.5" width="1.6" height="3" rx=".4" transform="rotate(35 17.3 14)"/>
    <path d="M9 15l1.5-2h2L11 17Z"/>
  </IconBaseSolid>
))
IconATPSolid.displayName = 'IconATPSolid'
