// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCalendarRangeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M8 1a1 1 0 0 0-1 1v2H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1V2a1 1 0 1 0-2 0v2H9V2a1 1 0 0 0-1-1ZM4 10h16v11H4V10Zm3 3h4v3H7v-3Zm6 0h4v3h-4v-3Z"/>
  </IconBaseSolid>
))
IconCalendarRangeSolid.displayName = 'IconCalendarRangeSolid'
