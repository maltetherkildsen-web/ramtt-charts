// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMicroscopeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="9" y="2" width="3" height="3" rx=".5"/>
    <path d="M12 5h3v15H9V5Z"/>
    <rect x="7" y="12.5" width="7" height="1"/>
    <circle cx="10.5" cy="15" r="1.25"/>
  </IconBaseSolid>
))
IconMicroscopeSolid.displayName = 'IconMicroscopeSolid'
