// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPowderScoopSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 5.25c-3.5 0-6.75 3.5-6.75 8.75H4a.75.75 0 00-.75.75v2A4.75 4.75 0 008 21.5h8a4.75 4.75 0 004.75-4.75v-2a.75.75 0 00-.75-.75h-1.25C18.75 8.75 15.5 5.25 12 5.25z"/>
  </IconBaseSolid>
))
IconPowderScoopSolid.displayName = 'IconPowderScoopSolid'
