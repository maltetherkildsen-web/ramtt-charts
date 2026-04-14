// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconGutSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M8 3C6 3 4 5 4 7c0 3 3 3 3 6s-3 3-3 6c0 1.5 1.5 2 3 2h2V3H8Z"/>
    <path d="M16 3c2 0 4 2 4 4 0 3-3 3-3 6s3 3 3 6c0 1.5-1.5 2-3 2h-2V3h2Z"/>
    <rect x="6" y="6" width="12" height="2" rx="1"/>
    <rect x="6" y="16" width="12" height="2" rx="1"/>
  </IconBaseSolid>
))
IconGutSolid.displayName = 'IconGutSolid'
