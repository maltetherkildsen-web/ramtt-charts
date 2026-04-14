// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconCloseSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="11" y="3.5" width="2" height="17" rx="1" transform="rotate(45 12 12)"/>
    <rect x="11" y="3.5" width="2" height="17" rx="1" transform="rotate(-45 12 12)"/>
  </IconBaseSolid>
))
IconCloseSolid.displayName = 'IconCloseSolid'
