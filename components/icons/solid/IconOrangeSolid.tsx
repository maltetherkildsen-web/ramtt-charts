// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconOrangeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 3.25a8.75 8.75 0 100 17.5 8.75 8.75 0 000-17.5zM12 10a2 2 0 100 4 2 2 0 000-4z"/>
  </IconBaseSolid>
))
IconOrangeSolid.displayName = 'IconOrangeSolid'
