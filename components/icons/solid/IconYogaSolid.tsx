// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconYogaSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <circle cx="12" cy="4" r="2.75"/><path fillRule="evenodd" d="M12 6.25a.75.75 0 01.75.75v2.19l3.78-1.89a.75.75 0 01.67 1.34L12.75 11v2.32l1.67 8.36a.75.75 0 01-1.47.3L12 17.24l-.95 4.74a.75.75 0 01-1.47-.3l1.67-8.36V11l-4.45-2.36a.75.75 0 01.67-1.34l3.78 1.89V7a.75.75 0 01.75-.75z"/>
  </IconBaseSolid>
))
IconYogaSolid.displayName = 'IconYogaSolid'
