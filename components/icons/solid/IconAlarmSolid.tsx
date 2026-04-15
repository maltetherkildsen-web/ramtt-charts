// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconAlarmSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path d="M5.53 2.47a.75.75 0 00-1.06 0l-3 3a.75.75 0 001.06 1.06l3-3a.75.75 0 000-1.06zM19.53 2.47a.75.75 0 00-1.06 1.06l3 3a.75.75 0 001.06-1.06l-3-3z"/><path fillRule="evenodd" d="M4.25 13a7.75 7.75 0 1115.5 0 7.75 7.75 0 01-15.5 0zM12 8.25a.75.75 0 01.75.75v3.69l1.78 1.78a.75.75 0 01-1.06 1.06l-2-2a.75.75 0 01-.22-.53V9a.75.75 0 01.75-.75z"/>
  </IconBaseSolid>
))
IconAlarmSolid.displayName = 'IconAlarmSolid'
