// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconVolumeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path d="M11 5L6 9H2v6h4l5 4V5Z"/>
    <path d="M15.54 8.46a5 5 0 0 1 0 7.07l1.06 1.07a6.5 6.5 0 0 0 0-9.21l-1.06 1.07Z"/>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14l1.06 1.06a11.5 11.5 0 0 0 0-16.26l-1.06 1.06Z"/>
  </IconBaseSolid>
))
IconVolumeSolid.displayName = 'IconVolumeSolid'
