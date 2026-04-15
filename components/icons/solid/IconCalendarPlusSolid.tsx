// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCalendarPlusSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M8 1.25a.75.75 0 01.75.75v1.75h6.5V2a.75.75 0 011.5 0v1.75H18A2.75 2.75 0 0120.75 6.5v12.25A2.75 2.75 0 0118 21.5H6A2.75 2.75 0 013.25 18.75V6.5A2.75 2.75 0 016 3.75h.75V2A.75.75 0 018 1.25zM4.75 10.25v8.5c0 .69.56 1.25 1.25 1.25h12c.69 0 1.25-.56 1.25-1.25v-8.5H4.75zM12 12.25a.75.75 0 01.75.75v1.25H14a.75.75 0 010 1.5h-1.25V17a.75.75 0 01-1.5 0v-1.25H10a.75.75 0 010-1.5h1.25V13a.75.75 0 01.75-.75z"/>
  </IconBaseSolid>
))
IconCalendarPlusSolid.displayName = 'IconCalendarPlusSolid'
