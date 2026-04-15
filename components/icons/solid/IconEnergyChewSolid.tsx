// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconEnergyChewSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <rect x="3" y="5" width="7" height="6" rx="1.5" fill="currentColor"/><rect x="14" y="5" width="7" height="6" rx="1.5" fill="currentColor" opacity="0.7"/><rect x="3" y="13" width="7" height="6" rx="1.5" fill="currentColor" opacity="0.7"/><rect x="14" y="13" width="7" height="6" rx="1.5" fill="currentColor"/>
  </IconBaseSolid>
))
IconEnergyChewSolid.displayName = 'IconEnergyChewSolid'
