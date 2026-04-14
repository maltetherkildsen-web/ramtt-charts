// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTableSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M5 3a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2H5Zm5 5.5V4H5a1 1 0 0 0-1 1v3.5h6Zm1.5 0V4H19a1 1 0 0 1 1 1v3.5h-8.5ZM4 10v4.5h6V10H4Zm7.5 0v4.5H20V10h-8.5ZM10 16H4v3a1 1 0 0 0 1 1h5v-4Zm1.5 0v4H19a1 1 0 0 0 1-1v-3h-8.5Z"/>
  </IconBaseSolid>
))
IconTableSolid.displayName = 'IconTableSolid'
