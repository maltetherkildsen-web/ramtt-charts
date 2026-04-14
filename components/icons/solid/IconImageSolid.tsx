// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconImageSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm3.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3ZM21 15l-5-5-11 11h14a2 2 0 0 0 2-2v-4Z"/>
  </IconBaseSolid>
))
IconImageSolid.displayName = 'IconImageSolid'
