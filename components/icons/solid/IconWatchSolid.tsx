// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconWatchSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle fill="currentColor" cx="12" cy="12" r="6" />
    <path fill="currentColor" d="M12 9V12L14 14" />
    <path fill="currentColor" d="M9 2H15V5" />
    <path fill="currentColor" d="M9 22H15V19" />
    </IconBaseSolid>
))
IconWatchSolid.displayName = 'IconWatchSolid'
