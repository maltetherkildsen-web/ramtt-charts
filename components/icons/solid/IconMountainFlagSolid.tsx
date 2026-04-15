// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMountainFlagSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M16 3.25a.75.75 0 00-.75.75v2.93l-3.8 2.28a.75.75 0 000 1.28l3.8 2.28v1.84l-2.83-6.37a.75.75 0 00-1.3-.16L8.68 11.6 5.27 16.4a.75.75 0 00-.02.05L3.4 19.37a.75.75 0 00.66 1.13h16.68a.75.75 0 00.68-1.07l-4.67-10.5V4a.75.75 0 00-.75-.75zm.75 5.68l2.78 6.25-3.53-4.95V8.93z"/>
  </IconBaseSolid>
))
IconMountainFlagSolid.displayName = 'IconMountainFlagSolid'
