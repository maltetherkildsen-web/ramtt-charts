// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCompassSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>
    <path fillRule="evenodd" d="M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5zm4.64 5.11a.75.75 0 01.35.71l-2.5 5.5a.75.75 0 01-.38.38l-5.5 2.5a.75.75 0 01-.96-.96l2.5-5.5a.75.75 0 01.38-.38l5.5-2.5a.75.75 0 01.61.25z"/>
  </IconBaseSolid>
))
IconCompassSolid.displayName = 'IconCompassSolid'
