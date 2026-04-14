// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconHeartRateSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M3 13H7l3-8 2 14 2-11 1 4h6v1H14.5l-1.5-5.5-2 11-2-14-2.5 7.5H3v-1Z"/>
  </IconBaseSolid>
))
IconHeartRateSolid.displayName = 'IconHeartRateSolid'
