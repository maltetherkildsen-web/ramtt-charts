// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCornerDownRightSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M4 4v9a3 3 0 0 0 3 3h7.5l-2.8 2.8 1.4 1.4 4.9-4.9-4.9-4.9-1.4 1.4 2.8 2.7H7a2 2 0 0 1-2-2V4H4Z"/>
  </IconBaseSolid>
))
IconCornerDownRightSolid.displayName = 'IconCornerDownRightSolid'
