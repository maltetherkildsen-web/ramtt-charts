// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSnowSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 1.25a.75.75 0 01.75.75v3.19l1.72-1.72a.75.75 0 111.06 1.06L12.75 7.31V11.25h3.94l2.78-2.78a.75.75 0 111.06 1.06l-1.72 1.72h3.19a.75.75 0 010 1.5h-3.19l1.72 1.72a.75.75 0 11-1.06 1.06l-2.78-2.78H12.75v3.94l2.78 2.78a.75.75 0 11-1.06 1.06l-1.72-1.72V22a.75.75 0 01-1.5 0v-3.19l-1.72 1.72a.75.75 0 01-1.06-1.06l2.78-2.78V12.75H7.31l-2.78 2.78a.75.75 0 01-1.06-1.06l1.72-1.72H2a.75.75 0 010-1.5h3.19l-1.72-1.72a.75.75 0 011.06-1.06l2.78 2.78h3.94V7.31L8.47 4.53a.75.75 0 011.06-1.06l1.72 1.72V2a.75.75 0 01.75-.75z"/>
  </IconBaseSolid>
))
IconSnowSolid.displayName = 'IconSnowSolid'
