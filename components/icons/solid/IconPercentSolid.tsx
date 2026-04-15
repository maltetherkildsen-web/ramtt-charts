// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPercentSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M7 3.75a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zM17 13.75a3.25 3.25 0 100 6.5 3.25 3.25 0 000-6.5zM19.53 4.47a.75.75 0 010 1.06l-14 14a.75.75 0 01-1.06-1.06l14-14a.75.75 0 011.06 0z"/>
  </IconBaseSolid>
))
IconPercentSolid.displayName = 'IconPercentSolid'
