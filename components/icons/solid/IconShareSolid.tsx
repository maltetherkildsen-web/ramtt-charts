// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconShareSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle fill="currentColor" cx="18" cy="5" r="3" />
    <circle fill="currentColor" cx="6" cy="12" r="3" />
    <circle fill="currentColor" cx="18" cy="19" r="3" />
    <path fill="currentColor" d="M8.6 13.5L15.4 17.5" />
    <path fill="currentColor" d="M15.4 6.5L8.6 10.5" />
    </IconBaseSolid>
))
IconShareSolid.displayName = 'IconShareSolid'
