// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPancakesSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <ellipse cx="12" cy="18" rx="8.75" ry="3" fill="currentColor"/><ellipse cx="12" cy="14" rx="7.75" ry="2.5" fill="currentColor" opacity="0.85"/><ellipse cx="12" cy="10" rx="6.75" ry="2.5" fill="currentColor" opacity="0.7"/><ellipse cx="12" cy="6" rx="5.75" ry="2.5" fill="currentColor" opacity="0.55"/>
  </IconBaseSolid>
))
IconPancakesSolid.displayName = 'IconPancakesSolid'
