// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHomeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 3l9 9h-3v8a1 1 0 0 1-1 1h-4v-6h-2v6H7a1 1 0 0 1-1-1v-8H3l9-9Z"/>
  </IconBaseSolid>
))
IconHomeSolid.displayName = 'IconHomeSolid'
