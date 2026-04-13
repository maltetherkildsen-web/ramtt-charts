// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTimerSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle fill="currentColor" cx="12" cy="13" r="8" />
    <path fill="currentColor" d="M12 9V13L15 15" />
    <path fill="currentColor" d="M10 2H14" />
    <path fill="currentColor" d="M12 2V5" />
    </IconBaseSolid>
))
IconTimerSolid.displayName = 'IconTimerSolid'
