// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconIceBathSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 5.25a.75.75 0 01.75.75v.75h1.25a.75.75 0 010 1.5h-1.25v.75a.75.75 0 01-1.5 0V8.25H10a.75.75 0 010-1.5h1.25V6a.75.75 0 01.75-.75z"/><path fillRule="evenodd" d="M6 9.25A2.75 2.75 0 003.25 12v6A2.75 2.75 0 006 20.75h12a2.75 2.75 0 002.75-2.75v-6A2.75 2.75 0 0018 9.25H6zm1 4a.75.75 0 000 1.5h2a.75.75 0 000-1.5H7zm4 0a.75.75 0 000 1.5h2a.75.75 0 000-1.5h-2zm4 0a.75.75 0 000 1.5h2a.75.75 0 000-1.5h-2zm-7 3a.75.75 0 000 1.5h8a.75.75 0 000-1.5H8z"/>
  </IconBaseSolid>
))
IconIceBathSolid.displayName = 'IconIceBathSolid'
