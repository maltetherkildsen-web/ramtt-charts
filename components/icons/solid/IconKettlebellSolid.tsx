// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconKettlebellSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M9 11c0-4 6-4 6 0a5 5 0 1 1-6 0Z"/>
  </IconBaseSolid>
))
IconKettlebellSolid.displayName = 'IconKettlebellSolid'
