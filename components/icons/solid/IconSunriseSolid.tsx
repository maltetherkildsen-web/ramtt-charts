// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSunriseSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M12 1.25a.75.75 0 01.75.75v4a.75.75 0 01-1.5 0V2a.75.75 0 01.75-.75zM4.4 5.4a.75.75 0 011.06 0l2.83 2.83a.75.75 0 01-1.06 1.06L4.4 6.46a.75.75 0 010-1.06zM19.6 5.4a.75.75 0 010 1.06l-2.83 2.83a.75.75 0 11-1.06-1.06l2.83-2.83a.75.75 0 011.06 0zM1.25 16a.75.75 0 01.75-.75h20a.75.75 0 010 1.5H2a.75.75 0 01-.75-.75zM12 12.25A7.75 7.75 0 004.39 19.5a.75.75 0 01-.75.75h-2a.75.75 0 010-1.5h1.3A9.25 9.25 0 0112 10.75a9.25 9.25 0 019.06 8h1.3a.75.75 0 010 1.5h-2a.75.75 0 01-.75-.75A7.75 7.75 0 0012 12.25z"/>
  </IconBaseSolid>
))
IconSunriseSolid.displayName = 'IconSunriseSolid'
