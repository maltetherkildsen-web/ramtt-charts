// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSoftFlaskSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M9 6c-1 5-1.5 9-.5 13a2 2 0 0 0 2 2h3a2 2 0 0 0 2-2c1-4 .5-8-.5-13H9Z"/>
    <rect x="11.25" y="2.5" width="1.5" height="4" rx=".75"/>
  </IconBaseSolid>
))
IconSoftFlaskSolid.displayName = 'IconSoftFlaskSolid'
