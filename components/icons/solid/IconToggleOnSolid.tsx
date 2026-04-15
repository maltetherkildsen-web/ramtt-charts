// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconToggleOnSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M7 5.25A6.75 6.75 0 00.25 12 6.75 6.75 0 007 18.75h10A6.75 6.75 0 0023.75 12 6.75 6.75 0 0017 5.25H7zM17 15a3 3 0 100-6 3 3 0 000 6z"/>
  </IconBaseSolid>
))
IconToggleOnSolid.displayName = 'IconToggleOnSolid'
