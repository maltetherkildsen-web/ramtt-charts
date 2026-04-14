// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPlusSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="11" y="4" width="2" height="16" rx="1"/>
    <rect x="4" y="11" width="16" height="2" rx="1"/>
  </IconBaseSolid>
))
IconPlusSolid.displayName = 'IconPlusSolid'
