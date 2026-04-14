// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCheckSquareSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm11.06 6.56a.75.75 0 0 0-1.12-1l-4.44 4.96-1.94-1.94a.75.75 0 0 0-1.06 1.06l2.5 2.5a.75.75 0 0 0 1.09-.03l5-5.58Z"/>
  </IconBaseSolid>
))
IconCheckSquareSolid.displayName = 'IconCheckSquareSolid'
