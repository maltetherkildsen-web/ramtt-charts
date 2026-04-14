// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconReceiptSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M4 2v20l3-2 3 2 2-2 2 2 3-2 3 2V2H4Zm3.25 5.25a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75Zm.75 3.25a.75.75 0 0 0 0 1.5h8a.75.75 0 0 0 0-1.5H8Zm-.75 4.75a.75.75 0 0 1 .75-.75h4a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75Z"/>
  </IconBaseSolid>
))
IconReceiptSolid.displayName = 'IconReceiptSolid'
