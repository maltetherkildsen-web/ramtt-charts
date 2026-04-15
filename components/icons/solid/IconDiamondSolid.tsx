// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconDiamondSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 1.25a.75.75 0 01.55.24l7 6a.75.75 0 01.1.83l-7 14a.75.75 0 01-1.3 0l-7-14a.75.75 0 01.1-.83l7-6a.75.75 0 01.55-.24z"/>
  </IconBaseSolid>
))
IconDiamondSolid.displayName = 'IconDiamondSolid'
