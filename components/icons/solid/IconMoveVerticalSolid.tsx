// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMoveVerticalSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 2l-4 3h3v14H8l4 3 4-3h-3V5h3l-4-3Z"/>
  </IconBaseSolid>
))
IconMoveVerticalSolid.displayName = 'IconMoveVerticalSolid'
