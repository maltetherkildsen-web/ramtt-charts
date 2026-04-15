// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSushiSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 3.25a8.75 8.75 0 100 17.5 8.75 8.75 0 000-17.5zM6.25 12a5.75 5.75 0 1111.5 0 5.75 5.75 0 01-11.5 0zm3 0a2.75 2.75 0 115.5 0 2.75 2.75 0 01-5.5 0z"/>
  </IconBaseSolid>
))
IconSushiSolid.displayName = 'IconSushiSolid'
