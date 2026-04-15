// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconDonutSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 3.25a8.75 8.75 0 100 17.5 8.75 8.75 0 000-17.5zM8.25 12a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0z"/>
  </IconBaseSolid>
))
IconDonutSolid.displayName = 'IconDonutSolid'
