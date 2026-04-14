// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconArrowDownSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 4v11.5l3.5-3.5 1.4 1.4-4.9 4.9-4.9-4.9 1.4-1.4 3.5 3.5V4Z"/>
  </IconBaseSolid>
))
IconArrowDownSolid.displayName = 'IconArrowDownSolid'
