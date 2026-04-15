// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSportsDrinkSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M10.25 2a.75.75 0 01.75-.75h2a.75.75 0 01.75.75v2.25H15a.75.75 0 01.75.75v1.94l.72.72a.75.75 0 01.22.53V20A2.75 2.75 0 0114 22.75h-4A2.75 2.75 0 017.25 20V8.19a.75.75 0 01.22-.53l.72-.72V5a.75.75 0 01.75-.75h1.31V2z"/>
  </IconBaseSolid>
))
IconSportsDrinkSolid.displayName = 'IconSportsDrinkSolid'
