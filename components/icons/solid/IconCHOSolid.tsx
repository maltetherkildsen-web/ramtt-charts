// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCHOSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M12 3l5 3v6l-5 3-5-3V6l5-3Z"/>
    <rect x="11.25" y="15" width="1.5" height="6" rx=".75"/>
  </IconBaseSolid>
))
IconCHOSolid.displayName = 'IconCHOSolid'
