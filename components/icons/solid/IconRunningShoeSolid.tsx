// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconRunningShoeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M2 17a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2H2Z"/>
    <path d="M4 17v-5a2 2 0 0 1 2-2h4l4 3h6v4H4Z"/>
  </IconBaseSolid>
))
IconRunningShoeSolid.displayName = 'IconRunningShoeSolid'
