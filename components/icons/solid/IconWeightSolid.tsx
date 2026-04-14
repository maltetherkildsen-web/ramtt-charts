// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconWeightSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M12 3L3 7v2h18V7l-9-4Z"/>
    <path fillRule="evenodd" d="M5 9v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9H5Zm7 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6Z"/>
  </IconBaseSolid>
))
IconWeightSolid.displayName = 'IconWeightSolid'
