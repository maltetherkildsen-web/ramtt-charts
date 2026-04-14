// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCheckSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M4.3 11.3a1 1 0 0 1 1.4 0L10 15.6l8.3-8.3a1 1 0 1 1 1.4 1.4l-9 9a1 1 0 0 1-1.4 0l-5-5a1 1 0 0 1 0-1.4Z"/>
  </IconBaseSolid>
))
IconCheckSolid.displayName = 'IconCheckSolid'
