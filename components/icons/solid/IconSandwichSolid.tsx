// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSandwichSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 3.5L2.5 14h19L12 3.5z" fill="currentColor" opacity="0.3"/><rect x="2.5" y="14" width="19" height="3.5" rx="1" fill="currentColor"/><path d="M2.5 17.5h19v2a1.5 1.5 0 01-1.5 1.5H4a1.5 1.5 0 01-1.5-1.5v-2z" fill="currentColor" opacity="0.7"/>
  </IconBaseSolid>
))
IconSandwichSolid.displayName = 'IconSandwichSolid'
