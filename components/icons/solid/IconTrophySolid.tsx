// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconTrophySolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M5.25 4A.75.75 0 016 3.25h12a.75.75 0 01.75.75v6a6.75 6.75 0 01-5.25 6.58V19h2.25a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5H10.5v-2.42A6.75 6.75 0 015.25 10V4zM4 6.25h1.25V10c0 .34.03.67.08 1H5a2.25 2.25 0 01-2.25-2.25V8A1.25 1.25 0 014 6.25zm14.75 0H20A1.25 1.25 0 0121.25 8v.75A2.25 2.25 0 0119 11h-.33c.05-.33.08-.66.08-1V6.25z"/>
  </IconBaseSolid>
))
IconTrophySolid.displayName = 'IconTrophySolid'
