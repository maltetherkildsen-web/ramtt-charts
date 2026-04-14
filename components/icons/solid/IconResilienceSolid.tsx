// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconResilienceSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M3 8c0 8 4 11 9 11s9-3 9-11v2c0 7-4 11-9 11S3 17 3 10V8Z"/>
    <path d="M17 4l4 4-4 4V4Z"/>
  </IconBaseSolid>
))
IconResilienceSolid.displayName = 'IconResilienceSolid'
