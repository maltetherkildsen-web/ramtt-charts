// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSleepScoreSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M18 6a4 4 0 01-4.5-4A5 5 0 1018 6z" fill="currentColor"/><path d="M3 14h3v6H3zm4.5-2h3v8h-3zM12 16h3v4h-3zm4.5-6h3v10h-3z" fill="currentColor" opacity="0.7"/>
  </IconBaseSolid>
))
IconSleepScoreSolid.displayName = 'IconSleepScoreSolid'
