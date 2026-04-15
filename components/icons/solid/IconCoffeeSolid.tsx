// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCoffeeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M6 .25a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0V1A.75.75 0 016 .25zm4 0a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0V1A.75.75 0 0110 .25zm4 0a.75.75 0 01.75.75v2a.75.75 0 01-1.5 0V1A.75.75 0 0114 .25zM3.25 6a.75.75 0 01.75-.75h12a.75.75 0 01.75.75v2.25H18a2.75 2.75 0 010 5.5h-1.25v.25a4.75 4.75 0 01-4.75 4.75H8A4.75 4.75 0 013.25 14V6zM1.25 20a.75.75 0 01.75-.75h16a.75.75 0 010 1.5H2a.75.75 0 01-.75-.75z"/>
  </IconBaseSolid>
))
IconCoffeeSolid.displayName = 'IconCoffeeSolid'
