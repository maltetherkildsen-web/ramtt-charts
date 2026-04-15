// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconSwimGogglesSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <circle cx="8" cy="12" r="4"/>
    <circle cx="16" cy="12" r="4"/>
    <rect x="11.5" y="11" width="1" height="2" rx=".5"/>
  </IconBaseSolid>
))
IconSwimGogglesSolid.displayName = 'IconSwimGogglesSolid'
