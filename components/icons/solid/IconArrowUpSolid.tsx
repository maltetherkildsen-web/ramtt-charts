// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconArrowUpSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 20V8.5l-3.5 3.5-1.4-1.4L12 5.7l4.9 4.9-1.4 1.4L12 8.5V20Z"/>
  </IconBaseSolid>
))
IconArrowUpSolid.displayName = 'IconArrowUpSolid'
