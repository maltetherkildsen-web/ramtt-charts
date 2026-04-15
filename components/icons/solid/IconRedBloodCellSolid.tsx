// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRedBloodCellSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M3 12c0-2.8 4-5 9-5s9 2.2 9 5-4 5-9 5-9-2.2-9-5Zm5 0c0-1.1 1.8-2 4-2s4 .9 4 2-1.8 2-4 2-4-.9-4-2Z"/>
  </IconBaseSolid>
))
IconRedBloodCellSolid.displayName = 'IconRedBloodCellSolid'
