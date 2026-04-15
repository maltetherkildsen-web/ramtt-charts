// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconShameFridgeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M7 1.25A2.75 2.75 0 004.25 4v16A2.75 2.75 0 007 22.75h10a2.75 2.75 0 002.75-2.75V4A2.75 2.75 0 0017 1.25H7zM5.75 10.75v9.25c0 .69.56 1.25 1.25 1.25h10c.69 0 1.25-.56 1.25-1.25v-9.25H5.75zM16 5.25a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0V6a.75.75 0 01.75-.75zm0 7a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0v-4a.75.75 0 01.75-.75z"/>
  </IconBaseSolid>
))
IconShameFridgeSolid.displayName = 'IconShameFridgeSolid'
