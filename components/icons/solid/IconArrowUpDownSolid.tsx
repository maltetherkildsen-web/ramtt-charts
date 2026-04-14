// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconArrowUpDownSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M7 4l-3 3h2v13h2V7h2L7 4ZM17 20l3-3h-2V4h-2v13h-2l3 3Z"/>
  </IconBaseSolid>
))
IconArrowUpDownSolid.displayName = 'IconArrowUpDownSolid'
