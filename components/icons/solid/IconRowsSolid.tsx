// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRowsSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect fill="currentColor" x="3" y="3" width="18" height="7" rx="1.5" />
    <rect fill="currentColor" x="3" y="14" width="18" height="7" rx="1.5" />
    </IconBaseSolid>
))
IconRowsSolid.displayName = 'IconRowsSolid'
