// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconClockSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm.75 3a.75.75 0 0 0-1.5 0v6c0 .2.08.39.22.53l4 2a.75.75 0 1 0 .67-1.34L12.75 11.2V6Z"/>
  </IconBaseSolid>
))
IconClockSolid.displayName = 'IconClockSolid'
