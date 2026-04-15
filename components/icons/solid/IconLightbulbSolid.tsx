// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconLightbulbSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 1.25a7.75 7.75 0 00-4.45 14.1.75.75 0 01.32.61V18c0 .97.78 1.75 1.75 1.75h4.76c.97 0 1.75-.78 1.75-1.75v-2.04a.75.75 0 01.32-.61A7.75 7.75 0 0012 1.25zM8.25 21a.75.75 0 01.75-.75h6a.75.75 0 010 1.5H9a.75.75 0 01-.75-.75z"/>
  </IconBaseSolid>
))
IconLightbulbSolid.displayName = 'IconLightbulbSolid'
