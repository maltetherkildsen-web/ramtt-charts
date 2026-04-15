// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconPortaPottySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M6 3.25a.75.75 0 000 1.5h8.05A3.75 3.75 0 0018 8.7V20a1.75 1.75 0 01-1.75 1.75H7.75A1.75 1.75 0 016 20V5.5h-.75a.75.75 0 010-1.5H18a.75.75 0 010 1.5h-1.26A3.76 3.76 0 0018.75 5a3.75 3.75 0 00-7.5 0c0 .17.01.34.04.5H6zm4.75 2v14.25h-1.5V5.25h1.5z"/><circle cx="18" cy="5" r="3" fill="currentColor"/>
  </IconBaseSolid>
))
IconPortaPottySolid.displayName = 'IconPortaPottySolid'
