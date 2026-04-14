// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTimerSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M12 5a8 8 0 1 0 0 16 8 8 0 0 0 0-16Zm.75 4a.75.75 0 0 0-1.5 0v4c0 .2.08.39.22.53l3 2a.75.75 0 1 0 .84-1.24l-2.56-1.7V9Z"/>
    <rect x="10" y="1" width="4" height="2" rx="1"/>
    <rect x="11.25" y="2" width="1.5" height="3" rx=".75"/>
  </IconBaseSolid>
))
IconTimerSolid.displayName = 'IconTimerSolid'
