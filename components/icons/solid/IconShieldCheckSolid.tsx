// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconShieldCheckSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 1.75l-9 4.5V12c0 5.93 3.68 11.02 8.68 12.44a.75.75 0 00.64 0C17.32 23.02 21 17.93 21 12V6.25l-9-4.5zm3.53 8.78a.75.75 0 00-1.06-1.06L11 12.94l-1.47-1.47a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l4-4z"/>
  </IconBaseSolid>
))
IconShieldCheckSolid.displayName = 'IconShieldCheckSolid'
