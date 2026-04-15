// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconEarlyBedtimeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zM12 6.25a.75.75 0 01.75.75v4.69l2.78 1.85a.75.75 0 01-.83 1.25l-3-2a.75.75 0 01-.45-.69V7a.75.75 0 01.75-.75z"/><path d="M19 3a3 3 0 01-2.5 4.5A4 4 0 0119 3z" fill="currentColor"/>
  </IconBaseSolid>
))
IconEarlyBedtimeSolid.displayName = 'IconEarlyBedtimeSolid'
