// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconEyeOffSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M2.1 3.51a1 1 0 0 1 1.4-.02l18 17a1 1 0 1 1-1.38 1.45l-3.06-2.88A11.74 11.74 0 0 1 12 20C5 20 1 12 1 12a18.4 18.4 0 0 1 4.56-5.44L2.08 3.51ZM12 9a3 3 0 0 0-2.83 4L12 9ZM12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19L15.1 9.6A3 3 0 0 0 12 7l-2.1-2A9.1 9.1 0 0 1 12 4Z"/>
  </IconBaseSolid>
))
IconEyeOffSolid.displayName = 'IconEyeOffSolid'
