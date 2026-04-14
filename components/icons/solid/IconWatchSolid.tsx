// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconWatchSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fillRule="evenodd" d="M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm0 3a.75.75 0 0 1 .75.75V12l1.5 1.5a.75.75 0 1 1-1.06 1.06l-1.72-1.72A.75.75 0 0 1 11.25 12V9.75A.75.75 0 0 1 12 9Z"/>
    <rect x="9" y="1" width="6" height="4" rx="1.5"/>
    <rect x="9" y="19" width="6" height="4" rx="1.5"/>
  </IconBaseSolid>
))
IconWatchSolid.displayName = 'IconWatchSolid'
