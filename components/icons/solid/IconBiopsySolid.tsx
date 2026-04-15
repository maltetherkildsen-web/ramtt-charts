// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconBiopsySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="10" y="2" width="4" height="6" rx="1"/>
    <rect x="11" y="8" width="2" height="10"/>
    <path d="M11 18l1 4 1-4H11Z"/>
  </IconBaseSolid>
))
IconBiopsySolid.displayName = 'IconBiopsySolid'
