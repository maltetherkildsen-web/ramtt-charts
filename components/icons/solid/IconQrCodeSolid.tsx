// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconQrCodeSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <rect x="3" y="3" width="7" height="7" rx="1"/>
    <rect x="14" y="3" width="7" height="7" rx="1"/>
    <rect x="3" y="14" width="7" height="7" rx="1"/>
    <rect x="14" y="14" width="3.5" height="3.5" rx=".5"/>
    <rect x="19.5" y="14" width="1.5" height="3.5" rx=".75"/>
    <rect x="14" y="19.5" width="3.5" height="1.5" rx=".75"/>
    <rect x="19.5" y="19.5" width="1.5" height="1.5" rx=".75"/>
  </IconBaseSolid>
))
IconQrCodeSolid.displayName = 'IconQrCodeSolid'
