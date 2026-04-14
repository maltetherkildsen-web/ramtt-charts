// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPinSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <rect x="8" y="3" width="8" height="9" rx="1"/>
    <rect x="5" y="11" width="14" height="2" rx="1"/>
    <rect x="11" y="17" width="2" height="5" rx="1"/>
  </IconBaseSolid>
))
IconPinSolid.displayName = 'IconPinSolid'
