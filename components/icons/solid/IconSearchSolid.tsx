// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSearchSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M10.5 4a6.5 6.5 0 1 0 3.82 11.74l3.97 3.97a1 1 0 0 0 1.42-1.42l-3.97-3.97A6.5 6.5 0 0 0 10.5 4Z"/>
  </IconBaseSolid>
))
IconSearchSolid.displayName = 'IconSearchSolid'
