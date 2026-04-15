// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMoonSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M11.47 2.17a.75.75 0 00-.93.93A7.75 7.75 0 0020.9 13.46a.75.75 0 00.93-.93A9.75 9.75 0 1111.47 2.17z"/>
  </IconBaseSolid>
))
IconMoonSolid.displayName = 'IconMoonSolid'
