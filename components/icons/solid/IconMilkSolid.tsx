// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMilkSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M9.25 2a.75.75 0 01.75-.75h4a.75.75 0 01.75.75v1.25H17a.75.75 0 01.75.75v2a.75.75 0 01-.04.24l-.96 2.4V20A2.75 2.75 0 0114 22.75H10A2.75 2.75 0 017.25 20V8.64l-.96-2.4A.75.75 0 016.25 6V4a.75.75 0 01.75-.75h2.25V2z"/>
  </IconBaseSolid>
))
IconMilkSolid.displayName = 'IconMilkSolid'
