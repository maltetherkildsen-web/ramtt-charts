// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRecoverySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="11" y="12" width="2" height="10" rx="1"/>
    <path d="M12 12C12 8 8 4 4 4c0 4 4 8 8 8Z"/>
    <path d="M12 16c0-3 3-6 6-6 0 3-3 6-6 6Z"/>
  </IconBaseSolid>
))
IconRecoverySolid.displayName = 'IconRecoverySolid'
