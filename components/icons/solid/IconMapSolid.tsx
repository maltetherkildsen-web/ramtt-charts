// Copyright (c) 2026 RAMTT (Malte Therkildsen)
// Licensed under MIT OR Apache-2.0. See LICENSE-MIT and LICENSE-APACHE.

import { forwardRef } from 'react'
import { IconBaseSolid } from '../IconBaseSolid'
import type { IconProps } from '../types'

export const IconMapSolid = forwardRef<SVGSVGElement, IconProps>((props, ref) => (
  <IconBaseSolid ref={ref} {...props}>

    <path fill="currentColor" d="M1 6V22L8 18L16 22L23 18V2L16 6L8 2L1 6Z" />
    <path fill="currentColor" d="M8 2V18" />
    <path fill="currentColor" d="M16 6V22" />
    </IconBaseSolid>
))
IconMapSolid.displayName = 'IconMapSolid'
